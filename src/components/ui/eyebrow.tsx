import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type EyebrowProps = HTMLAttributes<HTMLParagraphElement>;

/** Small uppercase label above a heading. */
export function Eyebrow({ className, ...rest }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary",
        className,
      )}
      {...rest}
    />
  );
}
