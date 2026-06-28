import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/components/header";
import { OrderForm } from "@/components/order-form";
import { Breadcrumbs } from "@/components/ui";
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
  const quantity = qty
    ? clampQuantity(Number(qty) || product.defaultQuantity)
    : product.defaultQuantity;

  return (
    <main className="relative flex flex-1 flex-col bg-background">
      <Header />
      <div className="mx-auto w-full max-w-[1200px] border-b border-border px-5 pb-5 pt-8 sm:px-8">
        <Breadcrumbs
          items={[
            { label: "Produkty", href: "/produkty" },
            { label: product.name },
          ]}
        />
      </div>
      <OrderForm
        product={product}
        initialFormatId={formatId}
        initialQuantity={quantity}
      />
    </main>
  );
}
