import type { ProductVariant } from "@/components/product-mockup";
import type { PrintShape } from "@/components/print-3d-scene";

export type ProductFormat = {
  id: string;
  label: string;
  /** zł netto za sztukę */
  unitPrice: number;
};

export type Product = {
  slug: string;
  name: string;
  /** dopełniacz, np. „swoje ulotki", używany w nagłówku */
  inHeading: string;
  /** krótkie zdanie pod nagłówkiem */
  tagline: string;
  /** dłuższy akapit marketingowy */
  intro: string;
  /** zdanie w footerze */
  footerHeadline: string;
  /** opis spec w footerze */
  footerNote: string;
  variant: ProductVariant;
  /** etykieta selektora formatu w konfiguratorze, np. „Rozmiar". Domyślnie „Format". */
  formatNoun?: string;
  /**
   * Włącza interaktywny podgląd nadruku na produkcie (koszulka, torba).
   * `printArea` to prostokąt strefy druku wyrażony w % kontenera podglądu.
   */
  mockupPreview?: {
    surface: "tshirt" | "bag" | "tote";
    printArea: { x: number; y: number; width: number; height: number };
  };
  /**
   * Procedularny podgląd 3D produktu drukowanego (ulotka, plakat, roll-up…).
   * `aspect` to proporcja lica (szerokość/wysokość) w widoku.
   */
  print3d?: { shape: PrintShape; aspect: number };
  defaultFormatId: string;
  defaultQuantity: number;
  /** kafelki w sekcji statystyk */
  highlights: { value: string; label: string }[];
  formats: ProductFormat[];
  /**
   * Cennik ilościowy: cena jednostkowa maleje z nakładem. Gdy podany, nadpisuje
   * `formats[].unitPrice`. Progi posortowane rosnąco po `minQty`; obowiązuje
   * cena najwyższego progu, którego `minQty <= nakład`. Implikuje `noFees`.
   */
  priceTiers?: { minQty: number; unitPrice: number }[];
  /** ukryty z list, gridów, search i sitemap. Dostępny tylko po bezpośrednim URL. */
  hidden?: boolean;
  /** pomija SETUP_FEE i scale w konfiguratorze — cena = qty * unitPrice */
  noFees?: boolean;
};

