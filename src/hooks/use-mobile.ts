"use client";

import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 768;
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

function subscribe(onChange: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * Rozróżnienie telefon/desktop po media query (konwencja shadcn/ui, ale przez
 * `useSyncExternalStore` zamiast efektu z setState — bez kaskady renderów).
 *
 * Na serwerze i w trakcie hydratacji zwraca `false`; komponenty, które z tego
 * korzystają, montują się po interakcji, więc nie ma rozjazdu hydratacji.
 */
export function useIsMobile(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
