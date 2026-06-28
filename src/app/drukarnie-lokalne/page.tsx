import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Eyebrow, SectionHeader } from "@/components/ui";
import { getIndexableMiasta } from "@/lib/miasta-seo";
import type { Miasto } from "@/data/miasta";
import { tematyDrukarnie } from "@/data/tematy-drukarnie";

export const revalidate = 86400;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dobreprinty.pl";
const URL = `${BASE_URL}/drukarnie-lokalne`;

export const metadata: Metadata = {
  title: {
    absolute:
      "Drukarnie lokalne w Polsce — druk online w Twoim mieście | DobrePrinty",
  },
  description:
    "Druk online z dostawą kurierem w całej Polsce. Wybierz swoje miasto i sprawdź ofertę DobrePrinty: ulotki, wizytówki, plakaty i roll-upy z wyceną z VAT od ręki.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Drukarnie lokalne w Polsce | DobrePrinty",
    description:
      "Druk online z dostawą kurierem w całej Polsce — wybierz swoje miasto i sprawdź ofertę DobrePrinty.",
    url: URL,
    siteName: "DobrePrinty",
    type: "website",
  },
};

/** Grupuje indeksowalne miasta po województwie i sortuje (woj. alfabetycznie,
 *  miasta wg populacji malejąco). */
function groupByWojewodztwo(): { wojewodztwo: string; miasta: Miasto[] }[] {
  const map = new Map<string, Miasto[]>();
  for (const m of getIndexableMiasta()) {
    const arr = map.get(m.wojewodztwo) ?? [];
    arr.push(m);
    map.set(m.wojewodztwo, arr);
  }
  return [...map.entries()]
    .map(([wojewodztwo, list]) => ({
      wojewodztwo,
      miasta: [...list].sort((a, b) => b.populacja - a.populacja),
    }))
    .sort((a, b) => a.wojewodztwo.localeCompare(b.wojewodztwo, "pl"));
}

export default function DrukarnieLokalnePage() {
  const grupy = groupByWojewodztwo();
  const liczbaMiast = grupy.reduce((sum, g) => sum + g.miasta.length, 0);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: `${BASE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Drukarnie lokalne",
        item: URL,
      },
    ],
  };

  return (
    <main className="relative flex flex-1 flex-col bg-background">
      <Header />

      <section className="relative isolate overflow-hidden bg-gradient-to-b from-accent/40 via-background to-background pt-8 pb-13 sm:pt-13 sm:pb-21">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(0,0,0,0.04)_0%,_transparent_60%)]"
        />
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <Eyebrow className="font-mono">Drukarnie lokalne</Eyebrow>
          <h1 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            Druk online w <span className="text-primary">Twoim mieście</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            DobrePrinty obsługuje {liczbaMiast} miast w całej Polsce. Wybierz
            swoją lokalizację, a zamówienie zrealizuje najbliższa drukarnia
            partnerska — z dostawą kurierem zwykle następnego dnia roboczego po
            wysyłce.
          </p>
        </div>
      </section>

      <section className="bg-background py-13 sm:py-21">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid border-l border-t border-border sm:grid-cols-2">
            {grupy.map((grupa) => (
              <div
                key={grupa.wojewodztwo}
                className="border-r border-b border-border p-5 sm:p-8"
              >
                <h2 className="font-display text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                  Województwo {grupa.wojewodztwo}
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {grupa.miasta.map((m) => (
                    <li key={m.slug}>
                      <Link
                        href={`/drukarnia-${m.slug}`}
                        className="inline-flex items-center rounded-lg border border-border bg-background-alt px-3 py-1.5 font-mono text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        Drukarnia {m.nazwa}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-alt py-13 sm:py-21">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <SectionHeader
            index="01"
            eyebrow="Rodzaje drukarni"
            title="Szukasz konkretnego rodzaju druku?"
            description="Niezależnie od miasta obsługujemy różne potrzeby — od druku cyfrowego małych nakładów po wielkoformat i realizacje ekspresowe."
          />
          <ul className="mt-8 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {tematyDrukarnie.map((t) => (
              <li key={t.slug} className="border-r border-b border-border">
                <Link
                  href={`/${t.slug}`}
                  className="flex items-center justify-between gap-3 p-4 font-mono text-sm font-semibold text-foreground transition-colors hover:bg-secondary/50 hover:text-primary"
                >
                  {t.eyebrow}
                  <span aria-hidden>↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </main>
  );
}
