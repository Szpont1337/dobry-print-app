import { CheckCircle2, ClipboardCheck, CreditCard, Truck } from "lucide-react";
import Link from "next/link";

import { FilePrepBadge } from "@/components/file-prep-badge";
import { Header } from "@/components/header";
import { ProductMockup } from "@/components/product-mockup";
import {
  Breadcrumbs,
  Button,
  Container,
  Eyebrow,
  Section,
  SectionHeader,
} from "@/components/ui";
import type { Miasto } from "@/data/miasta";
import { robotsForMiasto } from "@/lib/miasta-seo";
import type { Product } from "@/lib/products";
import { visibleProducts as products } from "@/lib/products";
import { getProductContent } from "@/lib/products-content";

export const BASE_URL = "https://dobreprinty.pl";

function formatPopulacja(populacja: number): string {
  return new Intl.NumberFormat("pl-PL").format(populacja);
}

/** Składa listę pozycji w naturalny polski ciąg „a, b oraz c". */
function listToProse(items: string[] | undefined, max = 4): string | null {
  if (!items || items.length === 0) return null;
  const slice = items.slice(0, max);
  if (slice.length === 1) return slice[0];
  return `${slice.slice(0, -1).join(", ")} oraz ${slice[slice.length - 1]}`;
}

function tierBranze(miasto: Miasto): string[] {
  if (miasto.populacja >= 200000) {
    return [
      "korporacje i centra usług wspólnych",
      "agencje kreatywne i marketingowe",
      "kancelarie prawne i biura doradcze",
      "sieci HoReCa i franczyzy gastronomiczne",
      "uczelnie i instytuty badawcze",
      "deweloperzy i biura nieruchomości",
      "organizatorzy targów i konferencji",
    ];
  }
  if (miasto.populacja >= 50000) {
    return [
      "lokalne sieci handlowe i detalistów",
      "agencje reklamowe i studia projektowe",
      "restauracje, kawiarnie i hotele",
      "kancelarie prawne i biura księgowe",
      "kluby fitness, salony urody i SPA",
      "biura nieruchomości i deweloperzy",
      "organizatorzy eventów lokalnych",
    ];
  }
  return [
    "sklepy stacjonarne i osiedlowe punkty usługowe",
    "lokale gastronomiczne i pensjonaty",
    "gabinety lekarskie i kosmetyczne",
    "warsztaty samochodowe i punkty serwisowe",
    "stowarzyszenia, parafie i szkoły",
    "rolnicy, sady i sklepy z lokalnymi produktami",
    "organizatorzy lokalnych imprez i festynów",
  ];
}

/**
 * Kafelki „Dla kogo". Najpierw realne, ręcznie opisane branże danego miasta
 * (unikalność per miasto), uzupełnione domyślnymi z progu populacji do max 7,
 * żeby siatka nie była rzadka. Miasta bez `branze` dostają same domyślne.
 */
function buildBranze(miasto: Miasto): string[] {
  const tier = tierBranze(miasto);
  if (!miasto.branze || miasto.branze.length === 0) return tier;
  const merged = [...miasto.branze];
  for (const t of tier) {
    if (merged.length >= 7) break;
    if (!merged.includes(t)) merged.push(t);
  }
  return merged;
}

function buildSteps(miasto: Miasto, product: Product) {
  return [
    {
      icon: ClipboardCheck,
      title: `Skonfiguruj ${product.name.toLowerCase()} online`,
      body: `Wybierz format, nakład i papier w naszym konfiguratorze. Cena brutto z VAT pokazuje się od razu, bez czekania na ofertę handlowca. Dla firm z ${miasto.nazwa} obowiązują te same warunki, co dla reszty Polski.`,
    },
    {
      icon: CreditCard,
      title: "Wgraj plik i opłać zamówienie",
      body: `Załaduj PDF — przygotowanie pliku do druku i kontrolę techniczną (spady, rozdzielczość, CMYK) masz w cenie, drobne poprawki nanosimy bez dopłat. Płatność przelewem online lub kartą. Powyżej 3 000 zł netto dostępna jest faktura proforma z 14-dniowym terminem zapłaty.`,
    },
    {
      icon: Truck,
      title: `Odbierz przesyłkę w ${miasto.nazwa}`,
      body: `Drukarnia partnerska rusza z produkcją w 24 h od zatwierdzenia pliku, kurier dokłada zwykle 1 dzień roboczy. Przesyłka trafia pod podany adres w ${miasto.wojewodztwo} bez konieczności odbioru w punkcie.`,
    },
  ];
}

