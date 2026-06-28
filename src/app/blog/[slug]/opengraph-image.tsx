import { ImageResponse } from "next/og";

import { getAllArticleSlugs, getArticleBySlug } from "@/data/artykuly";
import { CATEGORY_LABELS } from "@/lib/blog-types";
import { getReadTime } from "@/lib/blog-utils";

export const alt = "Blog DobrePrinty";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F172A",
          color: "white",
          fontSize: 64,
          fontWeight: 600,
        }}
      >
        DobrePrinty
      </div>,
      { ...size },
    );
  }

  const readTime = getReadTime(article.sections);
  const categoryLabel = CATEGORY_LABELS[article.category];

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "80px",
        background:
          "linear-gradient(135deg, #FFF7ED 0%, #FFFFFF 50%, #FEF3C7 100%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          color: "#EA580C",
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        <span>DobrePrinty</span>
        <span style={{ color: "#94A3B8" }}>·</span>
        <span style={{ color: "#475569" }}>blog</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          paddingTop: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
            color: "#94A3B8",
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          <span style={{ color: "#EA580C" }}>{categoryLabel}</span>
          <span>·</span>
          <span>{readTime} min czytania</span>
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#0F172A",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: "1040px",
          }}
        >
          {article.title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "32px",
          borderTop: "2px solid #E2E8F0",
          color: "#475569",
          fontSize: 22,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              width: 48,
              height: 48,
              borderRadius: 24,
              background: "#EA580C",
              color: "white",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 24,
            }}
          >
            d
          </div>
          <span style={{ fontWeight: 600, color: "#0F172A" }}>
            dobreprinty.pl/blog
          </span>
        </div>
        <span>{article.author}</span>
      </div>
    </div>,
    { ...size },
  );
}
