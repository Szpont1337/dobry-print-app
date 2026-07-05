import type { Metadata } from "next";
import {
  BadgeCheck,
  MonitorSmartphone,
  ReceiptText,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
import { miasta, type Miasto } from "@/data/miasta";
import { getMiastoTresc, type MiastoTresc } from "@/data/miasta-tresc";
import { isIndexableMiasto, robotsForMiasto } from "@/lib/miasta-seo";
import { visibleProducts as products } from "@/lib/products";

const BASE_URL = "https://www.dobreprinty.pl";

function cityUrl(miasto: Miasto): string {
  return `${BASE_URL}/drukarnia-${miasto.slug}`;
}

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

// ──────────────────────────────────────────────────────────────────────────
// Proceduralne fallbacki — używane dla miast BEZ wpisu w `miastaTresc`.
// Miasta z override dostają ręcznie pisany copy; te bez — spójną, sensowną
// treść wygenerowaną z pól danych (populacja, branże, dzielnice, landmarki).
// ──────────────────────────────────────────────────────────────────────────

function fallbackHeroLead(miasto: Miasto): string {
  return `${miasto.opis_krotki} DobrePrinty dostarcza tu pełen katalog: ulotki, wizytówki, plakaty, roll-upy i broszury z dostawą w 24–48 h. Cena brutto z VAT widoczna od pierwszego kliknięcia.`;
}

function fallbackDostawaBody(miasto: Miasto): string {
  const dzielnice = listToProse(miasto.dzielnice, 4);
  return `Kurier startuje z drukarni partnerskiej zaraz po produkcji.${
    dzielnice ? ` ${dzielnice}.` : ""
  } Standardowe zamówienie trafia do firm i instytucji w ${miasto.wojewodztwo} zwykle następnego dnia roboczego.`;
}

function fallbackFaqs(miasto: Miasto): { question: string; answer: string }[] {
  const drukarniaNazwa = `Drukarnia ${miasto.nazwa}`;
  const landmarkiProse = listToProse(miasto.landmarki, 3);
  const faqs = [
    {
      question: `Ile czasu zajmuje dostawa do ${miasto.nazwa}?`,
      answer: `Produkcja standardowych zamówień (ulotki, wizytówki, plakaty) trwa 24–48 h, dostawa kurierem do ${miasto.nazwa} to zwykle kolejny dzień roboczy. Zamówienie złożone we wtorek do południa trafia pod adres w ${miasto.wojewodztwo} w czwartek lub piątek.`,
    },
    {
      question: `Czy ${drukarniaNazwa} obsługuje większe nakłady firmowe?`,
      answer: `Tak. ${drukarniaNazwa} w naszej sieci realizuje nakłady 10 000+ ulotek dla sieci handlowych i HoReCa, materiały targowe, serie wizytówek dla całych zespołów. Powyżej 3 000 zł netto dostępna jest faktura proforma z 14-dniowym terminem.`,
    },
    {
      question: `Czy mogę odebrać zamówienie osobiście w ${miasto.nazwa}?`,
      answer: `Nie. DobrePrinty nie ma stacjonarnego punktu w ${miasto.nazwa}. Druk realizuje wybrana drukarnia partnerska, a kurier dostarcza paczkę pod podany adres zwykle następnego dnia po wysyłce. Dla firm dostępna jest dostawa pod konkretną godzinę za dopłatą.`,
    },
    {
      question: `Jakie produkty drukuje ${drukarniaNazwa.toLowerCase()} online?`,
      answer: `Pełen katalog DobrePrinty: ulotki, składane ulotki, broszury szyte i klejone, książki szyte nicią, roll-upy, papier firmowy, wizytówki, kartki i pocztówki, plakaty. ${drukarniaNazwa} z sieci DobrePrinty dobiera partnera pod konkretny produkt — tak, żeby termin i jakość były optymalne.`,
    },
    {
      question: `Czy ${drukarniaNazwa.toLowerCase()} wystawia fakturę VAT?`,
      answer: `Tak. Faktura VAT trafia na maila razem z potwierdzeniem zamówienia, bez konieczności proszenia o nią osobno. Dla klientów z ${miasto.wojewodztwo} obsługujemy także zamówienia z odroczonym terminem płatności (proforma + przelew 14 dni).`,
    },
  ];

  if (landmarkiProse) {
    faqs.push({
      question: `Czy realizujecie druk na wydarzenia i eventy w ${miasto.nazwa}?`,
      answer: `Tak. Plakaty, roll-upy i banery na konferencje, targi i imprezy w ${miasto.nazwa} — także w okolicach takich miejsc jak ${landmarkiProse} — produkujemy z wyprzedzeniem 4–5 dni, a dla zamówień ekspresowych w 24 h. Standardowy plakat na papierze satynowym 170 g, roll-up na blockoucie 200 g ze stelażem w komplecie.`,
    });
  }

  return faqs;
}

function fallbackParagraphs(miasto: Miasto): string[] {
  const populacjaTekst = formatPopulacja(miasto.populacja);
  const drukarnia = `Drukarnia ${miasto.nazwa}`;
  const branzeProse = listToProse(miasto.branze, 4);
  const landmarkiProse = listToProse(miasto.landmarki, 3);
  const dzielniceProse = listToProse(miasto.dzielnice, 4);
  const uczelnieProse = listToProse(miasto.uczelnie, 3);

  let p1 =
    miasto.populacja >= 300000
      ? `${miasto.nazwa} to jeden z największych rynków biznesowych w Polsce — ok. ${populacjaTekst} mieszkańców, gęsta sieć firm, instytucji i agencji. `
      : miasto.populacja >= 100000
        ? `${miasto.nazwa} (ok. ${populacjaTekst} mieszkańców) to duży regionalny rynek B2B w ${miasto.wojewodztwo}. `
        : miasto.populacja >= 50000
          ? `${miasto.nazwa} (ok. ${populacjaTekst} mieszkańców) to prężny ośrodek średniej wielkości w ${miasto.wojewodztwo}. `
          : `${miasto.nazwa} (ok. ${populacjaTekst} mieszkańców) to lokalny rynek w ${miasto.wojewodztwo}, gdzie liczy się szybki, przewidywalny druk. `;
  p1 += `${miasto.opis_krotki} ${drukarnia} online z sieci DobrePrinty obsługuje tu zarówno freelancerów, jak i większe organizacje — wszystko w jednym konfiguratorze, z ceną brutto z VAT widoczną od razu.`;
  if (branzeProse) {
    p1 += ` Najczęściej drukują u nas ${branzeProse}.`;
  }

  let p2 = `Druk ${miasto.nazwa} sprawdza się tam, gdzie liczy się czas reakcji. Restauracja zamawia 2 000 menu na sezon, agencja kreatywna potrzebuje 200 broszur klejonych na piątkową prezentację, organizator wydarzenia wymaga roll-upów na sobotnie otwarcie. ${drukarnia} online z DobrePrinty dobiera jedną z 28 zweryfikowanych drukarni partnerskich, która dla konkretnego produktu zrobi to najszybciej i najbardziej opłacalnie.`;
  if (landmarkiProse) {
    p2 += ` Nasze materiały trafiają w okolice rozpoznawalnych miejsc, takich jak ${landmarkiProse}.`;
  }
  p2 += ` Plik sprawdzamy przed drukiem, a reklamacje rozpatrujemy my, nie odsyłamy do drukarni.`;

  let p3 = `Tania drukarnia ${miasto.nazwa} online nie musi oznaczać kompromisu jakościowego. Ceny w DobrePrinty są transparentne: kwota z VAT pokazuje się przy każdej zmianie nakładu i formatu, bez gwiazdek i dopłat za spady.`;
  p3 += dzielniceProse
    ? ` Kurier dowozi zamówienia do dzielnic i okolic takich jak ${dzielniceProse}, zwykle następnego dnia roboczego po produkcji.`
    : ` Kurier dowozi zamówienia pod wskazany adres w ${miasto.wojewodztwo} zwykle następnego dnia roboczego po produkcji.`;

  let p4 = `${drukarnia} z naszej sieci to wybór, gdy nie chcesz tracić popołudnia na porównywanie ofert i rozmowy z handlowcami. Konfigurujesz produkt, my dobieramy drukarnię partnerską, kurier startuje z trasą zaraz po produkcji. Druk ${miasto.nazwa} obejmuje pełen katalog DobrePrinty: ulotki, broszury, roll-upy, wizytówki, plakaty, papier firmowy i pocztówki.`;
  if (uczelnieProse) {
    p4 += ` Obsługujemy też sektor edukacji i nauki — m.in. ${uczelnieProse}.`;
  }
  p4 += ` Biuro obsługi odpowiada w 2 godziny robocze, faktura VAT przychodzi na maila, a 97% naszych klientów wraca po drugą partię — także w ${miasto.nazwa}.`;

  return [p1, p2, p3, p4];
}

// ──────────────────────────────────────────────────────────────────────────
// Rozwiązanie treści: override z `miastaTresc` ma pierwszeństwo, inaczej fallback.
// ──────────────────────────────────────────────────────────────────────────

type ResolvedCity = {
  heroLead: string;
  industryTags: string[];
  tiles: { icon: typeof Truck; title: string; body: string }[];
  katalogHeading: string;
  productCopy: (slug: string, fallback: string) => string;
  paragraphs: string[];
  statBadge: { strong: string; rest: string };
  faqs: { question: string; answer: string }[];
  geo?: { lat: number; lng: number };
  knowsAbout?: string[];
};

function resolveCity(miasto: Miasto, t: MiastoTresc): ResolvedCity {
  const populacjaTekst = formatPopulacja(miasto.populacja);
  return {
    heroLead: t.heroLead ?? fallbackHeroLead(miasto),
    industryTags: t.industryTags ?? miasto.branze ?? [],
    tiles: [
      {
        icon: Truck,
        title: `Dostawa do ${miasto.nazwa} w 24–48 h`,
        body: t.dostawaBody ?? fallbackDostawaBody(miasto),
      },
      {
        icon: MonitorSmartphone,
        title: "Zamów bez wychodzenia z biura",
        body: `Cały proces w konfiguratorze online: nakład, format, plik. Bez maili, bez handlowca, bez czekania na ofertę. Drukarnia ${miasto.nazwa} online działa tak samo o 22:00, jak o 9:00.`,
      },
      {
        icon: ReceiptText,
        title: "Cena znana przed zamówieniem",
        body: 'Kwota brutto z VAT pokazuje się przy każdej zmianie nakładu i formatu. Bez gwiazdek, dopłat za spady i ukrytych „kosztów obsługi zamówienia".',
      },
      {
        icon: ShieldCheck,
        title: "Jakość sprawdzona przez 28 drukarni partnerskich",
        body: `Każdy partner przechodzi kwartalny audyt jakości druku i terminowości. Drukarnia ${miasto.nazwa} z sieci DobrePrinty to ten partner, który dla Twojego produktu zrobi to najlepiej.`,
      },
    ],
    katalogHeading:
      t.katalogHeading ?? `Pełen katalog druku z dostawą do ${miasto.nazwa}`,
    productCopy: (slug, fallback) => t.localProductCopy?.[slug] ?? fallback,
    paragraphs: t.paragraphs ?? fallbackParagraphs(miasto),
    statBadge: t.statBadge ?? {
      strong: `${populacjaTekst} mieszkańców ${miasto.nazwa}`,
      rest: ` w zasięgu naszego kuriera, zwykle dzień roboczy od nadania. Drukarnia ${miasto.nazwa} z sieci DobrePrinty obsługuje województwo ${miasto.wojewodztwo} regularnie.`,
    },
    faqs: t.faqs ?? fallbackFaqs(miasto),
    geo: t.geo,
    knowsAbout: t.knowsAbout,
  };
}

function getSasiednieMiasta(miasto: Miasto): Miasto[] {
  const sameRegion = miasta.filter(
    (m) =>
      m.slug !== miasto.slug &&
      m.wojewodztwo === miasto.wojewodztwo &&
      isIndexableMiasto(m),
  );
  const byProximity = [...sameRegion].sort(
    (a, b) =>
      Math.abs(a.populacja - miasto.populacja) -
      Math.abs(b.populacja - miasto.populacja),
  );
  if (byProximity.length >= 3) return byProximity.slice(0, 3);
  const fallback = miasta
    .filter((m) => m.slug !== miasto.slug && isIndexableMiasto(m))
    .sort(
      (a, b) =>
        Math.abs(a.populacja - miasto.populacja) -
        Math.abs(b.populacja - miasto.populacja),
    );
  return [...byProximity, ...fallback]
    .filter((m, idx, arr) => arr.findIndex((x) => x.slug === m.slug) === idx)
    .slice(0, 3);
}

// ──────────────────────────────────────────────────────────────────────────

export function buildCityMetadata(miasto: Miasto): Metadata {
  const t = getMiastoTresc(miasto.slug);
  const url = cityUrl(miasto);
  const title = `Drukarnia ${miasto.nazwa} online. Druk 24h z dostawą`;
  const description = (
    t.metaDescription ??
    `Drukarnia ${miasto.nazwa} online. Ulotki, wizytówki i plakaty z dostawą w 24–48 h. Cena z VAT widoczna od razu, 28 zweryfikowanych drukarni partnerskich. Wyceń teraz.`
  ).slice(0, 200);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: robotsForMiasto(miasto),
    openGraph: {
      title: `${title} | DobrePrinty`,
      description: t.ogDescription ?? description,
      url,
      siteName: "DobrePrinty",
      type: "website",
    },
  };
}

