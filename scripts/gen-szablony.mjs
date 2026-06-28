// Generator szablonów do druku (PDF ze spadami + README) dla każdego produktu.
// Uruchom: `node scripts/gen-szablony.mjs`
// Wynik: public/szablony/<slug>.zip  (jeden plik na produkt)
//
// Dane formatów trzymane są tu lokalnie (lustro src/lib/products.ts). Po zmianie
// formatów produktu uruchom skrypt ponownie, żeby odświeżyć szablony.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, StandardFonts, cmyk } from "pdf-lib";
import JSZip from "jszip";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "szablony");

const BLEED_MM = 3; // spad
const SAFE_MM = 5; // margines bezpieczeństwa (od linii cięcia)
const MM_TO_PT = 72 / 25.4;
const mm = (v) => v * MM_TO_PT;

// slug, nazwa, lista etykiet formatów (z wymiarami) — lustro produktów widocznych.
const PRODUCTS = [
  {
    slug: "ulotki",
    name: "Ulotki",
    formats: [
      "A7 · 74 × 105 mm",
      "DL · 100 × 210 mm",
      "A6 · 105 × 148 mm",
      "A5 · 148 × 210 mm",
      "A4 · 210 × 297 mm",
      "A3 · 297 × 420 mm",
    ],
  },
  {
    slug: "skladane-ulotki",
    name: "Składane ulotki",
    formats: ["DL · 100 × 210 mm", "A5 · 148 × 210 mm", "A4 · 210 × 297 mm"],
  },
  {
    slug: "broszury-szyte",
    name: "Broszury szyte",
    formats: ["A6 · 105 × 148 mm", "A5 · 148 × 210 mm", "A4 · 210 × 297 mm"],
  },
  {
    slug: "broszury-klejone",
    name: "Broszury z klejoną oprawą",
    formats: ["A5 · 148 × 210 mm", "A4 · 210 × 297 mm"],
  },
  {
    slug: "broszury-szyte-nicia",
    name: "Książki z oprawą szytą nicią",
    formats: ["A5 · 148 × 210 mm", "A4 · 210 × 297 mm"],
  },
  {
    slug: "roll-up",
    name: "Roll-up",
    formats: ["85 × 200 cm", "100 × 200 cm", "120 × 200 cm"],
  },
  {
    slug: "papier-firmowy",
    name: "Papier firmowy",
    formats: ["A5 · 148 × 210 mm", "A4 · 210 × 297 mm"],
  },
  {
    slug: "wizytowki",
    name: "Wizytówki",
    formats: ["Klasyczny · 85 × 55 mm", "Europejski · 90 × 50 mm"],
  },
  {
    slug: "kartki-pocztowki",
    name: "Kartki & Pocztówki",
    formats: ["A6 · 105 × 148 mm", "DL · 100 × 210 mm", "A5 · 148 × 210 mm"],
  },
  {
    slug: "plakaty",
    name: "Plakaty",
    formats: [
      "A3 · 297 × 420 mm",
      "A2 · 420 × 594 mm",
      "A1 · 594 × 841 mm",
      "A0 · 841 × 1189 mm",
      "B1 · 707 × 1000 mm",
    ],
  },
];

/** Z etykiety wyciąga {label, wMm, hMm}. Obsługuje mm i cm. */
function parseFormat(raw) {
  const m = raw.match(/(\d+(?:[.,]\d+)?)\s*×\s*(\d+(?:[.,]\d+)?)\s*(mm|cm)/i);
  if (!m) throw new Error(`Nie umiem sparsować formatu: "${raw}"`);
  const factor = m[3].toLowerCase() === "cm" ? 10 : 1;
  const wMm = parseFloat(m[1].replace(",", ".")) * factor;
  const hMm = parseFloat(m[2].replace(",", ".")) * factor;
  const label = raw.split("·").pop().trim();
  return { label, wMm, hMm };
}

