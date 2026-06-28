import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "jak-przygotowac-pdf-do-druku",
  title: "Jak przygotować plik PDF do druku — kompletny poradnik",
  excerpt:
    "Wszystko, co musisz wiedzieć o przygotowaniu pliku PDF do druku: spady, marginesy, CMYK, profile barwne, fonty, rozdzielczość. Sprawdzony przewodnik krok po kroku z Adobe Illustrator, InDesign, Affinity Publisher i Canva.",
  category: "pliki-do-druku",
  tags: ["PDF", "preflight", "spady", "CMYK", "drukarnia online"],
  publishedAt: "2026-01-15",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "HowTo",
  relatedProducts: ["ulotki", "wizytowki", "plakaty"],
  sections: [
    {
      type: "p",
      text: "Plik PDF, który dobrze wygląda na monitorze, niekoniecznie nadaje się do druku. Drukarnia oczekuje konkretnego standardu: właściwe spady, marginesy bezpieczeństwa, przestrzeń barwna CMYK, osadzone fonty, odpowiednia rozdzielczość obrazów i poprawny eksport do PDF/X-4. W tym poradniku przechodzimy krok po kroku przez wszystkie elementy, które decydują o tym, czy Twój plik przejdzie preflight bez poprawek.",
    },
    {
      type: "h2",
      id: "co-to-jest-preflight",
      text: "Co to jest preflight i dlaczego decyduje o jakości druku",
    },
    {
      type: "p",
      text: "Preflight to automatyczna kontrola pliku PDF przed drukiem. Sprawdza dziesiątki parametrów: spady, profile barwne, osadzenie fontów, rozdzielczość obrazów, nadrukowy czarny, przezroczystości, kolory dodatkowe. Plik, który nie przechodzi preflight, wraca do projektanta z listą problemów do poprawy. W DobrePrinty preflight uruchamia się automatycznie po wgraniu pliku — jeśli coś jest nie tak, wracamy do Ciebie w 2 godziny robocze z konkretną listą poprawek.",
    },
    {
      type: "p",
      text: "Drukarnia, która nie robi preflight, drukuje wszystko „jak leci” i obciąża klienta odpowiedzialnością za błędy w pliku. Wynik: nieostre zdjęcia, brakujące czcionki zastąpione domyślnym fontem, białe paski na krawędziach (brak spadów), kolory inne niż na monitorze (RGB zamiast CMYK). Preflight to standard pre-press, który chroni klienta przed nieodwracalnymi błędami w nakładzie.",
    },
    {
      type: "h2",
      id: "spady-i-marginesy",
      text: "Spady i marginesy bezpieczeństwa — fundament dobrego PDF-u",
    },
    {
      type: "h3",
      id: "co-to-jest-spad",
      text: "Co to jest spad (bleed)",
    },
    {
      type: "p",
      text: "[Spad](/blog/jak-zrobic-bleed) to obszar, który zostanie obcięty po wydruku. Drukujemy zawsze na większym arkuszu, niż wynosi format docelowy, a następnie gilotyna obcina krawędzie do formatu netto. Spad zapobiega białym paskom na krawędziach przy minimalnych odchyleniach gilotyny (typowo 0,5–1 mm).",
    },
    {
      type: "p",
      text: "Standard w polskim druku to 3 mm spadu po każdej stronie. Wizytówka 85 × 55 mm + 3 mm spadu = plik 91 × 61 mm. Ulotka A5 (148 × 210 mm) + 3 mm = 154 × 216 mm. Plakat A2 (420 × 594 mm) + 3 mm = 426 × 600 mm. Każdy element tła, który dochodzi do krawędzi, musi być wyciągnięty do końca spadu — żeby po obcięciu nie pojawił się biały pasek.",
    },
    {
      type: "h3",
      id: "margines-bezpieczenstwa",
      text: "Margines bezpieczeństwa (safe zone)",
    },
    {
      type: "p",
      text: "Margines bezpieczeństwa to wewnętrzny obszar od krawędzi netto, w którym nie powinno być żadnych kluczowych elementów: tekstu, logo, numerów telefonów, kodów QR. Powód: gilotyna może obciąć minimalnie więcej niż planowano, a element zbyt blisko krawędzi zostanie ucięty.",
    },
    {
      type: "p",
      text: "Standardowe marginesy bezpieczeństwa: 4 mm od krawędzi netto dla wizytówek i małych formatów, 5 mm dla ulotek, 7 mm dla broszur (większe ze względu na grzbiet), 10–20 mm dla plakatów (większe formaty = większy budżet typograficzny). Marginesy nie obowiązują dla elementów graficznych „wychodzących w spad” — te są intencjonalnie wycinane przy krawędzi.",
    },
    {
      type: "table",
      caption:
        "Standardowe spady i marginesy bezpieczeństwa dla popularnych formatów",
      headers: ["Produkt", "Format netto", "Spady", "Marginesy bezp."],
      rows: [
        ["Wizytówka klasyczna", "85 × 55 mm", "3 mm", "4 mm"],
        ["Ulotka DL", "100 × 210 mm", "3 mm", "5 mm"],
        ["Ulotka A5", "148 × 210 mm", "3 mm", "5 mm"],
        [
          "Broszura A5 klejona",
          "148 × 210 mm",
          "3 mm",
          "7 mm zewn. / 12 mm grzbiet",
        ],
        ["Plakat A2", "420 × 594 mm", "3 mm", "10 mm"],
        ["Plakat B1", "707 × 1000 mm", "5 mm", "20 mm"],
        [
          "Roll-up 85 × 200",
          "850 × 2000 mm",
          "5 mm + 250 mm dół",
          "100 mm góra",
        ],
      ],
    },
    {
      type: "h2",
      id: "cmyk-i-profile-barwne",
      text: "CMYK i profile barwne — dlaczego to ma znaczenie",
    },
    {
      type: "h3",
      id: "cmyk-vs-rgb",
      text: "CMYK vs RGB w skrócie",
    },
    {
      type: "p",
      text: "Monitor wyświetla kolory w RGB (czerwony, zielony, niebieski — światło addytywne). Drukarka pracuje w CMYK (cyjan, magenta, żółty, czarny — pigmenty subtraktywne). [Gama kolorów CMYK jest mniejsza niż RGB](/blog/cmyk-vs-rgb) — niektóre intensywne kolory (jaskrawe zielenie, neonowe pomarańcze, czysta cyjan-zieleń) nie istnieją w CMYK i zostaną automatycznie skonwertowane do najbliższego dostępnego.",
    },
    {
      type: "p",
      text: "Plik dostarczony w RGB zostanie automatycznie skonwertowany przez RIP drukarni do CMYK, ale konwersja może wyglądać inaczej, niż się spodziewasz. Lepiej zrobić ją samemu w programie graficznym, kontrolując proces. Standardem polskiej i europejskiej drukarni jest profil ISO Coated v2 (ECI) dla papierów kredowanych i ISO Uncoated v2 dla offsetu.",
    },
    {
      type: "h3",
      id: "rich-black",
      text: "Rich black — głębszy czarny",
    },
    {
      type: "p",
      text: "Czysty czarny tekst: K100 (C0 M0 Y0 K100). Czarne tła i duże powierzchnie czarne: [rich black](/blog/rich-black-vs-czarny-k100) (C40 M30 Y30 K100). Sam K100 na dużej powierzchni wygląda szaro i nierównomiernie, bo to tylko 1/4 farby na arkuszu. Rich black daje głęboki, „aksamitny” czarny dzięki nałożeniu wszystkich czterech farb.",
    },
    {
      type: "h2",
      id: "rozdzielczosc-obrazow",
      text: "Rozdzielczość obrazów — 300 dpi i nie mniej",
    },
    {
      type: "p",
      text: "Standardowa rozdzielczość obrazu do druku to 300 dpi w docelowym rozmiarze. Zdjęcie 1000 × 1000 pikseli wydrukowane w rozmiarze 8,5 × 8,5 cm da 300 dpi. To samo zdjęcie rozciągnięte na A4 (21 × 29,7 cm) da już tylko ok. 120 dpi — wyraźnie nieostre.",
    },
    {
      type: "p",
      text: "Dla wielkoformatu (plakaty B1, A0, roll-upy) wystarczy 100–150 dpi, bo plakat ogląda się z dystansu 1–3 metrów, a wyższa rozdzielczość daje niewspółmiernie większy plik bez zauważalnej poprawy. Dla wizytówek i ulotek — 300 dpi obowiązkowo. Zdjęcia z internetu (72 dpi) nadają się tylko na monitor, nie do druku — sprawdzaj rozdzielczość po przeskalowaniu, zanim zaczniesz projektować.",
    },
    {
      type: "h2",
      id: "fonty-i-czcionki",
      text: "Fonty i czcionki — krzywe czy osadzone",
    },
    {
      type: "p",
      text: "Bezpieczna ścieżka: zamień wszystkie teksty na krzywe (outlines, kontury). Wtedy plik wygląda identycznie u Ciebie i u operatora drukarni, nawet jeśli operator nie ma Twojej czcionki zainstalowanej. Wadą jest to, że tekstu po konwersji na krzywe nie można już edytować — przygotuj plik dopiero po zatwierdzeniu treści.",
    },
    {
      type: "p",
      text: "Alternatywa: osadź wszystkie fonty w PDF-ie. Większość programów graficznych robi to automatycznie przy eksporcie do PDF/X-4. Sprawdź w Adobe Acrobat: Plik > Właściwości > Czcionki — każda powinna mieć status „Osadzona” lub „Osadzony podzbiór”. Czcionki niemoabajzwadne (np. licencyjne lub tylko z webu) mogą się nie osadzić — wtedy wracaj do konwersji na krzywe.",
    },
    {
      type: "h2",
      id: "eksport-do-pdf-x-4",
      text: "Eksport do PDF/X-4 — standard pre-press",
    },
    {
      type: "p",
      text: "PDF/X-4 to standard pre-press, który gwarantuje, że plik zostanie zinterpretowany identycznie w każdym RIP-ie drukarni. Wymaga: osadzonych fontów, profili barwnych ICC, spłaszczonej przezroczystości (lub zachowanej, ale poprawnie oznaczonej), CMYK lub spot color, bez warstw edytowalnych.",
    },
    {
      type: "h3",
      id: "indesign-export",
      text: "Adobe InDesign — preset [PDF/X-4:2008]",
    },
    {
      type: "p",
      text: "W Adobe InDesign: Plik > Eksportuj > PDF (Print) > Adobe PDF Preset: [PDF/X-4:2008]. W sekcji „Marks and Bleeds” zaznacz „Use Document Bleed Settings” i włącz „Crop Marks”. W sekcji „Output” wybierz profil docelowy: ISO Coated v2 (ECI). Eksportuj.",
    },
    {
      type: "h3",
      id: "illustrator-export",
      text: "Adobe Illustrator",
    },
    {
      type: "p",
      text: "W Adobe Illustrator: Plik > Zapisz jako > Adobe PDF > Preset: [PDF/X-4:2008]. W sekcji „Marks and Bleeds” zaznacz „Use Document Bleed Settings”. Pamiętaj, żeby w dokumencie Illustrator ustawić spady przed eksportem (Plik > Konfiguracja dokumentu > Spad: 3 mm).",
    },
    {
      type: "h3",
      id: "canva-affinity-export",
      text: "Canva, Affinity Publisher, Figma",
    },
    {
      type: "p",
      text: "Canva: w trybie Pro/Teams dostępny eksport „PDF for printing” z opcją „Crop marks and bleed”. Affinity Publisher: File > Export > PDF (Press) > preset PDF/X-4. Figma: niestety nie ma natywnego eksportu PDF/X-4 — eksportuj do PDF, potem konwertuj przez Adobe Acrobat lub używaj Figmy tylko do mockupów, a finalny plik przygotuj w Illustratorze.",
    },
    {
      type: "table",
      caption: "Najczęstsze błędy w PDF-ach do druku i jak je naprawić",
      headers: ["Błąd", "Co się stanie", "Jak naprawić"],
      rows: [
        [
          "Brak spadów",
          "Białe paski na krawędziach po obcięciu",
          "Dodaj 3 mm spadu w ustawieniach dokumentu",
        ],
        [
          "Plik w RGB",
          "Kolory inne niż na monitorze",
          "Konwertuj do CMYK przed eksportem",
        ],
        [
          "Zdjęcia <300 dpi",
          "Nieostre, pikselowate wydruki",
          "Wymień zdjęcia na wyższej rozdzielczości",
        ],
        [
          "Czcionki nieosadzone",
          "Drukarnia zastąpi domyślnym fontem",
          "Konwertuj na krzywe lub osadź fonty",
        ],
        [
          "Czysty K100 na dużych powierzchniach",
          "Szary, nierównomierny czarny",
          "Użyj rich black: C40 M30 Y30 K100",
        ],
        [
          "Przezroczystości niespłaszczone",
          "Nieprzewidywalny render w RIP-ie",
          "Spłaszcz przy eksporcie lub PDF/X-4",
        ],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Zanim wgrasz plik, otwórz go w Adobe Acrobat Reader (darmowy) i sprawdź: Plik > Właściwości > Czcionki (wszystkie osadzone?), Narzędzia > Wydruk produkcyjny > Podgląd wyjścia (kolory CMYK?). 5 minut sprawdzenia oszczędzi 2 dni poprawek.",
    },
    {
      type: "h2",
      id: "checklist",
      text: "Checklist przed wgraniem pliku do drukarni",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Format dokumentu zawiera spady 3 mm po każdej stronie",
        "Marginesy bezpieczeństwa od krawędzi netto: 4 mm dla małych formatów, 10+ mm dla wielkoformatu",
        "Wszystkie elementy w przestrzeni CMYK, profil ISO Coated v2 (ECI)",
        "Zdjęcia 300 dpi w skali wydruku (lub 100–150 dpi dla wielkoformatu)",
        "Czcionki na krzywe lub osadzone w PDF-ie",
        "Czarne tła: rich black (C40 M30 Y30 K100), nie sam K100",
        "Eksport do PDF/X-4 z presetu, nie eksperymentalne ustawienia",
        "Sprawdzenie w Adobe Reader: właściwości pliku, podgląd wyjścia, podgląd spadów",
      ],
    },
    {
      type: "faq",
      items: [
        {
          q: "Czy PDF z Canva nadaje się do druku?",
          a: "Tak, jeśli korzystasz z Canva Pro lub Teams i eksportujesz przez „PDF for printing” z opcją „Crop marks and bleed”. Canva Free eksportuje do PDF bez spadów i często w RGB — taki plik wymaga ręcznej konwersji w Adobe Acrobat przed wgraniem do drukarni. Dla profesjonalnego druku rekomendujemy Affinity Publisher (jednorazowy zakup 250 zł) lub Adobe InDesign (subskrypcja) zamiast Canva.",
        },
        {
          q: "Jaki profil barwny wybrać do druku w Polsce?",
          a: "Dla papierów kredowanych (kreda mat, kreda błysk): ISO Coated v2 (ECI) — standard europejski. Dla offsetu i papierów niepowlekanych: ISO Uncoated v2 (ECI). Dla papierów gazetowych: ISO Newspaper v4. Większość polskich drukarni używa tych profili jako default. Jeśli nie wiesz, jaki profil ma drukarnia — zapytaj przed eksportem, ale ISO Coated v2 (ECI) to bezpieczny wybór dla 95% zamówień.",
        },
        {
          q: "Co zrobić, gdy plik jest za duży do wgrania?",
          a: "Sprawdź najpierw rozdzielczość obrazów — często plik jest spuchnięty przez zdjęcia 600 dpi tam, gdzie wystarczy 300 dpi. W Adobe Acrobat: Plik > Zapisz jako > Reduced Size PDF lub Plik > Zapisz jako > Optimized PDF (z presetem „Standard”). Plik może zmniejszyć się 5-10× bez widocznej straty jakości. Plakat A0 powinien ważyć max 100–150 MB.",
        },
        {
          q: "Czy mogę wysłać plik w formacie JPG zamiast PDF?",
          a: "Technicznie tak — niektóre drukarnie przyjmują JPG do prostych projektów (jednostronne plakaty, vinyl). Ale JPG nie obsługuje spadów, profili barwnych, przezroczystości, fontów wektorowych — wszystko jest spłaszczone do pikseli. Plik PDF/X-4 daje większą kontrolę nad jakością i mniejsze ryzyko niespodzianek. DobrePrinty akceptuje PDF, ale JPG też (z zastrzeżeniami).",
        },
        {
          q: "Czy mogę używać przezroczystości w pliku do druku?",
          a: "Tak, ale przy eksporcie spłaszcz przezroczystości lub używaj PDF/X-4 (który obsługuje przezroczystości natywnie). Stare drukarki z RIP-em opartym na PostScript Level 2 mogą mieć problem z niespłaszczonymi przezroczystościami. PDF/X-1a (starszy standard) wymusza spłaszczenie. PDF/X-4 (nowszy, naszego standardu) zachowuje przezroczystości. Sprawdź u swojej drukarni, jaki preset jest preferowany.",
        },
        {
          q: "Ile kosztuje przygotowanie pliku przez drukarnię?",
          a: "W DobrePrinty preflight jest gratis — sprawdzamy plik i wracamy z listą poprawek, jeśli coś jest nie tak. Korekta drobnych błędów (np. brak spadów, plik w RGB) to ok. 30–80 zł netto za godzinę pracy DTP. Pełne przygotowanie projektu od zera to inna usługa — 200–800 zł za ulotkę czy wizytówkę, w zależności od skomplikowania. DobrePrinty nie świadczy usług DTP, ale polecamy freelancerów z naszej sieci.",
        },
        {
          q: "Czy plik PSD lub AI mogę wysłać zamiast PDF?",
          a: "PSD (Photoshop) i AI (Illustrator) to formaty robocze — drukarnia musi je otworzyć w swoim programie, co rodzi ryzyko, że wyglądają inaczej u operatora niż u Ciebie. Standardem wymiany jest PDF/X-4 — niezależny od programu graficznego. Jeśli wysyłasz PSD/AI, ryzyko błędu jest po Twojej stronie. Trzymaj się PDF-u.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Plik gotowy do druku?",
      body: "Wgraj go do konfiguratora DobrePrinty — preflight uruchamia się automatycznie, w razie problemów wracamy do Ciebie w 2 godziny robocze. Bez poprawek = produkcja startuje w 24 h.",
      href: "/produkty/ulotki",
      label: "Zamów druk online →",
    },
  ],
};
