"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Konwencja shadcn/ui: rozróżnienie telefon/desktop po media query.
 * Pierwszy render zwraca `false` (brak window) — komponenty, które z tego
 * korzystają, montują się po interakcji, więc nie ma rozjazdu hydratacji.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
