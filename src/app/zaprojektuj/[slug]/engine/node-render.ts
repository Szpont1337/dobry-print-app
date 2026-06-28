// Budowa i aktualizacja obiektów PixiJS z węzłów dokumentu. Każdy węzeł to
// `Container` (holder) z transformem wokół środka; rysowany element (Sprite /
// Graphics / Text) leży wyśrodkowany w punkcie (0,0) w lokalnych mm.
//
// Moduł jest importowany wyłącznie z `pixi-engine.ts`, który ładowany jest
// dynamicznie po stronie klienta — dlatego statyczny import `pixi.js` jest
// bezpieczny dla SSR.

import { Container, Graphics, Sprite, Text, type Texture } from "pixi.js";

import { MM_PER_PT } from "../constant/editor";
import type { SceneNode, TextNode } from "../types";

const DEG = Math.PI / 180;

export interface HolderMeta {
  kind: SceneNode["kind"];
  /** ostatnio załadowany src obrazka — by nie podmieniać tekstury bez potrzeby */
  src?: string;
}

export interface NodeHolder extends Container {
  __meta?: HolderMeta;
}

function applyTransform(holder: Container, node: SceneNode): void {
  holder.position.set(node.cx, node.cy);
  holder.rotation = node.rotation * DEG;
  holder.alpha = node.opacity;
  holder.visible = !node.hidden;
}

function drawRect(g: Graphics, node: Extract<SceneNode, { kind: "rect" }>) {
  const { w, h, radius } = node;
  g.clear();
  if (radius > 0) g.roundRect(-w / 2, -h / 2, w, h, radius);
  else g.rect(-w / 2, -h / 2, w, h);
  if (node.fillEnabled) g.fill({ color: node.fill });
  if (node.strokeWidth > 0) {
    g.stroke({ width: node.strokeWidth, color: node.stroke, alignment: 0.5 });
  }
}

function drawEllipse(g: Graphics, node: Extract<SceneNode, { kind: "ellipse" }>) {
  g.clear();
  g.ellipse(0, 0, node.w / 2, node.h / 2);
  if (node.fillEnabled) g.fill({ color: node.fill });
  if (node.strokeWidth > 0) {
    g.stroke({ width: node.strokeWidth, color: node.stroke, alignment: 0.5 });
  }
}

function drawLine(g: Graphics, node: Extract<SceneNode, { kind: "line" }>) {
  g.clear();
  g.moveTo(-node.w / 2, 0).lineTo(node.w / 2, 0);
  g.stroke({ width: node.strokeWidth, color: node.stroke, cap: "round" });
}

function textStyle(node: TextNode, resolution: number) {
  const fontSizeMm = node.fontSizePt * MM_PER_PT;
  return {
    style: {
      fontFamily: node.fontFamily,
      fontSize: fontSizeMm,
      fontWeight: node.fontWeight,
      fontStyle: node.italic ? ("italic" as const) : ("normal" as const),
      fill: { color: node.fill },
      align: node.align,
      wordWrap: true,
      wordWrapWidth: Math.max(1, node.w),
      lineHeight: fontSizeMm * node.lineHeight,
      letterSpacing: node.letterSpacing * MM_PER_PT,
    },
    resolution,
  };
}

/** Tworzy holder dla węzła. Dla obrazów potrzebny jest załadowany Texture. */
export function createHolder(
  node: SceneNode,
  textures: Map<string, Texture>,
  textResolution: number,
): NodeHolder {
  const holder = new Container() as NodeHolder;
  holder.label = node.id;
  holder.eventMode = "static";
  holder.cursor = "move";

  switch (node.kind) {
    case "image": {
      const tex = textures.get(node.src);
      const sprite = new Sprite(tex);
      sprite.anchor.set(0.5);
      holder.addChild(sprite);
      holder.__meta = { kind: "image", src: node.src };
      break;
    }
    case "text": {
      const t = new Text({ text: node.text, ...textStyle(node, textResolution) });
      t.anchor.set(0.5);
      holder.addChild(t);
      holder.__meta = { kind: "text" };
      break;
    }
    default: {
      const g = new Graphics();
      holder.addChild(g);
      holder.__meta = { kind: node.kind };
    }
  }
  updateHolder(holder, node, textures, textResolution);
  return holder;
}

/**
 * Aktualizuje istniejący holder w miejscu. Zwraca zmierzoną wysokość w mm dla
 * tekstu (silnik zapisze ją do węzła, by uchwyty/warstwy znały realny rozmiar).
 */
export function updateHolder(
  holder: NodeHolder,
  node: SceneNode,
  textures: Map<string, Texture>,
  textResolution: number,
): number | null {
  applyTransform(holder, node);
  const child = holder.children[0];

  switch (node.kind) {
    case "image": {
      const sprite = child as Sprite;
      const tex = textures.get(node.src);
      if (tex && (holder.__meta?.src !== node.src || sprite.texture !== tex)) {
        sprite.texture = tex;
        holder.__meta = { kind: "image", src: node.src };
      }
      sprite.width = node.w;
      sprite.height = node.h;
      sprite.scale.x = Math.abs(sprite.scale.x) * (node.flipH ? -1 : 1);
      sprite.scale.y = Math.abs(sprite.scale.y) * (node.flipV ? -1 : 1);
      applyImageMask(holder, sprite, node);
      return null;
    }
    case "text": {
      const t = child as Text;
      const next = textStyle(node, textResolution);
      t.text = node.text;
      t.style.fontFamily = next.style.fontFamily;
      t.style.fontSize = next.style.fontSize;
      t.style.fontWeight = next.style.fontWeight;
      t.style.fontStyle = next.style.fontStyle;
      t.style.fill = next.style.fill;
      t.style.align = next.style.align;
      t.style.wordWrapWidth = next.style.wordWrapWidth;
      t.style.lineHeight = next.style.lineHeight;
      t.style.letterSpacing = next.style.letterSpacing;
      t.resolution = textResolution;
      return t.height;
    }
    case "rect":
      drawRect(child as Graphics, node);
      return null;
    case "ellipse":
      drawEllipse(child as Graphics, node);
      return null;
    case "line":
      drawLine(child as Graphics, node);
      return null;
  }
}

function applyImageMask(
  holder: NodeHolder,
  sprite: Sprite,
  node: Extract<SceneNode, { kind: "image" }>,
): void {
  // maska tylko przy zaokrąglonych rogach
  const existing = holder.children.find((c) => c.label === "__mask") as Graphics | undefined;
  if (node.radius <= 0) {
    if (existing) {
      sprite.mask = null;
      existing.destroy();
    }
    return;
  }
  let mask = existing;
  if (!mask) {
    mask = new Graphics();
    mask.label = "__mask";
    holder.addChild(mask);
  }
  mask.clear();
  mask.roundRect(-node.w / 2, -node.h / 2, node.w, node.h, node.radius).fill({
    color: 0xffffff,
  });
  sprite.mask = mask;
}
