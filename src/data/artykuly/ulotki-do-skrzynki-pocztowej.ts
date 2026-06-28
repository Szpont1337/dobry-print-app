import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "ulotki-do-skrzynki-pocztowej",
  title: "Ulotki do skrzynki pocztowej — jak zaprojektować skuteczną kampanię",
  excerpt:
    "Ulotki masowe do skrzynek pocztowych. Format DL vs A6, dystrybucja, konwersja, koszty. Praktyczny poradnik dla lokalnych firm i usługodawców.",
  category: "biznes",
  tags: [
    "ulotki",
    "kampania",
    "dystrybucja",
    "marketing lokalny",
    "skrzynki pocztowe",
  ],
  publishedAt: "2026-05-26",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["ulotki", "skladane-ulotki"],
  sections: [
    {
      type: "p",
      text: "Ulotka w skrzynce pocztowej to jeden z najstarszych kanałów marketingu lokalnego — i wciąż jeden z najskuteczniejszych dla biznesów działających w konkretnej okolicy. Pizza na wynos, salon fryzjerski, przychodnia weterynaryjna, firma sprzątająca — to branże, które konwertują ulotkę w klienta, bo odbiorca mieszka 5 minut drogi od usługodawcy. W tym poradniku pokrywamy cały proces: od projektu, przez druk, po dystrybucję i pomiar konwersji.",
    },
    {
      type: "h2",
      id: "format",
      text: "Jaki format ulotki do skrzynki",
    },
    {
      type: "table",
      caption: "Formaty ulotek do skrzynek pocztowych",
      headers: ["Format", "Wymiary", "Zalety", "Wady"],
      rows: [
        [
          "DL (100×210 mm)",
          "Wąski, wysoki",
          "Mieści się w każdej skrzynce, elegancki",
          "Mniej miejsca na treść",
        ],
        [
          "A6 (105×148 mm)",
          "Pocztówkowy",
          "Kompaktowy, tani w druku",
          "Może wypaść ze skrzynki",
        ],
        [
          "A5 (148×210 mm)",
          "Średni",
          "Dużo miejsca na treść i zdjęcia",
          "Nie mieści się w wąskich skrzynkach",
        ],
        [
          "DL składane (z A4)",
          "3 łamy, 6 stron",
          "Najwięcej treści, efekt mini-katalogu",
          "Droższy druk i falcowanie",
        ],
      ],
    },
    {
      type: "p",
      text: "Rekomendacja: DL lub A6 dla prostych komunikatów (promocja, otwarcie, kupon). A5 dla ofert z większą ilością informacji. [DL składane](/produkty/skladane-ulotki) dla mini-katalogów (np. menu restauracji, lista usług). DL jest bezpieczny wybór — mieści się w 100% skrzynek i ma proporcje, które wymuszają jasny, zwięzły komunikat.",
    },
    {
      type: "h2",
      id: "projekt-ulotki",
      text: "Projekt ulotki do skrzynki — zasady",
    },
    {
      type: "list",
      items: [
        "Headline na 50% powierzchni awersów — klient widzi ulotkę max 3 sekundy zanim wyrzuci",
        "Jedna oferta, nie cały cennik — zbyt dużo informacji = brak akcji",
        'CTA z deadline: „Kupon -20% ważny do 30 czerwca" (presja czasowa podnosi konwersję o 30-50%)',
        "Numer telefonu duży i czytelny — wiele osób dzwoni z ulotki, nie wchodzi na stronę",
        'Mapa lub adres z odległością: „5 minut pieszo od Twojego bloku" — lokalizacja to argument',
        "QR kod do rezerwacji / zamówienia online — dla klientów cyfrowych",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Kupon fizyczny na ulotce (odcinany lub do okazania) zwiększa konwersję 2-3× wobec ulotki bez kuponu. Klient trzyma ulotkę dłużej, bo ma powód — kupon = pieniądze. Kupon z kodem unikalnym (np. WIOSNA24-KRK) pozwala też zmierzyć skuteczność kampanii.",
    },
    {
      type: "h2",
      id: "gramatura-i-papier",
      text: "Papier i gramatura — co wytrzyma skrzynkę",
    },
    {
      type: "p",
      text: "Ulotka w skrzynce pocztowej musi wytrzymać kontakt z innymi listami, gazetami i wilgocią. [Minimalna gramatura: 170 g](/blog/gramatura-papieru-ulotki). Ulotka 130 g jest zbyt miękka — gnie się, marszczy, wygląda tanio. Folia matowa to plus: chroni przed wilgocią i zabrudzeniami, dodaje profesjonalny wygląd. Koszt folii matowej przy 1000 szt. DL: +30-50 zł (niewielki wydatek wobec wartości kampanii).",
    },
    {
      type: "h2",
      id: "dystrybucja",
      text: "Dystrybucja — jak dostarczyć ulotki do skrzynek",
    },
    {
      type: "table",
      caption: "Metody dystrybucji ulotek do skrzynek",
      headers: ["Metoda", "Koszt za 1000 szt.", "Zasięg", "Kontrola"],
      rows: [
        [
          "Samodzielna dystrybucja",
          "0 zł (Twój czas)",
          "Ograniczony",
          "Pełna — wiesz, gdzie trafiły",
        ],
        [
          "Kolportaż (firma)",
          "150-300 zł / 1000 szt.",
          "Duży",
          "Średnia — raport z GPS",
        ],
        [
          "Poczta Polska (Direct Mail)",
          "400-600 zł / 1000 szt.",
          "Precyzyjny (kody pocztowe)",
          "Wysoka — potwierdzenie dostarczenia",
        ],
        [
          "Gazety lokalne (insert)",
          "200-400 zł / 1000 szt.",
          "Duży",
          "Niska — zależy od dystrybucji gazety",
        ],
      ],
    },
    {
      type: "p",
      text: "Dla mikrofirm (salon, restauracja, gabinet): samodzielna dystrybucja 500-1000 [ulotek](/produkty/ulotki) w okolicy 1-2 km to najlepsza metoda na start. Koszt: tylko druk (ok. 200-350 zł za 1000 DL). Czas: 3-5 godzin spaceru. Dla firm z większym budżetem: kolportaż z raportowaniem GPS gwarantuje zasięg 5000-10000 skrzynek.",
    },
    {
      type: "h2",
      id: "konwersja",
      text: "Konwersja — ile klientów z 1000 ulotek",
    },
    {
      type: "p",
      text: "Średnia konwersja ulotek do skrzynek: 0,5-2% (5-20 reakcji na 1000 ulotek). To wydaje się mało, ale przy niskim koszcie ulotki (0,25-0,40 zł/szt.) i wartości klienta (np. obiad w restauracji za 80 zł) ekonomia się zgadza: 1000 ulotek za 300 zł + dystrybucja 200 zł = 500 zł. 10 nowych klientów × 80 zł = 800 zł przychodu. ROI: 60%.",
    },
    {
      type: "table",
      caption: "Szacunkowa konwersja ulotek do skrzynek wg branży",
      headers: [
        "Branża",
        "Konwersja",
        "Średni przychód z klienta",
        "ROI z 1000 ulotek",
      ],
      rows: [
        ["Gastronomia (pizza, sushi)", "1-3%", "50-100 zł", "Wysoki"],
        [
          "Usługi domowe (sprzątanie, hydraulik)",
          "0,5-1,5%",
          "150-500 zł",
          "Bardzo wysoki",
        ],
        ["Beauty (fryzjer, kosmetyczka)", "0,5-2%", "80-200 zł", "Wysoki"],
        [
          "Fitness (siłownia, joga)",
          "0,3-1%",
          "100-200 zł/mies.",
          "Średni (LTV wysoki)",
        ],
        [
          "Nieruchomości (agencja)",
          "0,1-0,5%",
          "5000-15000 zł (prowizja)",
          "Wysoki przy konwersji",
        ],
        [
          "E-commerce / online-only",
          "0,1-0,3%",
          "Zależy",
          "Niski — lepsze kanały cyfrowe",
        ],
      ],
    },
    {
      type: "h2",
      id: "pomiar",
      text: "Jak mierzyć skuteczność kampanii",
    },
    {
      type: "list",
      items: [
        "Unikalny kupon: kod rabatowy wydrukowany na ulotce (np. WIOSNA24). Liczysz użycia kodu = konwersja",
        "Unikalny numer telefonu: przekierowanie na drugi numer — połączenia z tego numeru = klienci z ulotki",
        "Unikalny URL: www.firma.pl/oferta-wiosna z parametrem UTM. Wejścia na ten URL = zainteresowanie z ulotki",
        "QR kod z parametrami: skanowania QR = zainteresowanie. Konwersja na stronie = klienci",
        'Proste pytanie: „Skąd się o nas dowiedziałeś?" przy kasie/rejestracji. Mniej precyzyjne, ale darmowe',
      ],
    },
    {
      type: "h2",
      id: "legalnosc",
      text: "Czy wrzucanie ulotek do skrzynek jest legalne",
    },
    {
      type: "p",
      text: 'Tak, wrzucanie ulotek do skrzynek pocztowych jest legalne w Polsce. Nie wymaga zgody właściciela skrzynki. Wyjątek: skrzynka oznaczona naklejką „Zakaz wrzucania reklam" lub „Nie wrzucać ulotek" — wrzucenie ulotki mimo zakazu to wykroczenie (art. 63a Kodeksu wykroczeń — umieszczanie ogłoszeń w miejscu do tego nieprzeznaczonym). W praktyce: szanuj naklejki z zakazem.',
    },
    {
      type: "p",
      text: "Uwaga: wspólnoty mieszkaniowe i spółdzielnie mogą zakazać kolportażu na terenie nieruchomości (klatki schodowe, skrzynki wewnątrz budynku). Skrzynki na zewnątrz budynku (przy płocie, na ogrodzeniu) są dostępne publicznie. Zawsze pytaj zarządcę nieruchomości, jeśli kolportujesz w zamkniętym osiedlu.",
    },
    {
      type: "faq",
      items: [
        {
          q: "Ile ulotek potrzebuję na kampanię dzielnicową?",
          a: "Dla jednej dzielnicy dużego miasta (15 000-25 000 mieszkańców): 3000-5000 ulotek (1 na gospodarstwo domowe, przy założeniu 3-4 os./gospodarstwo). Dla małego miasta (50 000 mieszkańców): 10 000-15 000 ulotek. Zacznij od mniejszego nakładu (1000-2000), zmierz konwersję, potem skaluj.",
        },
        {
          q: "Kiedy najlepsza pora na kampanię ulotkową?",
          a: "Wtorek-czwartek to najlepsze dni (skrzynka nie jest zalewana poniedziałkową pocztą). Unikaj weekendów i świąt — ulotka zaginie wśród reklam i gazet. Sezonowość: gastronomia → wiosna/lato, fitness → styczeń/wrzesień, usługi domowe → marzec-maj (porządki wiosenne). Unikaj grudnia — skrzynki pełne kartek świątecznych.",
        },
        {
          q: "Czy ulotka dwustronna jest warta dopłaty?",
          a: "Tak. Awers to hak (headline + CTA + kupon), rewers to argumenty (lista usług, zdjęcia, mapa). Ulotka jednostronna marnuje 50% powierzchni. Koszt 4/4 vs 4/0: +30-40%. Przy 1000 DL: różnica to ok. 50-80 zł — niewielki koszt wobec wartości kampanii.",
        },
        {
          q: "Jak uniknąć wyrzucenia ulotki od razu?",
          a: "Kupon rabatowy (fizyczny odcinany lub do okazania) — klient nie wyrzuci pieniędzy. Kalendarz/rozkład jazdy na rewersie — użyteczność zatrzymuje ulotkę na lodówce. Magnes na lodówkę z logo i telefonem — dołączany do ulotki, koszt 0,50-1 zł/szt., ale trwałość miesiące-lata. Grubszy papier (200 g+) — podświadomie kojarzy się z wartością, trudniej wyrzucić.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Zamów ulotki na kampanię lokalną",
      body: "Druk od 100 sztuk, format DL lub A6, kreda 170 g z folią matową. Dostawa w 48-72 h — zdążysz na kampanię weekendową.",
      href: "/produkty/ulotki",
      label: "Zamów ulotki →",
    },
  ],
};
