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

export default function CheckoutRoute() {
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
          <CheckoutPage />
        </div>
      </div>
    </main>
  );
}
