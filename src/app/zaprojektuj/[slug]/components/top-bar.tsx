"use client";

import {
  ArrowLeft,
  Download,
  Loader2,
  Maximize,
  Redo2,
  Undo2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/cn";

import type { PixiEngine } from "../engine/pixi-engine";
import { useExportOrder } from "../hooks/use-export-order";
import { useEditor } from "../store/editor-store";
import type { FormatSpec } from "../types";

export function TopBar({
  product,
  format,
  formatId,
  quantity,
  engine,
  zoomPct,
}: {
  product: { slug: string; name: string };
  format: FormatSpec;
  formatId: string;
  quantity: number;
  engine: PixiEngine | null;
  zoomPct: number;
}) {
  const ed = useEditor();
  const { phase, error, busy, exportAndOrder, download } = useExportOrder({
    engine,
    productSlug: product.slug,
    format,
    formatId,
    quantity,
  });

  return (
    <header className="relative z-10 flex flex-wrap items-center gap-3 border-b border-border bg-card px-3 py-2 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <Link
          href={`/produkty/${product.slug}`}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="size-4" />
          <span className="hidden sm:inline">Wróć</span>
        </Link>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold tracking-tight text-foreground">
            {product.name}
          </p>
          <p className="truncate font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {format.label} · {quantity} szt.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <ToolBtn label="Cofnij" onClick={ed.undo} disabled={!ed.canUndo}>
          <Undo2 aria-hidden className="size-4" />
        </ToolBtn>
        <ToolBtn label="Ponów" onClick={ed.redo} disabled={!ed.canRedo}>
          <Redo2 aria-hidden className="size-4" />
        </ToolBtn>
      </div>

      <div className="flex items-center gap-1 rounded-lg border border-border px-1">
        <ToolBtn label="Pomniejsz" onClick={() => engine?.zoomBy(1 / 1.2)}>
          <ZoomOut aria-hidden className="size-4" />
        </ToolBtn>
        <button
          type="button"
          onClick={() => engine?.fit()}
          className="min-w-12 rounded-lg px-1.5 py-1 text-center font-mono text-xs font-semibold tabular-nums text-foreground transition-colors hover:bg-muted"
        >
          {zoomPct}%
        </button>
        <ToolBtn label="Powiększ" onClick={() => engine?.zoomBy(1.2)}>
          <ZoomIn aria-hidden className="size-4" />
        </ToolBtn>
        <ToolBtn label="Dopasuj" onClick={() => engine?.fit()}>
          <Maximize aria-hidden className="size-4" />
        </ToolBtn>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={() => void download()}
          disabled={busy || !engine}
          className="inline-flex items-center gap-1.5 rounded-lg border border-input bg-card px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
        >
          <Download aria-hidden className="size-4" />
          <span className="hidden sm:inline">PDF</span>
        </button>
        <button
          type="button"
          onClick={() => void exportAndOrder()}
          disabled={busy || !engine}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
          {phase === "rendering"
            ? "Renderowanie…"
            : phase === "uploading"
              ? "Wysyłanie…"
              : phase === "redirecting"
                ? "Przekierowanie…"
                : "Zapisz i zamów"}
          {!busy && <span aria-hidden>→</span>}
        </button>
      </div>

      {error && (
        <p
          role="alert"
          aria-live="polite"
          className="w-full rounded-lg bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive"
        >
          {error}
        </p>
      )}
    </header>
  );
}

function ToolBtn({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "grid size-8 place-items-center rounded-lg text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40",
      )}
    >
      {children}
    </button>
  );
}