// Standardowa Helvetica (WinAnsi) nie koduje polskich diakrytyków — składamy je
// do ASCII WYŁĄCZNIE dla tekstu rysowanego na PDF (README.txt zostaje pełne UTF-8).
const PL_MAP = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "z",
  ż: "z",
  Ą: "A",
  Ć: "C",
  Ę: "E",
  Ł: "L",
  Ń: "N",
  Ó: "O",
  Ś: "S",
  Ź: "Z",
  Ż: "Z",
};
const fold = (s) => s.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (c) => PL_MAP[c] ?? c);

const COL_TRIM = cmyk(0, 1, 0, 0); // magenta — linia cięcia
const COL_SAFE = cmyk(1, 0, 0, 0); // cyan — margines bezpieczny
const COL_MARK = cmyk(0, 0, 0, 1); // czarny — znaczniki / tekst
const COL_FAINT = cmyk(0, 0, 0, 0.12); // jasnoszary — grid / watermark

function drawFormatPage(pdf, font, product, fmt) {
  const bleed = BLEED_MM;
  const pageWmm = fmt.wMm + 2 * bleed;
  const pageHmm = fmt.hMm + 2 * bleed;
  const page = pdf.addPage([mm(pageWmm), mm(pageHmm)]);
  const W = page.getWidth();
  const H = page.getHeight();

  // tło
  page.drawRectangle({
    x: 0,
    y: 0,
    width: W,
    height: H,
    color: cmyk(0, 0, 0, 0),
  });

  // siatka pomocnicza co 10 mm wewnątrz linii cięcia
  for (let x = bleed; x <= bleed + fmt.wMm + 0.01; x += 10) {
    page.drawLine({
      start: { x: mm(x), y: mm(bleed) },
      end: { x: mm(x), y: mm(bleed + fmt.hMm) },
      thickness: 0.25,
      color: COL_FAINT,
    });
  }
  for (let y = bleed; y <= bleed + fmt.hMm + 0.01; y += 10) {
    page.drawLine({
      start: { x: mm(bleed), y: mm(y) },
      end: { x: mm(bleed + fmt.wMm), y: mm(y) },
      thickness: 0.25,
      color: COL_FAINT,
    });
  }

  // linia cięcia (trim) — magenta, ciągła
  page.drawRectangle({
    x: mm(bleed),
    y: mm(bleed),
    width: mm(fmt.wMm),
    height: mm(fmt.hMm),
    borderColor: COL_TRIM,
    borderWidth: 0.75,
  });

  // margines bezpieczny — cyan, kreskowany
  const s = bleed + SAFE_MM;
  page.drawRectangle({
    x: mm(s),
    y: mm(s),
    width: mm(fmt.wMm - 2 * SAFE_MM),
    height: mm(fmt.hMm - 2 * SAFE_MM),
    borderColor: COL_SAFE,
    borderWidth: 0.5,
    borderDashArray: [3, 3],
  });

  // znaczniki cięcia w narożnikach (poza obszarem trim, w spadzie)
  const ml = mm(bleed); // długość = szerokość spadu
  const corners = [
    [mm(bleed), mm(bleed)],
    [mm(bleed + fmt.wMm), mm(bleed)],
    [mm(bleed), mm(bleed + fmt.hMm)],
    [mm(bleed + fmt.wMm), mm(bleed + fmt.hMm)],
  ];
  for (const [cx, cy] of corners) {
    const dx = cx < W / 2 ? -ml : ml;
    const dy = cy < H / 2 ? -ml : ml;
    page.drawLine({
      start: { x: cx, y: cy },
      end: { x: cx + dx, y: cy },
      thickness: 0.75,
      color: COL_MARK,
    });
    page.drawLine({
      start: { x: cx, y: cy },
      end: { x: cx, y: cy + dy },
      thickness: 0.75,
      color: COL_MARK,
    });
  }

  // środek — krzyż
  page.drawLine({
    start: { x: W / 2 - mm(4), y: H / 2 },
    end: { x: W / 2 + mm(4), y: H / 2 },
    thickness: 0.5,
    color: COL_FAINT,
  });
  page.drawLine({
    start: { x: W / 2, y: H / 2 - mm(4) },
    end: { x: W / 2, y: H / 2 + mm(4) },
    thickness: 0.5,
    color: COL_FAINT,
  });

  // opis w centrum (warstwa pomocnicza — do usunięcia)
  const lines = [
    `${product.name} — ${fmt.label}`,
    `${Math.round(fmt.wMm)} × ${Math.round(fmt.hMm)} mm (netto)`,
    `Spad ${BLEED_MM} mm · margines bezpieczny ${SAFE_MM} mm`,
    `CMYK · 300 DPI · usuń ten tekst przed drukiem`,
  ];
  const fontSize = Math.max(6, Math.min(12, fmt.wMm / 22));
  let ty = H / 2 + lines.length * fontSize * 0.7;
  for (const raw of lines) {
    const ln = fold(raw);
    const tw = font.widthOfTextAtSize(ln, fontSize);
    page.drawText(ln, {
      x: W / 2 - tw / 2,
      y: ty,
      size: fontSize,
      font,
      color: COL_FAINT,
    });
    ty -= fontSize * 1.5;
  }
}

