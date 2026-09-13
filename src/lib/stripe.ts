import "server-only";

import Stripe from "stripe";

// Shared server-side helpers live in serverEnv.ts (no Stripe dependency) and
// are re-exported here for back-compat with existing imports.
export { getConvexHttp, getServerSecret, getSiteUrl } from "./serverEnv";

const secret = process.env.STRIPE_SECRET_KEY;

export const stripe = new Stripe(secret ?? "missing_key", {
  typescript: true,
});

/**
 * Id zamówień opłacanych JEDNĄ sesją. Koszyk tworzy kilka zamówień naraz i
 * wszystkie lądują w metadanych sesji — po samym id sesji nie da się ich
 * jednoznacznie odszukać, bo dzieli je kilka rekordów.
 */
export function orderIdsFromMetadata(
  metadata: Stripe.Metadata | null | undefined,
): string[] {
  const joined = metadata?.orderIds ?? metadata?.orderId ?? "";
  return joined
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

export function assertStripeConfigured() {
  if (!secret) {
    throw new Error("Brak STRIPE_SECRET_KEY w środowisku.");
  }
}

/** Minimum danych zamówienia potrzebne do złożenia payera w Stripe. */
type BillingOrder = {
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  companyName?: string;
  taxId?: string;
  stripeCustomerId?: string;
};

/**
 * Składa część sesji Checkout odpowiadającą za payera i dane na fakturze.
 *
 * Gdy znamy NIP, zakładamy (albo odzyskujemy) Customera z nazwą firmy i tax id
 * `pl_nip` — Stripe renderuje z niego fakturę. Typ `pl_nip`, nie `eu_vat`: to
 * numer NIP, nie numer VAT-UE, a DobrePrinty nie jest podatnikiem VAT. Bez
 * NIP-u zostaje zwykła ścieżka z `customer_creation` — NIP i firmę zbiera
 * wtedy Stripe przez `tax_id_collection` na sesji.
 *
 * Adresu rozliczeniowego nie mamy skąd wziąć (formularz zbiera adres WYSYŁKI,
 * a przy paczkomacie nie ma nawet ulicy), więc zbiera go Stripe i przez
 * `customer_update` dokleja do Customera.
 *
 * Zwraca też `createdCustomerId`, gdy Customer powstał w tym wywołaniu —
 * wołający zapisuje go przy zamówieniu, żeby kolejne linki „zapłać" nie
 * mnożyły kopii tego samego klienta.
 */
export async function billingParamsFor(order: BillingOrder): Promise<{
  params: Partial<Stripe.Checkout.SessionCreateParams>;
  createdCustomerId?: string;
}> {
  const nip = order.taxId?.replace(/[\s-]/g, "");
  if (!nip) {
    return {
      params: {
        customer_email: order.customerEmail,
        customer_creation: "always",
      },
    };
  }

  if (order.stripeCustomerId) {
    return {
      params: {
        customer: order.stripeCustomerId,
        customer_update: { address: "auto", name: "auto" },
      },
    };
  }

  const customer = await stripe.customers.create({
    name: order.companyName?.trim() || order.customerName,
    email: order.customerEmail,
    ...(order.customerPhone ? { phone: order.customerPhone } : {}),
  });
  await stripe.customers.createTaxId(customer.id, {
    type: "pl_nip",
    value: nip,
  });

  return {
    params: {
      customer: customer.id,
      customer_update: { address: "auto", name: "auto" },
    },
    createdCustomerId: customer.id,
  };
}
