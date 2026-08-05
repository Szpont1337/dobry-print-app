import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "formaty-papieru-seria-a-b-c",
  title: "Formaty papieru: seria A, B i C — pełna tabela wymiarów",
  excerpt:
    "Formaty papieru wg ISO 216: seria A (A0–A10), seria B (B0–B8) i seria C (koperty). Wymiary w mm, skąd biorą się proporcje √2, która koperta na format A4 oraz format netto i brutto do druku.",
  category: "papier",
  tags: ["formaty papieru", "ISO 216", "A4", "koperty", "DTP"],
  publishedAt: "2026-08-05",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["ulotki", "plakaty"],
  sections: [
    {
      type: "p",
      text: "A4, A5, B1, DL — te symbole widzimy codziennie, ale mało kto wie, że stoi za nimi elegancki system matematyczny, w którym każdy format jest połową poprzedniego. W tym przewodniku znajdziesz pełne tabele wymiarów serii A, B i C w milimetrach, wyjaśnienie, skąd biorą się magiczne proporcje 1:√2, informację, która koperta pomieści złożony list A4, oraz praktyczną wskazówkę o różnicy między formatem netto a brutto przy druku ze spadem. To materiał, do którego wraca się za każdym razem, gdy trzeba sprawdzić „ile ma centymetrów A2”.",
    },
    {
      type: "h2",
      id: "skad-sie-biora",
      text: "Skąd biorą się formaty — norma ISO 216 i proporcja √2",
    },
    {
      type: "p",
      text: "Formaty papieru definiuje międzynarodowa norma ISO 216 (w Polsce PN-ISO 216), przyjęta w większości świata poza Ameryką Północną. Cały system opiera się na jednej właściwości: każdy arkusz ma proporcję boków 1:√2 (czyli 1:1,4142). Ta proporcja jest wyjątkowa, bo przecięcie arkusza na pół w poprzek dłuższego boku daje dwa arkusze o DOKŁADNIE tej samej proporcji. Dzięki temu A4 to połowa A3, A3 to połowa A2 i tak dalej — bez żadnych strat i przeliczników.",
    },
    {
      type: "p",
      text: "Punktem wyjścia jest A0, którego pole powierzchni wynosi dokładnie 1 m², przy zachowaniu proporcji 1:√2 (stąd 841 × 1189 mm). Każdy kolejny format to połowa poprzedniego: A1 to połowa A0, A2 to połowa A1 i tak w dół. Praktyczna konsekwencja: powiększenie z A4 na A3 to skala 141% (√2), a pomniejszenie A3 na A4 to 71% — te dwie liczby warto zapamiętać, bo są na każdej kserokopiarce.",
    },
    {
      type: "h2",
      id: "seria-a",
      text: "Seria A — podstawowa (dokumenty, ulotki, plakaty)",
    },
    {
      type: "p",
      text: "Seria A to najczęściej używany zestaw formatów: dokumenty, ulotki, plakaty, książki. A4 to standard biurowy całego świata (poza USA).",
    },
    {
      type: "table",
      caption: "Seria A wg ISO 216 (wymiary w mm)",
      headers: ["Format", "Wymiary (mm)", "Typowe zastosowanie"],
      rows: [
        ["A0", "841 × 1189", "Duże plakaty, plansze techniczne"],
        ["A1", "594 × 841", "Plakaty, plansze prezentacyjne"],
        ["A2", "420 × 594", "Plakaty witrynowe, rysunki"],
        ["A3", "297 × 420", "Plakaty, menu, tabele, rysunki"],
        ["A4", "210 × 297", "Dokumenty, papier firmowy, ulotki"],
        ["A5", "148 × 210", "Ulotki, notesy, zaproszenia, broszury"],
        ["A6", "105 × 148", "Pocztówki, ulotki, karty"],
        ["A7", "74 × 105", "Ulotki kieszonkowe, bilety, etykiety"],
        ["A8", "52 × 74", "Wizytówki (zbliżony), bilety"],
        ["A9", "37 × 52", "Etykiety, znaczniki"],
        ["A10", "26 × 37", "Miniaturowe etykiety"],
      ],
    },
    {
      type: "h2",
      id: "seria-b",
      text: "Seria B — większa (plakaty, koperty, książki)",
    },
    {
      type: "p",
      text: "Seria B wypełnia „luki” między formatami A — każdy format B jest większy od odpowiadającego mu A, a mniejszy od poprzedniego. B1 to klasyczny format plakatu wielkoformatowego. Wymiary B to średnia geometryczna sąsiednich formatów A.",
    },
    {
      type: "table",
      caption: "Seria B wg ISO 216 (wymiary w mm)",
      headers: ["Format", "Wymiary (mm)", "Typowe zastosowanie"],
      rows: [
        ["B0", "1000 × 1414", "Bardzo duże plakaty, bilbordy modułowe"],
        ["B1", "707 × 1000", "Plakaty na słupy, citylight"],
        ["B2", "500 × 707", "Plakaty, plansze"],
        ["B3", "353 × 500", "Plakaty średnie, kalendarze"],
        ["B4", "250 × 353", "Książki, teczki, foldery"],
        ["B5", "176 × 250", "Książki, zeszyty, notesy"],
        ["B6", "125 × 176", "Książki kieszonkowe, notesy"],
        ["B7", "88 × 125", "Paszporty (zbliżony), notesy"],
        ["B8", "62 × 88", "Karty, bilety"],
      ],
    },
    {
      type: "h2",
      id: "seria-c",
      text: "Seria C — koperty",
    },
    {
      type: "p",
      text: "Seria C jest zaprojektowana tak, by pomieścić formaty serii A. Logika jest prosta: arkusz A pasuje do koperty C o tym samym numerze, a koperta C mieści się w kopercie B o tym samym numerze. Dlatego list na papierze A4 wkładasz do koperty C4 (na płasko) albo składasz i wkładasz do mniejszej.",
    },
    {
      type: "table",
      caption: "Seria C (koperty) wg ISO 216 (wymiary w mm)",
      headers: ["Format", "Wymiary (mm)", "Mieści"],
      rows: [
        ["C4", "229 × 324", "Arkusz A4 na płasko (bez składania)"],
        ["C5", "162 × 229", "Arkusz A4 złożony na pół (= A5)"],
        ["C6", "114 × 162", "Arkusz A4 złożony na czworo (= A6)"],
        ["C6/C5 (DL)", "110 × 220", "Arkusz A4 złożony na trzy (list DL)"],
        ["C3", "324 × 458", "Arkusz A3 na płasko"],
        ["C7", "81 × 114", "Arkusz A7, małe karty"],
      ],
    },
    {
      type: "callout",
      variant: "info",
      text: "Najczęstsze pytanie o koperty: kartka A4 na płasko wchodzi do koperty C4. Złożona raz na pół (do A5) mieści się w C5. Złożona w trzy (klasyczny list biznesowy) pasuje do koperty DL 110 × 220 mm — tej samej, do której projektuje się większość ulotek składanych i papieru firmowego z listem.",
    },
    {
      type: "h2",
      id: "dl-i-niestandardowe",
      text: "DL i formaty niestandardowe",
    },
    {
      type: "p",
      text: "DL (Dimension Lengthwise), 99–110 × 210–220 mm, to nie osobna seria, tylko format użytkowy: 1/3 arkusza A4. Jest ulubieńcem ulotek, biletów i papieru firmowego z listem, bo mieści się w kopercie DL i wygodnie leży w dłoni. Poza normą ISO funkcjonują też formaty kwadratowe (np. 148 × 148 mm) i indywidualne — dają wyróżnienie, ale bywają droższe, bo gorzej rozkładają się na arkuszu drukarskim (większy odpad).",
    },
    {
      type: "h2",
      id: "netto-brutto",
      text: "Format netto a brutto — pamiętaj o spadzie",
    },
    {
      type: "p",
      text: "Formaty z tabel to wymiary NETTO — gotowego, przyciętego produktu. Do druku plik przygotowuje się w formacie BRUTTO, czyli z dodanym spadem (zwykle 3 mm z każdej strony). Ulotka A5 (148 × 210 mm netto) to plik 154 × 216 mm brutto ze spadem. Bez spadu przy cięciu z tolerancją noża na krawędzi pojawi się biały pasek. Jak poprawnie przygotować spad, opisujemy w poradniku [jak zrobić bleed](/blog/jak-zrobic-bleed), a pełną procedurę eksportu — w [jak przygotować PDF do druku](/blog/jak-przygotowac-pdf-do-druku).",
    },
    {
      type: "callout",
      variant: "tip",
      text: "Szybkie przeliczniki do zapamiętania: A4 to połowa A3, A5 to połowa A4. Powiększenie o jeden format w górę to skala 141%, pomniejszenie o jeden w dół to 71%. Pole A0 to 1 m², więc gramaturę (g/m²) można wprost przełożyć na masę: arkusz A0 papieru 80 g waży 80 g, a A4 (1/16 A0) — 5 g.",
    },
    {
      type: "h2",
      id: "ktory-format-do-czego",
      text: "Który format do czego — ściąga",
    },
    {
      type: "table",
      caption: "Dobór formatu do produktu",
      headers: ["Produkt", "Zalecany format"],
      rows: [
        ["Wizytówka", "85 × 55 mm (poza serią A)"],
        ["Ulotka do ręki", "A6, A5 lub DL"],
        ["Ulotka składana / list firmowy", "DL (A4 składane na trzy)"],
        ["Plakat witrynowy", "A3, A2"],
        ["Plakat na słup", "B1"],
        ["Katalog / broszura", "A5, A4"],
        ["Pocztówka", "A6, DL"],
        ["Menu restauracyjne", "A4, DL, A3 składane"],
      ],
    },
    {
      type: "faq",
      items: [
        {
          q: "Jakie wymiary ma format A4?",
          a: "A4 to 210 × 297 mm (21 × 29,7 cm). To połowa formatu A3 (297 × 420 mm) i dwukrotność A5 (148 × 210 mm). A4 jest podstawowym formatem biurowym w standardzie ISO 216, używanym na całym świecie poza Ameryką Północną.",
        },
        {
          q: "Dlaczego formaty papieru mają dziwne wymiary jak 297 mm?",
          a: "Bo wszystkie zachowują proporcję boków 1:√2 (1:1,4142). Dzięki niej przecięcie arkusza na pół daje dwa arkusze o tej samej proporcji. Punktem wyjścia jest A0 o polu 1 m² (841 × 1189 mm), a każdy kolejny format to jego połowa.",
        },
        {
          q: "Która koperta na kartkę A4?",
          a: "A4 na płasko, bez składania, mieści się w kopercie C4 (229 × 324 mm). Kartka A4 złożona raz na pół pasuje do C5, a złożona na trzy (klasyczny list) do koperty DL 110 × 220 mm.",
        },
        {
          q: "Czym różni się seria A od B i C?",
          a: "Seria A to podstawowe formaty dokumentów i druków. Seria B jest nieco większa i wypełnia luki między formatami A (B1 to typowy plakat). Seria C to koperty zaprojektowane tak, by mieściły arkusze serii A o tym samym numerze.",
        },
        {
          q: "Co to jest format DL?",
          a: "DL to format użytkowy o wymiarach ok. 99–110 × 210–220 mm, czyli 1/3 arkusza A4. Nie należy do żadnej z serii ISO, ale jest bardzo popularny do ulotek, biletów i papieru firmowego, bo mieści się w kopercie DL.",
        },
        {
          q: "Czym różni się format netto od brutto w druku?",
          a: "Netto to wymiar gotowego, przyciętego produktu (np. A5 = 148 × 210 mm). Brutto to plik do druku z dodanym spadem (zwykle 3 mm z każdej strony), czyli 154 × 216 mm. Spad zapobiega białym paskom na krawędzi przy cięciu z tolerancją noża.",
        },
        {
          q: "Ile arkuszy A4 mieści się w A0?",
          a: "Szesnaście. A0 dzieli się na 2 × A1, A1 na 2 × A2 i tak dalej — A4 to 1/16 arkusza A0. Dlatego arkusz A0 papieru 80 g/m² waży 80 g, a pojedyncza kartka A4 z tego papieru — 5 g.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Wiesz już, jaki format Ci potrzebny?",
      body: "W DobrePrinty drukujemy w pełnej gamie formatów od A7 do B1 — ulotki, plakaty, wizytówki i materiały firmowe. Wybierasz format i nakład, resztą zajmujemy się my. Wysyłka nawet w 2–3 dni robocze.",
      href: "/produkty/ulotki",
      label: "Zamów druk w DobrePrinty →",
    },
  ],
};
