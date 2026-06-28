// Silnik edytora oparty na PixiJS v8. Scena to projekcja dokumentu:
//   stage
//    ├─ viewport (Container, scale = px/mm, position = pan)
//    │   ├─ pageBg (Graphics, tło strony w mm)
//    │   └─ content (Container, holdery węzłów w mm)
//    └─ overlay (Container, przestrzeń ekranu)
//        ├─ guides (Graphics, spad/trim/margines)
//        └─ transformer (Container, ramka + uchwyty o stałym rozmiarze px)
//
// Gesty (przesuwanie / skalowanie / obrót / panoramowanie) aktualizują holder
// IMPERATYWNIE w trakcie, a do stanu React trafiają dopiero na pointerup —
// dzięki temu interakcja jest płynna i nie przechodzi przez re-render na klatkę.
//
// Ten moduł (i node-render) są importowane wyłącznie dynamicznie po stronie
// klienta, więc statyczny import `pixi.js` nie psuje SSR.

import {
  Application,
  Assets,
  Container,
  type FederatedPointerEvent,
  Graphics,
  Point,
  Rectangle,
  RenderTexture,
  type Texture,
} from "pixi.js";

import {
  EXPORT_MAX_PX,
  FIT_PADDING_PX,
  HANDLE_HIT_PADDING_PX,
  HANDLE_SIZE_PX,
  MAX_TEXT_RESOLUTION,
  ROTATE_HANDLE_OFFSET_PX,
  ZOOM_MAX,
  ZOOM_MIN,
  ZOOM_WHEEL_FACTOR,
} from "../constant/editor";
import type { EditorDoc, HandleId, SceneNode } from "../types";
import {
  clamp,
  nodeCorners,
  resizeNode,
  rotationFromPointer,
  type Point as Vec,
} from "../utils/geometry";
import { pageSize } from "../utils/print-format";
import { createHolder, updateHolder, type NodeHolder } from "./node-render";

const WORKSPACE_BG = "#e9ece9";
const HANDLE_FILL = "#ffffff";
const HANDLE_STROKE = "#0e6a57";
const FRAME_COLOR = "#0e6a57";
const BLEED_COLOR = "#c0392b";
const SAFE_COLOR = "#2563eb";

const RESIZE_HANDLES: Exclude<HandleId, "rot">[] = ["tl", "t", "tr", "r", "br", "b", "bl", "l"];

const HANDLE_CURSOR: Record<HandleId, string> = {
  tl: "nwse-resize",
  br: "nwse-resize",
  tr: "nesw-resize",
  bl: "nesw-resize",
  t: "ns-resize",
  b: "ns-resize",
  l: "ew-resize",
  r: "ew-resize",
  rot: "grab",
};

export interface EngineCallbacks {
  onSelect: (id: string | null) => void;
  onBeginInteraction: () => void;
  onEndInteraction: () => void;
  onSetNode: (id: string, patch: Partial<SceneNode>) => void;
  onMeasureText: (id: string, hMm: number) => void;
  onViewChange: (zoomPct: number) => void;
}

interface Gesture {
  mode: "move" | "resize" | "rotate" | "pan";
  nodeId?: string;
  handle?: HandleId;
  startWorld: Vec;
  startCanvas: Vec;
  startNode?: SceneNode;
  startPan?: Vec;
  /** różnica między miejscem chwytu a środkiem uchwytu (resize) — bez skoku */
  grabOffset?: Vec;
  began: boolean;
  moved: boolean;
  preview?: SceneNode;
}

interface HandleGraphic extends Graphics {
  __handle?: HandleId;
}

export class PixiEngine {
  private app = new Application();
  private viewport = new Container();
  private pageBg = new Graphics();
  private content = new Container();
  private overlay = new Container();
  private guides = new Graphics();
  private transformer = new Container();
  private frame = new Graphics();
  private rotateLink = new Graphics();
  private handles = new Map<HandleId, HandleGraphic>();

  private holders = new Map<string, NodeHolder>();
  private nodes = new Map<string, SceneNode>();
  private textures = new Map<string, Texture>();

  private doc: EditorDoc | null = null;
  private selectedId: string | null = null;

