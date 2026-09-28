// Prompt tooling dla asystentów AI: gotowe prompty do wygenerowania grafiki
// pod druk i fotorealistycznego podglądu produktu. Po angielsku, bo modele
// obrazkowe (gpt-image, Imagen, Midjourney) lepiej rozumieją angielski.

import type { Product, ProductFormat } from "@/lib/products";

import { type PrintSpec, SAFE_MM } from "./spec";

export type DesignPromptInput = {
  spec: PrintSpec;
  /** o czym ma być projekt, np. „wizytówka dla kancelarii prawnej" */
  brief: string;
  /** teksty, które MUSZĄ znaleźć się na projekcie (nazwa, telefon, www) */
  textLines?: string[];
  /** styl: minimalistyczny, elegancki, kolorowy… */
  style?: string;
  side?: "front" | "back";
};

/** Rozmiary wyjściowe popularnych generatorów — dobieramy najbliższą proporcję. */
const IMAGE_SIZES: Mm[] = [
  { width: 1024, height: 1024 },
  { width: 1536, height: 1024 },
  { width: 1024, height: 1536 },
];
type Mm = { width: number; height: number };

export function closestImageSize(aspectRatio: number): Mm {
  let best = IMAGE_SIZES[0];
  let bestDiff = Infinity;
  for (const s of IMAGE_SIZES) {
    const diff = Math.abs(Math.log(s.width / s.height) - Math.log(aspectRatio));
    if (diff < bestDiff) {
      bestDiff = diff;
      best = s;
    }
  }
  return best;
}

export function designPrompt(input: DesignPromptInput): string {
  const { spec, brief, textLines = [], style, side = "front" } = input;
  const { documentMm, pixels, trimMm } = spec;
  const gen = closestImageSize(spec.aspectRatio);
  const textile = spec.bleedMm === 0;

  const lines: string[] = [
    `Flat 2D print-ready ${side} design for ${spec.product.name.toLowerCase()} (${trimMm.width} × ${trimMm.height} mm${textile ? " print area" : " trim size"}).`,
    `Subject: ${brief.trim()}`,
  ];
  if (style) lines.push(`Style: ${style.trim()}.`);
  if (textLines.length > 0) {
    lines.push(
      `Text to render EXACTLY, verbatim, correctly spelled (Polish diacritics included): ${textLines
        .map((t) => `"${t.trim()}"`)
        .join(", ")}.`,
    );
  }
  lines.push(
    `Canvas: aspect ratio ${documentMm.width}:${documentMm.height} (≈ ${spec.aspectRatio}), full-bleed composition filling the entire frame edge to edge.`,
  );
  if (textile) {
    lines.push("Transparent background (PNG), artwork only, no shirt or bag in the picture.");
  } else {
    lines.push(
      `Keep all text, logos and key elements at least ${SAFE_MM + spec.bleedMm} mm from every edge (outer ${spec.bleedMm} mm is bleed that gets trimmed off); background and large shapes must extend to the very edge.`,
    );
  }
  lines.push(
    "Straight-on view, no perspective, no mockup, no shadows, no paper texture, no hands, no frame or border.",
    "Print-safe colors (CMYK-friendly, avoid neon), high contrast, crisp legible typography, vector-like clean edges.",
    `Output at the highest resolution available (target ${pixels.width} × ${pixels.height} px at ${pixels.dpi} dpi). If the generator only offers fixed sizes, use ${gen.width} × ${gen.height} px and crop to the ratio above.`,
  );
  return lines.join("\n");
}

export type MockupPromptInput = {
  product: Product;
  format: ProductFormat;
  spec: PrintSpec;

  /** własne tło sceny, np. „na biurku architekta" */
  scene?: string;
  sides?: "single" | "double";
};

/** Scena fotograficzna per produkt — jak wygląda wydruk z drukalo w użyciu. */
const SCENES: Record<string, string> = {
  wizytowki:
    "a neat stack of business cards on a desk, one card leaning against the stack showing the front, another flat showing the back, soft natural window light",
  ulotki:
    "a fanned-out stack of flyers on a wooden table, one flyer on top fully visible, soft daylight",
  "skladane-ulotki":
    "a tri-fold (C-fold) leaflet standing half open on a table next to a closed one, front panel fully visible",
  "roll-up":
    "a roll-up banner standing in a bright office lobby, aluminium cassette at the bottom, full graphic visible, slight three-quarter angle",
  "papier-firmowy":
    "a sheet of letterhead paper on a desk with a pen and an envelope, top of the page with the header fully visible",
  "kartki-pocztowki":
    "postcards on a cafe table, one propped up showing the front, one lying flat showing the back",
  plakaty: "a poster hanging on a plain wall, full poster visible, straight-on view, natural light",
  "baner-reklamowy":
    "a large PVC banner with metal eyelets hung on a fence outdoors, full banner visible, daylight",
  naklejki:
    "die-cut stickers on a laptop lid and one sticker peeled halfway off its backing sheet, close-up",
  "tablice-reklamowe":
    "a rigid printed sign board mounted on a building wall, straight-on view, daylight",
  koszulki:
    "a white cotton t-shirt worn by a person, chest print fully visible, neutral studio background",
  "torby-papierowe":
    "a paper shopping bag with twisted paper handles standing on a shop counter, printed front side facing the camera",
  "torby-plocienne":
    "a natural cotton tote bag hanging on a chair back, printed side facing the camera, daylight",
};

export function mockupPrompt(input: MockupPromptInput): string {
  const { product, format, spec, scene, sides } = input;
  const twoSided = sides === "double" && product.backPrint != null;

  return [
    `Photorealistic product photo of the attached design printed as ${product.name.toLowerCase()}, ${format.label} (${spec.trimMm.width} × ${spec.trimMm.height} mm).`,
    `Material: ${product.footerNote.replace(/\.$/, "")}.`,
    `Scene: ${scene?.trim() || SCENES[product.slug] || "the printed product on a clean table, soft daylight"}.`,
    twoSided
      ? "Show both sides: front on one copy, back on another."
      : "Show the printed side clearly, undistorted.",
    "Apply the attached artwork exactly as designed (no changes to text or colors), trimmed to the final size (bleed removed), realistic paper edge, subtle shadow, true-to-life proportions.",
    "Camera: 50 mm lens, shallow depth of field, no extra text, no watermarks, no logos other than in the design.",
  ].join("\n");
}
