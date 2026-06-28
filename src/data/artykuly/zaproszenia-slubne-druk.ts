import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "zaproszenia-slubne-druk",
  title: "Druk zaproszeń ślubnych — formaty, papier, terminy",
  excerpt:
    "Pełny przewodnik po drukowaniu zaproszeń ślubnych. Format kwadratowy vs DL, gramatura, papier ozdobny, tłoczenie, terminy zamówień przed weselem.",
  category: "produkty",
  tags: ["zaproszenia", "ślub", "premium", "tłoczenie", "papier ozdobny"],
  publishedAt: "2026-05-26",
  updatedAt: "2026-06-09",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["kartki-pocztowki", "wizytowki"],
  sections: [
    {
      type: "p",
      text: "Zaproszenie ślubne to pierwszy fizyczny kontakt gości z Waszym weselem — ono ustala ton, styl i oczekiwania. Rustykalne [kraft na papierze szarym](/blog/papier-ekologiczny-recycling)? Eleganckie tłoczenie złotem na bawełnie? Minimalistyczny druk na czystej bieli? Wybór papieru, formatu i wykończenia musi pasować do koncepcji ślubu. W tym poradniku pokrywamy wszystko: od formatów przez papier po terminy zamówień, żebyście nie musieli się stresować na ostatnią chwilę.",
    },
    {
      type: "h2",
      id: "formaty-zaproszen",
      text: "Popularne formaty zaproszeń ślubnych",
    },
    {
      type: "table",
      caption: "Formaty zaproszeń ślubnych",
      headers: ["Format", "Wymiary", "Styl", "Koperta"],
      rows: [
        [
          "DL (pojedyncze)",
          "100×210 mm",
          "Elegancki, wąski",
          "Koperta DL (110×220 mm)",
        ],
        [
          "A6 (pojedyncze)",
          "105×148 mm",
          "Klasyczny, kompaktowy",
          "Koperta C6 (114×162 mm)",
        ],
        [
          "A5 składane na pół",
          "148×210 mm → 148×105 mm",
          "Tradycyjny, z tekstem w środku",
          "Koperta C6 (114×162 mm)",
        ],
        [
          "Kwadrat 140×140 mm",
          "140×140 mm",
          "Nowoczesny, wyróżniający się",
          "Koperta kwadratowa (155×155 mm)",
        ],
        [
          "Kwadrat składany",
          "140×280 mm → 140×140 mm",
          "Premium, z dwiema stronami treści",
          "Koperta kwadratowa (155×155 mm)",
        ],
        ["Niestandardowy", "Dowolny", "Unikalny", "Koperta na wymiar (drożej)"],
      ],
    },
    {
      type: "p",
      text: "Trend 2026: format kwadratowy (130-150 mm) dominuje wśród par w wieku 25-35. DL pozostaje popularne wśród par preferujących klasykę. A5 składane to tradycja — babcia oczekuje kartki, którą otworzy jak książkę.",
    },
    {
      type: "h2",
      id: "papier",
      text: "Papier — który wybrać na zaproszenia",
    },
    {
      type: "table",
      caption: "Papiery na zaproszenia ślubne",
      headers: ["Papier", "Gramatura", "Wygląd", "Styl wesela"],
      rows: [
        [
          "Karton biały gładki",
          "300 g",
          "Czysty, nowoczesny",
          "Minimalistyczny, modern",
        ],
        [
          "Karton kremowy",
          "300 g",
          "Ciepły, elegancki",
          "Klasyczny, romantyczny",
        ],
        [
          "Kraft (szary)",
          "300 g",
          "Surowy, naturalny",
          "Rustykalny, boho, eco",
        ],
        [
          "Papier bawełniany",
          "300-400 g",
          "Gruby, miękki w dotyku",
          "Luksusowy, artystyczny",
        ],
        [
          "Papier prążkowany (laid)",
          "250-300 g",
          "Teksturowany, tradycyjny",
          "Elegancki, formalny",
        ],
        [
          "Papier perłowy",
          "250-300 g",
          "Lekki połysk, opalizujący",
          "Glamour, Hollywood",
        ],
        [
          "Papier akwarelowy",
          "250-300 g",
          "Chropowaty, artystyczny",
          "Boho, garden party, art",
        ],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Zamów próbki papieru przed zamówieniem nakładu. Większość drukarni wysyła zestaw próbek (5-10 rodzajów papieru) za 10-20 zł lub za darmo przy zamówieniu. Dotyk i wygląd na żywo są inne niż na ekranie — papier bawełniany na zdjęciu wygląda zwyczajnie, ale w dłoni robi efekt wow.",
    },
    {
      type: "h2",
      id: "wykonczenia",
      text: "Wykończenia premium dla zaproszeń",
    },
    {
      type: "list",
      items: [
        "Tłoczenie folią złotą — klasyka zaprosin premium. Tekst lub ornament w złocie na białym lub kremowym kartonie. Koszt: matryca 200-400 zł + 0,30-0,80 zł/szt.",
        "Tłoczenie folią srebrną — nowoczesny, zimny akcent. Dobrze na białym lub szarym papierze",
        "Tłoczenie ślepe (bez folii) — subtelny, wyczuwalny dotykiem relief. Elegancja bez koloru",
        "[Lakier UV wybiórczy](/blog/wykonczenia-folia-uv-tloczenie) — połysk na wybranych elementach (np. inicjały, ornament) na matowym tle",
        "Złocenie krawędzi (edge gilding) — złota lub srebrna krawędź kartonu. Ultra-premium, koszt 1-3 zł/szt.",
        "Wytłaczany wzór na kopercie — dopasowany ornament na kopercie, spójny z zaproszeniem",
        "Lak pieczęć (wax seal) — pieczęć lakowa zamykająca kopertę. Ręcznie lub maszynowo, 1-3 zł/szt.",
      ],
    },
    {
      type: "h2",
      id: "tekst-zaproszenia",
      text: "Co powinno być na zaproszeniu",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Imiona Pary Młodej (lub imiona rodziców zapraszających — tradycja)",
        "Data ślubu: dzień tygodnia, data, godzina ceremoni",
        "Miejsce ceremonii: nazwa kościoła/urzędu + adres",
        "Miejsce wesela: nazwa sali/restauracji + adres (jeśli inne niż ceremonia)",
        "Prośba o potwierdzenie (RSVP): do kiedy, na jaki numer/email",
        "Opcjonalnie: dress code, numer konta (jeśli para prosi o pieniądze zamiast prezentów), mapa dojazdu, informacja o noclegach",
      ],
    },
    {
      type: "h2",
      id: "dodatkowe-wkladki",
      text: "Dodatkowe wkładki do koperty",
    },
    {
      type: "list",
      items: [
        "RSVP card — osobna [karteczka](/produkty/kartki-pocztowki) z miejscem na wpisanie liczby gości i potwierdzenie",
        "Mapa dojazdu — schematyczna mapa do kościoła i sali weselnej",
        "Plan dnia — timeline ceremonii i wesela (dla gości z zagranicy szczególnie przydatny)",
        "Menu card — jeśli goście wybierają danie z góry",
        "Zakwaterowanie — informacja o zarezerwowanych pokojach w hotelu blisko sali",
      ],
    },
    {
      type: "h2",
      id: "terminy",
      text: "Terminy zamówień — kalendarz ślubny",
    },
    {
      type: "table",
      caption: "Harmonogram zamówienia zaproszeń ślubnych",
      headers: ["Kiedy", "Co zrobić"],
      rows: [
        [
          "6-8 mies. przed",
          "Wybór stylu zaproszenia, zamówienie próbek papieru",
        ],
        ["5-6 mies. przed", "Projekt zaproszenia (grafik lub szablon DIY)"],
        [
          "4-5 mies. przed",
          "Zamówienie druku (nakład + 10% zapas na błędy adresowe)",
        ],
        [
          "3-4 mies. przed",
          "Wysyłka zaproszeń (Save the Date wcześniej — 8-12 mies.)",
        ],
        ["2 mies. przed", "Deadline RSVP — zbieranie potwierdzeń"],
        ["1 mies. przed", "Dodruk ewentualnych zaproszeń last-minute"],
      ],
    },
    {
      type: "callout",
      variant: "warn",
      text: "Nie zamawiaj zaproszeń na ostatnią chwilę. Tłoczenie folią wymaga matrycy (5-7 dni roboczych). Papier ozdobny (bawełniany, perłowy) może wymagać zamówienia u producenta (7-14 dni). Planuj minimum 3-4 tygodnie na druk i wykończenie zaproszeń premium.",
    },
    {
      type: "h2",
      id: "ile-zamowic",
      text: "Ile zaproszeń zamówić",
    },
    {
      type: "p",
      text: "Zasada: 1 zaproszenie na parę/rodzinę (nie per osoba). Dla 100 gości potrzebujesz ok. 50-60 zaproszeń + 10% zapas (5-6 szt. na pomyłki adresowe, last-minute dopraszanie, pamiątka). Łączne zamówienie: 55-66 sztuk. Zaokrąglij do 70 — lepiej mieć za dużo niż za mało.",
    },
    {
      type: "h2",
      id: "koszt",
      text: "Ile kosztują zaproszenia ślubne",
    },
    {
      type: "table",
      caption: "Orientacyjne koszty zaproszeń ślubnych (70 szt.)",
      headers: ["Wariant", "Papier", "Wykończenie", "Cena za 70 szt."],
      rows: [
        ["Budget", "Karton biały 300 g", "Brak", "150-250 zł"],
        ["Standard", "Karton kremowy 300 g", "Folia matowa", "250-400 zł"],
        ["Premium", "Bawełniany 300 g", "Tłoczenie złotem", "500-900 zł"],
        [
          "Luxury",
          "Bawełniany 400 g",
          "Tłoczenie + złocenie krawędzi + lak",
          "900-1500 zł",
        ],
      ],
    },
    {
      type: "p",
      text: "Ceny nie obejmują kopert i projektu graficznego. Koperty: 0,50-3 zł/szt. (standardowe) do 5-8 zł/szt. (perłowe z nadrukiem). Projekt graficzny: 300-1500 zł (zależy od grafika i złożoności). Ceny obejmują druk, wykończenie i dostawę.",
    },
    {
      type: "faq",
      items: [
        {
          q: "Czy mogę wydrukować zaproszenia na drukarce domowej?",
          a: "Technicznie tak, ale nie polecamy. Drukarka atramentowa daje blade kolory na grubym papierze, atrament rozmazuje się przy kontakcie z wilgocią. Drukarka laserowa radzi sobie lepiej, ale nie obsługuje papierów ozdobnych (kraft, bawełniany, perłowy) i nie umożliwia tłoczenia. Dla 50-70 zaproszeń druk w drukarni jest opłacalny i daje nieporównywalnie lepszy efekt.",
        },
        {
          q: "Jak długo trwa druk zaproszeń?",
          a: "Prosty druk cyfrowy na kartonie: 48-72 h. Z folią matową: +48 h. Z tłoczeniem złotem: +5-7 dni (produkcja matrycy). Z papierem ozdobnym na zamówienie: +7-14 dni (oczekiwanie na papier). Łącznie dla wariantu premium: 2-3 tygodnie od zatwierdzenia projektu.",
        },
        {
          q: "Czy format kwadratowy jest droższy w wysyłce?",
          a: "Tak, nieznacznie. Koperta kwadratowa (155×155 mm) mieści się w standardzie listowego. Waga zaproszenia na kartonie 300 g z kopertą: ok. 20-30 g — mieści się w limicie listu ekonomicznego (do 50 g). Koszt wysyłki jest taki sam jak dla listu standardowego — sprawdź aktualny cennik Poczty Polskiej, bo stawki listowe zmieniają się co roku.",
        },
        {
          q: "Czy Save the Date to to samo co zaproszenie?",
          a: "Nie. Save the Date to wczesna informacja (8-12 mies. przed ślubem) z datą i miastem — bez szczegółów. Formalna zaproszenie wysyła się 3-4 mies. przed ślubem ze wszystkimi informacjami (miejsce, godzina, RSVP). Save the Date jest opcjonalny — zalecany dla ślubów destination lub w szczycie sezonu (czerwiec-wrzesień).",
        },
      ],
    },
    {
      type: "cta",
      heading: "Zamów zaproszenia ślubne w DobrePrinty",
      body: "Wybierz format (DL, kwadrat, A5 składane), papier (karton, bawełniany, perłowy) i wykończenie (tłoczenie, lakier UV). Od 10 sztuk, realizacja od 48 h.",
      href: "/produkty/kartki-pocztowki",
      label: "Konfiguruj zaproszenia →",
    },
  ],
};
