// Server-side source of truth for order pricing. The client never gets to
// dictate the price — submitOrder recomputes every monetary value here from the
// product catalog. Imports are pure data / pure math (no browser/node deps), so
// they bundle cleanly into Convex.
import { PRICE_FACTOR } from "../src/lib/pricing";
import { products, unitPriceForQuantity } from "../src/lib/products";
import { withShipping } from "../src/lib/shipping";
import { type Locale, tErr } from "./i18nError";

const SETUP_FEE = 4.5;
export const MIN_QTY = 1;
export const MAX_QTY = 100_000;

function priceFor(quantity: number, unitPrice: number, noFees: boolean): number {
  if (noFees) return quantity * unitPrice * PRICE_FACTOR;
  const scale = quantity < 25 ? 3 : quantity < 250 ? 2.2 : quantity < 1000 ? 1.4 : 1;
  return (SETUP_FEE + quantity * unitPrice * scale) * PRICE_FACTOR;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export type ComputedOrder = {
  productName: string;
  formatLabel: string;
  unitPrice: number;
  quantity: number;
  grossTotal: number;
  shippingFee: number;
};

/** Pozycja policzona BEZ wysyłki. Kwoty SUROWE (bez round2) — w koszyku
 *  sumujemy je przed doliczeniem wysyłki, więc zaokrąglamy dopiero na końcu. */
export type ComputedItem = Omit<ComputedOrder, "shippingFee">;

/**
 * Look the product/format up in the catalog and recompute totals. Throws on an
 * unknown product/format or an out-of-range quantity — that doubles as
 * server-side validation of the client-supplied slug/format/quantity.
 *
 * Wysyłki NIE dolicza — robi to `computeOrderTotals` (jedna pozycja) albo
 * `splitCartTotals` (koszyk: jedna wysyłka od sumy).
 */
export function computeItemTotals(
  productSlug: string,
  formatId: string,
  quantity: number,
  locale?: Locale,
): ComputedItem {
  const q = Math.round(quantity);
  if (!Number.isFinite(q) || q < MIN_QTY || q > MAX_QTY) {
    throw new Error(tErr(locale, "Nieprawidłowy nakład.", "Invalid quantity."));
  }
  const product = products.find((p) => p.slug === productSlug);
  if (!product) {
    throw new Error(tErr(locale, "Nieznany produkt.", "Unknown product."));
  }
  // Minimum nakładu per produkt (np. naklejki od 100 szt.).
  if (q < (product.minQuantity ?? MIN_QTY)) {
    throw new Error(tErr(locale, "Nieprawidłowy nakład.", "Invalid quantity."));
  }
  const format = product.formats.find((f) => f.id === formatId);
  if (!format) {
    throw new Error(tErr(locale, "Nieznany format.", "Unknown format."));
  }

  const unitPrice = unitPriceForQuantity(product, format, q);

  return {
    productName: product.name,
    formatLabel: format.label,
    unitPrice,
    quantity: q,
    grossTotal: priceFor(q, unitPrice, product.noFees ?? false),
  };
}

/** Jedna pozycja + wysyłka liczona od jej wartości. Ścieżka `submitOrder`. */
export function computeOrderTotals(
  productSlug: string,
  formatId: string,
  quantity: number,
  locale?: Locale,
): ComputedOrder {
  const item = computeItemTotals(productSlug, formatId, quantity, locale);
  const totals = withShipping(item.grossTotal);
  return {
    ...item,
    grossTotal: round2(totals.total),
    shippingFee: round2(totals.shippingFee),
  };
}

/** Kwoty jednego zamówienia z koszyka (po rozdzieleniu wysyłki). */
export type CartLineTotals = {
  grossTotal: number;
  shippingFee: number;
};

/**
 * Rozdziela wysyłkę na pozycje koszyka. Wysyłka liczona JEDEN raz — od sumy
 * całego koszyka (próg darmowej wysyłki też patrzy na sumę) — i w
 * całości doklejona do pierwszego zamówienia. Dzięki temu suma `grossTotal`
 * wszystkich zamówień = kwota realnie pobrana w Stripe.
 */
export function splitCartTotals(items: ComputedItem[]): CartLineTotals[] {
  const cart = withShipping(items.reduce((sum, i) => sum + i.grossTotal, 0));

  return items.map((item, index) => {
    const first = index === 0;
    return {
      grossTotal: round2(item.grossTotal + (first ? cart.shippingFee : 0)),
      shippingFee: first ? round2(cart.shippingFee) : 0,
    };
  });
}
