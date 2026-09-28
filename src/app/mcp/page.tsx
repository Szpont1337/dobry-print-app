import type { Metadata } from "next";
import Link from "next/link";

import { CopyButton } from "@/components/copy-button";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

/**
 * Strona docelowa serwera MCP: SEO (drukarnia w ChatGPT/Claude), GEO (fakty,
 * które asystenci mogą cytować) i AEO (FAQ z bezpośrednimi odpowiedziami +
 * JSON-LD SoftwareApplication / HowTo / FAQPage). Treść widoczna = treść w
 * schemacie, bo crawlery AI nie ufają danym, których nie ma na stronie.
 */
const BASE_URL = "https://www.dobreprinty.pl";
const URL = `${BASE_URL}/mcp`;
const MCP_URL = "https://drukalo.pl/api/mcp";
// Deep-link do zakładki konektorów/aplikacji w ustawieniach ChatGPT (hash otwiera modal ustawień).
const CHATGPT_URL = "https://chatgpt.com/#settings/Connectors";
/**
 * Deep-link claude.ai: otwiera okno „Dodaj własny konektor" z wpisaną nazwą
 * i adresem (użytkownik tylko zatwierdza). Parametry występują w dwóch
 * wersjach w dokumentacji/społeczności — podajemy obie, nieznane są ignorowane.
 */
function claudeAddConnectorUrl(name: string, mcpUrl: string): string {
  const q = new URLSearchParams({
    modal: "add-custom-connector",
    connectorName: name,
    connectorUrl: mcpUrl,
    mcpName: name,
    mcpServerUrl: mcpUrl,
  });
  return `https://claude.ai/customize/connectors?${q.toString()}`;
}

export const metadata: Metadata = {
  title: "Drukarnia w ChatGPT i Claude (serwer MCP) — drukuj grafiki z AI | DobrePrinty",
  description:
    "Darmowy serwer MCP drukarni DobrePrinty: podłącz do ChatGPT lub Claude i zamawiaj druk z czatu. Asystent generuje grafikę ze spadami i w 300 dpi, pokazuje podgląd wydruku, wycenia i daje link do zamówienia. Bez konta.",
  keywords: [
    "MCP drukarnia",
    "drukarnia w ChatGPT",
    "drukarnia Claude MCP",
    "druk grafiki z ChatGPT",
    "jak wydrukować grafikę z AI",
    "wizytówki ChatGPT",
    "serwer MCP druk online",
    "Model Context Protocol drukarnia",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "Drukarnia w ChatGPT i Claude — serwer MCP DobrePrinty",
    description:
      "Podłącz DobrePrinty do asystenta AI: grafika pod druk, podgląd wydruku, cena i link do zamówienia prosto z czatu.",
    url: URL,
    siteName: "DobrePrinty",
    type: "website",
  },
};

const TOOLS: { name: string; desc: string }[] = [
  { name: "list_products", desc: "katalog produktów, formaty, opcje, minimalny nakład" },
  { name: "get_print_spec", desc: "wymiary, spady, piksele przy 300 dpi, CMYK, formaty plików" },
  { name: "design_prompt", desc: "prompt do wygenerowania grafiki o właściwych proporcjach" },
  { name: "mockup_prompt", desc: "prompt do podglądu, jak wydruk będzie wyglądał" },
  { name: "quote", desc: "cena z dostawą i progi nakładu" },
  {
    name: "create_order_link",
    desc: "link do koszyka z ustawionym produktem, formatem i nakładem",
  },
];

const EXAMPLES = [
  "Zaprojektuj mi wizytówkę dla kancelarii prawnej Jan Kowalski, tel. 600 000 000, i wyceń 500 sztuk w DobrePrinty.",
  "Zrób plakat A2 na koncert charytatywny 14 listopada w Gdańsku i pokaż, jak będzie wyglądał na ścianie.",
  "Ile kosztuje 1000 ulotek DL dwustronnych z dostawą? Daj link do zamówienia.",
];

const CHATGPT_STEPS = [
  "Kliknij „Otwórz ustawienia ChatGPT” (albo Ustawienia → Aplikacje) → Ustawienia zaawansowane → włącz Tryb dewelopera (wymaga planu Plus lub Pro).",
  "Utwórz konektor: nazwa drukalo, adres serwera MCP, uwierzytelnianie: OAuth (zalogujesz się kodem z e-maila).",
  "W nowym czacie wybierz drukalo w narzędziach i opisz, co chcesz wydrukować.",
];

