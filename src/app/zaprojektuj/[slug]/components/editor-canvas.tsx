"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { PixiEngine } from "../engine/pixi-engine";
import { useEditor } from "../store/editor-store";

export function EditorCanvas({
  onEngineReady,
  onViewChange,
}: {
  onEngineReady: (engine: PixiEngine | null) => void;
  onViewChange: (zoomPct: number) => void;
}) {
  const ed = useEditor();
  const edRef = useRef(ed);
  edRef.current = ed;

  const hostRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<PixiEngine | null>(null);
  const [ready, setReady] = useState(false);

  // Inicjalizacja silnika — raz. PixiJS ładowany dynamicznie (SSR-safe).
  useEffect(() => {
    let disposed = false;
    let local: PixiEngine | null = null;
    void (async () => {
      const mod = await import("../engine/pixi-engine");
      if (disposed || !hostRef.current) return;
      const engine = new mod.PixiEngine({
        onSelect: (id) => edRef.current.select(id),
        onBeginInteraction: () => edRef.current.beginInteraction(),
        onEndInteraction: () => edRef.current.endInteraction(),
        onSetNode: (id, patch) => edRef.current.setNode(id, patch),
        onMeasureText: (id, h) => edRef.current.setNode(id, { h }),
        onViewChange,
      });
      local = engine;
      await engine.init(hostRef.current, edRef.current.doc);
      if (disposed) {
        engine.destroy();
        return;
      }
      engineRef.current = engine;
      // Zaznaczenie zrobione zanim silnik się załadował (np. klik w panelu
      // warstw) — domykamy je teraz, by ramka transformacji się pokazała.
      engine.setSelection(edRef.current.selectedId);
      setReady(true);
      onEngineReady(engine);
    })().catch((err) => {
      console.error("[editor] init", err);
    });
    return () => {
      disposed = true;
      local?.destroy();
      engineRef.current = null;
      onEngineReady(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Synchronizacja sceny przy zmianie dokumentu.
  useEffect(() => {
    void engineRef.current?.syncScene(ed.doc);
  }, [ed.doc]);

  // Synchronizacja zaznaczenia (np. z panelu warstw).
  useEffect(() => {
    engineRef.current?.setSelection(ed.selectedId);
  }, [ed.selectedId]);

  // Reakcja na zmianę rozmiaru kontenera.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const ro = new ResizeObserver(() => {
      engineRef.current?.resize(host.clientWidth, host.clientHeight);
    });
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0 touch-none">
      {!ready && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-muted-foreground">
          <span className="inline-flex items-center gap-2 text-sm">
            <Loader2 aria-hidden className="size-5 animate-spin text-primary" />
            Wczytywanie edytora…
          </span>
        </div>
      )}
    </div>
  );
}
