// Wycena dla MCP — ta sama ścieżka co konfigurator (computeTotals), plus
// najbliższe progi, przy których cena za sztukę spada, żeby asystent mógł
// podpowiedzieć „250 szt. kosztuje niewiele więcej niż 200".

import { computeTotals, type OrderTotals } from "@/lib/pricing";
import type { PrintSide, Product, ProductFormat } from "@/lib/products";

export type Quote = OrderTotals & {
  quantity: number;
  unitPrice: number;
  currency: "PLN";
  /** wyższe progi nakładu z ceną łączną i za sztukę */
  breakpoints: { quantity: number; total: number; unitPrice: number }[];
};

/** Progi skali nakładu z priceFor (pricing.ts) — cena/szt. spada od tych ilości. */
const SCALE_BREAKPOINTS = [25, 250, 1000];

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function breakpointsFor(product: Product): number[] {
  if (product.priceTiers && product.priceTiers.length > 0) {
    return product.priceTiers.map((t) => t.minQty);
  }
  return product.noFees ? [] : SCALE_BREAKPOINTS;
}

export function quoteFor(
  product: Product,
  format: ProductFormat,
  quantity: number,
  sides?: PrintSide,
): Quote {
  const totals = computeTotals(product, format, quantity, sides);
  const breakpoints = breakpointsFor(product)
    .filter((q) => q > quantity)
    .slice(0, 3)
    .map((q) => {
      const t = computeTotals(product, format, q, sides);
      return { quantity: q, total: round2(t.productTotal), unitPrice: round2(t.productTotal / q) };
    });
  return {
    productTotal: round2(totals.productTotal),
    shippingFee: round2(totals.shippingFee),
    total: round2(totals.total),
    quantity,
    unitPrice: round2(totals.productTotal / quantity),
    currency: "PLN",
    breakpoints,
  };
}
