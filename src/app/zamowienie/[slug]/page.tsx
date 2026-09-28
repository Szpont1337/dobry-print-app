import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AddToCartRedirect } from "@/components/add-to-cart-redirect";
import { Header } from "@/components/header";
import { clampQuantity } from "@/lib/pricing";
import { DEFAULT_SIDE, getProduct, type PrintSide } from "@/lib/products";

export const metadata: Metadata = {
  title: "Zamówienie",
  description: "Wgraj projekt, podaj dane do faktury i dostawy, a następnie przejdź do płatności.",
  robots: { index: false, follow: false },
};

type Params = { slug: string };
type Search = {
  qty?: string;
  format?: string;
  sides?: string;
  /** grafika zaimportowana z asystenta AI (wspolny B2 z drukalo) */
  file?: string;
  fname?: string;
  fsize?: string;
  ftype?: string;
};

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { slug } = await params;
  const { qty, format, sides, file, fname, fsize, ftype } = await searchParams;

  const product = getProduct(slug);
  if (!product) notFound();

  const formatId = product.formats.find((f) => f.id === format)?.id ?? product.defaultFormatId;
  const quantity = clampQuantity(
    qty ? Number(qty) || product.defaultQuantity : product.defaultQuantity,
    product.minQuantity,
  );
  // Stronność tylko dla produktów z opcją (koszulki) — linki z MCP / maili.
  const initialSides: PrintSide | undefined = product.backPrint
    ? sides === "single" || sides === "double"
      ? sides
      : DEFAULT_SIDE
    : undefined;

  // Plik z importu AI (konektor drukalo, /podglad → „Zamów"): tylko prefiks ai-.
  const files =
    file && file.startsWith("zamowienia/ai-") && fname
      ? [{ fileKey: file, fileName: fname, fileSize: Number(fsize) || 0, fileType: ftype ?? "" }]
      : undefined;

  return (
    <main className="relative flex flex-1 flex-col bg-background">
      <Header />
      <AddToCartRedirect
        slug={product.slug}
        formatId={formatId}
        quantity={quantity}
        sides={initialSides}
        files={files}
      />
    </main>
  );
}
