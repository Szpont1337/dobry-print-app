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
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

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
  const { t } = useTranslation("editor");
  const fileRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [templatesOpen, setTemplatesOpen] = useState(false);

  const page = pageSize(ed.doc.format);

  const tools: Tool[] = [
    {
      label: t("nodes.text"),
      icon: Type,
      run: (p) => ed.addNode(createText(p, t("nodes.text"), t("nodes.defaultText"))),
    },
    {
      label: t("nodes.rect"),
      icon: Square,
      run: (p) => ed.addNode(createRect(p, t("nodes.rect"))),
    },
    {
      label: t("nodes.ellipse"),
      icon: Circle,
      run: (p) => ed.addNode(createEllipse(p, t("nodes.ellipse"))),
    },
    { label: t("nodes.line"), icon: Minus, run: (p) => ed.addNode(createLine(p, t("nodes.line"))) },
  ];

  const onFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);
    setImporting(true);
    try {
      for (const file of Array.from(files)) {
        const result = await importImageFile(file);
        ed.addNode(createImage(page, result, t("nodes.image")));
      }
    } catch {
      setError(t("tools.imageError"));
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
        label={t("tools.image")}
        spinning={importing}
        onClick={() => fileRef.current?.click()}
      />
      {tools.map((tool) => (
        <RailButton
          key={tool.label}
          icon={tool.icon}
          label={tool.label}
          onClick={() => tool.run(page)}
        />
      ))}
      <RailButton
        icon={LayoutTemplate}
        label={t("tools.templates")}
        onClick={() => setTemplatesOpen(true)}
      />

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
