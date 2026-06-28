import type { Article, ArticleSection } from "./blog-types";

const WORDS_PER_MINUTE = 230;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function getArticleWordCount(sections: ArticleSection[]): number {
  let total = 0;
  for (const section of sections) {
    if (section.type === "p" || section.type === "h2" || section.type === "h3") {
      total += countWords(section.text);
    } else if (section.type === "list") {
      total += section.items.reduce((sum, item) => sum + countWords(item), 0);
    } else if (section.type === "table") {
      total += section.headers.reduce((s, h) => s + countWords(h), 0);
      total += section.rows.reduce(
        (s, row) => s + row.reduce((s2, cell) => s2 + countWords(cell), 0),
        0,
      );
    } else if (section.type === "callout") {
      total += countWords(section.text);
    } else if (section.type === "faq") {
      total += section.items.reduce(
        (s, item) => s + countWords(item.q) + countWords(item.a),
        0,
      );
    } else if (section.type === "cta") {
      total += countWords(section.heading) + countWords(section.body);
    }
  }
  return total;
}

export function getReadTime(sections: ArticleSection[]): number {
  const words = getArticleWordCount(sections);
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export type TocEntry = {
  id: string;
  text: string;
  level: 2 | 3;
  children?: TocEntry[];
};

export function buildToc(sections: ArticleSection[]): TocEntry[] {
  const toc: TocEntry[] = [];
  let current: TocEntry | null = null;
  for (const section of sections) {
    if (section.type === "h2") {
      current = { id: section.id, text: section.text, level: 2, children: [] };
      toc.push(current);
    } else if (section.type === "h3" && current) {
      current.children!.push({
        id: section.id,
        text: section.text,
        level: 3,
      });
    }
  }
  return toc;
}

export function getArticleFaqs(article: Article) {
  return article.sections
    .filter((s): s is Extract<ArticleSection, { type: "faq" }> => s.type === "faq")
    .flatMap((s) => s.items);
}

export function formatDatePl(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
