import { miasta, type Miasto } from "@/data/miasta";

/**
 * Miasta z unikalnym, redakcyjnym copy (override w `src/data/miasta-tresc.ts`).
 * Wszystkie strony miast generuje teraz jeden szablon przez `generateStaticParams`
 * — ta lista wymusza indeksowanie tych miast niezależnie od progu populacji
 * (mają pełną, ręcznie pisaną treść, więc zawsze chcemy je w indeksie).
 */
export const STATIC_CITY_SLUGS = new Set<string>([
  "warszawa",
  "krakow",
  "lublin",
  "bialystok",
  "wroclaw",
  "lodz",
  "poznan",
  "gdansk",
  "szczecin",
  "bydgoszcz",
  "katowice",
  "gdynia",
  "czestochowa",
  "radom",
  "rzeszow",
  "torun",
  "sosnowiec",
  "kielce",
  "gliwice",
  "olsztyn",
  "bielsko-biala",
  "zabrze",
  "bytom",
  "zielona-gora",
  "rybnik",
  "ruda-slaska",
  "opole",
  "tychy",
  "gorzow-wielkopolski",
  "dabrowa-gornicza",
  "elblag",
  "plock",
  "walbrzych",
  "wloclawek",
  "tarnow",
  "koszalin",
  "chorzow",
]);

/**
 * Próg populacji, powyżej którego dynamiczna strona miasta trafia do indeksu
 * Google. Mniejsze miasta są celowo trzymane poza indeksem (noindex + brak w
 * sitemap), żeby nie generować masy cienkich, szablonowych podstron
 * (tzw. doorway pages). Zmiana tej jednej wartości przesuwa granicę.
 */
export const MIN_INDEXABLE_POPULACJA = 50000;

export function isStaticCity(slug: string): boolean {
  return STATIC_CITY_SLUGS.has(slug);
}

/**
 * Czy strona danego miasta ma być indeksowana przez Google.
 * Kolejność decyzji:
 *  1. miasta z redakcyjnym copy (STATIC_CITY_SLUGS) — zawsze tak,
 *  2. ręczny override przez pole `indeksuj` w danych miasta,
 *  3. próg populacji.
 */
export function isIndexableMiasto(miasto: Miasto): boolean {
  if (isStaticCity(miasto.slug)) return true;
  if (typeof miasto.indeksuj === "boolean") return miasto.indeksuj;
  return miasto.populacja >= MIN_INDEXABLE_POPULACJA;
}

/**
 * Wszystkie indeksowalne miasta. Trasa `drukarnia/[miasto]` używa tej listy w
 * `generateStaticParams`, żeby pre-renderować statycznie dokładnie te strony,
 * które chcemy w indeksie. Miasta nieindeksowalne i tak działają na żądanie
 * (`dynamicParams = true`), tyle że z noindex i poza sitemap.
 */
export function getIndexableMiasta(): Miasto[] {
  return miasta.filter(isIndexableMiasto);
}

/**
 * Metadane `robots` dla strony miasta. Dla nieindeksowalnych zwraca noindex
 * (z `follow: true`, żeby link equity nadal przepływał), dla pozostałych
 * `undefined` (dziedziczy domyślne, indeksowalne ustawienia z layoutu).
 */
export function robotsForMiasto(
  miasto: Miasto,
): { index: false; follow: true } | undefined {
  return isIndexableMiasto(miasto) ? undefined : { index: false, follow: true };
}
