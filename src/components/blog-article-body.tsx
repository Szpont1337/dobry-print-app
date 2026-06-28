import type { ReactNode } from "react";
import Link from "next/link";

import { Button } from "@/components/ui";
import type { ArticleSection } from "@/lib/blog-types";

const LINK_CLASS =
  "font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary/80";

/**
 * Renderuje tekst z inline-linkami w składni markdown: `[etykieta](/url)`.
 * Linki wewnętrzne (zaczynające się od „/") używają next/link, zewnętrzne
 * (http…) dostają target=_blank + rel. Reszta tekstu zostaje bez zmian.
 */
function renderRichText(text: string): ReactNode {
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, label, href] = m;
    if (href.startsWith("/")) {
      parts.push(
        <Link key={key++} href={href} className={LINK_CLASS}>
          {label}
        </Link>,
      );
    } else {
      parts.push(
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          {label}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 0 ? text : parts;
}

function Callout({
  variant = "info",
  text,
}: {
  variant?: "info" | "warn" | "tip";
  text: string;
}) {
  const styles = {
    info: "border-primary/30 bg-primary/5 text-foreground",
    warn: "border-accent/40 bg-accent/15 text-foreground",
    tip: "border-primary/30 bg-secondary text-foreground",
  };
  const labels = { info: "💡 Wskazówka", warn: "⚠️ Uwaga", tip: "✓ Tip" };
  return (
    <aside
      className={`my-8 rounded-lg border-l-4 px-5 py-4 ${styles[variant]}`}
    >
      <p className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
        {labels[variant]}
      </p>
      <p className="mt-2 text-base leading-relaxed">{renderRichText(text)}</p>
    </aside>
  );
}

export function BlogArticleBody({
  sections,
}: {
  sections: ArticleSection[];
}) {
  return (
    <article className="prose prose-lg max-w-none text-foreground">
      {sections.map((section, idx) => {
        if (section.type === "p") {
          return (
            <p
              key={idx}
              className="my-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {renderRichText(section.text)}
            </p>
          );
        }
        if (section.type === "h2") {
          return (
            <h2
              key={idx}
              id={section.id}
              className="mt-12 mb-4 scroll-mt-24 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl"
            >
              {section.text}
            </h2>
          );
        }
        if (section.type === "h3") {
          return (
            <h3
              key={idx}
              id={section.id}
              className="mt-8 mb-3 scroll-mt-24 font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            >
              {section.text}
            </h3>
          );
        }
        if (section.type === "list") {
          const Tag = section.ordered ? "ol" : "ul";
          return (
            <Tag
              key={idx}
              className={`my-6 space-y-2 pl-6 text-base leading-relaxed text-muted-foreground sm:text-lg ${
                section.ordered ? "list-decimal" : "list-disc"
              }`}
            >
              {section.items.map((item, i) => (
                <li key={i}>{renderRichText(item)}</li>
              ))}
            </Tag>
          );
        }
        if (section.type === "table") {
          return (
            <figure key={idx} className="my-8">
              <div className="overflow-x-auto rounded-lg border border-border bg-card">
                <table className="w-full text-left text-sm sm:text-base">
                  <thead className="bg-background-alt text-foreground">
                    <tr>
                      {section.headers.map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 font-bold sm:px-5 sm:py-4"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row, r) => (
                      <tr key={r} className="border-t border-border">
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className="px-4 py-3 text-muted-foreground sm:px-5 sm:py-4"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {section.caption ? (
                <figcaption className="mt-2 text-center text-xs text-muted-foreground sm:text-sm">
                  {section.caption}
                </figcaption>
              ) : null}
            </figure>
          );
        }
        if (section.type === "callout") {
          return (
            <Callout key={idx} variant={section.variant} text={section.text} />
          );
        }
        if (section.type === "faq") {
          return (
            <div key={idx} className="my-10">
              <h2
                id="faq"
                className="mt-12 mb-4 scroll-mt-24 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl"
              >
                Najczęściej zadawane pytania
              </h2>
              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <details className="group rounded-2xl border border-border bg-card shadow-sm transition-shadow open:shadow-md">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
                        <span>{item.q}</span>
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-card text-primary transition-colors group-open:border-primary group-open:bg-primary group-open:text-primary-foreground">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                            className="size-4 transition-transform duration-200 group-open:rotate-45"
                          >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </span>
                      </summary>
                      <div className="px-5 pb-5 text-base leading-relaxed text-muted-foreground">
                        {item.a}
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        if (section.type === "cta") {
          return (
            <aside
              key={idx}
              className="my-10 rounded-2xl border border-border bg-secondary p-8 text-center"
            >
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                {section.heading}
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-secondary-foreground/80 sm:text-lg">
                {section.body}
              </p>
              <Button
                href={section.href}
                variant="primary"
                size="lg"
                className="mt-6"
              >
                {section.label}
              </Button>
            </aside>
          );
        }
        return null;
      })}
    </article>
  );
}
