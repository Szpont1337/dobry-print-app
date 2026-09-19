"use client";

import { cn } from "@/lib/utils";
import { Award, CheckCircle2, ShieldCheck, Sparkles, Truck } from "lucide-react";
import Link from "next/link";
import { Trans } from "react-i18next";

import { ProductConfigurator } from "@/components/product-configurator";
import { ProductMockup } from "@/components/product-mockup";
import type { Miasto } from "@/data/miasta";
import { useProductI18n } from "@/hooks/use-product-i18n";
import type { Product } from "@/lib/products";
import type { ProductContent } from "@/lib/products-content";
import {
  Breadcrumbs,
  Button,
  Container,
  Eyebrow,
  Section,
  SectionHeader,
  buttonVariants,
} from "@/components/ui";

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

const whyIcons = [Truck, Sparkles, ShieldCheck, Award];

const accent = { accent: <span className="text-primary" /> };

/**
 * Widoczna treść strony produktu (bez metadanych, JSON-LD i PostHog — te
 * zostają w server page). Client component, bo chrome strony jest tłumaczony
 * przez react-i18next; długie opisy z `products-content.ts` zostają po polsku.
 */
export function ProductPageContent({
  product,
  content,
  relatedProducts,
  popularCities,
}: {
  product: Product;
  content: ProductContent;
  relatedProducts: Product[];
  popularCities: Miasto[];
}) {
  const { t, name, tagline, inHeading, keyword: keywordFor } = useProductI18n();
  const keyword = keywordFor(product.slug, content.keyword);
  const productName = name(product);

  return (
    <>
      <section
        id="konfigurator"
        className="relative scroll-mt-24 bg-background pt-8 pb-16 sm:pt-13 sm:pb-21"
      >
        <Container>
          <Breadcrumbs
            items={[
              { label: t("page.breadcrumbHome"), href: "/" },
              { label: t("page.breadcrumbProducts"), href: "/#produkty" },
              { label: productName },
            ]}
          />

          <div className="mt-6 max-w-2xl sm:mt-8">
            <Eyebrow>{t("page.eyebrow", { keyword })}</Eyebrow>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              <Trans
                t={t}
                i18nKey="page.title"
                values={{ inHeading: inHeading(product) }}
                components={accent}
              />
            </h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-primary/80">
              {tagline(product)}
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
          eyebrow={t("page.why.eyebrow")}
          title={<Trans t={t} i18nKey="page.why.title" values={{ keyword }} components={accent} />}
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
          eyebrow={t("page.specs.eyebrow")}
          title={t("page.specs.title", { keyword })}
          description={t("page.specs.description")}
        />

        <div className="mt-8 max-w-4xl overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-left text-sm sm:text-base">
            <thead className="bg-background-alt text-foreground">
              <tr>
                <th className="px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider sm:px-8 sm:py-5">
                  {t("page.specs.param")}
                </th>
                <th className="px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider sm:px-8 sm:py-5">
                  {t("page.specs.standard")}
                </th>
                <th className="hidden px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider sm:table-cell sm:px-8 sm:py-5">
                  {t("page.specs.options")}
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
          eyebrow={t("page.filePrep.eyebrow")}
          title={
            <Trans
              t={t}
              i18nKey="page.filePrep.title"
              values={{ name: productName.toLowerCase() }}
              components={accent}
            />
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
                {t("page.filePrep.step", { n: String(idx + 1).padStart(2, "0") })}
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
              <Trans
                t={t}
                i18nKey="page.filePrep.template"
                values={{ name: productName.toLowerCase() }}
                components={{ strong: <strong className="font-bold" /> }}
              />
            </p>
            <a
              href={`/szablony/${product.slug}.zip`}
              download
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0")}
            >
              {t("page.filePrep.download")}
            </a>
          </div>
        )}
      </Section>

      <Section>
        <SectionHeader
          index="04"
          eyebrow={t("page.about.eyebrow", { keyword })}
          title={
            <Trans t={t} i18nKey="page.about.title" values={{ keyword }} components={accent} />
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
          eyebrow={t("page.faq.eyebrow", { keyword })}
          title={<Trans t={t} i18nKey="page.faq.title" values={{ keyword }} components={accent} />}
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
          eyebrow={t("page.local.eyebrow", { keyword })}
          title={t("page.local.title", { keyword })}
          description={t("page.local.description", { name: productName.toLowerCase() })}
        />

        <ul className="mt-8 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {popularCities.map((m) => (
            <li key={m.slug} className="border-r border-b border-border">
              <Link
                href={`/drukarnia-${m.slug}`}
                className="group flex h-full flex-col p-5 transition-colors hover:bg-secondary/50 sm:p-8"
              >
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary/80">
                  {t("page.local.cityEyebrow", { city: m.nazwa })}
                </span>
                <span className="mt-2 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {t("page.local.cityTitle", { keyword, city: m.nazwa })}
                </span>
                <span className="mt-2 text-sm text-muted-foreground">
                  {t("page.local.cityNote", { region: m.wojewodztwo })}
                </span>
                <span className="mt-5 inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                  {t("page.local.see")} <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section alt spacing="lg">
        <SectionHeader
          index="07"
          eyebrow={t("page.related.eyebrow")}
          title={t("page.related.title")}
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
                  {name(p)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{tagline(p)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-gradient-to-b from-background via-accent/30 to-background py-13 sm:py-21">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              <Trans t={t} i18nKey="page.cta.title" values={{ keyword }} components={accent} />
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {content.ctaCopy}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="default" size="lg">
                <a href="#konfigurator">
                  {t("page.cta.configure")} <span aria-hidden>→</span>
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="mailto:hej@dobreprinty.pl?subject=Wycena%20druku">
                  {t("page.cta.quote")}
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
