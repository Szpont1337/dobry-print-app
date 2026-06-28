// Szablony startowe — generyczne układy dopasowujące się do dowolnego formatu
// (pozycje liczone względem rozmiaru strony w mm). To punkt startu, który
// użytkownik dowolnie modyfikuje.

import { DEFAULT_ELLIPSE, DEFAULT_RECT, DEFAULT_TEXT, MM_PER_PT } from "./editor";
import type { SceneNode } from "../types";
import { nodeId } from "../utils/id";

export interface StarterTemplate {
  id: string;
  name: string;
  build: (page: { wMm: number; hMm: number }) => SceneNode[];
}

function text(
  page: { wMm: number; hMm: number },
  over: Partial<SceneNode> & { text: string },
): SceneNode {
  const fontSizePt = (over as { fontSizePt?: number }).fontSizePt ?? 24;
  return {
    ...DEFAULT_TEXT,
    id: nodeId(),
    name: "Tekst",
    cx: page.wMm / 2,
    cy: page.hMm / 2,
    w: page.wMm * 0.8,
    h: fontSizePt * MM_PER_PT * 1.4,
    ...over,
  } as SceneNode;
}

function rect(over: Partial<SceneNode>): SceneNode {
  return {
    ...DEFAULT_RECT,
    id: nodeId(),
    name: "Prostokąt",
    cx: 0,
    cy: 0,
    w: 10,
    h: 10,
    ...over,
  } as SceneNode;
}

function ellipse(over: Partial<SceneNode>): SceneNode {
  return {
    ...DEFAULT_ELLIPSE,
    id: nodeId(),
    name: "Elipsa",
    cx: 0,
    cy: 0,
    w: 10,
    h: 10,
    ...over,
  } as SceneNode;
}

export const STARTER_TEMPLATES: StarterTemplate[] = [
  {
    id: "blank",
    name: "Pusta strona",
    build: () => [],
  },
  {
    id: "headline",
    name: "Nagłówek + tekst",
    build: (p) => {
      const titlePt = Math.max(18, Math.min(72, p.wMm * 0.16));
      const subPt = Math.max(10, titlePt * 0.34);
      return [
        rect({
          name: "Pasek",
          cx: p.wMm / 2,
          cy: p.hMm * 0.34,
          w: p.wMm * 0.18,
          h: Math.max(2, p.hMm * 0.012),
          fill: "#e7a33c",
          radius: 1,
        }),
        text(p, {
          text: "Twój nagłówek",
          cx: p.wMm / 2,
          cy: p.hMm * 0.45,
          fontSizePt: titlePt,
          fontWeight: "700",
          fill: "#0e6a57",
        }),
        text(p, {
          text: "Dodaj tu krótki opis, ofertę albo hasło reklamowe.",
          cx: p.wMm / 2,
          cy: p.hMm * 0.6,
          fontSizePt: subPt,
          fontWeight: "400",
          fill: "#14241f",
        }),
      ];
    },
  },
  {
    id: "photo-banner",
    name: "Zdjęcie + pasek",
    build: (p) => {
      const barH = p.hMm * 0.26;
      const titlePt = Math.max(16, Math.min(60, p.wMm * 0.12));
      return [
        rect({
          name: "Miejsce na zdjęcie",
          cx: p.wMm / 2,
          cy: (p.hMm - barH) / 2,
          w: p.wMm,
          h: p.hMm - barH,
          fill: "#e7f1ed",
          stroke: "#0e6a57",
          strokeWidth: 0,
        }),
        rect({
          name: "Pasek",
          cx: p.wMm / 2,
          cy: p.hMm - barH / 2,
          w: p.wMm,
          h: barH,
          fill: "#0e6a57",
        }),
        text(p, {
          text: "Twoja marka",
          cx: p.wMm / 2,
          cy: p.hMm - barH / 2,
          w: p.wMm * 0.86,
          fontSizePt: titlePt,
          fontWeight: "700",
          fill: "#ffffff",
        }),
      ];
    },
  },
  {
    id: "framed",
    name: "Ramka + akcent",
    build: (p) => {
      const margin = Math.min(p.wMm, p.hMm) * 0.08;
      const titlePt = Math.max(18, Math.min(64, p.wMm * 0.14));
      return [
        rect({
          name: "Ramka",
          cx: p.wMm / 2,
          cy: p.hMm / 2,
          w: p.wMm - margin * 2,
          h: p.hMm - margin * 2,
          fillEnabled: false,
          stroke: "#0e6a57",
          strokeWidth: Math.max(1, p.wMm * 0.006),
        }),
        ellipse({
          name: "Akcent",
          cx: p.wMm / 2,
          cy: p.hMm * 0.3,
          w: Math.min(p.wMm, p.hMm) * 0.16,
          h: Math.min(p.wMm, p.hMm) * 0.16,
          fill: "#e7a33c",
        }),
        text(p, {
          text: "Zaproszenie",
          cx: p.wMm / 2,
          cy: p.hMm * 0.55,
          fontSizePt: titlePt,
          fontWeight: "700",
          fill: "#14241f",
        }),
        text(p, {
          text: "data · miejsce · godzina",
          cx: p.wMm / 2,
          cy: p.hMm * 0.68,
          fontSizePt: Math.max(9, titlePt * 0.3),
          fontWeight: "400",
          fill: "#7a8884",
        }),
      ];
    },
  },
];
