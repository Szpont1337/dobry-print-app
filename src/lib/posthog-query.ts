// Odpytuje PostHog Query API (HogQL) o dzienne wejścia i rozbija je na kanały
// źródeł ruchu. Server-side — reużywane w akcjach Convex (raport dzienny).
//
// Wymaga env:
//   POSTHOG_API_KEY     — Personal API Key z uprawnieniem odczytu (query:read)
//   POSTHOG_PROJECT_ID  — numeryczne ID projektu PostHog
//   POSTHOG_API_HOST    — opcjonalnie; domyślnie NEXT_PUBLIC_POSTHOG_HOST
//                         (np. https://eu.posthog.com)
//
// UWAGA: PostHog ładuje się dopiero PO zgodzie na cookies, więc liczby są
// kierunkowe/zaniżone (nie liczą odwiedzających bez zgody).

import {
  classifyTrafficSource,
  type TrafficChannel,
} from "./traffic-source";

export interface DailyTraffic {
  visits: number;
  byChannel: Record<TrafficChannel, number>;
  // true gdy PostHog nie był skonfigurowany / zapytanie padło.
  unavailable?: boolean;
}

function emptyByChannel(): Record<TrafficChannel, number> {
  return {
    ai_llm: 0,
    organic: 0,
    paid: 0,
    social: 0,
    referral: 0,
    direct: 0,
  };
}

/**
 * Liczy $pageview z okna [startMs, endMs) i grupuje po kanale źródła.
 * Zwraca `{ unavailable: true }` gdy brak konfiguracji lub błąd API — raport
 * i tak się wyśle, tylko z adnotacją.
 */
export async function fetchDailyTraffic(
  startMs: number,
  endMs: number,
): Promise<DailyTraffic> {
  const apiKey = process.env.POSTHOG_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const host =
    process.env.POSTHOG_API_HOST ??
    process.env.NEXT_PUBLIC_POSTHOG_HOST ??
    "https://eu.posthog.com";

  if (!apiKey || !projectId) {
    return { visits: 0, byChannel: emptyByChannel(), unavailable: true };
  }

  const startSec = Math.floor(startMs / 1000);
  const endSec = Math.floor(endMs / 1000);

  // Grupujemy po domenie odsyłającej i utm_source. Klasyfikację na kanał
  // robimy w JS (współdzielony klasyfikator), nie w SQL.
  const query = `
    SELECT
      properties['$referring_domain'] AS dom,
      properties['$utm_source'] AS utm,
      properties['$utm_medium'] AS med,
      count() AS c
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= fromUnixTimestamp(${startSec})
      AND timestamp < fromUnixTimestamp(${endSec})
    GROUP BY dom, utm, med
  `;

  try {
    const res = await fetch(
      `${host.replace(/\/$/, "")}/api/projects/${projectId}/query/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          query: { kind: "HogQLQuery", query },
        }),
      },
    );

    if (!res.ok) {
      console.error("[posthog] Query API zwrócił", res.status, await res.text());
      return { visits: 0, byChannel: emptyByChannel(), unavailable: true };
    }

    const data = (await res.json()) as { results?: unknown[][] };
    const rows = data.results ?? [];

    const byChannel = emptyByChannel();
    let visits = 0;

    for (const row of rows) {
      // Kolejność kolumn zgodna z SELECT: dom, utm, med, c.
      const dom = (row[0] as string | null) ?? "";
      const utm = (row[1] as string | null) ?? "";
      const med = (row[2] as string | null) ?? "";
      const c = Number(row[3] ?? 0);
      if (!Number.isFinite(c) || c <= 0) continue;

      const { channel } = classifyTrafficSource({
        referrerDomain: normalizeDomain(dom),
        utmSource: utm,
        utmMedium: med,
      });
      byChannel[channel] += c;
      visits += c;
    }

    return { visits, byChannel };
  } catch (err) {
    console.error("[posthog] Błąd zapytania Query API", err);
    return { visits: 0, byChannel: emptyByChannel(), unavailable: true };
  }
}

// PostHog zapisuje $referring_domain jako sam host (np. "www.google.com"),
// ale bywa "$direct" dla wejść bezpośrednich — traktujemy to jak brak.
function normalizeDomain(dom: string): string {
  const d = dom.trim().toLowerCase();
  if (!d || d === "$direct" || d === "(direct)") return "";
  return d;
}
