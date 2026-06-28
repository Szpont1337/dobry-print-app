import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { clampQuantity } from "@/lib/pricing";
import { getProduct } from "@/lib/products";

import { Editor } from "./components/editor";
import { resolveFormat } from "./utils/print-format";

export const metadata: Metadata = {
  title: "Zaprojektuj w aplikacji",
  description:
    "Zaprojektuj swój druk bezpośrednio w przeglądarce — dodaj zdjęcia, tekst i kształty, a my przygotujemy plik do druku.",
  robots: { index: false, follow: false },
};

type Params = { slug: string };
type Search = { qty?: string; format?: string };

export default async function DesignPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { slug } = await params;
  const { qty, format } = await searchParams;

  const product = getProduct(slug);
  if (!product) notFound();

  const formatId = product.formats.find((f) => f.id === format)?.id ?? product.defaultFormatId;
  const quantity = qty
    ? clampQuantity(Number(qty) || product.defaultQuantity)
    : product.defaultQuantity;
  const spec = resolveFormat(product, formatId);

  return (
    <Editor
      product={{ slug: product.slug, name: product.name }}
      format={spec}
      formatId={formatId}
      quantity={quantity}
    />
  );
}
