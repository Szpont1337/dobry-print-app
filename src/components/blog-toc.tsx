import { Eyebrow } from "@/components/ui";
import type { TocEntry } from "@/lib/blog-utils";

export function BlogToc({ toc }: { toc: TocEntry[] }) {
  if (toc.length === 0) return null;

  return (
    <nav
      aria-label="Spis treści"
      className="rounded-lg border border-border bg-card p-5"
    >
      <Eyebrow className="font-mono">Spis treści</Eyebrow>
      <ol className="mt-4 space-y-2 text-sm">
        {toc.map((entry, idx) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className="block font-medium text-foreground transition-colors hover:text-primary"
            >
              <span className="font-mono text-muted-foreground">{idx + 1}.</span>{" "}
              {entry.text}
            </a>
            {entry.children && entry.children.length > 0 ? (
              <ol className="mt-1 ml-4 space-y-1 text-xs">
                {entry.children.map((child) => (
                  <li key={child.id}>
                    <a
                      href={`#${child.id}`}
                      className="block text-muted-foreground transition-colors hover:text-primary"
                    >
                      ↳ {child.text}
                    </a>
                  </li>
                ))}
              </ol>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
