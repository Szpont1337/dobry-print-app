"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Wersjonowany klucz — bumpnij sufiks, jeśli kształt szkicu się zmieni. */
export const ORDER_DRAFT_KEY = "DobrePrinty:order-draft:v1";

/** Event emitowany w obrębie tej samej karty po zapisie/wyczyszczeniu szkicu. */
export const ORDER_DRAFT_EVENT = "DobrePrinty:order-draft";

export type OrderDraftConfig = {
  slug: string;
  formatId: string;
  quantity: number;
};

function readConfig(): OrderDraftConfig | null {
  try {
    const raw = localStorage.getItem(ORDER_DRAFT_KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw) as { config?: OrderDraftConfig };
    const config = draft?.config;
    if (config && typeof config.slug === "string") return config;
    return null;
  } catch {
    return null;
  }
}

/** Buduje URL powrotu do zamówienia z zachowanej konfiguracji produktu. */
export function orderHref(config: OrderDraftConfig): string {
  return `/zamowienie/${config.slug}?qty=${config.quantity}&format=${config.formatId}`;
}

/**
 * Zwraca konfigurację aktywnego szkicu zamówienia (albo null). Aktualizuje się
 * przy nawigacji, między kartami (`storage`) oraz po zapisie w tej samej karcie
 * (custom event). Dzięki temu navbar wie, kiedy pokazać ikonę koszyka.
 */
export function useOrderDraft(): OrderDraftConfig | null {
  const pathname = usePathname();
  const [config, setConfig] = useState<OrderDraftConfig | null>(null);

  useEffect(() => {
    const key = (c: OrderDraftConfig | null) =>
      c ? `${c.slug}|${c.formatId}|${c.quantity}` : "";
    const update = () => {
      const next = readConfig();
      // Unikamy zbędnego re-renderu navbara przy każdym keystroke w formularzu.
      setConfig((prev) => (key(prev) === key(next) ? prev : next));
    };
    update();
    window.addEventListener("storage", update);
    window.addEventListener(ORDER_DRAFT_EVENT, update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener(ORDER_DRAFT_EVENT, update);
    };
  }, [pathname]);

  return config;
}
