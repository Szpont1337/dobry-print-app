"use client";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Copy,
  FlipHorizontal,
  FlipVertical,
  Italic,
  Lock,
  RefreshCw,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

import { ACCEPTED_IMAGE_TYPES, FONT_FAMILIES } from "../constant/editor";
import { useEditor } from "../store/editor-store";
import { ColorInput } from "./color-input";
import type {
  EllipseNode,
  ImageNode,
  LineNode,
  RectNode,
  SceneNode,
  TextAlign,
  TextNode,
} from "../types";
import { importImageFile } from "../utils/image-import";
import { duplicate } from "../utils/node-factory";

export function PropertiesPanel() {
  const ed = useEditor();
  const node = ed.selectedNode;
  return (
    <div className="flex flex-col gap-5 overflow-y-auto p-3">
      {node ? <NodeProps node={node} /> : <PageProps />}
    </div>
  );
}

// --- Sekcja per typ węzła ----------------------------------------------------
function NodeProps({ node }: { node: SceneNode }) {
  const ed = useEditor();
  const { t } = useTranslation("editor");
  const begin = ed.beginInteraction;
  const end = ed.endInteraction;
  const set = (patch: Partial<SceneNode>) => ed.setNode(node.id, patch);
  const commit = (patch: Partial<SceneNode>) => ed.commitNode(node.id, patch);

  if (node.locked) {
    return (
      <>
        <header className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {node.name}
          </span>
          <SmallBtn
            label={t("props.duplicate")}
            icon={Copy}
            onClick={() =>
              ed.duplicateNode(duplicate(node, t("nodes.copyName", { name: node.name })))
            }
          />
        </header>
        <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
          <Lock aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>{t("props.lockedNotice")}</span>
        </div>
        <button
          type="button"
          onClick={() => commit({ locked: false })}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-card px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Lock aria-hidden className="size-4" />
          {t("props.unlockLayer")}
        </button>
      </>
    );
  }

  return (
    <>
      <header className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {node.name}
        </span>
        <div className="flex gap-1">
          <SmallBtn
            label={t("props.duplicate")}
            icon={Copy}
            onClick={() =>
              ed.duplicateNode(duplicate(node, t("nodes.copyName", { name: node.name })))
            }
          />
          <SmallBtn
            label={t("props.delete")}
            icon={Trash2}
            destructive
            onClick={() => ed.deleteNode(node.id)}
          />
        </div>
      </header>

      {node.kind === "text" && (
        <TextSection node={node} set={set} commit={commit} begin={begin} end={end} />
      )}
      {node.kind === "image" && <ImageSection node={node} commit={commit} />}
      {(node.kind === "rect" || node.kind === "ellipse" || node.kind === "line") && (
        <ShapeSection node={node} set={set} commit={commit} begin={begin} end={end} />
      )}

      <TransformSection node={node} set={set} begin={begin} end={end} />
    </>
  );
}

// --- Pozycja / rozmiar / obrót / krycie -------------------------------------
function TransformSection({
  node,
  set,
  begin,
  end,
}: {
  node: SceneNode;
  set: (patch: Partial<SceneNode>) => void;
  begin: () => void;
  end: () => void;
}) {
  const { t } = useTranslation("editor");
  const sizeEditable = node.kind !== "line";
  const heightEditable = node.kind !== "text" && node.kind !== "line";
  return (
    <Section title={t("props.layout")}>
      <div className="grid grid-cols-2 gap-2">
        <NumberField
          label={t("props.x")}
          value={node.cx}
          begin={begin}
          end={end}
          onChange={(v) => set({ cx: v })}
        />
        <NumberField
          label={t("props.y")}
          value={node.cy}
          begin={begin}
          end={end}
          onChange={(v) => set({ cy: v })}
        />
        {sizeEditable && (
          <NumberField
            label={t("props.width")}
            value={node.w}
            min={1}
            begin={begin}
            end={end}
            onChange={(v) => set({ w: v })}
          />
        )}
        {heightEditable && (
          <NumberField
            label={t("props.height")}
            value={node.h}
            min={1}
            begin={begin}
            end={end}
            onChange={(v) => set({ h: v })}
          />
        )}
        <NumberField
          label={t("props.rotation")}
          value={node.rotation}
          step={1}
          begin={begin}
          end={end}
          onChange={(v) => set({ rotation: v })}
        />
      </div>
      <Slider
        label={t("props.opacity")}
        value={Math.round(node.opacity * 100)}
        min={0}
        max={100}
        begin={begin}
        end={end}
        onChange={(v) => set({ opacity: v / 100 })}
        suffix="%"
      />
    </Section>
  );
}

