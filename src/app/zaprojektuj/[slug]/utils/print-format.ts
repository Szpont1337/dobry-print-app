// Wyprowadzenie wymiaru pola projektowego z katalogu. Wymiary istnieją w danych
// tylko jako fragment etykiety formatu (np. „A5 · 148 × 210 mm”, „85 × 200 cm”),
// więc parsujemy je stąd. Dla produktów bez płaskiego arkusza (odzież, torby,
// pudełka) wracamy do zastępczego pola projektowego A4.
//
// Funkcja jest czysta i bezpieczna na serwerze (bez DOM / Pixi).

import type { Product } from "@/lib/products";

import { BLEED_MM, DEFAULT_ARTWORK, SAFE_MM } from "../constant/editor";
import type { FormatSpec } from "../types";

const DIM_RE =
  /(\d+(?:[.,]\d+)?)\s*[×x]\s*(\d+(?:[.,]\d+)?)(?:\s*[×x]\s*(\d+(?:[.,]\d+)?))?\s*(mm|cm)/i;

function num(raw: string): number {
  return Number.parseFloat(raw.replace(",", "."));
}

/** Parsuje wymiar z etykiety. Zwraca null, gdy to nie płaski arkusz. */
export function parseDimensions(label: string): { wMm: number; hMm: number } | null {
  const m = DIM_RE.exec(label);
  if (!m) return null;
  // Trzy liczby = wymiar pudełka (np. torba 26 × 12 × 33 cm) — nie arkusz.
  if (m[3] != null) return null;
  const factor = m[4].toLowerCase() === "cm" ? 10 : 1;
  const wMm = num(m[1]) * factor;
  const hMm = num(m[2]) * factor;
  if (!Number.isFinite(wMm) || !Number.isFinite(hMm) || wMm <= 0 || hMm <= 0) {
    return null;
  }
  return { wMm, hMm };
}

/**
 * Zwraca specyfikację pola projektowego dla produktu i wybranego formatu.
 * Spad/margines pomijamy dla produktów wielkoformatowych i nadrukowych — tam
 * „spad” nie ma sensu albo jest częścią pola nadruku.
 */
export function resolveFormat(product: Product, formatId: string): FormatSpec {
  const format = product.formats.find((f) => f.id === formatId) ?? product.formats[0];
  const parsed = format ? parseDimensions(format.label) : null;

  // Produkty z podglądem nadruku (koszulka, torba) projektuje się jako grafikę
  // umieszczaną na produkcie — używamy zastępczego pola A4 bez spadu.
  const isArtworkOnly = Boolean(product.mockupPreview);

  if (parsed && !isArtworkOnly) {
    // Bez spadu dla bardzo dużych formatów (banery, roll-upy, tablice),
    // gdzie liczy się pole widoczne, a wykończenie ustala drukarnia.
    const isLargeFormat = Math.max(parsed.wMm, parsed.hMm) >= 600;
    return {
      label: format?.label ?? product.name,
      wMm: parsed.wMm,
      hMm: parsed.hMm,
      bleedMm: isLargeFormat ? 0 : BLEED_MM,
      safeMm: SAFE_MM,
      exact: true,
    };
  }

  return {
    label: format?.label ?? product.name,
    wMm: DEFAULT_ARTWORK.wMm,
    hMm: DEFAULT_ARTWORK.hMm,
    bleedMm: isArtworkOnly ? 0 : BLEED_MM,
    safeMm: SAFE_MM,
    exact: false,
  };
}

/** Pełny rozmiar strony (netto + spad z obu stron). */
export function pageSize(format: FormatSpec): { wMm: number; hMm: number } {
  return {
    wMm: format.wMm + format.bleedMm * 2,
    hMm: format.hMm + format.bleedMm * 2,
  };
}
