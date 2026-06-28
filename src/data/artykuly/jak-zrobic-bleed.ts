import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "jak-zrobic-bleed",
  title:
    "Jak zrobić bleed (spady) w projekcie do druku — Canva, Figma, Illustrator, InDesign",
  excerpt:
    "Praktyczny poradnik: jak dodać bleed (spady) w Canva, Figma, Adobe Illustrator i InDesign. Wymiary spadów dla różnych formatów. Najczęstsze błędy i jak ich uniknąć.",
  category: "pliki-do-druku",
  tags: ["bleed", "spady", "Canva", "Figma", "Illustrator", "InDesign"],
  publishedAt: "2026-02-12",
  updatedAt: "2026-06-09",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "HowTo",
  relatedProducts: ["ulotki", "wizytowki", "plakaty"],
  sections: [
    {
      type: "p",
      text: "Bleed (spady) to obszar projektu, który zostanie obcięty po druku — istnieje po to, żeby gilotyna nie zostawiała białych pasków na krawędziach. Standard polskiego druku to 3 mm bleedu po każdej stronie. W tym poradniku pokazujemy krok po kroku, jak skonfigurować bleed w czterech najpopularniejszych programach: Canva, Figma, Adobe Illustrator i InDesign.",
    },
    {
      type: "h2",
      id: "co-to-jest-bleed",
      text: "Co to jest bleed i dlaczego musisz go dodać",
    },
    {
      type: "p",
      text: "Gdy drukarnia drukuje Twój projekt, robi to na większym arkuszu, niż wynosi format docelowy. Następnie gilotyna obcina krawędzie do formatu netto. Ze względu na techniczne tolerancje, gilotyna może obciąć trochę więcej lub mniej niż dokładny wymiar netto (typowo ±0,5-1 mm). Bez bleedu efekt jest taki: gdy gilotyna obetnie 0,5 mm więcej niż planowano, na krawędzi projektu pojawi się biały pasek (kolor papieru, nie projektu).",
    },
    {
      type: "p",
      text: "Bleed rozwiązuje ten problem. Dodajesz 3 mm projektu „dodatkowo” poza format netto. Po obcięciu gilotyna może zaciąć trochę więcej lub mniej — i tak na krawędzi widać projekt, nie biały papier. Wszystkie elementy graficzne dochodzące do krawędzi (tła, zdjęcia, prostokąty kolorowe) muszą być wyciągnięte do końca bleedu.",
    },
    {
      type: "h2",
      id: "rozmiary-bleed",
      text: "Standardowe rozmiary bleedu",
    },
    {
      type: "table",
      caption: "Bleed dla różnych formatów druku",
      headers: ["Produkt", "Format netto", "Bleed", "Format z bleedem"],
      rows: [
        ["Wizytówka klasyczna", "85 × 55 mm", "3 mm", "91 × 61 mm"],
        ["Ulotka DL", "100 × 210 mm", "3 mm", "106 × 216 mm"],
        ["Ulotka A6", "105 × 148 mm", "3 mm", "111 × 154 mm"],
        ["Ulotka A5", "148 × 210 mm", "3 mm", "154 × 216 mm"],
        ["Ulotka A4", "210 × 297 mm", "3 mm", "216 × 303 mm"],
        ["Plakat A3", "297 × 420 mm", "3 mm", "303 × 426 mm"],
        ["Plakat A2", "420 × 594 mm", "3 mm", "426 × 600 mm"],
        ["Plakat A1", "594 × 841 mm", "3 mm", "600 × 847 mm"],
        ["Plakat B1", "707 × 1000 mm", "5 mm", "717 × 1010 mm"],
        ["Plakat A0", "841 × 1189 mm", "5 mm", "851 × 1199 mm"],
      ],
    },
    {
      type: "p",
      text: "Dla wielkoformatu (B1, A0, [roll-upy](/produkty/roll-up)) niektóre drukarnie wymagają większego bleedu (5-10 mm). W DobrePrinty standard to 3 mm dla wszystkich formatów do A1 i 5 mm dla B1, A0 i roll-upów. Każdy projekt z mniejszym bleedem jest sygnalizowany w preflight i wracamy do klienta z prośbą o korektę.",
    },
    {
      type: "h2",
      id: "bleed-w-canva",
      text: "Bleed w Canva — krok po kroku",
    },
    {
      type: "p",
      text: "Canva to najpopularniejsze narzędzie wśród freelancerów i mikrofirm. Bleed dostępny tylko w Canva Pro/Teams — w Canva Free musisz dodać bleed ręcznie (skomplikowane). Zalecamy upgrade do Canva Pro (ok. 40 zł/miesiąc) lub przejście na Affinity — od końca 2025 roku, po przejęciu Serif przez Canvę, aplikacja jest dostępna bezpłatnie i ma pełne wsparcie pre-press, lepsze do druku.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Wybierz format dokumentu odpowiadający formatowi netto (np. A5 dla ulotki A5)",
        "W górnym menu kliknij „Plik” → „Ustawienia dokumentu” → włącz „Pokaż marginesy i spady”",
        "Wyciągnij wszystkie elementy tła (kolorowe prostokąty, zdjęcia) do końca obszaru spadów (przerywana czerwona linia)",
        "Teksty i kluczowe elementy trzymaj w obszarze marginesów bezpieczeństwa (zielona przerywana linia)",
        "Przy eksporcie wybierz „PDF for printing” → zaznacz „Crop marks and bleed”",
        "Sprawdź wyeksportowany PDF — bleed powinien być 3 mm wokół całego projektu",
      ],
    },
    {
      type: "callout",
      variant: "warn",
      text: "Canva Free nie ma natywnego wsparcia dla bleedu. Jeśli używasz darmowej wersji, projektuj w formacie powiększonym o bleed (np. dla A5 stwórz dokument 154 × 216 mm) i mentalnie traktuj krawędzie jako bleed. Nie zalecamy tego podejścia — łatwo o pomyłkę.",
    },
    {
      type: "h2",
      id: "bleed-w-figma",
      text: "Bleed w Figma — workaround",
    },
    {
      type: "p",
      text: "Figma nie ma natywnego wsparcia dla bleedu — to narzędzie do designu produktowego i UI, nie pre-press. Można pracować z bleedem manualnie, ale [finalny plik PDF trzeba przygotować](/blog/jak-przygotowac-pdf-do-druku) w Adobe Illustrator lub Affinity Publisher. Dla projektów druk-only Figma nie jest najlepszym wyborem.",
    },
    {
      type: "p",
      text: "Jeśli musisz pracować w Figmie (np. używasz biblioteki komponentów firmowych), oto sposób:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Stwórz ramkę (Frame) o wymiarach formatu z bleedem — np. 154 × 216 mm dla A5",
        "Wewnątrz ramki dodaj prostokąt pomocniczy o wymiarach netto (148 × 210 mm) wycentrowany — to pomocnicze wskazanie granicy „netto”",
        "Elementy tła wyciągnij do krawędzi ramki (poza prostokąt pomocniczy)",
        "Teksty trzymaj wewnątrz prostokąta pomocniczego z dodatkowym marginesem bezpieczeństwa 4-5 mm",
        "Przy eksporcie usuń prostokąt pomocniczy i wyeksportuj jako PNG/PDF",
        "Otwórz w Illustratorze, dodaj crop marks, zapisz jako PDF/X-4",
      ],
    },
    {
      type: "h2",
      id: "bleed-w-illustrator",
      text: "Bleed w Adobe Illustrator",
    },
    {
      type: "p",
      text: "Adobe Illustrator to standard pre-press dla projektów z grafiką wektorową. Bleed konfigurujesz przy tworzeniu dokumentu lub w ustawieniach dokumentu.",
    },
    {
      type: "h3",
      id: "tworzenie-dokumentu-ai",
      text: "Tworzenie nowego dokumentu z bleedem",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Plik → Nowy",
        "Wybierz preset lub wpisz wymiary niewielkiego netto (np. A5: 148 × 210 mm)",
        "W sekcji „Bleed” wpisz 3 mm (lub 5 mm dla wielkoformatu)",
        "Kliknij „Utwórz”",
        "W obszarze roboczym widzisz czerwoną linię — to granica bleedu",
        "Czarna linia w środku to granica netto (format docelowy)",
      ],
    },
    {
      type: "h3",
      id: "eksport-z-illustratora",
      text: "Eksport PDF z bleedem",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Plik → Zapisz jako",
        "Wybierz format „Adobe PDF (.pdf)”",
        "W oknie Save Adobe PDF wybierz preset „[PDF/X-4:2008]”",
        "W zakładce „Marks and Bleeds” zaznacz „Use Document Bleed Settings” (lub wpisz ręcznie 3 mm)",
        "Zaznacz opcjonalnie „Crop Marks” (znaczniki cięcia dla operatora)",
        "Kliknij „Save PDF”",
      ],
    },
    {
      type: "h2",
      id: "bleed-w-indesign",
      text: "Bleed w Adobe InDesign",
    },
    {
      type: "p",
      text: "Adobe InDesign to standard dla projektów wielostronicowych (broszury, książki, magazyny). Bleed konfigurujesz tak samo jak w Illustratorze.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Plik → Nowy → Dokument",
        "Wybierz format (np. A5)",
        "W sekcji „Bleed and Slug” wpisz 3 mm dla każdej krawędzi (lub odznacz „make all settings the same” jeśli chcesz różne wartości)",
        "Kliknij „Utwórz”",
        "W obszarze roboczym widzisz dwie linie: czarną (netto) i czerwoną (bleed)",
        "Przy eksporcie: Plik → Eksportuj → PDF (Print) → preset [PDF/X-4:2008]",
        "W zakładce „Marks and Bleeds” zaznacz „Use Document Bleed Settings” i „Crop Marks”",
      ],
    },
    {
      type: "h2",
      id: "affinity-publisher",
      text: "Bleed w Affinity (darmowa alternatywa)",
    },
    {
      type: "p",
      text: "Affinity (połączone Designer, Photo i Publisher) to konkurencja Adobe InDesign. Od końca 2025 roku, po przejęciu Serif przez Canvę, aplikacja jest dostępna bezpłatnie — wcześniej kosztowała jednorazowo ok. 250 zł, a i tak była tańsza niż abonament Adobe (100+ zł miesięcznie). Pełne wsparcie pre-press, bleed, PDF/X-4. Pracuje praktycznie tak samo jak InDesign:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "File → New → Print → wybierz format",
        "W sekcji „Bleed” wpisz 3 mm",
        "Kliknij „Create”",
        "Eksport: File → Export → PDF → preset „PDF (Press)” → Settings → Bleed: Use document bleed → Include crop marks",
        "Save",
      ],
    },
    {
      type: "h2",
      id: "najczestsze-bledy",
      text: "Najczęstsze błędy w bleedzie",
    },
    {
      type: "table",
      caption: "Typowe błędy i ich konsekwencje",
      headers: ["Błąd", "Konsekwencja", "Naprawa"],
      rows: [
        [
          "Brak bleedu",
          "Białe paski na krawędziach",
          "Dodaj 3 mm bleedu w ustawieniach dokumentu",
        ],
        [
          "Bleed mniejszy niż 3 mm",
          "Białe paski przy minimalnym odchyleniu gilotyny",
          "Zwiększ do 3 mm",
        ],
        [
          "Bleed większy niż 5 mm",
          "Marnowanie miejsca, możliwe problemy z impozycją",
          "Trzymaj się 3-5 mm",
        ],
        [
          "Tekst w obszarze bleedu",
          "Obcięty tekst po wydruku",
          "Przenieś tekst do obszaru marginesów bezpieczeństwa",
        ],
        [
          "Tło niepełne (kończy się przed bleedem)",
          "Białe paski w miejscu kończenia się tła",
          "Wyciągnij tło do końca bleedu",
        ],
        [
          "Crop marks w środku projektu",
          "Widoczne znaczniki na finalnym produkcie",
          "Crop marks dodawaj tylko przy eksporcie",
        ],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Najlepszy test bleedu: po eksporcie PDF-u otwórz go w Adobe Acrobat Reader, włącz „Narzędzia → Wydruk produkcyjny → Podgląd spadów”. Sprawdź, czy bleed jest na wszystkich krawędziach i czy tła sięgają do końca bleedu, nie tylko do granicy netto.",
    },
    {
      type: "faq",
      items: [
        {
          q: "Czy mogę zostawić plik bez bleedu, jeśli projekt ma białe tło?",
          a: "Technicznie tak — jeśli całe tło projektu jest białe (lub kolor papieru), brak bleedu nie spowoduje widocznego problemu. Ale to ryzykowne: jeśli pomylisz się i dodasz kolorowy element przy krawędzi (np. ramkę), bez bleedu pojawi się biały pasek. Lepiej zawsze dodawać 3 mm bleedu jako bezpieczny standard, nawet dla projektów z białym tłem.",
        },
        {
          q: "Ile bleedu dla okładki książki z grzbietem?",
          a: "Standardowy bleed (3 mm) na każdą krawędź zewnętrzną (góra, dół, lewa, prawa). Grzbiet to wyjątek — tu nie ma bleedu (grzbiet jest „składany” z dwóch okładek, nie obcinany). Plik okładki klejonej: szerokość = lewa okładka + grzbiet + prawa okładka, z 3 mm bleedem góra/dół i 3 mm bleedem po lewej (na lewej okładce) i prawej (na prawej okładce). Grzbiet bez bleedu.",
        },
        {
          q: "Co jeśli moja drukarnia wymaga 5 mm bleedu?",
          a: "Niektóre drukarnie wielkoformatowe (plakaty B1, A0, roll-upy) wymagają 5-10 mm bleedu ze względu na większe tolerancje gilotyny przy dużych formatach. Sprawdź wymagania drukarni przed projektowaniem. DobrePrinty standardowo wymaga 3 mm do A1, 5 mm dla B1 i większych. Jeśli ze złożenia projektu wynika 3 mm a drukarnia chce 5 mm — wystarczy w Illustratorze/InDesign zmienić ustawienia dokumentu i ponownie wyciągnąć tła.",
        },
        {
          q: "Czy bleed jest potrzebny dla wizytówek?",
          a: "Tak, 3 mm. Wizytówki są wycinane gilotyną i mają takie same tolerancje jak inne produkty. Wizytówka 85×55 mm = projekt 91×61 mm z bleedem. Jeśli pomyślisz tylko o formacie netto, na krawędziach mogą pojawić się białe paski. Drukarnia odeśle plik z prośbą o korektę.",
        },
        {
          q: "Czy mogę używać Photoshopa do projektów drukowanych?",
          a: "Tak, ale tylko dla projektów z dominującą grafiką rastrową (zdjęcia, kolorowe gradienty). Photoshop tworzy obrazy bitmapowe — przy skalowaniu tracą jakość. Dla wizytówek, ulotek z tekstem, plakatów rekomendujemy Illustrator (wektory) lub InDesign (kombinacja wektorów i rastrów). W Photoshopie bleed dodajesz tak: Image → Canvas Size → zwiększ wymiary o 6 mm (3 mm × 2 strony).",
        },
        {
          q: "Czy bleed wpływa na cenę druku?",
          a: "Nie. Drukarnia używa większego arkusza niezależnie od tego, czy dodasz bleed czy nie — cena druku zależy od formatu netto i nakładu, nie od bleedu. Bez bleedu po prostu ryzykujesz białe paski na krawędziach. Z bleedem masz pewność, że projekt wyjdzie poprawnie.",
        },
        {
          q: "Czy 'safe zone' i 'bleed' to to samo?",
          a: "Nie. Safe zone (margines bezpieczeństwa) to obszar wewnątrz formatu netto, gdzie powinny znajdować się wszystkie kluczowe elementy (tekst, logo, telefon). Bleed to obszar poza formatem netto, gdzie powinny być wyciągnięte tła i elementy graficzne dochodzące do krawędzi. Standard: bleed 3 mm na zewnątrz, safe zone 4-7 mm do wewnątrz od krawędzi netto. Razem dają bezpieczny budżet typograficzny.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Plik z bleedem gotowy?",
      body: "Wgraj go do konfiguratora DobrePrinty — preflight sprawdza bleed automatycznie. Jeśli brakuje 3 mm, wracamy do Ciebie w 2 godziny robocze z konkretną listą poprawek.",
      href: "/produkty/wizytowki",
      label: "Zamów druk online →",
    },
  ],
};
