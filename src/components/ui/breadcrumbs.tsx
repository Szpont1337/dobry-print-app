import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

import { cn } from "@/lib/cn";

export type Crumb = { label: string; href?: string };

export type BreadcrumbsProps = {
  items: Crumb[];
  className?: string;
};

/** Breadcrumb trail. Last item is rendered as current (no link). */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground", className)}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <Fragment key={`${item.label}-${i}`}>
            {item.href && !isLast ? (
              <Link href={item.href} className="transition-colors hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(isLast && "font-semibold text-foreground")}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
            {!isLast ? <ChevronRight aria-hidden className="size-3.5 text-border" /> : null}
          </Fragment>
        );
      })}
    </nav>
  );
}