function buildLocalFaqs(miasto: Miasto, product: Product) {
  const keyword = product.name.toLowerCase();
  return [
    {
      question: `Ile kosztuje druk ${keyword} w ${miasto.nazwa}?`,
      answer: `Cena ${keyword} dla firm z ${miasto.nazwa} jest taka sama jak w innych miastach Polski — DobrePrinty prowadzi cennik ogólnopolski. ${product.name} w podstawowej specyfikacji startują od ${Math.min(
        ...product.formats.map((f) => f.unitPrice),
      ).toFixed(
        2,
      )} zł netto za sztukę przy większych nakładach. Dokładna kwota brutto z VAT pojawia się w konfiguratorze po wybraniu formatu, nakładu i wykończenia. Dostawa kurierem do ${miasto.nazwa} wliczona w cenę dla zamówień powyżej 200 zł brutto.`,
    },
    {
      question: `Jak długo trwa dostawa ${keyword} do ${miasto.nazwa}?`,
      answer: `Produkcja standardowych zamówień ${keyword} trwa 24–48 h od zatwierdzenia pliku, dostawa kurierem do ${miasto.nazwa} to zwykle kolejny dzień roboczy. Zamówienie złożone we wtorek przed południem trafia pod adres w ${miasto.wojewodztwo} w czwartek lub piątek. Wykończenia (folia, lakier UV, tłoczenie) wydłużają termin o dodatkowe 24–72 h.`,
    },
    {
      question: `Czy przygotowanie pliku ${keyword} do druku jest płatne?`,
      answer: `Nie. Przygotowanie pliku ${keyword} do druku i kontrola techniczna (spady, rozdzielczość, tryb kolorów CMYK, osadzenie fontów) są w cenie każdego zamówienia dla firm z ${miasto.nazwa} — bez dopłat. Drobne poprawki techniczne nanosimy bezpłatnie, a jeśli plik wymaga Twojej decyzji, wstrzymujemy druk i kontaktujemy się przed produkcją. Do każdego produktu udostępniamy też darmowy szablon z liniami cięcia i spadami.`,
    },
    {
      question: `Czy mogę odebrać ${keyword} osobiście w ${miasto.nazwa}?`,
      answer: `Nie. DobrePrinty nie ma stacjonarnego punktu w ${miasto.nazwa} — pracujemy w modelu online z 28 zweryfikowanymi drukarniami partnerskimi. Druk realizuje wybrany partner, a kurier dostarcza paczkę pod podany adres zwykle następnego dnia po wysyłce. Dla firm z ${miasto.nazwa} dostępna jest dostawa pod konkretną godzinę za dopłatą 25 zł.`,
    },
  ];
}

function buildLeadSentences(miasto: Miasto, product: Product): string {
  const keyword = product.name.toLowerCase();
  const dzielniceProse = listToProse(miasto.dzielnice, 4);
  const dzielniceZdanie = dzielniceProse
    ? ` Dowozimy do wszystkich dzielnic — od ${dzielniceProse}.`
    : "";
  return `${product.name} dla firm z ${miasto.nazwa} drukujemy w pełnym katalogu DobrePrinty: od mikronakładów po zamówienia produkcyjne. ${miasto.opis_krotki}${dzielniceZdanie} Sieć 28 drukarni partnerskich pozwala dobrać partnera, który dla Twojego zamówienia ${keyword} zrobi to najszybciej i najbardziej opłacalnie — z dostawą kurierem do ${miasto.wojewodztwo} w 24–48 h.`;
}

