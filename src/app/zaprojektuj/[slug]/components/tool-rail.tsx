"use client";

import {
  Circle,
  ImagePlus,
  LayoutTemplate,
  Loader2,
  Minus,
  Square,
  Type,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState } from "react";

import { cn } from "@/lib/cn";

import { ACCEPTED_IMAGE_TYPES } from "../constant/editor";
import { useEditor } from "../store/editor-store";
import { pageSize } from "../utils/print-format";
import { importImageFile } from "../utils/image-import";
import {
  createEllipse,
  createImage,
  createLine,
  createRect,
  createText,
} from "../utils/node-factory";
import { TemplatePicker } from "./template-picker";

interface Tool {
  label: string;
  icon: LucideIcon;
  run: (page: { wMm: number; hMm: number }) => void;
}

export function ToolRail() {
  const ed = useEditor();
  const fileRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [templatesOpen, setTemplatesOpen] = useState(false);

  const page = pageSize(ed.doc.format);

  const tools: Tool[] = [
    { label: "Tekst", icon: Type, run: (p) => ed.addNode(createText(p)) },
    { label: "Prostokąt", icon: Square, run: (p) => ed.addNode(createRect(p)) },
    { label: "Elipsa", icon: Circle, run: (p) => ed.addNode(createEllipse(p)) },
    { label: "Linia", icon: Minus, run: (p) => ed.addNode(createLine(p)) },
  ];

  const onFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);
    setImporting(true);
    try {
      for (const file of Array.from(files)) {
        const result = await importImageFile(file);
        ed.addNode(createImage(page, result));
      }
    } catch {
      setError("Nie udało się wczytać obrazu.");
    } finally {
      setImporting(false);
    }
  };

  return (
    <aside className="flex w-[88px] shrink-0 flex-col gap-1 overflow-y-auto border-r border-border bg-card p-2">
      <input
        ref={fileRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        multiple
        className="sr-only"
        onChange={(e) => {
          void onFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <RailButton
        icon={importing ? Loader2 : ImagePlus}
        label="Zdjęcie"
        spinning={importing}
        onClick={() => fileRef.current?.click()}
      />
      {tools.map((t) => (
        <RailButton key={t.label} icon={t.icon} label={t.label} onClick={() => t.run(page)} />
      ))}
      <RailButton icon={LayoutTemplate} label="Szablony" onClick={() => setTemplatesOpen(true)} />

      {error && (
        <p className="px-1 text-center text-[11px] font-medium text-destructive">{error}</p>
      )}

      <TemplatePicker open={templatesOpen} onClose={() => setTemplatesOpen(false)} />
    </aside>
  );
}

function RailButton({
  icon: Icon,
  label,
  onClick,
  spinning,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  spinning?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 rounded-lg border border-transparent px-2 py-3 text-center transition-colors",
        "hover:border-border hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
      )}
    >
      <Icon aria-hidden className={cn("size-5 text-primary", spinning && "animate-spin")} />
      <span className="text-[11px] font-semibold tracking-tight text-foreground">{label}</span>
    </button>
  );
}