async function buildProduct(product) {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`Szablon do druku — ${product.name} | dobreprinty`);
  pdf.setProducer("dobreprinty");
  pdf.setCreator("dobreprinty (generator szablonów)");
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  const parsed = product.formats.map(parseFormat);
  for (const fmt of parsed) drawFormatPage(pdf, font, product, fmt);
  const pdfBytes = await pdf.save();

  const readme = [
    `SZABLON DO DRUKU — ${product.name} (dobreprinty.pl)`,
    "=".repeat(48),
    "",
    "Zawartość:",
    `  • ${product.slug}.pdf — szablon ze spadami, jedna strona na format`,
    "",
    "Parametry przygotowania pliku:",
    `  • Spad (bleed): ${BLEED_MM} mm z każdej strony`,
    `  • Margines bezpieczny: ${SAFE_MM} mm od linii cięcia`,
    "  • Tryb koloru: CMYK",
    "  • Rozdzielczość grafik: 300 DPI",
    "  • Czcionki: zamienione na krzywe lub osadzone",
    "",
    "Formaty w pliku:",
    ...parsed.map(
      (f) =>
        `  • ${f.label}: ${Math.round(f.wMm)} × ${Math.round(f.hMm)} mm (netto), ` +
        `${Math.round(f.wMm + 2 * BLEED_MM)} × ${Math.round(f.hMm + 2 * BLEED_MM)} mm (brutto ze spadem)`,
    ),
    "",
    "Oznaczenia na szablonie:",
    "  • linia magenta  = linia cięcia (format netto)",
    "  • linia cyan (kreskowana) = margines bezpieczny (tu trzymaj tekst i logo)",
    "  • znaczniki w narożnikach = pasery cięcia",
    "  • warstwę/tekst pomocniczy usuń przed wysłaniem pliku do druku",
    "",
    "Gotowy plik wgrasz w konfiguratorze na https://dobreprinty.pl/produkty/" +
      product.slug,
    "",
  ].join("\r\n");

  const zip = new JSZip();
  zip.file(`${product.slug}.pdf`, pdfBytes);
  zip.file("README.txt", readme);
  const zipBytes = await zip.generateAsync({
    type: "uint8array",
    compression: "DEFLATE",
  });

  await writeFile(join(OUT_DIR, `${product.slug}.zip`), zipBytes);
  return {
    slug: product.slug,
    formats: parsed.length,
    kb: Math.round(zipBytes.length / 1024),
  };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const results = [];
  for (const p of PRODUCTS) results.push(await buildProduct(p));
  console.log("Wygenerowano szablony:");
  for (const r of results)
    console.log(`  ✓ ${r.slug}.zip — ${r.formats} formatów, ${r.kb} KB`);
  console.log(`\nRazem: ${results.length} plików w public/szablony/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
