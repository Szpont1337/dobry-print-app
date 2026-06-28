import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "wybor-czcionek-do-druku",
  title: "Jak wybrać czcionki do druku — fonty, które działają",
  excerpt:
    "Bezpieczne fonty do druku, kombinacje, hierarchia, czytelność. Przewodnik dla projektantów i mikrofirm zamawiających druk ulotek, wizytówek i broszur.",
  category: "poradniki",
  tags: ["fonty", "typografia", "design", "czytelność"],
  publishedAt: "2026-05-26",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["ulotki", "wizytowki", "plakaty"],
  sections: [
    {
      type: "p",
      text: "Font to cichy sprzedawca na Twojej [ulotce](/produkty/ulotki) — klient nie zauważa dobrego fontu, ale natychmiast wyczuwa zły. Comic Sans na wizytówce prawnika? Brak zaufania. Times New Roman na plakacie festiwalu muzycznego? Brak energii. W tym poradniku pokazujemy, jak dobrać fonty do druku: które są czytelne w małym rozmiarze, które działają na plakatach, jak łączyć fonty w pary i jakie błędy typograficzne psują efekt końcowy.",
    },
    {
      type: "h2",
      id: "serif-vs-sans-serif",
      text: "Serif vs sans-serif — podstawowy wybór",
    },
    {
      type: "p",
      text: "Fonty szeryfowe (serif) mają ozdobne zakończenia liter — np. Times New Roman, Georgia, Playfair Display. Kojarzą się z tradycją, elegancją, powagą. Fonty bezszeryfowe (sans-serif) mają czyste, proste krawędzie — np. Helvetica, Inter, Roboto. Kojarzą się z nowoczesnością, prostotą, technologią.",
    },
    {
      type: "table",
      caption: "Serif vs sans-serif — kiedy co wybrać",
      headers: ["Cecha", "Serif", "Sans-serif"],
      rows: [
        [
          "Skojarzenie",
          "Tradycja, elegancja, luksus",
          "Nowoczesność, prostota, tech",
        ],
        [
          "Czytelność w małym tekście",
          "Dobra (8-10 pt na papierze)",
          "Bardzo dobra",
        ],
        ["Czytelność na plakacie", "Słabsza z dystansu", "Lepsza z dystansu"],
        [
          "Branże",
          "Prawo, finanse, luksus, moda",
          "IT, startup, fitness, gastronomia",
        ],
        [
          "Przykłady",
          "Georgia, Merriweather, Lora",
          "Inter, Roboto, Open Sans, Helvetica",
        ],
      ],
    },
    {
      type: "h2",
      id: "minimalne-rozmiary",
      text: "Minimalne rozmiary fontów w druku",
    },
    {
      type: "table",
      caption: "Minimalne rozmiary fontów dla różnych elementów drukowanych",
      headers: ["Element", "Min. rozmiar", "Zalecany rozmiar", "Uwagi"],
      rows: [
        [
          "Tekst body (ulotka, broszura)",
          "8 pt",
          "9-11 pt",
          "Interlinia 120-140% rozmiaru",
        ],
        [
          "Drobny druk (regulamin, disclaimer)",
          "6 pt",
          "7-8 pt",
          "Sans-serif czytelniejszy w tym rozmiarze",
        ],
        [
          "Dane kontaktowe (wizytówka)",
          "7 pt",
          "8-9 pt",
          "Testuj wydruk próbny — 7 pt bywa nieczytelne",
        ],
        [
          "Nagłówek ulotki",
          "18 pt",
          "24-48 pt",
          "Zależy od formatu i dystansu czytania",
        ],
        ["Nagłówek plakatu A2", "48 pt", "72-120 pt", "Czytelny z 3-5 metrów"],
        [
          "Nagłówek plakatu B1",
          "72 pt",
          "120-200 pt",
          "Czytelny z 5-10 metrów",
        ],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Zasada 3-metrowa: wydrukuj nagłówek w docelowym rozmiarze, połóż na podłodze i cofnij się 3 metry. Jeśli nie odczytasz go bez mrużenia oczu — font jest za mały lub za cienki. Ta prosta metoda eliminuje 80% problemów z czytelnością plakatów i roll-upów.",
    },
    {
      type: "h2",
      id: "bezpieczne-fonty",
      text: "Bezpieczne fonty do druku — top 10",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Inter — uniwersalny sans-serif, doskonała czytelność w każdym rozmiarze, darmowy (Google Fonts)",
        "Roboto — popularny sans-serif od Google, neutralny i profesjonalny",
        "Open Sans — szeroki, czytelny, dobry do body i nagłówków",
        "Lato — elegancki sans-serif z ciepłym charakterem, polskiego projektanta",
        "Montserrat — geometryczny sans-serif, dobry do nagłówków i brandingu",
        "Merriweather — serif zoptymalizowany do ekranów i druku, dobry do body",
        "Playfair Display — elegancki serif do nagłówków premium i luksusowych",
        "Lora — ciepły serif do broszur, zaproszeń i dokumentów B2B",
        "Source Sans Pro — profesjonalny sans-serif od Adobe, świetny w dokumentach",
        "Raleway — lekki, nowoczesny sans-serif do nagłówków i brandingu kreatywnego",
      ],
    },
    {
      type: "h2",
      id: "laczenie-fontow",
      text: "Łączenie fontów w pary — sprawdzone kombinacje",
    },
    {
      type: "table",
      caption: "Sprawdzone pary fontów do druku",
      headers: ["Nagłówek", "Body", "Styl", "Zastosowanie"],
      rows: [
        [
          "Montserrat Bold",
          "Open Sans Regular",
          "Nowoczesny, czysty",
          "Ulotki, roll-upy, strony www",
        ],
        [
          "Playfair Display",
          "Lato Regular",
          "Elegancki, ciepły",
          "Zaproszenia, menu, broszury premium",
        ],
        [
          "Roboto Bold",
          "Roboto Regular",
          "Jednolity, profesjonalny",
          "Dokumenty B2B, papier firmowy, katalogi",
        ],
        [
          "Raleway Bold",
          "Merriweather Regular",
          "Kreatywny + tradycyjny",
          "Galerie, wystawy, agencje kreatywne",
        ],
        [
          "Inter Bold",
          "Inter Regular",
          "Minimalistyczny",
          "Startupy, tech, fintech, e-commerce",
        ],
        [
          "Lora Bold",
          "Source Sans Pro",
          "Klasyczny + nowoczesny",
          "Kancelarie, doradztwo, nieruchomości",
        ],
      ],
    },
    {
      type: "p",
      text: "Zasada: maksymalnie 2 fonty na projekcie. Nagłówek — font charakterystyczny (bold, display). Body — font neutralny, czytelny (regular, light). Trzeci font to chaos wizualny — klient nie wie, co jest ważne. Wyjątek: duże projekty (katalog 32+ stron) mogą używać 3 fontów, ale tylko z jasną hierarchią.",
    },
    {
      type: "h2",
      id: "zamiana-na-krzywe",
      text: "Zamiana fontów na krzywe — dlaczego to konieczne",
    },
    {
      type: "p",
      text: "Przed wysłaniem pliku do drukarni zamień fonty na krzywe (outlines/curves). Zamiana konwertuje litery z edytowalnych obiektów tekstowych na kształty wektorowe. Bez tego drukarnia musi mieć zainstalowany Twój font — jeśli go nie ma, system podmieni go na domyślny (np. Arial zamiast Montserrat) i cały projekt się rozjedzie.",
    },
    {
      type: "list",
      items: [
        "Adobe Illustrator: Select All → Type → Create Outlines (Ctrl+Shift+O)",
        "Adobe InDesign: eksport do [PDF/X z osadzonymi fontami](/blog/jak-przygotowac-pdf-do-druku) (lepsze niż krzywe, bo zachowuje hinting)",
        "CorelDRAW: zaznacz tekst → Arrange → Convert to Curves (Ctrl+Q)",
        "Canva: eksport do PDF automatycznie osadza fonty — nie trzeba zamieniać ręcznie",
      ],
    },
    {
      type: "callout",
      variant: "warn",
      text: "Po zamianie na krzywe tekst nie jest edytowalny. Zawsze zachowaj kopię pliku z edytowalnym tekstem (wersja robocza) i osobny plik z krzywymi (wersja do druku). Jeśli klient poprosi o zmianę tekstu po zamianie na krzywe, musisz wrócić do wersji roboczej.",
    },
    {
      type: "h2",
      id: "bledy-typograficzne",
      text: "Najczęstsze błędy typograficzne w druku",
    },
    {
      type: "list",
      items: [
        "Zbyt wiele fontów — 3+ fontów na ulotce to chaos wizualny",
        "Font za cienki (ultralight) w małym rozmiarze — przy 8 pt ultralight jest nieczytelny",
        "Biały tekst na jasnym tle bez kontrastu — minimum 4:1 kontrast tekstu do tła",
        "Tracking (odstępy między literami) zbyt ciasny — litery się zlewają w druku",
        "Brak polskich znaków (ą, ę, ś, ź, ż, ć, ń, ó, ł) — font musi obsługiwać pełen alfabet polski",
        "Tekst body wyrównany do środka — body wyrównuj do lewej (łatwiejsze do czytania)",
        "Brak hierarchii rozmiarów — nagłówek, podtytuł i body w tym samym rozmiarze",
        "Sieroty i wdowy — pojedyncze słowa na końcu/początku akapitu lub kolumny",
      ],
    },
    {
      type: "faq",
      items: [
        {
          q: "Czy mogę używać darmowych fontów z Google Fonts do druku komercyjnego?",
          a: "Tak. Wszystkie fonty w Google Fonts są licencjonowane pod Open Font License (OFL) lub Apache License — wolno je używać w projektach komercyjnych, w druku, na stronach www i w aplikacjach. Nie trzeba kupować licencji ani podawać autora (choć to miły gest).",
        },
        {
          q: "Czym się różni font do ekranu od fontu do druku?",
          a: "Technologicznie to ten sam plik (.ttf, .otf, .woff). Różnica w optymalizacji: fonty z hintingiem ekranowym (np. Verdana) wyglądają ostro na monitorze, ale w druku mogą być za szerokie. Fonty projektowane z myślą o druku (np. Adobe Garamond, Minion) mają lepsze proporcje na papierze. W praktyce: Inter, Roboto, Open Sans działają dobrze i na ekranie, i w druku.",
        },
        {
          q: "Jaki font na wizytówkę?",
          a: "Imię i nazwisko: font bold/semibold, 10-12 pt. Stanowisko: regular, 8-9 pt. Dane kontaktowe: regular lub light, 7-8 pt. Bezpieczne fonty: Inter, Roboto, Lato (nowoczesne), Lora, Georgia (eleganckie). Unikaj fontów dekoracyjnych — na wizytówce czytelność jest ważniejsza niż efekt artystyczny.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Masz projekt z fontami gotowy do druku?",
      body: "Wgraj PDF do DobrePrinty — sprawdzimy, czy fonty są osadzone lub zamienione na krzywe. Druk od 1 sztuki, dostawa w 24-48 h.",
      href: "/produkty/ulotki",
      label: "Zamów druk →",
    },
  ],
};
