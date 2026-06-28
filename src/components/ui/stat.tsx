import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type StatProps = {
  value: ReactNode;
  label: ReactNode;
  className?: string;
  /** Render light text for use on dark surfaces. */
  onDark?: boolean;
};

/** Big number + small label (hero / landing stats). */
export function Stat({ value, label, className, onDark = false }: StatProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <span className="text-2xl font-extrabold tracking-tight sm:text-3xl">{value}</span>
      <span
        className={cn(
          "text-xs font-medium sm:text-sm",
          onDark ? "text-footer-foreground/70" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </div>
  );
}
