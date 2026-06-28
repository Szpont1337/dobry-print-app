"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

import { cn } from "@/lib/cn";

import { STARTER_TEMPLATES } from "../constant/templates";
import { useEditor } from "../store/editor-store";
import { pageSize } from "../utils/print-format";

export function TemplatePicker({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ed = useEditor();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const page = pageSize(ed.doc.format);
  const portrait = page.hMm >= page.wMm;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-5">
      <button
        type="button"
        aria-label="Zamknij"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-transparent"
      />
      <dialog
        open
        aria-label="Szablony startowe"
        className="relative z-10 m-0 w-full max-w-2xl rounded-lg border border-border bg-card p-5 text-foreground shadow-lg sm:p-8"
      >
        <header className="flex items-start justify-between gap-3 border-b border-border pb-5">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Start
            </p>
            <h2 className="mt-1 text-xl font-extrabold tracking-tight text-foreground">
              Wybierz szablon
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Szablon zastąpi obecny projekt. Cofniesz to skrótem Ctrl+Z.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij"
            className="grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X aria-hidden className="size-5" />
          </button>
        </header>

        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STARTER_TEMPLATES.map((tpl) => (
            <li key={tpl.id}>
              <button
                type="button"
                onClick={() => {
                  ed.replaceNodes(tpl.build(page));
                  onClose();
                }}
                className="group flex w-full flex-col gap-2 rounded-lg border border-border bg-background p-2 text-left transition-colors hover:border-primary"
              >
                <span
                  className={cn(
                    "relative mx-auto block w-full overflow-hidden rounded-lg border border-border bg-card",
                  )}
                  style={{ aspectRatio: portrait ? "3 / 4" : "4 / 3" }}
                >
                  <TemplatePreview id={tpl.id} />
                </span>
                <span className="text-xs font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {tpl.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </dialog>
    </div>
  );
}

// Schematyczny podgląd układu (czysto dekoracyjny).
function TemplatePreview({ id }: { id: string }) {
  if (id === "blank") {
    return <span className="absolute inset-0 bg-card" />;
  }
  if (id === "headline") {
    return (
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2">
        <span className="h-1 w-5 rounded-lg bg-accent" />
        <span className="h-2 w-12 rounded-lg bg-primary" />
        <span className="h-1 w-10 rounded-lg bg-muted-foreground/40" />
      </span>
    );
  }
  if (id === "photo-banner") {
    return (
      <span className="absolute inset-0 flex flex-col">
        <span className="flex-1 bg-secondary" />
        <span className="grid h-1/4 place-items-center bg-primary">
          <span className="h-1.5 w-10 rounded-lg bg-primary-foreground/80" />
        </span>
      </span>
    );
  }
  return (
    <span className="absolute inset-1 flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-primary p-2">
      <span className="size-3 rounded-lg bg-accent" />
      <span className="h-2 w-10 rounded-lg bg-foreground/70" />
      <span className="h-1 w-8 rounded-lg bg-muted-foreground/40" />
    </span>
  );
}
