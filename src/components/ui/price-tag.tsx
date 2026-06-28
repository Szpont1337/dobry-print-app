import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type PriceTagProps = {
  /** Pre-formatted amount, e.g. "129,00". */
  amount: ReactNode;
  suffix?: string;
  size?: "md" | "lg" | "xl";
  className?: string;
  onDark?: boolean;
};

const SIZES = {
  md: "text-xl",
  lg: "text-3xl",
  xl: "text-4xl sm:text-5xl",
};

/** Emphasised price display (amount + currency suffix). */
export function PriceTag({
  amount,
  suffix = "zł",
  size = "lg",
  className,
  onDark = false,
}: PriceTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1 font-extrabold tracking-tight tabular-nums",
        SIZES[size],
        className,
      )}
    >
      {amount}
      <span
        className={cn(
          "text-[0.5em] font-bold",
          onDark ? "text-footer-foreground/70" : "text-muted-foreground",
        )}
      >
        {suffix}
      </span>
    </span>
  );
}
