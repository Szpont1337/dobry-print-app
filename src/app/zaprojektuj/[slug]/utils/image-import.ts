// Import obrazu z pliku: skalowanie dłuższego boku w dół do limitu (ochrona
// pamięci i localStorage) i zwrócenie data URL użytego potem do podglądu oraz
// eksportu. Działa wyłącznie po stronie klienta (Image + canvas).

import { MAX_IMAGE_DIM_PX } from "../constant/editor";

export interface ImportedImage {
  src: string;
  naturalW: number;
  naturalH: number;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Nie udało się wczytać obrazu."));
    img.src = url;
  });
}

export async function importImageFile(file: File): Promise<ImportedImage> {
  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await loadImage(objectUrl);
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    if (!w || !h) throw new Error("Pusty obraz.");

    const scale = Math.min(1, MAX_IMAGE_DIM_PX / Math.max(w, h));
    const outW = Math.max(1, Math.round(w * scale));
    const outH = Math.max(1, Math.round(h * scale));

    // Bez skalowania i już PNG/JPEG → użyj oryginału jako data URL.
    const keepOriginal = scale === 1 && (file.type === "image/png" || file.type === "image/jpeg");
    if (keepOriginal) {
      const src = await fileToDataUrl(file);
      return { src, naturalW: outW, naturalH: outH };
    }

    const canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Brak kontekstu 2D.");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, outW, outH);
    const hasAlpha = file.type === "image/png" || file.type === "image/webp";
    const src = hasAlpha ? canvas.toDataURL("image/png") : canvas.toDataURL("image/jpeg", 0.92);
    return { src, naturalW: outW, naturalH: outH };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Nie udało się odczytać pliku."));
    reader.readAsDataURL(file);
  });
}
