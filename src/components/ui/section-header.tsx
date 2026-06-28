import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type SectionHeaderProps = {
  /** Two-digit catalog index, e.g. "01". */
  index?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Right-aligned slot (e.g. a link or action). */
  aside?: ReactNode;
  className?: string;
};

/**
 * Editorial / catalog-style section header: a strong top rule, a monospace
 * index + label, then a big display title. Gives pages a structured,
 * print-catalogue layout rather than floating-card SaaS sections.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  aside,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(className)}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          {(index || eyebrow) && (
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {index ? <span className="text-primary">{index}</span> : null}
              {index && eyebrow ? <span aria-hidden>/</span> : null}
              {eyebrow}
            </p>
          )}
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-base text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
    </div>
  );
}
