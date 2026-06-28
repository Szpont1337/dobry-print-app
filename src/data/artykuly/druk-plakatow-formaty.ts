import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "druk-plakatow-formaty",
  title: "Druk plakatów B1, B2, A1, A2 — różnice i zastosowania",
  excerpt:
    "Porównanie formatów plakatów: A3, A2, A1, A0, B1, B2. Wymiary, papiery, zastosowania. Kiedy wybrać A2, a kiedy B1. Praktyczny przewodnik dla zamawiających druk plakatów online.",
  category: "produkty",
  tags: ["plakaty", "formaty", "B1", "A1", "A2", "wymiary"],
  publishedAt: "2026-03-19",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["plakaty", "roll-up", "ulotki"],
  sections: [
    {
      type: "p",
      text: "Format plakatu to nie tylko wymiary — to wybór dystansu, z którego klient go zobaczy. A3 to plakat na ścianę w pokoju, A2 do gabloty szkolnej, A1 dla witryny sklepowej, B1 dla słupów reklamowych, A0 dla lobby kin i wystaw muzealnych. W tym poradniku porównujemy wszystkie standardowe formaty plakatów dostępne w polskim druku i pokazujemy, który wybrać do konkretnego zastosowania.",
    },
    {
      type: "h2",
      id: "tabela-formatow",
      text: "Tabela wymiarów wszystkich formatów plakatów",
    },
    {
      type: "table",
      caption: "Standardowe wymiary plakatów (mm i cm)",
      headers: ["Format", "Wymiary (mm)", "Wymiary (cm)", "Powierzchnia"],
      rows: [
        ["A4", "210 × 297", "21 × 29,7", "0,062 m²"],
        ["A3", "297 × 420", "29,7 × 42", "0,125 m²"],
        ["A2", "420 × 594", "42 × 59,4", "0,250 m²"],
        ["A1", "594 × 841", "59,4 × 84,1", "0,500 m²"],
        ["A0", "841 × 1189", "84,1 × 118,9", "1,000 m²"],
        ["B2", "500 × 707", "50 × 70,7", "0,354 m²"],
        ["B1", "707 × 1000", "70,7 × 100", "0,707 m²"],
        ["B0", "1000 × 1414", "100 × 141,4", "1,414 m²"],
      ],
    },
    {
      type: "p",
      text: "Standardy A (A0-A4) bazują na proporcjach √2 — każdy mniejszy format to połowa większego. Standardy B (B0-B2) są pośrednie między A (np. B1 jest większy od A1, mniejszy od A0). Polski rynek plakatów dominuje A2 (gabloty), A1 (witryny), B1 (słupy reklamowe), A0 (lobby i wystawy).",
    },
    {
      type: "h2",
      id: "format-a4",
      text: "Format A4 — najmniejszy plakat",
    },
    {
      type: "p",
      text: "A4 (210×297 mm) to dolny próg formatu „plakatowego” — w praktyce większość zastosowań nazywa to „ulotką A4” lub „kartą menu A4”. Sprawdza się dla [menu restauracyjnych](/blog/menu-restauracyjne-druk) na ścianie, mini-plakatów do pokoi (np. siatka treningowa dla domowej siłowni), informacji w gablotach mieszkaniowych.",
    },
    {
      type: "p",
      text: "Wadą A4 jako plakat: zbyt mały dla większości zastosowań ekspozycyjnych. Klient nie zauważa A4 z odległości 3+ metrów — wygląda jak kartka papieru. Dla plakatów reklamowych poleć A3 lub większy.",
    },
    {
      type: "h2",
      id: "format-a3",
      text: "Format A3 — plakat do pokoju",
    },
    {
      type: "p",
      text: "A3 (297×420 mm) to klasyczny format plakatu do gabloty szkolnej, plakatu koncertowego rozdawanego na ulicach, mini-plakatu do recepcji firmy lub gabinetu lekarskiego. Mieści się w standardowych ramkach IKEA (cena ramki 30-60 zł). Często używany do kalendarzy ściennych dla pracowników.",
    },
    {
      type: "p",
      text: "A3 to też format typowy dla plakatów eventowych (koncerty klubowe, wystawy lokalne, spektakle teatralne małej sceny). Nakład typowy: 25-100 sztuk. Cena: ok. 2-4 zł brutto za sztukę przy nakładzie 25-50 sztuk.",
    },
    {
      type: "h2",
      id: "format-a2",
      text: "Format A2 — najpopularniejszy plakat reklamowy",
    },
    {
      type: "p",
      text: "A2 (420×594 mm) to najpopularniejszy format [plakatu reklamowego](/produkty/plakaty) w Polsce. Mieści się w gablotach szkolnych, w witrynach sklepowych, na drzwiach wejściowych do lokali. Czytelny z odległości 2-4 metrów. Cena: ok. 3-5 zł brutto za sztukę przy nakładzie 50-100 sztuk.",
    },
    {
      type: "p",
      text: "Typowe zastosowania A2: plakaty koncertowe (festiwale lokalne, koncerty klubowe), plakaty wystaw galeryjnych, plakaty filmowe przy kinach studyjnych, plakaty informacyjne w urzędach, plakaty promocyjne sklepów, plakaty programu konferencji. Standard w gabloty miejskie i podziemne przystanki autobusowe.",
    },
    {
      type: "h2",
      id: "format-a1",
      text: "Format A1 — plakat witrynowy",
    },
    {
      type: "p",
      text: "A1 (594×841 mm) to format dla witryn sklepowych, wnętrz klubów, lobby hotelowych. Widoczny z dystansu 3-6 metrów. Cena: ok. 6-10 zł brutto za sztukę przy nakładzie 25-50 sztuk. Większy budżet typograficzny — można umieścić więcej tekstu czytelnego z dystansu.",
    },
    {
      type: "p",
      text: "Typowe zastosowania A1: plakaty promocji sezonowych w sieciach handlowych, plakaty kampanii społecznych w samorządach (np. zachęcanie do szczepień, ekologii), plakaty filmowe przy kinach większych (multipleksy), plakaty wystaw muzealnych (dla mniejszych wystaw), grafiki w lobby biurowców jako pokaz brandu.",
    },
    {
      type: "h2",
      id: "format-b1",
      text: "Format B1 — plakat na słupy reklamowe",
    },
    {
      type: "p",
      text: "B1 (707×1000 mm) to standard dla słupów reklamowych w polskich miastach. Słupy reklamowe (popularne w Krakowie, Poznaniu, Wrocławiu) mają standardowe gabaryty pod B1 + 10-15 cm marginesu z każdej strony. Plakat B1 jest naklejany na słup za pomocą kleju z papierem blueback (specjalny papier z niebieską warstwą tylną, która zapobiega prześwitywaniu starego plakatu).",
    },
    {
      type: "p",
      text: "Drugie zastosowanie B1: gabloty miejskie informacyjne. Trzecie: backdropy na koncertach klubowych i wystawach galeryjnych. Cena: ok. 10-18 zł brutto za sztukę przy nakładzie 50-100 sztuk.",
    },
    {
      type: "h2",
      id: "format-a0",
      text: "Format A0 — wielkoformatowy plakat ekspozycyjny",
    },
    {
      type: "p",
      text: "A0 (841×1189 mm) to maksymalny format „plakatu w arkuszu” — większe formaty drukujemy już jako tkanin (banery vinyl) lub składanych grafik (poliester z latkami). A0 sprawdza się w lobby kin, hal konferencyjnych, sal wystawowych muzeów, lobby biurowców premium.",
    },
    {
      type: "p",
      text: "Czytelność z dystansu 4-10 metrów. Cena: ok. 20-30 zł brutto za sztukę przy nakładzie 25-50 sztuk. Pakowanie: sztywna tuba kartonowa o długości ok. 130 cm. Transport: wymaga większego pojazdu (nie zmieści się do samochodu osobowego w stanie zrolowanym).",
    },
    {
      type: "h2",
      id: "format-b2",
      text: "Format B2 — rzadko zamawiany, ale przydatny",
    },
    {
      type: "p",
      text: "B2 (500×707 mm) to format pośredni między A2 i A1. Mniej popularny w masowej dystrybucji, ale przydatny w specyficznych zastosowaniach: gabloty miejskie o niestandardowych wymiarach, plakaty w środkach komunikacji miejskiej (np. niektóre standy w metrze), specjalistyczne ekspozycje muzealne. Cena podobna do A1 (ok. 7-12 zł brutto za sztukę).",
    },
    {
      type: "h2",
      id: "papier-i-trwalosc",
      text: "Papier i trwałość — który wybrać",
    },
    {
      type: "table",
      caption: "Rodzaje papierów do plakatów i ich zastosowanie",
      headers: ["Papier", "Gramatura", "Zastosowanie", "Trwałość"],
      rows: [
        [
          "Satynowy",
          "170 g",
          "Plakaty wewnętrzne (gabloty, witryny)",
          "12+ miesięcy",
        ],
        [
          "Kreda mat",
          "170-200 g",
          "Plakaty premium wewnętrzne",
          "12+ miesięcy",
        ],
        [
          "Blueback",
          "115-135 g",
          "Plakaty outdoor na słupy reklamowe",
          "4-8 tygodni",
        ],
        [
          "Fotograficzny półbłysk",
          "200 g",
          "Wystawy galeryjne, fotografia",
          "24+ miesięcy",
        ],
        [
          "Papier laminowany matowo",
          "170 g + laminat",
          "Plakaty outdoor, łazienki, miejsca wilgotne",
          "24+ miesięcy",
        ],
        [
          "Vinyl/banner",
          "440 g",
          "Plakaty outdoor długoterminowe (rok+)",
          "24-36 miesięcy",
        ],
      ],
    },
    {
      type: "h2",
      id: "dpi-i-rozdzielczosc",
      text: "Rozdzielczość pliku — dpi vs format",
    },
    {
      type: "table",
      caption: "Minimalna rozdzielczość pliku dla różnych formatów plakatów",
      headers: [
        "Format",
        "Dystans oglądania",
        "Minimalna rozdzielczość",
        "Komentarz",
      ],
      rows: [
        ["A4", "1 m", "300 dpi", "Wymagane dla małych formatów"],
        ["A3", "1-2 m", "300 dpi", "Standard"],
        ["A2", "2-3 m", "200 dpi", "Wystarcza dla większości projektów"],
        ["A1", "3-5 m", "150 dpi", "Plakat oglądany z większego dystansu"],
        ["B1", "5-10 m", "150 dpi", "Słupy reklamowe — niska rozdzielczość OK"],
        ["A0", "5-10 m", "100-150 dpi", "Bardzo niska rozdzielczość wystarcza"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Plik o zbyt wysokiej rozdzielczości (300 dpi dla A0) waży 500+ MB i jest niewspółmiernie ciężki w transporcie do drukarni. 150 dpi dla A0 to ok. 150 MB — wystarczająca jakość przy mniejszym pliku. Skaluj rozdzielczość do realnego dystansu oglądania.",
    },
    {
      type: "h2",
      id: "praktyczne-zalecenia",
      text: "Praktyczne zalecenia wyboru formatu",
    },
    {
      type: "list",
      items: [
        "Plakat do salki konferencyjnej / pokoju: A3 lub A2",
        "Plakat informacyjny na drzwi sklepu: A3 (mała powierzchnia) lub A2 (bardziej widoczny)",
        "Plakat reklamowy w gablocie miejskiej: A2 (standard polskich gablot)",
        "Plakat w witrynie sklepowej: A1 (większa powierzchnia)",
        "Plakat na słupy reklamowe miejskie: B1 (standard polskich słupów)",
        "Plakat eventowy w lobby biurowca / kina: A1 lub A0",
        "Plakat wystawowy w galerii sztuki / muzeum: A0 (premium)",
        "Backdrop na koncert / panel dyskusyjny: A0 lub B1",
      ],
    },
    {
      type: "h2",
      id: "outdoor-vs-indoor",
      text: "Plakaty outdoor vs indoor — różnice technologiczne",
    },
    {
      type: "p",
      text: "Plakaty indoor (gabloty, witryny, wnętrza) drukujemy na papierze satynowym lub kreda mat 170g — wystarczająco trwałe na 12+ miesięcy pod oświetleniem konferencyjnym. Plakaty outdoor (słupy reklamowe, fasady, plakaty wystawiane na zewnątrz) wymagają specjalnego papieru: blueback do słupów (4-8 tygodni trwałości), [laminowane](/blog/wykonczenia-folia-uv-tloczenie) do długiej ekspozycji (24+ miesięcy).",
    },
    {
      type: "p",
      text: "Druk outdoor wykorzystuje farby UV-odporne — droższe od standardowych ekosolwentowych, ale wytrzymują 6-12 miesięcy pełnego słońca. Dla plakatów wystawianych na bardzo długo (1+ rok) używamy banera vinylowego z laminacji — to już inna kategoria niż „plakat papierowy”.",
    },
    {
      type: "faq",
      items: [
        {
          q: "Jaka jest różnica między formatem A1 a B1?",
          a: "B1 (707×1000 mm) jest większy od A1 (594×841 mm) o ok. 70% powierzchni. B1 jest standardem słupów reklamowych w polskich miastach — A1 nie wpasowuje się idealnie w te słupy (zostaje za dużo wolnego miejsca z boków). Dla witryn sklepowych i lobby biurowców używa się A1 (łatwiej dostępne ramki). Dla outdoor reklamowego miejskiego — B1.",
        },
        {
          q: "Czy mogę zamówić plakat w niestandardowym formacie?",
          a: "Tak, większość drukarni przyjmuje niestandardowe formaty (np. 800 × 600 mm dla konkretnej gabloty wystawowej). Cena zależy od najbliższego standardowego formatu „na rolce” — papier do druku wielkoformatowego ma standardowe szerokości (1067 mm dla A0, 914 mm dla A1). Niestandardowy format jest cięty z rolki, więc cena bliska standardowemu formatowi z którego jest cięty.",
        },
        {
          q: "Ile czasu zajmuje druk plakatów?",
          a: "Standardowe plakaty A2/A3 na papierze satynowym: 72 h od potwierdzenia pliku. Plakaty A1/B1 wielkoformatowe: 72-96 h. Plakaty A0: 96 h. Z laminowaniem: +48 h. Express 24 h dostępny za dopłatą 40%. Dla nakładów 50+ plakatów A0: 4-5 dni roboczych.",
        },
        {
          q: "Czy mogę powielić plakat A0 z mniejszego pliku?",
          a: "Nie polecamy. Plik zaprojektowany w skali A3 i przeskalowany do A0 wygląda nieostry — nawet jeśli technicznie 100 dpi w A0 może wystarczyć, to artefakty interpolacji (rozmycie zdjęć, pikselizacja krawędzi) są widoczne. Lepiej zaprojektować plik w skali 1:1 w A0 z odpowiednią rozdzielczością. Wyjątek: grafika wektorowa (Illustrator) — wektory skalują się bez utraty jakości, więc plakat A4 w wektorach przeskalowany do A0 wygląda OK.",
        },
        {
          q: "Czy plakat z kraty kolorowej jest dobry pomysł?",
          a: "Krata (siatka, mesh) to specjalny materiał, w którym 30-50% powierzchni to dziurki. Sprawdza się dla plakatów outdoor na wysokie konstrukcje (np. plakaty wieszane na ścianach budynków), gdzie chcesz, żeby wiatr przepuszczał się przez plakat (mniejsze obciążenie konstrukcji). Wadą jest gorsza czytelność z bliska — krata jest widoczna w odległości 1-2 m, plakat wygląda „dziurkowany”. Dla normalnych plakatów reklamowych — nie polecamy.",
        },
        {
          q: "Jaki format polecasz na plakat koncertowy?",
          a: "A2 dla plakatów do gablot i naklejania na słupach (mała powierzchnia, czytelne z dystansu 2-3 m). A1 dla plakatów do dużych klubów i miejsc, gdzie plakat wisi w lobby (czytelny z 5+ metrów). B1 dla plakatów na słupy reklamowe (oficjalna forma promocji w miastach). Najczęściej zamawiany: A2 (50-200 sztuk dla rozwieszania) + A1 (5-15 sztuk do większych miejsc).",
        },
        {
          q: "Czy mogę dostać plakaty w opakowaniu jednostkowym?",
          a: "Standardowo plakaty pakujemy w jedną sztywną tubę kartonową — wszystkie zamówione w jednym formacie idą razem. Jeśli chcesz pakowanie jednostkowe (każdy plakat w osobnej tubie), dostępne za dopłatą 5 zł/plakat. Polecamy dla plakatów wysyłanych dalej do różnych odbiorców (np. plakaty wystawowe wysyłane do 10 galerii w różnych miastach).",
        },
      ],
    },
    {
      type: "cta",
      heading: "Wybierz format i zamów plakaty",
      body: "W konfiguratorze DobrePrinty wybierz format (A3-A0, B1, B2), papier (satynowy, fotograficzny, blueback), wgraj plik PDF. Plakaty drukujemy w 72 h, pakowane w sztywne tuby kartonowe.",
      href: "/produkty/plakaty",
      label: "Zamów druk plakatów →",
    },
  ],
};
