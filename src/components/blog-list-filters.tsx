"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Badge, Button, Container } from "@/components/ui";
import {
  CATEGORY_LABELS,
  type ArticleCategory,
  type ArticleMeta,
  type ArticleStatus,
} from "@/lib/blog-types";

type BlogListItem = ArticleMeta & {
  readTime?: number;
};

export function BlogListFilters({ items }: { items: BlogListItem[] }) {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ArticleStatus | "all">("opublikowany");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const set = new Set<ArticleCategory>();
    items.forEach((i) => set.add(i.category));
    return Array.from(set);
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !item.title.toLowerCase().includes(q) &&
          !item.excerpt.toLowerCase().includes(q) &&
          !item.tags.some((t) => t.toLowerCase().includes(q))
        ) {
          return false;
        }
      }
      return true;
    });
  }, [items, activeCategory, statusFilter, query]);

  return (
    <Container>
      <div className="grid gap-5 rounded-lg border border-border bg-card p-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <label className="relative block">
          <span className="sr-only">Szukaj artykułu</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Szukaj po tytule, treści lub tagu..."
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 sm:text-base"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {(["opublikowany", "all"] as const).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "primary" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              {status === "opublikowany" ? "Opublikowane" : "Wszystkie"}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button
          variant={activeCategory === "all" ? "primary" : "outline"}
          size="sm"
          onClick={() => setActiveCategory("all")}
        >
          Wszystkie kategorie
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "primary" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat)}
          >
            {CATEGORY_LABELS[cat]}
          </Button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Wyników: <strong className="text-foreground">{filtered.length}</strong> z{" "}
        {items.length}
      </p>

      <ul className="mt-8 grid border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <li key={item.slug} className="border-r border-b border-border">
            {item.status === "opublikowany" ? (
              <Link
                href={`/blog/${item.slug}`}
                className="group flex h-full flex-col p-6 transition-colors hover:bg-secondary/50"
              >
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                  <span>{CATEGORY_LABELS[item.category]}</span>
                  {item.readTime ? (
                    <>
                      <span aria-hidden>·</span>
                      <span>{item.readTime} min czytania</span>
                    </>
                  ) : null}
                </div>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.excerpt}
                </p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-5">
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.publishedAt}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Czytaj <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ) : (
              <div className="flex h-full cursor-not-allowed flex-col bg-background-alt p-6 opacity-75">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <span>{CATEGORY_LABELS[item.category]}</span>
                  <span aria-hidden>·</span>
                  <Badge tone="warning">Wkrótce</Badge>
                </div>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.excerpt}
                </p>
                <span className="mt-auto pt-5 font-mono text-xs text-muted-foreground">
                  Planowana publikacja: {item.publishedAt}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          Brak wyników dla zadanych filtrów.
        </p>
      ) : null}
    </Container>
  );
}
