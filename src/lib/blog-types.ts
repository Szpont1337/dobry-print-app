export type ArticleStatus = "opublikowany" | "planowany";

export type ArticleCategory =
  | "poradniki"
  | "pliki-do-druku"
  | "papier"
  | "kolor"
  | "produkty"
  | "biznes";

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  poradniki: "Poradniki",
  "pliki-do-druku": "Pliki do druku",
  papier: "Papier i gramatura",
  kolor: "Kolor i CMYK",
  produkty: "Produkty",
  biznes: "Biznes drukarski",
};

export type FaqItem = { q: string; a: string };

export type ArticleSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "callout"; variant?: "info" | "warn" | "tip"; text: string }
  | { type: "faq"; items: FaqItem[] }
  | { type: "cta"; heading: string; body: string; href: string; label: string };

export type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  tags: string[];
  publishedAt: string;
  /** ISO date of the last meaningful content update; defaults to publishedAt */
  updatedAt?: string;
  author: string;
  status: ArticleStatus;
  /** ID of "HowTo" schema if applicable, else "Article" */
  schemaType?: "Article" | "HowTo";
  /** Slugs of related products from src/lib/products.ts */
  relatedProducts?: string[];
};

export type Article = ArticleMeta & {
  sections: ArticleSection[];
};
