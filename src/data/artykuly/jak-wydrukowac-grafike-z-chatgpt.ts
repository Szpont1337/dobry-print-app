import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "jak-wydrukowac-grafike-z-chatgpt",
  title: "Jak wydrukować grafikę z ChatGPT: od promptu do wizytówki w paczce",
  excerpt:
    "Obraz z ChatGPT, Gemini czy Midjourney nie nadaje się do druku prosto z czatu: ma 1024 px, RGB i zero spadów. Pokazujemy, jak w kilka minut zamienić go w plik do druku — ręcznie albo automatycznie przez serwer MCP DobrePrinty, który podaje asystentowi wymiary, spady i link do zamówienia.",
  category: "poradniki",
  tags: ["ChatGPT", "AI", "MCP", "wizytówki", "pliki do druku", "spady", "300 dpi"],
  publishedAt: "2026-09-28",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "HowTo",
  relatedProducts: ["wizytowki", "ulotki", "plakaty"],
  sections: [
    {
      type: "p",
      text: "Coraz więcej projektów wizytówek, ulotek i plakatów powstaje w ChatGPT, Gemini albo Midjourney. Problem zaczyna się na etapie druku: obraz z czatu ma zwykle 1024 × 1024 albo 1536 × 1024 pikseli, jest w RGB, nie ma spadów, a tekst bywa zniekształcony. Wydruk z takiego pliku wychodzi rozmazany, z białymi paskami na krawędziach i przyciemnionymi kolorami. Poniżej dwa sposoby na porządny plik: automatyczny (asystent sam pilnuje specyfikacji przez MCP) i ręczny.",
    },
    {
      type: "h2",
      id: "dlaczego-obraz-z-ai-nie-nadaje-sie-do-druku",
      text: "Dlaczego obraz z AI nie nadaje się do druku prosto z czatu",
    },
    {
      type: "list",
      items: [
        "Rozdzielczość: wizytówka 85 × 55 mm ze spadami potrzebuje 1075 × 720 px przy 300 dpi, plakat A2 już 5031 × 7087 px. Generator daje 1024–1536 px, więc na plakacie to ok. 65 dpi.",
        "Proporcje: model generuje kwadrat albo 3:2. Wizytówka ze spadami to 91:61, ulotka DL 106:216 — obraz trzeba wykadrować, a przy kadrowaniu znika część projektu.",
        "Spady: drukarnia tnie arkusz z tolerancją do 1 mm. Bez 3 mm zapasu tła na każdym boku zostają białe paski.",
        "Strefa bezpieczna: tekst przy samej krawędzi zostanie obcięty. Minimum 3 mm od linii cięcia, lepiej 5 mm.",
        "Kolory: obraz RGB z neonami po konwersji do CMYK ciemnieje. Nasycony fiolet, cyjan i zieleń tracą najwięcej.",
        "Tekst: generatory obrazów mylą litery, zwłaszcza polskie znaki. Każdy napis trzeba sprawdzić literka po literce albo nanieść osobno w edytorze.",
      ],
    },
    {
      type: "h2",
      id: "sposob-automatyczny-mcp",
      text: "Sposób 1: asystent pilnuje specyfikacji sam (serwer MCP DobrePrinty)",
    },
    {
      type: "p",
      text: "DobrePrinty udostępnia bezpłatny serwer MCP (Model Context Protocol) pod adresem www.dobreprinty.pl/api/mcp. Po podłączeniu go do ChatGPT lub Claude asystent dostaje sześć narzędzi: katalog produktów, specyfikację pliku do druku, prompt do grafiki, prompt do podglądu wydruku, wycenę i link do zamówienia. Nie trzeba konta ani klucza API.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Podłącz serwer: w ChatGPT Ustawienia → Aplikacje i konektory → Tryb dewelopera → nowy konektor z adresem www.dobreprinty.pl/api/mcp; w Claude Ustawienia → Konektory → Dodaj własny konektor. Instrukcja z przyciskami: www.dobreprinty.pl/mcp.",
        "Napisz, co drukujesz: „Zaprojektuj wizytówkę dla kancelarii Jan Kowalski, tel. 600 000 000, 500 sztuk”. Asystent pobierze specyfikację (85 × 55 mm + 3 mm spadu, 1075 × 720 px, CMYK) i zbuduje prompt, który trzyma tekst w strefie bezpiecznej.",
        "Sprawdź wygenerowaną grafikę: pisownię, telefon, adres www. Poproś o poprawki, dopóki nie jest idealnie.",
        "Poproś o podgląd: narzędzie mockup_prompt generuje fotorealistyczny obraz wizytówek na kartonie 350 g, plakatu na ścianie albo roll-upu w lobby — z Twoim projektem.",
        "Poproś o cenę i link. Otwierasz link, wgrywasz grafikę, podajesz adres i płacisz. Produkcja 24–48 h, wysyłka kurierem.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Asystent nie składa zamówienia sam i nie widzi Twoich danych. Link prowadzi do koszyka z gotową konfiguracją — nakład, format i opcje są ustawione, Ty tylko wgrywasz plik i płacisz.",
    },
    {
      type: "h2",
      id: "sposob-reczny",
      text: "Sposób 2: ręcznie, bez podłączania niczego",
    },
    {
      type: "p",
      text: "Jeśli nie chcesz konfigurować konektora, możesz podać asystentowi specyfikację samodzielnie. Poniżej wymiary dokumentu ze spadami dla najpopularniejszych produktów. Wpisz je w prompt razem z prośbą o pełnokadrową kompozycję i tekst minimum 6 mm od krawędzi.",
    },
    {
      type: "table",
      caption: "Wymiary dokumentu ze spadami 3 mm i rozmiar w pikselach przy 300 dpi",
      headers: [
        "Produkt",
        "Format finalny",
        "Dokument ze spadami",
        "Piksele @ 300 dpi",
        "Proporcja",
      ],
      rows: [
        ["Wizytówka", "85 × 55 mm", "91 × 61 mm", "1075 × 720 px", "1,49"],
        ["Wizytówka europejska", "90 × 50 mm", "96 × 56 mm", "1134 × 661 px", "1,71"],
        ["Ulotka DL", "100 × 210 mm", "106 × 216 mm", "1252 × 2551 px", "0,49"],
        ["Ulotka A5", "148 × 210 mm", "154 × 216 mm", "1819 × 2551 px", "0,71"],
        ["Ulotka A4", "210 × 297 mm", "216 × 303 mm", "2551 × 3579 px", "0,71"],
        ["Plakat A3", "297 × 420 mm", "303 × 426 mm", "3579 × 5031 px", "0,71"],
        ["Plakat A2", "420 × 594 mm", "426 × 600 mm", "5031 × 7087 px", "0,71"],
      ],
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Wygeneruj obraz w najbliższej proporcji (dla wizytówki 3:2, dla ulotek i plakatów pionowe 2:3) i w najwyższej dostępnej rozdzielczości.",
        "Powiększ go do rozmiaru z tabeli narzędziem do upscalingu (wbudowanym w ChatGPT albo osobnym). Dla plakatów to obowiązkowe.",
        "Wykadruj do proporcji dokumentu ze spadami w Canvie, Photopea albo Affinity. Upewnij się, że tło dochodzi do samej krawędzi.",
        "Nanieś teksty osobno w edytorze, wektorowo — to najpewniejszy sposób na bezbłędną pisownię i ostre litery.",
        "Wyeksportuj do PDF w CMYK, 300 dpi, ze spadami. Jeśli edytor nie umie, wgraj PNG w pełnym rozmiarze — nasz preflight sprawdzi plik przed drukiem.",
      ],
    },
    {
      type: "h2",
      id: "koszulki-i-torby",
      text: "Grafika z AI na koszulkę lub torbę",
    },
    {
      type: "p",
      text: "Nadruk DTG na koszulce i nadruk na torbie nie mają spadów — liczy się pole nadruku, ok. A4 (21 × 29 cm). Poproś asystenta o grafikę bez tła (PNG z przezroczystością) i pamiętaj, że białe elementy zlewają się z białą koszulką, a na torbie z naturalnej bawełny jasne kolory są mniej nasycone. W konfiguratorze zobaczysz podgląd na produkcie i dopasujesz rozmiar nadruku suwakiem.",
    },
    {
      type: "faq",
      items: [
        {
          q: "Czy ChatGPT może zamówić druk za mnie?",
          a: "Nie. Może przygotować grafikę, podać cenę i link do zamówienia przez serwer MCP DobrePrinty, ale plik wgrywasz i płacisz sam na stronie. To celowe — asystent nie ma dostępu do Twoich danych.",
        },
        {
          q: "Jaki plik wgrać do drukarni: PNG czy PDF?",
          a: "Najlepiej PDF z tekstem wektorowym i CMYK. Jeśli masz tylko obraz z generatora, wgraj PNG albo JPG w pełnym rozmiarze z tabeli — przy 300 dpi wydruk będzie ostry. Preflight DobrePrinty sprawdzi plik i odezwiemy się, jeśli coś trzeba poprawić.",
        },
        {
          q: "Czy da się wydrukować obraz 1024 × 1024 px?",
          a: "Na wizytówce tak (to ok. 285 dpi), na ulotce A5 wyjdzie miękko (ok. 170 dpi), na plakacie nie (poniżej 70 dpi). Zawsze powiększaj do rozmiaru z tabeli.",
        },
        {
          q: "Czy MCP DobrePrinty działa z Gemini, Cursorem albo Perplexity?",
          a: "Działa z każdym klientem obsługującym Model Context Protocol: ChatGPT, Claude, Claude Code, Cursor, VS Code, Windsurf, Zed. Lista rośnie — sprawdź w swoim narzędziu opcję „konektory” albo „MCP servers”.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Podłącz DobrePrinty do ChatGPT lub Claude",
      body: "Darmowy serwer MCP: specyfikacja, grafika, podgląd, cena i link do zamówienia prosto z czatu. Instrukcja z przyciskami do skopiowania adresu.",
      href: "/mcp",
      label: "Zobacz, jak podłączyć",
    },
  ],
};