  private fitScale = 1;
  private zoom = 1;
  private pxPerMm = 1;
  private textResolution = MAX_TEXT_RESOLUTION;
  private spaceDown = false;

  private gesture: Gesture | null = null;
  private canvasRect: DOMRect | null = null;
  private syncToken = 0;
  private destroyed = false;

  constructor(private cb: EngineCallbacks) {}

  get canvas(): HTMLCanvasElement {
    return this.app.canvas;
  }

  async init(host: HTMLElement, doc: EditorDoc): Promise<void> {
    const w = host.clientWidth || 800;
    const h = host.clientHeight || 600;
    await this.app.init({
      width: w,
      height: h,
      background: WORKSPACE_BG,
      antialias: true,
      resolution: Math.min(2, window.devicePixelRatio || 1),
      autoDensity: true,
      preference: "webgl",
    });
    if (this.destroyed) {
      try {
        this.app.destroy(true);
      } catch {
        // app mógł być w trakcie inicjalizacji
      }
      return;
    }
    host.appendChild(this.app.canvas);

    this.content.sortableChildren = true;
    this.viewport.addChild(this.pageBg, this.content);
    this.guides.eventMode = "none";
    this.frame.eventMode = "none";
    this.rotateLink.eventMode = "none";
    this.transformer.addChild(this.rotateLink, this.frame);
    this.transformer.visible = false;
    this.overlay.addChild(this.guides, this.transformer);
    this.app.stage.addChild(this.viewport, this.overlay);

    this.buildHandles();

    this.app.stage.eventMode = "static";
    this.app.stage.hitArea = new Rectangle(0, 0, w, h);
    this.app.stage.on("pointerdown", this.onPointerDown);

    this.canvas.addEventListener("wheel", this.onWheel, { passive: false });
    window.addEventListener("keydown", this.onKeyState);
    window.addEventListener("keyup", this.onKeyState);

    this.doc = doc;
    await this.syncScene(doc);
    if (this.destroyed) return;
    this.computeFit(w, h);
    this.fit();
  }

  // --- Budowa uchwytów (raz; pozycjonowane w updateTransformer) --------------
  private buildHandles(): void {
    const half = HANDLE_SIZE_PX / 2;
    const hit = half + HANDLE_HIT_PADDING_PX;
    for (const id of RESIZE_HANDLES) {
      const g = new Graphics() as HandleGraphic;
      g.rect(-half, -half, HANDLE_SIZE_PX, HANDLE_SIZE_PX)
        .fill({ color: HANDLE_FILL })
        .stroke({ color: HANDLE_STROKE, width: 1.5 });
      g.__handle = id;
      g.eventMode = "static";
      g.cursor = HANDLE_CURSOR[id];
      g.hitArea = new Rectangle(-hit, -hit, hit * 2, hit * 2);
      g.visible = false;
      this.handles.set(id, g);
      this.transformer.addChild(g);
    }
    const rot = new Graphics() as HandleGraphic;
    rot
      .circle(0, 0, half + 1)
      .fill({ color: HANDLE_FILL })
      .stroke({
        color: HANDLE_STROKE,
        width: 1.5,
      });
    rot.__handle = "rot";
    rot.eventMode = "static";
    rot.cursor = "grab";
    rot.hitArea = new Rectangle(-hit, -hit, hit * 2, hit * 2);
    rot.visible = false;
    this.handles.set("rot", rot);
    this.transformer.addChild(rot);
  }

