"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { visibleProducts } from "@/lib/products";
import { Eyebrow } from "@/components/ui";

import { HeroCardSwap } from "./hero-card-swap";
import { HeroSearch } from "./hero-search";

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
            <h1 className="text-[2.4rem] font-extrabold leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-[4rem]">
              {t("hero.title")}
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

            <dl className="mt-3 grid w-full max-w-md grid-cols-3 divide-x divide-border border border-border">
              {[
                { v: "24 h", l: t("hero.stat1") },
                { v: "12 000+", l: t("hero.stat2") },
                { v: "4,9/5", l: t("hero.stat3") },
              ].map((s) => (
                <div key={s.v} className="px-3 py-3 sm:px-4">
                  <dt className="whitespace-nowrap text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                    {s.v}
                  </dt>
                  <dd className="mt-0.5 font-mono text-[10px] uppercase leading-tight tracking-wide text-muted-foreground sm:text-[11px]">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
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
