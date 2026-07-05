// Google Search Console report via the official API.
//
// Two modes:
//   inspect  (default) — URL Inspection API: index status + rich-results issues
//                        per URL (the programmatic equivalent of the GSC
//                        "offers/review/aggregateRating" enhancement error).
//   queries            — Search Analytics: top queries/pages by clicks &
//                        impressions, with CTR & avg position (find low-CTR wins).
//
// Setup (one-time):
//   1. Google Cloud → enable "Google Search Console API".
//   2. Create a Service Account, download its JSON key.
//   3. In Search Console → Settings → Users and permissions, add the service
//      account email (xxx@yyy.iam.gserviceaccount.com) as a Full/Restricted user
//      on the dobreprinty.pl property.
//   4. Set env vars (e.g. in .env.local, NOT committed):
//        GSC_KEY_FILE=./gsc-service-account.json
//        GSC_SITE_URL=sc-domain:dobreprinty.pl        # domain property
//        # or  GSC_SITE_URL=https://www.dobreprinty.pl/   # URL-prefix property
//
// Usage:
//   bun run seo:gsc                              # inspect sample of sitemap URLs
//   bun run seo:gsc -- --url https://www.dobreprinty.pl/drukarnia-kielce
//   bun run seo:gsc -- --limit 30
//   bun run seo:gsc -- queries                   # last 28 days search analytics
//   bun run seo:gsc -- queries --days 90

import { google } from "googleapis";
import { XMLParser } from "fast-xml-parser";

const KEY_FILE =
  process.env.GSC_KEY_FILE || process.env.GOOGLE_APPLICATION_CREDENTIALS;
const SITE_URL = process.env.GSC_SITE_URL || "sc-domain:dobreprinty.pl";
const BASE_URL = (process.env.SEO_BASE_URL || "https://www.dobreprinty.pl").replace(
  /\/$/,
  "",
);

const args = process.argv.slice(2);
const MODE = args.find((a) => !a.startsWith("--")) || "inspect";
const flag = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 ? args[i + 1] : def;
};

if (!KEY_FILE) {
  console.error(
    "Brak klucza. Ustaw GSC_KEY_FILE=./gsc-service-account.json (patrz nagłówek pliku).",
  );
  process.exit(2);
}

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE,
  scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
});
const sc = google.searchconsole({ version: "v1", auth });

async function getSitemapUrls(limit) {
  const res = await fetch(`${BASE_URL}/sitemap.xml`);
  const xml = await res.text();
  const parsed = new XMLParser().parse(xml);
  const urls = [].concat(parsed.urlset?.url ?? []).map((u) => u.loc);
  return urls.filter(Boolean).slice(0, limit);
}

async function inspect() {
  const single = flag("url");
  const limit = Number(flag("limit", 25));
  const urls = single ? [single] : await getSitemapUrls(limit);

  console.log(`\nURL Inspection — ${SITE_URL}  (${urls.length} URL)\n`);
  let problems = 0;

  for (const url of urls) {
    try {
      const { data } = await sc.urlInspection.index.inspect({
        requestBody: { inspectionUrl: url, siteUrl: SITE_URL },
      });
      const r = data.inspectionResult || {};
      const idx = r.indexStatusResult || {};
      const verdict = idx.verdict || "?";
      const coverage = idx.coverageState || "";
      console.log(`${verdict === "PASS" ? "✓" : "✗"} ${url}`);
      console.log(`    index: ${verdict} — ${coverage}`);

      for (const rr of r.richResultsResult?.detectedItems ?? []) {
        for (const item of rr.items ?? []) {
          const issues = (item.issues ?? []).filter(
            (i) => i.severity === "ERROR",
          );
          if (issues.length) {
            problems++;
            console.log(`    rich [${rr.richResultType}] "${item.name}":`);
            for (const i of issues) console.log(`      ✗ ${i.issueMessage}`);
          }
        }
      }
      // be gentle with the 600 req/min quota
      await new Promise((r) => setTimeout(r, 150));
    } catch (e) {
      console.log(`✗ ${url}\n    API error: ${e.message}`);
    }
  }
  console.log(`\n${problems} problemów z wynikami z elementami rozszerzonymi.`);
  process.exit(problems ? 1 : 0);
}

async function queries() {
  const days = Number(flag("days", 28));
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);
  const fmt = (d) => d.toISOString().slice(0, 10);

  const { data } = await sc.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: fmt(start),
      endDate: fmt(end),
      dimensions: ["query"],
      rowLimit: 25,
    },
  });

  console.log(`\nTop zapytania — ${SITE_URL}  (${fmt(start)} → ${fmt(end)})\n`);
  console.log("clicks  impr   CTR    poz.  zapytanie");
  for (const row of data.rows ?? []) {
    console.log(
      `${String(row.clicks).padStart(6)} ${String(row.impressions).padStart(6)} ` +
        `${(row.ctr * 100).toFixed(1).padStart(5)}% ${row.position.toFixed(1).padStart(5)}  ${row.keys[0]}`,
    );
  }
}

if (MODE === "queries") await queries();
else await inspect();
