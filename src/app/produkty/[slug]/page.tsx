import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/components/header";
import { PostHogProductView } from "@/components/posthog-product-view";
import { miasta } from "@/data/miasta";
import { getAllProductSlugsIncludingHidden, getProduct, visibleProducts } from "@/lib/products";
import { finalUnitPrice } from "@/lib/pricing";
import { getProductContent } from "@/lib/products-content";

import { ProductPageContent } from "./components/product-page-content";

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
    `Druk ${content.keyword} online: konfigurator, cena finalna od razu, dostawa 24–48 h. ${product.tagline}`.slice(
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

function SchemaMarkup({
  product,
  content,
  url,
}: {
  product: NonNullable<ReturnType<typeof getProduct>>;
  content: NonNullable<ReturnType<typeof getProductContent>>;
  url: string;
}) {
  const lowestPrice = finalUnitPrice(
    Math.min(...product.formats.map((f) => f.unitPrice)),
  ).toFixed(2);

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
          highPrice: finalUnitPrice(
            Math.max(...product.formats.map((f) => f.unitPrice)),
          ).toFixed(2),
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

      <ProductPageContent
        product={product}
        content={content}
        relatedProducts={relatedProducts}
        popularCities={popularCities}
      />

      <PostHogProductView slug={product.slug} name={product.name} />
      <SchemaMarkup product={product} content={content} url={url} />
    </main>
  );
}
