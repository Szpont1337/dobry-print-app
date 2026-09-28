"use client";

import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { visibleProducts } from "@/lib/products";
import { Eyebrow } from "@/components/ui";

import { HeroSearch } from "./hero-search";

// Deferred (bundle-dynamic-imports): pulls in gsap, only used in the lg+
// 2-column layout. Keep it out of the initial home bundle / SSR.
const HeroCardSwap = dynamic(() => import("./hero-card-swap").then((m) => m.HeroCardSwap), {
  ssr: false,
});

const POPULAR_SLUGS = ["ulotki", "wizytowki", "plakaty", "naklejki"];

const popular = POPULAR_SLUGS.map((slug) => visibleProducts.find((p) => p.slug === slug)).filter(
  (p): p is (typeof visibleProducts)[number] => Boolean(p),
);

export function Hero() {
  const { t } = useTranslation("home");

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_55%_at_88%_0%,rgba(14,106,87,0.08),transparent_70%)]"
      />
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
          <div className="flex flex-col items-start gap-5">
            <Eyebrow className="font-mono">{t("hero.eyebrow")}</Eyebrow>
            <h1 className="text-balance text-[2.4rem] font-extrabold leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-[4rem]">
              <span className="text-primary">{t("hero.titleAccent")}</span> {t("hero.titleRest")}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("hero.lead")}
            </p>

            {/* Nowość: MCP — pigułka nad wyszukiwarką, link do /mcp. */}
            <Link
              href="/mcp"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-primary/20 bg-card py-1.5 pr-4 pl-1.5 text-sm font-semibold text-foreground shadow-md transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lg sm:py-2 sm:pr-5 sm:text-base before:pointer-events-none before:absolute before:inset-0 before:animate-shimmer before:bg-[linear-gradient(110deg,transparent_35%,rgba(14,106,87,0.12)_50%,transparent_65%)] before:bg-[length:250%_100%]"
            >
              <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground sm:text-xs">
                {t("hero.mcpBadge")}
              </span>
              <span>{t("hero.mcpPill")}</span>
              <ArrowRight
                aria-hidden
                className="size-4 text-primary transition-transform group-hover:translate-x-1"
              />
            </Link>

            <div className="mt-1 w-full">
              <HeroSearch />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("hero.popular")}
              </span>
              {popular.map((product) => (
                <Link
                  key={product.slug}
                  href={`/produkty/${product.slug}`}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {product.name}
                </Link>
              ))}
            </div>
          </div>

          {/* hero card only in the 2-column layout (lg+) */}
          <div className="hidden lg:block">
            <HeroCardSwap />
          </div>
        </div>
      </div>
    </section>
  );
}