  // --- Synchronizacja sceny z dokumentem ------------------------------------
  async syncScene(doc: EditorDoc): Promise<void> {
    this.doc = doc;
    this.nodes = new Map(doc.nodes.map((n) => [n.id, n]));

    // Załaduj brakujące tekstury obrazów.
    const token = ++this.syncToken;
    const missing = doc.nodes.filter(
      (n) => n.kind === "image" && !this.textures.has((n as { src: string }).src),
    );
    if (missing.length > 0) {
      await Promise.all(
        missing.map(async (n) => {
          const src = (n as { src: string }).src;
          try {
            const tex = (await Assets.load(src)) as Texture;
            this.textures.set(src, tex);
          } catch {
            // nieudany obraz pomijamy — holder pokaże pusty sprite
          }
        }),
      );
      if (this.destroyed || token !== this.syncToken) return;
    }

    const seen = new Set<string>();
    doc.nodes.forEach((node, index) => {
      seen.add(node.id);
      let holder = this.holders.get(node.id);
      if (!holder) {
        holder = createHolder(node, this.textures, this.textResolution);
        this.holders.set(node.id, holder);
        this.content.addChild(holder);
      }
      // Aktualizujemy (i mierzymy tekst) także po utworzeniu — inaczej świeżo
      // dodany tekst miałby zastępczą wysokość, a ramka zaznaczenia zły rozmiar.
      if (this.gesture?.nodeId !== node.id) {
        const measured = updateHolder(holder, node, this.textures, this.textResolution);
        if (node.kind === "text" && measured != null && Math.abs(measured - node.h) > 0.3) {
          this.cb.onMeasureText(node.id, measured);
        }
      }
      holder.zIndex = index;
    });

    for (const [id, holder] of this.holders) {
      if (!seen.has(id)) {
        holder.destroy({ children: true });
        this.holders.delete(id);
      }
    }

    this.drawPageBg();
    this.updateTransformer();
    this.updateGuides();
  }

  private drawPageBg(): void {
    if (!this.doc) return;
    const { wMm, hMm } = pageSize(this.doc.format);
    this.pageBg.clear();
    this.pageBg.rect(0, 0, wMm, hMm);
    this.pageBg.fill({
      color: this.doc.background.enabled ? this.doc.background.color : "#ffffff",
    });
  }

  // --- Widok: pan / zoom -----------------------------------------------------
  resize(w: number, h: number): void {
    if (this.destroyed) return;
    this.app.renderer.resize(w, h);
    this.app.stage.hitArea = new Rectangle(0, 0, w, h);
    this.canvasRect = null;
    const prevZoom = this.zoom;
    this.computeFit(w, h);
    this.zoom = prevZoom;
    this.pxPerMm = this.fitScale * this.zoom;
    this.viewport.scale.set(this.pxPerMm);
    this.clampPanToView(w, h);
    this.updateView();
  }

  private computeFit(w: number, h: number): void {
    if (!this.doc) return;
    const { wMm, hMm } = pageSize(this.doc.format);
    const availW = Math.max(50, w - FIT_PADDING_PX * 2);
    const availH = Math.max(50, h - FIT_PADDING_PX * 2);
    this.fitScale = Math.min(availW / wMm, availH / hMm);
  }

  fit(): void {
    if (!this.doc) return;
    const w = this.app.renderer.width;
    const h = this.app.renderer.height;
    this.zoom = 1;
    this.pxPerMm = this.fitScale;
    this.viewport.scale.set(this.pxPerMm);
    const { wMm, hMm } = pageSize(this.doc.format);
    this.viewport.position.set((w - wMm * this.pxPerMm) / 2, (h - hMm * this.pxPerMm) / 2);
    this.updateView();
  }

  zoomBy(factor: number, anchor?: Vec): void {
    const w = this.app.renderer.width;
    const h = this.app.renderer.height;
    const a = anchor ?? { x: w / 2, y: h / 2 };
    const newZoom = clamp(this.zoom * factor, ZOOM_MIN, ZOOM_MAX);
    if (newZoom === this.zoom) return;
    const worldBefore = this.toWorld(a.x, a.y);
    this.zoom = newZoom;
    this.pxPerMm = this.fitScale * newZoom;
    this.viewport.scale.set(this.pxPerMm);
    this.viewport.position.set(
      a.x - worldBefore.x * this.pxPerMm,
      a.y - worldBefore.y * this.pxPerMm,
    );
    this.updateView();
  }

  private clampPanToView(w: number, h: number): void {
    // Trzyma stronę choć trochę w kadrze, by nie „uciekła” poza ekran.
    if (!this.doc) return;
    const { wMm, hMm } = pageSize(this.doc.format);
    const pw = wMm * this.pxPerMm;
    const ph = hMm * this.pxPerMm;
    const margin = 80;
    const pos = this.viewport.position;
    pos.x = clamp(pos.x, margin - pw, w - margin);
    pos.y = clamp(pos.y, margin - ph, h - margin);
  }

