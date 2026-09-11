import type { Metadata } from "next";

import { CheckoutPage } from "@/components/checkout-page";
import { Header } from "@/components/header";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = {
  title: "Zamówienie",
  description:
    "Wgraj projekty, podaj dane do faktury i dostawy, zapłać za cały koszyk jedną płatnością.",
  robots: { index: false, follow: false },
};

type Search = { test?: string };

export default async function CheckoutRoute({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  // ?test=1 → pełna ścieżka zakupu bez płatności i bez skutków (patrz
  // /api/stripe/checkout). Serwer i tak musi mieć włączony TEST_ORDERS_ENABLED.
  const { test } = await searchParams;
  const testMode = test !== undefined && test !== "0";

  return (
    <main className="relative flex flex-1 flex-col bg-background">
      <Header />
      <div className="mx-auto w-full max-w-[1200px] border-b border-border px-5 pb-5 pt-8 sm:px-8">
        <Breadcrumbs items={[{ label: "Produkty", href: "/#produkty" }, { label: "Zamówienie" }]} />
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Zamówienie
        </h1>
      </div>
      <div className="bg-background-alt py-8 sm:py-13">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
          <CheckoutPage testMode={testMode} />
        </div>
      </div>
    </main>
  );
}
