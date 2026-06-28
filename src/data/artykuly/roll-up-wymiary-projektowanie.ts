import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "roll-up-wymiary-projektowanie",
  title: "Roll-up — wymiary standardowe, jak zaprojektować",
  excerpt:
    "Standardowe wymiary roll-upów (85×200, 100×200, 120×200), zasady projektowania, marginesy, fontów, rozdzielczości. Pełny poradnik z przykładami dla stoisk targowych i konferencji.",
  category: "produkty",
  tags: ["roll-up", "wielkoformat", "design", "stoiska targowe"],
  publishedAt: "2026-02-26",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["roll-up", "plakaty", "ulotki"],
  sections: [
    {
      type: "p",
      text: "Roll-up to mobilna reklama o wymiarach 85×200, 100×200 lub 120×200 cm. Standardowy format, błyskawiczny rozłożenie, profesjonalny wygląd. Ale dobry roll-up wymaga projektowania pod jego specyfikę: 25 cm dolnego paska chowa się w stelażu, headline musi być czytelny z 3 metrów, plik to ekosolwentowy CMYK w skali 1:1. W tym poradniku rozkładamy wszystko na czynniki pierwsze.",
    },
    {
      type: "h2",
      id: "wymiary-standardowe",
      text: "Wymiary standardowe roll-upów",
    },
    {
      type: "table",
      caption: "Standardowe wymiary roll-upów w Polsce",
      headers: [
        "Format",
        "Wymiary grafiki (szer. × wys.)",
        "Wymiary widoczne",
        "Zastosowanie",
      ],
      rows: [
        [
          "Mały (kompakt)",
          "60 × 160 cm",
          "60 × 135 cm",
          "Stoiska małych firm, biurka recepcji",
        ],
        [
          "Standard",
          "85 × 200 cm",
          "85 × 175 cm",
          "Klasyk targów i konferencji",
        ],
        [
          "Średni",
          "100 × 200 cm",
          "100 × 175 cm",
          "Lepsza widoczność, większa powierzchnia",
        ],
        [
          "Duży",
          "120 × 200 cm",
          "120 × 175 cm",
          "Stoiska premium, lobby biurowców",
        ],
        ["Wysoki", "85 × 240 cm", "85 × 215 cm", "Wysokie stoiska, lobby"],
      ],
    },
    {
      type: "p",
      text: "Wymiary „widoczne” to format pomniejszony o 25 cm dolnego paska, który chowa się w stelażu po rozłożeniu. Wszystkie kluczowe treści (headline, logo, CTA) trzymaj w obszarze widocznym. Dolny pasek może zawierać tylko mało istotne elementy (drobne dane kontaktowe, NIP), które jeśli się ukryją — niczego nie tracimy.",
    },
    {
      type: "h2",
      id: "ktory-format-wybrac",
      text: "Który format roll-upa wybrać",
    },
    {
      type: "p",
      text: "85×200 cm to klasyk — najpopularniejszy format, mieści się w samochodzie osobowym, łatwy w transporcie. Wybierany przez 70% firm zamawiających roll-up po raz pierwszy. Idealny dla stoisk konferencyjnych i [targów branżowych](/blog/tani-druk-na-targi).",
    },
    {
      type: "p",
      text: "100×200 cm to wybór, gdy zależy na lepszej widoczności z dalszej odległości. Większa powierzchnia graficzna pozwala na bardziej wyraziste komunikaty, większe zdjęcia produktowe. Polecany dla stoisk targowych w halach wystawienniczych, gdzie roll-up rywalizuje z reklamami konkurencji.",
    },
    {
      type: "p",
      text: "120×200 cm to premium — używany w lobby biurowców, hotelach 5-gwiazdkowych, przy prezentacjach korporacyjnych. Wymaga więcej miejsca w transporcie (większy pokrowiec) i jest droższy od standardu o ok. 25%. Warto dla stoisk premium, ale dla stoiska konferencyjnego 5 dni w roku — przesadne.",
    },
    {
      type: "h2",
      id: "zasady-projektowania",
      text: "Zasady projektowania roll-upa",
    },
    {
      type: "h3",
      id: "hierarchia-informacji",
      text: "Hierarchia informacji od góry do dołu",
    },
    {
      type: "p",
      text: "Roll-up jest oglądany z odległości 1-3 metrów. Klient nie ma czasu czytać — musi w 5 sekund zrozumieć, co oferujesz. Standardowa hierarchia od góry do dołu:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Top (top 15-20% wysokości): logo + nazwa firmy (czytelne z 3 metrów)",
        "Hero (środkowe 50%): zdjęcie produktu lub mocna grafika brandingowa",
        "Headline (poniżej hero): jedno zdanie wyjaśniające ofertę, font min. 100 pt (3,5 cm)",
        "Body (krótki opis): 1-3 zdania, font 50-70 pt",
        "CTA (na samym dole widocznego obszaru): „Odwiedź nasze stoisko #12” lub strona www, font 40-60 pt",
        "Dolne 25 cm: ukrywa się w stelażu — tu mało istotne dane",
      ],
    },
    {
      type: "h3",
      id: "fonty-i-czytelnosc",
      text: "Fonty i czytelność z dystansu",
    },
    {
      type: "p",
      text: "Roll-up nie jest broszurą — nikt nie podchodzi pół metra od niego, żeby przeczytać małym fontem. Minimum dla każdego tekstu na roll-upie: 24 pt (8 mm wysokości fontu). Headline: 100+ pt (3,5 cm). Drobny tekst (np. www): 30-40 pt (1-1,5 cm).",
    },
    {
      type: "p",
      text: "Fonty proste i grubsze sprawdzają się lepiej niż cienkie i ozdobne. Helvetica, Inter, Open Sans, Roboto — bezbłędne wybory. Unikaj cienkich serifów (Garamond, Bodoni) — przy 100 pt z 3 metrów wyglądają „pajęczo”. Bold lub Semibold to standard dla headline.",
    },
    {
      type: "h3",
      id: "kolory-i-kontrast",
      text: "Kolory i kontrast",
    },
    {
      type: "p",
      text: "Roll-up rywalizuje z innymi reklamami i ekspozycjami. Wysoki kontrast tła i tekstu jest kluczowy — ciemne tło + biały tekst lub jasne tło + ciemny tekst. Unikaj nisko-kontrastowych kombinacji (np. szary tekst na białym tle, czerwony tekst na zielonym tle).",
    },
    {
      type: "p",
      text: "Brand colors to standard, ale pamiętaj o CMYK — intensywne neony nie wyjdą tak intensywne, jak na monitorze. Sprawdź soft proofing w Photoshopie z profilem CMYK ISO Coated v2 (ECI). Dla brand colors w PMS — w DobrePrinty dostępny druk PMS na zamówienie (+30% do ceny).",
    },
    {
      type: "h2",
      id: "specyfikacja-pliku",
      text: "Specyfikacja pliku do roll-upa",
    },
    {
      type: "table",
      caption: "Specyfikacja techniczna pliku do roll-upa 85×200 cm",
      headers: ["Parametr", "Wartość", "Uwagi"],
      rows: [
        [
          "Format pliku",
          "PDF/X-4 lub TIFF CMYK",
          "Spłaszczona przezroczystość",
        ],
        ["Skala", "1:1 (rzeczywista)", "Nie skalowane!"],
        ["Wymiary z bleedem", "86 × 203,5 cm", "5 mm bleedu bok + 25 mm dół"],
        [
          "Rozdzielczość",
          "100-150 dpi",
          "Wystarczająca dla dystansu oglądania",
        ],
        ["Przestrzeń barwna", "CMYK", "Profil ISO Coated v2 (ECI)"],
        ["Czcionki", "Krzywe lub osadzone", "Bezpieczniejsze krzywe"],
        [
          "Czarny",
          "K100 dla tekstu, rich black dla teł",
          "C40 M30 Y30 K100 dla teł",
        ],
        ["TIL", "max 300%", "Nie przekraczaj"],
        ["Wielkość pliku", "50-200 MB", "Dla 85 × 200 cm w 150 dpi"],
      ],
    },
    {
      type: "h2",
      id: "blockout-vs-zwykly-papier",
      text: "Blockout vs zwykły papier — wybór materiału",
    },
    {
      type: "p",
      text: "Blockout to specjalny materiał z czarnym rdzeniem pomiędzy dwoma warstwami białymi. Skutek: druk z przedniej strony nie prześwituje na tylną stronę, nawet pod silnym oświetleniem stoiskowym. To kluczowe dla roll-upów oglądanych w jasnych halach targowych.",
    },
    {
      type: "p",
      text: "Standardem rynkowym jest czasem tańszy „matowy papier 150-200g” bez czarnego rdzenia — prześwituje przy silnym oświetleniu i wygląda nieprofesjonalnie. W DobrePrinty zawsze używamy blockout 200g — bez kompromisu. Sprawdzaj specyfikację u innych dostawców, jeśli porównujesz oferty.",
    },
    {
      type: "h2",
      id: "stelaze",
      text: "Stelaże — co wybrać",
    },
    {
      type: "p",
      text: "Stelaż aluminiowy srebrny to standard — lekki, sztywny, mechanizm zwijania wytrzyma 5-7 lat regularnego użytkowania. Czarny stelaż to opcja designerska (+10% do ceny). Stelaż premium z podświetleniem LED to opcja konferencyjna (+150% do ceny — daje równomierne podświetlenie grafiki w słabym świetle).",
    },
    {
      type: "p",
      text: "Stelaże ciężkie (z większą podstawą) sprawdzają się outdoor lub w przeciągach. Stelaże standardowe ważą 2-3 kg, ciężkie 5-8 kg. Dla wynajmu na stoisku targowym — ciężki, bo nikt ich nie podnosi. Dla regularnego transportu do różnych miast — standard.",
    },
    {
      type: "h2",
      id: "najczestsze-bledy",
      text: "Najczęstsze błędy w projektowaniu roll-upów",
    },
    {
      type: "list",
      items: [
        "Tekst za mały (poniżej 24 pt) — nieczytelny z dystansu",
        "Zbyt dużo informacji — roll-up ma jeden cel komunikacyjny, nie pięć",
        "Logo zbyt małe lub w dolnym pasku (chowającym się w stelażu)",
        "Brak CTA — klient widzi, ale nie wie, co zrobić",
        "[Plik w RGB](/blog/cmyk-vs-rgb) — kolory wyjdą inaczej niż na monitorze",
        "Plik w skali 1:2 lub 1:4 — drukarnia może źle zinterpretować",
        "Brak bleedu — białe paski na bokach",
        "Stelaż za lekki na windową halę targową — chwieje się",
        "Brak pokrowca transportowego — uszkodzenia w bagażniku",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Test projektowania: wydrukuj roll-up w formacie A4 (4× mniejszy niż 85×200) i postaw na podłodze. Cofnij się 3 metry. Czytelny? Wszystko zrozumiałe w 5 sekund? Jeśli tak — projekt gotowy. Jeśli nie — popraw hierarchię i powiększ fonty.",
    },
    {
      type: "faq",
      items: [
        {
          q: "Ile waży gotowy roll-up?",
          a: "Standardowy roll-up 85×200 cm z aluminiowym stelażem i blockoutem waży 3,5-4 kg z pokrowcem transportowym. 100×200 cm: 4,5-5 kg. 120×200 cm: 5,5-6 kg. Pokrowiec ma pasek na ramię — łatwo nieść w bagażu samochodowym lub jako bagaż podręczny w samolocie (po sprawdzeniu wymiarów przy linii lotniczej).",
        },
        {
          q: "Czy roll-up można używać na zewnątrz?",
          a: "W ograniczonym zakresie. Przy spokojnej pogodzie (bez wiatru >15 km/h, bez deszczu) — tak, przy wejściach do budynków i na zadaszonych stoiskach. Na otwartym powietrzu w wietrze — ryzyko przewrócenia. Dla outdoor polecamy ciężki stelaż (5+ kg) lub specjalne roll-upy outdoor z wodoodpornym blockoutem.",
        },
        {
          q: "Jak długo wytrzymuje druk roll-upa?",
          a: "Druk ekosolwentowy (standardowy) wytrzymuje 12+ miesięcy intensywnego użytkowania (5+ dni targów rocznie) pod oświetleniem konferencyjnym. Na słońcu UV (jeśli używasz outdoor) — 6-12 miesięcy bez wyblaknienia. Po tym czasie kolory zaczynają tracić intensywność, ale roll-up nadal jest używalny. Grafikę można wymienić w istniejącym stelażu za 30-40% ceny nowego zestawu.",
        },
        {
          q: "Czy mogę zaprojektować roll-up w Canva?",
          a: "Tak, ale z ograniczeniami. Canva pracuje w RGB i ma ograniczone wsparcie dla bleedu wielkoformatowego. Lepiej projektować w Adobe Illustrator (wektory + ostre fonty), Affinity Designer (tańsza alternatywa) lub Photoshop (jeśli projekt jest zdjęcie-centryczny). W Canva Pro można wyeksportować 85×200 cm w PDF, ale jakość finalna może być gorsza niż w Illustratorze.",
        },
        {
          q: "Ile czasu zajmuje produkcja roll-upa?",
          a: "Standardowo 24-48 h od potwierdzenia pliku. Express 12 h dostępny za dopłatą 50% — plik do 12:00, gotowy roll-up tego samego dnia po 19:00. Dla nakładów 10+ roll-upów (np. dla zespołu sprzedażowego): 48-72 h ze względu na większą organizację druku ekosolwentowego.",
        },
        {
          q: "Czy można drukować dwustronnie?",
          a: "Standardowo nie — blockout jest jednostronny. Dla efektu „dwustronnego” używamy dwóch roll-upów postawionych plecami do siebie albo specjalnego stelaża dwustronnego z dwoma warstwami blockoutu (ok. 2× cena standardu). Druga opcja jest praktyczna dla roll-upów stojących na środku stoiska (widoczne z dwóch stron) — ale rzadko zamawiana.",
        },
        {
          q: "Jak transportować roll-up samolotem?",
          a: "Pokrowiec roll-upa standardowo mieści się w samolotowym bagażu rejestrowanym (długość 120-130 cm). Niektóre linie lotnicze (Ryanair, Wizz Air) akceptują go jako bagaż podręczny, ale sprawdzaj wymiary u linii przed lotem. Dla bezpieczeństwa: zarejestrowany bagaż, dodatkowe owinięcie folią pęcherzykową (kupisz w DobrePrinty za 30 zł), wskazanie „Fragile” na pokrowcu.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Zamów roll-up online",
      body: "W konfiguratorze DobrePrinty wybierz format (85, 100, 120 cm), wgraj plik PDF, gotowy roll-up dostarczamy w 24-48 h z stelażem aluminiowym i pokrowcem transportowym w komplecie.",
      href: "/produkty/roll-up",
      label: "Skonfiguruj roll-up →",
    },
  ],
};
