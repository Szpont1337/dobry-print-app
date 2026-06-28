import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui";
import { cn } from "@/lib/cn";

/** Powtarzalny przekaz konwersyjny — jedno źródło prawdy dla wszystkich powierzchni. */
export const FILE_PREP_MESSAGE = "Przygotowanie pliku do druku w cenie";

/**
 * Pill z atutem „przygotowanie pliku do druku w cenie". Styl spójny z badge'em
 * „Darmowa wysyłka" (products-grid). Działa w komponentach server i client.
 */
export function FilePrepBadge({ className = "" }: { className?: string }) {
  return (
    <Badge tone="primary" className={cn("gap-2 px-4 py-1.5 text-sm", className)}>
      <CheckCircle2 aria-hidden className="size-4 shrink-0" strokeWidth={2.5} />
      {FILE_PREP_MESSAGE}
    </Badge>
  );
}
