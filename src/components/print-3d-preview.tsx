"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import type { PrintShape } from "@/components/print-3d-scene";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// three.js ładowany dopiero po wejściu na stronę produktu (client-only,
// ssr:false) — poza startowym bundlem, jak przy podglądzie koszulki/torby.
const Print3DScene = dynamic(() => import("./print-3d-scene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
      Ładowanie podglądu 3D…
    </div>
  ),
});

export function Print3DPreview({
  shape,
  aspect,
}: {
  shape: PrintShape;
  aspect: number;
}) {
  const [url, setUrl] = useState<string | null>(null);
  const [scale, setScale] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);

  // Zwolnij object URL przy zmianie i odmontowaniu.
  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  function handleFile(file: File | undefined) {
    if (!file || !file.type.startsWith("image/")) return;
    setUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setScale(100);
  }

  function reset() {
    setUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <Card padding="md">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-foreground">Podgląd 3D</h3>
        <Badge tone="neutral">obróć myszką</Badge>
      </div>

      <div
        className="mx-auto mt-4 aspect-square w-full max-w-[300px] cursor-grab overflow-hidden rounded-xl bg-background active:cursor-grabbing"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files?.[0]);
        }}
      >
        <Print3DScene shape={shape} aspect={aspect} imageUrl={url} scale={scale} />
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <div className="mt-5 space-y-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => inputRef.current?.click()}
        >
          {url ? "Zmień grafikę" : "Wgraj grafikę"}
        </Button>

        {url && (
          <div className="flex items-center gap-3">
            <label
              htmlFor="print3d-scale"
              className="shrink-0 text-xs font-medium text-muted-foreground"
            >
              Rozmiar
            </label>
            <input
              id="print3d-scale"
              type="range"
              min={40}
              max={100}
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="h-1.5 flex-1 cursor-pointer accent-primary"
            />
            <button
              type="button"
              onClick={reset}
              className="shrink-0 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Usuń
            </button>
          </div>
        )}

        <p className="text-xs leading-relaxed text-muted-foreground">
          Obróć produkt przeciągając myszką. To tylko podgląd — plik produkcyjny
          w pełnej rozdzielczości wgrasz w kroku zamówienia.
        </p>
      </div>
    </Card>
  );
}
