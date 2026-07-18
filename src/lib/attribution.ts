// First-touch atrybucja ruchu — zapisywana w localStorage przy PIERWSZYM
// wejściu i NIE nadpisywana przy kolejnych. Dane własne, nie-PII, bez
// third-party cookies → działa dla WSZYSTKICH odwiedzających (w odróżnieniu
// od PostHog/GA, które ładują się dopiero po zgodzie na cookies).

import { currentBrand } from "./brands";
import {
  classifyTrafficSource,
  referrerHostname,
  type TrafficChannel,
} from "./traffic-source";

const STORAGE_KEY = "first_touch_attribution";

export interface StoredAttribution {
  referrerDomain: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  landing: string;
  ts: number;
}

// Argumenty przekazywane do mutacji submitOrder (rozpłaszczone). Zawiera też
// markę (drukalo/dobreprinty), by front oznaczał zamówienie w wspólnej bazie.
export interface OrderAttributionArgs {
  brand: string;
  attrChannel: string;
  attrSourceName: string;
  attrReferrer?: string;
  attrUtmSource?: string;
  attrLanding?: string;
}

/**
 * Zapisuje first-touch atrybucję jeśli jeszcze jej nie ma. Bezpieczne do
 * wielokrotnego wywołania (no-op gdy wpis istnieje). Wołane po stronie klienta.
 */
export function captureFirstTouch(): void {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem(STORAGE_KEY)) return; // first-touch — nie nadpisuj

    const params = new URLSearchParams(window.location.search);
    const data: StoredAttribution = {
      referrerDomain: referrerHostname(document.referrer),
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      landing: window.location.pathname,
      ts: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage może być niedostępny (tryb prywatny) — ignorujemy.
  }
}

/** Odczytuje zapisaną atrybucję (albo null). */
export function readFirstTouch(): StoredAttribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredAttribution;
  } catch {
    return null;
  }
}

/**
 * Zwraca argumenty atrybucji gotowe do wysłania w mutacji createOrder.
 * Klasyfikuje first-touch źródło na kanał (ai_llm / organic / …).
 */
export function getOrderAttribution(): OrderAttributionArgs {
  const stored = readFirstTouch();
  const { channel, sourceName } = classifyTrafficSource({
    referrerDomain: stored?.referrerDomain,
    utmSource: stored?.utmSource,
    utmMedium: stored?.utmMedium,
  });
  return {
    brand: currentBrand(),
    attrChannel: channel satisfies TrafficChannel,
    attrSourceName: sourceName,
    attrReferrer: stored?.referrerDomain || undefined,
    attrUtmSource: stored?.utmSource || undefined,
    attrLanding: stored?.landing || undefined,
  };
}
