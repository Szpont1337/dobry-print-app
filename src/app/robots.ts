import type { MetadataRoute } from "next";

const BASE_URL = "https://www.dobreprinty.pl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/konto",
        "/zamowienia/",
        "/zamowienie/",
        // RSC payload requests App Routera (prefetch) — losowy hash w _rsc
        // tworzy nieskończone warianty URL i przepala crawl budget. Wariant
        // z "&" łapie _rsc jako kolejny parametr po innym query stringu.
        "/*?_rsc=",
        "/*&_rsc=",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
