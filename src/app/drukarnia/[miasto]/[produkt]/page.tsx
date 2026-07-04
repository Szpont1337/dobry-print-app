import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  CityProductPageContent,
  buildCityProductMetadata,
} from "@/components/drukarnia-miasto-produkt";
import { miasta } from "@/data/miasta";
import { getCityProductMiasta } from "@/lib/miasta-seo";
import { getAllProductSlugs, getProduct } from "@/lib/products";

export const revalidate = 86400;
export const dynamicParams = true;

type Params = { miasto: string; produkt: string };

export function generateStaticParams(): Params[] {
  // Adres publiczny /drukarnia-<slug>/<produkt> jest przepisywany (rewrite) na tę
  // trasę. Budujemy statycznie tylko miasta z listy statycznej × produkty
  // (ostrzejsza reguła niż dla stron miast — patrz isIndexableCityProduct);
  // pozostałe kombinacje renderują się na żądanie i są oznaczone noindex.
  const productSlugs = getAllProductSlugs();
  const params: Params[] = [];
  for (const m of getCityProductMiasta()) {
    for (const produkt of productSlugs) {
      params.push({ miasto: m.slug, produkt });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { miasto: miastoSlug, produkt: produktSlug } = await params;
  const miasto = miasta.find((m) => m.slug === miastoSlug);
  const product = getProduct(produktSlug);
  if (!miasto || !product) {
    return { title: "Druk lokalny. DobrePrinty" };
  }
  return buildCityProductMetadata({ miasto, product });
}

export default async function CityProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { miasto: miastoSlug, produkt: produktSlug } = await params;
  const miasto = miasta.find((m) => m.slug === miastoSlug);
  const product = getProduct(produktSlug);
  if (!miasto || !product) notFound();
  return <CityProductPageContent miasto={miasto} product={product} />;
}