export const products: Product[] = [
  {
    slug: "ulotki",
    name: "Ulotki",
    inHeading: "swoje ulotki",
    tagline: "Formaty od A7 do A3, druk dwustronny 4/4.",
    intro:
      "Powrót do podstaw: nawet w dobie cyfrowych reklam nie sposób wyobrazić sobie życia bez ulotek. Wyróżniają Cię z tłumu i sprawiają, że reklama znów staje się namacalna. Wykorzystaj nasze formaty od A7 do A3.",
    footerHeadline: "Ulotki reklamowe, skuteczny przekaz Twojej marki.",
    footerNote:
      "Domyślnie drukujemy 4/4 dwustronnie na papierze 135 g kreda mat, w orientacji pionowej. Wybierasz tylko nakład i format, resztą zajmujemy się my.",
    variant: "stack",
    print3d: { shape: "sheet", aspect: 0.707 },
    defaultFormatId: "dl",
    defaultQuantity: 1000,
    highlights: [
      { value: "1+", label: "sztuka minimum" },
      { value: "6", label: "formatów A7–A3" },
      { value: "3 dni", label: "do wysyłki" },
    ],
    formats: [
      { id: "a7", label: "A7 · 74 × 105 mm", unitPrice: 0.06 },
      { id: "dl", label: "DL · 100 × 210 mm", unitPrice: 0.12 },
      { id: "a6", label: "A6 · 105 × 148 mm", unitPrice: 0.15 },
      { id: "a5", label: "A5 · 148 × 210 mm", unitPrice: 0.22 },
      { id: "a4", label: "A4 · 210 × 297 mm", unitPrice: 0.4 },
      { id: "a3", label: "A3 · 297 × 420 mm", unitPrice: 0.75 },
    ],
  },
  {
    slug: "skladane-ulotki",
    name: "Składane ulotki",
    inHeading: "swoje składane ulotki",
    tagline: "Sześciostronicowe ulotki w formacie DL, A5 i A4.",
    intro:
      "Złóż swoją historię na kilka łamów. Składane ulotki są idealne do mini-katalogów, menu i ofert specjalnych. Wybierasz format finalny, my dobieramy bigowanie i papier.",
    footerHeadline: "Składane ulotki: mała broszura, duża treść.",
    footerNote:
      "Falcowanie typu C, papier 170 g kreda mat, druk 4/4. Bez ukrytych opcji, wpisujesz nakład i wybierasz format.",
    variant: "folded",
    print3d: { shape: "folded", aspect: 0.707 },
    defaultFormatId: "a5",
    defaultQuantity: 500,
    highlights: [
      { value: "3", label: "formaty finalne" },
      { value: "6", label: "stron treści" },
      { value: "3 dni", label: "do wysyłki" },
    ],
    formats: [
      { id: "dl", label: "DL · 100 × 210 mm", unitPrice: 0.18 },
      { id: "a5", label: "A5 · 148 × 210 mm", unitPrice: 0.28 },
      { id: "a4", label: "A4 · 210 × 297 mm", unitPrice: 0.48 },
    ],
  },
  {
    slug: "broszury-szyte",
    name: "Broszury szyte",
    inHeading: "swoje broszury szyte",
    tagline: "Spinane drutem broszury w A6, A5 i A4.",
    intro:
      "Broszury szyte drutem to klasyk: szybkie w produkcji, eleganckie i lekkie. Idealne na cenniki, programy wydarzeń i katalogi do 48 stron.",
    footerHeadline: "Broszury szyte, czysty i klasyczny look.",
    footerNote:
      "Spinanie dwoma druczkami, środek 135 g kreda mat, okładka 250 g kreda mat. Standardowo 16 stron, dopasujemy w kolejnym kroku.",
    variant: "open",
    print3d: { shape: "book", aspect: 0.707 },
    defaultFormatId: "a5",
    defaultQuantity: 250,
    highlights: [
      { value: "3", label: "formaty A6–A4" },
      { value: "16 str.", label: "domyślnie" },
      { value: "4 dni", label: "do wysyłki" },
    ],
    formats: [
      { id: "a6", label: "A6 · 105 × 148 mm", unitPrice: 1.4 },
      { id: "a5", label: "A5 · 148 × 210 mm", unitPrice: 2.1 },
      { id: "a4", label: "A4 · 210 × 297 mm", unitPrice: 3.4 },
    ],
  },
  {
    slug: "broszury-klejone",
    name: "Broszury z klejoną oprawą",
    inHeading: "swoje broszury z klejoną oprawą",
    tagline: "Profesjonalna oprawa klejona w A5 i A4.",
    intro:
      "Oprawa klejona to wybór dla katalogów i magazynów. Grzbiet daje pełnowymiarowy efekt książki, a klejenie utrzymuje strony od pierwszego do ostatniego kontaktu.",
    footerHeadline: "Klejone broszury, magazyn jakości premium.",
    footerNote:
      "Klejenie hotmelt, środek 135 g kreda mat, okładka 300 g kreda mat z folią matową. Domyślnie 48 stron.",
    variant: "book",
    print3d: { shape: "book", aspect: 0.707 },
    defaultFormatId: "a5",
    defaultQuantity: 100,
    highlights: [
      { value: "2", label: "formaty A5 / A4" },
      { value: "48 str.", label: "domyślnie" },
      { value: "5 dni", label: "do wysyłki" },
    ],
    formats: [
      { id: "a5", label: "A5 · 148 × 210 mm", unitPrice: 5.8 },
      { id: "a4", label: "A4 · 210 × 297 mm", unitPrice: 8.2 },
    ],
  },
  {
    slug: "broszury-szyte-nicia",
    name: "Broszury i książki z oprawą szytą nicią",
    inHeading: "książki z oprawą szytą nicią",
    tagline: "Oprawa szyta nicią. Księga, która zostaje.",
    intro:
      "Najbardziej trwała oprawa, jaką możemy zaoferować. Szycie nicią pozwala otworzyć książkę na płasko bez ryzyka, że strony wypadną. Idealne dla książek, monografii i albumów.",
    footerHeadline: "Książki szyte nicią, przygotowane na pokolenia.",
    footerNote:
      "Szycie nićmi, okładka twarda lub miękka 350 g kreda mat. Domyślnie 96 stron, możliwość modyfikacji w kolejnym kroku.",
    variant: "thick-book",
    print3d: { shape: "book-thick", aspect: 0.707 },
    defaultFormatId: "a5",
    defaultQuantity: 100,
    highlights: [
      { value: "2", label: "formaty A5 / A4" },
      { value: "96 str.", label: "domyślnie" },
      { value: "7 dni", label: "do wysyłki" },
    ],
    formats: [
      { id: "a5", label: "A5 · 148 × 210 mm", unitPrice: 12.4 },
      { id: "a4", label: "A4 · 210 × 297 mm", unitPrice: 18.6 },
    ],
  },
  {
    slug: "roll-up",
    name: "Roll-up",
    inHeading: "swój roll-up",
    tagline: "Roll-up z aluminiowym stelażem i wydrukiem premium.",
    intro:
      "Roll-up to mobilna reklama, którą rozkładasz w 30 sekund. Dostarczamy razem ze stelażem i pokrowcem, gotowy do pierwszej prezentacji już następnego dnia.",
    footerHeadline: "Roll-up. Wystawa wszędzie, gdzie jesteś.",
    footerNote:
      "Stelaż aluminiowy w komplecie, druk laserowy na blockoucie 200 g, pokrowiec transportowy w cenie.",
    variant: "rollup",
    print3d: { shape: "rollup", aspect: 0.46 },
    defaultFormatId: "85x200",
    defaultQuantity: 1,
    highlights: [
      { value: "1+", label: "sztuka minimum" },
      { value: "3", label: "rozmiary stelaża" },
      { value: "2 dni", label: "do wysyłki" },
    ],
    formats: [
      { id: "85x200", label: "85 × 200 cm", unitPrice: 165 },
      { id: "100x200", label: "100 × 200 cm", unitPrice: 195 },
      { id: "120x200", label: "120 × 200 cm", unitPrice: 235 },
    ],
  },
  {
    slug: "papier-firmowy",
    name: "Papier firmowy",
    inHeading: "swój papier firmowy",
    tagline: "Klasyczny papier firmowy w A4 i A5.",
    intro:
      "Każdy dokument robi wrażenie, gdy wychodzi na firmowym papierze. Drukujemy na białym offsecie 90 g, w pełnym kolorze 4/0 lub 1/0.",
    footerHeadline: "Papier firmowy, drobiazg, który zostaje w pamięci.",
    footerNote:
      "Offset biały 90 g, druk 4/0. Pakowanie po 100 sztuk w opaskę papierową.",
    variant: "letterhead",
    print3d: { shape: "sheet", aspect: 0.707 },
    defaultFormatId: "a4",
    defaultQuantity: 500,
    highlights: [
      { value: "2", label: "formaty A5 / A4" },
      { value: "90 g", label: "offset biały" },
      { value: "2 dni", label: "do wysyłki" },
    ],
    formats: [
      { id: "a5", label: "A5 · 148 × 210 mm", unitPrice: 0.1 },
      { id: "a4", label: "A4 · 210 × 297 mm", unitPrice: 0.18 },
    ],
  },
  {
    slug: "wizytowki",
    name: "Wizytówki",
    inHeading: "swoje wizytówki",
    tagline: "Wizytówki w klasycznym formacie 85 × 55 mm lub europejskim.",
    intro:
      "Twoje pierwsze wrażenie w portfelu klienta. Drukujemy na grubym kartoniku 350 g, z opcją folii matowej w kolejnych krokach.",
    footerHeadline: "Wizytówki. Pięć sekund, na zawsze.",
    footerNote:
      "Karton 350 g kreda mat, druk 4/4 dwustronny, narożniki proste. Pakowanie po 100 sztuk.",
    variant: "cards",
    print3d: { shape: "card", aspect: 1.545 },
    defaultFormatId: "85x55",
    defaultQuantity: 100,
    highlights: [
      { value: "1+", label: "sztuka minimum" },
      { value: "2", label: "rozmiary" },
      { value: "2 dni", label: "do wysyłki" },
    ],
    formats: [
      { id: "85x55", label: "Klasyczny · 85 × 55 mm", unitPrice: 0.18 },
      { id: "90x50", label: "Europejski · 90 × 50 mm", unitPrice: 0.18 },
    ],
  },
  {
    slug: "kartki-pocztowki",
    name: "Kartki & Pocztówki",
    inHeading: "swoje pocztówki",
    tagline: "Pocztówki i kartki okolicznościowe w formatach A6, DL i A5.",
    intro:
      "Pocztówki to ciepły, namacalny gest. Drukujemy na kartoniku 300 g z miejscem na adres i znaczek, gotowe do wysłania pocztą.",
    footerHeadline:
      'Pocztówki, czyli papier, który mówi „pomyślałem o Tobie".',
    footerNote:
      "Karton 300 g kreda mat, druk 4/4. Standardowo z polem adresowym i ramką znaczka.",
    variant: "postcards",
    print3d: { shape: "card", aspect: 1.414 },
    defaultFormatId: "a6",
    defaultQuantity: 100,
    highlights: [
      { value: "1+", label: "sztuka minimum" },
      { value: "3", label: "formaty" },
      { value: "3 dni", label: "do wysyłki" },
    ],
    formats: [
      { id: "a6", label: "A6 · 105 × 148 mm", unitPrice: 0.42 },
      { id: "dl", label: "DL · 100 × 210 mm", unitPrice: 0.55 },
      { id: "a5", label: "A5 · 148 × 210 mm", unitPrice: 0.68 },
    ],
  },
  {
    slug: "plakaty",
    name: "Plakaty",
    inHeading: "swoje plakaty",
    tagline: "Plakaty w formatach od A3 aż po B1. Uwaga gwarantowana.",
    intro:
      "Plakat to klasyk, który nadal działa. Drukujemy na satynowym papierze 170 g, idealnym do witryn, gablot i wnętrz.",
    footerHeadline: "Plakaty, komunikat z pierwszej linii.",
    footerNote: "Papier satynowy 170 g, druk 4/0. Pakowane w sztywne tuby.",
    variant: "poster",
    print3d: { shape: "sheet", aspect: 0.707 },
    defaultFormatId: "a2",
    defaultQuantity: 25,
    highlights: [
      { value: "1+", label: "sztuka minimum" },
      { value: "5", label: "formatów A3–B1" },
      { value: "3 dni", label: "do wysyłki" },
    ],
    formats: [
      { id: "a3", label: "A3 · 297 × 420 mm", unitPrice: 1.8 },
      { id: "a2", label: "A2 · 420 × 594 mm", unitPrice: 3.4 },
      { id: "a1", label: "A1 · 594 × 841 mm", unitPrice: 5.6 },
      { id: "a0", label: "A0 · 841 × 1189 mm", unitPrice: 9.2 },
      { id: "b1", label: "B1 · 707 × 1000 mm", unitPrice: 7.4 },
    ],
  },
  {
    slug: "baner-reklamowy",
    name: "Banery reklamowe",
    inHeading: "swój baner reklamowy",
    tagline:
      "Banery PVC i siatka mesh w dowolnym formacie. Druk solwentowy, gotowe do zawieszenia.",
    intro:
      "Baner reklamowy to najtańszy sposób na dużą powierzchnię reklamową. Drukujemy na materiale PVC 510 g z drukiem solwentowym odpornym na UV i deszcz. W cenie: zgrzewane krawędzie i oczka co 50 cm.",
    footerHeadline: "Banery reklamowe. Widoczni na każdej ulicy.",
    footerNote:
      "Materiał PVC 510 g lub siatka mesh, druk solwentowy 4/0, zgrzewane krawędzie, oczka aluminiowe co 50 cm w cenie.",
    variant: "banner",
    print3d: { shape: "banner", aspect: 2.0 },
    defaultFormatId: "100x200",
    defaultQuantity: 1,
    highlights: [
      { value: "1+", label: "sztuka minimum" },
      { value: "3", label: "materiały do wyboru" },
      { value: "3 dni", label: "do wysyłki" },
    ],
    formats: [
      { id: "50x100", label: "50 × 100 cm", unitPrice: 39 },
      { id: "100x200", label: "100 × 200 cm", unitPrice: 79 },
      { id: "150x300", label: "150 × 300 cm", unitPrice: 149 },
      { id: "200x400", label: "200 × 400 cm", unitPrice: 249 },
    ],
  },
  {
    slug: "naklejki",
    name: "Naklejki",
    inHeading: "swoje naklejki",
    tagline:
      "Naklejki na folii i papierze od 1 sztuki. Kształt prostokąt, koło lub dowolny kontur.",
    intro:
      "Naklejki na każdą powierzchnię: etykiety produktowe, naklejki na auto, gadżety promocyjne, oznaczenia. Drukujemy na papierze, folii białej i transparentnej, z klejem trwałym lub zmywalnym.",
    footerHeadline: "Naklejki. Twoje logo na każdej powierzchni.",
    footerNote:
      "Papier biały lub folia PP biała/transparentna, klej trwały, druk 4/0 cyfrowy. Cięcie ploterowe do dowolnego kształtu.",
    variant: "sticker",
    print3d: { shape: "sheet", aspect: 0.72 },
    defaultFormatId: "a6",
    defaultQuantity: 100,
    highlights: [
      { value: "1+", label: "sztuka minimum" },
      { value: "3", label: "podłoża" },
      { value: "2 dni", label: "do wysyłki" },
    ],
    formats: [
      { id: "a7", label: "A7 · 74 × 105 mm", unitPrice: 0.35 },
      { id: "a6", label: "A6 · 105 × 148 mm", unitPrice: 0.65 },
      { id: "a5", label: "A5 · 148 × 210 mm", unitPrice: 1.1 },
      { id: "a4", label: "A4 · 210 × 297 mm", unitPrice: 1.8 },
    ],
  },
  {
    slug: "tablice-reklamowe",
    name: "Tablice reklamowe",
    inHeading: "swoją tablicę reklamową",
    tagline:
      "Tablice na piankę forex, dibond i PCV. Sztywne, lekkie, gotowe do montażu.",
    intro:
      "Tablica reklamowa to baner z charakterem — sztywna, stoi samodzielnie lub wisi na ścianie bez ramy. Drukujemy na piankowym forex 3 mm i dibondzie aluminiowym 3 mm, z konturem ciętym na ploterze.",
    footerHeadline: "Tablice reklamowe. Solidna reklama bez kompromisów.",
    footerNote:
      "Forex 3 mm lub dibond aluminium 3 mm, druk UV 4/0, cięcie CNC do wymiaru, krawędzie szlifowane.",
    variant: "board",
    print3d: { shape: "board", aspect: 0.707 },
    defaultFormatId: "a2",
    defaultQuantity: 1,
    highlights: [
      { value: "1+", label: "sztuka minimum" },
      { value: "2", label: "materiały" },
      { value: "4 dni", label: "do wysyłki" },
    ],
    formats: [
      { id: "a3", label: "A3 · 297 × 420 mm", unitPrice: 35 },
      { id: "a2", label: "A2 · 420 × 594 mm", unitPrice: 59 },
      { id: "a1", label: "A1 · 594 × 841 mm", unitPrice: 99 },
      { id: "50x70", label: "50 × 70 cm", unitPrice: 75 },
      { id: "70x100", label: "70 × 100 cm", unitPrice: 129 },
    ],
  },
  {
    slug: "koszulki",
    name: "Koszulki",
    inHeading: "swoje koszulki",
    tagline:
      "Koszulki z własnym nadrukiem od 1 sztuki. Biała bawełna, druk DTG w pełnym kolorze.",
    intro:
      "Koszulka z nadrukiem to chodząca reklama, gadżet na event i odzież firmowa w jednym. Drukujemy bezpośrednio na tkaninie (DTG) na białej bawełnie 100% 180 g — pełny kolor, miękki w dotyku nadruk, który nie pęka w praniu. Wgraj grafikę i zobacz podgląd na koszulce przed zamówieniem.",
    footerHeadline: "Koszulki z nadrukiem. Twoja marka na ludziach.",
    footerNote:
      "Biała bawełna 100% 180 g, druk DTG 4/0 w pełnym kolorze, rozmiary S–XXL, nadruk na przodzie w cenie.",
    variant: "tshirt",
    formatNoun: "Rozmiar",
    mockupPreview: {
      surface: "tshirt",
      printArea: { x: 38, y: 44, width: 24, height: 30 },
    },
    defaultFormatId: "m",
    defaultQuantity: 1,
    noFees: true,
    highlights: [
      { value: "1+", label: "sztuka minimum" },
      { value: "5", label: "rozmiarów S–XXL" },
      { value: "3 dni", label: "do wysyłki" },
    ],
    formats: [
      { id: "s", label: "S", unitPrice: 39 },
      { id: "m", label: "M", unitPrice: 39 },
      { id: "l", label: "L", unitPrice: 39 },
      { id: "xl", label: "XL", unitPrice: 42 },
      { id: "xxl", label: "XXL", unitPrice: 45 },
    ],
  },
  {
    slug: "torby-papierowe",
    name: "Torby papierowe",
    inHeading: "swoje torby papierowe",
    tagline:
      "Papierowe torby z własnym nadrukiem. Ekologiczny papier kraft i biały, uchwyt skręcany.",
    intro:
      "Papierowa torba z logo to ekologiczne opakowanie, które klient nosi po całym mieście. Drukujemy na papierze kraft i białym 120 g, z uchwytem skręcanym lub płaskim. Wgraj grafikę i zobacz podgląd nadruku na torbie zanim zamówisz.",
    footerHeadline: "Torby papierowe. Ekologiczne opakowanie z Twoim logo.",
    footerNote:
      "Papier biały lub kraform 120 g, druk 4/0, uchwyt skręcany papierowy, dno wzmacniane, 3 rozmiary.",
    variant: "bag",
    mockupPreview: {
      surface: "bag",
      printArea: { x: 26, y: 40, width: 40, height: 38 },
    },
    defaultFormatId: "m",
    defaultQuantity: 50,
    noFees: true,
    highlights: [
      { value: "25+", label: "sztuk minimum" },
      { value: "3", label: "rozmiary" },
      { value: "4 dni", label: "do wysyłki" },
    ],
    formats: [
      { id: "s", label: "Mała · 18 × 8 × 22 cm", unitPrice: 3.9 },
      { id: "m", label: "Średnia · 26 × 12 × 33 cm", unitPrice: 5.5 },
      { id: "l", label: "Duża · 32 × 14 × 42 cm", unitPrice: 7.5 },
    ],
  },
  {
    slug: "torby-plocienne",
    name: "Torby płócienne",
    inHeading: "swoje torby płócienne",
    tagline:
      "Bawełniane torby tote z nadrukiem A4. Ekologiczne, wytrzymałe, długie ucho na ramię.",
    intro:
      "Płócienna torba bawełniana to ekologiczny nośnik reklamy, który klient nosi codziennie. Drukujemy pełnokolorowy nadruk A4 na naturalnej bawełnie, z długimi uchami na ramię. Im więcej zamówisz, tym taniej — od 16 zł za sztukę do 10 zł przy większych nakładach. Wgraj grafikę i zobacz podgląd na torbie przed zamówieniem.",
    footerHeadline: "Torby płócienne. Ekologiczna reklama, którą się nosi.",
    footerNote:
      "Bawełna naturalna ~140 g/m², nadruk A4 w pełnym kolorze, długie ucha na ramię, cena od 10 zł/szt. przy większych nakładach.",
    variant: "tote",
    mockupPreview: {
      surface: "tote",
      printArea: { x: 30, y: 40, width: 40, height: 34 },
    },
    defaultFormatId: "38x42",
    defaultQuantity: 25,
    noFees: true,
    priceTiers: [
      { minQty: 1, unitPrice: 16 },
      { minQty: 10, unitPrice: 14 },
      { minQty: 25, unitPrice: 13 },
      { minQty: 50, unitPrice: 12 },
      { minQty: 100, unitPrice: 11 },
      { minQty: 250, unitPrice: 10 },
    ],
    highlights: [
      { value: "od 10 zł", label: "przy nakładzie" },
      { value: "A4", label: "pole nadruku" },
      { value: "3 dni", label: "do wysyłki" },
    ],
    formats: [
      { id: "37x41", label: "37 × 41 cm", unitPrice: 16 },
      { id: "38x42", label: "38 × 42 cm (A4)", unitPrice: 16 },
      { id: "40x42", label: "40 × 42 cm", unitPrice: 16 },
    ],
  },
  {
    slug: "test-platnosci-internal",
    name: "Test płatności (wewnętrzny)",
    inHeading: "test płatności",
    tagline: "Produkt testowy — nie do publikacji.",
    intro:
      "Wewnętrzny produkt do weryfikacji integracji Stripe end-to-end. Nie pojawia się na listach, w wyszukiwarce ani w sitemapie — dostępny wyłącznie po bezpośrednim URL.",
    footerHeadline: "Test płatności.",
    footerNote: "Tylko do testów wewnętrznych.",
    variant: "stack",
    defaultFormatId: "min",
    defaultQuantity: 163,
    hidden: true,
    noFees: true,
    highlights: [
      { value: "1 gr", label: "cena jednostkowa" },
      { value: "2,00 zł", label: "brutto (min. Stripe)" },
      { value: "163 szt.", label: "nakład domyślny" },
    ],
    formats: [
      { id: "min", label: "Test · 1 grosz / szt.", unitPrice: 0.01 },
    ],
  },
];

export const visibleProducts: Product[] = products.filter((p) => !p.hidden);

/**
 * Cena jednostkowa dla danego nakładu. Dla produktów z `priceTiers` zwraca cenę
 * najwyższego progu spełniającego `minQty <= quantity`; w przeciwnym razie
 * cenę z wybranego formatu. Współdzielona przez klienta i Convex (server-side),
 * więc podgląd w konfiguratorze i kwota pobierana są zawsze spójne.
 */
export function unitPriceForQuantity(
  product: Product,
  format: ProductFormat,
  quantity: number,
): number {
  const tiers = product.priceTiers;
  if (tiers && tiers.length > 0) {
    let price = tiers[0].unitPrice;
    for (const tier of tiers) {
      if (quantity >= tier.minQty) price = tier.unitPrice;
    }
    return price;
  }
  return format.unitPrice;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return visibleProducts.map((p) => p.slug);
}

export function getAllProductSlugsIncludingHidden(): string[] {
  return products.map((p) => p.slug);
}