  private updateView(): void {
    // Rozdzielczość rasteryzacji tekstu = px/mm na ekranie (z limitem).
    const desired = clamp(
      this.pxPerMm * (this.app.renderer.resolution || 1),
      2,
      MAX_TEXT_RESOLUTION,
    );
    if (Math.abs(desired - this.textResolution) > 0.25) {
      this.textResolution = desired;
      for (const [id, holder] of this.holders) {
        const node = this.nodes.get(id);
        if (node?.kind === "text") {
          updateHolder(holder, node, this.textures, this.textResolution);
        }
      }
    }
    this.updateGuides();
    this.updateTransformer();
    this.cb.onViewChange(Math.round(this.zoom * 100));
  }

  // --- Linie pomocnicze (spad / trim / margines) w przestrzeni ekranu --------
  private updateGuides(): void {
    if (!this.doc) return;
    const g = this.guides;
    g.clear();
    const f = this.doc.format;
    const page = pageSize(f);

    const rectScreen = (x: number, y: number, w: number, h: number) => {
      const tl = this.worldToScreen(x, y);
      const br = this.worldToScreen(x + w, y + h);
      return { x: tl.x, y: tl.y, w: br.x - tl.x, h: br.y - tl.y };
    };

    // krawędź strony (= linia spadu zewnętrzna)
    const pageR = rectScreen(0, 0, page.wMm, page.hMm);
    g.rect(pageR.x, pageR.y, pageR.w, pageR.h).stroke({
      color: BLEED_COLOR,
      width: 1,
      alpha: f.bleedMm > 0 ? 0.5 : 0,
    });

    // linia cięcia (trim)
    if (f.bleedMm > 0) {
      const trim = rectScreen(f.bleedMm, f.bleedMm, f.wMm, f.hMm);
      g.rect(trim.x, trim.y, trim.w, trim.h).stroke({
        color: FRAME_COLOR,
        width: 1.25,
        alpha: 0.9,
      });
    }

    // margines bezpieczny
    const safe = rectScreen(
      f.bleedMm + f.safeMm,
      f.bleedMm + f.safeMm,
      f.wMm - f.safeMm * 2,
      f.hMm - f.safeMm * 2,
    );
    g.rect(safe.x, safe.y, safe.w, safe.h).stroke({
      color: SAFE_COLOR,
      width: 1,
      alpha: 0.4,
    });
  }

  // --- Transformer (ramka + uchwyty) ----------------------------------------
  setSelection(id: string | null): void {
    this.selectedId = id;
    this.updateTransformer();
  }

  private activeNode(id: string): SceneNode | undefined {
    if (this.gesture?.nodeId === id && this.gesture.preview) {
      return this.gesture.preview;
    }
    return this.nodes.get(id);
  }

