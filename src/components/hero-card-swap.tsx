"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { visibleProducts, type Product } from "@/lib/products";

import CardSwap, { Card } from "./card-swap";
import { ProductMockup } from "./product-mockup";

const SWAP_SLUGS = ["wizytowki", "ulotki", "plakaty", "naklejki"];

const swapProducts = SWAP_SLUGS.map((slug) =>
  visibleProducts.find((p) => p.slug === slug),
).filter((p): p is Product => Boolean(p));

function fromPrice(product: Product): number {
  const tierPrices = product.priceTiers?.map((tier) => tier.unitPrice) ?? [];
  const formatPrices = product.formats.map((format) => format.unitPrice);
  return Math.min(...formatPrices, ...tierPrices);
}

function formatPLN(value: number): string {
  return value.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function HeroProductCard({ product }: { product: Product }) {
  const { t } = useTranslation("home");
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-gradient-to-br from-hero-card-from to-hero-card-to p-5 text-footer-foreground shadow-xl">
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="size-2.5 rounded-full bg-white/25" />
        </div>
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-footer-foreground/60">
          {t("hero.cardLabel")}
        </span>
      </div>

      {/* preview panel */}
      <div className="relative mt-4 grid flex-1 place-items-center overflow-hidden rounded-xl bg-white/95 p-6">
        <ProductMockup variant={product.variant} className="h-full w-full max-w-[240px]" />
        <span className="absolute left-3 top-3 inline-flex items-center rounded-md bg-accent px-2.5 py-1 font-mono text-[11px] font-extrabold uppercase tracking-wide text-accent-foreground">
          New
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <div className="min-w-0">
          <p className="truncate font-mono text-[11px] uppercase tracking-wider text-footer-foreground/60">
            {product.name}
          </p>
          <p className="text-lg font-extrabold tracking-tight">
            od {formatPLN(fromPrice(product))} zł / szt.
          </p>
        </div>
        <Link
          href={`/produkty/${product.slug}`}
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg bg-accent px-4 text-sm font-bold text-accent-foreground transition-[filter] hover:brightness-[1.04]"
        >
          {t("hero.cardCta")}
          <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </div>
    </div>
  );
}

export function HeroCardSwap() {
  return (
    <div className="relative mx-auto h-[500px] w-full max-w-[460px] sm:h-[560px] sm:max-w-[500px]">
      <CardSwap
        width={340}
        height={400}
        cardDistance={40}
        verticalDistance={46}
        delay={4000}
        skewAmount={5}
        rotationY={26}
        pauseOnHover
        easing="elastic"
      >
        {swapProducts.map((product) => (
          <Card key={product.slug}>
            <HeroProductCard product={product} />
          </Card>
        ))}
      </CardSwap>
    </div>
  );
}
