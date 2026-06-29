"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { visibleProducts as products, type Product } from "@/lib/products";

import { ProductMockup } from "./product-mockup";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-5"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-4"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

const MAX_RESULTS = 5;

function searchHaystack(p: Product) {
  return [p.name, p.tagline, ...p.formats.map((f) => f.label)].join(" ").toLowerCase();
}

export function HeroSearch() {
  const router = useRouter();
  const listboxId = useId();
  const inputId = useId();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dropdown renderuje się przez portal do <body>, bo sekcja hero ma
  // `overflow-hidden` (clipuje animację CardSwap) — bez portalu ucinałaby też
  // tę listę. Portal wymaga klienta + pozycji zakotwiczenia pod inputem.
  const [mounted, setMounted] = useState(false);
  const [anchorRect, setAnchorRect] = useState<{
    left: number;
    top: number;
    width: number;
  } | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, MAX_RESULTS);
    return products.filter((p) => searchHaystack(p).includes(q)).slice(0, MAX_RESULTS);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      // Portal stawia dropdown poza containerRef — klik w niego też liczy się
      // jako "wewnątrz", inaczej mousedown zamknąłby listę przed wyborem opcji.
      if (containerRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  useEffect(() => setMounted(true), []);

  const updateAnchor = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setAnchorRect({ left: r.left, top: r.bottom, width: r.width });
  }, []);

  // Pozycję liczymy przy otwarciu i utrzymujemy przy scrollu/resize.
  useEffect(() => {
    if (!open) return;
    updateAnchor();
    window.addEventListener("resize", updateAnchor, { passive: true });
    window.addEventListener("scroll", updateAnchor, { passive: true, capture: true });
    return () => {
      window.removeEventListener("resize", updateAnchor);
      window.removeEventListener("scroll", updateAnchor, true);
    };
  }, [open, updateAnchor]);

  const navigateTo = useCallback(
    (slug: string) => {
      setOpen(false);
      router.push(`/produkty/${slug}`);
    },
    [router],
  );

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const target = results[activeIndex] ?? results[0];
    if (target) navigateTo(target.slug);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(results.length - 1, i + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (event.key === "Escape") {
      if (open) {
        event.preventDefault();
        setOpen(false);
      }
    } else if (event.key === "Home") {
      if (open) setActiveIndex(0);
    } else if (event.key === "End") {
      if (open) setActiveIndex(Math.max(0, results.length - 1));
    }
  };

  const showDropdown = open;
  const hasResults = results.length > 0;
  // Listbox (z opcjami) renderuje się tylko gdy lista jest otwarta i ma wyniki.
  // aria-controls / aria-activedescendant mogą wskazywać wyłącznie istniejące
  // elementy — inaczej axe zgłasza nieprawidłową wartość ARIA.
  const listboxVisible = showDropdown && hasResults;
  const trimmedQuery = query.trim();

  return (
    <form role="search" className="relative w-full max-w-3xl" onSubmit={onSubmit}>
      <div ref={containerRef} className="relative">
        <label htmlFor={inputId} className="sr-only">
          Który produkt chcesz wydrukować?
        </label>
        <div className="flex items-center gap-1.5 rounded-xl border border-border bg-card p-1.5 shadow-lg sm:gap-2 sm:p-2">
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls={listboxVisible ? listboxId : undefined}
            aria-autocomplete="list"
            aria-activedescendant={
              listboxVisible ? `${listboxId}-${results[activeIndex]?.slug}` : undefined
            }
            placeholder="Który produkt chcesz wydrukować?"
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/80 focus:outline-none sm:px-4 sm:py-3 sm:text-lg"
          />
          <button
            type="submit"
            disabled={!hasResults}
            aria-label="Pokaż produkt"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary p-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:px-6 sm:py-3 sm:text-base"
          >
            <span className="hidden sm:inline">Pokaż produkt</span>
            <SearchIcon />
          </button>
        </div>

        {mounted &&
          showDropdown &&
          anchorRect &&
          createPortal(
            <div
              ref={dropdownRef}
              style={{
                left: anchorRect.left,
                top: anchorRect.top + 10,
                width: anchorRect.width,
              }}
              className="fixed z-50 overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-2xl"
            >
              <div className="border-b border-border px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                {trimmedQuery ? `Wyniki dla „${trimmedQuery}"` : "Popularne kategorie"}
              </div>

              {hasResults ? (
                <ul id={listboxId} role="listbox" className="py-1">
                  {results.map((product, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <li
                        key={product.slug}
                        id={`${listboxId}-${product.slug}`}
                        role="option"
                        aria-selected={isActive}
                      >
                        <button
                          type="button"
                          onClick={() => navigateTo(product.slug)}
                          onMouseEnter={() => setActiveIndex(index)}
                          className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                            isActive ? "bg-secondary" : "hover:bg-muted"
                          }`}
                        >
                          <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-border bg-background">
                            <ProductMockup variant={product.variant} className="h-10 w-10" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-base font-medium text-foreground">
                              {product.name}
                            </span>
                            <span className="block truncate text-sm text-muted-foreground">
                              {product.tagline}
                            </span>
                          </span>
                          <span
                            aria-hidden
                            className={`grid size-8 shrink-0 place-items-center rounded-full text-primary transition-colors ${
                              isActive ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <ArrowIcon />
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                  Brak wyników dla „{trimmedQuery}”. Spróbuj „ulotki”, „wizytówki” albo „plakaty”.
                </div>
              )}

              <div className="flex items-center justify-between gap-3 border-t border-border bg-muted/50 px-4 py-2 text-[11px] text-muted-foreground">
                <span>
                  <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono">
                    ↑
                  </kbd>{" "}
                  <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono">
                    ↓
                  </kbd>{" "}
                  nawigacja
                </span>
                <span>
                  <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono">
                    Enter
                  </kbd>{" "}
                  otwórz
                </span>
                <span>
                  <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono">
                    Esc
                  </kbd>{" "}
                  zamknij
                </span>
              </div>
            </div>,
            document.body,
          )}
      </div>
    </form>
  );
}