  private updateTransformer(): void {
    const id = this.selectedId;
    const node = id ? this.activeNode(id) : undefined;
    if (!node || node.hidden) {
      this.transformer.visible = false;
      return;
    }
    this.transformer.visible = true;

    const corners = nodeCorners(node).map((p) => this.worldToScreen(p.x, p.y));
    const [tl, tr, br, bl] = corners;

    this.frame
      .clear()
      .poly([tl.x, tl.y, tr.x, tr.y, br.x, br.y, bl.x, bl.y])
      .stroke({ color: FRAME_COLOR, width: 1.5 });

    const mid = (a: Vec, b: Vec): Vec => ({
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2,
    });
    const pos: Record<Exclude<HandleId, "rot">, Vec> = {
      tl,
      tr,
      br,
      bl,
      t: mid(tl, tr),
      r: mid(tr, br),
      b: mid(br, bl),
      l: mid(bl, tl),
    };

    const locked = node.locked;
    // Dla tekstu pionowe krawędzie (t/b) nie zmieniają nic (wysokość jest
    // wyliczana z treści) — chowamy je, by uniknąć pustego gestu.
    const isText = node.kind === "text";
    for (const hid of RESIZE_HANDLES) {
      const handle = this.handles.get(hid)!;
      const p = pos[hid];
      const hidden = locked || (isText && (hid === "t" || hid === "b"));
      handle.position.set(p.x, p.y);
      handle.visible = !hidden;
      handle.eventMode = hidden ? "none" : "static";
    }

    // uchwyt obrotu nad środkiem górnej krawędzi
    const topMid = pos.t;
    const dirX = topMid.x - mid(bl, br).x;
    const dirY = topMid.y - mid(bl, br).y;
    const len = Math.hypot(dirX, dirY) || 1;
    const nx = dirX / len;
    const ny = dirY / len;
    const rotP = {
      x: topMid.x + nx * ROTATE_HANDLE_OFFSET_PX,
      y: topMid.y + ny * ROTATE_HANDLE_OFFSET_PX,
    };
    const rot = this.handles.get("rot")!;
    rot.position.set(rotP.x, rotP.y);
    rot.visible = !locked;
    rot.eventMode = locked ? "none" : "static";
    this.rotateLink
      .clear()
      .moveTo(topMid.x, topMid.y)
      .lineTo(rotP.x, rotP.y)
      .stroke({ color: FRAME_COLOR, width: 1.25 });
  }

  // --- Konwersje współrzędnych ----------------------------------------------
  private getRect(): DOMRect {
    if (!this.canvasRect) this.canvasRect = this.canvas.getBoundingClientRect();
    return this.canvasRect;
  }

  private toWorld(canvasX: number, canvasY: number): Vec {
    const p = this.viewport.toLocal(new Point(canvasX, canvasY));
    return { x: p.x, y: p.y };
  }

  private worldToScreen(mmX: number, mmY: number): Vec {
    const p = this.viewport.toGlobal(new Point(mmX, mmY));
    return { x: p.x, y: p.y };
  }

  private eventToCanvas(clientX: number, clientY: number): Vec {
    const r = this.getRect();
    return { x: clientX - r.left, y: clientY - r.top };
  }

  // --- Pointer / gesty -------------------------------------------------------
  private onPointerDown = (ev: FederatedPointerEvent): void => {
    this.canvasRect = null;
    const canvas = { x: ev.global.x, y: ev.global.y };
    const world = this.toWorld(canvas.x, canvas.y);

    // panoramowanie: spacja + przeciągnięcie lub środkowy przycisk
    if (this.spaceDown) {
      this.startGesture({
        mode: "pan",
        startWorld: world,
        startCanvas: canvas,
        startPan: { x: this.viewport.position.x, y: this.viewport.position.y },
        began: false,
        moved: false,
      });
      return;
    }

    const target = ev.target as HandleGraphic | NodeHolder | null;

    // uchwyt transformacji
    const handleId = (target as HandleGraphic)?.__handle;
    if (handleId && this.selectedId) {
      const node = this.nodes.get(this.selectedId);
      if (node && !node.locked) {
        const grab = handleId === "rot" ? null : this.handleWorldPos(node, handleId);
        this.startGesture({
          mode: handleId === "rot" ? "rotate" : "resize",
          handle: handleId,
          nodeId: this.selectedId,
          startWorld: world,
          startCanvas: canvas,
          startNode: { ...node },
          grabOffset: grab ? { x: world.x - grab.x, y: world.y - grab.y } : undefined,
          began: false,
          moved: false,
          preview: { ...node },
        });
        return;
      }
    }

    // węzeł (lub jego dziecko)
    const holderId = this.findHolderId(target);
    if (holderId) {
      const node = this.nodes.get(holderId);
      if (this.selectedId !== holderId) {
        this.selectedId = holderId;
        this.cb.onSelect(holderId);
        this.updateTransformer();
      }
      if (node && !node.locked) {
        this.startGesture({
          mode: "move",
          nodeId: holderId,
          startWorld: world,
          startCanvas: canvas,
          startNode: { ...node },
          began: false,
          moved: false,
          preview: { ...node },
        });
      }
      return;
    }

    // puste miejsce → odznacz
    if (this.selectedId !== null) {
      this.selectedId = null;
      this.cb.onSelect(null);
      this.updateTransformer();
    }
  };

