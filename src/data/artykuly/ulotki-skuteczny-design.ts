import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "ulotki-skuteczny-design",
  title: "Ulotki reklamowe — skuteczny design, przykłady, zasady",
  excerpt:
    "Co decyduje o skutecznej ulotce reklamowej? Zasady kompozycji, hierarchia informacji, CTA, kolory, fonty. Praktyczny przewodnik z przykładami dla różnych branż.",
  category: "produkty",
  tags: ["ulotki", "design", "kompozycja", "skuteczność reklamy"],
  publishedAt: "2026-03-05",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["ulotki", "skladane-ulotki", "plakaty"],
  sections: [
    {
      type: "p",
      text: "Skuteczna [ulotka](/produkty/ulotki) to nie ozdobiona kartka z logo i numerem telefonu. Skuteczna ulotka prowokuje akcję: telefon, wizytę w sklepie, zakup, zapisanie się na newsletter. W tym poradniku rozkładamy zasady designu skutecznej ulotki na konkretne elementy: nagłówek, hierarchia, kolory, CTA, typografia. Z przykładami dla branży gastronomicznej, beauty, B2B, fitness i edukacji.",
    },
    {
      type: "h2",
      id: "celem-ulotki-jest-akcja",
      text: "Cel ulotki to akcja, nie estetyka",
    },
    {
      type: "p",
      text: "Pierwsza zasada: ulotka istnieje, żeby klient zrobił coś konkretnego. Może to być: zadzwonić, odwiedzić sklep, kupić online, zapisać się na warsztat, polubić Facebook page. Bez celu ulotka jest dekoracją. Z celem ulotka jest narzędziem konwersji.",
    },
    {
      type: "p",
      text: "Zanim zaczniesz projektować, odpowiedz na pytanie: „co dokładnie ma zrobić klient po przeczytaniu mojej ulotki?”. Jeśli odpowiedź to „wie o naszym sklepie” — to za mało. Lepsza odpowiedź: „odwiedzi sklep z kuponem -20% w ciągu 14 dni”. Cel mierzalny prowadzi do projektu, który prowadzi do mierzalnej akcji.",
    },
    {
      type: "h2",
      id: "hierarchia-informacji",
      text: "Hierarchia informacji — 5-sekundowy test",
    },
    {
      type: "p",
      text: "Klient ogląda ulotkę 3-5 sekund, zanim podejmuje decyzję: czytać dalej czy wyrzucić. W tym czasie musi zrozumieć: kim jesteś, co oferujesz, dlaczego ma się zainteresować. Hierarchia informacji decyduje o tym, czy w tych 5 sekundach przekazuje się odpowiedni komunikat.",
    },
    {
      type: "p",
      text: "Standardowa hierarchia od góry do dołu:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Headline (największy element): „Czego” chce klient — np. „Pizza z dostawą w 30 minut” (NIE: „Restauracja Mario od 1995”)",
        "Hero visual: zdjęcie produktu lub ilustracja oddająca obietnicę",
        "Subheadline: rozwinięcie obietnicy — np. „Smak Włoch w 4 dzielnicach Krakowa”",
        "Body (krótkie): 2-3 punkty wyjaśniające ofertę (np. „Pizza neapolitańska na ognistym piecu”)",
        "CTA (oczywisty): „Zamów online — kod RABAT20 → 20% taniej do 31 marca”",
        "Logo + dane kontaktowe (najmniejsze): na końcu, nie na początku",
      ],
    },
    {
      type: "callout",
      variant: "warn",
      text: "Najczęstszy błąd: logo i nazwa firmy największe na ulotce. Klient nie zna Twojej firmy, więc logo go nie interesuje. Interesuje go OBIETNICA — co dostanie. Logo umieść mniejsze, na dole. Headline rezerwuj dla obietnicy.",
    },
    {
      type: "h2",
      id: "headline-formuly",
      text: "Headline — formuły, które działają",
    },
    {
      type: "table",
      caption: "Sprawdzone formuły headline dla ulotek B2C i B2B",
      headers: ["Formuła", "Przykład B2C", "Przykład B2B"],
      rows: [
        [
          "Konkretna korzyść",
          "Czysty dom w 2 godziny",
          "Sprzedaż +30% w 6 miesięcy",
        ],
        [
          "Eliminacja problemu",
          "Bez bólu pleców od dziś",
          "Zatrzymaj odpływ klientów",
        ],
        [
          "Liczba + obietnica",
          "10 dań w 30 minut",
          "5 nowych klientów miesięcznie",
        ],
        [
          "Pytanie prowokujące",
          "Płacisz za fitness, którego nie używasz?",
          "Twoja strona internetowa konwertuje?",
        ],
        [
          "Sprzeczność/zdziwienie",
          "Tania pizza, ale dobrej jakości",
          "Marketing bez agencji marketingowej",
        ],
        [
          "Społeczny dowód",
          "1000 zadowolonych klientów",
          "Wybierany przez Allegro, IKEA, mBank",
        ],
      ],
    },
    {
      type: "h2",
      id: "kolory-i-emocje",
      text: "Kolory — psychologia w designie ulotek",
    },
    {
      type: "p",
      text: "Kolory wywołują emocje przed zrozumieniem treści. Czerwony krzyczy „pilne, działaj teraz”. Niebieski „zaufanie, profesjonalizm”. Zielony „naturalne, zdrowe”. Czarny „premium, luksus”. Twoja branża powinna dyktować dominantę kolorystyczną.",
    },
    {
      type: "list",
      items: [
        "Gastronomia: czerwony, pomarańcz, żółty (apetyt) — McDonald's, KFC, Burger King",
        "Beauty / SPA: pastele (różowy, mięta, beż) — przyjemność, luksus",
        "Fitness: czarny + żółty/zielony (energia) — Gymshark, Nike",
        "B2B / IT: niebieski + biały (zaufanie) — IBM, Microsoft, Allegro",
        "Edukacja: pomarańcz / niebieski (kreatywność + zaufanie)",
        "Premium / luksus: czarny + złoty + biały (ekskluzywność)",
        "Eko / natural: zielony + brąz + biały (natura)",
      ],
    },
    {
      type: "p",
      text: "Zasada 60-30-10: dominanta (60% powierzchni), kolor pomocniczy (30%), akcent (10%). Akcent na CTA — wyróżnia akcję, do której prowadzi ulotka. Czerwony przycisk „Zamów teraz” na granatowym tle to klasyk, który działa.",
    },
    {
      type: "h2",
      id: "typografia",
      text: "Typografia — fonty, które są czytelne",
    },
    {
      type: "p",
      text: "Maximum 2 fonty na ulotce: jeden dla headline (mocniejszy, charakterystyczny), drugi dla body (czytelny, neutralny). [Mieszanie 3+ fontów](/blog/wybor-czcionek-do-druku) to chaos wizualny — klient nie wie, na czym skupić uwagę.",
    },
    {
      type: "p",
      text: "Czytelność: minimum 8 pt dla danych kontaktowych, 10-12 pt dla body, 24+ pt dla podpisów i kategorii, 50+ pt dla headline. Pisz wielkimi literami dla nagłówków typu „PROMOCJA”, „ZAMÓW DZIŚ” — to wzmacnia komunikat. Body małymi literami — łatwiejsze do czytania.",
    },
    {
      type: "p",
      text: "Bezpieczne kombinacje fontów: Inter + Inter Bold (jeden font, dwie wagi), Helvetica + Georgia (sans + serif), Roboto + Playfair Display (modernistyczny + elegancki), Open Sans + Lora (uniwersalny + ciepły).",
    },
    {
      type: "h2",
      id: "cta-call-to-action",
      text: "CTA — wezwanie do akcji",
    },
    {
      type: "p",
      text: "CTA to najważniejszy element ulotki. To miejsce, gdzie klient podejmuje akcję. Bez CTA ulotka jest jak rozmowa bez konkluzji — klient wie, że istniejesz, ale nie wie, co zrobić.",
    },
    {
      type: "list",
      items: [
        "CTA konkretne: „Zamów online z kodem RABAT20” (NIE: „Zapraszamy do współpracy”)",
        "CTA jasne: kontrastowy kolor, większy font, otoczone wolnym miejscem",
        "CTA z deadline'em: „Promocja do 31 marca” (presja czasowa zwiększa konwersję)",
        "CTA z low-friction: „Zadzwoń: 123 456 789” to mniejszy próg niż „Wypełnij formularz na stronie”",
        "CTA z benefitem: „Zadzwoń i odbierz darmową konsultację” (klient widzi wymianę: dzwoni → dostaje wartość)",
      ],
    },
    {
      type: "h2",
      id: "format-i-dystrybucja",
      text: "Format ulotki vs kanał dystrybucji",
    },
    {
      type: "table",
      caption: "Format ulotki dopasowany do kanału dystrybucji",
      headers: ["Kanał dystrybucji", "Polecany format", "Gramatura"],
      rows: [
        ["Skrzynki pocztowe", "DL (100 × 210 mm) lub A6", "130-170 g"],
        ["Rozdawanie na ulicach", "A6 lub kwadrat 100 × 100 mm", "170 g"],
        ["Stoiska targowe", "A5 (148 × 210 mm)", "170-200 g"],
        ["Lady sklepowe", "A6 lub DL", "200-250 g (sztywne)"],
        ["Menu w restauracji", "A4 lub DL składany", "170 g z folią matową"],
        [
          "Mini-katalog produktowy",
          "A5 składana w C (6 łamów)",
          "170 g, bigowanie + folia",
        ],
        ["Zaproszenia", "A6 lub kwadrat 110 × 110 mm", "250-300 g, premium"],
      ],
    },
    {
      type: "h2",
      id: "przyklady-branz",
      text: "Przykłady designu według branż",
    },
    {
      type: "h3",
      id: "gastronomia",
      text: "Gastronomia (restauracja, kawiarnia)",
    },
    {
      type: "p",
      text: "Headline: konkretny produkt z benefitem („Pizza z dostawą w 30 minut”). Hero: duże zdjęcie potrawy, fotografia produktowa wysokiej jakości. Kolory: czerwony + pomarańcz (apetyt) lub czarny + złoty (premium). CTA: „Zamów online z kodem PIZZA20” lub „Zarezerwuj stolik: 123 456 789”. Typowy format: [DL składana w C](/produkty/skladane-ulotki) (menu rozkładane), 170 g kreda mat.",
    },
    {
      type: "h3",
      id: "beauty",
      text: "Beauty / Salon piękności",
    },
    {
      type: "p",
      text: "Headline: konkretna usługa z deadline'em („Manicure żelowy -40% do końca marca”). Hero: zdjęcie efektu (dłonie po manicure, włosy po koloryzacji). Kolory: pastel (róż, brzoskwinia, beż). CTA: „Zarezerwuj online” lub „Zadzwoń: 123 456 789”. Format: A6 lub DL z folią matową (premium look).",
    },
    {
      type: "h3",
      id: "b2b-doradztwo",
      text: "B2B (doradztwo, IT, konsulting)",
    },
    {
      type: "p",
      text: "Headline: konkretny rezultat biznesowy („Sprzedaż +30% w 6 miesięcy”). Hero: ikona lub diagram (nie zdjęcie produktu, którego nie ma). Kolory: niebieski + biały (zaufanie) lub czarny + biały (premium). CTA: „Bezpłatna konsultacja: 123 456 789” lub „Pobierz raport branżowy na www.firma.pl/raport”. Format: A5 lub składana A4.",
    },
    {
      type: "h3",
      id: "fitness",
      text: "Fitness / Klub sportowy",
    },
    {
      type: "p",
      text: "Headline: konkretny cel ze datą („Schudnij 5 kg do lata”). Hero: zdjęcie ćwiczenia lub trenera. Kolory: czarny + żółty/zielony (energia). CTA: „Pierwszy trening gratis — zadzwoń”. Format: DL lub A6, gramatura 170 g.",
    },
    {
      type: "h2",
      id: "co-omijac",
      text: "Czego unikać w designie ulotek",
    },
    {
      type: "list",
      items: [
        "Logo i nazwa firmy jako headline — klient nie zna Twojej firmy",
        "Zbyt dużo informacji — ulotka to nie katalog, jedna główna obietnica wystarcza",
        "Wielokolorowy chaos — używaj 60-30-10 (dominanta, pomocniczy, akcent)",
        "Standardowe stock fotografie (uśmiechnięci ludzie w garniturach) — są wykorzystywane przez konkurencję, klient nie wierzy",
        "Cliché claimy: „Profesjonalna obsługa”, „Najlepsza jakość w najlepszej cenie” — każda firma to mówi",
        "CTA „Skontaktuj się z nami” — zbyt ogólne, daj konkretny powód i sposób",
        "Brak deadline'u — bez presji czasowej klient odkłada decyzję na nigdy",
        "Czcionki za małe (poniżej 7 pt) — nieczytelne dla osób >40 r.ż.",
        "Tekst nad zdjęciem bez kontrastu — czyta się ciężko, klient pomija",
      ],
    },
    {
      type: "faq",
      items: [
        {
          q: "Jak długo działa ulotka po wyrzuceniu jej do skrzynki?",
          a: "Średnia ulotka wpada do kosza w 2-7 sekundach od oglądu. Skuteczna ulotka ma 30-90 sekund aktywnej uwagi (klient czyta). Wybitna ulotka zostaje wbrew zniknięcia z biurka — bo zawiera kupon, listę dostępnych usług, kalendarz wydarzeń. Format „referencyjny” (kalendarz miesiąca, mapa okolicy) wydłuża żywotność ulotki nawet do kilku tygodni.",
        },
        {
          q: "Jaki nakład ulotek jest minimalny dla kampanii lokalnej?",
          a: "Dla kampanii dzielnicowej (np. promocja restauracji w jednej dzielnicy Krakowa) — 1000-2500 sztuk. Dla kampanii miejskiej (cały Kraków) — 5000-10 000. Dla kampanii ogólnopolskiej — 50 000+. Konwersja z ulotki to typowo 0,5-2% (na 1000 ulotek dostaniesz 5-20 zapytań/zakupów), więc nakład musi być wystarczający, żeby przekroczyć próg ekonomicznej opłacalności.",
        },
        {
          q: "Czy mam projektować ulotkę sam czy zatrudnić grafika?",
          a: "Jeśli nie masz doświadczenia w designie — zatrudnij grafika. Koszt 300-800 zł za projekt ulotki to ułamek wartości kampanii. Skuteczna ulotka generuje 5-50× więcej zwrotu niż jej projekt. Próba samodzielnego projektowania w Canvie często kończy się ulotką, która wygląda amatorsko i generuje niską konwersję.",
        },
        {
          q: "Czy ulotki dwustronne 4/4 są warte dodatkowego kosztu?",
          a: "Tak, zawsze. Cena 4/4 vs 4/0 to ok. 30-40% więcej, ale wykorzystujesz 2× więcej powierzchni komunikacyjnej. Tylna strona = miejsce na argumenty, listę produktów, mapę, kupony. Ulotka 4/0 z pustym tyłem to marnowanie 50% potencjału. Wybieraj 4/4 zawsze, chyba że budżet jest skrajnie ograniczony.",
        },
        {
          q: "Czy QR kod ma sens na ulotce?",
          a: "Tak, ale tylko jeśli prowadzi do czegoś wartościowego: rezerwacji online, kuponu rabatowego, formularza kontaktowego. QR prowadzący do strony głównej firmy jest niepotrzebny — szybciej wpisać URL. Skuteczny QR: „Skanuj i odbierz darmową dostawę” — daje konkretny powód. Minimum 2×2 cm dla pewności odczytu.",
        },
        {
          q: "Ile czasu trwa produkcja ulotek?",
          a: "Standardowe ulotki (CMYK 4/4, papier 130-170 g, bez wykończeń): 24-48 h od potwierdzenia pliku. Z folią matową: +48 h. Express 24 h dostępny za dopłatą 30%. Dla nakładów 10 000+ — 3-5 dni roboczych, bo standardowo przechodzimy na offset (lepsza cena jednostkowa, ale dłuższy proces).",
        },
        {
          q: "Jak mierzyć skuteczność ulotki?",
          a: "Dodaj unikalny element trackingowy: kod kuponu („RABAT20-MARS”), unikalny numer telefonu (przekierowanie z tego numeru = mierzalna konwersja), unikalny URL („www.firma.pl/marzec”), QR z parametrami UTM. Bez trackingu nie wiesz, ile ulotek przeczyło się w realnym ruchu, sprzedaży, zapytaniach. Wszystkie kampanie ulotkowe powinny mieć przypisany sposób pomiaru.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Gotowy zaprojektować skuteczną ulotkę?",
      body: "Zamów druk ulotek w DobrePrinty — od 1 sztuki, dostawa w 24-48 h. Ulotka po projekcie wymaga już tylko pliku PDF i nakładu.",
      href: "/produkty/ulotki",
      label: "Zamów druk ulotek →",
    },
  ],
};
