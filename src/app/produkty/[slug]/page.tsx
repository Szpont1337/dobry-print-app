import type { Metadata } from "next";
import { Award, CheckCircle2, ShieldCheck, Sparkles, Truck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Header } from "@/components/header";
import { PostHogProductView } from "@/components/posthog-product-view";
import { ProductConfigurator } from "@/components/product-configurator";
import { ProductMockup } from "@/components/product-mockup";
import { miasta } from "@/data/miasta";
import { getAllProductSlugsIncludingHidden, getProduct, visibleProducts } from "@/lib/products";
import { getProductContent } from "@/lib/products-content";
import {
  Breadcrumbs,
  Button,
  Container,
  Eyebrow,
  Section,
  SectionHeader,
  buttonClasses,
} from "@/components/ui";

export const revalidate = 86400;

const BASE_URL = "https://www.dobreprinty.pl";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllProductSlugsIncludingHidden().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  const content = getProductContent(slug);
  if (!product || !content) {
    return { title: "Produkt. DobrePrinty" };
  }
  const url = `${BASE_URL}/produkty/${product.slug}`;
  const title = `${product.name} online — tani druk, dostawa 24h`;
  const description =
    `Druk ${content.keyword} online: konfigurator, cena z VAT od razu, dostawa 24–48 h. ${product.tagline}`.slice(
      0,
      155,
    );
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: product.hidden ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: "DobrePrinty",
      type: "website",
    },
  };
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-5 transition-transform duration-200 group-open:rotate-45"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function SchemaMarkup({
  product,
  content,
  url,
}: {
  product: NonNullable<ReturnType<typeof getProduct>>;
  content: NonNullable<ReturnType<typeof getProductContent>>;
  url: string;
}) {
  const lowestPrice = Math.min(...product.formats.map((f) => f.unitPrice)).toFixed(2);

  // Only emit aggregateRating when there is a real rating to report. A
  // ratingCount of 0 is invalid in schema.org and triggers a hard error in
  // Google Rich Results, so products without ratings simply omit the field.
  const ratingValue = Number(content.aggregateRating.value);
  const ratingCount = Number(content.aggregateRating.count);
  const hasRating = ratingCount > 0 && ratingValue > 0;

  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: product.name,
        description: content.heroLead,
        url,
        image: `${BASE_URL}/og/produkt-${product.slug}.jpg`,
        brand: { "@type": "Brand", name: "DobrePrinty" },
        category: "Print on demand / online printing",
        ...(hasRating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: content.aggregateRating.value,
                reviewCount: content.aggregateRating.count,
                bestRating: "5",
                worstRating: "1",
              },
            }
          : {}),
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "PLN",
          lowPrice: lowestPrice,
          highPrice: Math.max(...product.formats.map((f) => f.unitPrice)).toFixed(2),
          offerCount: product.formats.length,
          availability: "https://schema.org/InStock",
          url,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: content.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
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
            name: "Produkty",
            item: `${BASE_URL}/#produkty`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}