function buildSeoParagraph(miasto: Miasto, product: Product): string {
  const keyword = product.name.toLowerCase();
  const populacjaTekst = formatPopulacja(miasto.populacja);
  const branzeProse = listToProse(miasto.branze, 3);
  const branzeZdanie = branzeProse
    ? ` Po ${keyword} sięgają u nas w ${miasto.nazwa} przede wszystkim ${branzeProse}.`
    : "";
  const landmarkiProse = listToProse(miasto.landmarki, 3);
  const landmarkiZdanie = landmarkiProse
    ? ` Druk ${keyword} dostarczamy pod adresy w całym mieście — także w okolicach takich miejsc jak ${landmarkiProse}.`
    : "";
  const uczelnieProse = listToProse(miasto.uczelnie, 3);
  const uczelnieZdanie = uczelnieProse
    ? ` Stałą grupą zamawiających są też uczelnie i koła naukowe (${uczelnieProse}), dla których drukujemy materiały konferencyjne, dydaktyczne i promocyjne.`
    : "";
  return `Druk ${keyword} ${miasto.nazwa} to popularne zapytanie wśród firm szukających lokalnej drukarni online. ${miasto.nazwa} liczy ok. ${populacjaTekst} mieszkańców, a rynek B2B w ${miasto.wojewodztwo} regularnie zamawia ${keyword} na potrzeby marketingu, sprzedaży i obsługi klientów.${branzeZdanie}${landmarkiZdanie}${uczelnieZdanie} DobrePrinty realizuje druk ${keyword} dla ${miasto.nazwa} w modelu online: konfigurator z ceną brutto z VAT, przygotowanie pliku do druku i kontrola techniczna w cenie (drobne poprawki bez dopłat), produkcja w 24–48 h, dostawa kurierem pod wskazany adres. Tania drukarnia ${keyword} ${miasto.nazwa} nie musi oznaczać kompromisu jakościowego — każdy partner z naszej sieci przechodzi kwartalny audyt jakości druku i terminowości. ${product.name} z DobrePrinty trafiają do firm z ${miasto.nazwa} z gwarancją reklamacji obsługiwanej przez nas, nie odsyłanej do drukarni.`;
}

