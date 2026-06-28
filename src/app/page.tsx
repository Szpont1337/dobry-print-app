import type { Metadata } from "next";
import { Faq } from "@/components/faq";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CtaBand, HowItWorks } from "@/components/home-sections";
import { ProductsGrid } from "@/components/products-grid";

export const metadata: Metadata = {
  title: {
    absolute: "Drukarnia online — druk ulotek, wizytówek, plakatów | DobrePrinty",
  },
  description:
    "Drukarnia internetowa DobrePrinty: druk ulotek, wizytówek, plakatów i roll-upów online. Konfigurator 24/7, wycena z VAT od ręki, dostawa kurierem w całej Polsce.",
  alternates: { canonical: "https://dobreprinty.pl" },
  openGraph: {
    title: "Drukarnia online — druk ulotek, wizytówek, plakatów | DobrePrinty",
    description:
      "Druk online w DobrePrinty: ulotki, wizytówki, plakaty, roll-upy. Konfigurator 24/7, dostawa kurierem w całej Polsce.",
    url: "https://dobreprinty.pl",
    siteName: "DobrePrinty",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col">
      <Header />
      <Hero />
      <ProductsGrid />
      <HowItWorks />
      <Faq />
      <CtaBand />
    </main>
  );
}
