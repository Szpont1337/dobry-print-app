import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "cmyk-vs-rgb",
  title: "CMYK vs RGB — dlaczego kolory wyglądają inaczej po wydruku",
  excerpt:
    "Wyjaśniamy, czym różni się CMYK od RGB, dlaczego niektóre kolory nie istnieją w druku i jak przygotować projekt, żeby kolory wyszły jak na monitorze. Praktyczny przewodnik dla projektantów.",
  category: "kolor",
  tags: ["CMYK", "RGB", "kolor", "profile barwne", "ISO Coated"],
  publishedAt: "2026-02-19",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["ulotki", "plakaty", "broszury-klejone"],
  sections: [
    {
      type: "p",
      text: "Kolor, który wygląda świetnie na monitorze, po wydruku często wygląda inaczej — bladziej, ciemniej, „inaczej”. Powód: monitor i drukarka używają zupełnie różnych systemów kolorystycznych. Monitor to RGB (światło addytywne), drukarka to CMYK (pigmenty subtraktywne). W tym artykule wyjaśniamy, czym te systemy się różnią, dlaczego niektóre kolory nie istnieją w druku, i jak zaprojektować plik, żeby kolor wyszedł zgodnie z oczekiwaniami.",
    },
    {
      type: "h2",
      id: "rgb-w-skrocie",
      text: "RGB — model addytywny (światło)",
    },
    {
      type: "p",
      text: "RGB to skrót od Red, Green, Blue. To model addytywny — zaczynasz od czerni (brak światła) i dodajesz kolory światła, żeby uzyskać jaśniejsze kolory. R255 G255 B255 = biały (pełne światło wszystkich trzech). R0 G0 B0 = czarny (brak światła). Wszystkie kolory pośrednie powstają przez różne kombinacje intensywności RGB.",
    },
    {
      type: "p",
      text: "RGB obowiązuje wszędzie tam, gdzie kolor jest emitowany przez ekran: monitory, telewizory, smartfony, projektory, aparaty cyfrowe. Wyjątek: druk. Drukarka nie emituje światła — odbija lub pochłania to, które na nią pada. Dlatego druk używa zupełnie innego modelu — CMYK.",
    },
    {
      type: "h2",
      id: "cmyk-w-skrocie",
      text: "CMYK — model subtraktywny (pigmenty)",
    },
    {
      type: "p",
      text: "CMYK to Cyan (cyjan), Magenta (magenta), Yellow (żółty), Key/Black (czarny). To model subtraktywny — zaczynasz od bieli (papieru), a każda kolejna farba „odejmuje” część światła odbitego. Cyjan pochłania światło czerwone, magenta pochłania zielone, żółty pochłania niebieskie. Razem te trzy farby teoretycznie dają czerń, ale w praktyce ze względu na niedoskonałości pigmentów dają brudny brąz — dlatego dodaje się czwarty kolor: czarny (K, „key”).",
    },
    {
      type: "p",
      text: "CMYK obowiązuje we wszystkich procesach druku: offsetowym, cyfrowym, laserowym, atramentowym. Każda farba ma swoje wartości w procentach — np. czerwony jako C0 M100 Y100 K0 (100% magenty + 100% żółtego, bez cyjanu i czerni). Czarny czysty: K100. Biały: K0 (brak farby, kolor papieru).",
    },
    {
      type: "h2",
      id: "dlaczego-kolory-roznia-sie",
      text: "Dlaczego kolor RGB i CMYK wygląda inaczej",
    },
    {
      type: "p",
      text: "Gama kolorów (gamut) RGB jest większa niż CMYK. To znaczy: niektóre kolory, które monitor potrafi wyświetlić (intensywne neonowe pomarańcze, jaskrawe zielenie, czyste cyjany), nie istnieją w CMYK. Drukarnia musi je „zaokrąglić” do najbliższego dostępnego CMYK — co daje efekt bladszych, mniej nasyconych kolorów po wydruku.",
    },
    {
      type: "p",
      text: "Klasyczne kolory, które „nie wychodzą” w druku CMYK:",
    },
    {
      type: "list",
      items: [
        "Jaskrawy zielony (np. zielony Spotify) — wyjdzie ciemniej i z brunatnym odcieniem",
        "Neonowy pomarańcz (np. logo Hermès) — wyjdzie matowy",
        "Czysty cyjan-niebieski (np. niebieski Twittera) — wyjdzie z odcieniem fioletu",
        "Jaskrawy róż (np. różowy Barbie) — wyjdzie bladszy",
        "Fluorescencyjne odcienie — niemożliwe bez specjalnych farb spot",
      ],
    },
    {
      type: "h2",
      id: "profile-barwne",
      text: "Profile barwne ICC — standaryzacja CMYK",
    },
    {
      type: "p",
      text: "CMYK nie jest jednolity — różne maszyny drukują „swoim” CMYK, zależnie od pigmentów, papieru, warunków. Żeby ujednolicić proces, używamy profili ICC (International Color Consortium). Profile mówią maszynie: „w takim kolorze CMYK użyj takich wartości pigmentów na takim papierze”.",
    },
    {
      type: "table",
      caption: "Standardowe profile barwne CMYK używane w polskim druku",
      headers: ["Profil ICC", "Zastosowanie", "Charakterystyka"],
      rows: [
        [
          "ISO Coated v2 (ECI)",
          "Papiery kredowane (kreda mat/błysk)",
          "Najpopularniejszy w EU",
        ],
        [
          "ISO Coated v2 300% (ECI)",
          "Kreda mat z ograniczeniem TIL 300%",
          "Dla cienkich papierów",
        ],
        [
          "ISO Uncoated v2 (ECI)",
          "Papiery niepowlekane (offset)",
          "Dla offsetu, papier firmowy",
        ],
        ["ISO Newspaper v4", "Papier gazetowy", "Dla insertów do gazet"],
        [
          "U.S. Web Coated SWOP v2",
          "Standard amerykański",
          "Rzadko używany w Polsce",
        ],
        [
          "Coated FOGRA39",
          "Starszy standard europejski",
          "Wycofywany, używaj v2",
        ],
      ],
    },
    {
      type: "p",
      text: "W Polsce standardem jest ISO Coated v2 (ECI) — używaj go dla 95% projektów. Profile ustawisz w Photoshop (Edit → Color Settings → Working Spaces → CMYK), Illustrator (Edit → Color Settings), InDesign (Edit → Color Settings). Eksport [PDF/X-4](/blog/format-pdf-pdf-x-rozne-standardy) zawiera profil ICC w pliku — drukarnia wie, jak interpretować kolory.",
    },
    {
      type: "h2",
      id: "konwersja-rgb-cmyk",
      text: "Jak skonwertować plik z RGB do CMYK",
    },
    {
      type: "h3",
      id: "photoshop-konwersja",
      text: "W Adobe Photoshop",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Otwórz plik RGB",
        "Image → Mode → CMYK Color",
        "Photoshop pokaże ostrzeżenie o utracie kolorów spoza gamy CMYK",
        "Kliknij OK — obraz zostanie skonwertowany",
        "Sprawdź wynik: View → Proof Setup → Working CMYK (porównanie RGB vs CMYK na żywo)",
        "Skoryguj kolory, które wyszły za bardzo „od źródła” (intensywne zielenie, neony)",
      ],
    },
    {
      type: "h3",
      id: "illustrator-konwersja",
      text: "W Adobe Illustrator",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Plik → Document Color Mode → CMYK Color",
        "Sprawdź wszystkie obiekty wektorowe — kolory zostaną zaktualizowane",
        "Dla zdjęć osadzonych w pliku (osadzone, nie linkowane) konwersja zachodzi automatycznie",
        "Dla zdjęć linkowanych: konwertuj osobno w Photoshopie i ponownie podlinkuj",
      ],
    },
    {
      type: "h3",
      id: "canva-konwersja",
      text: "W Canva — automatyczna konwersja",
    },
    {
      type: "p",
      text: "Canva pracuje w RGB w obszarze projektowania. Przy eksporcie „PDF for printing” konwersja do CMYK zachodzi automatycznie. To wygodne, ale ogranicza kontrolę nad finalnym kolorem. Dla projektów z dokładnymi brand colors w PMS rekomendujemy Affinity Publisher lub Adobe Illustrator zamiast Canva.",
    },
    {
      type: "h2",
      id: "kolory-pms-spot",
      text: "Kolory spot (PMS) — kiedy CMYK nie wystarcza",
    },
    {
      type: "p",
      text: "PMS (Pantone Matching System) to system kolorów spot — każdy kolor jest specjalnie mieszany jako oddzielny pigment, nie kombinacja CMYK. PMS używamy tam, gdzie brand color musi być odwzorowany dokładnie: korporacyjne logo (np. Coca-Cola, IBM), oznaczenia bezpieczeństwa (jaskrawy żółty), opakowania (gdzie kolor jest częścią identyfikacji).",
    },
    {
      type: "p",
      text: "Druk PMS wymaga dodatkowej płyty na każdy kolor spot — co podnosi cenę. Druk CMYK + 1 PMS (np. dla brand color) to standard dla wielu klientów korporacyjnych. CMYK + 2 PMS (np. PMS metaliczny złoty + PMS srebrny) to opcja premium. W DobrePrinty druk z PMS dostępny dla nakładów 500+ sztuk z wyprzedzeniem 7 dni.",
    },
    {
      type: "h2",
      id: "rich-black-i-czarny",
      text: "Rich black — głębszy czarny w druku",
    },
    {
      type: "p",
      text: "Czarny w druku CMYK ma dwie wersje. Standardowy: K100 (tylko czarna farba, 100%). Daje czarny matowy, lekko szary na dużych powierzchniach. [Rich black](/blog/rich-black-vs-czarny-k100): C40 M30 Y30 K100 (czarna + warstwy CMY pod spodem). Daje głęboki, „aksamitny” czarny.",
    },
    {
      type: "p",
      text: "Zasady używania:",
    },
    {
      type: "list",
      items: [
        "Czarny tekst — zawsze K100 (dla cienkich liter, żeby były ostre — rich black może się rozjeżdżać)",
        "Czarne tła i duże powierzchnie — rich black (głębsze, równomierne)",
        "Cienkie czarne linie i ramki — K100",
        "Czarne ikonki, logo na czarno — K100 (wektory są ostre)",
        "Czarne tło [plakatu](/produkty/plakaty), broszury, okładki — rich black",
      ],
    },
    {
      type: "callout",
      variant: "warn",
      text: "Maksymalne pokrycie farbą (Total Ink Limit, TIL) na arkuszu to typowo 300% dla offsetu i 240% dla cyfry. Rich black C40 M30 Y30 K100 = 200% — bezpieczne. Nigdy nie używaj C100 M100 Y100 K100 = 400% — papier nie wyschnie, drukarka się zatka, możliwe rozmazania.",
    },
    {
      type: "h2",
      id: "soft-proofing",
      text: "Soft proofing — symulacja druku na monitorze",
    },
    {
      type: "p",
      text: "Soft proofing to funkcja Photoshopa i Illustratora, która pokazuje na monitorze, jak Twój projekt będzie wyglądał po wydruku. View → Proof Setup → Working CMYK (lub konkretny profil ICC). Photoshop symuluje konwersję RGB → CMYK i pokazuje kolory zaokrąglone do dostępnej gamy.",
    },
    {
      type: "p",
      text: "Soft proofing jest przydatny do oceny, które kolory „nie wyjdą” w druku. Włącz „Gamut Warning” (Ctrl+Shift+Y) — Photoshop podświetli na szaro kolory spoza CMYK. To pomaga decydować, które elementy projektu trzeba zmienić, żeby uniknąć rozczarowania po wydruku.",
    },
    {
      type: "h2",
      id: "kalibracja-monitora",
      text: "Kalibracja monitora — fundament wiarygodnego koloru",
    },
    {
      type: "p",
      text: "Każdy monitor wyświetla kolory trochę inaczej. Twój monitor pokazuje róż jako bardziej fioletowy, mój pokazuje go bardziej różowy. Kalibracja monitora to proces ujednolicenia kolorów do standardu (np. sRGB lub Adobe RGB). Bez kalibracji nie masz pewności, jak Twój projekt wygląda „naprawdę”.",
    },
    {
      type: "p",
      text: "Kalibratory sprzętowe: Datacolor SpyderX (od 600 zł), X-Rite i1Display (od 800 zł). Co miesiąc kalibrujesz monitor 5-minutowym pomiarem. Dla projektantów pracujących z drukiem to inwestycja niezbędna. Alternatywa darmowa: kalibracja „na oko” przez systemowe narzędzia (Windows Display Calibration, macOS Color Calibrator) — lepiej niż nic, ale niewystarczająca dla pracy profesjonalnej.",
    },
    {
      type: "faq",
      items: [
        {
          q: "Dlaczego mój intensywny zielony wyszedł brunatny po wydruku?",
          a: "Bo intensywny zielony (np. R0 G255 B0 w RGB) nie istnieje w gamie CMYK. Drukarka konwertuje go do najbliższego dostępnego, co daje matowy zielony z domieszką brązu. Dla brand color z intensywnym zielonym dwie opcje: użyj koloru spot PMS (osobna płyta, intensywniejszy kolor) lub przeprojektuj brand do koloru w gamie CMYK. Soft proofing w Photoshopie (Ctrl+Y) pokazuje od razu, jak kolor wyjdzie.",
        },
        {
          q: "Czy mogę zostawić plik w RGB i niech drukarnia konwertuje?",
          a: "Tak, ale ryzykujesz, że konwersja drukarni nie będzie taka, jak chciałeś. Drukarnia ma standardowy profil ICC (zwykle ISO Coated v2 ECI) i konwertuje z RGB do tego profilu automatycznie. Wynik może różnić się od tego, co widziałeś w Photoshopie z profilem sRGB. Lepiej konwertować samemu i kontrolować proces. DobrePrinty akceptuje pliki RGB, ale w preflight informujemy, że konwersja będzie automatyczna.",
        },
        {
          q: "Jak sprawdzić, czy plik jest w CMYK?",
          a: "Adobe Acrobat Reader: otwórz plik PDF → Narzędzia → Wydruk produkcyjny → Podgląd wyjścia. Sprawdź pole „Show: Process Plates”. Jeśli wszystkie kanały to CMYK — dobrze. Jeśli widzisz „RGB” — plik nie jest skonwertowany. W Photoshopie: Image → Mode (pokazuje tryb dokumentu: RGB lub CMYK). W Illustratorze: File → Document Color Mode.",
        },
        {
          q: "Co to jest TIL i dlaczego ma znaczenie?",
          a: "TIL (Total Ink Limit) to maksymalne pokrycie farbą na arkuszu, wyrażone w procentach. Dla offsetu: 300%. Dla cyfry: 240%. To suma wartości CMYK w danym pikselu. Rich black C40 M30 Y30 K100 = 200% (bezpieczne). Czarny pełny C100 M100 Y100 K100 = 400% (niedopuszczalne — papier nie wyschnie, drukarka zatka się, możliwe rozmazania). Zawsze sprawdzaj TIL w Photoshopie: View → Proof Setup → Custom → wybierz profil → Preserve CMYK Numbers → włączaj overprint preview.",
        },
        {
          q: "Czy każdy monitor wyświetla CMYK tak samo?",
          a: "Nie. Monitor wyświetla wszystko w RGB — symuluje CMYK przy soft proofing, ale tylko przybliżenie. Dwa różne monitory pokażą ten sam plik CMYK w trochę innych odcieniach. Dlatego kalibracja monitora jest kluczowa — kalibrowany monitor pokazuje kolory bliższe rzeczywistemu wynikowi druku. Bez kalibracji pracujesz „na oko” bez pewności.",
        },
        {
          q: "Czy kolory PMS są warte dodatkowego kosztu?",
          a: "Dla brand identity, gdzie kolor jest częścią tożsamości marki — tak. Coca-Cola, IBM, Tiffany & Co używają PMS, bo różnica między ich brand color a podobnym CMYK jest natychmiast widoczna dla klientów. Dla generycznych ulotek reklamowych — nie. PMS dodaje 30-50% do ceny druku. Ma sens dla projektów premium i nakładów 500+ sztuk, gdzie różnica w cenie się rozkłada na sztuki.",
        },
        {
          q: "Jak drukarnia symuluje konwersję RGB → CMYK?",
          a: "Drukarnia używa RIP-u (Raster Image Processor) — oprogramowania, które przetwarza plik PDF na rastry CMYK gotowe do druku. RIP ma wbudowane profile ICC i konwertuje kolory automatycznie. W DobrePrinty używamy RIP-ów ColorBurst i EFI Fiery z profilem ISO Coated v2 (ECI) jako default. Klient może w preflight zażyczyć innego profilu (np. ISO Uncoated v2 dla offsetu), ale dla 95% zamówień default działa optymalnie.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Plik gotowy w CMYK?",
      body: "Wgraj do konfiguratora DobrePrinty — sprawdzamy profile barwne, TIL i konwersje przy preflight. Jeśli coś jest w RGB lub przekracza limity, wracamy z konkretnymi poprawkami w 2 godziny robocze.",
      href: "/produkty/ulotki",
      label: "Zamów druk →",
    },
  ],
};