  /** Pozycja danego uchwytu w mm (świat) dla węzła — do kompensacji chwytu. */
  private handleWorldPos(node: SceneNode, handle: HandleId): Vec {
    const [tl, tr, br, bl] = nodeCorners(node);
    const mid = (a: Vec, b: Vec): Vec => ({
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2,
    });
    switch (handle) {
      case "tl":
        return tl;
      case "tr":
        return tr;
      case "br":
        return br;
      case "bl":
        return bl;
      case "t":
        return mid(tl, tr);
      case "r":
        return mid(tr, br);
      case "b":
        return mid(br, bl);
      case "l":
        return mid(bl, tl);
      default:
        return { x: node.cx, y: node.cy };
    }
  }

  private findHolderId(target: unknown): string | null {
    let t = target as (Container & { __meta?: unknown; parent?: Container }) | null;
    while (t && t !== this.app.stage) {
      if ((t as { __meta?: unknown }).__meta) return t.label as string;
      t = t.parent as typeof t;
    }
    return null;
  }

  private startGesture(g: Gesture): void {
    this.gesture = g;
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointerup", this.onPointerUp);
    if (g.mode === "pan") this.canvas.style.cursor = "grabbing";
  }

  private onPointerMove = (e: PointerEvent): void => {
    const g = this.gesture;
    if (!g) return;
    // Zgubiony pointerup (np. zwolnienie poza oknem) — kończymy gest.
    if (e.buttons === 0) {
      this.onPointerUp();
      return;
    }
    const canvas = this.eventToCanvas(e.clientX, e.clientY);

    if (g.mode === "pan") {
      const dx = canvas.x - g.startCanvas.x;
      const dy = canvas.y - g.startCanvas.y;
      this.viewport.position.set(g.startPan!.x + dx, g.startPan!.y + dy);
      this.updateView();
      return;
    }

    if (!g.began) {
      // historię i tryb gestu otwieramy dopiero przy realnym ruchu
      const moved = Math.abs(canvas.x - g.startCanvas.x) + Math.abs(canvas.y - g.startCanvas.y) > 2;
      if (!moved) return;
      g.began = true;
      g.moved = true;
      this.cb.onBeginInteraction();
    }

    const world = this.toWorld(canvas.x, canvas.y);
    const start = g.startNode!;
    let preview: SceneNode;

    if (g.mode === "move") {
      const dx = world.x - g.startWorld.x;
      const dy = world.y - g.startWorld.y;
      preview = { ...start, cx: start.cx + dx, cy: start.cy + dy };
    } else if (g.mode === "rotate") {
      const rotation = rotationFromPointer({ x: start.cx, y: start.cy }, world, e.shiftKey);
      preview = { ...start, rotation };
    } else {
      const handle = g.handle as Exclude<HandleId, "rot">;
      const lockAspect = start.kind === "image" ? !e.shiftKey : e.shiftKey;
      // Kompensacja chwytu — uchwyt podąża za kursorem bez skoku na starcie.
      const off = g.grabOffset ?? { x: 0, y: 0 };
      const adj = { x: world.x - off.x, y: world.y - off.y };
      const box = resizeNode(start, handle, adj, lockAspect);
      if (start.kind === "text") {
        const isCorner = handle.length === 2;
        if (isCorner && start.w > 0) {
          const factor = box.w / start.w;
          preview = {
            ...start,
            cx: box.cx,
            cy: box.cy,
            w: box.w,
            h: box.h,
            fontSizePt: Math.max(2, start.fontSizePt * factor),
          };
        } else if (handle === "l" || handle === "r") {
          preview = { ...start, cx: box.cx, cy: box.cy, w: box.w };
        } else {
          return; // pionowe krawędzie tekstu nie zmieniają wysokości
        }
      } else {
        preview = { ...start, cx: box.cx, cy: box.cy, w: box.w, h: box.h };
      }
    }

    g.preview = preview;
    const holder = this.holders.get(g.nodeId!);
    if (holder) {
      updateHolder(holder, preview, this.textures, this.textResolution);
    }
    this.updateTransformer();
  };

