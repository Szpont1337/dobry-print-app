import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "papier-ekologiczny-recycling",
  title: "Papier ekologiczny i recycling — kiedy warto wybrać",
  excerpt:
    "Papiery ekologiczne w druku: recycling, FSC, bezchlorowy. Cena, wygląd, branding eko. Przewodnik dla firm dbających o zrównoważony rozwój.",
  category: "papier",
  tags: [
    "ekologia",
    "recycling",
    "FSC",
    "papier ekologiczny",
    "zrównoważony rozwój",
  ],
  publishedAt: "2026-05-26",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["ulotki", "wizytowki", "papier-firmowy"],
  sections: [
    {
      type: "p",
      text: "Ekologiczny druk to nie tylko trend — dla wielu firm to element strategii ESG i oczekiwanie klientów. Papier z recyklingu, certyfikat FSC, farby na bazie roślinnej — opcji jest dużo, ale nie każda ma sens dla każdego zastosowania. W tym poradniku porównujemy papiery ekologiczne dostępne w polskich drukarniach: co naprawdę jest eko, a co to greenwashing, ile kosztuje różnica i kiedy warto ją ponieść.",
    },
    {
      type: "h2",
      id: "rodzaje-papierow-eko",
      text: "Rodzaje papierów ekologicznych",
    },
    {
      type: "table",
      caption: "Porównanie papierów ekologicznych",
      headers: [
        "Typ papieru",
        "Surowiec",
        "Wygląd",
        "Certyfikat",
        "Cena vs standard",
      ],
      rows: [
        [
          "Recycling 100%",
          "100% makulatura",
          "Szarawy, widoczne włókna",
          "Błękitny Anioł, EU Ecolabel",
          "+10-30%",
        ],
        [
          "Recycling częściowy",
          "30-70% makulatura",
          "Zbliżony do standardowego",
          "Zależy od producenta",
          "+5-15%",
        ],
        [
          "FSC Mix",
          "Drewno z certyfikowanych lasów + inne",
          "Identyczny ze standardowym",
          "FSC Mix",
          "+5-10%",
        ],
        [
          "FSC 100%",
          "100% drewno z certyfikowanych lasów",
          "Identyczny ze standardowym",
          "FSC 100%",
          "+10-20%",
        ],
        [
          "TCF (bezchlorowy)",
          "Celuloza bielona bez chloru",
          "Biały, lekko cieplejszy odcień",
          "TCF mark",
          "+5-15%",
        ],
        [
          "Papier trawiany",
          "Trawa + celuloza",
          "Zielonkawy, naturalny",
          "Brak standardu",
          "+20-40%",
        ],
        [
          "Papier bawełniany",
          "Odpady bawełniane",
          "Kremowy, grubszy",
          "Brak standardu",
          "+30-50%",
        ],
      ],
    },
    {
      type: "h2",
      id: "fsc-co-to",
      text: "Certyfikat FSC — co oznacza i czy warto",
    },
    {
      type: "p",
      text: "FSC (Forest Stewardship Council) to międzynarodowy certyfikat gwarantujący, że drewno użyte do produkcji papieru pochodzi z lasów zarządzanych zrównoważenie — z zachowaniem bioróżnorodności, praw pracowników leśnych i odtwarzania zasobów. FSC to najszerzej rozpoznawany certyfikat eko w branży papierniczej.",
    },
    {
      type: "list",
      items: [
        "FSC 100% — cały surowiec z certyfikowanych lasów. Najwyższy standard",
        "FSC Mix — mieszanka surowca certyfikowanego, recyklingowego i kontrolowanego. Najpopularniejszy",
        "FSC Recycled — 100% materiał z recyklingu. Łączy certyfikat FSC z ekologią recyklingu",
      ],
    },
    {
      type: "p",
      text: "Aby umieścić logo FSC na swoim wydruku, drukarnia musi posiadać certyfikat FSC Chain of Custody (łańcuch dostaw). Nie każda drukarnia go ma. Sprawdź przed zamówieniem — jeśli drukarnia nie ma certyfikatu, nie możesz legalnie umieścić logo FSC na materiale, nawet jeśli papier jest certyfikowany.",
    },
    {
      type: "h2",
      id: "recycling-vs-fsc",
      text: "Recycling vs FSC — co jest bardziej eko",
    },
    {
      type: "p",
      text: "Papier z recyklingu oszczędza drzewa i zmniejsza ilość odpadów na wysypiskach. Papier FSC pochodzi z nowych drzew, ale z lasów zarządzanych odpowiedzialnie — co wspiera zrównoważoną gospodarkę leśną. Oba podejścia są ekologiczne, ale w różny sposób.",
    },
    {
      type: "table",
      caption: "Recycling vs FSC — porównanie",
      headers: ["Aspekt", "Recycling 100%", "FSC 100%"],
      rows: [
        [
          "Źródło surowca",
          "Makulatura (stary papier)",
          "Nowe drzewa z certyfikowanych lasów",
        ],
        [
          "Oszczędność drzew",
          "Tak — zero nowych drzew",
          "Częściowo — las jest odtwarzany",
        ],
        ["Zużycie wody", "Mniejsze o 35-50%", "Standardowe"],
        ["Zużycie energii", "Mniejsze o 25-40%", "Standardowe"],
        [
          "Jakość wydruku",
          "Niższa — szarszy, mniej gładki",
          "Identyczna ze standardowym",
        ],
        [
          "Rozpoznawalność logo",
          "Mniejsza (różne certyfikaty)",
          "Wysoka (logo FSC znane globalnie)",
        ],
      ],
    },
    {
      type: "h2",
      id: "jakosc-wydruku",
      text: "Jak papier ekologiczny wpływa na jakość wydruku",
    },
    {
      type: "p",
      text: "Papier recycling 100% ma szarawy odcień i widoczną teksturę włókien — kolory są mniej nasycone, biel jest cieplejsza. Dla materiałów z dużą ilością zdjęć (katalogi produktowe, [ulotki](/produkty/ulotki) gastronomiczne) to minus. Dla materiałów B2B, kancelarii i firm premium to plus — naturalny wygląd buduje autentyczność.",
    },
    {
      type: "p",
      text: "Papier FSC Mix lub FSC 100% jest identyczny ze standardowym papierem pod względem jakości druku — ta sama biel, gładkość i nasycenie kolorów. Jedyna różnica to certyfikat i możliwość umieszczenia logo FSC. Dla większości zastosowań FSC Mix to najłatwiejsza ścieżka do eko-druku bez kompromisów jakościowych.",
    },
    {
      type: "h2",
      id: "farby-ekologiczne",
      text: "Farby ekologiczne — sojowe, roślinne, UV",
    },
    {
      type: "list",
      items: [
        "Farby sojowe / roślinne — zastępują farby na bazie ropy naftowej. Mniejsza emisja VOC (lotnych związków organicznych). Standard w nowoczesnym druku offsetowym",
        "Farby UV — utwardzane promieniami UV zamiast suszenia termicznego. Zero emisji rozpuszczalników. Używane w druku cyfrowym i offsetowym UV",
        "Farby na bazie wody — najniższy ślad ekologiczny, ale ograniczone zastosowanie (głównie druk fleksograficzny na opakowaniach)",
      ],
    },
    {
      type: "h2",
      id: "greenwashing",
      text: "Uwaga na greenwashing",
    },
    {
      type: "callout",
      variant: "warn",
      text: 'Unikaj niezdefiniowanych określeń: „papier ekologiczny", „druk przyjazny środowisku", „eko-druk" bez konkretnego certyfikatu to puste hasła. Wiarygodne oznaczenia to: FSC (z numerem certyfikatu), EU Ecolabel (kwiatek z gwiazdkami), Błękitny Anioł (Der Blaue Engel), Nordic Swan (skandynawski łabędź). Jeśli drukarnia nie podaje numeru certyfikatu — pytaj.',
    },
    {
      type: "h2",
      id: "kiedy-warto",
      text: "Kiedy warto wybrać papier ekologiczny",
    },
    {
      type: "list",
      items: [
        "Twoja firma ma strategię ESG / CSR i raportuje ślad węglowy",
        "Klienci są wrażliwi na ekologię (kosmetyki naturalne, żywność bio, moda zrównoważona)",
        "Materiał skierowany do instytucji publicznych (urzędy, szkoły, NGO) — wymóg zielonych zamówień",
        "Chcesz wyróżnić się na tle konkurencji — certyfikat FSC na ulotce to konkretny argument",
        "Drukujesz duże nakłady (10 000+ sztuk) — skala robi różnicę w śladzie ekologicznym",
      ],
    },
    {
      type: "faq",
      items: [
        {
          q: "Czy papier z recyklingu jest gorszy jakościowo?",
          a: "Zależy od gatunku. Recycling biurowy (100% makulatura biurowa) ma dobrą białość i gładkość — nadaje się do druku laserowego i prostych materiałów. Recycling mieszany (makulatura ogólna) jest szarawy i szorstki — dobry do [wizytówek](/produkty/wizytowki) kraft-style i materiałów z estetyki eko, gorszy do katalogów z kolorowymi zdjęciami.",
        },
        {
          q: "Ile więcej kosztuje druk na papierze FSC?",
          a: "FSC Mix: +5-10% do ceny standardowego druku. FSC 100%: +10-20%. Recycling 100%: +10-30%. Przy nakładzie 1000 ulotek A5 na kredzie 170g: standardowy papier ~180 zł, FSC Mix ~195 zł, recycling 100% ~210 zł. Różnica jest niewielka, zwłaszcza przy większych nakładach.",
        },
        {
          q: "Czy mogę umieścić logo FSC na mojej ulotce?",
          a: "Tak, ale tylko jeśli drukarnia posiada certyfikat FSC Chain of Custody. Logo FSC musi mieć numer certyfikatu drukarni, konkretny typ (FSC 100%, FSC Mix, FSC Recycled) i być zgodne z wytycznymi graficznymi FSC. Drukarnia przygotowuje odpowiednią wersję logo — nie pobieraj go samodzielnie z internetu.",
        },
        {
          q: "Czy druk cyfrowy jest bardziej ekologiczny niż offsetowy?",
          a: "Przy małych nakładach (do 500 sztuk) — tak. [Druk cyfrowy](/blog/druk-offsetowy-vs-cyfrowy) nie wymaga przygotowania form drukowych (oszczędność aluminium i chemikaliów), drukuje bez odpadów rozruchowych (offset marnuje 50-100 arkuszy na ustawienie kolorów). Przy dużych nakładach (5000+ sztuk) offset jest równie lub bardziej efektywny, bo jednorazowy koszt przygotowania rozkłada się na wiele kopii.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Drukuj ekologicznie z DobrePrinty",
      body: "Oferujemy papiery FSC Mix i recycling. Sprawdź opcje eko przy konfiguracji zamówienia.",
      href: "/produkty/ulotki",
      label: "Zobacz opcje eko →",
    },
  ],
};
