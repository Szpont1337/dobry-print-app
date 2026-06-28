#!/usr/bin/env node
/**
 * Pinguje IndexNow listą URL-i pobraną z sitemap — uruchamiać PO deployu
 * (gdy nowa wersja jest już live), aby wyszukiwarki (Bing, Yandex, Seznam,
 * Naver…) szybko odpytały zmienione strony.
 *
 * Uruchomienie:
 *   npm run seo:indexnow
 *   node scripts/indexnow.mjs
 *
 * Zmienne środowiskowe (wszystkie opcjonalne):
 *   INDEXNOW_SITE_URL    bazowy URL strony (domyślnie NEXT_PUBLIC_SITE_URL lub https://dobreprinty.pl)
 *   INDEXNOW_KEY         klucz IndexNow (domyślnie ten z public/<key>.txt)
 *   INDEXNOW_KEY_LOCATION pełny URL pliku klucza (domyślnie ${SITE_URL}/${KEY}.txt)
 *   INDEXNOW_SITEMAP_URL  skąd pobrać sitemap (domyślnie ${SITE_URL}/sitemap.xml)
 *   INDEXNOW_ENDPOINT    endpoint API (domyślnie https://api.indexnow.org/indexnow — agregator)
 *   INDEXNOW_DRY_RUN     gdy ustawione (=1) — nie wysyła, tylko wypisuje co poszłoby
 */

const SITE_URL = (
  process.env.INDEXNOW_SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://dobreprinty.pl"
).replace(/\/+$/, "");

const KEY = process.env.INDEXNOW_KEY || "04b109151a53412dbc3edc1c5dfd3b01";
const KEY_LOCATION =
  process.env.INDEXNOW_KEY_LOCATION || `${SITE_URL}/${KEY}.txt`;
const SITEMAP_URL =
  process.env.INDEXNOW_SITEMAP_URL || `${SITE_URL}/sitemap.xml`;
const ENDPOINT =
  process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";
const DRY_RUN = !!process.env.INDEXNOW_DRY_RUN;
const MAX_PER_REQUEST = 10000; // limit IndexNow na jedno żądanie

const HOST = new URL(SITE_URL).host;

async function fetchText(url, tries = 3) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, {
        headers: { "user-agent": "dobreprinty-indexnow/1.0" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} przy ${url}`);
      return await res.text();
    } catch (err) {
      lastErr = err;
      if (i < tries - 1) await sleep(800 * (i + 1));
    }
  }
  throw lastErr;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function extractLocs(xml) {
  const out = [];
  const re = /<loc>\s*([\s\S]*?)\s*<\/loc>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const value = m[1]
      .replace(/<!\[CDATA\[/g, "")
      .replace(/\]\]>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
    if (value) out.push(value);
  }
  return out;
}

/** Pobiera URL-e z sitemap; obsługuje też sitemap-index (zagnieżdżone mapy). */
async function collectUrls() {
  const rootXml = await fetchText(SITEMAP_URL);
  if (/<sitemapindex[\s>]/i.test(rootXml)) {
    const childMaps = extractLocs(rootXml);
    const all = [];
    for (const map of childMaps) {
      all.push(...extractLocs(await fetchText(map)));
    }
    return all;
  }
  return extractLocs(rootXml);
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function submit(urlList) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });
  const text = await res.text().catch(() => "");
  return { status: res.status, text };
}

// IndexNow tuż po pierwszej publikacji klucza zwraca 403 SiteVerificationNotCompleted,
// dopóki nie pobierze i nie zweryfikuje pliku klucza. To stan przejściowy.
function isPendingVerification(status, text) {
  return status === 403 && /SiteVerificationNotCompleted/i.test(text);
}

async function submitWithRetry(urlList, label) {
  const maxAttempts = 3; // pierwsza próba + 2 ponowienia (30 s, 60 s)
  let res;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    res = await submit(urlList);
    if (res.status === 200 || res.status === 202) return { state: "ok", res };
    if (isPendingVerification(res.status, res.text) && attempt < maxAttempts) {
      const wait = 30 * attempt;
      console.log(
        `[IndexNow] ${label}: weryfikacja klucza jeszcze w toku — ponawiam za ${wait}s (${attempt}/${maxAttempts - 1})…`,
      );
      await sleep(wait * 1000);
      continue;
    }
    break;
  }
  return {
    state: isPendingVerification(res.status, res.text) ? "pending" : "error",
    res,
  };
}

async function main() {
  console.log(
    `[IndexNow] host=${HOST} key=${KEY} endpoint=${ENDPOINT}${DRY_RUN ? " (DRY RUN)" : ""}`,
  );

  const raw = await collectUrls();
  const urls = [
    ...new Set(
      raw.filter((u) => {
        try {
          return new URL(u).host === HOST;
        } catch {
          return false;
        }
      }),
    ),
  ];

  console.log(
    `[IndexNow] sitemap: ${raw.length} <loc>, po deduplikacji i filtrze hosta: ${urls.length} URL-i`,
  );

  if (urls.length === 0) {
    console.error(
      "[IndexNow] Brak URL-i pasujących do hosta — sprawdź INDEXNOW_SITE_URL / sitemap. Przerywam.",
    );
    process.exit(1);
  }

  const batches = chunk(urls, MAX_PER_REQUEST);

  if (DRY_RUN) {
    console.log(
      `[IndexNow] DRY RUN — wysłałbym ${batches.length} paczek. Przykładowe URL-e:`,
    );
    for (const u of urls.slice(0, 5)) console.log("   •", u);
    return;
  }

  let hardError = false;
  let pending = false;
  for (let i = 0; i < batches.length; i++) {
    const label = `paczka ${i + 1}/${batches.length} (${batches[i].length} URL)`;
    const { state, res } = await submitWithRetry(batches[i], label);
    if (state === "ok") {
      console.log(`[IndexNow] ${label}: HTTP ${res.status} OK`);
    } else if (state === "pending") {
      console.warn(
        `[IndexNow] ${label}: HTTP ${res.status} — weryfikacja klucza jeszcze nieukończona. ` +
          "Zgłoszenie pominięte; uda się przy kolejnym deployu lub ręcznym uruchomieniu.",
      );
      pending = true;
    } else {
      console.error(
        `[IndexNow] ${label}: HTTP ${res.status} BŁĄD ${res.text.slice(0, 200)}`,
      );
      hardError = true;
    }
  }

  if (hardError) {
    console.error("[IndexNow] Część zgłoszeń nie powiodła się.");
    process.exit(1);
  }
  if (pending) {
    console.warn(
      "[IndexNow] Zakończono z ostrzeżeniem: weryfikacja klucza w toku (normalne tuż po " +
        "pierwszej publikacji). To nie jest błąd — kolejny deploy/uruchomienie dokończy zgłoszenie.",
    );
    return;
  }
  console.log(`[IndexNow] Zgłoszono ${urls.length} URL-i pomyślnie.`);
}

main().catch((err) => {
  console.error("[IndexNow] Błąd:", err?.message || err);
  process.exit(1);
});
