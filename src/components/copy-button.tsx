"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

/** Kopiuje `text` do schowka; przez 2 s pokazuje potwierdzenie. */
export function CopyButton({
  text,
  label,
  copiedLabel,
  variant = "outline",
}: {
  text: string;
  label: string;
  copiedLabel: string;
  variant?: "default" | "outline" | "accent";
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <Button
      type="button"
      variant={variant}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
        } catch {
          // Brak dostępu do schowka (http, stare Safari) — użytkownik skopiuje ręcznie.
        }
      }}
    >
      {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
      {copied ? copiedLabel : label}
    </Button>
  );
}
