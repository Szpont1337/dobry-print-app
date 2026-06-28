import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "logo-do-druku-zasady",
  title: "Logo do druku — jak je przygotować, formaty plików",
  excerpt:
    "Logo w druku: wektory, rozdzielczość, kolory CMYK, minimum rozmiaru, white space. Jak uniknąć pikselizacji i błędów kolorystycznych.",
  category: "pliki-do-druku",
  tags: ["logo", "branding", "wektory", "przygotowanie pliku"],
  publishedAt: "2026-05-26",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["wizytowki", "papier-firmowy", "ulotki"],
  sections: [
    {
      type: "p",
      text: "Logo to najczęściej drukowany element identyfikacji wizualnej — pojawia się na [wizytówkach](/produkty/wizytowki), ulotkach, [papierze firmowym](/produkty/papier-firmowy), roll-upach, banerach. Każde z tych zastosowań wymaga innego rozmiaru, ale jedno jest wspólne: logo musi być w formacie wektorowym, w kolorach CMYK, z odpowiednim polem ochronnym. W tym poradniku tłumaczymy, jak przygotować logo do druku, żeby wyglądało ostro w każdym formacie.",
    },
    {
      type: "h2",
      id: "wektor-vs-raster",
      text: "Wektor vs raster — dlaczego wektor jest obowiązkowy",
    },
    {
      type: "p",
      text: "Logo wektorowe (formaty AI, EPS, SVG, PDF) jest zbudowane z krzywych matematycznych — skaluje się do dowolnego rozmiaru bez utraty jakości. Logo rastrowe (JPG, PNG) składa się z pikseli — przy powiększeniu widać kwadraciki (pikselizację). Logo 500×500 px wygląda dobrze na wizytówce, ale na roll-upie 85×200 cm jest nieostre.",
    },
    {
      type: "table",
      caption: "Wektor vs raster — porównanie dla logo",
      headers: ["Cecha", "Wektor (AI, EPS, SVG)", "Raster (JPG, PNG)"],
      rows: [
        [
          "Skalowalność",
          "Nieskończona — zero utraty jakości",
          "Ograniczona rozmiarem w px",
        ],
        [
          "Edytowalność",
          "Kolory, kształty, tekst — wszystko edytowalne",
          "Tylko retusz pikselowy",
        ],
        [
          "Rozmiar pliku",
          "Mały (kilka KB-MB)",
          "Duży przy wysokiej rozdzielczości",
        ],
        [
          "Zastosowanie w druku",
          "Każdy format (od wizytówki po billboard)",
          "Tylko do rozmiaru, na który pozwala rozdzielczość",
        ],
        ["Przezroczystość", "Natywna", "Tylko PNG (JPG nie obsługuje)"],
      ],
    },
    {
      type: "callout",
      variant: "warn",
      text: "Jeśli masz logo tylko w formacie JPG lub PNG — zleć wektoryzację. Profesjonalna wektoryzacja prostego logo kosztuje 100-300 zł. Automatyczne narzędzia (np. Image Trace w Illustratorze) dają przybliżony wynik, ale tracą detale i krzywizny. Dla logo z dużą ilością detali lub gradientów — tylko ręczna wektoryzacja.",
    },
    {
      type: "h2",
      id: "formaty-plikow",
      text: "Formaty plików logo — który do czego",
    },
    {
      type: "table",
      caption: "Formaty plików logo i ich zastosowania",
      headers: ["Format", "Typ", "Zastosowanie", "Uwagi"],
      rows: [
        [
          "AI (Adobe Illustrator)",
          "Wektor",
          "Źródło edytowalne, do drukarni",
          "Wymaga Illustratora do edycji",
        ],
        [
          "EPS",
          "Wektor",
          "Drukarnia, reklama wielkoformatowa",
          "Uniwersalny, otwiera się w większości programów DTP",
        ],
        [
          "PDF (wektorowy)",
          "Wektor",
          "Drukarnia, dokumenty, prezentacje",
          "Najlepszy do przekazania drukarni",
        ],
        [
          "SVG",
          "Wektor",
          "Strony www, aplikacje",
          "Nie do druku (brak profilu CMYK)",
        ],
        [
          "PNG (300 dpi)",
          "Raster",
          "Prezentacje, dokumenty biurowe",
          "Z przezroczystym tłem, min. 2000×2000 px",
        ],
        [
          "JPG",
          "Raster",
          "Social media, miniaturki",
          "Brak przezroczystości, kompresja stratna",
        ],
      ],
    },
    {
      type: "h2",
      id: "cmyk-vs-rgb-logo",
      text: "Kolory logo: CMYK vs RGB vs Pantone",
    },
    {
      type: "p",
      text: "Logo projektowane na ekranie jest w RGB — druk wymaga CMYK. [Konwersja RGB→CMYK zmienia odcienie](/blog/cmyk-vs-rgb): żywy niebieski RGB staje się przygaszony w CMYK, neonowa zieleń traci intensywność. Dlatego brand book powinien definiować kolory logo w trzech systemach: RGB (ekran), CMYK (druk standardowy), Pantone (druk spotowy).",
    },
    {
      type: "list",
      items: [
        "RGB — do ekranów (strona www, social media, prezentacje). Gamut szeroki, kolory żywe",
        "CMYK — do druku czterokolorowego (ulotki, broszury, plakaty). Gamut węższy, kolory mogą być mniej nasycone",
        "Pantone (PMS) — kolory spotowe mieszane z gotowych pigmentów. Najdokładniejsze odwzorowanie. Droższy druk (dodatkowa farba), ale kolor jest identyczny w każdym nakładzie",
      ],
    },
    {
      type: "p",
      text: "Jeśli Twoje logo ma kolor, który wygląda inaczej po konwersji na CMYK (np. intensywna pomarańcz, fiolet, neonowa zieleń) — rozważ druk Pantone dla materiałów wizerunkowych (wizytówki, papier firmowy). Dla materiałów masowych (ulotki, plakaty) CMYK jest wystarczający i tańszy.",
    },
    {
      type: "h2",
      id: "pole-ochronne",
      text: "Pole ochronne (clear space) — oddech dla logo",
    },
    {
      type: "p",
      text: "Pole ochronne to minimalny margines wokół logo, w którym nie umieszczamy żadnych innych elementów (tekstu, zdjęć, ramek). Standard: szerokość pola ochronnego = wysokość symbolu w logo lub szerokość litery z logotypu. Pole ochronne zapewnia, że logo jest czytelne i nie zlewa się z otoczeniem.",
    },
    {
      type: "p",
      text: "Na wizytówce (85×55 mm) pole ochronne 3-5 mm wokół logo to minimum. Na plakacie A2 — 15-20 mm. Na roll-upie — 40-60 mm. Zasada: im większy format, tym większe pole ochronne — proporcjonalnie do rozmiaru logo.",
    },
    {
      type: "h2",
      id: "minimalny-rozmiar",
      text: "Minimalny rozmiar logo w druku",
    },
    {
      type: "p",
      text: "Każde logo ma próg czytelności — rozmiar, poniżej którego detale się zlewają. Prosty logotyp (np. Google, FedEx) jest czytelny nawet w 8 mm szerokości. Logo z drobnym symbolem (np. Starbucks, Lamborghini) wymaga minimum 15-20 mm. Brand book powinien definiować minimalny rozmiar logo w mm dla druku i w px dla ekranu.",
    },
    {
      type: "table",
      caption: "Orientacyjne minimalne rozmiary logo w druku",
      headers: ["Typ logo", "Min. szerokość", "Przykład"],
      rows: [
        ["Logotyp (sam tekst)", "10-15 mm", "Google, Coca-Cola, Visa"],
        [
          "Symbol + logotyp (horizontal)",
          "20-25 mm",
          "Adidas, Nike + napis, Spotify",
        ],
        [
          "Symbol ze szczegółami",
          "15-20 mm (sam symbol)",
          "Starbucks, Lamborghini",
        ],
        ["Monogram (1-2 litery)", "8-10 mm", "LV, CC (Chanel), HP"],
      ],
    },
    {
      type: "h2",
      id: "wersje-kolorystyczne",
      text: "Wersje kolorystyczne logo — co przygotować",
    },
    {
      type: "list",
      items: [
        "Wersja pełnokolorowa — CMYK i RGB, do standardowych zastosowań",
        "Wersja monochromatyczna (czarna) — do druku jednokolorowego, faksów, pieczątek",
        "Wersja biała (negatyw) — do ciemnych teł, zdjęć, banerów",
        "Wersja w skali szarości — do druku czarno-białego (gazety, formularze)",
        "Wersja z polem ochronnym — zaznaczone pole ochronne dla zewnętrznych podwykonawców",
      ],
    },
    {
      type: "faq",
      items: [
        {
          q: "Mam logo tylko w PNG — czy mogę je wydrukować?",
          a: "Tak, ale z ograniczeniami. PNG o rozdzielczości 300 dpi w docelowym rozmiarze wydruku jest OK. Na wizytówce (logo ~30 mm) potrzebujesz PNG co najmniej 355×355 px. Na roll-upie (logo ~300 mm) potrzebujesz 3543×3543 px. Jeśli PNG jest za mały — pikselizacja będzie widoczna. Lepsze rozwiązanie: wektoryzacja logo.",
        },
        {
          q: "Czy SVG nadaje się do druku?",
          a: "SVG to format wektorowy, ale webowy — nie zawiera profilu kolorów CMYK. Do druku lepiej użyć PDF wektorowego lub EPS. Jeśli masz tylko SVG: otwórz go w Illustratorze, zmień kolory na CMYK, eksportuj do PDF/X-4.",
        },
        {
          q: "Jak sprawdzić, czy moje logo jest wektorowe?",
          a: "Otwórz plik w Illustratorze lub inkscape i powiększ 800%. Jeśli krawędzie są gładkie — to wektor. Jeśli widać piksele — to raster. Szybki test: rozmiar pliku. Logo wektorowe (AI, EPS, SVG) waży kilka KB do kilku MB. Logo rastrowe w wysokiej rozdzielczości waży 5-50 MB.",
        },
        {
          q: "Ile kosztuje profesjonalna wektoryzacja logo?",
          a: "Proste logo (tekst + prosty symbol): 100-200 zł. Średnio skomplikowane (symbol z detalami, kilka kolorów): 200-400 zł. Bardzo szczegółowe (ilustracja, cienie, gradienty): 400-800 zł. Czas realizacji: 1-3 dni robocze. Warto — jednorazowy koszt, a wektor służy latami.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Masz logo i chcesz je wydrukować?",
      body: "Wgraj plik wektorowy (AI, EPS, PDF) lub rastrowy (PNG 300 dpi) do DobrePrinty. Nasz preflight sprawdzi rozdzielczość i kolory przed drukiem.",
      href: "/produkty/wizytowki",
      label: "Zamów druk z logo →",
    },
  ],
};