  private onPointerUp = (): void => {
    const g = this.gesture;
    this.gesture = null;
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerup", this.onPointerUp);
    this.canvas.style.cursor = this.spaceDown ? "grab" : "default";
    if (!g) return;

    if (g.mode === "pan") {
      const w = this.app.renderer.width;
      const h = this.app.renderer.height;
      this.clampPanToView(w, h);
      this.updateView();
      return;
    }

    if (g.began && g.preview && g.nodeId) {
      const p = g.preview;
      const patch: Partial<SceneNode> =
        g.mode === "move"
          ? { cx: p.cx, cy: p.cy }
          : g.mode === "rotate"
            ? { rotation: p.rotation }
            : p.kind === "text"
              ? {
                  cx: p.cx,
                  cy: p.cy,
                  w: p.w,
                  h: p.h,
                  fontSizePt: (p as { fontSizePt: number }).fontSizePt,
                }
              : { cx: p.cx, cy: p.cy, w: p.w, h: p.h };
      this.cb.onSetNode(g.nodeId, patch);
      this.cb.onEndInteraction();
    }
  };

  private onWheel = (e: WheelEvent): void => {
    e.preventDefault();
    const canvas = this.eventToCanvas(e.clientX, e.clientY);
    const factor = Math.exp(-e.deltaY * ZOOM_WHEEL_FACTOR);
    this.zoomBy(factor, canvas);
  };

  private onKeyState = (e: KeyboardEvent): void => {
    const tag = (e.target as HTMLElement | null)?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (e.code === "Space") {
      const down = e.type === "keydown";
      if (down) e.preventDefault();
      if (this.spaceDown !== down) {
        this.spaceDown = down;
        if (!this.gesture) {
          this.canvas.style.cursor = down ? "grab" : "default";
        }
      }
    }
  };

  // --- Eksport: render strony do canvasu w docelowym px/mm -------------------
  async renderToCanvas(exportPxPerMm: number): Promise<HTMLCanvasElement> {
    if (!this.doc) throw new Error("Brak dokumentu do eksportu.");
    const page = pageSize(this.doc.format);

    // Twardy limit GPU: dłuższy bok rastra nigdy nie przekracza EXPORT_MAX_PX
    // (chroni przed przekroczeniem MAX_TEXTURE_SIZE → pustym/uciętym rastrem dla
    // wielkich formatów). W razie potrzeby skalujemy px/mm w dół.
    const longestPx = Math.max(page.wMm, page.hMm) * exportPxPerMm;
    const scale =
      longestPx > EXPORT_MAX_PX ? exportPxPerMm * (EXPORT_MAX_PX / longestPx) : exportPxPerMm;
    const W = Math.max(1, Math.round(page.wMm * scale));
    const H = Math.max(1, Math.round(page.hMm * scale));

    const root = new Container();
    root.scale.set(scale);

    if (this.doc.background.enabled) {
      const bg = new Graphics();
      bg.rect(0, 0, page.wMm, page.hMm).fill({
        color: this.doc.background.color,
      });
      root.addChild(bg);
    }
    for (const node of this.doc.nodes) {
      if (node.hidden) continue;
      const holder = createHolder(node, this.textures, scale);
      root.addChild(holder);
    }

    const rt = RenderTexture.create({ width: W, height: H, resolution: 1 });
    this.app.renderer.render({ container: root, target: rt, clear: true });
    const canvas = this.app.renderer.extract.canvas(rt) as HTMLCanvasElement;

    rt.destroy(true);
    root.destroy({ children: true });
    return canvas;
  }

  destroy(): void {
    this.destroyed = true;
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerup", this.onPointerUp);
    window.removeEventListener("keydown", this.onKeyState);
    window.removeEventListener("keyup", this.onKeyState);
    try {
      this.canvas.removeEventListener("wheel", this.onWheel);
    } catch {
      // canvas mógł już zniknąć
    }
    try {
      this.app.destroy(true, { children: true, texture: false });
    } catch {
      // app mógł być jeszcze w trakcie inicjalizacji
    }
  }
}
