"use client";

import { useEffect } from "react";

import { NUDGE_LARGE_MM, NUDGE_MM } from "../constant/editor";
import type { PixiEngine } from "../engine/pixi-engine";
import { useEditor } from "../store/editor-store";
import { duplicate } from "../utils/node-factory";

function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
}

/** Skróty klawiszowe edytora. Silnik potrzebny do zoom/fit. */
export function useKeyboardShortcuts(engine: PixiEngine | null): void {
  const ed = useEditor();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target)) return;
      const meta = e.metaKey || e.ctrlKey;
      const selected = ed.selectedNode;

      if (meta && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) ed.redo();
        else ed.undo();
        return;
      }
      if (meta && e.key.toLowerCase() === "y") {
        e.preventDefault();
        ed.redo();
        return;
      }
      if (meta && e.key.toLowerCase() === "d") {
        e.preventDefault();
        if (selected) ed.duplicateNode(duplicate(selected));
        return;
      }
      if ((meta && e.key === "0") || (meta && e.key === "9")) {
        e.preventDefault();
        engine?.fit();
        return;
      }
      if (meta && (e.key === "=" || e.key === "+")) {
        e.preventDefault();
        engine?.zoomBy(1.2);
        return;
      }
      if (meta && e.key === "-") {
        e.preventDefault();
        engine?.zoomBy(1 / 1.2);
        return;
      }

      if (e.key === "Escape") {
        ed.select(null);
        return;
      }

      if (!selected) return;

      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        if (!selected.locked) ed.deleteNode(selected.id);
        return;
      }

      const step = e.shiftKey ? NUDGE_LARGE_MM : NUDGE_MM;
      const nudge = (dx: number, dy: number) => {
        e.preventDefault();
        if (selected.locked) return;
        ed.commitNode(selected.id, {
          cx: selected.cx + dx,
          cy: selected.cy + dy,
        });
      };
      if (e.key === "ArrowLeft") nudge(-step, 0);
      else if (e.key === "ArrowRight") nudge(step, 0);
      else if (e.key === "ArrowUp") nudge(0, -step);
      else if (e.key === "ArrowDown") nudge(0, step);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ed, engine]);
}
