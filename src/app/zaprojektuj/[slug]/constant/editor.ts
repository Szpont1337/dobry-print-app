// Stałe edytora projektów. Żadnych magicznych wartości w komponentach —
// wszystko, co konfigurowalne, ląduje tutaj.

import type { EllipseNode, LineNode, RectNode, TextNode } from "../types";

// --- Jednostki ---------------------------------------------------------------
export const MM_PER_INCH = 25.4;
export const PT_PER_INCH = 72;
/** 1 pt = 0.3528 mm */
export const MM_PER_PT = MM_PER_INCH / PT_PER_INCH;
export const PT_PER_MM = PT_PER_INCH / MM_PER_INCH;

// --- Druk --------------------------------------------------------------------
export const BLEED_MM = 3;
export const SAFE_MM = 3;
/** Docelowe DPI eksportu (zmniejszane automatycznie dla wielkich formatów). */
export const EXPORT_DPI = 300;
/** Twardy limit dłuższego boku rastra eksportu (px) — chroni przed gigantyczną
 *  bitmapą dla A0 / banerów. Efektywne DPI jest z niego wyliczane. */
export const EXPORT_MAX_PX = 6000;
/** Format zastępczy (A4 pion), gdy z katalogu nie da się wyczytać wymiaru. */
export const DEFAULT_ARTWORK = { wMm: 210, hMm: 297 };

// --- Widok / zoom ------------------------------------------------------------
/** Zoom jako mnożnik względem dopasowania do okna (1 = „dopasuj”). */
export const ZOOM_MIN = 0.1;
export const ZOOM_MAX = 8;
export const ZOOM_WHEEL_FACTOR = 0.0015;
export const FIT_PADDING_PX = 96;
/** Górny limit rozdzielczości rasteryzacji tekstu na ekranie. */
export const MAX_TEXT_RESOLUTION = 8;

// --- Interakcja --------------------------------------------------------------
export const MIN_NODE_MM = 3;
export const NUDGE_MM = 1;
export const NUDGE_LARGE_MM = 10;
export const ROTATION_SNAP_DEG = 15;
export const HANDLE_SIZE_PX = 11;
export const HANDLE_HIT_PADDING_PX = 8;
export const ROTATE_HANDLE_OFFSET_PX = 26;

// --- Import obrazu -----------------------------------------------------------
/** Dłuższy bok importowanego obrazu jest skalowany w dół do tej wartości —
 *  trzyma w ryzach pamięć i limit localStorage, zachowując jakość do druku. */
export const MAX_IMAGE_DIM_PX = 2600;
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

// --- Autosave ----------------------------------------------------------------
export const AUTOSAVE_PREFIX = "DobrePrinty:design:v1:";
export const AUTOSAVE_DEBOUNCE_MS = 600;

// --- Czcionki (bezpieczne dla canvasu) --------------------------------------
export const FONT_FAMILIES: { label: string; value: string }[] = [
  { label: "Inter", value: "Inter, system-ui, sans-serif" },
  { label: "Arial", value: "Arial, Helvetica, sans-serif" },
  { label: "Helvetica", value: "Helvetica, Arial, sans-serif" },
  { label: "Verdana", value: "Verdana, Geneva, sans-serif" },
  { label: "Tahoma", value: "Tahoma, Geneva, sans-serif" },
  { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
  { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { label: "Georgia", value: "Georgia, 'Times New Roman', serif" },
  { label: "Courier New", value: "'Courier New', Courier, monospace" },
  { label: "Impact", value: "Impact, Haettenschweiler, sans-serif" },
];

// --- Paleta (tokeny marki + neutralne + podstawowe) -------------------------
export const PALETTE: string[] = [
  "#0e6a57", // primary — zieleń DobrePrinty
  "#0a4e40",
  "#073a2f",
  "#e7a33c", // accent — bursztyn
  "#e7f1ed",
  "#14241f", // foreground
  "#7a8884",
  "#ffffff",
  "#000000",
  "#c0392b",
  "#2563eb",
  "#7c3aed",
];

// --- Domyślne właściwości nowych węzłów -------------------------------------
export const DEFAULT_TEXT: Omit<TextNode, "id" | "cx" | "cy" | "w" | "h" | "name"> = {
  kind: "text",
  rotation: 0,
  opacity: 1,
  locked: false,
  hidden: false,
  text: "Twój tekst",
  fontFamily: "Inter, system-ui, sans-serif",
  fontSizePt: 24,
  fontWeight: "700",
  italic: false,
  fill: "#14241f",
  align: "center",
  letterSpacing: 0,
  lineHeight: 1.2,
};

export const DEFAULT_RECT: Omit<RectNode, "id" | "cx" | "cy" | "w" | "h" | "name"> = {
  kind: "rect",
  rotation: 0,
  opacity: 1,
  locked: false,
  hidden: false,
  fill: "#0e6a57",
  fillEnabled: true,
  stroke: "#14241f",
  strokeWidth: 0,
  radius: 0,
};

export const DEFAULT_ELLIPSE: Omit<EllipseNode, "id" | "cx" | "cy" | "w" | "h" | "name"> = {
  kind: "ellipse",
  rotation: 0,
  opacity: 1,
  locked: false,
  hidden: false,
  fill: "#e7a33c",
  fillEnabled: true,
  stroke: "#14241f",
  strokeWidth: 0,
};

export const DEFAULT_LINE: Omit<LineNode, "id" | "cx" | "cy" | "w" | "h" | "name"> = {
  kind: "line",
  rotation: 0,
  opacity: 1,
  locked: false,
  hidden: false,
  stroke: "#14241f",
  strokeWidth: 1,
};

// Domyślne rozmiary nowych węzłów wyrażamy jako ułamek krótszego boku strony,
// żeby na A7 i na banerze element był sensownej wielkości.
export const NEW_NODE_FRACTION = 0.4;
