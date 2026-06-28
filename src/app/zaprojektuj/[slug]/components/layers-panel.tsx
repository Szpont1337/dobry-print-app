"use client";

import {
  ChevronDown,
  ChevronUp,
  Circle,
  Copy,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Lock,
  Minus,
  Square,
  Trash2,
  Type,
  Unlock,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/cn";

import { useEditor } from "../store/editor-store";
import type { NodeKind, SceneNode } from "../types";
import { duplicate } from "../utils/node-factory";

const KIND_ICON: Record<NodeKind, LucideIcon> = {
  image: ImageIcon,
  text: Type,
  rect: Square,
  ellipse: Circle,
  line: Minus,
};

export function LayersPanel() {
  const ed = useEditor();
  // Wyświetlamy od wierzchu do spodu (odwrotnie do kolejności rysowania).
  const ordered = [...ed.doc.nodes].reverse();

  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Warstwy
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">{ed.doc.nodes.length}</span>
      </header>

      {ordered.length === 0 ? (
        <p className="px-3 py-5 text-center text-xs text-muted-foreground">
          Brak warstw. Dodaj tekst, kształt lub zdjęcie.
        </p>
      ) : (
        <ul className="max-h-[34vh] overflow-y-auto p-1">
          {ordered.map((node) => (
            <LayerRow key={node.id} node={node} />
          ))}
        </ul>
      )}
    </div>
  );
}

function LayerRow({ node }: { node: SceneNode }) {
  const ed = useEditor();
  const Icon = KIND_ICON[node.kind];
  const selected = ed.selectedId === node.id;

  return (
    <li>
      <div
        className={cn(
          "group flex items-center gap-1.5 rounded-lg px-1.5 py-1.5 transition-colors",
          selected ? "bg-secondary" : "hover:bg-muted",
        )}
      >
        <button
          type="button"
          onClick={() => ed.select(node.id)}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
        >
          <Icon
            aria-hidden
            className={cn("size-4 shrink-0", selected ? "text-primary" : "text-muted-foreground")}
          />
          <span
            className={cn(
              "truncate text-xs font-medium",
              node.hidden ? "text-muted-foreground line-through" : "text-foreground",
            )}
          >
            {node.name}
          </span>
        </button>

        <IconBtn
          label={node.hidden ? "Pokaż" : "Ukryj"}
          onClick={() => ed.commitNode(node.id, { hidden: !node.hidden })}
        >
          {node.hidden ? (
            <EyeOff aria-hidden className="size-3.5" />
          ) : (
            <Eye aria-hidden className="size-3.5" />
          )}
        </IconBtn>
        <IconBtn
          label={node.locked ? "Odblokuj" : "Zablokuj"}
          onClick={() => ed.commitNode(node.id, { locked: !node.locked })}
        >
          {node.locked ? (
            <Lock aria-hidden className="size-3.5 text-primary" />
          ) : (
            <Unlock aria-hidden className="size-3.5" />
          )}
        </IconBtn>

        <span className="flex opacity-0 transition-opacity group-hover:opacity-100">
          <IconBtn label="Wyżej" onClick={() => ed.reorder(node.id, "up")}>
            <ChevronUp aria-hidden className="size-3.5" />
          </IconBtn>
          <IconBtn label="Niżej" onClick={() => ed.reorder(node.id, "down")}>
            <ChevronDown aria-hidden className="size-3.5" />
          </IconBtn>
          <IconBtn label="Powiel" onClick={() => ed.duplicateNode(duplicate(node))}>
            <Copy aria-hidden className="size-3.5" />
          </IconBtn>
          <IconBtn
            label="Usuń"
            destructive
            disabled={node.locked}
            onClick={() => ed.deleteNode(node.id)}
          >
            <Trash2 aria-hidden className="size-3.5" />
          </IconBtn>
        </span>
      </div>
    </li>
  );
}

function IconBtn({
  label,
  onClick,
  children,
  destructive,
  disabled,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  destructive?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "grid size-6 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-card disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent",
        destructive ? "hover:text-destructive" : "hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
