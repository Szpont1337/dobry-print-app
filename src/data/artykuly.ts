import type { Article, ArticleMeta } from "@/lib/blog-types";

import { article as pdfDoDruku } from "./artykuly/jak-przygotowac-pdf-do-druku";
import { article as gramaturaPapieru } from "./artykuly/gramatura-papieru-ulotki";
import { article as wizytowkiWymiary } from "./artykuly/wizytowki-wymiary-formaty";
import { article as offsetVsCyfra } from "./artykuly/druk-offsetowy-vs-cyfrowy";
import { article as jakZrobicBleed } from "./artykuly/jak-zrobic-bleed";
import { article as cmykVsRgb } from "./artykuly/cmyk-vs-rgb";
import { article as rollUpWymiary } from "./artykuly/roll-up-wymiary-projektowanie";
import { article as ulotkiSkuteczny } from "./artykuly/ulotki-skuteczny-design";
import { article as taniDrukNaTargi } from "./artykuly/tani-druk-na-targi";
import { article as drukPlakatowFormaty } from "./artykuly/druk-plakatow-formaty";
import { article as ulotkiSkladaneFalcowanie } from "./artykuly/ulotki-skladane-falcowanie-rodzaje";
import { article as richBlack } from "./artykuly/rich-black-vs-czarny-k100";
import { article as papierFirmowy } from "./artykuly/papier-firmowy-jak-zaprojektowac";
import { article as wyborCzcionek } from "./artykuly/wybor-czcionek-do-druku";
import { article as wykonczenia } from "./artykuly/wykonczenia-folia-uv-tloczenie";
import { article as naklejki } from "./artykuly/naklejki-i-etykiety";
import { article as papierEko } from "./artykuly/papier-ekologiczny-recycling";
import { article as logoDoDruku } from "./artykuly/logo-do-druku-zasady";
import { article as pdfStandardy } from "./artykuly/format-pdf-pdf-x-rozne-standardy";
import { article as broszuryOprawy } from "./artykuly/broszury-szyte-vs-klejone-vs-szyte-nicia";
import { article as zaproszeniaSlubne } from "./artykuly/zaproszenia-slubne-druk";
import { article as ulotkiSkrzynki } from "./artykuly/ulotki-do-skrzynki-pocztowej";
import { article as menuRestauracyjne } from "./artykuly/menu-restauracyjne-druk";
import { article as nadrukNaKoszulke } from "./artykuly/jak-przygotowac-nadruk-na-koszulke";
import { article as dtgCzySitodruk } from "./artykuly/druk-dtg-czy-sitodruk-koszulki";
import { article as koszulkiFirmowe } from "./artykuly/koszulki-firmowe-z-nadrukiem";
import { article as torbyPapieroweRozmiary } from "./artykuly/torby-papierowe-rozmiary-i-gramatury";
import { article as torbaPapierowaZLogo } from "./artykuly/torba-papierowa-z-logo-dla-sklepu";
import { article as papierBialyCzyKraft } from "./artykuly/papier-bialy-czy-kraft-torby";
import { article as torbyPlocienneprzewodnik } from "./artykuly/torby-plocienne-z-nadrukiem-przewodnik";
import { article as torbaBawelnianaGadzet } from "./artykuly/torba-bawelniana-gadzet-reklamowy";
import { article as nadrukNaTorbe } from "./artykuly/jak-zaprojektowac-nadruk-na-torbe";
import { article as kalendarzeFirmowe } from "./artykuly/kalendarze-firmowe-druk";
import { article as raportRoczny } from "./artykuly/raport-roczny-druk";
import { article as kartkiSwiateczne } from "./artykuly/kartki-swiateczne-korporacyjne";
import { article as banerJakZaprojektowac } from "./artykuly/baner-reklamowy-jak-zaprojektowac";
import { article as tabliceForexDibond } from "./artykuly/tablice-reklamowe-forex-dibond";

