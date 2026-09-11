// Shipping cost rules (all values in PLN).
// Free shipping at/above the threshold, otherwise a flat fee.
// Threshold aligned with Allegro Smart! single free-delivery limit (49,90 zł).

export const FREE_SHIPPING_THRESHOLD = 50; // zł — od tej kwoty wysyłka gratis
export const SHIPPING_FEE = 10; // zł — opłata poniżej progu

/** Shipping fee for a given product total. 0 means free. */
export function shippingFeeFor(productTotal: number): number {
  return productTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

/** Kwota produktu + wysyłka = kwota do zapłaty. */
export function withShipping(productTotal: number) {
  const fee = shippingFeeFor(productTotal);
  return { shippingFee: fee, total: productTotal + fee };
}
