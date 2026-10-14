"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
  DEFAULT_SIDE,
  type PrintSide,
  type Product,
  type ProductAddon,
  type ProductFormat,
  selectedAddons,
} from "@/lib/products";

/**
 * Tłumaczenia danych produktowych z `lib/products.ts` (nazwy, taglines,
 * formaty, stronność). Dane zostają po polsku w pliku źródłowym — tu tylko
 * mapujemy je na klucze z ns `product`, z polskim fallbackiem.
 */
export function useProductI18n() {
  const { t } = useTranslation("product");

  return useMemo(
    () => ({
      t,
      name: (p: Product) => t(`names.${p.slug}`, { defaultValue: p.name }),
      tagline: (p: Product) => t(`taglines.${p.slug}`, { defaultValue: p.tagline }),
      inHeading: (p: Product) => t(`inHeading.${p.slug}`, { defaultValue: p.inHeading }),
      keyword: (slug: string, fallback: string) =>
        t(`keywords.${slug}`, { defaultValue: fallback }),
      formatNoun: (p: Product) =>
        p.formatNoun
          ? t(`formatNouns.${p.slug}`, { defaultValue: p.formatNoun })
          : t("configurator.format"),
      formatLabel: (p: Product, f: ProductFormat) =>
        t(`formats.${p.slug}.${f.id}`, { defaultValue: f.label }),
      sideLabel: (p: Product, sides: PrintSide | undefined): string | null => {
        if (!p.backPrint) return null;
        const side = sides ?? DEFAULT_SIDE;
        return t(`sides.${p.slug}.${side}`, { defaultValue: p.backPrint.labels[side] });
      },
      addonLabel: (a: ProductAddon) => t(`addons.${a.id}.label`, { defaultValue: a.label }),
      addonNote: (a: ProductAddon) =>
        a.note ? t(`addons.${a.id}.note`, { defaultValue: a.note }) : undefined,
      /** Wybrane dodatki pozycji jako jeden tekst, np. „Łamanie w C"; null, gdy brak. */
      addonsLabel: (p: Product, ids: readonly string[] | undefined): string | null => {
        const list = selectedAddons(p, ids);
        if (list.length === 0) return null;
        return list.map((a) => t(`addons.${a.id}.label`, { defaultValue: a.label })).join(", ");
      },
    }),
    [t],
  );
}
