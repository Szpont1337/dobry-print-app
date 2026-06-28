import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type BadgeTone =
  | "neutral"
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info";

const TONES: Record<BadgeTone, string> = {
  neutral: "bg-secondary text-secondary-foreground",
  primary: "bg-primary/12 text-primary",
  accent: "bg-accent/20 text-accent-foreground",
  success: "bg-primary/12 text-primary",
  warning: "bg-accent/20 text-accent-foreground",
  danger: "bg-destructive/12 text-destructive",
  info: "bg-chart-4/15 text-chart-4",
};

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

/** Small pill label / status chip. */
export function Badge({ tone = "neutral", className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-tight",
        TONES[tone],
        className,
      )}
      {...rest}
    />
  );
}