// --- Tekst -------------------------------------------------------------------
function TextSection({
  node,
  set,
  commit,
  begin,
  end,
}: {
  node: TextNode;
  set: (patch: Partial<TextNode>) => void;
  commit: (patch: Partial<TextNode>) => void;
  begin: () => void;
  end: () => void;
}) {
  const { t } = useTranslation("editor");
  const aligns: { value: TextAlign; icon: LucideIcon; label: string }[] = [
    { value: "left", icon: AlignLeft, label: t("props.alignLeft") },
    { value: "center", icon: AlignCenter, label: t("props.alignCenter") },
    { value: "right", icon: AlignRight, label: t("props.alignRight") },
  ];
  return (
    <Section title={t("props.text")}>
      <textarea
        value={node.text}
        rows={3}
        onFocus={begin}
        onBlur={end}
        onChange={(e) => set({ text: e.target.value })}
        className="w-full resize-y rounded-lg border border-input bg-card px-2 py-1.5 text-sm text-foreground outline-none focus:border-primary"
      />
      <Labeled label={t("props.font")}>
        <select
          value={node.fontFamily}
          onChange={(e) => commit({ fontFamily: e.target.value })}
          className="h-8 w-full rounded-lg border border-input bg-card px-2 text-sm text-foreground outline-none focus:border-primary"
        >
          {FONT_FAMILIES.map((f) => (
            <option key={f.label} value={f.value} style={{ fontFamily: f.value }}>
              {f.label}
            </option>
          ))}
        </select>
      </Labeled>
      <div className="grid grid-cols-2 gap-2">
        <NumberField
          label={t("props.fontSize")}
          value={node.fontSizePt}
          min={2}
          step={1}
          begin={begin}
          end={end}
          onChange={(v) => set({ fontSizePt: v })}
        />
        <NumberField
          label={t("props.lineHeight")}
          value={node.lineHeight}
          min={0.5}
          step={0.1}
          begin={begin}
          end={end}
          onChange={(v) => set({ lineHeight: v })}
        />
        <NumberField
          label={t("props.letterSpacing")}
          value={node.letterSpacing}
          step={0.5}
          begin={begin}
          end={end}
          onChange={(v) => set({ letterSpacing: v })}
        />
      </div>
      <div className="flex items-center gap-2">
        <IconToggle
          label={t("props.bold")}
          icon={Bold}
          active={node.fontWeight === "700"}
          onClick={() => commit({ fontWeight: node.fontWeight === "700" ? "400" : "700" })}
        />
        <IconToggle
          label={t("props.italic")}
          icon={Italic}
          active={node.italic}
          onClick={() => commit({ italic: !node.italic })}
        />
        <span className="mx-1 h-6 w-px bg-border" />
        {aligns.map((a) => (
          <IconToggle
            key={a.value}
            label={a.label}
            icon={a.icon}
            active={node.align === a.value}
            onClick={() => commit({ align: a.value })}
          />
        ))}
      </div>
      <ColorRow
        label={t("props.textColor")}
        value={node.fill}
        set={(c) => set({ fill: c })}
        begin={begin}
        end={end}
      />
    </Section>
  );
}

// --- Obraz -------------------------------------------------------------------
function ImageSection({
  node,
  commit,
}: {
  node: ImageNode;
  commit: (patch: Partial<ImageNode>) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const ed = useEditor();
  const { t } = useTranslation("editor");
  return (
    <Section title={t("props.image")}>
      <input
        ref={fileRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        className="sr-only"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          try {
            const img = await importImageFile(file);
            ed.commitNode(node.id, {
              src: img.src,
              naturalW: img.naturalW,
              naturalH: img.naturalH,
              h: (node.w * img.naturalH) / img.naturalW,
            });
          } catch {
            // pomijamy — obraz się nie wczytał
          }
        }}
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-card px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <RefreshCw aria-hidden className="size-4" />
        {t("props.changeImage")}
      </button>
      <div className="flex items-center gap-2">
        <IconToggle
          label={t("props.flipH")}
          icon={FlipHorizontal}
          active={node.flipH}
          onClick={() => commit({ flipH: !node.flipH })}
        />
        <IconToggle
          label={t("props.flipV")}
          icon={FlipVertical}
          active={node.flipV}
          onClick={() => commit({ flipV: !node.flipV })}
        />
      </div>
      <NumberField
        label={t("props.cornerRadius")}
        value={node.radius}
        min={0}
        step={1}
        begin={ed.beginInteraction}
        end={ed.endInteraction}
        onChange={(v) => ed.setNode(node.id, { radius: v })}
      />
    </Section>
  );
}

// --- Kształty (rect / ellipse / line) ---------------------------------------
function ShapeSection({
  node,
  set,
  commit,
  begin,
  end,
}: {
  node: RectNode | EllipseNode | LineNode;
  set: (patch: Partial<RectNode | EllipseNode | LineNode>) => void;
  commit: (patch: Partial<RectNode | EllipseNode | LineNode>) => void;
  begin: () => void;
  end: () => void;
}) {
  const { t } = useTranslation("editor");
  const hasFill = node.kind === "rect" || node.kind === "ellipse";
  return (
    <Section title={t("props.appearance")}>
      {hasFill && (
        <>
          <label className="flex items-center justify-between text-sm">
            <span className="font-semibold text-foreground">{t("props.fillEnabled")}</span>
            <input
              type="checkbox"
              checked={(node as RectNode).fillEnabled}
              onChange={(e) => commit({ fillEnabled: e.target.checked })}
              className="size-4 accent-[var(--color-primary)]"
            />
          </label>
          {(node as RectNode).fillEnabled && (
            <ColorRow
              label={t("props.fillColor")}
              value={(node as RectNode).fill}
              set={(c) => set({ fill: c })}
              begin={begin}
              end={end}
            />
          )}
        </>
      )}
      <ColorRow
        label={node.kind === "line" ? t("props.lineColor") : t("props.strokeColor")}
        value={node.stroke}
        set={(c) => set({ stroke: c })}
        begin={begin}
        end={end}
      />
      <NumberField
        label={t("props.strokeWidth")}
        value={node.strokeWidth}
        min={node.kind === "line" ? 0.1 : 0}
        step={0.5}
        begin={begin}
        end={end}
        onChange={(v) => set({ strokeWidth: v })}
      />
      {node.kind === "rect" && (
        <NumberField
          label={t("props.radius")}
          value={(node as RectNode).radius}
          min={0}
          step={1}
          begin={begin}
          end={end}
          onChange={(v) => set({ radius: v })}
        />
      )}
    </Section>
  );
}

