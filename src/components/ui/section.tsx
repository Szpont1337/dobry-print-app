import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

/** Centered max-width content container. */
export function Container({ className, ...rest }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)} {...rest} />;
}

export type SectionProps = HTMLAttributes<HTMLElement> & {
  /** Use the alternate (slightly tinted) background. */
  alt?: boolean;
  /** Vertical padding rhythm. */
  spacing?: "sm" | "md" | "lg";
  /** Wrap children in a `Container`. Set false for full-bleed sections. */
  contain?: boolean;
  children: ReactNode;
};

const SPACING = {
  sm: "py-8 sm:py-13",
  md: "py-13 sm:py-21",
  lg: "py-21 sm:py-34",
};

/** Page section with vertical rhythm + optional alt background + container. */
export function Section({
  alt = false,
  spacing = "md",
  contain = true,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={cn(SPACING[spacing], alt && "bg-background-alt", className)} {...rest}>
      {contain ? <Container>{children}</Container> : children}
    </section>
  );
}
