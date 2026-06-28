"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

import { PALETTE } from "../constant/editor";

const HEX_RE = /^#([0-9a-fA-F]{6})$/;

export function ColorInput({
  label,
  value,
  onChange,
  onStart,
  onEnd,
}: {
  label?: string;
  value: string;
  /** zmiana koloru (na żywo, bez wpisu historii) */
  onChange: (hex: string) => void;
  /** otwarcie transakcji historii (jeden krok na cały wybór) */
  onStart?: () => void;
  onEnd?: () => void;
}) {
  const [hex, setHex] = useState(value);
  useEffect(() => setHex(value), [value]);

  const pick = (next: string) => {
    onStart?.();
    onChange(next);
    onEnd?.();
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      )}
      <div className="flex flex-wrap gap-1.5">
        {PALETTE.map((c) => (
          <button
            key={c}
            type="button"
            aria-label={`Kolor ${c}`}
            onClick={() => pick(c)}
            className={cn(
              "size-6 rounded-lg border transition-transform hover:scale-110",
              value.toLowerCase() === c.toLowerCase()
                ? "border-primary ring-2 ring-primary/30"
                : "border-border",
            )}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <label
          aria-label="Wybierz kolor"
          className="relative size-8 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-input"
        >
          <span aria-hidden className="absolute inset-0" style={{ backgroundColor: value }} />
          <input
            type="color"
            aria-label="Wybierz kolor"
            value={HEX_RE.test(value) ? value : "#000000"}
            onFocus={() => onStart?.()}
            onBlur={() => onEnd?.()}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
        </label>
        <input
          type="text"
          value={hex}
          spellCheck={false}
          onFocus={() => onStart?.()}
          onBlur={() => {
            onEnd?.();
            // niezatwierdzony/niepoprawny wpis wraca do realnego koloru
            setHex(value);
          }}
          onChange={(e) => {
            const next = e.target.value;
            setHex(next);
            const normalized = next.startsWith("#") ? next : `#${next}`;
            if (HEX_RE.test(normalized)) onChange(normalized);
          }}
          className="h-8 w-full min-w-0 rounded-lg border border-input bg-card px-2 font-mono text-xs uppercase text-foreground outline-none focus:border-primary"
        />
      </div>
    </div>
  );
}
