import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "papier-firmowy-jak-zaprojektowac",
  title: "Papier firmowy — jak zaprojektować profesjonalny szablon",
  excerpt:
    "Wymiary, marginesy, dane prawne, hierarchia — pełny przewodnik projektowania papieru firmowego dla firm B2B. Format A4, układ pionowy, elementy obowiązkowe.",
  category: "produkty",
  tags: ["papier firmowy", "B2B", "branding", "identyfikacja wizualna"],
  publishedAt: "2026-05-26",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["papier-firmowy", "wizytowki"],
  sections: [
    {
      type: "p",
      text: "Papier firmowy to fundament identyfikacji wizualnej — każda oferta, umowa, faktura i list wychodzący z firmy buduje (lub niszczy) profesjonalny wizerunek. Dobrze zaprojektowany papier firmowy łączy branding z funkcjonalnością: logo we właściwym miejscu, dane prawne zgodne z KRS/CEIDG, wystarczająco dużo wolnego miejsca na treść. W tym poradniku pokazujemy, jak zaprojektować szablon od zera.",
    },
    {
      type: "h2",
      id: "format-i-wymiary",
      text: "Format i wymiary — standard A4",
    },
    {
      type: "p",
      text: "Papier firmowy drukujemy w formacie A4 (210×297 mm). Plik do druku: 216×303 mm (spady 3 mm z każdej strony). Marginesy bezpieczne dla treści: minimum 15 mm z każdej strony, zalecane 20 mm lewy margines (miejsce na bindowanie / wpięcie do segregatora).",
    },
    {
      type: "table",
      caption: "Strefy papieru firmowego A4",
      headers: ["Strefa", "Pozycja", "Wysokość", "Zawartość"],
      rows: [
        [
          "Nagłówek (header)",
          "Góra, pełna szerokość",
          "25-40 mm",
          "Logo, nazwa firmy, ewentualnie hasło",
        ],
        [
          "Pole adresowe",
          "Lewy górny róg pod nagłówkiem",
          "30-40 mm",
          "Adres odbiorcy (zgodny z normą okienka koperty DL)",
        ],
        ["Treść", "Środek strony", "150-180 mm", "Tekst listu / dokumentu"],
        [
          "Stopka (footer)",
          "Dół, pełna szerokość",
          "20-30 mm",
          "Dane rejestrowe, kontakt, konto bankowe",
        ],
      ],
    },
    {
      type: "h2",
      id: "elementy-obowiazkowe",
      text: "Elementy obowiązkowe papieru firmowego",
    },
    {
      type: "list",
      items: [
        "[Logo firmy](/blog/logo-do-druku-zasady) — umieszczone w nagłówku, wersja jednokolorowa lub pełnokolorowa",
        "Pełna nazwa firmy — zgodna z KRS lub CEIDG",
        "Adres siedziby — ulica, kod pocztowy, miasto",
        "NIP — obowiązkowy na fakturach, zalecany na papierze firmowym",
        "REGON — wymagany dla spółek prawa handlowego",
        "KRS — numer rejestrowy dla spółek zarejestrowanych w KRS",
        "Kapitał zakładowy — obowiązkowy dla sp. z o.o. i S.A. (podaj kwotę i walutę)",
        "Dane kontaktowe — telefon, e-mail, strona www",
        "Numer konta bankowego — opcjonalny, przydatny na dokumentach płatniczych",
      ],
    },
    {
      type: "callout",
      variant: "warn",
      text: "Brak danych rejestrowych na papierze firmowym spółki to wykroczenie. Ustawa o KRS wymaga podawania: firmy (nazwy), siedziby i adresu, numeru KRS, NIP, oznaczenia sądu rejestrowego, kapitału zakładowego (dla sp. z o.o. i S.A.). Kary: grzywna do 5000 zł.",
    },
    {
      type: "h2",
      id: "hierarchia-wizualna",
      text: "Hierarchia wizualna — co ważniejsze, co mniejsze",
    },
    {
      type: "p",
      text: "Nagłówek to strefa brandu: logo (dominujące), nazwa firmy, ewentualnie claim/hasło reklamowe. Stopka to strefa informacyjna: drobny tekst (7-8 pt) z danymi rejestrowym, kontaktem, kontem bankowym. Środek strony to przestrzeń na treść — musi być czysta, bez rozpraszaczy.",
    },
    {
      type: "list",
      items: [
        "Logo: wysokość 15-25 mm, umieszczone w lewym górnym rogu lub na środku nagłówka",
        "Nazwa firmy: jeśli logo jest logotypem (zawiera nazwę) — nie powtarzaj nazwy tekstem",
        "Claim/hasło: opcjonalne, 8-9 pt, pod logo lub w prawym górnym rogu",
        "Dane stopki: 7-8 pt, kolor szary (np. 60% czarnego) lub firmowy kolor w jasnym odcieniu",
        "Linia oddzielająca nagłówek od treści: opcjonalna, 0,5 pt, kolor firmowy",
      ],
    },
    {
      type: "h2",
      id: "typografia-i-kolory",
      text: "Typografia i kolory",
    },
    {
      type: "p",
      text: "Font treści: ten sam co w dokumentach biurowych firmy (np. jeśli firma używa Calibri w Wordzie, użyj Calibri też na papierze firmowym). Alternatywnie: [font z identyfikacji wizualnej](/blog/wybor-czcionek-do-druku) firmy. Rozmiar treści: 11-12 pt, interlinia 1,3-1,5. Font danych stopki: 7-8 pt, regular lub light.",
    },
    {
      type: "p",
      text: "Kolory: nagłówek i stopka w kolorach firmowych (zgodnych z brand bookiem). Treść zawsze w [czarnym K100](/blog/rich-black-vs-czarny-k100). Maksymalnie 2 kolory firmowe + czarny. Unikaj gradientów i efektów w nagłówku — papier firmowy ma być powtarzalny w druku cyfrowym i offsetowym bez różnic kolorystycznych.",
    },
    {
      type: "h2",
      id: "papier-i-gramatura",
      text: "Jaki papier na papier firmowy",
    },
    {
      type: "table",
      caption: "Dobór papieru do papieru firmowego",
      headers: ["Papier", "Gramatura", "Zastosowanie", "Cena"],
      rows: [
        [
          "Offset biały",
          "80-90 g",
          "Codzienna korespondencja, druk laserowy",
          "Niska",
        ],
        [
          "Offset premium",
          "100-120 g",
          "Oferty handlowe, listy do klientów",
          "Średnia",
        ],
        [
          "Linen (prążkowany)",
          "100-120 g",
          "Kancelarie prawne, firmy premium",
          "Wyższa",
        ],
        [
          "Laid (żeberkowy)",
          "100-120 g",
          "Biura nieruchomości, doradztwo",
          "Wyższa",
        ],
        [
          "Bawełniany (cotton)",
          "120 g",
          "Firmy luksusowe, jubilerzy, architekci",
          "Wysoka",
        ],
      ],
    },
    {
      type: "p",
      text: "Zasada: gramatura 90-120 g to bezpieczny zakres. Poniżej 90 g papier jest zbyt cienki i wygląda tanio. Powyżej 120 g papier jest zbyt sztywny do podawania przez drukarkę biurową (zacina się w podajniku). Jeśli papier firmowy ma być drukowany też wewnętrznie na drukarce laserowej — testuj gramaturę na swojej drukarce przed zamówieniem nakładu.",
    },
    {
      type: "h2",
      id: "okienko-koperty-dl",
      text: "Okienko koperty DL — pozycja adresu odbiorcy",
    },
    {
      type: "p",
      text: "Standardowa koperta DL z okienkiem prawym (110×220 mm) ma okienko w pozycji: 20 mm od prawej krawędzi, 15 mm od dołu koperty, wymiary okienka 90×45 mm. Żeby adres odbiorcy na papierze firmowym był widoczny przez okienko po złożeniu arkusza A4 na trzy (falc C), adres musi znajdować się: 20 mm od lewej krawędzi, 50-55 mm od góry arkusza, blok tekstu max 85×40 mm.",
    },
    {
      type: "callout",
      variant: "tip",
      text: "Jeśli wysyłasz dużo korespondencji w kopertach z okienkiem — zaprojektuj szablon Word/Pages z polem tekstowym w dokładnej pozycji okienka. Wydrukuj testowo na zwykłym papierze, włóż do koperty i sprawdź, czy adres jest widoczny. To jednorazowy test, który oszczędza setki kopert z niewłaściwie umieszczonym adresem.",
    },
    {
      type: "h2",
      id: "szablon-word",
      text: "Szablon Word / Google Docs",
    },
    {
      type: "p",
      text: "Po zaprojektowaniu papieru firmowego w programie graficznym przygotuj szablon edytowalny dla pracowników. W Wordzie: wstaw grafikę nagłówka i stopki jako elementy Header/Footer (wstawiane automatycznie na każdej stronie). Ustaw marginesy treści zgodne z projektem (15-20 mm). Zdefiniuj style akapitu (font, rozmiar, interlinia). Zapisz jako .dotx (szablon).",
    },
    {
      type: "p",
      text: "W Google Docs: wstaw grafikę nagłówka przez Insert → Header. Stopkę dodaj przez Insert → Footer. Ograniczenie: Google Docs nie pozwala na precyzyjne pozycjonowanie grafik w nagłówku — dla dokładnego odwzorowania projektu lepszy jest Word lub druk na gotowym papierze firmowym.",
    },
    {
      type: "h2",
      id: "druk-vs-drukarka",
      text: "Druk w drukarni vs drukarka biurowa",
    },
    {
      type: "table",
      caption: "Porównanie metod druku papieru firmowego",
      headers: [
        "Cecha",
        "Drukarnia (offset/cyfrowy)",
        "Drukarka biurowa (laser)",
      ],
      rows: [
        [
          "Jakość kolorów",
          "Wysoka, powtarzalna CMYK",
          "Dobra, ale zależna od tonera",
        ],
        ["Koszt 500 szt.", "150-250 zł", "250-400 zł (toner + papier)"],
        ["Koszt 1000 szt.", "200-350 zł", "500-800 zł"],
        [
          "Elastyczność",
          "Stały nakład, zmiana = nowy druk",
          "Drukujesz na bieżąco",
        ],
        [
          "Papier specjalny",
          "Pełen wybór (linen, laid, cotton)",
          "Ograniczony do tego, co przyjmie drukarka",
        ],
        ["Czas realizacji", "48-72 h + dostawa", "Natychmiast"],
      ],
    },
    {
      type: "p",
      text: "Optymalny model: zamów w drukarni 500-1000 arkuszy z nagłówkiem i stopką (bez treści). Treść drukuj na tych arkuszach drukarką biurową. Łączysz jakość drukarni (kolory logo, papier premium) z elastycznością drukarki (każdy dokument inny).",
    },
    {
      type: "faq",
      items: [
        {
          q: "Czy papier firmowy musi być dwustronny?",
          a: "Nie — standardowy papier firmowy jest jednostronny (nagłówek + stopka na stronie 1). Strona 2 jest czysta lub z subtelnym logo watermark. Druk dwustronny ma sens tylko jeśli regularne listy są dłuższe niż 1 strona i chcesz branding na każdej.",
        },
        {
          q: "Ile sztuk papieru firmowego zamówić na start?",
          a: "Dla mikrofirmy (1-5 osób): 250-500 sztuk. Dla małej firmy (5-20 osób): 500-1000 sztuk. Dla średniej firmy: 1000-2000 sztuk. Nie zamawiaj więcej niż roczne zużycie — dane rejestrowe, telefon lub adres mogą się zmienić, a wtedy cały nakład jest do wyrzucenia.",
        },
        {
          q: "Czy mogę wydrukować papier firmowy na zwykłej drukarce?",
          a: "Tak, jeśli masz drukarkę laserową kolorową i papier 90-120 g. Drukarki atramentowe nie nadają się — atrament rozmazuje się przy kontakcie z wilgocią (np. pot dłoni). Jakość kolorów z drukarki laserowej jest dobra, ale nie dorównuje drukowi offsetowemu na papierze specjalnym.",
        },
        {
          q: "Jak przygotować plik do druku papieru firmowego?",
          a: "Format A4 ze spadami: 216×303 mm. CMYK, 300 dpi, fonty zamienione na krzywe. Eksport do PDF/X-1a lub PDF/X-4. Nagłówek i stopka jako elementy graficzne — treść zostawisz pustą (będzie drukowana osobno na drukarce biurowej).",
        },
      ],
    },
    {
      type: "cta",
      heading: "Zamów profesjonalny papier firmowy",
      body: "Druk na papierze offsetowym 90-120 g lub premium (linen, laid). Od 100 sztuk, dostawa w 48-72 h.",
      href: "/produkty/papier-firmowy",
      label: "Konfiguruj papier firmowy →",
    },
  ],
};
