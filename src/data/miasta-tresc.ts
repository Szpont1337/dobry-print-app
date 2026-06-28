import { miastaTresc } from "./miasta-tresc-data";

/**
 * Per-miasto override treści strony „Drukarnia <miasto>". Klucz = slug miasta.
 *
 * Strony miast są generowane z JEDNEGO szablonu (`CityPageContent`) na podstawie
 * danych z `src/data/miasta.ts` — Next buduje je statycznie przez
 * `generateStaticParams`. Dla miast, które wymagają unikalnego, ręcznie pisanego
 * copy (duże rynki, miasta o silnym kontekście lokalnym), dane redakcyjne trafiają
 * do `miasta-tresc-data.ts` i nadpisują proceduralne fallbacki szablonu. Miasta bez
 * wpisu renderują się w pełni proceduralnie — żeby dodać nowe miasto wystarczy wpis
 * w `miasta.ts`.
 */
export type MiastoTresc = {
  /** <meta name="description"> — nadpisuje domyślny, szablonowy opis. */
  metaDescription?: string;
  /** openGraph.description. */
  ogDescription?: string;
  /** Akapit wprowadzający w hero (pod H1). */
  heroLead?: string;
  /** Chipy z branżami/segmentami w hero. */
  industryTags?: string[];
  /** Body pierwszego kafelka („Dostawa do …") — zwykle z lokalnymi dzielnicami. */
  dostawaBody?: string;
  /** Nagłówek <h2> sekcji katalogu produktów. */
  katalogHeading?: string;
  /** Lokalny opis pod-produktów w katalogu: slug produktu → tekst. */
  localProductCopy?: Record<string, string>;
  /** Akapity sekcji „Druk dla biznesu w <miasto>" (zwykle 4). */
  paragraphs?: string[];
  /** Wyróżniony box ze statystyką: `strong` (pogrubiony prefiks) + `rest`. */
  statBadge?: { strong: string; rest: string };
  /** Pytania i odpowiedzi FAQ. */
  faqs?: { question: string; answer: string }[];
  /** Środek obszaru obsługi (schema.org serviceArea.geoMidpoint). */
  geo?: { lat: number; lng: number };
  /** schema.org LocalBusiness.knowsAbout. */
  knowsAbout?: string[];
};

export { miastaTresc };

export function getMiastoTresc(slug: string): MiastoTresc {
  return miastaTresc[slug] ?? {};
}
