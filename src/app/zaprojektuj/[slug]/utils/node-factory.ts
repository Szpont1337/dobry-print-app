// Fabryka węzłów — tworzy nowe elementy z domyślnymi właściwościami, wyśrodkowane
// na stronie i przeskalowane względem jej rozmiaru (żeby na A7 i na banerze
// element miał sensowną wielkość).

import {
  DEFAULT_ELLIPSE,
  DEFAULT_LINE,
  DEFAULT_RECT,
  DEFAULT_TEXT,
  MM_PER_PT,
  NEW_NODE_FRACTION,
} from "../constant/editor";
import type { EllipseNode, ImageNode, LineNode, RectNode, SceneNode, TextNode } from "../types";
import { nodeId } from "./id";

export interface PageBox {
  wMm: number;
  hMm: number;
}

function center(page: PageBox) {
  return { cx: page.wMm / 2, cy: page.hMm / 2 };
}

function baseSize(page: PageBox): number {
  return Math.min(page.wMm, page.hMm) * NEW_NODE_FRACTION;
}

export function createText(page: PageBox): TextNode {
  const { cx, cy } = center(page);
  const w = page.wMm * 0.7;
  const h = DEFAULT_TEXT.fontSizePt * MM_PER_PT * DEFAULT_TEXT.lineHeight * 1.4;
  return { ...DEFAULT_TEXT, id: nodeId(), name: "Tekst", cx, cy, w, h };
}

export function createRect(page: PageBox): RectNode {
  const { cx, cy } = center(page);
  const s = baseSize(page);
  return { ...DEFAULT_RECT, id: nodeId(), name: "Prostokąt", cx, cy, w: s, h: s };
}

export function createEllipse(page: PageBox): EllipseNode {
  const { cx, cy } = center(page);
  const s = baseSize(page);
  return {
    ...DEFAULT_ELLIPSE,
    id: nodeId(),
    name: "Elipsa",
    cx,
    cy,
    w: s,
    h: s,
  };
}

export function createLine(page: PageBox): LineNode {
  const { cx, cy } = center(page);
  return {
    ...DEFAULT_LINE,
    id: nodeId(),
    name: "Linia",
    cx,
    cy,
    w: page.wMm * 0.6,
    h: DEFAULT_LINE.strokeWidth,
  };
}

export function createImage(
  page: PageBox,
  img: { src: string; naturalW: number; naturalH: number },
): ImageNode {
  const { cx, cy } = center(page);
  const ratio = img.naturalW / Math.max(1, img.naturalH);
  const maxW = page.wMm * 0.8;
  const maxH = page.hMm * 0.8;
  let w = maxW;
  let h = w / ratio;
  if (h > maxH) {
    h = maxH;
    w = h * ratio;
  }
  return {
    kind: "image",
    id: nodeId(),
    name: "Zdjęcie",
    cx,
    cy,
    w,
    h,
    rotation: 0,
    opacity: 1,
    locked: false,
    hidden: false,
    src: img.src,
    naturalW: img.naturalW,
    naturalH: img.naturalH,
    flipH: false,
    flipV: false,
    radius: 0,
  };
}

export function duplicate(node: SceneNode): SceneNode {
  return {
    ...node,
    id: nodeId(),
    name: `${node.name} kopia`,
    cx: node.cx + 6,
    cy: node.cy + 6,
  } as SceneNode;
}
