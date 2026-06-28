"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { visibleProducts as products, type Product } from "@/lib/products";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";
import { SectionHeader } from "@/components/ui";

import { FadeIn } from "./fade-in";
import { FilePrepBadge } from "./file-prep-badge";
import { ProductMockup } from "./product-mockup";

function fromPrice(product: Product): number {
  const tierPrices = product.priceTiers?.map((tier) => tier.unitPrice) ?? [];
  const formatPrices = product.formats.map((format) => format.unitPrice);
  return Math.min(...formatPrices, ...tierPrices);
}

function formatPLN(value: number): string {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function ProductsGrid() {
  return (
    <section id="produkty" className="scroll-mt-24 bg-background py-13 sm:py-21">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <FadeIn>
          <SectionHeader
            index="01"
            eyebrow="Katalog produktów"
            title="Wybierz produkt"
            description="Każdy produkt konfigurujesz i wyceniasz na żywo — od jednej sztuki, z ceną finalną od ręki."
          />
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/8 px-3 py-1.5 text-sm font-semibold text-primary">
              <span aria-hidden>🚚</span>
              Darmowa wysyłka od {FREE_SHIPPING_THRESHOLD} zł
            </span>
            <FilePrepBadge />
          </div>
        </FadeIn>

        {/* Catalogue grid: continuous ruled cells, no floating cards */}
        <ul className="mt-8 grid grid-cols-2 border-l border-t border-border sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.slug} className="border-r border-b border-border">
              <Link
                href={`/produkty/${product.slug}`}
                className="group flex h-full flex-col p-4 transition-colors hover:bg-secondary/50 sm:p-5"
              >
                <div className="grid aspect-[16/11] w-full place-items-center">
                  <ProductMockup variant={product.variant} className="h-full w-full" />
                </div>
                <div className="mt-4 flex items-end justify-between gap-2 border-t border-border pt-3">
                  <div className="min-w-0">
                    <span className="block truncate text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {product.name}
                    </span>
                    <span className="font-mono text-xs font-medium text-muted-foreground">
                      od {formatPLN(fromPrice(product))} zł
                    </span>
                  </div>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