// --- Strona (nic nie zaznaczone) --------------------------------------------
function PageProps() {
  const ed = useEditor();
  const { t } = useTranslation("editor");
  const bg = ed.doc.background;
  const f = ed.doc.format;
  return (
    <>
      <Section title={t("props.page")}>
        <div className="rounded-lg border border-border bg-background p-3 text-sm">
          <p className="font-semibold text-foreground">{f.label}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("props.artboard", { w: f.wMm, h: f.hMm })}
            {f.bleedMm > 0 ? t("props.bleed", { bleed: f.bleedMm }) : ""}
          </p>
          {!f.exact && (
            <p className="mt-2 text-xs text-accent-foreground">{t("props.inexactNotice")}</p>
          )}
        </div>
      </Section>
      <Section title={t("props.background")}>
        <label className="flex items-center justify-between text-sm">
          <span className="font-semibold text-foreground">{t("props.showBackground")}</span>
          <input
            type="checkbox"
            checked={bg.enabled}
            onChange={(e) => ed.setBackground({ enabled: e.target.checked })}
            className="size-4 accent-[var(--color-primary)]"
          />
        </label>
        {bg.enabled && (
          <ColorRow
            label={t("props.backgroundColor")}
            value={bg.color}
            set={(c) => ed.setBackground({ color: c })}
            begin={ed.beginInteraction}
            end={ed.endInteraction}
          />
        )}
      </Section>
      <p className="px-1 text-xs text-muted-foreground">{t("props.selectHint")}</p>
    </>
  );
}

// --- Elementy wspólne --------------------------------------------------------
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-t border-border pt-4 first:border-t-0 first:pt-0">
      <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Labeled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function ColorRow({
  label,
  value,
  set,
  begin,
  end,
}: {
  label: string;
  value: string;
  set: (hex: string) => void;
  begin: () => void;
  end: () => void;
}) {
  return <ColorInput label={label} value={value} onChange={set} onStart={begin} onEnd={end} />;
}

function NumberField({
  label,
  value,
  onChange,
  begin,
  end,
  step = 1,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  begin: () => void;
  end: () => void;
  step?: number;
  min?: number;
  max?: number;
}) {
  const [text, setText] = useState(fmt(value));
  const focused = useRef(false);
  useEffect(() => {
    if (!focused.current) setText(fmt(value));
  }, [value]);

  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        type="number"
        inputMode="decimal"
        step={step}
        value={text}
        onFocus={() => {
          focused.current = true;
          begin();
        }}
        onBlur={() => {
          focused.current = false;
          end();
          setText(fmt(value));
        }}
        onChange={(e) => {
          setText(e.target.value);
          const n = Number.parseFloat(e.target.value);
          if (Number.isFinite(n)) {
            let v = n;
            if (min != null) v = Math.max(min, v);
            if (max != null) v = Math.min(max, v);
            onChange(v);
          }
        }}
        className="h-8 w-full min-w-0 rounded-lg border border-input bg-card px-2 text-sm tabular-nums text-foreground outline-none focus:border-primary"
      />
    </label>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  onChange,
  begin,
  end,
  suffix,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  begin: () => void;
  end: () => void;
  suffix?: string;
}) {
  return (
    <label aria-label={label} className="flex flex-col gap-1 text-sm">
      <span className="flex items-center justify-between font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <span>{label}</span>
        <span className="tabular-nums text-foreground">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onFocus={begin}
        onPointerDown={begin}
        onBlur={end}
        onPointerUp={end}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--color-primary)]"
      />
    </label>
  );
}

function IconToggle({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "grid size-8 place-items-center rounded-lg border transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-input bg-card text-foreground hover:border-primary/40",
      )}
    >
      <Icon aria-hidden className="size-4" />
    </button>
  );
}

function SmallBtn({
  label,
  icon: Icon,
  onClick,
  destructive,
}: {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "grid size-7 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted",
        destructive ? "hover:text-destructive" : "hover:text-foreground",
      )}
    >
      <Icon aria-hidden className="size-4" />
    </button>
  );
}

function fmt(v: number): string {
  return String(Math.round(v * 10) / 10);
}
