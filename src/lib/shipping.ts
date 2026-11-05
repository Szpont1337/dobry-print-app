// Shipping cost rules (all values in PLN), the same as the backend's (drukalo-poc
// src/lib/shipping.ts): it charges them. Free at/above the threshold.
// Threshold aligned with Allegro Smart! single free-delivery limit (49,90 zł).

export type DeliveryMethod = "courier" | "parcel_locker";

export const FREE_SHIPPING_THRESHOLD = 50; // zł — od tej kwoty wysyłka gratis
export const SHIPPING_FEE_LOCKER = 12; // zł — paczkomat InPost poniżej progu
export const SHIPPING_FEE_COURIER = 15; // zł — kurier poniżej progu

/** Shipping fee for a product total; before a method is chosen, the cheapest. 0 means free. */
export function shippingFeeFor(
  productTotal: number,
  method: DeliveryMethod = "parcel_locker",
): number {
  if (productTotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return method === "courier" ? SHIPPING_FEE_COURIER : SHIPPING_FEE_LOCKER;
}

/** Kwota produktu + wysyłka = kwota do zapłaty. */
export function withShipping(productTotal: number, method?: DeliveryMethod) {
  const fee = shippingFeeFor(productTotal, method);
  return { shippingFee: fee, total: productTotal + fee };
}
