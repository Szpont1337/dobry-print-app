import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogArticleBody } from "@/components/blog-article-body";
import { BlogToc } from "@/components/blog-toc";
import { Header } from "@/components/header";
import { Breadcrumbs, Eyebrow } from "@/components/ui";
import {
  getAllArticleSlugs,
  getArticleBySlug,
  getRelatedArticles,
} from "@/data/artykuly";
import { CATEGORY_LABELS } from "@/lib/blog-types";
import {
  buildToc,
  formatDatePl,
  getArticleFaqs,
  getReadTime,
} from "@/lib/blog-utils";
import { visibleProducts as products } from "@/lib/products";

export const revalidate = 86400;
export const dynamicParams = false;

const BASE_URL = "https://www.dobreprinty.pl";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Artykuł. DobrePrinty" };
  const url = `${BASE_URL}/blog/${article.slug}`;
  const ogImageUrl = `${BASE_URL}/blog/${article.slug}/opengraph-image`;
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      siteName: "DobrePrinty",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author],
      tags: article.tags,
      images: [
        { url: ogImageUrl, width: 1200, height: 630, alt: article.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [ogImageUrl],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const url = `${BASE_URL}/blog/${article.slug}`;
  const readTime = getReadTime(article.sections);
  const toc = buildToc(article.sections);
  const faqs = getArticleFaqs(article);
  const related = getRelatedArticles(article.slug, article.category, 3);
  const relatedProducts = (article.relatedProducts ?? [])
    .map((slugRef) => products.find((p) => p.slug === slugRef))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const schemaType = article.schemaType ?? "Article";
  const baseSchema = {
    "@type": schemaType,
    "@id": `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    author: { "@type": "Organization", name: article.author },
    publisher: {
      "@type": "Organization",
      name: "DobrePrinty",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${BASE_URL}/blog/${article.slug}/opengraph-image`,
    keywords: article.tags.join(", "),
  };

  const howToSteps =
    schemaType === "HowTo"
      ? article.sections
          .filter((s) => s.type === "h2")
          .map((s, idx) => ({
            "@type": "HowToStep",
            position: idx + 1,
            name: s.type === "h2" ? s.text : "",
            url: `${url}#${s.type === "h2" ? s.id : ""}`,
          }))
      : [];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      schemaType === "HowTo"
        ? {
            ...baseSchema,
            step: howToSteps,
            totalTime: `PT${readTime}M`,
          }
        : baseSchema,
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
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
            name: "Blog",
            item: `${BASE_URL}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <main className="relative flex flex-1 flex-col bg-background">
      <Header />

      <section className="relative isolate overflow-hidden bg-gradient-to-b from-accent/40 via-background to-background pt-8 pb-13 sm:pt-13">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(0,0,0,0.04)_0%,_transparent_60%)]"
        />
        <div className="mx-auto max-w-[760px] px-5 sm:px-8">
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: CATEGORY_LABELS[article.category] },
            ]}
          />

          <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-primary">
            <span>{CATEGORY_LABELS[article.category]}</span>
            <span aria-hidden>·</span>
            <span>{readTime} min czytania</span>
            <span aria-hidden>·</span>
            <span>{formatDatePl(article.publishedAt)}</span>
            {article.updatedAt && article.updatedAt !== article.publishedAt ? (
              <>
                <span aria-hidden>·</span>
                <span>Aktualizacja {formatDatePl(article.updatedAt)}</span>
              </>
            ) : null}
          </div>

          <h1 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            {article.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-border bg-card px-3 py-1 font-mono text-xs font-semibold text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background pb-21">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <BlogToc toc={toc} />
            </aside>

            <div className="min-w-0">
              <BlogArticleBody sections={article.sections} />

              {relatedProducts.length > 0 ? (
                <section className="mt-13 rounded-lg border border-border bg-background-alt p-6 sm:p-8">
                  <Eyebrow className="font-mono">Powiązane produkty</Eyebrow>
                  <h2 className="mt-3 font-display text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                    Zamów produkty z tego artykułu
                  </h2>
                  <ul className="mt-5 grid border-l border-t border-border sm:grid-cols-3">
                    {relatedProducts.map((p) => (
                      <li
                        key={p.slug}
                        className="border-r border-b border-border"
                      >
                        <Link
                          href={`/produkty/${p.slug}`}
                          className="group flex h-full flex-col p-4 transition-colors hover:bg-secondary/50"
                        >
                          <span className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                            {p.name}
                          </span>
                          <span className="mt-1 text-xs text-muted-foreground">
                            {p.tagline}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {related.length > 0 ? (
                <section className="mt-12">
                  <h2 className="font-display text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                    Czytaj dalej w kategorii „
                    {CATEGORY_LABELS[article.category]}”
                  </h2>
                  <ul className="mt-5 grid border-l border-t border-border sm:grid-cols-3">
                    {related.map((r) => (
                      <li
                        key={r.slug}
                        className="border-r border-b border-border"
                      >
                        <Link
                          href={`/blog/${r.slug}`}
                          className="group flex h-full flex-col p-4 transition-colors hover:bg-secondary/50"
                        >
                          <span className="font-mono text-xs text-muted-foreground">
                            {getReadTime(r.sections)} min czytania
                          </span>
                          <span className="mt-2 text-base font-bold text-foreground transition-colors group-hover:text-primary">
                            {r.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
