"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { visibleProducts } from "@/lib/products";
import { Eyebrow } from "@/components/ui";

import { HeroSearch } from "./hero-search";

// Deferred (bundle-dynamic-imports): pulls in gsap, only used in the lg+
// 2-column layout. Keep it out of the initial home bundle / SSR.
const HeroCardSwap = dynamic(
  () => import("./hero-card-swap").then((m) => m.HeroCardSwap),
  { ssr: false },
);

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
              <span className="text-primary">{t("hero.titleAccent")}</span>{" "}
              {t("hero.titleRest")}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("hero.lead")}
            </p>

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
