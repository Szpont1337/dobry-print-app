import type { MetadataRoute } from "next";

import { getPublishedArticles } from "@/data/artykuly";
import { produkty } from "@/data/produkty";
import { tematyDrukarnie } from "@/data/tematy-drukarnie";
import { getCityProductMiasta, getIndexableMiasta } from "@/lib/miasta-seo";

export const revalidate = 86400;

const BASE_URL = "https://dobreprinty.pl";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    url: BASE_URL,
    lastModified,
    changeFrequency: "daily",
    priority: 1.0,
  };

  const blogIndex: MetadataRoute.Sitemap[number] = {
    url: `${BASE_URL}/blog`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  };

  const drukarnieLokalne: MetadataRoute.Sitemap[number] = {
    url: `${BASE_URL}/drukarnie-lokalne`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  };

  const blogArticles: MetadataRoute.Sitemap = getPublishedArticles().map(
    (article) => ({
      url: `${BASE_URL}/blog/${article.slug}`,
      lastModified: new Date(article.updatedAt ?? article.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const productPages: MetadataRoute.Sitemap = produkty.map((p) => ({
    url: `${BASE_URL}/produkty/${p.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Tematyczne strony docelowe „drukarnia <typ>" — różne intencje wyszukiwania.
  const tematPages: MetadataRoute.Sitemap = tematyDrukarnie.map((t) => ({
    url: `${BASE_URL}/${t.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Tylko indeksowane miasta trafiają do sitemap — nie zgłaszamy Google
  // cienkich, nieindeksowanych podstron (noindex).
  const indexableMiasta = getIndexableMiasta();

  const cityPages: MetadataRoute.Sitemap = indexableMiasta.map((m) => ({
    url: `${BASE_URL}/drukarnia-${m.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Podstrony miasto×produkt zgłaszamy tylko dla miast z listy statycznej
  // (ostrzejsza reguła niż dla stron miast) — patrz isIndexableCityProduct.
  const cityProductPages: MetadataRoute.Sitemap = getCityProductMiasta().flatMap(
    (m) =>
      produkty.map((p) => ({
        url: `${BASE_URL}/drukarnia-${m.slug}/${p.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  );

  return [
    home,
    blogIndex,
    drukarnieLokalne,
    ...blogArticles,
    ...productPages,
    ...tematPages,
    ...cityPages,
    ...cityProductPages,
  ];
}
