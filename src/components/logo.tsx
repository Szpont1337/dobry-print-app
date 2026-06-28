import { Leaf } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/cn";

export function Logo({
  className = "",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="DobrePrinty, strona główna"
      className={cn(
        "group inline-flex items-center gap-2 rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary/40",
        className,
      )}
    >
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover:-rotate-6 sm:size-9"
      >
        <Leaf strokeWidth={2.4} className="size-5" />
      </span>
      <span
        className={cn(
          "text-lg font-extrabold tracking-tight sm:text-xl",
          onDark ? "text-footer-foreground" : "text-foreground",
        )}
      >
        Dobre<span className="text-primary">Printy</span>
      </span>
    </Link>
  );
}
