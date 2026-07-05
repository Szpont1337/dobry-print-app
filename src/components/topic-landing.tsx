import { Award, Sparkles, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

import { Header } from "@/components/header";
import { ProductMockup } from "@/components/product-mockup";
import {
  Breadcrumbs,
  Button,
  Container,
  Eyebrow,
  Section,
  SectionHeader,
} from "@/components/ui";
import { tematyDrukarnie, type TematDrukarnia } from "@/data/tematy-drukarnie";
import { visibleProducts as products } from "@/lib/products";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dobreprinty.pl";

const tileIcons = [Sparkles, ShieldCheck, Truck, Award];

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

export function buildTopicMetadata(temat: TematDrukarnia) {
  const url = `${BASE_URL}/${temat.slug}`;
  return {
    title: { absolute: temat.metaTitle },
    description: temat.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: temat.metaTitle,
      description: temat.metaDescription,
      url,
      siteName: "DobrePrinty",
      type: "website" as const,
    },
  };
}

function TopicSchema({ temat, url }: { temat: TematDrukarnia; url: string }) {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: temat.metaTitle,
        serviceType: temat.keyword,
        description: temat.metaDescription,
        url,
        areaServed: { "@type": "Country", name: "Polska" },
        provider: {
          "@type": "Organization",
          name: "DobrePrinty",
          url: BASE_URL,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: temat.faqs.map((f) => ({
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
            name: temat.eyebrow,
            item: url,
          },
        ],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export function TopicLanding({ temat }: { temat: TematDrukarnia }) {
  const url = `${BASE_URL}/${temat.slug}`;
  const featured = temat.relatedProducts
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);
  const inne = tematyDrukarnie.filter((t) => t.slug !== temat.slug);

  return (
    <main className="relative flex flex-1 flex-col bg-background">
      <Header />

      <section className="relative isolate overflow-hidden bg-gradient-to-b from-accent/40 via-background to-background pt-8 pb-13 sm:pt-13 sm:pb-21">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(0,0,0,0.04)_0%,_transparent_60%)]"
        />
        <Container>
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              { label: temat.eyebrow },
            ]}
          />

          <div className="mt-6 grid items-end gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-13">
            <div>
              <Eyebrow className="font-mono">{temat.eyebrow}</Eyebrow>
              <h1 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
                {temat.h1Lead}{" "}
                <span className="text-primary">{temat.h1Highlight}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
                {temat.heroLead}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={temat.cta.href} variant="primary" size="lg">
                  {temat.cta.label}
                </Button>
              </div>
            </div>

            <ul className="grid grid-cols-3 border-l border-t border-border">
              {temat.heroStats.map((stat) => (
                <li
                  key={stat.label}
                  className="border-r border-b border-border px-4 py-5"
                >
                  <p className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Section spacing="md">
        <SectionHeader index="01" title={temat.bulletsHeading} />

        <ul className="mt-8 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {temat.bullets.map((b, idx) => {
            const Icon = tileIcons[idx % tileIcons.length];
            return (
              <li
                key={b.title}
                className="flex h-full flex-col gap-4 border-r border-b border-border p-6 transition-colors hover:bg-secondary/50"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-lg bg-secondary text-primary">
                    <Icon aria-hidden className="size-5" strokeWidth={2.2} />
                  </span>
                  <span className="font-mono text-3xl font-extrabold tracking-tight text-border">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {b.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section spacing="md" contain={false}>
        <div className="mx-auto max-w-[760px] px-5 sm:px-8">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {temat.bodyHeading}
          </h2>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {temat.body.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      {featured.length > 0 ? (
        <Section alt spacing="md">
          <SectionHeader
            index="02"
            eyebrow={temat.eyebrow}
            title={temat.productsHeading}
            description={temat.productsLead}
          />

          <ul className="mt-8 grid border-l border-t border-border md:grid-cols-2">
            {featured.map((p) => (
              <li key={p.slug} className="border-r border-b border-border">
                <Link
                  href={`/produkty/${p.slug}`}
                  className="group flex h-full items-start gap-5 p-5 transition-colors hover:bg-secondary/50 sm:p-8"
                >
                  <span className="grid size-20 shrink-0 place-items-center rounded-lg border border-border bg-background-alt sm:size-24">
                    <ProductMockup
                      variant={p.variant}
                      className="h-16 w-16 sm:h-20 sm:w-20"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {p.tagline}
                    </p>
                    <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Konfiguruj <span aria-hidden>→</span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section spacing="md">
        <SectionHeader
          index="03"
          eyebrow={`FAQ — ${temat.keyword}`}
          title="Najczęstsze pytania"
        />

        <ul className="mt-8 max-w-3xl space-y-3">
          {temat.faqs.map((item) => (
            <li key={item.question}>
              <details className="group rounded-2xl border border-border bg-card shadow-sm transition-shadow open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:text-lg">
                  <span>{item.question}</span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-card text-primary transition-colors group-open:border-primary group-open:bg-primary group-open:text-primary-foreground">
                    <PlusIcon />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {item.answer}
                </div>
              </details>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-13 flex max-w-3xl flex-col items-center justify-between gap-5 rounded-2xl border border-border bg-secondary px-6 py-6 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {temat.cta.heading}
            </h3>
            <p className="text-sm text-secondary-foreground/80">
              {temat.cta.body}
            </p>
          </div>
          <Button
            href={temat.cta.href}
            variant="primary"
            size="md"
            className="shrink-0"
          >
            {temat.cta.label}
          </Button>
        </div>
      </Section>

      <Section alt spacing="md">
        <SectionHeader
          index="04"
          eyebrow="Zobacz też"
          title="Inne rodzaje drukarni"
        />

        <ul className="mt-8 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {inne.map((t) => (
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
          <li className="border-r border-b border-border">
            <Link
              href="/drukarnie-lokalne"
              className="flex items-center justify-between gap-3 p-4 font-mono text-sm font-semibold text-foreground transition-colors hover:bg-secondary/50 hover:text-primary"
            >
              Drukarnie lokalne
              <span aria-hidden>↗</span>
            </Link>
          </li>
        </ul>
      </Section>

      <TopicSchema temat={temat} url={url} />
    </main>
  );
}
