// Rejestr marek dzielących JEDEN wspólny backend Convex + JEDEN projekt PostHog.
// Marka zamówienia = domena, z której złożono zamówienie (drukalo.pl vs
// dobreprinty.pl). Współdzielony plik — identyczny w obu repo.

export type BrandKey = "drukalo" | "dobreprinty";

export interface BrandInfo {
  key: BrandKey;
  label: string;
  emoji: string;
}

// Kolejność = kolejność w raporcie.
export const BRANDS: BrandInfo[] = [
  { key: "drukalo", label: "drukalo.pl", emoji: "🟠" },
  { key: "dobreprinty", label: "dobreprinty.pl", emoji: "🟢" },
];

// Marka dla starych zamówień bez pola `brand` oraz gdy domeny nie da się
// rozpoznać (localhost / preview). drukalo to marka pierwotna.
export const DEFAULT_BRAND: BrandKey = "drukalo";

// Rozpoznaje markę po hoście. null = nieznana domena (np. vercel preview).
export function matchBrand(host?: string | null): BrandKey | null {
  const h = (host ?? "").toLowerCase();
  if (h.includes("dobreprint")) return "dobreprinty";
  if (h.includes("drukalo")) return "drukalo";
  return null;
}

// Marka bieżącej domeny (po stronie klienta). Fallback do DEFAULT_BRAND.
export function currentBrand(): BrandKey {
  if (typeof window === "undefined") return DEFAULT_BRAND;
  return matchBrand(window.location.hostname) ?? DEFAULT_BRAND;
}

// Normalizuje dowolną wartość `brand` z bazy do znanego klucza.
export function normalizeBrand(value?: string | null): BrandKey {
  return value === "dobreprinty" ? "dobreprinty" : "drukalo";
}
