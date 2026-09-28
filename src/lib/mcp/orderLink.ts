// Link do zamówienia z gotową konfiguracją — asystent AI ustawia produkt,
// format, nakład i stronność, klient klika i ląduje w koszyku (strona
// /zamowienie/<slug> czyta te parametry). utm_source oznacza ruch z AI w
// atrybucji (traffic-source.ts rozpoznaje „chatgpt", „claude"…).

import type { BrandKey } from "@/lib/brands";
import { clampQuantity } from "@/lib/pricing";
import { DEFAULT_SIDE, type PrintSide, type Product } from "@/lib/products";

import { formatForProduct } from "./spec";

export const BRAND_ORIGIN: Record<BrandKey, string> = {
  drukalo: "https://drukalo.pl",
  dobreprinty: "https://www.dobreprinty.pl",
};

export type OrderLinkInput = {
  brand?: BrandKey;
  product: Product;
  formatId?: string;
  quantity?: number;
  sides?: PrintSide;
  /** kto wysyła klienta: chatgpt | claude | … */
  source?: string;
};

export type OrderLinkResult = {
  url: string;
  productUrl: string;
  brand: BrandKey;
  /** konfiguracja po walidacji — to, co faktycznie trafi do koszyka */
  resolved: { formatId: string; quantity: number; sides?: PrintSide };
  /** co zmieniliśmy względem żądania (np. podniesiony nakład) */
  adjustments: string[];
};

const SOURCE_RE = /^[a-z0-9_-]{1,32}$/i;

export function buildOrderLink(input: OrderLinkInput): OrderLinkResult {
  const { product } = input;
  const brand = input.brand ?? "dobreprinty";
  const origin = BRAND_ORIGIN[brand];
  const adjustments: string[] = [];

  const format = formatForProduct(product, input.formatId);
  if (input.formatId && format.id !== input.formatId) {
    adjustments.push(`Nieznany format „${input.formatId}" — użyto domyślnego ${format.id}.`);
  }

  const min = product.minQuantity ?? 1;
  const wanted = input.quantity ?? product.defaultQuantity;
  const quantity = clampQuantity(wanted, min);
  if (quantity !== wanted) {
    adjustments.push(
      quantity === min && wanted < min
        ? `Minimalny nakład dla ${product.name} to ${min} szt. — podniesiono.`
        : `Nakład zmieniono na ${quantity}.`,
    );
  }

  let sides: PrintSide | undefined;
  if (product.backPrint) sides = input.sides ?? DEFAULT_SIDE;
  else if (input.sides) adjustments.push("Produkt nie ma wyboru stronności — pominięto.");

  const params = new URLSearchParams();
  params.set("format", format.id);
  params.set("qty", String(quantity));
  if (sides) params.set("sides", sides);
  const source = input.source && SOURCE_RE.test(input.source) ? input.source.toLowerCase() : "ai";
  params.set("utm_source", source);
  params.set("utm_medium", "mcp");

  return {
    url: `${origin}/zamowienie/${product.slug}?${params.toString()}`,
    productUrl: `${origin}/produkty/${product.slug}`,
    brand,
    resolved: { formatId: format.id, quantity, sides },
    adjustments,
  };
}