export function CityProductPageContent({
  miasto,
  product,
}: {
  miasto: Miasto;
  product: Product;
}) {
  const content = getProductContent(product.slug);
  const url = `${BASE_URL}/drukarnia-${miasto.slug}/${product.slug}`;
  const cityUrl = `${BASE_URL}/drukarnia-${miasto.slug}`;
  const productUrl = `${BASE_URL}/produkty/${product.slug}`;
  const keyword = product.name.toLowerCase();
  const lowestPrice = Math.min(
    ...product.formats.map((f) => f.unitPrice),
  ).toFixed(2);

  const branze = buildBranze(miasto);
  const steps = buildSteps(miasto, product);
  const faqs = buildLocalFaqs(miasto, product);
  const lead = buildLeadSentences(miasto, product);
  const seoParagraph = buildSeoParagraph(miasto, product);
  const innerProducts = products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 2);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${url}#localbusiness`,
        name: `DobrePrinty, ${product.name} ${miasto.nazwa}`,
        description: `${product.name} dla firm z ${miasto.nazwa}. Druk online z dostawą 24–48 h, cena z VAT od razu, 28 drukarni partnerskich w sieci DobrePrinty.`,
        url,
        email: "hej@dobreprinty.pl",
        priceRange: "29 zł – 4 500 zł",
        areaServed: {
          "@type": "City",
          name: miasto.nazwa,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: `województwo ${miasto.wojewodztwo}`,
          },
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "PL",
          addressRegion: miasto.wojewodztwo,
          addressLocality: miasto.nazwa,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "DobrePrinty",
            item: `${BASE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `Drukarnia ${miasto.nazwa}`,
            item: cityUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <main className="relative flex flex-1 flex-col bg-background">
      <Header />

      <section className="relative isolate overflow-hidden bg-gradient-to-b from-accent/40 via-background to-background pt-8 pb-13 sm:pt-13 sm:pb-21">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(0,0,0,0.04)_0%,_transparent_60%)]"
        />
        <Container>
          <Breadcrumbs
            items={[
              { label: "DobrePrinty", href: "/" },
              {
                label: `Drukarnia ${miasto.nazwa}`,
                href: `/drukarnia-${miasto.slug}`,
              },
              { label: product.name },
            ]}
          />

          <div className="mt-6 grid items-end gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-13">
            <div>
              <Eyebrow className="font-mono">
                Druk {keyword} w {miasto.nazwa}
              </Eyebrow>
              <h1 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
                {product.name} dla firm z{" "}
                <span className="text-primary">{miasto.nazwa}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
                {lead}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  href={`/produkty/${product.slug}#konfigurator`}
                  variant="primary"
                  size="lg"
                >
                  Skonfiguruj {keyword} <span aria-hidden>→</span>
                </Button>
              </div>

              <FilePrepBadge className="mt-4" />
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--color-accent)_0%,_transparent_65%)] opacity-70"
              />
              <div className="grid place-items-center rounded-lg border border-border bg-card p-10">
                <ProductMockup
                  variant={product.variant}
                  className="h-48 w-48 sm:h-56 sm:w-56"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section spacing="md">
        <SectionHeader
          index="01"
          eyebrow="Dla kogo"
          title={
            <>
              Kto zamawia {keyword} w{" "}
              <span className="text-primary">{miasto.nazwa}</span>
            </>
          }
          description={`${product.name} w ${miasto.nazwa} drukujemy regularnie dla następujących branż i typów organizacji:`}
        />

        <ul className="mt-8 grid border-l border-t border-border sm:grid-cols-2">
          {branze.map((branza) => (
            <li
              key={branza}
              className="flex items-start gap-3 border-r border-b border-border p-4 transition-colors hover:bg-secondary/50"
            >
              <CheckCircle2
                aria-hidden
                className="mt-0.5 size-5 shrink-0 text-primary"
                strokeWidth={2}
              />
              <span className="text-sm text-foreground sm:text-base">
                {branza}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section alt spacing="md">
        <SectionHeader
          index="02"
          eyebrow="Proces"
          title={
            <>
              Jak zamówić {keyword} w{" "}
              <span className="text-primary">{miasto.nazwa}</span>
            </>
          }
        />

        <ol className="mt-8 grid border-l border-t border-border sm:grid-cols-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="flex h-full flex-col border-r border-b border-border p-6 transition-colors hover:bg-secondary/50"
              >
                <span className="grid size-11 place-items-center rounded-lg bg-secondary text-primary">
                  <Icon aria-hidden className="size-5" strokeWidth={2.2} />
                </span>
                <span className="mt-4 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                  Krok {idx + 1}
                </span>
                <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section spacing="md">
        <SectionHeader
          index="03"
          eyebrow="Specyfikacja i ceny"
          title={`Cennik ${keyword} dla ${miasto.nazwa}`}
          description="Standardowy cennik w DobrePrinty, identyczny dla wszystkich miast Polski. Cena netto za sztukę przy nakładach standardowych. Wycena dokładna w konfiguratorze."
        />

        <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-left text-sm sm:text-base">
            <thead className="bg-background-alt text-foreground">
              <tr>
                <th className="px-5 py-4 font-bold sm:px-6 sm:py-5">Format</th>
                <th className="px-5 py-4 font-bold sm:px-6 sm:py-5">
                  Cena od (netto/szt.)
                </th>
                <th className="hidden px-5 py-4 font-bold sm:table-cell sm:px-6 sm:py-5">
                  Realizacja
                </th>
              </tr>
            </thead>
            <tbody>
              {product.formats.map((format) => (
                <tr key={format.id} className="border-t border-border">
                  <td className="px-5 py-4 font-semibold text-foreground sm:px-6 sm:py-5">
                    {format.label}
                  </td>
                  <td className="px-5 py-4 font-mono font-semibold tabular-nums text-foreground sm:px-6 sm:py-5">
                    {format.unitPrice.toFixed(2)} zł
                  </td>
                  <td className="hidden px-5 py-4 font-mono text-muted-foreground sm:table-cell sm:px-6 sm:py-5">
                    24–48 h
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 max-w-3xl text-sm text-muted-foreground">
          Ceny netto. Podane stawki obowiązują dla standardowej specyfikacji.
          Wykończenia (folia, lakier UV, tłoczenie), wyższa gramatura i
          mikronakłady mogą zmieniać cenę — pełna wycena brutto z VAT pojawia
          się w konfiguratorze.
        </p>
      </Section>

      <Section alt spacing="md" contain={false}>
        <div className="mx-auto max-w-[760px] px-5 sm:px-8">
          <Eyebrow>
            Druk {keyword} w {miasto.nazwa}
          </Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Co warto wiedzieć o druku {keyword} dla{" "}
            <span className="text-primary">{miasto.nazwa}</span>
          </h2>

          <p className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {seoParagraph}
          </p>
        </div>
      </Section>

      <Section spacing="md">
        <SectionHeader
          index="04"
          eyebrow="FAQ"
          title={`Pytania o ${keyword} w ${miasto.nazwa}`}
        />

        <ul className="mt-8 max-w-3xl space-y-3">
          {faqs.map((item) => (
            <li key={item.question}>
              <details className="group rounded-2xl border border-border bg-card shadow-sm transition-shadow open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:text-lg">
                  <span>{item.question}</span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-card text-primary transition-colors group-open:border-primary group-open:bg-primary group-open:text-primary-foreground">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                      className="size-5 transition-transform duration-200 group-open:rotate-45"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {item.answer}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </Section>

      <Section alt spacing="md">
        <SectionHeader
          index="05"
          eyebrow="Powiązane strony"
          title="Sprawdź też inne pozycje DobrePrinty"
        />

        <ul className="mt-8 grid border-l border-t border-border sm:grid-cols-2">
          <li className="border-r border-b border-border">
            <Link
              href={`/drukarnia-${miasto.slug}`}
              className="group flex h-full flex-col p-5 transition-colors hover:bg-secondary/50"
            >
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                Strona miasta
              </span>
              <span className="mt-2 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                Drukarnia {miasto.nazwa}
              </span>
              <span className="mt-1 text-sm text-muted-foreground">
                Pełen katalog produktów dla {miasto.nazwa}.
              </span>
            </Link>
          </li>
          <li className="border-r border-b border-border">
            <Link
              href={`/produkty/${product.slug}`}
              className="group flex h-full flex-col p-5 transition-colors hover:bg-secondary/50"
            >
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                Strona produktu
              </span>
              <span className="mt-2 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {product.name} — pełna specyfikacja
              </span>
              <span className="mt-1 text-sm text-muted-foreground">
                Konfigurator, tabela parametrów, FAQ.
              </span>
            </Link>
          </li>
          {innerProducts.map((p) => (
            <li key={p.slug} className="border-r border-b border-border">
              <Link
                href={`/drukarnia-${miasto.slug}/${p.slug}`}
                className="group flex h-full flex-col p-5 transition-colors hover:bg-secondary/50"
              >
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                  Inny produkt w {miasto.nazwa}
                </span>
                <span className="mt-2 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {p.name} {miasto.nazwa}
                </span>
                <span className="mt-1 text-sm text-muted-foreground">
                  {p.tagline}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section spacing="md" contain={false}>
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Wydrukuj {keyword} w{" "}
            <span className="text-primary">{miasto.nazwa}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Cena brutto z VAT widoczna od razu w konfiguratorze, produkcja w
            24–48 h, kurier do {miasto.nazwa} kolejnego dnia roboczego. Cena
            startowa: {lowestPrice} zł netto za sztukę przy większych nakładach.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              href={`/produkty/${product.slug}#konfigurator`}
              variant="primary"
              size="lg"
            >
              Skonfiguruj i zamów <span aria-hidden>→</span>
            </Button>
            <Button
              href={`mailto:hej@dobreprinty.pl?subject=Wycena%20${encodeURIComponent(product.name)}%20${encodeURIComponent(miasto.nazwa)}`}
              variant="outline"
              size="lg"
            >
              Wycena indywidualna →
            </Button>
          </div>
          <FilePrepBadge className="mx-auto mt-6" />
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}

export function buildCityProductMetadata({
  miasto,
  product,
}: {
  miasto: Miasto;
  product: Product;
}) {
  const url = `${BASE_URL}/drukarnia-${miasto.slug}/${product.slug}`;
  const lowestPrice = Math.min(
    ...product.formats.map((f) => f.unitPrice),
  ).toFixed(2);
  const title = `${product.name} ${miasto.nazwa} — druk online, dostawa 24h | DobrePrinty`;
  const description =
    `${product.name} w ${miasto.nazwa} — zamów online. Realizacja 24-48h, dostawa kurierem. Cena od ${lowestPrice} zł. Sprawdź DobrePrinty!`.slice(
      0,
      180,
    );
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: robotsForMiasto(miasto),
    openGraph: {
      title,
      description,
      url,
      siteName: "DobrePrinty",
      type: "website" as const,
    },
  };
}
