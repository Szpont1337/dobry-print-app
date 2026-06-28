import "server-only";

import crypto from "node:crypto";
import type { Doc } from "@convex/_generated/dataModel";
import { getServerSecret } from "./serverEnv";

const DEFAULT_TTL_SECONDS = 300; // fulfillment tokens live 5 minutes

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromB64url(input: string): Buffer {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  return Buffer.from(
    input.replace(/-/g, "+").replace(/_/g, "/") + pad,
    "base64",
  );
}

/**
 * Short-lived signed token referencing an order. The extension carries it in
 * the Allegro URL fragment; it only proves "the admin asked to fulfil order X
 * within the last 5 min". No PII is embedded — the payload is fetched later.
 */
export function signFulfillmentToken(
  orderId: string,
  ttlSeconds = DEFAULT_TTL_SECONDS,
): string {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const payload = b64url(JSON.stringify({ oid: orderId, exp }));
  const sig = b64url(
    crypto.createHmac("sha256", getServerSecret()).update(payload).digest(),
  );
  return `${payload}.${sig}`;
}

export function verifyFulfillmentToken(
  token: string,
): { orderId: string } | null {
  if (typeof token !== "string" || !token.includes(".")) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;

  const expected = b64url(
    crypto.createHmac("sha256", getServerSecret()).update(payload).digest(),
  );
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return null;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null;

  try {
    const data = JSON.parse(fromB64url(payload).toString("utf8")) as {
      oid?: unknown;
      exp?: unknown;
    };
    if (typeof data.oid !== "string" || typeof data.exp !== "number") {
      return null;
    }
    if (data.exp < Math.floor(Date.now() / 1000)) return null;
    return { orderId: data.oid };
  } catch {
    return null;
  }
}

function shortId(order: Doc<"orders">): string {
  return order._id.slice(-8).toUpperCase();
}

/**
 * Note we drop into Allegro's "uwagi do sprzedawcy" field. Single source of
 * truth shared by the extension auto-fill and the clipboard fallback.
 */
export function buildBuyerNote(order: Doc<"orders">): string {
  const lines: string[] = [];
  if (order.deliveryMethod === "parcel_locker" && order.parcelLockerId) {
    lines.push(`Paczkomat: ${order.parcelLockerId}`);
    if (order.parcelLockerAddress) lines.push(order.parcelLockerAddress);
  } else if (order.shippingStreet) {
    lines.push(
      [
        order.shippingStreet,
        [order.shippingPostalCode, order.shippingCity]
          .filter(Boolean)
          .join(" "),
        order.shippingCountry,
      ]
        .filter(Boolean)
        .join(", "),
    );
  }
  lines.push(`Odbiorca: ${order.customerName}`);
  if (order.customerPhone) lines.push(`Tel: ${order.customerPhone}`);
  lines.push(`Zamówienie DobrePrinty #${shortId(order)}`);
  return lines.join("\n");
}

export type FulfillmentPayload = {
  shortId: string;
  deliveryMethod: "courier" | "parcel_locker" | null;
  parcelLockerId: string | null;
  parcelLockerName: string | null;
  parcelLockerAddress: string | null;
  parcelLockerDescription: string | null;
  shippingStreet: string | null;
  shippingCity: string | null;
  shippingPostalCode: string | null;
  shippingCountry: string | null;
  customerName: string | null;
  customerPhone: string | null;
  productSlug: string;
  productName: string;
  formatLabel: string;
  quantity: number;
  buyerNote: string;
};

/**
 * Structured task spec handed to an agent (Claude for Chrome) or the
 * deterministic extension to re-buy a print on Allegro and ship it to the
 * customer. Same data contract regardless of who executes it.
 */
export type AgentTaskSpec = {
  orderShortId: string;
  offerUrl: string | null;
  variantNote: string | null;
  quantity: number;
  product: { name: string; format: string };
  delivery: {
    method: "courier" | "parcel_locker" | null;
    parcelLockerId: string | null;
    courier: {
      street: string | null;
      city: string | null;
      postalCode: string | null;
      country: string | null;
    } | null;
  };
  recipient: { name: string | null; phone: string | null };
  projectFilesUrl: string;
  sellerNote: string;
};

export function buildAgentSpec(
  order: Doc<"orders">,
  opts: {
    offerUrl: string | null;
    variantNote: string | null;
    projectFilesUrl: string;
  },
): AgentTaskSpec {
  const method = order.deliveryMethod ?? null;
  // Address / recipient go into Allegro's proper fields (ZMIEŃ ADRES + locker
  // pick), so the seller note only needs to carry the print-file link.
  const sellerNote = `Projekt: ${opts.projectFilesUrl}`;
  return {
    orderShortId: shortId(order),
    offerUrl: opts.offerUrl,
    variantNote: opts.variantNote,
    quantity: order.quantity,
    product: { name: order.productName, format: order.formatLabel },
    delivery: {
      method,
      parcelLockerId:
        method === "parcel_locker" ? (order.parcelLockerId ?? null) : null,
      courier:
        method === "courier"
          ? {
              street: order.shippingStreet ?? null,
              city: order.shippingCity ?? null,
              postalCode: order.shippingPostalCode ?? null,
              country: order.shippingCountry ?? null,
            }
          : null,
    },
    recipient: {
      name: order.customerName ?? null,
      phone: order.customerPhone ?? null,
    },
    projectFilesUrl: opts.projectFilesUrl,
    sellerNote,
  };
}