const CLAUDE_STEPS = [
  "Kliknij „Dodaj do Claude” (plan Pro lub Max) — claude.ai otworzy okno z wpisaną nazwą i adresem konektora; zatwierdź.",
  "Ręcznie: Dostosuj → Konektory → Dodaj własny konektor → wklej adres serwera MCP.",
  "W czacie użyj polecenia /zaprojektuj-i-zamow albo napisz, co drukujesz.",
];

const PROCESS = [
  "Mówisz asystentowi, co drukujesz i dla kogo.",
  "Asystent pobiera specyfikację (np. wizytówka 85 × 55 mm + 3 mm spadu = 1075 × 720 px w 300 dpi) i generuje grafikę.",
  "Pokazuje podgląd wydruku na prawdziwym materiale i cenę.",
  "Dostajesz link, otwierasz go, wgrywasz grafikę i płacisz. Produkcja 24–48 h, dostawa kurierem.",
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Czy ChatGPT może zaprojektować i zamówić wizytówki?",
    a: "Tak. Po podłączeniu serwera MCP DobrePrinty ChatGPT pobiera specyfikację wizytówki (85 × 55 mm, 3 mm spadu, 300 dpi), generuje grafikę o właściwych proporcjach, wycenia nakład i tworzy link do zamówienia. Samo zamówienie i płatność wykonujesz na stronie DobrePrinty — asystent nie ma dostępu do Twoich danych ani karty.",
  },
  {
    q: "Czym jest konektor drukalo i dlaczego DobrePrinty go używa?",
    a: "DobrePrinty i drukalo to jedna firma z jedną produkcją. Serwer MCP (Model Context Protocol) stoi pod adresem drukalo.pl/api/mcp i udostępnia sześć narzędzi: katalog produktów, specyfikację pliku do druku, prompt do grafiki, prompt do podglądu wydruku, wycenę i link do zamówienia. Zamówienie z czatu realizujesz w drukalo.pl — tak samo pakujemy i wysyłamy.",
  },
  {
    q: "Czy serwer MCP DobrePrinty działa z Claude?",
    a: "Tak. Przycisk „Dodaj do Claude” na tej stronie otwiera claude.ai z wpisanym adresem konektora (plan Pro lub Max); w Claude Code wystarczy jedno polecenie claude mcp add. Działa też w każdym innym kliencie MCP: Cursor, VS Code, Windsurf, Zed.",
  },
  {
    q: "Czy potrzebuję konta, logowania albo klucza API?",
    a: "ChatGPT loguje Cię kodem z e-maila (konto drukalo powstaje automatycznie). Claude i inne klienty MCP działają bez logowania. Klucz API nie jest potrzebny.",
  },
  {
    q: "Ile kosztuje korzystanie z MCP DobrePrinty?",
    a: "Serwer jest bezpłatny. Płacisz wyłącznie za wydruk, w cenie widocznej w narzędziu quote i na stronie zamówienia — bez ukrytych opłat.",
  },
  {
    q: "Jak wydrukować grafikę wygenerowaną przez AI, żeby wyszła dobrze?",
    a: "Grafika musi mieć proporcje formatu ze spadami, minimum 300 dpi w rozmiarze docelowym i kolory bezpieczne dla CMYK. Narzędzie get_print_spec podaje dokładne wymiary w mm i pikselach, a design_prompt buduje prompt, który tego pilnuje — tekst trzyma w strefie bezpiecznej 3 mm od linii cięcia.",
  },
  {
    q: "Czy asystent składa zamówienie i płaci za mnie?",
    a: "Nie. Asystent przygotowuje link z gotową konfiguracją (produkt, format, nakład, opcje). Ty otwierasz link, wgrywasz plik, podajesz adres i płacisz online. Nic nie dzieje się bez Twojego kliknięcia.",
  },
  {
    q: "Jakie produkty można zamówić przez MCP?",
    a: "Wszystkie z oferty drukalo: wizytówki, ulotki, składane ulotki, plakaty, roll-upy, banery, naklejki, tablice, papier firmowy, kartki, broszury, koszulki i torby. Katalog w narzędziu list_products jest zawsze zgodny ze sklepem.",
  },
  {
    q: "Czy serwer zapisuje moje rozmowy lub projekty?",
    a: "Nie. Serwer jest bezstanowy: odpowiada na pytanie o specyfikację, cenę lub link i niczego nie przechowuje. Plik z grafiką trafia do drukarni dopiero, gdy sam wgrasz go na stronie zamówienia.",
  },
];

