import type { Metadata } from "next";

import { CheckoutPage } from "@/components/checkout-page";
import { Header } from "@/components/header";

import { CheckoutPageHeader } from "./components/checkout-page-header";

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
  // ?test=1 → pełna ścieżka zakupu bez płatności i bez skutków: zamówienie
  // powstaje z flagą `test`, Stripe jest pomijany, powiadomienia nie lecą
  // (patrz /api/stripe/checkout i applyPaid w convex/orders.ts).
  const { test } = await searchParams;
  const testMode = test !== undefined && test !== "0";

  return (
    <main className="relative flex flex-1 flex-col bg-background">
      <Header />
      <CheckoutPageHeader />
      <div className="bg-background-alt py-8 sm:py-13">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
          <CheckoutPage testMode={testMode} />
        </div>
      </div>
    </main>
  );
}
