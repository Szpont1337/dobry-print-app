// Server-side source of truth for order pricing. The client never gets to
// dictate the price — submitOrder recomputes every monetary value here from the
// product catalog. Imports are pure data / pure math (no browser/node deps), so
// they bundle cleanly into Convex.
import { products, unitPriceForQuantity } from "../src/lib/products";
import { VAT_RATE, withShipping } from "../src/lib/shipping";
import { type Locale, tErr } from "./i18nError";

const SETUP_FEE = 4.5;
export const MIN_QTY = 1;
export const MAX_QTY = 100_000;

function priceFor(quantity: number, unitPrice: number, noFees: boolean): number {
  if (noFees) return quantity * unitPrice;
  const scale =
    quantity < 25 ? 3 : quantity < 250 ? 2.2 : quantity < 1000 ? 1.4 : 1;
  return SETUP_FEE + quantity * unitPrice * scale;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export type ComputedOrder = {
  productName: string;
  formatLabel: string;
  unitPrice: number;
  quantity: number;
  netTotal: number;
  vatTotal: number;
  grossTotal: number;
  shippingFee: number;
};

/**
 * Look the product/format up in the catalog and recompute totals. Throws on an
 * unknown product/format or an out-of-range quantity — that doubles as
 * server-side validation of the client-supplied slug/format/quantity.
 */
export function computeOrderTotals(
  productSlug: string,
  formatId: string,
  quantity: number,
  locale?: Locale,
): ComputedOrder {
  const q = Math.round(quantity);
  if (!Number.isFinite(q) || q < MIN_QTY || q > MAX_QTY) {
    throw new Error(tErr(locale, "Nieprawidłowy nakład.", "Invalid quantity."));
  }
  const product = products.find((p) => p.slug === productSlug);
  if (!product) {
    throw new Error(tErr(locale, "Nieznany produkt.", "Unknown product."));
  }
  const format = product.formats.find((f) => f.id === formatId);
  if (!format) {
    throw new Error(tErr(locale, "Nieznany format.", "Unknown format."));
  }

  const unitPrice = unitPriceForQuantity(product, format, q);
  const productNet = priceFor(q, unitPrice, product.noFees ?? false);
  const productVat = productNet * VAT_RATE;
  const productGross = productNet + productVat;
  const totals = withShipping(productNet, productVat, productGross);

  return {
    productName: product.name,
    formatLabel: format.label,
    unitPrice,
    quantity: q,
    netTotal: round2(totals.net),
    vatTotal: round2(totals.vat),
    grossTotal: round2(totals.gross),
    shippingFee: round2(totals.shippingFee),
  };
}
