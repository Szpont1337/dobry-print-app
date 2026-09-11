"use client";

import { useMemo, useSyncExternalStore } from "react";

import {
  getCartServerSnapshot,
  getCartSnapshot,
  resolveCart,
  subscribeCart,
} from "@/lib/cart";

/**
 * Zawartość koszyka wyceniona o katalog.
 *
 * Czyta store w pamięci (`@/lib/cart`), więc każda zmiana — dodanie pozycji,
 * nakład, usunięcie — jest widoczna natychmiast, bez czekania na localStorage
 * czy serwer. Zmiany z innej karty dociągane są przez event `storage`.
 *
 * `ready` odróżnia „jeszcze nie odczytaliśmy localStorage" (SSR / pierwszy
 * render) od „koszyk jest pusty", żeby UI nie mrugał pustym stanem.
 */
export function useCart() {
  const state = useSyncExternalStore(subscribeCart, getCartSnapshot, getCartServerSnapshot);

  const { items, totals } = useMemo(() => resolveCart(state.items), [state.items]);

  return { items, totals, count: items.length, ready: state.hydrated };
}
