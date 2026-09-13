import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AddToCartRedirect } from "@/components/add-to-cart-redirect";
import { Header } from "@/components/header";
import { clampQuantity } from "@/lib/pricing";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "Zamówienie",
  description:
    "Wgraj projekt, podaj dane do faktury i dostawy, a następnie przejdź do płatności.",
  robots: { index: false, follow: false },
};

type Params = { slug: string };
type Search = { qty?: string; format?: string };

export default async function OrderPage({
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

  const formatId =
    product.formats.find((f) => f.id === format)?.id ?? product.defaultFormatId;
  const quantity = clampQuantity(
    qty ? Number(qty) || product.defaultQuantity : product.defaultQuantity,
    product.minQuantity,
  );

  return (
    <main className="relative flex flex-1 flex-col bg-background">
      <Header />
      <AddToCartRedirect slug={product.slug} formatId={formatId} quantity={quantity} />
    </main>
  );
}
