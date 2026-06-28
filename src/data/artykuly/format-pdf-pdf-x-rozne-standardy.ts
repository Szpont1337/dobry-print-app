import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "format-pdf-pdf-x-rozne-standardy",
  title: "PDF/X-1a vs PDF/X-4 vs PDF/A — który standard pre-press wybrać",
  excerpt:
    "Różnice między standardami PDF do druku. Który wybrać do offsetu, do cyfry, do archiwum. Porównanie PDF/X-1a, PDF/X-4, PDF/A z praktycznymi wskazówkami.",
  category: "pliki-do-druku",
  tags: ["PDF", "PDF/X", "pre-press", "standardy", "przygotowanie pliku"],
  publishedAt: "2026-05-26",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["ulotki", "plakaty", "wizytowki"],
  sections: [
    {
      type: "p",
      text: "PDF to nie jeden format — to rodzina standardów, z których każdy ma inne przeznaczenie. PDF/X-1a jest bezpiecznym standardem do offsetu, PDF/X-4 obsługuje przezroczystości i profile ICC, a PDF/A służy do archiwizacji dokumentów. Wybór złego standardu może skutkować zmienionymi kolorami, spłaszczonymi efektami lub odrzuceniem pliku przez drukarnię. Ten poradnik wyjaśnia różnice i pomaga wybrać właściwy standard.",
    },
    {
      type: "h2",
      id: "po-co-standardy-pdf",
      text: "Po co istnieją standardy PDF do druku",
    },
    {
      type: "p",
      text: "Zwykły PDF (eksport domyślny z Worda, Photoshopa, Canvy) może zawierać elementy, które psują druk: kolory [RGB zamiast CMYK](/blog/cmyk-vs-rgb), brakujące fonty, przezroczystości nieobsługiwane przez RIP drukarki, osadzone multimedia. Standardy PDF/X eliminują te problemy: wymuszają CMYK, osadzanie fontów, rozdzielczość minimum 300 dpi i inne reguły bezpiecznego druku.",
    },
    {
      type: "h2",
      id: "pdf-x-1a",
      text: "PDF/X-1a — bezpieczny standard do offsetu",
    },
    {
      type: "p",
      text: "PDF/X-1a (ISO 15930-1) to najstarszy i najbezpieczniejszy standard pre-press. Wymaga: wszystkich kolorów w CMYK lub kolorach spotowych (Pantone), wszystkich fontów osadzonych, braku przezroczystości (spłaszczone przed eksportem), braku elementów RGB, braku warstw, braku multimediów.",
    },
    {
      type: "list",
      items: [
        "Kolory: tylko CMYK + spot (Pantone). Brak RGB, brak Lab",
        "Fonty: wszystkie osadzone (embedded)",
        "Przezroczystości: brak — muszą być spłaszczone (flattened) przed eksportem",
        "Profile ICC: jeden profil docelowy (output intent)",
        "Warstwy: brak — plik jest płaski",
      ],
    },
    {
      type: "p",
      text: "Zalety: maksymalna kompatybilność — każdy RIP, każda drukarnia, każda maszyna go obsłuży. Brak niespodzianek z przezroczystościami. Wady: brak obsługi przezroczystości oznacza, że cienie, gradienty z przezroczystością i efekty blend muszą być spłaszczone — co czasem zmienia ich wygląd.",
    },
    {
      type: "h2",
      id: "pdf-x-4",
      text: "PDF/X-4 — nowoczesny standard z przezroczystościami",
    },
    {
      type: "p",
      text: "PDF/X-4 (ISO 15930-7) to nowszy standard, który obsługuje przezroczystości natywnie (bez spłaszczania), profile ICC, przestrzenie kolorów Lab i CMYK, warstwy. Plik zachowuje oryginalną jakość efektów: cienie, gradienty, blend modes wyglądają dokładnie jak w projekcie.",
    },
    {
      type: "list",
      items: [
        "Kolory: CMYK, spot (Pantone), Lab. Brak RGB (jak w X-1a)",
        "Fonty: wszystkie osadzone",
        "Przezroczystości: tak — natywne, bez spłaszczania",
        "Profile ICC: wieloprofilowość (różne profile dla różnych obiektów)",
        "Warstwy: obsługiwane (opcjonalnie)",
      ],
    },
    {
      type: "p",
      text: "Zalety: lepsza jakość efektów, mniejszy rozmiar pliku (nie trzeba rasteryzować przezroczystości), bliższe odwzorowanie projektu. Wady: starsze RIPy i maszyny mogą nie obsługiwać PDF/X-4 poprawnie. Przed wysłaniem sprawdź, czy drukarnia akceptuje X-4.",
    },
    {
      type: "h2",
      id: "pdf-a",
      text: "PDF/A — archiwizacja, nie druk",
    },
    {
      type: "p",
      text: "PDF/A (ISO 19005) to standard do długoterminowej archiwizacji dokumentów — nie do druku. Wymusza osadzenie wszystkich fontów i profili kolorów, zabrania elementów zależnych od zewnętrznych zasobów (np. linków do stron www). Stosowany w dokumentacji prawnej, podatkowej, urzędowej.",
    },
    {
      type: "p",
      text: "Nie wysyłaj PDF/A do drukarni — format nie gwarantuje CMYK, nie wymusza spadów, nie kontroluje rozdzielczości. PDF/A to standard archiwów, nie poligrafii. Do druku zawsze PDF/X-1a lub PDF/X-4.",
    },
    {
      type: "h2",
      id: "porownanie",
      text: "Porównanie standardów PDF",
    },
    {
      type: "table",
      caption: "PDF/X-1a vs PDF/X-4 vs PDF/A — porównanie",
      headers: ["Cecha", "PDF/X-1a", "PDF/X-4", "PDF/A"],
      rows: [
        [
          "Przeznaczenie",
          "Druk offset/cyfrowy",
          "Druk offset/cyfrowy",
          "Archiwizacja dokumentów",
        ],
        ["Kolory", "CMYK + spot", "CMYK + spot + Lab", "Dowolne (RGB, CMYK)"],
        ["Przezroczystości", "Nie (spłaszczone)", "Tak (natywne)", "Tak"],
        ["Fonty osadzone", "Wymagane", "Wymagane", "Wymagane"],
        ["Warstwy", "Nie", "Tak", "Ograniczone"],
        ["Profile ICC", "Jeden (output intent)", "Wiele", "Wymagane"],
        [
          "Kompatybilność",
          "Uniwersalna",
          "Nowoczesne RIPy",
          "Przeglądarki PDF",
        ],
        [
          "Rozmiar pliku",
          "Większy (rasteryzacja)",
          "Mniejszy",
          "Zależy od treści",
        ],
      ],
    },
    {
      type: "h2",
      id: "ktory-wybrac",
      text: "Który standard wybrać — decyzja w 3 krokach",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Twój projekt ma przezroczystości (cienie, gradienty z opacity, blend modes)? → PDF/X-4 (zachowa je bez spłaszczania)",
        "Twój projekt jest prosty (CMYK, bez przezroczystości, bez efektów)? → PDF/X-1a (maksymalna kompatybilność)",
        "Nie wiesz, co ma Twój projekt? → Eksportuj PDF/X-4. Jeśli drukarnia poprosi o X-1a, zmień eksport",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Domyślna rada: eksportuj PDF/X-4. To nowszy standard, obsługuje wszystko co X-1a plus przezroczystości. Jeśli drukarnia jest bardzo tradycyjna (stary RIP offsetowy), poprosi o X-1a — wtedy zmień ustawienia eksportu. W 2026 roku większość drukarni obsługuje X-4 bez problemów.",
    },
    {
      type: "h2",
      id: "jak-eksportowac",
      text: "Jak eksportować PDF/X z popularnych programów",
    },
    {
      type: "list",
      items: [
        "Adobe InDesign: File → Export → Adobe PDF (Print). Preset: PDF/X-1a:2001 lub PDF/X-4:2008. Zaznacz: Crop Marks, Bleed 3mm, Embed All Fonts",
        "Adobe Illustrator: File → Save As → Adobe PDF. Preset: PDF/X-1a lub X-4. Zaznacz: Preserve Illustrator Editing Capabilities (opcjonalnie)",
        "Adobe Photoshop: File → Save As → Photoshop PDF. Standard: PDF/X-1a lub X-4. Upewnij się: CMYK mode, 300 dpi, Flatten Image przed eksportem do X-1a",
        "CorelDRAW: File → Publish to PDF. Preset: PDF/X-1a lub X-4. Zaznacz: Embed Fonts, Convert Spot Colors (jeśli nie drukujesz Pantone)",
        "Canva: Export → PDF Print (300 dpi, CMYK). Canva eksportuje PDF generyczny — nie PDF/X. Dla krytycznych projektów otwórz ten PDF w Acrobat Pro i konwertuj: Preflight → Convert to PDF/X-4",
      ],
    },
    {
      type: "h2",
      id: "preflight",
      text: "Preflight — jak sprawdzić plik przed wysłaniem",
    },
    {
      type: "p",
      text: "Preflight to kontrola techniczna [pliku PDF przed drukiem](/blog/jak-przygotowac-pdf-do-druku). Adobe Acrobat Pro ma wbudowany Preflight (Print Production → Preflight): wybierz profil PDF/X-1a lub X-4, uruchom sprawdzanie. Acrobat wyświetli listę błędów: brakujące fonty, kolory RGB, rozdzielczość poniżej 150 dpi, brak [spadów](/blog/jak-zrobic-bleed).",
    },
    {
      type: "p",
      text: "Darmowa alternatywa: pdfToolbox Online (callas.de) — wgrywasz PDF, wybierasz profil, dostajesz raport. Większość drukarni też robi preflight po otrzymaniu pliku i informuje o błędach — ale lepiej sprawdzić samodzielnie przed wysłaniem, żeby uniknąć opóźnień.",
    },
    {
      type: "faq",
      items: [
        {
          q: "Co się stanie, jeśli wyślę zwykły PDF zamiast PDF/X?",
          a: "Drukarnia przejdzie plik przez preflight i wyłapie błędy: kolory RGB, brakujące fonty, brak spadów. W najlepszym wypadku — poprawią automatycznie (konwersja RGB→CMYK). W najgorszym — kolory się zmienią (żywy RGB niebieski stanie się przygaszony w CMYK), a Ty zobaczysz to dopiero na wydruku.",
        },
        {
          q: "Czy PDF/X-4 jest zawsze lepszy od PDF/X-1a?",
          a: "Nie zawsze. PDF/X-1a jest bezpieczniejszy dla starszych maszyn i RIPów. Jeśli Twój projekt nie ma przezroczystości — X-1a jest prostsza i bardziej przewidywalny. X-4 jest lepszy, gdy masz efekty graficzne (cienie, opacity, blend modes) i chcesz je zachować bez spłaszczania.",
        },
        {
          q: "Canva eksportuje do PDF/X?",
          a: "Nie bezpośrednio. Canva eksportuje PDF Print w 300 dpi z CMYK, ale nie w standardzie PDF/X. Dla prostych projektów (ulotki bez efektów) to zazwyczaj wystarcza — drukarnia przejdzie przez preflight i ewentualnie poprawi. Dla projektów z przezroczystościami — otwórz PDF z Canvy w Acrobat Pro i konwertuj do PDF/X-4.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Wgraj PDF i zamów druk",
      body: "DobrePrinty akceptuje PDF/X-1a, PDF/X-4 i zwykłe PDF z CMYK. Nasz preflight automatycznie sprawdzi plik i powiadomi o ewentualnych problemach.",
      href: "/produkty/ulotki",
      label: "Wgraj plik i zamów →",
    },
  ],
};
