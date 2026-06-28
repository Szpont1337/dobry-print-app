import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "broszury-szyte-vs-klejone-vs-szyte-nicia",
  title: "Broszury szyte, klejone i szyte nicią — która oprawa kiedy",
  excerpt:
    "Porównanie trzech rodzajów opraw broszur: szycie drutem, klejenie hotmelt, szycie nicią. Trwałość, cena, czas realizacji, zastosowania.",
  category: "produkty",
  tags: ["broszury", "oprawa", "szycie", "klejenie", "introligatornia"],
  publishedAt: "2026-05-26",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: [
    "broszury-szyte",
    "broszury-klejone",
    "broszury-szyte-nicia",
  ],
  sections: [
    {
      type: "p",
      text: "Oprawa broszury decyduje o jej trwałości, wyglądzie i budżecie. Szycie drutem (zszywki) to najtańsza opcja dla cienkich broszur. Klejenie hotmelt daje elegancki grzbiet dla grubszych publikacji. Szycie nicią to najtrwalsza oprawa dla katalogów i albumów. W tym poradniku porównujemy wszystkie trzy rodzaje opraw, żebyś mógł wybrać optymalną dla swojego projektu.",
    },
    {
      type: "h2",
      id: "szycie-drutem",
      text: "Szycie drutem (zszywki) — najtaniej i najszybciej",
    },
    {
      type: "p",
      text: "Szycie drutem to 2 metalowe zszywki wzdłuż grzbietu broszury. Arkusze są składane na pół i zszyty przez grzbiet. To najtańsza i najszybsza metoda oprawy — idealna dla broszur 8-64 stron (w wielokrotnościach 4). Cena oprawy: ok. 0,10-0,30 zł/sztuka.",
    },
    {
      type: "table",
      caption: "Szycie drutem — parametry",
      headers: ["Parametr", "Wartość"],
      rows: [
        ["Liczba stron", "8-64 (wielokrotność 4)"],
        ["Grzbiet", "Brak widocznego grzbietu (arkusze zgięte)"],
        [
          "Trwałość",
          "Średnia — zszywki mogą rdzewieć, strony wyrywają się przy intensywnym użytku",
        ],
        ["Otwieranie na płasko", "Tak — broszura otwiera się płasko na 180°"],
        ["Czas realizacji", "24-48 h"],
        ["Koszt oprawy", "Najniższy (0,10-0,30 zł/szt.)"],
      ],
    },
    {
      type: "p",
      text: "Zastosowania: [ulotki](/produkty/ulotki) wielostronicowe, programy imprez, cenniki, instrukcje, biuletyny, gazety parafialcne. Nie nadaje się do grubych broszur (powyżej 64 stron) — zszywki nie przechodzą przez zbyt gruby blok papierowy.",
    },
    {
      type: "h2",
      id: "klejenie-hotmelt",
      text: "Klejenie hotmelt (perfect binding) — elegancki grzbiet",
    },
    {
      type: "p",
      text: "Klejenie hotmelt (oprawa klejona) to nanoszenie gorącego kleju na grzbiet bloku stron i dociśnięcie okładki. Efekt: broszura z widocznym, prostym grzbietem — jak książka w miękkiej oprawie. Minimalna grubość grzbietu: 3 mm (ok. 40 stron na papierze 130 g). Maksymalna: 30+ mm (400+ stron).",
    },
    {
      type: "table",
      caption: "Klejenie hotmelt — parametry",
      headers: ["Parametr", "Wartość"],
      rows: [
        ["Liczba stron", "40-400+ (wielokrotność 4 lub 2)"],
        ["Grzbiet", "Widoczny, prosty — można nadrukować tytuł"],
        [
          "Trwałość",
          "Dobra — klej trzyma mocno, ale przy wielokrotnym otwieraniu strony mogą się odklejać",
        ],
        [
          "Otwieranie na płasko",
          "Nie — broszura nie otwiera się w pełni na 180°",
        ],
        ["Czas realizacji", "48-72 h"],
        ["Koszt oprawy", "Średni (0,50-1,50 zł/szt.)"],
      ],
    },
    {
      type: "p",
      text: "Zastosowania: [katalogi produktowe](/produkty/broszury-klejone), raporty roczne, podręczniki, oferty handlowe B2B, magazyny. Grzbiet pozwala na nadruk tytułu — przydatne dla publikacji stojących na półce.",
    },
    {
      type: "callout",
      variant: "tip",
      text: "Klej PUR (poliuretanowy) to ulepszona wersja hotmelt — jest elastyczniejszy, nie twardnieje z czasem i wytrzymuje temperaturę -30°C do +80°C. Kosztuje ok. 20-30% więcej niż standard hotmelt, ale jest zalecany dla katalogów i publikacji premium. Pytaj drukarnię o opcję PUR.",
    },
    {
      type: "h2",
      id: "szycie-nicia",
      text: "Szycie nicią — najtrwalsza oprawa",
    },
    {
      type: "p",
      text: "Szycie nicią to tradycyjna metoda introligatorska: składki (grupy arkuszy) są zszywane nicią, a następnie klejone do okładki. To najtrwalsza oprawa miękka — wytrzymuje tysiące otwarć bez odklejania stron. Broszura otwiera się prawie na płasko, co jest kluczowe dla albumów, map i publikacji leżących otwartych.",
    },
    {
      type: "table",
      caption: "Szycie nicią — parametry",
      headers: ["Parametr", "Wartość"],
      rows: [
        ["Liczba stron", "32-500+ (wielokrotność 8 lub 16)"],
        ["Grzbiet", "Widoczny, lekko zaokrąglony (nić dodaje grubości)"],
        ["Trwałość", "Najwyższa — nić + klej, wytrzymuje tysiące otwarć"],
        [
          "Otwieranie na płasko",
          "Prawie — 170-175°, znacznie lepsze niż klejenie",
        ],
        ["Czas realizacji", "72-96 h"],
        ["Koszt oprawy", "Najwyższy (1,00-3,00 zł/szt.)"],
      ],
    },
    {
      type: "p",
      text: "Zastosowania: albumy fotograficzne, katalogi premium, raporty roczne spółek giełdowych, podręczniki akademickie, książki kucharskie (muszą leżeć otwarte), mapy i atlasy. Szycie nicią to wybór, gdy publikacja musi wytrzymać lata użytkowania.",
    },
    {
      type: "h2",
      id: "porownanie",
      text: "Porównanie trzech opraw — szybki wybór",
    },
    {
      type: "table",
      caption: "Szycie drutem vs klejenie vs szycie nicią",
      headers: ["Cecha", "Szycie drutem", "Klejenie hotmelt", "Szycie nicią"],
      rows: [
        ["Liczba stron", "8-64", "40-400+", "32-500+"],
        [
          "Widoczny grzbiet",
          "Nie",
          "Tak (nadruk możliwy)",
          "Tak (nadruk możliwy)",
        ],
        ["Trwałość", "Średnia", "Dobra", "Najlepsza"],
        ["Otwieranie płaskie", "Tak (180°)", "Nie (~120°)", "Prawie (170°)"],
        ["Koszt oprawy", "0,10-0,30 zł", "0,50-1,50 zł", "1,00-3,00 zł"],
        ["Czas realizacji", "24-48 h", "48-72 h", "72-96 h"],
        ["Wielokrotność stron", "4", "4 lub 2", "8 lub 16"],
      ],
    },
    {
      type: "h2",
      id: "ktora-oprawa-wybrac",
      text: "Która oprawa wybrać — drzewo decyzji",
    },
    {
      type: "list",
      items: [
        "Masz do 64 stron i niski budżet → szycie drutem",
        "Masz 40-200 stron i chcesz profesjonalny grzbiet → klejenie hotmelt",
        "Masz 40-200 stron i potrzebujesz trwałości + płaskiego otwierania → szycie nicią",
        "Drukujesz katalog premium / raport roczny → szycie nicią + klej PUR",
        "Drukujesz biuletyn / gazetkę / program → szycie drutem",
        "Drukujesz podręcznik / skrypt do wielokrotnego użytku → szycie nicią",
        "Chcesz nadruk na grzbiecie → klejenie lub szycie nicią (grzbiet min. 3 mm)",
      ],
    },
    {
      type: "h2",
      id: "przygotowanie-pliku",
      text: "Jak przygotować plik do broszury",
    },
    {
      type: "list",
      items: [
        "Format strony: docelowy rozmiar po obcięciu (np. A5 = 148×210 mm) ze spadami 3 mm",
        "Liczba stron: wielokrotność wymagana przez typ oprawy (4 dla drutu, 4/2 dla kleju, 8/16 dla nici)",
        "Kolejność stron: od 1 do N w jednym pliku PDF, strony reader spreads (nie printer spreads)",
        "Grzbiet (klejenie/nić): dodaj osobną stronę na okładkę z grzbietem — szerokość grzbietu zależy od liczby stron i [gramatury](/blog/gramatura-papieru-ulotki)",
        "Margines wewnętrzny: zwiększ o 3-5 mm przy klejeniu (klej zajmuje margines grzbietu)",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Wzór na grubość grzbietu: liczba stron × gramatura (g/m²) ÷ 20 000 = grubość w mm. Przykład: 80 stron × 130 g ÷ 20 000 = 0,52 mm × 80/2 kartek = 5,2 mm. Podaj ten wymiar drukarni — pomogą dobrać dokładną szerokość grzbietu.",
    },
    {
      type: "faq",
      items: [
        {
          q: "Czy mogę zszyć drutem broszurę 80-stronicową?",
          a: "Technicznie tak, ale nie polecamy. Zszywki muszą przejść przez 80 stron papieru — przy gramaturze 130 g to ~5 mm grubości. Zszywki nie trzymają mocno, broszura się rozchyla, strony środkowe wystają. Powyżej 64 stron przejdź na klejenie.",
        },
        {
          q: "Czy klejona broszura otworzy się na płasko?",
          a: "Standardowe klejenie hotmelt — nie. Broszura otwiera się do ~120°. Klej PUR jest bardziej elastyczny i pozwala na ~140-150°. Jeśli potrzebujesz pełnego otwarcia (książka kucharska, album) — wybierz szycie nicią.",
        },
        {
          q: "Ile stron minimum na broszurę klejoną?",
          a: "Minimum 40 stron (10 kartek) na papierze 130 g — to daje grzbiet ~3 mm, wystarczający do przyklejenia okładki. Przy mniejszej liczbie stron grzbiet jest za cienki i klej nie trzyma. Dla 20-36 stron lepsze jest szycie drutem.",
        },
        {
          q: "Czy mogę zamówić broszurę z twardą okładką?",
          a: "Tak — to oprawa twarda (hardcover). Blok stron szyty nicią jest wklejany do sztywnej okładki z tekturą 2-3 mm pokrytą papierem lub tkaniną. Koszt: 5-15 zł/sztuka więcej niż oprawa miękka. Stosowana w albumach, książkach, raportach rocznych spółek giełdowych.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Zamów broszury w DobrePrinty",
      body: "Wybierz oprawę (szytą drutem, klejoną, szytą nicią), format, gramaturę i liczbę stron. Wgraj plik PDF — drukujemy od 1 sztuki.",
      href: "/produkty/broszury-szyte",
      label: "Konfiguruj broszury →",
    },
  ],
};
