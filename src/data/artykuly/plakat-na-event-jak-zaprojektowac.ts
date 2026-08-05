import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "plakat-na-event-jak-zaprojektowac",
  title: "Plakat na event i koncert — jak zaprojektować, żeby przyciągał",
  excerpt:
    "Projekt plakatu eventowego krok po kroku: hierarchia informacji (kto, co, kiedy, gdzie), format i miejsce ekspozycji, typografia czytelna z 3 metrów, kod QR, kolor CMYK i przygotowanie pliku do druku.",
  category: "poradniki",
  tags: ["plakat", "event", "koncert", "projektowanie", "typografia"],
  publishedAt: "2026-08-02",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "HowTo",
  relatedProducts: ["plakaty"],
  sections: [
    {
      type: "p",
      text: "Dobry plakat eventowy robi dwie rzeczy naraz: z daleka przyciąga wzrok i zatrzymuje przechodnia, a z bliska w trzy sekundy odpowiada na pytania kto, co, kiedy i gdzie. Zły plakat robi jedno albo drugie — albo jest ładny, ale nie wiadomo, na co zaprasza, albo napchany informacjami, których nikt nie czyta. W tym poradniku pokazujemy, jak zaprojektować plakat na koncert, festiwal, spektakl czy event firmowy: od hierarchii informacji, przez format i typografię, po kod QR, kolor i przygotowanie pliku do druku. Jeśli szukasz samych wymiarów formatów, zajrzyj też do przewodnika o [formatach plakatów](/blog/druk-plakatow-formaty).",
    },
    {
      type: "h2",
      id: "hierarchia-informacji",
      text: "Krok 1: Hierarchia informacji — kto, co, kiedy, gdzie",
    },
    {
      type: "p",
      text: "Zanim otworzysz program graficzny, wypisz informacje i ustaw je w kolejności ważności. Na plakacie obowiązuje ostra hierarchia: jeden element dominuje (nazwa wydarzenia lub headliner), reszta schodzi na dalszy plan. Widz odczytuje plakat „skokowo” — najpierw największy element, potem drugi, potem szczegóły. Jeśli wszystko jest tej samej wielkości, oko nie wie, gdzie patrzeć, i idzie dalej.",
    },
    {
      type: "list",
      items: [
        "Poziom 1 (największy): nazwa wydarzenia / headliner — to, co ma zatrzymać z 5 metrów.",
        "Poziom 2: data i miejsce — najważniejsze fakty, bez nich plakat jest bezużyteczny.",
        "Poziom 3: godzina, cena/wstęp, support/program, kod QR z biletami.",
        "Poziom 4 (najmniejszy): organizatorzy, patroni, sponsorzy, drobne info prawne.",
        "Absolutne minimum, które MUSI się znaleźć: co, kiedy (dzień + godzina), gdzie (adres) i jak wejść (bilet/wstęp wolny + link).",
      ],
    },
    {
      type: "h2",
      id: "format-i-miejsce",
      text: "Krok 2: Format i miejsce ekspozycji",
    },
    {
      type: "p",
      text: "Format dobierz do miejsca, w którym plakat zawiśnie, i do odległości odbioru. B1 na słupie ogłoszeniowym czyta się z drugiej strony ulicy; A3 w witrynie kawiarni — z chodnika; A4 na tablicy w akademiku — z metra. Im dalej od widza, tym większy format i mniej treści.",
    },
    {
      type: "table",
      caption: "Format plakatu a miejsce i odległość odbioru",
      headers: ["Format", "Wymiar", "Gdzie", "Odległość odbioru"],
      rows: [
        ["A4", "210 × 297 mm", "Tablice, wnętrza, lada", "1–2 m"],
        ["A3", "297 × 420 mm", "Witryny, korytarze, kluby", "2–4 m"],
        ["A2", "420 × 594 mm", "Witryny, gabloty, ściany", "3–6 m"],
        ["B1", "707 × 1000 mm", "Słupy, citylight, plenery", "5–15 m"],
        ["A1", "594 × 841 mm", "Duże gabloty, hole", "5–10 m"],
      ],
    },
    {
      type: "h2",
      id: "typografia-i-czytelnosc",
      text: "Krok 3: Typografia — czytelność przede wszystkim",
    },
    {
      type: "p",
      text: "Plakat to nie ulotka trzymana w ręku — litery muszą być czytelne z dystansu. Praktyczna reguła: tytuł powinien dać się przeczytać z odległości, z jakiej plakat będzie oglądany. Ogranicz się do 1–2 krojów pisma (np. mocny, charakterny do tytułu i neutralny, czytelny do detali). Data i miejsce nie mogą być „ozdobnym” fontem, który ładnie wygląda, ale ciężko go odczytać. Unikaj tekstu w całości WERSALIKAMI w dłuższych blokach — wielkie litery czyta się wolniej.",
    },
    {
      type: "callout",
      variant: "tip",
      text: "Test 3 sekund i test miniatury. Zmniejsz projekt do wielkości znaczka pocztowego (tak wygląda z daleka) — jeśli nadal wiadomo, co to za event i kiedy, hierarchia jest dobra. Drugi test: pokaż projekt komuś na 3 sekundy i zapytaj, co zapamiętał. Jeśli nie zna daty i miejsca — przeprojektuj, zamiast dodawać kolejne elementy.",
    },
    {
      type: "h2",
      id: "qr-kod-i-cta",
      text: "Krok 4: Kod QR i wezwanie do działania",
    },
    {
      type: "p",
      text: "Plakat eventowy ma jedno zadanie po zatrzymaniu wzroku: skłonić do kupna biletu lub zapisania daty. Umieść wyraźny kod QR prowadzący do sprzedaży biletów lub wydarzenia — minimum 2 × 2 cm (na dużych formatach 3–4 cm), na jasnym tle, z zachowanym marginesem (quiet zone) dookoła. Obok QR dodaj krótki tekst CTA („Bilety: nazwastrony.pl” lub „Skanuj i rezerwuj”). Zawsze przetestuj wydrukowany kod telefonem — QR na ciemnym tle, za mały albo bez marginesu potrafi się nie zeskanować.",
    },
    {
      type: "h2",
      id: "kolor-i-kontrast",
      text: "Krok 5: Kolor i kontrast",
    },
    {
      type: "p",
      text: "Plakat konkuruje o uwagę z dziesiątkami innych na tym samym słupie — wygrywa kontrast, nie liczba kolorów. Mocna, ograniczona paleta (2–3 kolory + tło) czyta się lepiej niż tęcza. Zadbaj o wysoki kontrast tekstu do tła: jasny tekst na ciemnym tle lub odwrotnie. Pamiętaj, że plakat drukuje się w [CMYK, nie RGB](/blog/cmyk-vs-rgb) — jaskrawy neon z ekranu na papierze przygaśnie, więc projektuj od razu w CMYK i sprawdzaj kolory na miękkim proofie.",
    },
    {
      type: "h2",
      id: "przygotowanie-pliku",
      text: "Krok 6: Przygotowanie pliku do druku",
    },
    {
      type: "list",
      items: [
        "Spad 3 mm z każdej strony i bezpieczny margines 5 mm na tekst od krawędzi — szczegóły w poradniku [jak zrobić bleed](/blog/jak-zrobic-bleed).",
        "Rozdzielczość 300 dpi w skali 1:1 dla plakatów oglądanych z bliska (A4–A2); dla dużych formatów oglądanych z dystansu wystarczy mniej.",
        "Kolory w CMYK, czcionki zamienione na krzywe lub osadzone, przezroczystości spłaszczone.",
        "Eksport do PDF (najlepiej PDF/X) — pełną procedurę opisujemy w [jak przygotować PDF do druku](/blog/jak-przygotowac-pdf-do-druku).",
        "Czarne tło i duże aple: użyj rich black, a nie samego K100 (inaczej czerń wyjdzie szara) — patrz [rich black vs K100](/blog/rich-black-vs-czarny-k100).",
      ],
    },
    {
      type: "callout",
      variant: "warn",
      text: "Największy błąd plakatów eventowych to brak daty lub miejsca w hierarchii — informacje są, ale drobnym drukiem u dołu, przytłoczone grafiką. Zanim wyślesz plik, zasłoń wszystko poza nagłówkiem i sprawdź, czy da się w sekundę znaleźć KIEDY i GDZIE. Jeśli musisz szukać — to za mało wyeksponowane.",
    },
    {
      type: "h2",
      id: "dystrybucja",
      text: "Krok 7: Gdzie wieszać i ile drukować",
    },
    {
      type: "p",
      text: "Zaplanuj dystrybucję razem z projektem. Kluby, kawiarnie, uczelnie, sklepy tematyczne, biblioteki, legalne słupy ogłoszeniowe — każde miejsce ma inny format i inną odległość odbioru. Rozsądny miks to kilkanaście–kilkadziesiąt A3 do witryn i wnętrz plus kilka B1 na słupy w mocnych lokalizacjach. Drukuj z zapasem 10–15% na dokleję i egzemplarze zniszczone. Do wnętrz i witryn świetnie sprawdza się papier satynowy 170 g, który nie odbija światła jak błysk, a jest sztywniejszy niż cienka ulotka.",
    },
    {
      type: "faq",
      items: [
        {
          q: "Jaki format plakatu na koncert wybrać?",
          a: "Do witryn i wnętrz najczęściej A3 (297 × 420 mm) lub A2 — czytelne z 2–6 metrów. Na słupy ogłoszeniowe i przestrzeń miejską B1 (707 × 1000 mm), bo czyta się go z kilkunastu metrów. Zasada: im dalej od widza, tym większy format i mniej treści.",
        },
        {
          q: "Co musi się znaleźć na plakacie eventowym?",
          a: "Absolutne minimum: co (nazwa wydarzenia), kiedy (dzień i godzina), gdzie (adres) oraz jak wejść (bilet czy wstęp wolny, najlepiej z kodem QR do sprzedaży). Nazwa i data powinny być największymi elementami; sponsorzy i drobne informacje — najmniejszymi.",
        },
        {
          q: "Jak duży powinien być kod QR na plakacie?",
          a: "Minimum 2 × 2 cm na małych formatach, 3–4 cm na dużych, zawsze na jasnym tle i z zachowanym marginesem (quiet zone) dookoła. Po wydrukowaniu przetestuj kod telefonem — zbyt mały QR, na ciemnym tle lub bez marginesu często się nie skanuje.",
        },
        {
          q: "W jakim programie i rozdzielczości projektować plakat?",
          a: "Najlepiej w programie DTP (InDesign, Illustrator, Affinity) w CMYK. Rozdzielczość 300 dpi w skali 1:1 dla plakatów oglądanych z bliska (A4–A2); dla wielkich formatów oglądanych z dystansu wystarczy mniej. Plik eksportuj do PDF/X ze spadem 3 mm i czcionkami zamienionymi na krzywe.",
        },
        {
          q: "Ile plakatów wydrukować na wydarzenie?",
          a: "Zależy od skali eventu i liczby lokalizacji, ale rozsądny miks to kilkanaście–kilkadziesiąt A3 do witryn i wnętrz plus kilka B1 na słupy w mocnych punktach. Drukuj 10–15% ponad plan na dokleję i egzemplarze, które ktoś zerwie lub zniszczy.",
        },
        {
          q: "Dlaczego kolory plakatu są mniej jaskrawe niż na ekranie?",
          a: "Ekran świeci (RGB), a papier odbija światło (CMYK). Neonowe zielenie i błękity z monitora po konwersji do CMYK zawsze przygasają. Projektuj od początku w CMYK, a bardzo intensywne barwy zastąp najbliższymi osiągalnymi w druku — unikniesz rozczarowania po odbiorze.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Masz gotowy projekt plakatu?",
      body: "Drukujemy plakaty w formatach od A3 do B1 na satynowym papierze 170 g — idealne do witryn, gablot i słupów. Już od 1 sztuki, pakowane w sztywne tuby, wysyłka w 3 dni robocze.",
      href: "/produkty/plakaty",
      label: "Zamów plakaty →",
    },
  ],
};