const h2 = "font-sans text-2xl font-semibold tracking-tight text-foreground";
const p = "mt-3 text-base text-muted-foreground";
const code = "rounded bg-accent px-1.5 py-0.5 font-mono text-sm text-foreground";
const ol = "mt-4 list-decimal space-y-2 pl-5 text-base text-muted-foreground";

function howTo(id: string, name: string, steps: string[], mcpUrl: string) {
  return {
    "@type": "HowTo",
    "@id": `${URL}#${id}`,
    name,
    totalTime: "PT2M",
    tool: [{ "@type": "HowToTool", name: `Adres serwera MCP: ${mcpUrl}` }],
    step: steps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: `Krok ${i + 1}`,
      text,
    })),
  };
}

export default function McpPage() {
  // DobrePrinty i drukalo to jedna firma: wspólny serwer MCP stoi na drukalo.pl.
  const claudeCodeCmd = `claude mcp add --transport http drukalo ${MCP_URL}`;
  const claudeAddUrl = claudeAddConnectorUrl("drukalo", MCP_URL);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${URL}#webpage`,
        url: URL,
        name: "Drukarnia w ChatGPT i Claude — serwer MCP DobrePrinty",
        description: metadata.description,
        about: { "@id": `${BASE_URL}/#organization` },
        mainEntity: { "@id": `${URL}#app` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Strona główna", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: "DobrePrinty w ChatGPT i Claude", item: URL },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${URL}#app`,
        name: "DobrePrinty MCP — drukarnia w ChatGPT i Claude",
        alternateName: "dobreprinty-print MCP server",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Model Context Protocol server",
        operatingSystem: "Web (ChatGPT, Claude, Claude Code, Cursor, VS Code)",
        url: URL,
        installUrl: MCP_URL,
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "PLN" },
        featureList: TOOLS.map((t) => `${t.name}: ${t.desc}`),
        provider: { "@id": `${BASE_URL}/#organization` },
        description:
          "Serwer MCP drukarni internetowej DobrePrinty: specyfikacja pliku do druku, prompt do grafiki i mockupu, wycena i link do zamówienia dla asystentów AI.",
      },
      howTo("howto-chatgpt", "Jak podłączyć DobrePrinty do ChatGPT", CHATGPT_STEPS, MCP_URL),
      howTo("howto-claude", "Jak podłączyć DobrePrinty do Claude", CLAUDE_STEPS, MCP_URL),
      {
        "@type": "FAQPage",
        "@id": `${URL}#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="relative flex flex-1 flex-col bg-background">
      <Header />

      <section className="relative isolate overflow-hidden bg-gradient-to-b from-accent/40 via-background to-background pt-36 pb-12 sm:pt-40 sm:pb-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <nav
            aria-label="Okruszki"
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link href="/" className="transition-colors hover:text-primary">
              Strona główna
            </Link>
            <span aria-hidden>›</span>
            <span className="text-foreground">DobrePrinty w ChatGPT i Claude</span>
          </nav>
          <h1 className="mt-6 font-sans text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Drukarnia w ChatGPT i Claude: projektuj i zamawiaj druk z czatu
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            DobrePrinty korzysta z konektora drukalo (jedna firma, jedna produkcja). Podłącz go do
            swojego asystenta AI, a ten dobierze format, wygeneruje grafikę ze spadami pod nasz
            druk, pokaże podgląd wydruku, poda cenę i link do zamówienia. Bez konta, bez logowania,
            bez klucza API.
          </p>
          <p className="mt-6">
            <span className="text-sm text-muted-foreground">Adres serwera MCP:</span>{" "}
            <code className={code}>{MCP_URL}</code>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CopyButton
              text={MCP_URL}
              label="Kopiuj adres serwera"
              copiedLabel="Skopiowano"
              variant="default"
            />
            <Button asChild variant="outline">
              <a href={CHATGPT_URL} target="_blank" rel="noreferrer">
                Otwórz ustawienia ChatGPT
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={claudeAddUrl} target="_blank" rel="noreferrer">
                Dodaj do Claude
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background pb-12">
        <div className="mx-auto max-w-3xl space-y-12 px-6 lg:px-10">
          <div>
            <h2 className={h2}>Co to jest konektor drukalo</h2>
            <p className={p}>
              MCP (Model Context Protocol) to otwarty standard, przez który ChatGPT, Claude i inne
              asystenty korzystają z zewnętrznych narzędzi. DobrePrinty i drukalo to jedna firma,
              więc używamy wspólnego serwera na drukalo.pl. Daje on asystentowi dostęp do katalogu,
              specyfikacji plików, wyceny i linku do zamówienia. Grafikę generujesz w swoim
              asystencie, a my pilnujemy, żeby nadawała się do druku: właściwe proporcje, 3 mm
              spadu, 300 dpi, kolory bezpieczne dla CMYK.
            </p>
          </div>

          <div>
            <h2 className={h2}>ChatGPT</h2>
            <ol className={ol}>
              {CHATGPT_STEPS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <div className="mt-5 flex flex-wrap gap-3">
              <CopyButton text={MCP_URL} label="Kopiuj adres serwera" copiedLabel="Skopiowano" />
              <Button asChild variant="outline">
                <a href={CHATGPT_URL} target="_blank" rel="noreferrer">
                  Otwórz ustawienia ChatGPT
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h2 className={h2}>Claude</h2>
            <ol className={ol}>
              {CLAUDE_STEPS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="default">
                <a href={claudeAddUrl} target="_blank" rel="noreferrer">
                  Dodaj do Claude
                </a>
              </Button>
              <CopyButton text={MCP_URL} label="Kopiuj adres serwera" copiedLabel="Skopiowano" />
            </div>
            <p className={p}>
              Claude Code: <code className={code}>{claudeCodeCmd}</code>
            </p>
            <div className="mt-3">
              <CopyButton text={claudeCodeCmd} label="Kopiuj komendę" copiedLabel="Skopiowano" />
            </div>
          </div>

          <div>
            <h2 className={h2}>Przykładowe polecenia</h2>
            <ul className="mt-4 space-y-3">
              {EXAMPLES.map((e) => (
                <li
                  key={e}
                  className="rounded-lg border border-border bg-card px-4 py-3 text-base text-foreground"
                >
                  „{e}”
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={h2}>Co potrafi</h2>
            <ul className="mt-4 space-y-2 text-base text-muted-foreground">
              {TOOLS.map((t) => (
                <li key={t.name}>
                  <code className={code}>{t.name}</code> — {t.desc}
                </li>
              ))}
            </ul>
            <p className={p}>
              Asystent nie składa zamówienia i nie ma dostępu do Twoich danych. Dostajesz link do
              koszyka z gotową konfiguracją, wgrywasz plik i płacisz na stronie. Grafikę generujesz
              w swoim asystencie (ChatGPT, Gemini, Midjourney), my dajemy prompt z właściwymi
              proporcjami i zasadami druku.
            </p>
          </div>

          <div>
            <h2 className={h2}>Jak wygląda cały proces</h2>
            <ol className={ol}>
              {PROCESS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className={h2}>Najczęstsze pytania</h2>
            <dl className="mt-4 space-y-6">
              {FAQ.map((f) => (
                <div key={f.q}>
                  <dt className="text-base font-semibold text-foreground">{f.q}</dt>
                  <dd className="mt-1 text-base text-muted-foreground">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-3xl border border-border bg-card px-6 py-8 sm:px-10">
            <h2 className={h2}>Wolisz bez asystenta?</h2>
            <p className={p}>
              Poradnik krok po kroku, jak przygotować grafikę z ChatGPT do druku ręcznie:{" "}
              <Link
                href="/blog/jak-wydrukowac-grafike-z-chatgpt"
                className="text-primary underline-offset-4 hover:underline"
              >
                Jak wydrukować grafikę z ChatGPT
              </Link>
              . Albo od razu{" "}
              <Link href="/#produkty" className="text-primary underline-offset-4 hover:underline">
                wybierz produkt
              </Link>{" "}
              i wgraj plik w konfiguratorze.
            </p>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