function PlusIcon() {
  return (
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
  );
}

function SchemaMarkup({
  miasto,
  resolved,
  url,
}: {
  miasto: Miasto;
  resolved: ResolvedCity;
  url: string;
}) {
  const localBusiness: Record<string, unknown> = {
    "@type": "LocalBusiness",
    "@id": `${url}#localbusiness`,
    name: `DobrePrinty, drukarnia ${miasto.nazwa} online`,
    alternateName: `DobrePrinty ${miasto.nazwa}`,
    description: `Drukarnia online dla firm i instytucji z ${miasto.nazwa}. Ulotki, wizytówki, plakaty, roll-upy, broszury z dostawą w 24–48 h. Sieć 28 zweryfikowanych drukarni partnerskich, cena z VAT widoczna od razu.`,
    url,
    image: `${BASE_URL}/og/dobreprinty.jpg`,
    email: "hej@dobreprinty.pl",
    priceRange: "29 zł – 4 500 zł",
    areaServed: [
      {
        "@type": "City",
        name: miasto.nazwa,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: `województwo ${miasto.wojewodztwo}`,
        },
      },
    ],
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
      description:
        "Konfigurator online dostępny 24/7. Biuro obsługi odpowiada pn–pt 9:00–17:00 w 2 godziny robocze.",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Katalog produktów DobrePrinty dla ${miasto.nazwa}`,
      itemListElement: products.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: p.name,
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "PLN",
            lowPrice: Math.min(...p.formats.map((f) => f.unitPrice)),
            highPrice: Math.max(...p.formats.map((f) => f.unitPrice)),
            offerCount: p.formats.length,
          },
        },
      })),
    },
  };

  if (resolved.geo) {
    localBusiness.serviceArea = {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: resolved.geo.lat,
        longitude: resolved.geo.lng,
      },
      geoRadius: "40000",
    };
  }
  if (resolved.knowsAbout && resolved.knowsAbout.length > 0) {
    localBusiness.knowsAbout = resolved.knowsAbout;
  }

  const json = {
    "@context": "https://schema.org",
    "@graph": [
      localBusiness,
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: resolved.faqs.map((f) => ({
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
            name: "Strona główna",
            item: `${BASE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Drukarnie lokalne",
            item: `${BASE_URL}/drukarnie-lokalne`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `Drukarnia ${miasto.nazwa}`,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export function CityPageContent({ miasto }: { miasto: Miasto }) {
  const t = getMiastoTresc(miasto.slug);
  const resolved = resolveCity(miasto, t);
  const url = cityUrl(miasto);
  const sasiednie = getSasiednieMiasta(miasto);

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
              { label: "Strona główna", href: "/" },
              { label: "Drukarnie lokalne", href: "/drukarnie-lokalne" },
              { label: `Drukarnia ${miasto.nazwa}` },
            ]}
          />

          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-13">
            <div>
              <Eyebrow className="font-mono">Druk dla {miasto.nazwa}</Eyebrow>
              <h1 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
                Drukarnia <span className="text-primary">{miasto.nazwa}</span>{" "}
                online. Druk z dostawą w 24–48 h
              </h1>
              <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
                {resolved.heroLead}
              </p>

              {resolved.industryTags.length > 0 ? (
                <ul
                  aria-label="Branże, dla których drukujemy"
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {resolved.industryTags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-lg border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground sm:text-sm"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/#produkty" variant="primary" size="lg">
                  Wyceń druk dla {miasto.nazwa}
                  <span aria-hidden>→</span>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--color-accent)_0%,_transparent_65%)] opacity-70"
              />
              <Image
                src="/images/printer.png"
                alt={`Profesjonalna drukarka wielofunkcyjna dla biznesu, którą obsługują drukarnie partnerskie DobrePrinty w mieście ${miasto.nazwa}`}
                width={1100}
                height={1100}
                priority
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="h-auto w-full select-none object-contain drop-shadow-[0_30px_60px_rgba(15,15,15,0.18)]"
              />
            </div>
          </div>

          <ul className="mt-13 grid grid-cols-3 border-l border-t border-border">
            <li className="border-r border-b border-border px-4 py-5">
              <p className="whitespace-nowrap text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                24–48 h
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                do dostawy w {miasto.nazwa}
              </p>
            </li>
            <li className="border-r border-b border-border px-4 py-5">
              <p className="whitespace-nowrap text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                28
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                drukarni partnerskich
              </p>
            </li>
            <li className="border-r border-b border-border px-4 py-5">
              <p className="whitespace-nowrap text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                4,9/5
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                średnia ocena klientów
              </p>
            </li>
          </ul>
        </Container>
      </section>

      <Section spacing="md">
        <SectionHeader
          index="01"
          title={
            <>
              Dlaczego DobrePrinty w{" "}
              <span className="text-primary">{miasto.nazwa}</span>
            </>
          }
        />

        <ul className="mt-8 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {resolved.tiles.map(({ icon: Icon, title, body }, idx) => (
            <li
              key={title}
              className="flex h-full flex-col gap-4 border-r border-b border-border p-6 transition-colors hover:bg-secondary/50"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-lg bg-secondary text-primary">
                  <Icon aria-hidden className="size-5" strokeWidth={2.2} />
                </span>
                <span className="font-mono text-3xl font-extrabold tracking-tight text-border">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section alt spacing="md">
        <SectionHeader
          index="02"
          eyebrow={`Druk ${miasto.nazwa}. Katalog`}
          title={resolved.katalogHeading}
          description={`Wybierz produkt — drukarnia ${miasto.nazwa} z naszej sieci dobierze optymalnego partnera, terminy i wycenę zobaczysz od razu w konfiguratorze.`}
        />

        <ul className="mt-8 grid border-l border-t border-border md:grid-cols-2">
          {products.map((p) => (
            <li key={p.slug} className="border-r border-b border-border">
              <Link
                href={`/drukarnia-${miasto.slug}/${p.slug}`}
                // Pełny katalog produktów (kilkanaście linków) na każdej z
                // ~100 stron miast — bez prefetchu, żeby nie mnożyć ?_rsc=.
                prefetch={false}
                className="group flex h-full items-start gap-5 p-5 transition-colors hover:bg-secondary/50 sm:p-8"
              >
                <span className="grid size-20 shrink-0 place-items-center rounded-lg border border-border bg-background-alt sm:size-24">
                  <ProductMockup
                    variant={p.variant}
                    className="h-16 w-16 sm:h-20 sm:w-20"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {p.name} {miasto.nazwa}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {resolved.productCopy(p.slug, p.tagline)}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Konfiguruj <span aria-hidden>→</span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section spacing="md" contain={false}>
        <div className="mx-auto max-w-[760px] px-5 sm:px-8">
          <Eyebrow>Druk dla biznesu w {miasto.nazwa}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Jak DobrePrinty obsługuje firmy z{" "}
            <span className="text-primary">{miasto.nazwa}</span>
          </h2>

          <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {resolved.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-accent/30 bg-accent/15 p-6">
            <BadgeCheck
              aria-hidden
              className="size-6 shrink-0 text-primary"
              strokeWidth={2.2}
            />
            <p className="text-sm text-foreground sm:text-base">
              <strong className="font-bold">{resolved.statBadge.strong}</strong>{" "}
              {resolved.statBadge.rest.replace(/^\s+/, "")}
            </p>
          </div>
        </div>
      </Section>

      <Section alt spacing="md">
        <SectionHeader
          index="03"
          eyebrow={`FAQ Drukarnia ${miasto.nazwa}`}
          title={
            <>
              Pytania, które dostajemy z{" "}
              <span className="text-primary">{miasto.nazwa}</span>
            </>
          }
        />

        <ul className="mt-8 max-w-3xl space-y-3">
          {resolved.faqs.map((item) => (
            <li key={item.question}>
              <details className="group rounded-2xl border border-border bg-card shadow-sm transition-shadow open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:text-lg">
                  <span>{item.question}</span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-card text-primary transition-colors group-open:border-primary group-open:bg-primary group-open:text-primary-foreground">
                    <PlusIcon />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {item.answer}
                </div>
              </details>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-13 flex max-w-3xl flex-col items-center justify-between gap-5 rounded-2xl border border-border bg-secondary px-6 py-6 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Druk dla większego projektu w {miasto.nazwa}?
            </h3>
            <p className="text-sm text-secondary-foreground/80">
              Biuro obsługi przygotuje wycenę indywidualną w 2 godziny robocze.
            </p>
          </div>
          <Button
            href={`mailto:hej@dobreprinty.pl?subject=Wycena%20dla%20${encodeURIComponent(miasto.nazwa)}`}
            variant="primary"
            size="md"
            className="shrink-0"
          >
            Napisz do nas →
          </Button>
        </div>
      </Section>

      {sasiednie.length > 0 ? (
        <Section spacing="md">
          <SectionHeader
            index="04"
            eyebrow={`Drukarnie w ${miasto.wojewodztwo}`}
            title="Sprawdź sąsiednie miasta"
            description={`Druk z dostawą obsługujemy w całym województwie ${miasto.wojewodztwo}.`}
          />

          <ul className="mt-8 grid border-l border-t border-border sm:grid-cols-3">
            {sasiednie.map((m) => (
              <li key={m.slug} className="border-r border-b border-border">
                <Link
                  href={`/drukarnia-${m.slug}`}
                  className="group flex h-full flex-col p-5 transition-colors hover:bg-secondary/50"
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                    Drukarnia
                  </span>
                  <span className="mt-2 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {m.nazwa}
                  </span>
                  <span className="mt-2 text-sm text-muted-foreground">
                    {m.opis_krotki}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Zobacz <span aria-hidden>→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <SchemaMarkup miasto={miasto} resolved={resolved} url={url} />
    </main>
  );
}
