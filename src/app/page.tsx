import type { Metadata } from "next";
import { Faq } from "@/components/faq";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CtaBand, HowItWorks } from "@/components/home-sections";
import { ProductsGrid } from "@/components/products-grid";
import { SocialProofToast } from "@/components/social-proof-toast";
import homePl from "@/lib/i18n/locales/pl/home.json";

export const metadata: Metadata = {
  title: {
    absolute: "Drukarnia online — druk ulotek, wizytówek, plakatów | DobrePrinty",
  },
  description:
    "Drukarnia internetowa DobrePrinty: druk ulotek, wizytówek, plakatów i roll-upów online. Konfigurator 24/7, wycena finalna od ręki, dostawa kurierem w całej Polsce.",
  alternates: { canonical: "https://www.dobreprinty.pl" },
  openGraph: {
    title: "Drukarnia online — druk ulotek, wizytówek, plakatów | DobrePrinty",
    description:
      "Druk online w DobrePrinty: ulotki, wizytówki, plakaty, roll-upy. Konfigurator 24/7, dostawa kurierem w całej Polsce.",
    url: "https://www.dobreprinty.pl",
    siteName: "DobrePrinty",
    type: "website",
  },
};

// FAQ w JSON-LD renderowane SERWEROWO. Komponent <Faq /> jest kliencki i
// czyta treść z i18n, więc crawlery (Google, ChatGPT, Perplexity) nie mają się
// z czego uczyć — a to tam stoi odpowiedź „nie wystawiamy faktur VAT".
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.dobreprinty.pl#faq",
  mainEntity: homePl.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <Hero />
      <ProductsGrid />
      <HowItWorks />
      <Faq />
      <CtaBand />
      <SocialProofToast />
    </main>
  );
}