const whyIcons = [Truck, Sparkles, ShieldCheck, Award];

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  const content = getProductContent(slug);
  if (!product || !content) notFound();

  const url = `${BASE_URL}/produkty/${product.slug}`;
  const relatedProducts = visibleProducts.filter((p) => p.slug !== product.slug).slice(0, 4);
  const popularCities = miasta.slice(0, 6);

  return (
    <main className="relative flex flex-1 flex-col bg-background">
      <Header />

      <section
        id="konfigurator"
        className="relative scroll-mt-24 bg-background pt-8 pb-16 sm:pt-13 sm:pb-21"
      >
        <Container>
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Produkty", href: "/#produkty" },
              { label: product.name },
            ]}
          />

          <div className="mt-6 max-w-2xl sm:mt-8">
            <Eyebrow>Druk {content.keyword} online</Eyebrow>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Wydrukuj <span className="text-primary">{product.inHeading}</span>
            </h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-primary/80">
              {product.tagline}
            </p>
          </div>

          <div className="mt-8 sm:mt-13">
            <ProductConfigurator product={product} />
          </div>
        </Container>
      </section>

      <Section alt spacing="lg">
        <SectionHeader
          index="01"
          eyebrow="Dlaczego DobrePrinty"
          title={
            <>
              Dlaczego warto drukować <span className="text-primary">{content.keyword}</span> w
              DobrePrinty
            </>
          }
        />

        <ul className="mt-8 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {content.whyBlocks.map((block, idx) => {
            const Icon = whyIcons[idx] ?? CheckCircle2;
            return (
              <li
                key={block.tytul}
                className="flex h-full flex-col border-r border-b border-border p-5 transition-colors hover:bg-secondary/50 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <Icon aria-hidden className="size-6" strokeWidth={2} />
                  </span>
                  <span className="font-mono text-3xl font-extrabold tracking-tight text-border">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground">
                  {block.tytul}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {block.opis}
                </p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section>
        <SectionHeader
          index="02"
          eyebrow="Specyfikacja techniczna"
          title={`Parametry druku ${content.keyword}`}
          description="Standardowe ustawienia produktu i dostępne opcje. Wszystko wybierasz w konfiguratorze powyżej."
        />

        <div className="mt-8 max-w-4xl overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-left text-sm sm:text-base">
            <thead className="bg-background-alt text-foreground">
              <tr>
                <th className="px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider sm:px-8 sm:py-5">
                  Parametr
                </th>
                <th className="px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider sm:px-8 sm:py-5">
                  Standard
                </th>
                <th className="hidden px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider sm:table-cell sm:px-8 sm:py-5">
                  Opcje
                </th>
              </tr>
            </thead>
            <tbody>
              {content.params.map((row) => (
                <tr key={row.parametr} className="border-t border-border align-top">
                  <td className="px-5 py-3 font-semibold text-foreground sm:px-8 sm:py-5">
                    {row.parametr}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground sm:px-8 sm:py-5">{row.wartosc}</td>
                  <td className="hidden px-5 py-3 text-muted-foreground sm:table-cell sm:px-8 sm:py-5">
                    {row.opcje ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section alt spacing="lg">
        <SectionHeader
          index="03"
          eyebrow="Przygotowanie pliku"
          title={
            <>
              Jak przygotować plik do druku{" "}
              <span className="text-primary">{product.name.toLowerCase()}</span>
            </>
          }
          description={content.filePrepIntro}
        />

        <ol className="mt-8 grid border-l border-t border-border sm:grid-cols-2">
          {content.filePrepSteps.map((step, idx) => (
            <li
              key={step.tytul}
              className="flex h-full flex-col border-r border-b border-border p-5 transition-colors hover:bg-secondary/50 sm:p-8"
            >
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Krok {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-bold tracking-tight text-foreground">
                {step.tytul}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {step.opis}
              </p>
            </li>
          ))}
        </ol>

        {!product.hidden && (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-lg border border-border bg-card px-5 py-5 sm:px-8">
            <p className="text-sm text-foreground sm:text-base">
              <strong className="font-bold">Plik do pobrania:</strong> darmowy szablon{" "}
              {product.name.toLowerCase()} (PDF, wszystkie formaty) z liniami cięcia, spadami 3 mm i
              marginesem bezpiecznym.
            </p>
            <a
              href={`/szablony/${product.slug}.zip`}
              download
              className={buttonClasses("outline", "sm", "shrink-0")}
            >
              Pobierz szablon →
            </a>
          </div>
        )}
      </Section>

      <Section>
        <SectionHeader
          index="04"
          eyebrow={`Druk ${content.keyword} w DobrePrinty`}
          title={
            <>
              Co warto wiedzieć o druku <span className="text-primary">{content.keyword}</span>{" "}
              online
            </>
          }
        />

        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {content.seoParagraph.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </Section>

      <Section alt spacing="lg">
        <SectionHeader
          index="05"
          eyebrow={`FAQ druk ${content.keyword}`}
          title={
            <>
              Najczęstsze pytania o <span className="text-primary">druk {content.keyword}</span>
            </>
          }
        />

        <ul className="mt-8 max-w-3xl space-y-3">
          {content.faqs.map((item) => (
            <li key={item.question}>
              <details className="group rounded-lg border border-border bg-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-lg px-5 py-5 text-left text-base font-bold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:px-8 sm:text-lg">
                  <span>{item.question}</span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-card text-primary transition-colors group-open:border-primary group-open:bg-primary group-open:text-primary-foreground">
                    <PlusIcon />
                  </span>
                </summary>
                <div className="px-5 pb-5 text-base leading-relaxed text-muted-foreground sm:px-8 sm:text-lg">
                  {item.answer}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeader
          index="06"
          eyebrow={`Druk ${content.keyword} lokalnie`}
          title={`Druk ${content.keyword} z dostawą do Twojego miasta`}
          description={`Drukarnia ${product.name.toLowerCase()} z sieci DobrePrinty dostarcza do firm i instytucji w 340 miastach Polski. Najczęściej zamawiają u nas:`}
        />

        <ul className="mt-8 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {popularCities.map((m) => (
            <li key={m.slug} className="border-r border-b border-border">
              <Link
                href={`/drukarnia-${m.slug}`}
                className="group flex h-full flex-col p-5 transition-colors hover:bg-secondary/50 sm:p-8"
              >
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary/80">
                  Drukarnia {m.nazwa}
                </span>
                <span className="mt-2 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  Druk {content.keyword} {m.nazwa}
                </span>
                <span className="mt-2 text-sm text-muted-foreground">
                  Dostawa kurierem w 24–48 h. Województwo {m.wojewodztwo}.
                </span>
                <span className="mt-5 inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                  Zobacz <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section alt spacing="lg">
        <SectionHeader
          index="07"
          eyebrow="Powiązane produkty"
          title="Sprawdź inne pozycje w katalogu DobrePrinty"
        />

        <ul className="mt-8 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((p) => (
            <li key={p.slug} className="border-r border-b border-border">
              <Link
                href={`/produkty/${p.slug}`}
                className="group flex h-full flex-col p-5 transition-colors hover:bg-secondary/50 sm:p-8"
              >
                <span className="grid size-16 place-items-center rounded-lg border border-border bg-background">
                  <ProductMockup variant={p.variant} className="h-12 w-12" />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-gradient-to-b from-background via-accent/30 to-background py-13 sm:py-21">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Gotowy zamówić druk <span className="text-primary">{content.keyword}</span>?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {content.ctaCopy}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="#konfigurator" variant="primary" size="lg">
                Skonfiguruj i zamów <span aria-hidden>→</span>
              </Button>
              <Button
                href="mailto:hej@dobreprinty.pl?subject=Wycena%20druku"
                variant="outline"
                size="lg"
              >
                Wycena indywidualna →
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <PostHogProductView slug={product.slug} name={product.name} />
      <SchemaMarkup product={product} content={content} url={url} />
    </main>
  );
}
