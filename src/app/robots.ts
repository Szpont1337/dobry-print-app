import type { MetadataRoute } from "next";

const BASE_URL = "https://www.dobreprinty.pl";

// Wyszukiwarki i asystenci AI: te same zasady co dla reszty, wprost, żeby nikt nie
// zgadywał (część botów i narzędzi audytowych czyta tylko własną grupę).
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["*", ...AI_CRAWLERS],
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/konto",
          "/checkout",
          "/zamowienia/",
          "/zamowienie/",
          // RSC payload requests App Routera (prefetch) — losowy hash w _rsc
          // tworzy nieskończone warianty URL i przepala crawl budget. Wariant
          // z "&" łapie _rsc jako kolejny parametr po innym query stringu.
          "/*?_rsc=",
          "/*&_rsc=",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
