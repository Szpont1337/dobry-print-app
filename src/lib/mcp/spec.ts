// Specyfikacja pliku do druku dla produktu + formatu — dla asystentów AI
// (MCP), żeby grafika generowana w ChatGPT/Claude od razu miała właściwe
// proporcje, spady i rozdzielczość. Wymiary czytamy z etykiety formatu
// (jedno źródło prawdy w products.ts), więc nowy format = nowa specyfikacja.

import { getProduct, type Product, type ProductFormat, visibleProducts } from "@/lib/products";
import { ALLOWED_UPLOAD_EXTENSIONS } from "@convex/uploadRules";

export const BLEED_MM = 3;
export const SAFE_MM = 3;
export const PRINT_DPI = 300;

export type Mm = { width: number; height: number };

export type PrintSpec = {
  product: { slug: string; name: string; url: string };
  format: { id: string; label: string };
  /** format finalny (po obcięciu) albo pole nadruku (tekstylia) */
  trimMm: Mm;
  bleedMm: number;
  safeMm: number;
  /** trim + spad z każdej strony — taki ma być dokument */
  documentMm: Mm;
  /** rozmiar dokumentu w pikselach przy 300 dpi */
  pixels: Mm & { dpi: number };
  /** proporcja dokumentu (szer/wys), np. 1.49 */
  aspectRatio: number;
  colorMode: "CMYK";
  fileFormats: string[];
  /** papier / materiał / technologia z katalogu */
  material: string;
  /** opcje stronności do wyboru (pusta = stała, opisana w `material`) */
  sides: string[];
  /** rozłożony arkusz (składane ulotki) */
  unfoldedMm?: Mm;
  notes: string[];
};

/**
 * Wyjątki od parsowania etykiety: tekstylia i torby mają pole nadruku, nie
 * format arkusza. Bez spadu — grafika to PNG z przezroczystym tłem.
 */
const PRINT_AREA_OVERRIDES: Record<string, { area: Mm; notes: string[] }> = {
  koszulki: {
    area: { width: 210, height: 297 },
    notes: [
      "Nadruk DTG na białej bawełnie: pole nadruku ok. A4 (21 × 29 cm) na środku przodu; przy opcji przód + plecy drugie takie samo na plecach. Rozmiar nadruku dopasujesz suwakiem w podglądzie na stronie.",
      "Wgraj PNG z przezroczystym tłem, bez spadów. Białe elementy grafiki zlewają się z koszulką.",
    ],
  },
  "torby-plocienne": {
    area: { width: 210, height: 297 },
    notes: [
      "Pole nadruku A4 na przodzie torby, bawełna naturalna (ecru) — jasne kolory będą mniej nasycone.",
      "Wgraj PNG z przezroczystym tłem, bez spadów.",
    ],
  },
};

const DIM_RE = /(\d+(?:[.,]\d+)?)\s*×\s*(\d+(?:[.,]\d+)?)(?:\s*×\s*(\d+(?:[.,]\d+)?))?\s*(mm|cm)/;

/** Wymiary z etykiety formatu („85 × 55 mm", „100 × 200 cm", „18 × 8 × 22 cm"). */
export function parseFormatMm(label: string): Mm | null {
  const m = DIM_RE.exec(label);
  if (!m) return null;
  const num = (s: string) => Number(s.replace(",", "."));
  const k = m[4] === "cm" ? 10 : 1;
  const a = num(m[1]) * k;
  const b = num(m[2]) * k;
  // Trzy wymiary = torba (szer × głęb × wys) — lico to szer × wys.
  const h = m[3] ? num(m[3]) * k : b;
  return { width: a, height: h };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function formatForProduct(product: Product, formatId?: string): ProductFormat {
  return (
    product.formats.find((f) => f.id === formatId) ??
    product.formats.find((f) => f.id === product.defaultFormatId) ??
    product.formats[0]
  );
}

/** Produkt dostępny w MCP (bez ukrytych). */
export function mcpProduct(slug: string): Product | undefined {
  const p = getProduct(slug.trim().toLowerCase());
  return p && !p.hidden ? p : undefined;
}

export const mcpProducts: Product[] = visibleProducts;

export function productUrl(origin: string, product: Product): string {
  return `${origin}/produkty/${product.slug}`;
}

export function buildPrintSpec(
  product: Product,
  format: ProductFormat,
  origin = "https://www.dobreprinty.pl",
): PrintSpec {
  const override = PRINT_AREA_OVERRIDES[product.slug];
  const trim = override?.area ?? parseFormatMm(format.label);
  if (!trim) {
    throw new Error(`Brak wymiarów dla formatu „${format.label}" produktu ${product.slug}.`);
  }
  const bleed = override ? 0 : BLEED_MM;
  const documentMm = {
    width: trim.width + 2 * bleed,
    height: trim.height + 2 * bleed,
  };
  const px = (mm: number) => Math.round((mm / 25.4) * PRINT_DPI);

  const notes: string[] = [];
  let unfoldedMm: Mm | undefined;
  if (product.slug === "skladane-ulotki") {
    // Falcowanie C: trzy łamy. Wymiar orientacyjny — szablon ma dokładne
    // linie złożenia (łamy różnią się o ~2 mm, żeby ulotka domykała się).
    unfoldedMm = { width: trim.width * 3, height: trim.height };
    notes.push(
      `Projektuj na ROZŁOŻONYM arkuszu ok. ${unfoldedMm.width} × ${unfoldedMm.height} mm (+ ${BLEED_MM} mm spadu), 3 łamy, falcowanie typu C. Nie umieszczaj tekstu na liniach złożenia.`,
    );
  }
  if (override) notes.push(...override.notes);
  else {
    notes.push(
      `Do każdego boku dodaj ${BLEED_MM} mm spadu (tło ma wychodzić poza format). Teksty i logo trzymaj min. ${SAFE_MM} mm od linii cięcia.`,
      "Tekst najlepiej wektorowy w PDF (albo bardzo czytelny, bez literówek w grafice). Zamień fonty na krzywe lub je osadź.",
      "Kolory CMYK — neony i bardzo nasycone RGB wydrukują się ciemniej.",
      "Druk dwustronny (4/4): dwa osobne pliki albo dwustronicowy PDF (strona 1 = przód, strona 2 = tył).",
    );
  }

  const sides = product.backPrint
    ? [`single — ${product.backPrint.labels.single}`, `double — ${product.backPrint.labels.double}`]
    : [];

  return {
    product: { slug: product.slug, name: product.name, url: productUrl(origin, product) },
    format: { id: format.id, label: format.label },
    trimMm: trim,
    bleedMm: bleed,
    safeMm: SAFE_MM,
    documentMm,
    pixels: { width: px(documentMm.width), height: px(documentMm.height), dpi: PRINT_DPI },
    aspectRatio: round2(documentMm.width / documentMm.height),
    colorMode: "CMYK",
    fileFormats: [...ALLOWED_UPLOAD_EXTENSIONS].map((e) => e.slice(1)),
    material: product.footerNote,
    sides,
    unfoldedMm,
    notes,
  };
}
