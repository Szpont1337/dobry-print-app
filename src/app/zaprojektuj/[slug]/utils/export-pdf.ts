// Eksport projektu do PDF gotowego do druku: rasteryzacja sceny w efektywnym DPI
// (zbijanym dla wielkich formatów, by raster nie urósł ponad limit), osadzenie
// PNG na stronie o rozmiarze strony WRAZ ze spadem, a następnie znaczniki cięcia
// (crop marks) w narożnikach linii trymu.

import { PDFDocument, rgb } from "pdf-lib";

import { EXPORT_DPI, EXPORT_MAX_PX, MM_PER_INCH, PT_PER_MM } from "../constant/editor";
import type { FormatSpec } from "../types";
import { pageSize } from "./print-format";

export interface ExportResult {
  bytes: Uint8Array;
  fileName: string;
  mimeType: "application/pdf";
  dpi: number;
  widthPx: number;
  heightPx: number;
}

/**
 * Efektywne DPI: docelowe 300, ale tak, by dłuższy bok rastra nie przekroczył
 * EXPORT_MAX_PX. Dolny próg jest niski (30 DPI), bo wielkoformat (banery 2–4 m)
 * ogląda się z dystansu — lepsze niższe DPI niż przekroczony limit tekstury GPU
 * i pusty/ucięty plik. Limit jest dodatkowo egzekwowany w renderToCanvas.
 */
export function effectiveDpi(format: FormatSpec): number {
  const { wMm, hMm } = pageSize(format);
  const longSideMm = Math.max(wMm, hMm);
  const dpiCap = (EXPORT_MAX_PX * MM_PER_INCH) / longSideMm;
  return Math.max(30, Math.min(EXPORT_DPI, Math.floor(dpiCap)));
}

function canvasToPngBytes(canvas: HTMLCanvasElement): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Nie udało się zrasteryzować projektu."));
        return;
      }
      blob
        .arrayBuffer()
        .then((buf) => resolve(new Uint8Array(buf)))
        .catch(reject);
    }, "image/png");
  });
}

function slugifyName(label: string): string {
  return (
    label
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "projekt"
  );
}

/**
 * Buduje PDF z renderu sceny.
 * @param render funkcja silnika rasteryzująca stronę w podanym px/mm.
 */
export async function exportToPdf(
  format: FormatSpec,
  productSlug: string,
  render: (pxPerMm: number) => Promise<HTMLCanvasElement>,
): Promise<ExportResult> {
  // czcionki muszą być gotowe, inaczej canvas zrasteryzuje fallbackowy font
  if (typeof document !== "undefined" && document.fonts?.ready) {
    await document.fonts.ready;
  }

  const dpi = effectiveDpi(format);
  const pxPerMm = dpi / MM_PER_INCH;
  const canvas = await render(pxPerMm);
  const png = await canvasToPngBytes(canvas);

  const page = pageSize(format);
  const pageWpt = page.wMm * PT_PER_MM;
  const pageHpt = page.hMm * PT_PER_MM;

  const pdf = await PDFDocument.create();
  pdf.setTitle(`Projekt — ${format.label}`);
  pdf.setProducer("DobrePrinty");
  pdf.setCreator("DobrePrinty — kreator projektów");
  const pdfPage = pdf.addPage([pageWpt, pageHpt]);
  const image = await pdf.embedPng(png);
  pdfPage.drawImage(image, {
    x: 0,
    y: 0,
    width: pageWpt,
    height: pageHpt,
  });

  // Znaczniki cięcia tylko, gdy jest spad.
  if (format.bleedMm > 0) {
    const bleedPt = format.bleedMm * PT_PER_MM;
    const markLen = bleedPt; // w obrębie spadu
    const left = bleedPt;
    const right = pageWpt - bleedPt;
    const bottom = bleedPt;
    const top = pageHpt - bleedPt;
    const black = rgb(0, 0, 0);
    const thickness = 0.5;
    const line = (x1: number, y1: number, x2: number, y2: number) =>
      pdfPage.drawLine({
        start: { x: x1, y: y1 },
        end: { x: x2, y: y2 },
        thickness,
        color: black,
      });

    // każdy narożnik trymu: pozioma + pionowa kreska w obszarze spadu
    line(left - markLen, top, left, top);
    line(left, top, left, top + markLen);
    line(right, top, right + markLen, top);
    line(right, top, right, top + markLen);
    line(left - markLen, bottom, left, bottom);
    line(left, bottom - markLen, left, bottom);
    line(right, bottom, right + markLen, bottom);
    line(right, bottom - markLen, right, bottom);
  }

  const bytes = await pdf.save();
  return {
    bytes,
    fileName: `projekt-${slugifyName(productSlug)}-${slugifyName(format.label)}.pdf`,
    mimeType: "application/pdf",
    dpi,
    widthPx: canvas.width,
    heightPx: canvas.height,
  };
}