export const articles: Article[] = [
  pdfDoDruku,
  gramaturaPapieru,
  wizytowkiWymiary,
  offsetVsCyfra,
  jakZrobicBleed,
  cmykVsRgb,
  rollUpWymiary,
  ulotkiSkuteczny,
  taniDrukNaTargi,
  drukPlakatowFormaty,
  ulotkiSkladaneFalcowanie,
  richBlack,
  papierFirmowy,
  wyborCzcionek,
  wykonczenia,
  naklejki,
  papierEko,
  logoDoDruku,
  pdfStandardy,
  broszuryOprawy,
  zaproszeniaSlubne,
  ulotkiSkrzynki,
  menuRestauracyjne,
  nadrukNaKoszulke,
  dtgCzySitodruk,
  koszulkiFirmowe,
  torbyPapieroweRozmiary,
  torbaPapierowaZLogo,
  papierBialyCzyKraft,
  torbyPlocienneprzewodnik,
  torbaBawelnianaGadzet,
  nadrukNaTorbe,
  kalendarzeFirmowe,
  raportRoczny,
  kartkiSwiateczne,
  banerJakZaprojektowac,
  tabliceForexDibond,
];

/** Planowane artykuły — meta-only, treść w przygotowaniu */
export const plannedArticles: ArticleMeta[] = [
  {
    slug: "katalog-produktowy-jak-zaprojektowac",
    title: "Katalog produktowy — jak zaprojektować skuteczną publikację B2B",
    excerpt:
      "Struktura katalogu, ilość stron, papier, zdjęcia produktowe, paginacja. Praktyczny przewodnik dla działów marketingu B2B.",
    category: "biznes",
    tags: ["katalog", "B2B", "broszury klejone"],
    publishedAt: "2026-05-14",
    author: "Zespół DobrePrinty",
    status: "planowany",
    relatedProducts: ["broszury-klejone"],
  },
  {
    slug: "wizytowki-nfc-cyfrowe",
    title: "Wizytówki NFC i cyfrowe — czy zastąpią klasyczne",
    excerpt:
      "Wizytówki z chipem NFC, QR kody, profile cyfrowe — porównanie z tradycyjnymi wizytówkami. Cena, użyteczność, trendy.",
    category: "produkty",
    tags: ["wizytówki", "NFC", "QR", "cyfrowe"],
    publishedAt: "2026-06-11",
    author: "Zespół DobrePrinty",
    status: "planowany",
    relatedProducts: ["wizytowki"],
  },
  {
    slug: "format-kwadratowy-w-druku",
    title: "Format kwadratowy w druku — wizytówki, ulotki, broszury",
    excerpt:
      "Kwadratowe formaty w druku: 55x55 wizytówki, 105x105 ulotki, 148x148 broszury. Kiedy warto wybrać niestandardowy format.",
    category: "produkty",
    tags: ["format kwadratowy", "design", "branża kreatywna"],
    publishedAt: "2026-06-25",
    author: "Zespół DobrePrinty",
    status: "planowany",
  },
  {
    slug: "kupony-vouchery-druk",
    title: "Kupony i vouchery — jak zaprojektować dla skutecznej promocji",
    excerpt:
      "Druk kuponów rabatowych i voucherów prezentowych. Numeracja, kody, perforacja, zabezpieczenia.",
    category: "produkty",
    tags: ["kupony", "vouchery", "promocja"],
    publishedAt: "2026-07-02",
    author: "Zespół DobrePrinty",
    status: "planowany",
  },
  {
    slug: "tloczenie-folia-zlota-srebrna",
    title: "Tłoczenie folią złotą i srebrną — kiedy i jak",
    excerpt:
      "Tłoczenie premium dla materiałów luksusowych. Cena, terminy, dla jakich branż polecane.",
    category: "poradniki",
    tags: ["tłoczenie", "folia złota", "premium", "luksus"],
    publishedAt: "2026-07-23",
    author: "Zespół DobrePrinty",
    status: "planowany",
  },
];

export function getAllArticles(): (Article | ArticleMeta)[] {
  return [...articles, ...plannedArticles];
}

export function getPublishedArticles(): Article[] {
  return articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticleMetaBySlug(
  slug: string,
): Article | ArticleMeta | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return articles.map((a) => a.slug);
}

export function getRelatedArticles(
  currentSlug: string,
  category: string,
  limit = 3,
): Article[] {
  return articles
    .filter((a) => a.slug !== currentSlug && a.category === category)
    .slice(0, limit);
}
