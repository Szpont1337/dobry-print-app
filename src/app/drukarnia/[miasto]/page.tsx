import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  buildCityMetadata,
  CityPageContent,
} from "@/components/drukarnia-miasto";
import { miasta } from "@/data/miasta";
import { getIndexableMiasta } from "@/lib/miasta-seo";

export const revalidate = 86400;
// Małe, nieindeksowane miasta renderują się na żądanie (noindex). Pre-renderujemy
// statycznie tylko miasta z `generateStaticParams` (patrz niżej).
export const dynamicParams = true;

type Params = { miasto: string };

// Adres publiczny to /drukarnia-<slug>; next.config.ts przepisuje go (rewrite)
// na tę trasę /drukarnia/<slug>. Budujemy więc statycznie wszystkie indeksowalne
// miasta — nie ma już osobnych, ręcznie pisanych folderów per miasto.
export function generateStaticParams(): Params[] {
  return getIndexableMiasta().map((m) => ({ miasto: m.slug }));
}

function getMiasto(slug: string) {
  return miasta.find((m) => m.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { miasto: slug } = await params;
  const miasto = getMiasto(slug);
  if (!miasto) {
    return { title: "Drukarnia. DobrePrinty" };
  }
  return buildCityMetadata(miasto);
}

export default async function DrukarniaMiastoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { miasto: slug } = await params;
  const miasto = getMiasto(slug);
  if (!miasto) notFound();
  return <CityPageContent miasto={miasto} />;
}
