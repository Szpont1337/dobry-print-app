"use client";

import { useEffect } from "react";

import { clearCart } from "@/lib/cart";

/**
 * Czyści koszyk po POTWIERDZONEJ płatności.
 *
 * Wcześniej robił to formularz checkoutu, zaraz po zapisaniu zamówień — czyli
 * jeszcze przed przejściem do Stripe'a. Kto porzucił płatność albo cofnął się
 * ze Stripe'a, wracał do pustego koszyka i musiał składać wszystko od nowa.
 *
 * Renderowane tylko gdy całe zamówienie jest opłacone (patrz `page.tsx`).
 */
export function ClearCartOnSuccess() {
  useEffect(() => {
    clearCart();
  }, []);
  return null;
}