/**
 * Ready-to-paste prompt for Claude for Chrome. Drives the purchase up to — but
 * never including — the payment confirmation, which stays with the human (ToS
 * cover + price/fraud check + Allegro rejects synthetic geowidget clicks).
 */
export function buildAgentPrompt(spec: AgentTaskSpec): string {
  return `ROLA: Operator zakupowy realizujący zamówienie DobrePrinty na Allegro.
Pracujesz w przeglądarce Chrome. Cel: skonfigurować zakup DO ekranu płatności,
ZATRZYMAĆ SIĘ i oddać człowiekowi finalne „kup i zapłać".

DANE ZAMÓWIENIA:
${JSON.stringify(spec, null, 2)}

KROKI (kolejność jak w checkoucie Allegro):
1. Otwórz offerUrl. Jeśli jest null → STOP (brak zmapowanej aukcji).
2. Jeśli oferta ma warianty — wybierz pasujący do variantNote / product.
   Brak pewnego dopasowania → STOP i zapytaj.
3. Ustaw ilość = quantity, przejdź do zakupu („Kup teraz" / „Przejdź do opłacenia").
4. DANE ODBIORCY — w sekcji adresu kliknij „ZMIEŃ ADRES" i ustaw dane na
   recipient: imię i nazwisko = recipient.name, telefon = recipient.phone.
   To krytyczne przy paczkomacie — na ten numer przyjdzie kod odbioru.
   NIE zostawiaj domyślnych danych właściciela konta. Pole „Chcę otrzymać
   fakturę" zostaw bez zmian, chyba że poproszę inaczej.
5. DOSTAWA — punkt odbioru:
   • delivery.method = "parcel_locker":
     a) W „Odbiór w punkcie" zaznacz „Paczkomat InPost".
     b) Kliknij „Zmień punkt".
     c) W mapie, w polu „Wpisz adres" wpisz SAM KOD: delivery.parcelLockerId
        (np. KRA01M) — nie cały adres.
     d) Z podpowiedzi / listy wybierz pasujący punkt
        (np. „Paczkomat KRA01M, … Kraków") i potwierdź wybór.
     e) Jeśli po 2 próbach punkt się nie zatwierdza — ZOSTAW kod widoczny,
        oznacz „do ręcznego wyboru" i idź dalej. Nie podstawiaj innego punktu.
   • delivery.method = "courier": wpisz adres z delivery.courier.
6. UWAGI DO SPRZEDAWCY — w pole uwag wklej DOKŁADNIE sellerNote
   (zawiera link do plików do druku: projectFilesUrl).
7. Przejdź do podsumowania zamówienia.

TWARDE ZASADY (STOP):
- NIGDY nie klikaj „kup i zapłać" / nie potwierdzaj płatności.
- Jeśli cena różni się od oczekiwanej > 10% — STOP, zapytaj.
- Captcha / weryfikacja / nietypowy modal — STOP, oddaj człowiekowi.
- Cokolwiek niepewnego → STOP z opisem co widzisz, nie zgaduj.

WYNIK: krótkie podsumowanie (wariant, ilość, dane odbiorcy ustawione?,
wybrany punkt/paczkomat, czy uwagi z linkiem wklejone), lista pól
„do ręcznego potwierdzenia", oraz czy ekran jest gotowy do opłacenia.`;
}

/**
 * Project an order to the minimal set the extension needs to fill the Allegro
 * checkout. Deliberately omits email, prices, Stripe IDs and NIP — they are not
 * needed to address a parcel and keeping them out limits PII exposure.
 */
export function shapeFulfillmentPayload(
  order: Doc<"orders">,
): FulfillmentPayload {
  return {
    shortId: shortId(order),
    deliveryMethod: order.deliveryMethod ?? null,
    parcelLockerId: order.parcelLockerId ?? null,
    parcelLockerName: order.parcelLockerName ?? null,
    parcelLockerAddress: order.parcelLockerAddress ?? null,
    parcelLockerDescription: order.parcelLockerDescription ?? null,
    shippingStreet: order.shippingStreet ?? null,
    shippingCity: order.shippingCity ?? null,
    shippingPostalCode: order.shippingPostalCode ?? null,
    shippingCountry: order.shippingCountry ?? null,
    customerName: order.customerName ?? null,
    customerPhone: order.customerPhone ?? null,
    productSlug: order.productSlug,
    productName: order.productName,
    formatLabel: order.formatLabel,
    quantity: order.quantity,
    buyerNote: buildBuyerNote(order),
  };
}
