// Matematyka transformacji w przestrzeni mm strony. Wszystkie obliczenia
// uchwytów (skalowanie z dowolnym obrotem, obrót) liczone w lokalnym układzie
// węzła, dzięki czemu działają poprawnie także dla obróconych elementów.

import { MIN_NODE_MM, ROTATION_SNAP_DEG } from "../constant/editor";
import type { HandleId, SceneNode } from "../types";

export interface Point {
  x: number;
  y: number;
}

const DEG = Math.PI / 180;

/** Obrót wektora o `deg` stopni (zgodnie z ruchem wskazówek, oś Y w dół). */
export function rotateVec(x: number, y: number, deg: number): Point {
  const r = deg * DEG;
  const c = Math.cos(r);
  const s = Math.sin(r);
  return { x: x * c - y * s, y: x * s + y * c };
}

type ResizeHandle = Exclude<HandleId, "rot">;

const HANDLE_SIGN: Record<ResizeHandle, { sx: number; sy: number }> = {
  tl: { sx: -1, sy: -1 },
  tr: { sx: 1, sy: -1 },
  bl: { sx: -1, sy: 1 },
  br: { sx: 1, sy: 1 },
  t: { sx: 0, sy: -1 },
  b: { sx: 0, sy: 1 },
  l: { sx: -1, sy: 0 },
  r: { sx: 1, sy: 0 },
};

export interface Box {
  cx: number;
  cy: number;
  w: number;
  h: number;
}

/**
 * Nowy prostokąt po przeciągnięciu uchwytu `handle` do `pointer` (mm).
 * Przeciwległy uchwyt (kotwica) pozostaje nieruchomy w świecie.
 */
export function resizeNode(
  node: SceneNode,
  handle: ResizeHandle,
  pointer: Point,
  lockAspect: boolean,
): Box {
  const { sx, sy } = HANDLE_SIGN[handle];
  const theta = node.rotation;
  const ex = rotateVec(1, 0, theta);
  const ey = rotateVec(0, 1, theta);
  const w0 = node.w;
  const h0 = node.h;

  // Kotwica = przeciwległy narożnik/krawędź, stała w układzie świata.
  const aLocalX = -sx * (w0 / 2);
  const aLocalY = -sy * (h0 / 2);
  const anchor: Point = {
    x: node.cx + aLocalX * ex.x + aLocalY * ey.x,
    y: node.cy + aLocalX * ex.y + aLocalY * ey.y,
  };

  const dx = pointer.x - anchor.x;
  const dy = pointer.y - anchor.y;
  const u = dx * ex.x + dy * ex.y; // rzut na lokalną oś X
  const v = dx * ey.x + dy * ey.y; // rzut na lokalną oś Y

  let newW = sx !== 0 ? Math.max(MIN_NODE_MM, Math.abs(u)) : w0;
  let newH = sy !== 0 ? Math.max(MIN_NODE_MM, Math.abs(v)) : h0;

  if (lockAspect && sx !== 0 && sy !== 0 && w0 > 0 && h0 > 0) {
    // Limit minimalnego rozmiaru nakładamy na SKALĘ, nie na każdą oś osobno —
    // inaczej przy małych rozmiarach proporcja by się „rozjechała”.
    let scale = Math.max(Math.abs(u) / w0, Math.abs(v) / h0);
    scale = Math.max(scale, MIN_NODE_MM / w0, MIN_NODE_MM / h0);
    newW = w0 * scale;
    newH = h0 * scale;
  }

  const effU = sx !== 0 ? Math.sign(u || sx) * newW : 0;
  const effV = sy !== 0 ? Math.sign(v || sy) * newH : 0;

  return {
    cx: anchor.x + (effU / 2) * ex.x + (effV / 2) * ey.x,
    cy: anchor.y + (effU / 2) * ex.y + (effV / 2) * ey.y,
    w: newW,
    h: newH,
  };
}

export function normalizeDeg(d: number): number {
  let r = d % 360;
  if (r < 0) r += 360;
  return r;
}

/** Kąt obrotu (stopnie) tak, by uchwyt obrotu podążał za wskaźnikiem. */
export function rotationFromPointer(center: Point, pointer: Point, snap: boolean): number {
  const ang = Math.atan2(pointer.y - center.y, pointer.x - center.x) / DEG;
  let deg = ang + 90; // uchwyt nad środkiem → „w górę” odpowiada 0°
  if (snap) deg = Math.round(deg / ROTATION_SNAP_DEG) * ROTATION_SNAP_DEG;
  return normalizeDeg(deg);
}

/** Cztery narożniki węzła w przestrzeni mm (tl, tr, br, bl). */
export function nodeCorners(node: SceneNode): Point[] {
  const ex = rotateVec(1, 0, node.rotation);
  const ey = rotateVec(0, 1, node.rotation);
  const hw = node.w / 2;
  const hh = node.h / 2;
  const local: [number, number][] = [
    [-hw, -hh],
    [hw, -hh],
    [hw, hh],
    [-hw, hh],
  ];
  return local.map(([lx, ly]) => ({
    x: node.cx + lx * ex.x + ly * ey.x,
    y: node.cy + lx * ex.y + ly * ey.y,
  }));
}

/** Prostokąt opisany (AABB) węzła w mm. */
export function nodeAABB(node: SceneNode): {
  x: number;
  y: number;
  w: number;
  h: number;
} {
  const pts = nodeCorners(node);
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  return {
    x: minX,
    y: minY,
    w: Math.max(...xs) - minX,
    h: Math.max(...ys) - minY,
  };
}

export function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}
