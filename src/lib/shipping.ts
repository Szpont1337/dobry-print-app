// Shipping cost rules (all values in PLN, gross / brutto).
// Free shipping at/above the threshold, otherwise a flat fee.
// Threshold aligned with Allegro Smart! single free-delivery limit (49,90 zł).

export const VAT_RATE = 0.23;
export const FREE_SHIPPING_THRESHOLD = 50; // zł brutto — od tej kwoty wysyłka gratis
export const SHIPPING_FEE = 10; // zł brutto — opłata poniżej progu

/** Shipping fee (gross) for a given product gross value. 0 means free. */
export function shippingFeeFor(productGross: number): number {
  return productGross >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

/**
 * Combine a product's net/vat/gross with the shipping fee (gross) into order
 * totals. Shipping carries the same 23% VAT, split out of the gross fee.
 */
export function withShipping(net: number, vat: number, gross: number) {
  const fee = shippingFeeFor(gross);
  const feeNet = fee / (1 + VAT_RATE);
  return {
    shippingFee: fee,
    net: net + feeNet,
    vat: vat + (fee - feeNet),
    gross: gross + fee,
  };
}
