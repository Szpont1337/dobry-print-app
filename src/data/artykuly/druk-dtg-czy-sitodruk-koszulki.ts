import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "druk-dtg-czy-sitodruk-koszulki",
  title: "Druk DTG czy sitodruk? Porównanie technologii nadruku na koszulki",
  excerpt:
    "DTG, sitodruk, flex/flock czy sublimacja? Porównujemy technologie nadruku na koszulki: koszty, nakłady, kolory, tkaniny i trwałość.",
  category: "poradniki",
  tags: ["koszulki", "DTG", "sitodruk", "technologie druku", "nadruk"],
  publishedAt: "2026-06-10",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["koszulki"],
  sections: [
    {
      type: "p",
      text: "Nadruk na koszulce można wykonać na co najmniej cztery sposoby — i każdy z nich daje inny efekt, inaczej się starzeje i inaczej liczy w budżecie. DTG błyszczy przy małych nakładach i fotografiach, sitodruk wygrywa przy tysiącu identycznych koszulek, flex jest niezastąpiony przy pojedynczych napisach, a sublimacja rządzi na poliestrze. W tym artykule porównujemy wszystkie cztery technologie: jak działają, ile kosztują przy różnych nakładach, jakie mają ograniczenia kolorystyczne i na jakich tkaninach w ogóle działają. Po lekturze będziesz wiedzieć, która metoda pasuje do Twojego projektu — a jeśli wybór padnie na DTG, poradnik [jak przygotować nadruk na koszulkę](/blog/jak-przygotowac-nadruk-na-koszulke) przeprowadzi Cię przez przygotowanie pliku.",
    },
    {
      type: "h2",
      id: "jak-dziala-kazda-technologia",
      text: "Jak działa każda z technologii",
    },
    {
      type: "p",
      text: "DTG (Direct To Garment) to druk cyfrowy bezpośrednio na tkaninie — drukarka nakłada tusze pigmentowe na bawełnę podobnie jak drukarka biurowa na papier, tylko precyzyjniej i trwalej. Nie ma matryc ani form: plik graficzny trafia z komputera prosto na koszulkę. Dzięki temu DTG drukuje pełny kolor (4/0) bez dopłat za liczbę barw i opłaca się już od 1 sztuki. To właśnie ta technologia pracuje w DobrePrinty: biała koszulka z bawełny 100% o gramaturze 180 g/m², nadruk do formatu A4 (21×29 cm) na przodzie, od 39 zł za sztukę.",
    },
    {
      type: "p",
      text: "Sitodruk to klasyka przemysłowa: farba jest przeciskana przez sito (matrycę) na tkaninę, osobno dla każdego koloru. Przygotowanie sit kosztuje — zwykle 80–150 zł za kolor — ale gdy matryce już są, każda kolejna koszulka schodzi z linii błyskawicznie i tanio. Flex i flock to termotransfer z folii: ploter wycina kształt z kolorowej folii, którą następnie wgrzewa się w tkaninę prasą termiczną. Flex jest gładki i lekko błyszczący, flock ma aksamitną, zamszową fakturę. Sublimacja działa odwrotnie niż wszystkie pozostałe: barwnik pod wpływem temperatury przechodzi w gaz i trwale wnika we włókna — ale tylko w poliester i tylko na jasnym podłożu.",
    },
    {
      type: "h2",
      id: "tabela-porownawcza",
      text: "Tabela porównawcza: DTG vs sitodruk vs flex/flock vs sublimacja",
    },
    {
      type: "p",
      text: "Zanim przejdziemy do szczegółów, spójrz na zestawienie wszystkich czterech technologii w jednej tabeli. Porównujemy je w dziesięciu wymiarach, które realnie decydują o wyborze: od minimalnego opłacalnego nakładu, przez koszty przygotowania i cenę jednostkową przy różnych wolumenach, po rodzaj tkaniny, chwyt nadruku i trwałość w praniu. Żadna z metod nie wygrywa we wszystkich kategoriach — i właśnie dlatego wszystkie cztery wciąż funkcjonują na rynku obok siebie. Tabela pomoże Ci szybko odrzucić technologie, które nie pasują do Twojego projektu, a dalsze sekcje wyjaśniają każdy wiersz bardziej szczegółowo.",
    },
    {
      type: "table",
      caption: "Porównanie technologii nadruku na koszulki",
      headers: ["Cecha", "DTG", "Sitodruk", "Flex / flock", "Sublimacja"],
      rows: [
        [
          "Minimalny opłacalny nakład",
          "Od 1 szt.",
          "Od ok. 30–50 szt.",
          "Od 1 szt.",
          "Od 1 szt.",
        ],
        [
          "Liczba kolorów",
          "Bez limitu (pełny kolor)",
          "Każdy kolor = osobne sito",
          "1–3 (każdy kolor = osobna folia)",
          "Bez limitu (pełny kolor)",
        ],
        [
          "Fotografie i gradienty",
          "Tak — najlepsza jakość",
          "Trudne (raster, koszty)",
          "Nie",
          "Tak",
        ],
        [
          "Tkanina",
          "Bawełna (najlepiej 100%)",
          "Bawełna, mieszanki",
          "Większość tkanin",
          "Tylko poliester, jasny",
        ],
        [
          "Koszt przygotowania",
          "Brak",
          "80–150 zł za kolor (sita)",
          "Niski (wycięcie folii)",
          "Brak",
        ],
        [
          "Koszt jednostkowy przy 1 szt.",
          "Niski",
          "Bardzo wysoki",
          "Niski",
          "Niski",
        ],
        [
          "Koszt jednostkowy przy 500 szt.",
          "Średni",
          "Najniższy",
          "Wysoki (praca ręczna)",
          "Średni",
        ],
        [
          "Chwyt nadruku (grubość)",
          "Cienki, „wtopiony”",
          "Wyczuwalna warstwa farby",
          "Wyraźna warstwa folii",
          "Zero — barwnik we włóknie",
        ],
        [
          "Trwałość prania",
          "Wysoka (pranie 30–40°C)",
          "Bardzo wysoka",
          "Wysoka, folia może pękać",
          "Najwyższa",
        ],
        [
          "Czas realizacji małych zleceń",
          "Krótki (u nas 3 dni robocze)",
          "Długi (przygotowanie sit)",
          "Krótki",
          "Krótki",
        ],
      ],
    },
    {
      type: "callout",
      variant: "info",
      text: "W DobrePrinty drukujemy koszulki w technologii DTG: pełny kolor na przodzie, pole nadruku ~A4, biała bawełna 100% (180 g/m²), od 1 sztuki, z wysyłką w 3 dni robocze. Ceny: S/M/L — 39 zł, XL — 42 zł, XXL — 45 zł za sztukę.",
    },
    {
      type: "h2",
      id: "naklad-decyduje",
      text: "Nakład decyduje: kiedy która technologia się opłaca",
    },
    {
      type: "p",
      text: "Najważniejsza zmienna w wyborze technologii to nakład. W sitodruku płacisz za przygotowanie sit niezależnie od tego, czy wydrukujesz 10 czy 1000 koszulek — przy trzykolorowym projekcie to 240–450 zł samego przygotowania, zanim powstanie pierwsza koszulka. Przy 10 sztukach samo przygotowanie dokłada 24–45 zł do każdej koszulki. Przy 1000 sztuk ten sam koszt rozkłada się na 24–45 groszy — i wtedy sitodruk staje się bezkonkurencyjny cenowo. DTG nie ma kosztów przygotowania, więc cena za sztukę jest stała: pierwsza koszulka kosztuje tyle samo co setna.",
    },
    {
      type: "p",
      text: "Granica opłacalności przebiega zwykle między 30 a 100 sztukami — zależnie od liczby kolorów w projekcie. Projekt jednokolorowy (jedno sito) zaczyna się opłacać w sitodruku wcześniej; projekt pełnokolorowy z gradientami może nigdy nie być tańszy w sicie, bo wymaga rastrowania i wielu matryc. Praktyczna reguła: do ok. 50 sztuk lub przy wielokolorowej grafice — DTG; powyżej 100–200 identycznych koszulek z prostą, 1–3-kolorową grafiką — sitodruk; pomiędzy — licz oba warianty. Dla zamówień firmowych z różnymi rozmiarami i niewielkimi nakładami DTG ma jeszcze jedną przewagę: brak minimum, o czym piszemy szerzej w artykule o [koszulkach firmowych z nadrukiem](/blog/koszulki-firmowe-z-nadrukiem).",
    },
    {
      type: "h2",
      id: "kolory-i-grafika",
      text: "Liczba kolorów i rodzaj grafiki",
    },
    {
      type: "p",
      text: "Druga zmienna to sama grafika. DTG i sublimacja drukują pełny kolor bez żadnych dopłat — fotografia, ilustracja z setką odcieni i prosty napis kosztują dokładnie tyle samo. Sitodruk wycenia się od koloru: logo w trzech barwach to trzy sita, trzy przygotowania i trzy przejścia maszyny. Fotorealistyczne grafiki w sitodruku wymagają symulowanego rastra CMYK — to drogie i ma sens tylko przy bardzo dużych nakładach. Flex i flock w ogóle nie drukują: folia ma jeden, jednolity kolor, więc technologia nadaje się do napisów, numerów i prostych logotypów, ale nie do ilustracji.",
    },
    {
      type: "list",
      items: [
        "Fotografia, gradient, wielokolorowa ilustracja → DTG (na bawełnie) lub sublimacja (na poliestrze)",
        "Proste logo w 1–3 kolorach, duży nakład → sitodruk",
        "Pojedynczy napis, numer na koszulce sportowej, personalizacja imienna → flex",
        "Efekt aksamitnej, wypukłej faktury (np. retro logo) → flock",
        "Mały nakład czegokolwiek pełnokolorowego → DTG, bez dyskusji",
      ],
    },
    {
      type: "h2",
      id: "tkanina-ma-znaczenie",
      text: "Tkanina ma znaczenie: bawełna kontra poliester",
    },
    {
      type: "p",
      text: "Technologii nie wybiera się w oderwaniu od tkaniny. DTG działa najlepiej na bawełnie 100% — tusze pigmentowe wiążą się z włóknami naturalnymi, a im wyższy udział bawełny, tym czystszy kolor i lepsza trwałość. Nasza koszulka to właśnie bawełna 100% o gramaturze 180 g/m² — gęsta na tyle, by nadruk miał równe, stabilne podłoże, a jednocześnie przewiewna na co dzień. Sublimacja to lustrzane przeciwieństwo: barwnik sublimacyjny wiąże się wyłącznie z poliestrem, a na bawełnie spierze się po kilku praniach. Dodatkowo sublimacja wymaga jasnego (najlepiej białego) podłoża, bo barwnik jest transparentny.",
    },
    {
      type: "p",
      text: "Sitodruk i flex są najbardziej uniwersalne tkaninowo — farby plastizolowe i folie termotransferowe trzymają się bawełny, mieszanek i poliestru. Warto jednak pamiętać o różnicy w chwycie: sitodruk zostawia wyczuwalną warstwę farby, flex — wyraźną „naklejkę” z folii, a DTG wsiąka w tkaninę i po kilku praniach jest niemal niewyczuwalny. Jeśli zależy Ci na miękkim, oddychającym nadruku na bawełnie, DTG nie ma konkurencji. Te same zasady dotyczą zresztą innych tekstyliów bawełnianych — np. toreb, o których piszemy w [przewodniku po torbach płóciennych z nadrukiem](/blog/torby-plocienne-z-nadrukiem-przewodnik).",
    },
    {
      type: "callout",
      variant: "tip",
      text: "Niezależnie od technologii: pierz koszulki z nadrukiem na lewej stronie, w temperaturze do 30–40°C. To wydłuża życie każdego nadruku — DTG, sitodruku i folii termotransferowej.",
    },
    {
      type: "h2",
      id: "co-wybrac",
      text: "Co wybrać? Szybka ściąga decyzyjna",
    },
    {
      type: "p",
      text: "Jeśli dotarłeś tutaj i wciąż się wahasz, oto skrót całego artykułu w trzech pytaniach. Po pierwsze: ile sztuk? Poniżej 50 — DTG (lub flex przy prostym napisie). Powyżej 200 identycznych — policz sitodruk. Po drugie: jaka grafika? Pełny kolor, zdjęcie, gradient — DTG. Jedno- lub dwukolorowe logo przy dużym nakładzie — sitodruk. Po trzecie: jaka tkanina? Bawełna — DTG lub sitodruk; techniczny poliester (koszulki sportowe) — sublimacja. Dla większości projektów, które trafiają do drukarni internetowej — pojedyncze koszulki, prezenty, małe serie firmowe, testy projektów przed większą produkcją — DTG jest po prostu najrozsądniejszym wyborem: zero kosztów przygotowania, pełny kolor i krótki czas realizacji.",
    },
    {
      type: "p",
      text: "Jest jeszcze jeden scenariusz, o którym warto wspomnieć: testowanie projektu przed dużą produkcją. Nawet jeśli docelowo planujesz 500 koszulek w sitodruku, wydrukuj najpierw jedną lub dwie sztuki w DTG. Za 39–45 zł zobaczysz grafikę na prawdziwej tkaninie, sprawdzisz proporcje nadruku na sylwetce i pokażesz fizyczny egzemplarz decydentom — zanim zainwestujesz w przygotowanie sit. To samo podejście sprawdza się przy projektach na inne tekstylia z bawełny, na przykład torby, o których piszemy w osobnym poradniku projektowym.",
    },
    {
      type: "table",
      caption: "Rekomendacje dla typowych scenariuszy",
      headers: ["Scenariusz", "Rekomendowana technologia", "Dlaczego"],
      rows: [
        [
          "1 koszulka na prezent (zdjęcie, grafika)",
          "DTG",
          "Pełny kolor od 1 szt., bez kosztów przygotowania",
        ],
        [
          "15 koszulek na wieczór panieński",
          "DTG",
          "Mały nakład, możliwa personalizacja każdej sztuki",
        ],
        [
          "30 koszulek firmowych z kolorowym logo",
          "DTG",
          "Różne rozmiary, pełny kolor, szybka realizacja",
        ],
        [
          "500 koszulek festiwalowych, logo 2 kolory",
          "Sitodruk",
          "Koszt sit rozłożony na nakład — najniższa cena/szt.",
        ],
        [
          "Koszulki sportowe z numerami",
          "Flex",
          "Pojedyncze numery i nazwiska, trwała folia",
        ],
        [
          "Koszulki techniczne na bieg (poliester)",
          "Sublimacja",
          "Jedyna metoda trwała na poliestrze, pełny kolor",
        ],
      ],
    },
    {
      type: "faq",
      items: [
        {
          q: "Czy nadruk DTG jest trwały?",
          a: "Tak. Tusze pigmentowe wiążą się z włóknami bawełny i wytrzymują dziesiątki prań — pod warunkiem prania na lewej stronie w temperaturze do 30–40°C. DTG nie pęka i nie odkleja się jak folia, bo nie jest warstwą naklejoną na tkaninę, tylko wsiąka w jej strukturę.",
        },
        {
          q: "Dlaczego DTG jest droższy od sitodruku przy dużych nakładach?",
          a: "Bo każda koszulka w DTG przechodzi pełny cykl druku cyfrowego — czas maszyny jest stały dla każdej sztuki. W sitodruku po przygotowaniu sit odbicie kolejnej koszulki trwa sekundy. Przy setkach identycznych sztuk koszt sit się rozkłada i sitodruk wygrywa cenowo.",
        },
        {
          q: "Czy DTG wydrukuje zdjęcie na koszulce?",
          a: "Tak — to najmocniejsza strona tej technologii. DTG drukuje pełny kolor z gradientami i detalami fotograficznymi bez dopłat. Zadbaj tylko o plik: 300 dpi w docelowym rozmiarze, najlepiej PNG. Szczegóły znajdziesz w naszym poradniku przygotowania nadruku na koszulkę.",
        },
        {
          q: "Jaka jest minimalna liczba koszulek w druku DTG?",
          a: "Jedna sztuka. DTG nie wymaga matryc ani przygotowalni, więc nie ma minimum nakładu. W DobrePrinty zamówisz pojedynczą koszulkę od 39 zł (S/M/L), z wysyłką w 3 dni robocze.",
        },
        {
          q: "Czy mogę wydrukować nadruk DTG na czarnej koszulce?",
          a: "Technologicznie DTG drukuje na ciemnych tkaninach z użyciem białego poddruku, ale wymaga to dodatkowego przejścia maszyny i pretreatmentu. W naszej ofercie drukujemy na białych koszulkach z bawełny 100% — biel podłoża daje najczystsze kolory w trybie 4/0 i najlepszą cenę.",
        },
        {
          q: "Co to znaczy „druk 4/0”?",
          a: "To oznaczenie z nomenklatury poligraficznej: 4 kolory (pełny CMYK) z jednej strony, 0 z drugiej. W przypadku koszulki: pełnokolorowy nadruk na przodzie, tył bez nadruku.",
        },
        {
          q: "Która technologia daje najmiększy nadruk?",
          a: "Sublimacja (barwnik wnika we włókno, zero warstwy), ale działa tylko na poliestrze. Na bawełnie najmiększy jest DTG — tusz wsiąka w tkaninę i po kilku praniach jest prawie niewyczuwalny. Sitodruk i flex zostawiają wyczuwalną warstwę na powierzchni.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Wypróbuj druk DTG na koszulce",
      body: "Pełny kolor, pole nadruku A4, bawełna 100% (180 g/m²). Wgraj grafikę, obejrzyj podgląd 3D i zamów od 1 sztuki — od 39 zł, wysyłka w 3 dni robocze.",
      href: "/produkty/koszulki",
      label: "Zamów koszulki →",
    },
  ],
};
