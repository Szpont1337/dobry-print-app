import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "rich-black-vs-czarny-k100",
  title: "Rich black vs czarny K100 — jak uzyskać głęboki czarny w druku",
  excerpt:
    "Dlaczego czarny K100 wygląda szaro na dużych powierzchniach i jak go pogłębić do rich black. Wartości CMYK, TIL i bezpieczne mieszanki kolorów.",
  category: "kolor",
  tags: ["czarny", "rich black", "CMYK", "TIL", "K100"],
  publishedAt: "2026-05-26",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["wizytowki", "plakaty", "ulotki"],
  sections: [
    {
      type: "p",
      text: "Czarny w druku to nie jeden kolor — to cała rodzina odcieni. K100 (sam czarny z palety CMYK) na małych elementach wygląda dobrze, ale na dużych powierzchniach zdradza szarość. Rich black dodaje do czystego czarnego inne składniki CMYK, żeby uzyskać głęboki, nasycony czerń. W tym poradniku tłumaczymy różnice, podajemy bezpieczne wartości i pokazujemy, kiedy użyć którego wariantu.",
    },
    {
      type: "h2",
      id: "czym-jest-k100",
      text: "Czym jest K100 i dlaczego wygląda szaro",
    },
    {
      type: "p",
      text: "K100 to czysty czarny w modelu [CMYK](/blog/cmyk-vs-rgb): C=0, M=0, Y=0, K=100. Drukarka nakłada jedną warstwę czarnego tonera lub farby. Problem: jedna warstwa atramentu nie pokrywa papieru w 100% — pomiędzy mikrokroplami prześwieca biała powierzchnia. Na małym tekście (12 pt i mniej) tego nie widać. Na dużej płaszczyźnie (tło [wizytówki](/produkty/wizytowki), okładka broszury, [plakat](/produkty/plakaty)) K100 wygląda jak ciemnoszary, nie jak głęboki czarny.",
    },
    {
      type: "h2",
      id: "czym-jest-rich-black",
      text: "Czym jest rich black",
    },
    {
      type: "p",
      text: "Rich black to mieszanka czarnego K100 z dodatkiem cyanu, magenty i/lub żółtego. Dodatkowe warstwy farby wypełniają mikroluki między kroplami czarnego, tworząc gęstszy, głębszy kolor. Efekt: nasycony, aksamitny czarny bez prześwitu papieru.",
    },
    {
      type: "h2",
      id: "bezpieczne-wartosci",
      text: "Bezpieczne wartości rich black",
    },
    {
      type: "table",
      caption: "Popularne receptury rich black w CMYK",
      headers: ["Nazwa", "C", "M", "Y", "K", "TIL", "Efekt"],
      rows: [
        [
          "K100 (czysty czarny)",
          "0",
          "0",
          "0",
          "100",
          "100%",
          "Szarawy na dużych polach",
        ],
        [
          "Designer black",
          "60",
          "40",
          "40",
          "100",
          "240%",
          "Głęboki neutralny czarny",
        ],
        [
          "Cool black (zimny)",
          "70",
          "35",
          "30",
          "100",
          "235%",
          "Czarny z niebieskim odcieniem",
        ],
        [
          "Warm black (ciepły)",
          "35",
          "60",
          "60",
          "100",
          "255%",
          "Czarny z brązowym odcieniem",
        ],
        [
          "Registration black",
          "100",
          "100",
          "100",
          "100",
          "400%",
          "NIGDY do druku — tylko znaczniki",
        ],
      ],
    },
    {
      type: "callout",
      variant: "warn",
      text: "Registration black (C100 M100 Y100 K100) to kolor znaczników pasowania — nie nadaje się do druku powierzchni. TIL 400% powoduje nadmiar farby: papier się marszczy, farba nie schnie, odcisk przenosi się na sąsiedni arkusz. Maksymalny bezpieczny TIL to 280-300% w zależności od drukarni.",
    },
    {
      type: "h2",
      id: "til-total-ink-limit",
      text: "TIL — Total Ink Limit (całkowite pokrycie farbą)",
    },
    {
      type: "p",
      text: "TIL to suma wszystkich wartości CMYK na jednym punkcie. Przy designer black (60+40+40+100) TIL wynosi 240% — bezpiecznie dla większości maszyn offsetowych i cyfrowych. Maksymalny TIL zależy od technologii druku i papieru: offset na kredzie 280-320%, druk cyfrowy 240-280%, druk na papierze niepowlekanym (offset) 220-260%.",
    },
    {
      type: "p",
      text: "Przekroczenie TIL powoduje: wydłużony czas schnięcia, brudzenie na rewersie (set-off), marszczenie papieru, słabą adhezję farby. Zawsze sprawdzaj TIL swojej drukarni przed przygotowaniem pliku — wartość znajdziesz w profilu ICC lub specyfikacji technicznej.",
    },
    {
      type: "h2",
      id: "kiedy-k100-kiedy-rich",
      text: "Kiedy K100, a kiedy rich black",
    },
    {
      type: "table",
      caption: "K100 vs rich black — zastosowania",
      headers: ["Element", "Rekomendacja", "Dlaczego"],
      rows: [
        [
          "Tekst body (do 14 pt)",
          "K100",
          "Ostrzejsze krawędzie, brak problemów z pasowaniem",
        ],
        [
          "Nagłówki duże (24+ pt)",
          "K100 lub rich black",
          "Zależy od tła — na białym K100 wystarcza",
        ],
        ["Tło wizytówki", "Rich black", "Duża powierzchnia wymaga głębi"],
        [
          "Okładka broszury",
          "Rich black",
          "Prześwit K100 widoczny na dużym polu",
        ],
        [
          "Plakat — duże czarne pole",
          "Rich black",
          "Im większa powierzchnia, tym widoczniejsza szarość K100",
        ],
        [
          "Tekst na kolorowym tle",
          "K100",
          "Unika problemu z pasowaniem (trapping)",
        ],
        [
          "Cienkie linie i ramki",
          "K100",
          "Rich black rozlewa się na cienkich elementach",
        ],
        ["Kody kreskowe / QR", "K100", "Skanery wymagają kontrastu, nie głębi"],
      ],
    },
    {
      type: "h2",
      id: "problem-z-pasowaniem",
      text: "Problem z pasowaniem (trapping)",
    },
    {
      type: "p",
      text: "Rich black składa się z 4 warstw farby nakładanych kolejno. Jeśli arkusz przesunie się o 0,1-0,2 mm między nałożeniami (normalna tolerancja maszyny), na krawędziach tekstu w rich black pojawi się kolorowa obwódka — np. cyjanowa krawędź po lewej stronie litery. Dlatego tekst body i cienkie linie drukuj w K100 — jedna warstwa = zero ryzyka rozsunięcia.",
    },
    {
      type: "callout",
      variant: "tip",
      text: "Overprint K100: w programach DTP (InDesign, Illustrator) włącz overprint dla czarnego tekstu K100. Overprint oznacza, że czarny tekst drukuje się na kolorowym tle bez wycinania (knockoutu). Bez overprint pod czarną literą jest biała dziura — jeśli maszyna się rozsunie, widać białą obwódkę. Z overprint czarny nadrukowuje się na kolor, eliminując ryzyko.",
    },
    {
      type: "h2",
      id: "jak-ustawic-w-programach",
      text: "Jak ustawić rich black w programach graficznych",
    },
    {
      type: "list",
      items: [
        "Adobe InDesign / Illustrator: utwórz nowy kolor CMYK w panelu Swatches. Wartości: C=60 M=40 Y=40 K=100. Nazwij go Rich Black, żeby odróżnić od domyślnego Black (K100)",
        "Adobe Photoshop: w Color Picker wpisz wartości CMYK ręcznie. Upewnij się, że dokument jest w trybie CMYK (Image → Mode → CMYK)",
        "CorelDRAW: w palecie kolorów wybierz CMYK i wpisz wartości ręcznie",
        "Canva: nie pozwala na ręczne ustawienie CMYK — eksportuj do PDF i skoryguj w Acrobacie lub poproś drukarnię o podmianę czarnego na rich black",
      ],
    },
    {
      type: "h2",
      id: "sprawdzanie-pliku",
      text: "Jak sprawdzić czarny w gotowym pliku PDF",
    },
    {
      type: "p",
      text: "W Adobe Acrobat Pro: narzędzie Output Preview (Print Production → Output Preview). Najedź kursorem na czarny element — w panelu zobaczysz wartości CMYK. Jeśli duże czarne tło pokazuje C=0 M=0 Y=0 K=100, zamień na rich black. Jeśli tekst body pokazuje wartości rich black, zamień na K100.",
    },
    {
      type: "p",
      text: "Darmowa alternatywa: w programie PDF24 lub Ghostscript rozdziel plik na separacje CMYK. Jeśli na separacji C, M i Y pojawia się tekst body — masz problem z rich black w tekście. Tekst powinien być widoczny tylko na separacji K.",
    },
    {
      type: "faq",
      items: [
        {
          q: "Czy mogę używać rich black na tekście 10 pt?",
          a: "Nie polecamy. Tekst poniżej 14 pt w rich black ryzykuje rozmycie krawędzi przez przesunięcie pasowania. K100 daje ostre krawędzie dla małego tekstu. Rich black rezerwuj dla dużych nagłówków (24+ pt) i powierzchni tła.",
        },
        {
          q: "Czym się różni rich black od registration black?",
          a: "Rich black to kontrolowana mieszanka (np. C60 M40 Y40 K100, TIL 240%), zaprojektowana do druku. Registration black to C100 M100 Y100 K100 (TIL 400%) — służy wyłącznie do znaczników pasowania i cięcia. Użycie registration black na powierzchni niszczy papier i maszynę.",
        },
        {
          q: "Moja drukarnia mówi, że TIL max to 260%. Jaki rich black zastosować?",
          a: "Przy TIL 260% użyj np. C40 M30 Y30 K100 (suma: 200%) lub C50 M30 Y30 K100 (suma: 210%). Zachowaj margines 20-30% poniżej limitu, bo gradient lub zdjęcie w tle mogą lokalnie podnieść TIL.",
        },
        {
          q: "Czy rich black wygląda tak samo w druku offsetowym i cyfrowym?",
          a: "Nie identycznie. Druk cyfrowy (toner) daje bardziej nasycony czarny nawet w K100, bo toner pokrywa papier równomierniej niż farba offsetowa. Rich black w druku cyfrowym jest mniej potrzebny dla małych nakładów, ale nadal zalecany dla dużych powierzchni na papierze matowym.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Drukujesz z dużym polem czarnego?",
      body: "Wgraj plik do DobrePrinty — nasz preflight automatycznie sprawdzi wartości CMYK i TIL. Jeśli wykryjemy K100 na dużej powierzchni, zasugerujemy zamianę na rich black przed drukiem.",
      href: "/produkty/wizytowki",
      label: "Zamów druk w DobrePrinty →",
    },
  ],
};
