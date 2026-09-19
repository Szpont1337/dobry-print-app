"use client";

import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * Pill z atutem „przygotowanie pliku do druku w cenie". Styl spójny z badge'em
 * „Darmowa wysyłka" (products-grid). Działa w komponentach server i client.
 */
export function FilePrepBadge({ className = "" }: { className?: string }) {
  const { t } = useTranslation("product");

  return (
    <Badge variant="soft" className={cn("gap-2 px-4 py-1.5 text-sm", className)}>
      <CheckCircle2 aria-hidden className="size-4 shrink-0" strokeWidth={2.5} />
      {t("filePrep")}
    </Badge>
  );
}
