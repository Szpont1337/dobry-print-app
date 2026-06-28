"use client";

import { useState } from "react";

import type { PixiEngine } from "../engine/pixi-engine";
import { useAutosave } from "../hooks/use-autosave";
import { useKeyboardShortcuts } from "../hooks/use-keyboard-shortcuts";
import { EditorProvider } from "../store/editor-store";
import type { FormatSpec } from "../types";
import { autosaveKey, loadDoc } from "../utils/doc";
import { EditorCanvas } from "./editor-canvas";
import { LayersPanel } from "./layers-panel";
import { PropertiesPanel } from "./properties-panel";
import { ToolRail } from "./tool-rail";
import { TopBar } from "./top-bar";

export interface EditorProps {
  product: { slug: string; name: string };
  format: FormatSpec;
  formatId: string;
  quantity: number;
}

export function Editor(props: EditorProps) {
  const [initialDoc] = useState(() =>
    loadDoc(props.format, autosaveKey(props.product.slug, props.formatId)),
  );
  return (
    <EditorProvider initialDoc={initialDoc}>
      <EditorInner {...props} />
    </EditorProvider>
  );
}

function EditorInner({ product, format, formatId, quantity }: EditorProps) {
  const [engine, setEngine] = useState<PixiEngine | null>(null);
  const [zoomPct, setZoomPct] = useState(100);

  useKeyboardShortcuts(engine);
  useAutosave(product.slug, formatId);

  return (
    <div className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-background">
      <TopBar
        product={product}
        format={format}
        formatId={formatId}
        quantity={quantity}
        engine={engine}
        zoomPct={zoomPct}
      />
      <div className="flex min-h-0 flex-1">
        <ToolRail />
        <div className="relative min-w-0 flex-1 bg-muted">
          <EditorCanvas onEngineReady={setEngine} onViewChange={setZoomPct} />
        </div>
        <aside className="flex w-[300px] shrink-0 flex-col border-l border-border bg-card">
          <LayersPanel />
          <div className="min-h-0 flex-1 border-t border-border">
            <PropertiesPanel />
          </div>
        </aside>
      </div>
    </div>
  );
}
