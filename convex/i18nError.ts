// Tiny bilingual error helper for user-facing messages thrown from Convex
// functions. The UI surfaces err.message directly, so honour the caller locale.
export type Locale = "pl" | "en";

export function tErr(locale: Locale | undefined, pl: string, en: string): string {
  return locale === "en" ? en : pl;
}
