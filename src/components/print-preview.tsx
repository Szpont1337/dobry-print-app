"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

// three.js ładowany dopiero po wejściu w tryb 3D (client-only, poza bundlem startowym).
const loading3D = () => (
  <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
    Ładowanie podglądu 3D…
  </div>
);
const Shirt3DPreview = dynamic(() => import("./shirt-3d-preview"), {
  ssr: false,
  loading: loading3D,
});
const Bag3DPreview = dynamic(() => import("./bag-3d-preview"), {
  ssr: false,
  loading: loading3D,
});

type Surface = "tshirt" | "bag" | "tote";

type PrintArea = { x: number; y: number; width: number; height: number };

const SURFACES: Record<
  Surface,
  { viewBox: string; aspect: string; label: string; svg: React.ReactNode }
> = {
  tshirt: {
    viewBox: "0 0 200 200",
    aspect: "200 / 200",
    label: "biała koszulka",
    svg: (
      <>
        <path
          d="M86,40 L66,46 L40,64 L50,86 L70,76 L70,172 L130,172 L130,76 L150,86 L160,64 L134,46 L114,40 C108,58 92,58 86,40 Z"
          fill="white"
          stroke="var(--color-muted-foreground)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M86,40 C92,58 108,58 114,40"
          fill="none"
          stroke="var(--color-muted-foreground)"
          strokeWidth="2"
        />
      </>
    ),
  },
  bag: {
    viewBox: "0 0 200 220",
    aspect: "200 / 220",
    label: "papierowa torba",
    svg: (
      <>
        <path
          d="M76,56 C76,28 124,28 124,56"
          fill="none"
          stroke="var(--color-muted-foreground)"
          strokeWidth="2.4"
        />
        <rect
          x="44"
          y="56"
          width="112"
          height="150"
          rx="2"
          fill="white"
          stroke="var(--color-muted-foreground)"
          strokeWidth="2"
        />
        <line
          x1="44"
          y1="70"
          x2="156"
          y2="70"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.6"
        />
        <line
          x1="140"
          y1="70"
          x2="140"
          y2="206"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.4"
          opacity="0.5"
        />
      </>
    ),
  },
  tote: {
    viewBox: "0 0 200 220",
    aspect: "200 / 220",
    label: "płócienna torba",
    svg: (
      <>
        <path
          d="M78,58 C72,16 100,16 96,58"
          fill="none"
          stroke="var(--color-muted-foreground)"
          strokeWidth="2.4"
        />
        <path
          d="M104,58 C100,16 128,16 122,58"
          fill="none"
          stroke="var(--color-muted-foreground)"
          strokeWidth="2.4"
        />
        <path
          d="M50,58 L150,58 L144,200 L56,200 Z"
          fill="white"
          stroke="var(--color-muted-foreground)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </>
    ),
  },
};

export function PrintPreview({
  surface,
  printArea,
}: {
  surface: Surface;
  printArea: PrintArea;
}) {
  const [url, setUrl] = useState<string | null>(null);
  const [scale, setScale] = useState(100);
  const [mode, setMode] = useState<"2d" | "3d">("2d");
  const inputRef = useRef<HTMLInputElement>(null);

  // Podgląd 3D: koszulka z modelu .glb, torby budowane proceduralnie.
  const has3D = true;

  // Revoke the object URL whenever it changes or the component unmounts.
  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  const config = SURFACES[surface];

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
        <h3 className="text-sm font-medium text-foreground">Podgląd nadruku</h3>
        {has3D ? (
          <div className="inline-flex rounded-lg border border-border bg-background-alt p-1 text-xs font-medium">
            {(["2d", "3d"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={cn(
                  "rounded-md px-3 py-1 transition-colors",
                  mode === m
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {m === "2d" ? "2D" : "3D"}
              </button>
            ))}
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">{config.label}</span>
        )}
      </div>

      {mode === "3d" && has3D ? (
        <div className="mx-auto mt-4 aspect-square w-full max-w-[280px] cursor-grab overflow-hidden rounded-xl bg-background active:cursor-grabbing">
          {surface === "tshirt" ? (
            <Shirt3DPreview imageUrl={url} scale={scale} />
          ) : (
            <Bag3DPreview kind={surface} imageUrl={url} scale={scale} />
          )}
        </div>
      ) : (
      <div
        className="relative mx-auto mt-4 w-full max-w-[280px]"
        style={{ aspectRatio: config.aspect }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files?.[0]);
        }}
      >
        <svg
          viewBox={config.viewBox}
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {config.svg}
        </svg>

        <div
          className="absolute overflow-hidden"
          style={{
            left: `${printArea.x}%`,
            top: `${printArea.y}%`,
            width: `${printArea.width}%`,
            height: `${printArea.height}%`,
          }}
        >
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              alt="Podgląd Twojego nadruku"
              className="h-full w-full object-contain"
              style={{ transform: `scale(${scale / 100})` }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-sm border border-dashed border-primary/50 bg-primary/5 p-1 text-center">
              <span className="text-[10px] font-medium leading-tight text-primary/80 sm:text-xs">
                Twój nadruk
              </span>
            </div>
          )}
        </div>
      </div>
      )}

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
              htmlFor="print-scale"
              className="shrink-0 text-xs font-medium text-muted-foreground"
            >
              Rozmiar
            </label>
            <input
              id="print-scale"
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
          {mode === "3d" && has3D
            ? "Obróć produkt przeciągając myszką. To tylko podgląd — plik produkcyjny wgrasz w kroku zamówienia."
            : "To tylko podgląd poglądowy. Plik produkcyjny w pełnej rozdzielczości wgrasz w kroku zamówienia."}
        </p>
      </div>
    </Card>
  );
}
