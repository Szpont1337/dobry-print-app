import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "ulotki-skladane-falcowanie-rodzaje",
  title: "Ulotki składane — falcowanie C, Z, na pół i inne rodzaje składu",
  excerpt:
    "Porównanie rodzajów falcowania ulotek: falc C (roladka), Z (harmonijka), na pół, okno, krzyżowy. Wymiary łamów, błędy projektowe, gramatura. Praktyczny poradnik z tabelami.",
  category: "produkty",
  tags: [
    "ulotki składane",
    "falcowanie",
    "rodzaje składu",
    "DL składana",
    "bigowanie",
  ],
  publishedAt: "2026-05-26",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["skladane-ulotki", "ulotki"],
  sections: [
    {
      type: "p",
      text: "Ulotka składana to coś więcej niż zwykła ulotka zgięta na pół. Rodzaj składu decyduje o tym, jak klient odbiera treść — co widzi najpierw, co odkrywa po rozłożeniu, jak trzyma ulotkę w dłoni. Falc C (roladka) prowadzi wzrok inaczej niż falc Z (harmonijka), a ulotka składana w okno otwiera się jak zaproszenie. W tym poradniku porównujemy wszystkie popularne rodzaje falcowania, podajemy dokładne wymiary łamów i pokazujemy, kiedy wybrać który typ składu.",
    },
    {
      type: "h2",
      id: "falcowanie-vs-bigowanie",
      text: "Falcowanie a bigowanie — kiedy co stosować",
    },
    {
      type: "p",
      text: "Falcowanie to maszynowe składanie papieru za pomocą falcerki — wałki zaginają arkusz wzdłuż wyznaczonych linii. Stosuje się je przy papierach do ok. 170 g/m². Bigowanie to wytłaczanie rowka w papierze przed złożeniem — niezbędne przy grubszych materiałach (200 g/m² i wyżej), bo bez niego papier pęka na zgięciu i odsłania białą warstwę wewnętrzną.",
    },
    {
      type: "p",
      text: "W praktyce: [ulotki składane](/produkty/skladane-ulotki) na kredzie 130-170 g falcujemy maszynowo. Ulotki na kartonie 250-350 g (np. zaproszenia, menu premium) bigujemy przed złożeniem. Koszt bigowania to ok. 5-15% ceny druku — niewielki wydatek, który zapobiega pęknięciu i wygląda profesjonalnie.",
    },
    {
      type: "h2",
      id: "rodzaje-falcowania",
      text: "Rodzaje falcowania — pełne porównanie",
    },
    {
      type: "table",
      caption: "Porównanie rodzajów falcowania ulotek",
      headers: [
        "Typ składu",
        "Liczba łamów",
        "Liczba stron",
        "Zastosowanie",
        "Trudność projektu",
      ],
      rows: [
        ["Na pół", "2", "4", "Menu, programy, zaproszenia", "Niska"],
        [
          "Falc C (roladka)",
          "3",
          "6",
          "Ulotki DL, menu restauracyjne, oferty handlowe",
          "Średnia",
        ],
        [
          "Falc Z (harmonijka)",
          "3",
          "6",
          "Instrukcje, przewodniki, mapy",
          "Średnia",
        ],
        [
          "Okno (window fold)",
          "3 (symetryczne)",
          "6",
          "Zaproszenia, oferty premium, cenniki",
          "Średnia",
        ],
        [
          "Krzyżowy (cross fold)",
          "4+",
          "8-16",
          "Mapy, schematy, instrukcje techniczne",
          "Wysoka",
        ],
        [
          "Harmonijka 4-łamowa",
          "4",
          "8",
          "Mini-katalogi, kalendarze, programy wydarzeń",
          "Wysoka",
        ],
      ],
    },
    {
      type: "h2",
      id: "falc-na-pol",
      text: "Składanie na pół — najprostszy wariant",
    },
    {
      type: "p",
      text: "Składanie na pół to jeden złam pośrodku arkusza — powstają 4 panele (2 na awersie, 2 na rewersie). Najczęstszy format bazowy to A4 (po złożeniu A5) lub A5 (po złożeniu A6). Stosowany w zaproszeniach, programach imprez, kartach menu kawiarnianego, mini-broszurach produktowych.",
    },
    {
      type: "p",
      text: "Projektowanie jest proste: oba panele mają identyczną szerokość, nie trzeba kompensować grubości papieru. Okładka (panel 1) to headline i hero visual, środek (panele 2-3) to treść, tył (panel 4) to dane kontaktowe i CTA.",
    },
    {
      type: "h2",
      id: "falc-c-roladka",
      text: "Falc C (roladka) — klasyka ulotek DL",
    },
    {
      type: "p",
      text: "Falc C to dwa złamy równoległe, gdzie jedno skrzydełko zawija się do środka — jak roladka. Format bazowy to najczęściej A4 (297×210 mm), który po złożeniu daje ulotkę DL (ok. 99×210 mm) mieszczącą się w standardowej kopercie DL.",
    },
    {
      type: "callout",
      variant: "warn",
      text: "Wewnętrzny panel falcu C musi być o 2-3 mm węższy niż dwa zewnętrzne. Bez tego ulotka się wybrzusza i nie zamyka płasko. Przy formacie bazowym A4 (297 mm szerokości): panel zewnętrzny lewy = 100 mm, panel środkowy = 100 mm, panel wewnętrzny (zawijany) = 97 mm. To najczęstszy błąd projektantów — dzielenie 297 mm na 3 równe części (99×99×99).",
    },
    {
      type: "p",
      text: "Sekwencja czytania falcu C: klient widzi okładkę (panel 1), otwiera — widzi panel wewnętrzny zawinięty + panel środkowy, rozwija całość — widzi 3 panele wewnętrzne. To daje naturalną narrację: okładka (hak) → rozwinięcie (argumenty) → pełna oferta (szczegóły). Idealne do ofert handlowych, [menu restauracyjnych](/blog/menu-restauracyjne-druk) i ulotek promocyjnych.",
    },
    {
      type: "h2",
      id: "falc-z-harmonijka",
      text: "Falc Z (harmonijka) — instrukcje i przewodniki",
    },
    {
      type: "p",
      text: "Falc Z to dwa złamy równoległe w przeciwnych kierunkach — arkusz składa się jak harmonijka (lub litera Z). Wszystkie 3 panele mają identyczną szerokość (brak kompensacji). Format bazowy A4 daje po złożeniu panel ok. 99×210 mm.",
    },
    {
      type: "p",
      text: "Różnica wobec falcu C: po otwarciu klient od razu widzi 2 panele (nie 1 zawinięty + 1 otwarty). Falc Z rozkłada się stopniowo z obu stron — idealny do instrukcji krok-po-kroku, map turystycznych, przewodników po wystawach. Klient może rozłożyć ulotkę częściowo lub w całości.",
    },
    {
      type: "h2",
      id: "falc-okno",
      text: "Falc okno (window fold) — efekt zaproszenia",
    },
    {
      type: "p",
      text: "Falc okno to dwa złamy symetryczne — oba skrzydełka zamykają się do środka jak drzwi dwuskrzydłowe. Efekt: otwarcie ulotki wygląda jak otwarcie zaproszenia. Oba zewnętrzne panele muszą być o 1-2 mm węższe niż połowa panelu środkowego, żeby się nie nakładały.",
    },
    {
      type: "p",
      text: "Falc okno jest droższy w produkcji (precyzyjne bigowanie) i rzadziej spotykany, ale wyróżnia się w dystrybucji. Stosowany w [zaproszeniach](/blog/zaproszenia-slubne-druk) eventowych, ofertach premium, kartach rabatowych, cennikach hotelowych i SPA. Format bazowy: zwykle A4 lub niestandardowy kwadrat.",
    },
    {
      type: "h2",
      id: "falc-krzyzowy",
      text: "Falc krzyżowy — mapy i schematy",
    },
    {
      type: "p",
      text: "Falc krzyżowy to kombinacja dwóch złamów prostopadłych — najpierw arkusz składa się na pół w jednym kierunku, potem na pół w drugim. Z arkusza A3 powstaje format A5 (4 złamy, 8 stron), z A2 — format A4. Stosowany do map, schematów technicznych, programów konferencji z agendą wielodniową.",
    },
    {
      type: "p",
      text: "Uwaga projektowa: w miejscu, gdzie krzyżują się dwa złamy (środek arkusza), papier jest czterokrotnie zagięty. Przy gramaturze 170 g+ to miejsce musi być bigowane, inaczej papier pęka. Unikaj umieszczania tekstu i zdjęć w tym punkcie — będą zniekształcone.",
    },
    {
      type: "h2",
      id: "wymiary-lamow",
      text: "Wymiary łamów — tabela referencyjna",
    },
    {
      type: "table",
      caption:
        "Wymiary paneli (łamów) dla popularnych formatów ulotek składanych",
      headers: [
        "Format bazowy",
        "Typ składu",
        "Po złożeniu",
        "Panel 1 (mm)",
        "Panel 2 (mm)",
        "Panel 3 (mm)",
      ],
      rows: [
        ["A4 (297×210)", "Na pół", "A5 (148,5×210)", "148,5", "148,5", "—"],
        [
          "A4 (297×210)",
          "Falc C",
          "DL (99×210)",
          "100",
          "100",
          "97 (wewnętrzny)",
        ],
        ["A4 (297×210)", "Falc Z", "DL (99×210)", "99", "99", "99"],
        [
          "A4 (297×210)",
          "Okno",
          "~74×210",
          "74 (lewe drzwi)",
          "149 (środek)",
          "74 (prawe drzwi)",
        ],
        ["A5 (210×148)", "Na pół", "A6 (105×148)", "105", "105", "—"],
        ["A3 (420×297)", "Falc C", "140×297", "142", "142", "136 (wewnętrzny)"],
        ["A3 (420×297)", "Falc Z", "140×297", "140", "140", "140"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Wymiary w tabeli nie uwzględniają spadów (3 mm z każdej strony). Do pliku dodaj spady: format bazowy A4 z falcem C to plik 303×216 mm (297+6 × 210+6). Linie złamu zaznacz na osobnej warstwie (np. „die-line” lub „cięcie”) — nie drukuj ich.",
    },
    {
      type: "h2",
      id: "gramatura-i-papier",
      text: "Jaki papier na ulotkę składaną",
    },
    {
      type: "table",
      caption: "Dobór papieru do ulotki składanej",
      headers: [
        "Gramatura",
        "Typ papieru",
        "Zastosowanie",
        "Falcowanie / bigowanie",
      ],
      rows: [
        [
          "130 g",
          "Kreda błysk / mat",
          "Ulotki masowe (skrzynki, targi)",
          "Falcowanie maszynowe",
        ],
        [
          "170 g",
          "Kreda mat",
          "Ulotki premium, menu, oferty handlowe",
          "Falcowanie maszynowe",
        ],
        [
          "200 g",
          "Kreda mat + folia",
          "Menu restauracyjne, cenniki",
          "Bigowanie obowiązkowe",
        ],
        [
          "250 g",
          "Karton",
          "Zaproszenia, oferty luksusowe",
          "Bigowanie obowiązkowe",
        ],
        [
          "300 g",
          "Karton + folia",
          "Karty VIP, vouchery składane",
          "Bigowanie + ręczne składanie",
        ],
      ],
    },
    {
      type: "p",
      text: "Zasada: im grubszy papier, tym mniej złamów. Karton 300 g składaj maksymalnie na pół. [Kreda 130-170 g](/blog/gramatura-papieru-ulotki) znosi falc C, Z i harmonijkę bez problemów. Dla składu krzyżowego na grubym papierze — bigowanie w obu kierunkach jest konieczne.",
    },
    {
      type: "h2",
      id: "bledy-projektowe",
      text: "Najczęstsze błędy w projektowaniu ulotek składanych",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Równe panele w falcu C — wewnętrzny panel musi być o 2-3 mm węższy, inaczej ulotka się wybrzusza",
        "Tekst na linii złamu — litery na zgięciu są nieczytelne i wyglądają nieprofesjonalnie. Zachowaj minimum 5 mm marginesu od każdej linii złamu",
        'Zdjęcie przechodzące przez złam — obraz „łamie się" wizualnie. Jeśli chcesz full-bleed zdjęcie przez całą rozłożoną ulotkę, upewnij się, że kluczowe elementy nie trafiają na zgięcie',
        "Brak hierarchii paneli — każdy panel powinien mieć jasną rolę: okładka, argumenty, szczegóły, CTA. Bez planu klient nie wie, w jakiej kolejności czytać",
        "Zbyt mała gramatura dla wielokrotnego składania — ulotka 130 g składana krzyżowo szybko się mięci i wygląda tanio po 2-3 rozłożeniach",
        "Pominięcie bigowania przy grubym papierze — papier 200 g+ bez bigowania pęka na złamie, odsłaniając białą warstwę wewnętrzną",
      ],
    },
    {
      type: "h2",
      id: "ktory-sklad-wybrac",
      text: "Który typ składu wybrać — szybka decyzja",
    },
    {
      type: "list",
      items: [
        "Chcesz ulotkę do koperty DL → falc C z formatu A4",
        "Chcesz instrukcję krok-po-kroku → falc Z lub harmonijka 4-łamowa",
        "Chcesz efekt premium / zaproszenia → falc okno",
        "Chcesz mapę lub schemat → falc krzyżowy z formatu A3 lub A2",
        "Chcesz prosty folder / program → składanie na pół z formatu A4",
        "Chcesz mini-katalog produktowy → harmonijka 4-łamowa z formatu A3",
      ],
    },
    {
      type: "faq",
      items: [
        {
          q: "Ile kosztuje druk ulotek składanych vs zwykłych?",
          a: "Ulotki składane są o 15-30% droższe od płaskich w tym samym formacie bazowym — dochodzi koszt falcowania lub bigowania. Przy nakładzie 1000 sztuk A4 składanych w C na kredzie 170g: cena ok. 250-350 zł brutto. Płaskie A4 w tym samym nakładzie: ok. 200-280 zł. Różnica maleje przy większych nakładach.",
        },
        {
          q: "Czy mogę złożyć ulotkę ręcznie zamiast maszynowo?",
          a: "Technicznie tak, ale ręczne składanie jest nieprecyzyjne — nierówne złamy, różnice między egzemplarzami. Maszynowe falcowanie zapewnia powtarzalność ±0,5 mm. Ręczne składanie ma sens tylko przy nakładach poniżej 50 sztuk i grubym kartonie 300 g+, gdzie falcerka nie radzi sobie z materiałem.",
        },
        {
          q: "Jaki format pliku przygotować do ulotki składanej?",
          a: "Plik PDF w rozłożonym formacie (flat) ze spadami 3 mm z każdej strony. Linie złamu zaznacz na osobnej warstwie jako linie pomocnicze (nie do druku). CMYK, 300 dpi, fonty zamienione na krzywe. Przykład: ulotka A4 falc C → plik 303×216 mm z zaznaczonymi 2 liniami złamu w pozycjach 100 mm i 200 mm od lewej krawędzi.",
        },
        {
          q: "Czy falc C i falc Z wyglądają tak samo po złożeniu?",
          a: "Z zewnątrz — tak, obie dają format DL po złożeniu z A4. Różnica widoczna po otwarciu: falc C otwiera się jak książka (jeden panel jest zawinięty do środka), falc Z rozkłada się jak harmonijka (oba zewnętrzne panele odchylają się na boki). Wybór zależy od narracji: falc C prowadzi sekwencyjnie (okładka → rozwinięcie → pełna treść), falc Z pokazuje treść stopniowo z obu stron.",
        },
        {
          q: "Czy ulotka składana mieści się do standardowej koperty?",
          a: "Falc C z formatu A4 daje ulotkę ok. 99×210 mm — mieści się idealnie w kopercie DL (110×220 mm). Składanie na pół z A4 daje A5 (148×210 mm) — wymaga koperty C5 (162×229 mm). Falc krzyżowy z A3 daje A5 — też koperta C5. Przy planowaniu mailingu dobierz typ składu do koperty, nie odwrotnie.",
        },
        {
          q: "Kiedy wybrać harmonijkę 4-łamową zamiast 3-łamowej?",
          a: 'Harmonijka 4-łamowa (8 paneli) to mini-katalog — używaj, gdy masz 6-8 sekcji treści (np. 6 usług, 8 produktów, program 4-dniowej konferencji). Harmonijka 3-łamowa (6 paneli) wystarcza dla prostszych ofert (3 pakiety cenowe, 3 argumenty sprzedażowe). Więcej łamów = wyższy koszt i trudniejszy projekt, więc nie dodawaj paneli „na zapas".',
        },
      ],
    },
    {
      type: "cta",
      heading: "Zamów ulotki składane w DobrePrinty",
      body: "Wybierz typ składu (na pół, falc C, falc Z, okno), gramaturę i nakład. Wgraj plik PDF — drukujemy w 48-72 h z precyzyjnym falcowaniem maszynowym.",
      href: "/produkty/skladane-ulotki",
      label: "Konfiguruj ulotki składane →",
    },
  ],
};
