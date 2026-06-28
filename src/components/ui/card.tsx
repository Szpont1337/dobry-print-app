import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type CardPadding = "none" | "sm" | "md" | "lg";

const PADDING: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-5 sm:p-8",
  lg: "p-8 sm:p-13",
};

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  /** Dark green gradient surface (hero / CTA cards). */
  dark?: boolean;
  padding?: CardPadding;
};

/** Rounded surface card. Light by default, dark-green gradient when `dark`. */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { dark = false, padding = "md", className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl",
        dark
          ? "border border-white/5 bg-gradient-to-br from-hero-card-from to-hero-card-to text-footer-foreground shadow-lg"
          : "border border-border bg-card text-card-foreground shadow-sm",
        PADDING[padding],
        className,
      )}
      {...rest}
    />
  );
});
