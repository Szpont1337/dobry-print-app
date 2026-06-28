// SEO validation: crawl sitemap and check each URL for the SEO signals that
// matter for Google indexing + rich results. No browser needed — raw HTML only.
//
// Usage:
//   bun run seo:check                      # checks production (https://dobreprinty.pl)
//   SEO_BASE_URL=http://localhost:3000 bun run seo:check
//   bun run seo:check -- --limit 20        # only first 20 sitemap URLs
//   bun run seo:check -- --json            # machine-readable output
//
// Exit code 1 if any ERROR-level problem is found (CI-friendly).

import { XMLParser } from "fast-xml-parser";

const BASE_URL = (process.env.SEO_BASE_URL || "https://dobreprinty.pl").replace(
  /\/$/,
  "",
);
const args = process.argv.slice(2);
const LIMIT = (() => {
  const i = args.indexOf("--limit");
  return i !== -1 ? Number(args[i + 1]) : Infinity;
})();
const JSON_OUT = args.includes("--json");
const CONCURRENCY = 8;

const TITLE_MAX = 60;
const DESC_MIN = 50;
const DESC_MAX = 160;

/** Pull every <script type="application/ld+json"> payload out of raw HTML. */
function extractJsonLd(html) {
  const blocks = [];
  const re =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      blocks.push(JSON.parse(m[1].trim()));
    } catch {
      blocks.push({ __parseError: true });
    }
  }
  return blocks;
}

/** Walk a JSON-LD tree and collect every node whose @type includes "Product". */
function collectProducts(node, out = []) {
  if (Array.isArray(node)) {
    for (const n of node) collectProducts(n, out);
    return out;
  }
  if (node && typeof node === "object") {
    const t = node["@type"];
    const types = Array.isArray(t) ? t : [t];
    if (types.includes("Product")) out.push(node);
    for (const v of Object.values(node)) collectProducts(v, out);
  }
  return out;
}

const attr = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : null;
};
const has = (html, re) => re.test(html);

function checkUrl(url, html, status) {
  const errors = [];
  const warnings = [];

  if (status !== 200) errors.push(`HTTP ${status}`);

  const title = attr(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!title) errors.push("brak <title>");
  else if (title.length > TITLE_MAX)
    warnings.push(`title ${title.length} zn. (>${TITLE_MAX})`);

  const desc = attr(
    html,
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
  );
  if (!desc) errors.push("brak meta description");
  else if (desc.length < DESC_MIN || desc.length > DESC_MAX)
    warnings.push(
      `description ${desc.length} zn. (cel ${DESC_MIN}-${DESC_MAX})`,
    );

  const canonical = attr(
    html,
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i,
  );
  if (!canonical) warnings.push("brak rel=canonical");

  const robots = attr(
    html,
    /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i,
  );
  if (robots && /noindex/i.test(robots)) warnings.push(`robots: ${robots}`);

  if (!has(html, /<meta[^>]+property=["']og:title["']/i))
    warnings.push("brak og:title");
  if (!has(html, /<meta[^>]+property=["']og:image["']/i))
    warnings.push("brak og:image");

  // --- JSON-LD / rich results: the exact GSC rule ---
  const ld = extractJsonLd(html);
  if (ld.some((b) => b.__parseError))
    errors.push("niepoprawny JSON-LD (parse error)");

  const products = ld.flatMap((b) => collectProducts(b));
  for (const p of products) {
    const name = p.name || "(bez nazwy)";
    const hasRating = !!p.aggregateRating;
    const hasReview = !!p.review;
    const hasOffers = !!p.offers;
    if (!hasOffers && !hasReview && !hasRating) {
      errors.push(`Product "${name}": brak offers/review/aggregateRating`);
      continue;
    }
    // If offers exists, validate the shape Google requires.
    if (hasOffers) {
      const o = p.offers;
      const list = Array.isArray(o) ? o : [o];
      for (const off of list) {
        const t = off["@type"];
        if (t === "AggregateOffer") {
          if (off.lowPrice == null || Number.isNaN(Number(off.lowPrice)))
            errors.push(`Product "${name}": AggregateOffer bez lowPrice`);
          if (!off.priceCurrency)
            errors.push(`Product "${name}": offers bez priceCurrency`);
        } else if (t === "Offer") {
          if (off.price == null)
            errors.push(`Product "${name}": Offer bez price`);
          if (!off.priceCurrency)
            errors.push(`Product "${name}": offers bez priceCurrency`);
        }
      }
    }
  }

  return { url, status, productCount: products.length, errors, warnings };
}

async function fetchUrls(urls) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < urls.length) {
      const url = urls[i++];
      try {
        const res = await fetch(url, {
          redirect: "manual",
          headers: { "user-agent": "dobreprinty-seo-check" },
        });
        const html = res.status === 200 ? await res.text() : "";
        results.push(checkUrl(url, html, res.status));
      } catch (e) {
        if (process.env.SEO_DEBUG) console.error(e.stack);
        results.push({
          url,
          status: 0,
          productCount: 0,
          errors: [`fetch failed: ${e.message}`],
          warnings: [],
        });
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return results;
}

async function getSitemapUrls() {
  const res = await fetch(`${BASE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml -> HTTP ${res.status}`);
  const xml = await res.text();
  const parsed = new XMLParser().parse(xml);
  // Handle both <urlset> and <sitemapindex> (nested sitemaps).
  if (parsed.sitemapindex) {
    const maps = [].concat(parsed.sitemapindex.sitemap).map((s) => s.loc);
    const all = [];
    for (const map of maps) {
      const r = await fetch(map);
      const x = new XMLParser().parse(await r.text());
      all.push(...[].concat(x.urlset?.url ?? []).map((u) => u.loc));
    }
    return all;
  }
  return [].concat(parsed.urlset?.url ?? []).map((u) => u.loc);
}

// --- run ---
const started = Date.now();
let urls = await getSitemapUrls();
urls = urls.filter(Boolean).slice(0, LIMIT);

const results = await fetchUrls(urls);
const withErrors = results.filter((r) => r.errors.length);
const withWarnings = results.filter((r) => r.warnings.length);

if (JSON_OUT) {
  console.log(JSON.stringify({ base: BASE_URL, results }, null, 2));
} else {
  console.log(`\nSEO check — ${BASE_URL}  (${urls.length} URL)\n`);
  for (const r of results) {
    if (!r.errors.length && !r.warnings.length) continue;
    console.log(r.url);
    for (const e of r.errors) console.log(`  ✗ ${e}`);
    for (const w of r.warnings) console.log(`  ! ${w}`);
  }
  const totalProducts = results.reduce((a, r) => a + r.productCount, 0);
  console.log(
    `\n${urls.length} URL · ${totalProducts} produktów w JSON-LD · ` +
      `${withErrors.length} z błędami · ${withWarnings.length} z ostrzeżeniami · ` +
      `${((Date.now() - started) / 1000).toFixed(1)}s`,
  );
}

process.exit(withErrors.length ? 1 : 0);
