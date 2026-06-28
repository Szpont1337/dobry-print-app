// Model dokumentu edytora. Cała geometria jest w MILIMETRACH w przestrzeni
// strony (origin = lewy górny róg strony WRAZ ze spadem). Transform każdego
// węzła jest wyrażony środkiem (cx, cy), rozmiarem (w, h) i obrotem wokół
// środka — dzięki temu uchwyty skalowania i obrotu są symetryczne, a eksport do
// dowolnego DPI sprowadza się do przeskalowania mm → px.

export type NodeKind = "image" | "text" | "rect" | "ellipse" | "line";

export type TextAlign = "left" | "center" | "right";

export interface BaseNode {
  id: string;
  kind: NodeKind;
  /** etykieta w panelu warstw */
  name: string;
  /** środek X w mm (przestrzeń strony) */
  cx: number;
  /** środek Y w mm */
  cy: number;
  /** szerokość w mm */
  w: number;
  /** wysokość w mm */
  h: number;
  /** obrót w stopniach, zgodnie z ruchem wskazówek zegara */
  rotation: number;
  /** 0..1 */
  opacity: number;
  locked: boolean;
  hidden: boolean;
}

export interface ImageNode extends BaseNode {
  kind: "image";
  /** data URL (przetrwa autosave i posłuży do eksportu w pełnej rozdzielczości) */
  src: string;
  /** naturalna szerokość bitmapy w px */
  naturalW: number;
  /** naturalna wysokość bitmapy w px */
  naturalH: number;
  flipH: boolean;
  flipV: boolean;
  /** zaokrąglenie rogów (maska) w mm */
  radius: number;
}

export interface TextNode extends BaseNode {
  kind: "text";
  text: string;
  fontFamily: string;
  /** rozmiar pisma w punktach typograficznych (pt) */
  fontSizePt: number;
  fontWeight: "400" | "700";
  italic: boolean;
  /** kolor w HEX, np. #14241f */
  fill: string;
  align: TextAlign;
  /** odstęp między literami w pt */
  letterSpacing: number;
  /** mnożnik interlinii (1 = pojedyncza) */
  lineHeight: number;
}

export interface RectNode extends BaseNode {
  kind: "rect";
  fill: string;
  fillEnabled: boolean;
  stroke: string;
  /** grubość obrysu w mm */
  strokeWidth: number;
  /** zaokrąglenie rogów w mm */
  radius: number;
}

export interface EllipseNode extends BaseNode {
  kind: "ellipse";
  fill: string;
  fillEnabled: boolean;
  stroke: string;
  strokeWidth: number;
}

export interface LineNode extends BaseNode {
  kind: "line";
  stroke: string;
  /** grubość linii w mm (= wysokość węzła) */
  strokeWidth: number;
}

export type SceneNode = ImageNode | TextNode | RectNode | EllipseNode | LineNode;

export interface PageBackground {
  color: string;
  enabled: boolean;
}

export interface FormatSpec {
  /** etykieta z katalogu, np. „A5 · 148 × 210 mm” */
  label: string;
  /** szerokość netto (trim) w mm */
  wMm: number;
  /** wysokość netto (trim) w mm */
  hMm: number;
  /** spad w mm (z każdej strony) */
  bleedMm: number;
  /** margines bezpieczny w mm (od linii cięcia do środka) */
  safeMm: number;
  /** false, gdy wymiar wyprowadzono zastępczo (odzież / torby / pudełka) */
  exact: boolean;
}

/** Edytowalna treść projektu — to, co podlega historii (undo/redo) i autosave. */
export interface EditorDoc {
  format: FormatSpec;
  background: PageBackground;
  /** kolejność rysowania: indeks 0 = spód, ostatni = wierzch */
  nodes: SceneNode[];
}

/** Uchwyty transformacji: 4 narożniki, 4 krawędzie i obrót. */
export type HandleId = "tl" | "tr" | "bl" | "br" | "t" | "b" | "l" | "r" | "rot";
