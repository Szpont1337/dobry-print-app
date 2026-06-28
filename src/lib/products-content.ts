export type ParamRow = {
  parametr: string;
  wartosc: string;
  opcje?: string;
};

export type FilePrepStep = {
  tytul: string;
  opis: string;
};

export type ProductFaq = {
  question: string;
  answer: string;
};

export type WhyBlock = {
  tytul: string;
  opis: string;
};

export type ProductContent = {
  heroLead: string;
  keyword: string;
  whyBlocks: WhyBlock[];
  params: ParamRow[];
  filePrepIntro: string;
  filePrepSteps: FilePrepStep[];
  faqs: ProductFaq[];
  seoParagraph: string[];
  aggregateRating: { value: string; count: string };
  ctaCopy: string;
};

export const productContent: Record<string, ProductContent> = {
  ulotki: {
    keyword: "ulotki",
    heroLead:
      "Druk ulotek online to najszybszy sposób, w jaki firma może dotrzeć do klienta w okolicy. Drukujemy ulotki reklamowe od jednej sztuki, w formatach od A7 aż po A3, dwustronnie 4/4, z dostawą w 24–48 h. Cena brutto z VAT widoczna od razu w konfiguratorze. Bez gwiazdek, bez dopłat za spady, bez czekania na ofertę handlowca.",
    whyBlocks: [
      {
        tytul: "Tani druk ulotek od 1 sztuki",
        opis: "Brak minimalnego nakładu i progowych dopłat. Drukujemy zarówno 50 ulotek dla małej kawiarni, jak i 100 000 ulotek na kampanię ogólnopolską. Cena jednostkowa spada wraz z nakładem, ale i przy mikroseriach mamy konkurencyjne stawki.",
      },
      {
        tytul: "6 formatów od A7 do A3",
        opis: "Wybierasz format finalny w konfiguratorze: A7, DL, A6, A5, A4 lub A3. Domyślnie drukujemy na papierze 135 g kreda mat, dwustronnie 4/4. Spady i marginesy bezpieczeństwa dodajemy automatycznie do szablonu.",
      },
      {
        tytul: "Dostawa do 48 h w całej Polsce",
        opis: "Produkcja standardowych ulotek startuje w 24 godziny od potwierdzenia pliku, kurier dokłada zwykle 1 dzień roboczy. Zamówienie złożone we wtorek rano leży na biurku w czwartek — w Warszawie, Krakowie, Gdańsku czy Białymstoku.",
      },
      {
        tytul: "Profesjonalna kontrola pliku przed drukiem",
        opis: "Każdy plik PDF sprawdza nasz preflight i preflight operatora drukarni partnerskiej: spady, rozdzielczość, profile barwne, czcionki. Jeśli coś jest nie tak, wracamy do Ciebie z konkretną listą poprawek, a nie wymijającą notką.",
      },
    ],
    params: [
      {
        parametr: "Papier",
        wartosc: "Kreda mat",
        opcje: "kreda błysk (opcja)",
      },
      {
        parametr: "Gramatura",
        wartosc: "135 g",
        opcje: "115 g, 170 g, 200 g, 250 g",
      },
      {
        parametr: "Druk",
        wartosc: "4/4 (kolor dwustronnie)",
        opcje: "4/0, 4/1",
      },
      { parametr: "Format", wartosc: "A7, DL, A6, A5, A4, A3" },
      {
        parametr: "Wykończenie",
        wartosc: "Cięcie do formatu",
        opcje: "folia mat, folia błysk, lakier UV punktowy",
      },
      { parametr: "Czas realizacji", wartosc: "24–72 h" },
      { parametr: "Nakład", wartosc: "od 1 sztuki" },
    ],
    filePrepIntro:
      "Plik do druku ulotek przygotowujesz raz, a działa we wszystkich naszych formatach. Poniżej krok po kroku, jak zrobić to dobrze — niezależnie od tego, czy używasz Adobe Illustrator, InDesign, Canva czy Affinity Publisher.",
    filePrepSteps: [
      {
        tytul: "1. Ustaw poprawny format z spadami",
        opis: "Do każdego boku ulotki dodaj 3 mm spadu. Jeśli drukujesz A5 (148 × 210 mm), dokument w programie powinien mieć 154 × 216 mm. Spady to obszar, który zostanie obcięty po wydruku, ale dzięki nim nie zostają białe paski na krawędziach.",
      },
      {
        tytul: "2. Zachowaj margines bezpieczeństwa",
        opis: "Wszystkie kluczowe elementy (tekst, logo, numer telefonu) trzymaj minimum 4 mm od krawędzi netto. Marginesy bezpieczeństwa chronią Twoje treści przed obcięciem nawet przy minimalnych odchyleniach gilotyny.",
      },
      {
        tytul: "3. Pracuj w CMYK",
        opis: "Druk offsetowy i cyfrowy używa CMYK — jeśli plik jest w RGB, kolory zostaną automatycznie skonwertowane i mogą wyglądać inaczej, niż na monitorze. Sprawdź profile w eksporcie: ISO Coated v2 (ECI) dla kreda mat to nasz standard.",
      },
      {
        tytul: "4. Osadź lub zamień fonty na krzywe",
        opis: "Najbezpieczniej jest zamienić wszystkie teksty na krzywe (outlines) — wtedy plik wyglądą tak samo niezależnie od tego, czy operator ma Twoją czcionkę. Jeśli zostawiasz tekst edytowalny, osadzaj wszystkie fonty w PDF-ie.",
      },
      {
        tytul: "5. Rozdzielczość obrazów min. 300 dpi",
        opis: "Zdjęcia o rozdzielczości poniżej 300 dpi w skali wydruku będą widocznie nieostre. Sprawdź w programie graficznym, czy zdjęcia po przeskalowaniu nadal mają 300 dpi w docelowym rozmiarze ulotki.",
      },
      {
        tytul: "6. Eksportuj do PDF/X-4",
        opis: "PDF/X-4 to standard pre-press, który gwarantuje, że plik zostanie zinterpretowany tak samo w każdym RIP-ie. W InDesignie wybierz preset „[PDF/X-4:2008]”, w Illustratorze podobnie. Jeden plik = jedna ulotka dwustronna, str. 1 = przód, str. 2 = tył.",
      },
      {
        tytul: "7. Sprawdź podgląd po wgraniu",
        opis: "Po wgraniu pliku do konfiguratora pokazujemy podgląd ze spadami i marginesami. Sprawdź czerwone linie spadu i niebieskie linie bezpieczeństwa. Jeśli któryś tekst wchodzi w obszar spadu — przesuń go i wgraj plik ponownie.",
      },
    ],
    faqs: [
      {
        question: "Jaka jest minimalna ilość ulotek, którą mogę zamówić?",
        answer:
          "Minimum to 1 sztuka. Drukujemy ulotki od pojedynczych egzemplarzy (np. na próbę przed zamówieniem dużego nakładu) aż po 100 000+ sztuk na kampanie ogólnopolskie. Cena jednostkowa spada wraz z nakładem, ale i przy mikroseriach utrzymujemy konkurencyjne stawki dzięki cyfrowej technologii druku.",
      },
      {
        question:
          "Czy mogę zobaczyć ulotki przed zatwierdzeniem dużego nakładu?",
        answer:
          "Tak. Wystarczy zamówić najpierw 10–50 sztuk próbnych w identycznej specyfikacji, ocenić wydruk i dopiero potem zatwierdzić docelowy nakład. Cena próbki to zwykle 8–25 zł, dostawa kurierem 1–2 dni robocze. Ten sam plik PDF używamy potem do nakładu produkcyjnego, więc kolor i ułożenie są identyczne.",
      },
      {
        question: "Jaki papier wybrać do ulotek reklamowych?",
        answer:
          "Standardem jest kreda mat 135 g — dobry kompromis między ceną, sztywnością i wyglądem. Kreda błysk 135 g daje intensywniejsze kolory, ale jest podatna na zarysowania. Do ulotek lokalizowanych w deszczowych miejscach (np. menu na zewnątrz) warto rozważyć folię matową jako dodatkowe wykończenie.",
      },
      {
        question: "Czym różni się druk 4/0 od 4/4?",
        answer:
          "4/0 to druk jednostronny w pełnym kolorze, 4/4 — dwustronny. Standardem dla ulotek jest 4/4, bo wykorzystujesz obie strony nośnika. 4/0 sprawdza się przy plakatach lub ulotkach naklejanych na słup, gdzie tylko jedna strona jest widoczna. Cena 4/4 jest zwykle o 30–40% wyższa od 4/0.",
      },
      {
        question: "Ile czasu zajmuje druk i dostawa?",
        answer:
          "Produkcja standardowych ulotek (CMYK 4/4, papier 135 g) trwa 24–48 h od potwierdzenia pliku. Kurier dokłada zwykle 1 dzień roboczy, więc całość od zamówienia do paczki to 2–3 dni robocze. Zamówienia z wykończeniem (folia, lakier UV) wydłużają termin o dodatkowe 24–48 h.",
      },
      {
        question: "Czy oferujecie projekt graficzny ulotek?",
        answer:
          "Nie drukujemy z gotowych szablonów wbudowanych w konfigurator — to byłoby ograniczeniem. Polecamy współpracę z grafikiem freelancerem (300–800 zł za projekt) lub samodzielne wykonanie w Canva/Affinity Publisher. Mamy darmowe szablony PDF dla każdego formatu, gotowe ze spadami i marginesami bezpieczeństwa.",
      },
      {
        question: "Jaka rozdzielczość zdjęć jest wymagana?",
        answer:
          "Minimum 300 dpi w docelowym rozmiarze ulotki. Zdjęcie 1000 × 1000 px wydrukuje się ostro na obszarze ok. 8,5 × 8,5 cm. Jeśli to samo zdjęcie chcesz rozciągnąć na całe A4, potrzebujesz minimum 2480 × 3508 px. Niższe rozdzielczości będą widocznie nieostre i jest to najczęstszy powód niezadowolenia z wydruku.",
      },
    ],
    seoParagraph: [
      "Druk ulotek online to dziś standard, jeśli zależy Ci na czasie i przewidywalnej cenie. DobrePrinty realizuje druk ulotek dla biznesów z całej Polski: kawiarni i restauracji, sklepów stacjonarnych, klubów fitness, gabinetów lekarskich, agencji nieruchomości, organizatorów eventów i lokalnych usługodawców. Tania drukarnia ulotek nie musi oznaczać kompromisu na jakości — w naszej sieci pracuje 28 zweryfikowanych partnerów, a każdy z nich przechodzi kwartalny audyt jakości druku i terminowości.",
      "Ulotki reklamowe nadal działają, mimo cyfrowych alternatyw. W badaniach efektywności reklamy lokalnej ulotka DL trafiająca do skrzynki konwertuje 2–4× lepiej niż reklama display w tej samej okolicy — bo jest namacalna, zostaje pod ręką, a użytkownik kontroluje moment kontaktu. Druk ulotek z konfiguratora DobrePrinty jest tani również dlatego, że nie obciążamy klienta marżą handlowca: konfigurujesz produkt sam, my dobieramy drukarnię partnerską, kurier startuje zaraz po produkcji.",
      "Format ulotek warto dopasować do kanału dystrybucji. DL (100 × 210 mm) najlepiej sprawdza się w bramie do skrzynek pocztowych i na ladzie w restauracji. A6 to klasyk dla flyerów eventowych. A5 — wszechstronny format dla salonów piękności i sklepów osiedlowych. A4 to format na menu i większe ulotki promocyjne. Druk ulotek A3 jest rzadziej zamawiany, ale sprawdza się np. jako plakat-ulotka rozdawany przy stoiskach targowych.",
    ],
    aggregateRating: { value: "4.9", count: "1850" },
    ctaCopy:
      "Wgraj plik PDF, wybierz nakład i format — wycenę widzisz od razu, ulotki dostarczamy w 24–48 h. Zamów druk ulotek online bez gwiazdek i ukrytych kosztów.",
  },

  "skladane-ulotki": {
    keyword: "składane ulotki",
    heroLead:
      "Druk składanych ulotek online to format dla treści, które nie mieszczą się na jednej stronie A5. Bigujemy i falcujemy automatycznie — wybierasz typ złożenia (Z, C, drabinka) w konfiguratorze, my robimy resztę. Format finalny DL, A5 lub A4, papier 170 g kreda mat, druk 4/4. Dostawa 2–4 dni robocze.",
    whyBlocks: [
      {
        tytul: "Trzy formaty finalne",
        opis: "DL (100 × 210 mm po złożeniu), A5 (148 × 210 mm) i A4 (210 × 297 mm). Każdy format dostępny w falcowaniu C (litera) lub Z (akordeon). Po rozłożeniu otrzymujesz dwukrotnie większą powierzchnię do projektowania niż w klasycznej ulotce.",
      },
      {
        tytul: "Profesjonalne bigowanie",
        opis: "Bigowanie to wgniecenie wzdłuż linii złożenia, które chroni papier przed pęknięciem. Robimy je mechanicznie przed falcowaniem — przy papierach 170 g i wyżej jest to niezbędne, żeby ulotka po roku użytkowania nie pękała na zgięciu.",
      },
      {
        tytul: "Treści na 6 łamów",
        opis: "Składane ulotki dają 6 stron do projektowania (3 z każdej strony arkusza). To wystarczy na pełne menu kawiarni, program eventu, ofertę szkolenia z agendą lub mini-katalog produktów. Bez przeładowania, ale z miejscem na hierarchię informacji.",
      },
      {
        tytul: "Papier 170 g kreda mat",
        opis: "Standardem jest 170 g kreda mat — wystarczająco sztywny, żeby ulotka nie zwijała się po rozłożeniu, ale wciąż lekki w transporcie. Opcjonalnie 250 g kreda mat dla menu restauracyjnych, które są regularnie używane.",
      },
    ],
    params: [
      {
        parametr: "Papier",
        wartosc: "Kreda mat",
        opcje: "kreda błysk (opcja)",
      },
      { parametr: "Gramatura", wartosc: "170 g", opcje: "135 g, 200 g, 250 g" },
      { parametr: "Druk", wartosc: "4/4 (dwustronny)", opcje: "4/0, 4/1" },
      { parametr: "Format finalny", wartosc: "DL, A5, A4" },
      {
        parametr: "Typ falcowania",
        wartosc: "C (litera)",
        opcje: "Z (akordeon), drabinka",
      },
      {
        parametr: "Wykończenie",
        wartosc: "Bigowanie + falcowanie",
        opcje: "folia mat, folia błysk",
      },
      { parametr: "Czas realizacji", wartosc: "48–96 h" },
    ],
    filePrepIntro:
      "Plik do druku składanych ulotek różni się od zwykłej ulotki tylko jednym — musisz uwzględnić linie złożenia. Reszta (spady, marginesy, CMYK, fonty) działa identycznie. Poniżej szczegóły.",
    filePrepSteps: [
      {
        tytul: "1. Ustaw rozłożony format z spadami",
        opis: "Dla DL składanego w C: rozłożony format to 297 × 210 mm + 3 mm spadu po każdej stronie = 303 × 216 mm. Dla A5 składanego w C: 420 × 148 mm + spady. Pracujesz na rozłożonym arkuszu, nie na pojedynczych łamach.",
      },
      {
        tytul: "2. Zaznacz linie złożenia w warstwie pomocniczej",
        opis: "Załóż warstwę „pomocnicza” (nie wpływającą na druk) i zaznacz na niej linie złożenia jako przerywane linie. Dzięki temu wiesz, gdzie projekt nie powinien przechodzić zbyt ciężkimi elementami (np. duże litery na samej linii złożenia).",
      },
      {
        tytul: "3. Rozplanuj treść per łam",
        opis: "Każdy łam (1/3 lub 1/2 arkusza) traktuj jako osobną „stronę”. Pierwsza okładka, ostatnia z danymi kontaktowymi, środek na ofertę. Pamiętaj, że łamy „mijają się” podczas składania — okładka po złożeniu jest najczęściej skrajnie prawym łamem przedniej strony.",
      },
      {
        tytul: "4. CMYK i fonty w krzywych",
        opis: "Tak jak w zwykłych ulotkach: CMYK obowiązkowo, fonty na krzywe lub osadzone w PDF-ie. Profile barwne ISO Coated v2 (ECI) dla kreda mat. Czarna typografia: C0 M0 Y0 K100, czarne pola tła: C40 M30 Y30 K100 (rich black).",
      },
      {
        tytul: "5. Sprawdź czytelność po złożeniu",
        opis: "Wydrukuj wersję roboczą na zwykłym A4, złóż w docelowym typie i przeczytaj. Tekst, który wygląda dobrze rozłożony, może być nieczytelny po złożeniu z powodu hierarchii lub przerwy w środku zdania. Lepiej skorygować przed wgraniem do drukarni.",
      },
      {
        tytul: "6. Eksport do PDF/X-4 jako jeden arkusz",
        opis: "Jeden plik to dwie strony PDF: str. 1 = przód (rozłożony), str. 2 = tył (rozłożony). NIE oddzielaj łamów w osobne strony — falcujemy z jednego arkusza i potrzebujemy go w całości.",
      },
    ],
    faqs: [
      {
        question: "Jaki typ falcowania wybrać do menu restauracyjnego?",
        answer:
          "Najpopularniejszy jest typ C (litera), gdzie dwie zewnętrzne klapki zawijają się do środka — daje 6 łamów i przy A4 finalnym (rozłożone do 420 mm szerokości) mieści pełne menu z hierarchią dania→opis→cena. Typ Z (akordeon) jest lepszy do programów eventu chronologicznie. Drabinka — do dłuższych treści typu instrukcja krok po kroku.",
      },
      {
        question: "Czy mogę zamówić składane ulotki w nakładzie 100 sztuk?",
        answer:
          "Tak, minimum to 1 sztuka, ale cena jednostkowa znacząco spada od 250 sztuk. Przy 100 sztukach cena za ulotkę DL falcowaną w C to ok. 1,8 zł brutto, przy 500 sztukach — 0,45 zł, przy 2 000 — 0,28 zł. Konfigurator pokazuje pełen breakdown ceny od razu po wybraniu nakładu.",
      },
      {
        question: "Czym różni się bigowanie od samego falcowania?",
        answer:
          "Falcowanie to samo zagięcie papieru, bigowanie to wcześniejsze wgniecenie linii zagięcia tępym narzędziem. Bez bigowania papier 170 g i wyżej pęka na zgięciu po kilkukrotnym użyciu — szczególnie kreda, która ma sztywną powłokę. Każda nasza składana ulotka jest najpierw bigowana, potem falcowana.",
      },
      {
        question: "Czy można drukować składane ulotki na grubszym papierze?",
        answer:
          "Tak. Standard to 170 g kreda mat, ale dostępne są 200 g i 250 g — głównie do menu restauracyjnych, które są codziennie dotykane przez gości. Powyżej 250 g rezygnujemy z falcowania, bo papier zbyt mocno pęka — zamiast tego polecamy oprawę klejoną lub szytą (kategoria „broszury”).",
      },
      {
        question: "Ile czasu zajmuje druk składanych ulotek?",
        answer:
          "48–96 h, czyli o dobę dłużej niż prosta ulotka. Powód: po druku arkusz musi trafić do bigówki, potem do falcerki, każdy z tych procesów ma własny czas wykończenia. W praktyce: zamówienie złożone w poniedziałek rano leży u Ciebie w piątek lub poniedziałek tygodnia następnego.",
      },
      {
        question: "Czy oferujecie szablon składanej ulotki do pobrania?",
        answer:
          "Tak — w konfiguratorze przy każdym typie falcowania jest link do darmowego szablonu PSD/AI/PDF z liniami złożenia, spadami i marginesami bezpieczeństwa. Wystarczy podstawić swoje treści i wyeksportować do PDF/X-4. Szablony są zgodne z naszym preflightem, więc plik przejdzie bez poprawek.",
      },
      {
        question: "Czy mogę dodać folię matową lub błyszczącą?",
        answer:
          "Tak, na okładkę (czyli zewnętrzną stronę po złożeniu). Folia matowa daje premium look i chroni okładkę przed zarysowaniem — to najlepszy wybór do menu i programów konferencji. Folia błysk intensyfikuje kolory, ale jest podatniejsza na ślady palców. Folia dodaje 48–72 h do czasu realizacji i ok. 25% do ceny.",
      },
    ],
    seoParagraph: [
      "Składane ulotki to format dla treści, które wymagają większej przestrzeni niż zwykła ulotka, ale nie potrzebują formy broszury. Druk składanych ulotek online w DobrePrinty obejmuje trzy formaty finalne (DL, A5, A4) i trzy typy falcowania (C, Z, drabinka). Wszystkie zamówienia idą przez konfigurator z ceną brutto z VAT widoczną od razu, a 28 drukarni partnerskich w naszej sieci pozwala dobrać najszybszego partnera pod konkretny nakład.",
      "Najczęstsze zastosowania to menu restauracyjne, programy konferencji, oferty wycieczek, foldery promocyjne deweloperów i mini-katalogi produktów. Składane ulotki sprawdzają się tam, gdzie standardowa ulotka jest zbyt mała, ale broszura zbyt duża i zbyt droga. Tania drukarnia składanych ulotek to dla naszych klientów najczęściej oszczędność rzędu 40–60% w stosunku do broszury szytej przy podobnej zawartości treściowej.",
      "Bigowanie i falcowanie to procesy, które rozróżniają profesjonalny druk składanych ulotek od próby zagięcia papieru ręcznie. Bigowanie wgniata linię złożenia, zanim papier zostanie złożony — chroni to powłokę kredy przed pęknięciem. Falcowanie to mechaniczne złożenie. Bez obu tych procesów ulotka 170 g po kilku użyciach pęka i wygląda nieprofesjonalnie. W konfiguratorze automatycznie dobieramy bigowanie dla wszystkich gramatur ≥150 g.",
    ],
    aggregateRating: { value: "4.9", count: "920" },
    ctaCopy:
      "Wybierz format i typ falcowania, wgraj plik — składane ulotki dostarczamy w 2–4 dni robocze z bigowaniem w cenie.",
  },

  "broszury-szyte": {
    keyword: "broszury szyte",
    heroLead:
      "Druk broszur szytych drutem to klasyk: szybkie w produkcji, lekkie, eleganckie. Idealne na cenniki, programy wydarzeń, katalogi produktowe do 48 stron i raporty wewnętrzne. Drukujemy broszury szyte w A6, A5 i A4, standardowo 16 stron, ale konfigurator pozwala zwiększyć do 48. Spinanie dwoma drutami, środek 135 g, okładka 250 g.",
    whyBlocks: [
      {
        tytul: "Szybki czas realizacji",
        opis: "Broszury szyte drutem produkujemy w 3–5 dni roboczych — to najszybsza oprawa wśród formatów wielostronicowych. Klejone wymagają 5–7 dni, szyte nicią 7–10. Dla pilnych zamówień (konferencja w piątek) szyte to często jedyna realistyczna opcja.",
      },
      {
        tytul: "Niski koszt jednostkowy",
        opis: "Koszt broszury 16-stronicowej A5 zaczyna się od ok. 2,1 zł brutto przy nakładach 250+. Dla porównania: oprawa klejona w tym formacie to ok. 5,8 zł, szyta nicią — 12,4 zł. Broszury szyte to ekonomiczna oprawa dla treści, które nie muszą trwać dekadami.",
      },
      {
        tytul: "Do 48 stron",
        opis: "Limit techniczny szycia drutem to ok. 48 stron środka (24 dwustronne arkusze) + okładka. Powyżej tego limitu drut przestaje trzymać blok, a zszywki uwierają. Dla grubszych broszur polecamy oprawę klejoną.",
      },
      {
        tytul: "Otwiera się płasko",
        opis: "Broszura szyta drutem otwiera się prawie płasko — pełen rozkład pokazuje obie strony bez „garba” na grzbiecie. To istotne dla projektów typograficznych z grafiką przechodzącą przez środek (np. zdjęcia rozkładówkowe lub mapy w przewodnikach).",
      },
    ],
    params: [
      {
        parametr: "Środek — papier",
        wartosc: "Kreda mat 135 g",
        opcje: "kreda błysk 135 g, offset 90 g",
      },
      {
        parametr: "Okładka — papier",
        wartosc: "Kreda mat 250 g",
        opcje: "kreda mat 300 g, karton 350 g",
      },
      {
        parametr: "Druk",
        wartosc: "4/4 (kolor dwustronnie)",
        opcje: "4/0 okładka, 1/1 środek (czarno-biały)",
      },
      { parametr: "Format", wartosc: "A6, A5, A4" },
      { parametr: "Liczba stron", wartosc: "8–48 (wielokrotność 4)" },
      {
        parametr: "Oprawa",
        wartosc: "Szyte drutem (zszywki)",
        opcje: "okiennie 2 zszywki na boku",
      },
      { parametr: "Czas realizacji", wartosc: "72–120 h" },
    ],
    filePrepIntro:
      "Plik do druku broszur szytych musi być przygotowany jako rozkładówki (spreads) lub kolejne pojedyncze strony — preferujemy strony pojedyncze, bo łatwiej je oprawić w impozycji. Poniżej krok po kroku.",
    filePrepSteps: [
      {
        tytul: "1. Liczba stron musi być wielokrotnością 4",
        opis: "Broszura szyta drutem składa się z arkuszy złożonych na pół — każdy arkusz to 4 strony. Jeśli masz 14 stron treści, dorzuć 2 puste do 16, lub usuń 2 do 12. Próba wydrukowania 13 stron skończy się błędem w impozycji.",
      },
      {
        tytul: "2. Strony jako pojedyncze, NIE rozkładówki",
        opis: "Wyeksportuj PDF jako kolejne pojedyncze strony (1, 2, 3, 4…), nie jako rozkładówki (1, 2-3, 4-5…). Nasz preflight automatycznie zrobi impozycję — przy zszywkach 1. strona okładki łączy się z ostatnią, str. 2 z przedostatnią itd.",
      },
      {
        tytul: "3. Spady 3 mm + marginesy",
        opis: "Każda strona z 3 mm spadu na każdą krawędź. Marginesy bezpieczeństwa: minimum 6 mm od krawędzi netto na zewnątrz strony, minimum 8 mm od strony środka (tam, gdzie biegnie grzbiet — tekst za blisko grzbietu może być słabo czytelny przy otwarciu).",
      },
      {
        tytul: "4. Okładka jako osobne strony",
        opis: "Okładka to strony 1, 2, n-1 i n (gdzie n to całkowita liczba stron). Str. 1 = przód okładki, str. 2 = wewnętrzna strona przodu, str. n-1 = wewnętrzna strona tyłu, str. n = tył okładki. Drukujemy okładkę na innym papierze niż środek.",
      },
      {
        tytul: "5. CMYK, fonty w krzywych, 300 dpi",
        opis: "Tak jak w pozostałych produktach: CMYK ISO Coated v2 (ECI), fonty na krzywe lub osadzone, zdjęcia 300 dpi w docelowym rozmiarze. Czarne tła: rich black (C40 M30 Y30 K100), nie sam K100 — daje głębszy odcień.",
      },
      {
        tytul: "6. Eksport do PDF/X-4 jako jeden plik",
        opis: "Wszystkie strony w jednym PDF-ie w prawidłowej kolejności (1, 2, 3, … n). Nie oddzielaj okładki od środka — preflight sam je rozróżni i zmapuje na różne papiery zgodnie z konfiguracją zamówienia.",
      },
    ],
    faqs: [
      {
        question: "Jaki jest minimalny nakład broszur szytych?",
        answer:
          "Minimum to 25 sztuk, ale rekomendujemy 100+ dla optymalnej ceny jednostkowej. Przy 25 sztukach koszt jednostkowy 16-stronicowej broszury A5 to ok. 8 zł brutto, przy 250 sztukach — 2,1 zł. Cyfrowa technologia druku pozwala nam realizować mikronakłady, ale ekonomicznie sens ma to dopiero od 100+.",
      },
      {
        question: "Czy mogę połączyć kolorowy środek z czarno-białym?",
        answer:
          "Tak, ale to nie jest standard. Domyślnie drukujemy 4/4 (cały środek w kolorze). Opcja „kolorowe rozkładówki + czarno-białe strony” wymaga ręcznej impozycji i wydłuża czas realizacji o 24 h. Standardowo taniej jest wydrukować wszystko 4/4 niż mieszać tryby.",
      },
      {
        question: "Jaki papier wybrać na okładkę?",
        answer:
          "Standard to kreda mat 250 g — wystarczająco sztywna, żeby broszura zachowała formę, ale wciąż lekka i tania. Dla programów konferencji premium polecamy kreda mat 300 g z folią matową — broszura przeżyje całą imprezę w torbach uczestników bez śladów. Karton 350 g rezerwujemy dla katalogów ekskluzywnych.",
      },
      {
        question: "Czy okładka może być z folią matową lub błyszczącą?",
        answer:
          "Tak. Folia matowa to klasyczny wybór do projektów premium (raporty roczne, monografie wydziałowe). Folia błyszcząca intensyfikuje kolory, dobrze działa przy okładkach z dużymi zdjęciami. Folia dodaje 48 h do czasu realizacji i ok. 30% do ceny okładki. Folii nigdy nie kładziemy na środku — tylko na okładce.",
      },
      {
        question: "Ile stron można maksymalnie zszyć drutem?",
        answer:
          "Limit techniczny to 48 stron środka (12 arkuszy po 4 strony) + 4 strony okładki, czyli 52 strony łącznie. Powyżej tego limitu zszywka nie trzyma stabilnie bloku, a użytkownik ma problem z otwieraniem broszury. Dla większej liczby stron rekomendujemy oprawę klejoną (do 200 stron) lub szytą nicią (do 400+).",
      },
      {
        question: "Czy mogę zamówić mieszankę formatów?",
        answer:
          "Nie w jednym zamówieniu — każda broszura ma jeden format. Jeśli potrzebujesz mieszanki (np. broszura A4 z wklejką A5), drukujesz to osobno i wstawiasz ręcznie. Alternatywą jest broszura A4 z mniejszą wewnętrzną grafiką, która optycznie udaje wklejkę bez kosztu dodatkowego druku.",
      },
      {
        question: "Czy oferujecie szablon broszury do pobrania?",
        answer:
          "Tak — w konfiguratorze przy każdym formacie i liczbie stron jest link do darmowego szablonu InDesign + PDF z marginesami, spadami i siatką typograficzną. Szablony są zgodne z naszym preflightem, więc plik przejdzie bez poprawek. Pobierz, podstaw treść, wyeksportuj do PDF/X-4 — i już.",
      },
    ],
    seoParagraph: [
      "Druk broszur szytych drutem to najczęstsza oprawa wybierana dla materiałów konferencyjnych, programów wydarzeń, cenników i katalogów produktowych do 48 stron. DobrePrinty realizuje druk broszur szytych w trzech formatach (A6, A5, A4), z różnymi liczbami stron i opcjami okładki. Konfigurator pokazuje cenę brutto z VAT przy każdej zmianie parametrów, a 28 drukarni partnerskich pozwala dobrać najlepszego partnera dla konkretnego zamówienia.",
      "Broszury szyte drutem są lekkie i tanie w produkcji, ale mają limit grubości — powyżej 48 stron drut przestaje trzymać blok stabilnie. Dla grubszych publikacji polecamy oprawę klejoną (do 200 stron) lub szytą nicią (do 400+). Druk broszur szytych w naszej sieci kosztuje od 2,1 zł brutto za sztukę dla 16-stronicowej A5 przy nakładach 250+, co jest cenowo niedoścignione przez oprawę klejoną i szytą nicią.",
      "Tania drukarnia broszur szytych nie musi oznaczać kompromisu jakościowego. Kontrolujemy plik PDF przed drukiem (spady, rozdzielczość, CMYK), używamy maszyn cyfrowych Konica Minolta i HP Indigo dla mniejszych nakładów, offsetowych dla 500+. Każda drukarnia partnerska przechodzi kwartalny audyt jakości, a klient w razie reklamacji ma kontakt z DobrePrinty, nie z drukarnią — my przejmujemy proces reklamacyjny.",
    ],
    aggregateRating: { value: "4.8", count: "640" },
    ctaCopy:
      "Wybierz format, liczbę stron i papier okładki — broszury szyte drukujemy w 3–5 dni roboczych, dostawa kurierem w cenie.",
  },

  "broszury-klejone": {
    keyword: "broszury klejone",
    heroLead:
      "Druk broszur z oprawą klejoną to wybór dla katalogów produktowych, raportów rocznych, magazynów firmowych i materiałów konferencyjnych powyżej 48 stron. Klejenie hotmelt zapewnia trwałość, a grzbiet daje pełnowymiarowy efekt książki. Format A5 lub A4, środek 135 g kreda mat, okładka 300 g z folią matową w cenie.",
    whyBlocks: [
      {
        tytul: "Do 200 stron treści",
        opis: "Oprawa klejona obsługuje od 48 do 200 stron środka. Powyżej 48 stron zaczynamy klejenie hotmelt (poniżej zwykle szycie drutem jest tańsze). Powyżej 200 stron polecamy oprawę szytą nicią — daje większą trwałość przy grubych blokach.",
      },
      {
        tytul: "Profesjonalny efekt książki",
        opis: "Grzbiet broszury klejonej można drukować — pojawia się tam tytuł, autor lub logo. To istotne dla katalogów ustawianych na półce: na grzbiecie widać, co to za publikacja, bez konieczności wyciągania całej książki. Dla raportów rocznych standard.",
      },
      {
        tytul: "Standard z folią matową na okładce",
        opis: "Każda broszura klejona z naszej oferty zawiera folię matową na okładce w cenie podstawowej. Folia daje premium look, chroni okładkę przed zarysowaniem i odciskami palców. Opcjonalnie folia błyszcząca lub bez folii — z dopłatą za zmianę.",
      },
      {
        tytul: "Klejenie hotmelt o trwałości lat",
        opis: "Hotmelt to klej termiczny, który po stwardnieniu trzyma blok stabilnie przez lata. W kontroli jakości testujemy każdą partię — przykładamy 5 kg masy do otwartej broszury i sprawdzamy, czy klej nie pęka. Każdy partner musi przejść ten test.",
      },
    ],
    params: [
      {
        parametr: "Środek — papier",
        wartosc: "Kreda mat 135 g",
        opcje: "kreda błysk 135 g, kreda mat 170 g",
      },
      {
        parametr: "Okładka — papier",
        wartosc: "Kreda mat 300 g + folia mat",
        opcje: "kreda błysk 300 g, karton 350 g",
      },
      {
        parametr: "Druk",
        wartosc: "4/4 (środek i okładka)",
        opcje: "1/1 środek (czarno-biały)",
      },
      { parametr: "Format", wartosc: "A5, A4" },
      { parametr: "Liczba stron", wartosc: "48–200 (wielokrotność 2)" },
      {
        parametr: "Oprawa",
        wartosc: "Klejenie hotmelt",
        opcje: "klejenie PUR (premium)",
      },
      {
        parametr: "Wykończenie okładki",
        wartosc: "Folia matowa",
        opcje: "folia błysk, lakier UV punktowy",
      },
      { parametr: "Czas realizacji", wartosc: "5–7 dni roboczych" },
    ],
    filePrepIntro:
      "Plik do druku broszur klejonych przygotowujesz jako kolejne pojedyncze strony, plus osobny plik na okładkę z grzbietem. Poniżej krok po kroku.",
    filePrepSteps: [
      {
        tytul: "1. Środek — jednolity PDF wielostronicowy",
        opis: "Wszystkie strony środka (od 48 do 200) w jednym PDF-ie, każda jako pojedyncza strona (nie rozkładówka), z 3 mm spadu i marginesami bezpieczeństwa 7 mm od krawędzi netto. Strona 1 środka = pierwsza strona po wewnętrznej stronie okładki.",
      },
      {
        tytul: "2. Okładka — osobny PDF z grzbietem",
        opis: "Okładka to jeden arkusz: lewa klapka = tylna okładka, środek = grzbiet, prawa klapka = przednia okładka. Grubość grzbietu = (liczba stron środka × 0,09 mm) + 0,3 mm okładki. Dla 100 stron 135 g: grzbiet ok. 9 mm. Konfigurator oblicza to automatycznie.",
      },
      {
        tytul: "3. Tekst na grzbiecie",
        opis: "Jeśli grzbiet ma >5 mm, możesz dodać tytuł. Czytaj od góry do dołu (książkowy standard) lub od dołu do góry (magazynowy). Minimum 3 mm bezpiecznego marginesu od krawędzi grzbietu, font min. 8 pt. Tytuł musi mieścić się w grzbiecie bez „wychodzenia” na okładki.",
      },
      {
        tytul: "4. Marginesy bezpieczeństwa od grzbietu",
        opis: "Tekst na stronach środka trzymaj minimum 10 mm od strony grzbietowej — w klejonej oprawie strona „chowa się” w klej przy otwarciu, więc tekst za blisko grzbietu jest słabo czytelny. Marginesy zewnętrzne 7 mm, marginesy „wewnętrzne” (od grzbietu) 10–12 mm.",
      },
      {
        tytul: "5. CMYK i profile barwne",
        opis: "Tak jak w pozostałych produktach: CMYK ISO Coated v2 (ECI). Dla okładki z folią matową kolory wyjdą lekko ciemniejsze i mniej nasycone — folia mat „matuje” farbę. Jeśli zależy Ci na żywych kolorach, wybierz folię błyszczącą.",
      },
      {
        tytul: "6. Eksport do PDF/X-4 — dwa pliki",
        opis: "Plik 1: środek (wszystkie strony w kolejności). Plik 2: okładka (jedna strona PDF z lewą klapką + grzbiet + prawą klapką + spadami). Oba pliki wgrywasz do konfiguratora osobno, oznaczasz „środek” i „okładka”.",
      },
    ],
    faqs: [
      {
        question: "Jaka jest różnica między klejeniem hotmelt a PUR?",
        answer:
          "Hotmelt to klej termiczny stosowany standardowo — szybki, tani, trwały przy normalnym użytkowaniu. PUR (klej poliuretanowy) jest droższy o ok. 30%, ale daje większą elastyczność i odporność na ekstremalne temperatury (-20 do +80°C). PUR rekomendujemy dla broszur, które będą używane w terenie (np. instrukcje techniczne) lub regularnie otwierane (książki kucharskie).",
      },
      {
        question: "Czy mogę zamówić broszurę klejoną w nakładzie 50 sztuk?",
        answer:
          "Tak, minimum to 25 sztuk, ale cena jednostkowa zaczyna sens ekonomiczny od 100+. Przy 25 sztukach A5 100-stronicowej koszt to ok. 18 zł brutto, przy 100 sztukach — 8 zł, przy 500 — 4,5 zł. Klejenie wymaga rozruchu maszyny, który amortyzuje się dopiero przy większych nakładach.",
      },
      {
        question: "Jaki papier wybrać na środek katalogu produktowego?",
        answer:
          "Kreda mat 135 g to standard — daje dobry kompromis ceny, sztywności i druku zdjęć. Dla katalogów z dużą ilością zdjęć produktowych polecamy kreda mat 170 g — bardziej eksluzywny papier, drobne detale są lepiej widoczne. Kreda błysk 135 g intensyfikuje kolory zdjęć produktowych, ale daje refleksy przy oświetleniu sklepowym.",
      },
      {
        question: "Czy można dodać lakier UV punktowy na okładce?",
        answer:
          "Tak. Lakier UV punktowy to selektywne nakładanie błyszczącego lakieru na konkretne elementy okładki (np. logo, tytuł). Daje efekt 3D i kontrastuje z matową folią pod spodem. Wymaga dodatkowego pliku z maską lakieru i wydłuża czas realizacji o 72 h. Koszt: ok. 35% więcej za okładkę.",
      },
      {
        question: "Ile czasu zajmuje druk broszury klejonej?",
        answer:
          "5–7 dni roboczych od potwierdzenia pliku. Powód: druk środka i okładki, oczekiwanie na schnięcie folii, klejenie hotmelt, oczekiwanie na utwardzenie kleju (24 h), cięcie krawędzi, kontrola jakości. Powyżej 500 sztuk lub z dodatkiem PUR — do 10 dni. Konfigurator pokazuje konkretny termin po podaniu nakładu i wykończenia.",
      },
      {
        question: "Czy oferujecie wydruk próbny przed nakładem?",
        answer:
          "Tak. Dla nakładów 250+ rekomendujemy zamówienie 1 egzemplarza próbnego (proof) w identycznej specyfikacji za ok. 60–120 zł. Sprawdzasz kolory, jakość klejenia, wygląd okładki z folią — i dopiero potem zatwierdzasz cały nakład. Bez proofa ryzykujesz, że nakład 1000 sztuk nie będzie wyglądał tak, jak na monitorze.",
      },
      {
        question:
          "Czy mogę zamówić broszurę z otwartym grzbietem (szyte nicią widoczne)?",
        answer:
          "To inna kategoria produktu — szyte nicią z otwartym grzbietem. W klejonych oprawach grzbiet jest zawsze zamknięty i drukowalny. Jeśli chcesz widoczne szycie (popularne w albumach galeryjnych i monografiach naukowych), wybierz „Książki z oprawą szytą nicią” w konfiguratorze. Tam grzbiet zostaje odkryty i widać estetyczne ściegi.",
      },
    ],
    seoParagraph: [
      "Druk broszur klejonych online to wybór dla katalogów, raportów rocznych i materiałów konferencyjnych powyżej 48 stron. DobrePrinty realizuje druk broszur klejonych w A5 i A4, z liczbą stron od 48 do 200, klejeniem hotmelt lub PUR (opcja premium), zawsze z folią matową na okładce w cenie podstawowej. Konfigurator pokazuje cenę brutto z VAT i konkretny termin realizacji od razu po wybraniu parametrów.",
      "Klejenie hotmelt to standard dla broszur klejonych — klej termiczny po stwardnieniu trzyma blok stabilnie przez lata. Tania drukarnia broszur klejonych nie może oszczędzać na jakości kleju, bo skutek widać dopiero po kilku miesiącach — pęknięty grzbiet w bibliotekach klientów. W DobrePrinty testujemy każdą partię klejów u partnerów: 5 kg obciążenia na otwartą broszurę przez 30 sekund. Klej, który pęka, nie wchodzi do produkcji.",
      "Druk broszur klejonych w 28-osobowej sieci drukarni partnerskich pozwala obsłużyć zarówno mikronakłady (25–100 sztuk, druk cyfrowy Konica Minolta), jak i większe (500+, offset). Dla nakładów premium polecamy klejenie PUR (klej poliuretanowy), które jest bardziej elastyczne i wytrzymuje skrajne temperatury. PUR rekomendujemy dla broszur używanych w terenie (instrukcje techniczne) i regularnie otwieranych (książki kucharskie, podręczniki).",
    ],
    aggregateRating: { value: "4.9", count: "420" },
    ctaCopy:
      "Wybierz liczbę stron, format i opcje okładki — broszury klejone drukujemy w 5–7 dni, folia matowa na okładce gratis.",
  },

  "broszury-szyte-nicia": {
    keyword: "książki szyte nicią",
    heroLead:
      "Druk książek z oprawą szytą nicią to najbardziej trwała oprawa, jaką możemy zaoferować. Szycie nicią pozwala otworzyć książkę na płasko bez ryzyka pękania stron, a blok wytrzymuje dziesięciolecia normalnego użytkowania. Idealne dla monografii naukowych, albumów galeryjnych, książek jubileuszowych i wydań ekskluzywnych. A5 lub A4, do 400 stron.",
    whyBlocks: [
      {
        tytul: "Trwałość liczona w dekadach",
        opis: "Książki szyte nicią to oprawa archiwalna — w bibliotekach narodowych książki szyte nicią z XIX wieku nadal działają. Klejone i szyte drutem mają trwałość 5–15 lat normalnego użytkowania, szyte nicią — 50+ lat. Wybór dla treści, które mają przetrwać.",
      },
      {
        tytul: "Otwiera się idealnie na płasko",
        opis: "Szycie nicią pozwala otworzyć książkę całkowicie płasko, bez „garba” na grzbiecie i bez ryzyka pęknięcia bloku. To kluczowe dla albumów galeryjnych z dużymi zdjęciami przechodzącymi przez środek i dla książek dla seniorów, którzy nie muszą trzymać stron palcami.",
      },
      {
        tytul: "Twarda lub miękka okładka",
        opis: "Domyślnie miękka okładka 350 g kreda mat z folią matową. Opcjonalnie twarda okładka — karton 2 mm pokryty papierem 130 g, wyklejka 120 g, kapitałka kolorowa. Twarda okładka dodaje ok. 60% do ceny, ale daje efekt książki wydawniczej.",
      },
      {
        tytul: "Do 400 stron treści",
        opis: "Szycie nicią obsługuje bloki od 96 do 400 stron środka. Powyżej 400 stron książka staje się zbyt ciężka do komfortowego czytania (>1,5 kg). Dla większych dzieł rekomendujemy oprawę dwutomową — tańsze i wygodniejsze niż jedna gruba księga.",
      },
    ],
    params: [
      {
        parametr: "Środek — papier",
        wartosc: "Kreda mat 135 g",
        opcje: "kreda mat 170 g, offset 90 g, papier ekologiczny 100 g",
      },
      { parametr: "Okładka miękka", wartosc: "Kreda mat 350 g + folia mat" },
      {
        parametr: "Okładka twarda",
        wartosc: "Karton 2 mm + papier 130 g + wyklejka",
        opcje: "płótno, ekoskóra",
      },
      {
        parametr: "Druk",
        wartosc: "4/4 (środek i okładka)",
        opcje: "1/1 środek dla powieści",
      },
      { parametr: "Format", wartosc: "A5, A4" },
      { parametr: "Liczba stron", wartosc: "96–400 (wielokrotność 16)" },
      {
        parametr: "Oprawa",
        wartosc: "Szycie nicią + klejenie grzbietu",
        opcje: "kapitałka kolorowa (opcja)",
      },
      { parametr: "Czas realizacji", wartosc: "7–10 dni roboczych" },
    ],
    filePrepIntro:
      "Plik do druku książek szytych nicią przygotowujesz podobnie jak do klejonej — pojedyncze strony środka + osobna okładka. Różnice są w marginesach (większe od grzbietu) i liczbie stron (wielokrotność 16, nie 4).",
    filePrepSteps: [
      {
        tytul: "1. Liczba stron — wielokrotność 16",
        opis: "Książki szyte nicią są zszywane w „składkach” po 16 stron (4 arkusze złożone na pół = 16 stron). Twoja książka musi mieć liczbę stron podzielną przez 16: 96, 112, 128, 144, 160… Jeśli masz 130 stron, dorzuć 14 pustych do 144 lub usuń 2 do 128.",
      },
      {
        tytul: "2. Większe marginesy od grzbietu",
        opis: "W szyciu nicią marginesy od strony grzbietowej muszą być większe niż w innych oprawach — minimum 15 mm dla A5, 18 mm dla A4. Powód: nici „pochłaniają” trochę przestrzeni przy oprawie, a książka otwiera się szerzej niż klejona, więc tekst zbyt blisko grzbietu jest niewidoczny.",
      },
      {
        tytul: "3. Okładka miękka — jak w klejonej",
        opis: "Okładka miękka: jeden plik z lewą klapką + grzbiet + prawą klapką + spadami. Grubość grzbietu = (liczba stron × 0,09 mm) + 0,7 mm (okładka 350 g). Dla 256 stron 135 g: grzbiet ok. 23 mm. Konfigurator oblicza to automatycznie.",
      },
      {
        tytul: "4. Okładka twarda — trzy elementy",
        opis: "Okładka twarda składa się z trzech elementów: przód, tył (każdy 25 mm większy z każdej strony od formatu netto — to zakładka na karton) i grzbiet (osobny plik z samą szerokością grzbietu). Plus wyklejka (papier 120 g, jeden plik) i opcjonalnie kapitałka (kolor wybierany z palety).",
      },
      {
        tytul: "5. Spady i marginesy bezpieczeństwa",
        opis: "Spady 3 mm na każdą krawędź dla środka. Dla okładki twardej zakładki na karton: 25 mm dookoła. Marginesy bezpieczeństwa zewnętrzne: 10 mm dla A5, 12 mm dla A4. Bardziej luźno niż w klejonej — szyte nicią mają większy budżet typograficzny.",
      },
      {
        tytul: "6. PDF/X-4, osobne pliki dla części",
        opis: "Środek (jeden PDF, wielostronicowy), okładka (jeden PDF, jedna strona z rozłożoną okładką), wyklejka (jeden PDF, jedna strona — opcjonalna grafika lub jednolity kolor), grzbiet osobny tylko dla twardej oprawy. Wszystkie w PDF/X-4 z CMYK.",
      },
    ],
    faqs: [
      {
        question: "Kiedy wybrać szycie nicią zamiast klejonej oprawy?",
        answer:
          "Gdy publikacja ma żyć dziesięciolecia (monografie naukowe, książki jubileuszowe, albumy rodzinne, książki dla bibliotek), gdy ma się otwierać idealnie płasko (albumy galeryjne, książki kucharskie z fotografiami) lub gdy szukasz najwyższej jakości wydania (książki autorskie, wydania ekskluzywne, prezenty). Cena jest 2–3× wyższa od klejonej, ale trwałość 10× większa.",
      },
      {
        question: "Czy mogę zamówić książkę szytą nicią w nakładzie 50 sztuk?",
        answer:
          "Tak, minimum to 25 sztuk. Przy 25 sztukach A5 144-stronicowej z miękką okładką koszt to ok. 32 zł brutto za sztukę, przy 100 sztukach — 18 zł, przy 500 — 10 zł. Twarda okładka dodaje ok. 60% do ceny. Szycie nicią to oprawa wymagająca ręcznego nadzoru przy nakładach do 100 sztuk, dlatego koszt jednostkowy jest wyższy niż w innych oprawach.",
      },
      {
        question: "Jakie kolory kapitałek macie do wyboru?",
        answer:
          "12 kolorów standardowych: biała, czarna, czerwona, granatowa, zielona, żółta, pomarańczowa, fioletowa, szara, beżowa, złota i srebrna. Kapitałka to wzmocniony pasek nici na góra/dół grzbietu — element estetyczny i strukturalny. W konfiguratorze wybierasz z palety. Niestandardowy kolor kapitałki dostępny na zamówienie (+72 h).",
      },
      {
        question: "Czy oferujecie okładki płócienne lub z ekoskóry?",
        answer:
          "Tak, ale tylko dla nakładów 50+ z minimalnym wyprzedzeniem 14 dni. Płótno (5 kolorów: granat, bordo, zielony, szary, czarny) i ekoskóra (4 kolory: czarna, brązowa, bordo, granat) to opcje premium do książek jubileuszowych i firmowych. Cena za jednostkę: +35 zł vs standardowa twarda okładka. Tłoczenie złotem dostępne za dopłatą.",
      },
      {
        question: "Ile czasu zajmuje druk książki szytej nicią?",
        answer:
          "7–10 dni roboczych dla miękkiej okładki, 10–14 dni dla twardej. Powód: po druku środka trzeba pociąć go na składki, każdą zszyć nicią (do 100 sztuk ręcznie, powyżej — maszynowo), skleić bloki, oprawić w okładkę, poczekać na utwardzenie kleju. Twarda okładka dochodzi: produkcja kartonu, oklejanie papierem, suszenie. Konfigurator pokazuje konkretny termin.",
      },
      {
        question: "Czy mogę dostać próbny egzemplarz przed nakładem?",
        answer:
          "Tak — przy nakładach 100+ rekomendujemy zamówienie 1 sztuki próbnej w docelowej specyfikacji za ok. 80–200 zł (zależnie od formatu i okładki). Sprawdzasz kolory, jakość szycia, papier, okładkę — i dopiero potem zatwierdzasz nakład. Dla wydań premium (twarda okładka, płótno) próbny egzemplarz jest praktycznie obowiązkowy.",
      },
      {
        question: "Jakie są zastosowania książek szytych nicią w biznesie?",
        answer:
          "Najczęściej: monografie wydziałowe uczelni (UW, SGH, UJ, UAM), albumy promocyjne miast (np. „Kraków — 700 lat”), książki jubileuszowe firm (10/25/50 lat istnienia), prezenty biznesowe od korporacji (np. „Historia ABC Sp. z o.o.”), katalogi galerii sztuki, książki kucharskie szefów kuchni, publikacje muzeów (UNESCO, Wawel). Wybór klientów premium.",
      },
    ],
    seoParagraph: [
      "Druk książek z oprawą szytą nicią online to najwyższa jakość wśród oferowanych przez nas opraw. DobrePrinty realizuje druk książek szytych nicią w A5 i A4, z miękką lub twardą okładką, z opcją płótna i ekoskóry dla wydań premium. Szycie nicią to oprawa archiwalna — w bibliotekach narodowych książki szyte nicią z XIX wieku nadal funkcjonują, podczas gdy klejone i szyte drutem mają trwałość 5–15 lat normalnego użytkowania.",
      "Tania drukarnia książek szytych nicią nie istnieje — ten format wymaga ręcznego lub półautomatycznego nadzoru przy nakładach do 200 sztuk. Cena jednostkowa jest 2–3× wyższa od klejonej, ale uzasadniona dla treści, które mają żyć dziesięciolecia: monografii naukowych, albumów rodzinnych, książek jubileuszowych firm, publikacji muzeów i galerii sztuki. W DobrePrinty dobieramy partnera, który specjalizuje się w szyciu nicią — nie każda drukarnia ma do tego maszyny i operatorów.",
      "Książki szyte nicią mają jeszcze jedną zaletę nieoczywistą dla osób przyzwyczajonych do klejonych: otwierają się idealnie na płasko, bez „garba” na grzbiecie. To kluczowe dla albumów galeryjnych z dużymi zdjęciami przechodzącymi przez środek, dla książek kucharskich (które leżą otwarte na stole roboczym), dla publikacji dla seniorów (którzy nie muszą trzymać stron palcami) i dla nauk technicznych z mapami i schematami przekraczającymi pojedynczą stronę.",
    ],
    aggregateRating: { value: "5.0", count: "180" },
    ctaCopy:
      "Wybierz format, liczbę stron i okładkę — książki szyte nicią to oprawa, która przetrwa dekady. Czas realizacji 7–14 dni.",
  },

  "roll-up": {
    keyword: "roll-up",
    heroLead:
      "Druk roll-upów online z dostawą całej Polsce w 24–48 h. Roll-up to mobilna reklama, którą rozkładasz w 30 sekund i pakujesz w 30 sekund — bez śrubek, narzędzi i instrukcji. W cenie zawsze: aluminiowy stelaż, blockout 200 g z drukiem laserowym, pokrowiec transportowy. Trzy formaty: 85 × 200 cm, 100 × 200 cm, 120 × 200 cm.",
    whyBlocks: [
      {
        tytul: "Wszystko w komplecie",
        opis: "Stelaż aluminiowy, blockout z drukiem, pokrowiec transportowy z paskiem — wszystko w jednej paczce. Bez kompletowania osobno, bez dopłaty za stelaż „bo standard miał plastikowy”. Otwierasz paczkę, składasz w 30 sekund, prezentujesz.",
      },
      {
        tytul: "Blockout 200 g — nie prześwieca",
        opis: "Blockout to specjalny materiał z czarnym rdzeniem między dwiema warstwami białymi. Efekt: druk z jednej strony nie prześwieca na drugą stronę, nawet pod silnym oświetleniem stoiskowym. Standardem na rynku często jest matówka 150 g, która prześwieca — u nas zawsze blockout 200 g.",
      },
      {
        tytul: "Druk laserowy ekosolwentowy",
        opis: "Druk roll-upów robimy laserem ekosolwentowym (np. Roland VersaUV) — daje fotograficzną jakość, intensywne kolory i odporność na UV przez 12+ miesięcy. Druk wodny (tańszy) blaknie po 3–6 miesiącach pod oświetleniem konferencyjnym. U nas zawsze ekosolwent.",
      },
      {
        tytul: "Dostawa w 24–48 h",
        opis: "Roll-up to produkt zwykle pilny — konferencja jutro, premiera w piątek, stoisko w sobotę. Produkcja standardowych roll-upów (1 strona, 1 grafika) trwa 24 h od potwierdzenia pliku. Kurier dokłada 1 dzień roboczy. Zamówienie w środę = roll-up w czwartek po południu.",
      },
    ],
    params: [
      { parametr: "Materiał", wartosc: "Blockout 200 g (nieprzezroczysty)" },
      { parametr: "Druk", wartosc: "Laser ekosolwentowy (Roland VersaUV)" },
      {
        parametr: "Stelaż",
        wartosc: "Aluminium srebrne",
        opcje: "aluminium czarne, premium z podświetleniem LED",
      },
      {
        parametr: "Format (szer. × wys.)",
        wartosc: "85 × 200, 100 × 200, 120 × 200 cm",
      },
      {
        parametr: "W komplecie",
        wartosc: "Stelaż + blockout + pokrowiec",
        opcje: "torba transportowa premium",
      },
      { parametr: "Gwarancja stelaża", wartosc: "12 miesięcy" },
      {
        parametr: "Trwałość druku",
        wartosc: "12+ miesięcy pod oświetleniem konferencyjnym",
      },
      { parametr: "Czas realizacji", wartosc: "24–48 h" },
    ],
    filePrepIntro:
      "Plik do druku roll-upa to jeden PDF lub TIFF o rozmiarze docelowym + spady. Poniżej szczegóły specyficzne dla wielkoformatowego druku ekosolwentowego.",
    filePrepSteps: [
      {
        tytul: "1. Ustaw format z spadami",
        opis: "Format 85 × 200 cm z 3 cm spadu w dolnej części (chowa się w stelażu) + 0,5 cm spadów po bokach i górze = plik 86 × 203,5 cm. Konfigurator pokazuje szablon z linią cięcia, linią bezpieczeństwa i obszarem schowanym w stelażu.",
      },
      {
        tytul: "2. Marginesy bezpieczeństwa",
        opis: "Dolne 25 cm = obszar schowany w stelażu po rozłożeniu (nie zostaną widoczne). Górne 10 cm — obszar widoczny, ale często zakryty przez kasetę zwijającą. Wszystkie kluczowe treści (logo, headline, CTA) trzymaj w górnym 70% widocznego obszaru.",
      },
      {
        tytul: "3. Skala 1:1, rozdzielczość 100–150 dpi",
        opis: "Pracuj w skali 1:1 (rzeczywisty rozmiar 85 × 200 cm), z rozdzielczością 100–150 dpi. To wystarczy do druku ekosolwentowego z dystansu 1+ metra (typowa odległość oglądania roll-upa). Wyższa rozdzielczość = większy plik bez zauważalnej poprawy jakości.",
      },
      {
        tytul: "4. CMYK lub RGB? — używaj CMYK",
        opis: "Druk roll-upów to CMYK ekosolwentowy z opcją CMYK + kolory specjalne (PMS). Jeśli masz w grafice kolor brandowy w PMS, oznacz go w pliku — drukarnia podejmie próbę dopasowania. RGB zostanie automatycznie skonwertowane do CMYK, ale niektóre intensywne kolory (jaskrawy niebieski, neon) wyjdą mniej nasycone.",
      },
      {
        tytul: "5. Czcionki — minimum 24 pt na headline",
        opis: "Roll-up jest oglądany z dystansu 1–3 metrów. Headline trzymaj minimum 100 pt (3,5 cm wysokości fontu), treść główna 60 pt (2 cm), drobny tekst 24 pt (8 mm). Mniejszy tekst będzie nieczytelny z normalnej odległości stoiska.",
      },
      {
        tytul: "6. Eksport do PDF/X-4 lub TIFF CMYK",
        opis: "PDF/X-4 to standard pre-press z osadzonymi fontami i profilem ICC. TIFF CMYK 150 dpi to alternatywa, jeśli masz problemy z PDF-em (rzadko). Zawsze flatten — bez warstw, bez przezroczystości, wszystko spłaszczone. Plik ostateczny: 50–150 MB dla 85 × 200 cm.",
      },
    ],
    faqs: [
      {
        question: "Jaki format roll-upa wybrać?",
        answer:
          "85 × 200 cm to klasyk dla stoisk targowych i konferencji — zajmuje mało miejsca, łatwo transportowalny w bagażu samochodowym. 100 × 200 cm — większa powierzchnia grafiki, lepsza widoczność z dalszej odległości. 120 × 200 cm — premium, używany w lobby biurowców i przy prezentacjach wymagających dużej powierzchni wizualnej. Standardem korporacyjnym jest 85 cm lub 100 cm.",
      },
      {
        question: "Czy mogę używać roll-upa na zewnątrz?",
        answer:
          "W ograniczonym zakresie — tak. Roll-up nie jest produktem outdoor, ale przy spokojnej pogodzie (bez wiatru >15 km/h, bez deszczu) możesz go używać przy wejściach do budynków lub na zadaszonych stoiskach. Na otwartym powietrzu w wietrze polecamy stelaże ciężkie (3–4× droższe) lub roll-upy outdoor z wodoodpornym materiałem (osobna kategoria — na zamówienie).",
      },
      {
        question: "Czy stelaż ma gwarancję?",
        answer:
          "Tak, 12 miesięcy na stelaż aluminiowy. Najczęstsza usterka to pęknięcie mechanizmu zwijającego po intensywnym użytkowaniu (10+ rozkładań tygodniowo). Stelaż wymieniamy bez pytań — odsyłasz uszkodzony, otrzymujesz nowy w 5 dni. Grafika (blockout) nie podlega gwarancji, bo zużycie zależy od użytkowania.",
      },
      {
        question: "Czy mogę wymienić grafikę bez kupowania nowego stelaża?",
        answer:
          "Tak. Standardem jest sprzedaż blockoutu z grafiką oddzielnie od stelaża. Cena samej grafiki 85 × 200 cm to ok. 85–110 zł brutto, podczas gdy zestaw stelaż + grafika to 165 zł. Wymiana wymaga wyciągnięcia starego blockoutu z kasety zwijającej (5 minut) i wsunięcia nowego. Trzymaj stelaż, wymieniaj grafikę co kampanię.",
      },
      {
        question: "Ile czasu zajmuje druk roll-upa?",
        answer:
          "24–48 h dla standardowych zamówień. Express 12 h dostępny za dopłatą 50% — wgrywasz plik do 12:00, odbierasz wydrukowany roll-up u kuriera tego samego dnia po 19:00. Dla zamówień 10+ roll-upów: 48–72 h, bo druk wymaga większej przygotowalni laserowej. Konfigurator pokazuje konkretny termin po wybraniu opcji.",
      },
      {
        question: "Czy oferujecie roll-upy ze podświetleniem LED?",
        answer:
          "Tak, jako opcja premium. Stelaż z taśmą LED wbudowaną w boczne ramiona kasety zwijającej — daje równomierne podświetlenie grafiki, idealne dla stoisk konferencyjnych w słabym oświetleniu. Cena: 380 zł brutto vs 165 zł za standardowy zestaw. Bateria akumulatorowa działa 6 h ciągłego świecenia.",
      },
      {
        question: "Czy zwroty są możliwe?",
        answer:
          "Roll-up to produkt personalizowany (z Twoim plikiem), więc nie podlega zwrotom na zasadach kodeksu cywilnego. Reklamacje rozpatrujemy tylko za wady fabryczne (pęknięty stelaż, uszkodzona kaseta, błędy druku) i wymieniamy lub zwracamy pieniądze. Jeśli plik ma błąd Twojego projektu (literówka, złe logo), nie jest to wada fabryczna — sprawdzaj plik przed potwierdzeniem.",
      },
    ],
    seoParagraph: [
      "Druk roll-upów online to klasyczna pozycja w katalogu DobrePrinty. Roll-up to mobilna reklama nadająca się do wszystkich stoisk targowych, konferencji, premier produktowych, prezentacji w lobby biurowców i imprez okolicznościowych. Drukujemy roll-upy w trzech formatach (85, 100, 120 cm szerokości), zawsze z blockoutem 200 g i drukiem ekosolwentowym o 12-miesięcznej odporności na UV. Konfigurator pokazuje cenę brutto z VAT od razu po wybraniu formatu.",
      "Tania drukarnia roll-upów nie musi oszczędzać na blockoucie ani na druku. Standardem rynkowym jest często blockout 150 g z drukiem wodnym, który po 3–6 miesiącach pod oświetleniem konferencyjnym widocznie blaknie. W DobrePrinty zawsze blockout 200 g (z czarnym rdzeniem, nie prześwieca) i druk ekosolwentowy z gwarancją intensywności kolorów przez 12+ miesięcy. Stelaż aluminiowy ma 12-miesięczną gwarancję na mechanizm.",
      "Druk roll-upów w 24–48 h pozwala obsłużyć pilne zamówienia: konferencje w przyszłym tygodniu, premiery produktowe, eventy okolicznościowe. Dla naprawdę pilnych terminów dostępna jest opcja express 12 h (dopłata 50%). Roll-up zamówiony w środę rano jest u Ciebie w czwartek po południu — wystarczy do prezentacji w piątek. Dla nakładów 10+ roll-upów polecamy z wyprzedzeniem 72 h, żeby zoptymalizować druk na laserze i nie wstrzymywać innych zamówień.",
    ],
    aggregateRating: { value: "4.8", count: "1320" },
    ctaCopy:
      "Wybierz format, wgraj plik — roll-up dostarczamy w 24–48 h z stelażem, blockoutem i pokrowcem w komplecie.",
  },

  "papier-firmowy": {
    keyword: "papier firmowy",
    heroLead:
      "Druk papieru firmowego online to drobiazg, który zostaje w pamięci. Każdy dokument robi inne wrażenie, gdy wychodzi na firmowym papierze — z logo, adresem, NIP-em i danymi kontaktowymi w nagłówku i stopce. Drukujemy papier firmowy w A4 i A5, na offsecie biały 90 g, w pełnym kolorze 4/0 lub jednostronnym 1/0. Dostawa 2 dni robocze, pakowanie po 100 sztuk w opaskę papierową.",
    whyBlocks: [
      {
        tytul: "Standardowy offset 90 g",
        opis: "Offset biały 90 g to klasyczny papier firmowy — wystarczająco sztywny, żeby dokumenty miały „wagę”, ale wciąż kompatybilny ze standardowymi drukarkami biurowymi (do których go potem włożysz, żeby drukować treść). 80 g jest zbyt cienki, 120 g się nie miesci w niektórych podajnikach.",
      },
      {
        tytul: "Druk 4/0 lub 1/0",
        opis: "4/0 = pełny kolor jednostronnie (najczęściej wybierany, logo, nazwa, kolorowy nagłówek). 1/0 = jeden kolor jednostronnie (np. tylko czarny, klasyka dla kancelarii prawnych i biur doradczych). Dwustronny papier firmowy nie ma sensu — drugą stronę i tak zamalujesz treścią dokumentu.",
      },
      {
        tytul: "Pakowanie po 100 sztuk",
        opis: "Każde 100 sztuk papieru firmowego dostajesz w opasce papierowej, w pudełku zabezpieczającym. Łatwo dawkujesz do drukarki, nic się nie kruszy w transporcie. Standardowy nakład to 500–2000 sztuk, czyli 5–20 opasek po 100 sztuk.",
      },
      {
        tytul: "Kompatybilny z każdą drukarką biurową",
        opis: "Papier firmowy drukujemy na offsecie nieobciążonym mikrofalami (które są w niektórych „premium” papierach i powodują zacięcia w drukarkach laserowych). Nasza wersja przechodzi przez każdą drukarkę: HP, Canon, Brother, Xerox, Konica Minolta — w trybie zwykłym lub dupleksowym.",
      },
    ],
    params: [
      {
        parametr: "Papier",
        wartosc: "Offset biały 90 g",
        opcje: "offset 100 g, offset kremowy 90 g",
      },
      {
        parametr: "Druk",
        wartosc: "4/0 (kolor jednostronny)",
        opcje: "1/0 (jednokolorowy), 4/4 dla papieru dwustronnego",
      },
      {
        parametr: "Format",
        wartosc: "A4 (210 × 297 mm)",
        opcje: "A5 (148 × 210 mm)",
      },
      {
        parametr: "Wykończenie",
        wartosc: "Cięcie do formatu",
        opcje: "perforacja, bigowanie",
      },
      { parametr: "Pakowanie", wartosc: "Opaska papierowa po 100 szt." },
      { parametr: "Minimalny nakład", wartosc: "100 sztuk" },
      {
        parametr: "Kompatybilność",
        wartosc: "Drukarki laserowe i atramentowe",
      },
      { parametr: "Czas realizacji", wartosc: "48 h" },
    ],
    filePrepIntro:
      "Plik do druku papieru firmowego to typowo jeden PDF z grafiką nagłówka i stopki. Poniżej krok po kroku, jak go przygotować.",
    filePrepSteps: [
      {
        tytul: "1. Format A4 z spadami",
        opis: "Dokument A4 (210 × 297 mm) z 3 mm spadu na każdą krawędź = 216 × 303 mm. Spady ważne, jeśli masz tło lub kolorowy nagłówek dochodzący do krawędzi. Jeśli nagłówek i stopka mają białe tło, spady nie są krytyczne — ale zostaw je dla pewności.",
      },
      {
        tytul: "2. Pozycja nagłówka",
        opis: "Nagłówek (logo, nazwa firmy, dane kontaktowe) trzymaj w górnych 4 cm dokumentu — pozostałe 25 cm zostawiasz wolne na treść, którą sam wydrukujesz później. Marginesy: 2 cm z lewej (na dziurkowanie do segregatora), 1,5 cm z prawej, 1,5 cm góra/dół.",
      },
      {
        tytul: "3. Pozycja stopki",
        opis: "Stopka (NIP, REGON, KRS, adres rejestrowy, numer konta) w dolnych 2,5 cm. Font 8–9 pt — to dane obowiązkowe na fakturach, ale nie powinny dominować nad treścią. Wystarczy 2–3 linijki tekstu w stopce.",
      },
      {
        tytul: "4. CMYK i fonty w krzywych",
        opis: "Standard pre-press: CMYK ISO Coated v2 (ECI), fonty na krzywe (outlines) lub osadzone. Czarne logo: K100 jeśli na białym tle, rich black (C40 M30 Y30 K100) jeśli na kolorowym tle. Brand color w PMS — oznacz w pliku, drukarnia spróbuje dopasować.",
      },
      {
        tytul: "5. Uwzględnij dane prawne",
        opis: "Na każdym papierze firmowym muszą być (zgodnie z art. 206 KSH dla sp. z o.o. i art. 374 KSH dla S.A.): pełna nazwa firmy, forma prawna (sp. z o.o., S.A., spółka jawna), adres siedziby, NIP, REGON, KRS, kapitał zakładowy (sp. z o.o., S.A.). Brak tych danych grozi karą.",
      },
      {
        tytul: "6. Eksport do PDF/X-4 jako jedna strona",
        opis: "Jeden plik PDF z jedną stroną — to jeden wzór papieru firmowego. Drukujemy go w nakładzie 100, 250, 500, 1000 lub więcej sztuk identycznych. Jeśli masz dwa różne wzory (np. dla dyrektora i dla działu sprzedaży), zamów osobno — to dwa różne nakłady.",
      },
    ],
    faqs: [
      {
        question: "Jaki papier wybrać do drukarki laserowej?",
        answer:
          "Offset biały 90 g — to standard, który przechodzi przez każdą drukarkę bez zacięć. Niektóre „premium” papiery firmowe na rynku mają mikropowłoki, które przy temperaturze 200°C w drukarce laserowej topnieją i powodują zacięcia. Nasz offset 90 g jest typowym papierem biurowym z gładką, ale niepowlekaną powierzchnią — bezpieczny dla każdej drukarki.",
      },
      {
        question: "Czy mogę dorzucić swój znak wodny lub miarki?",
        answer:
          "Tak. Znak wodny (np. logo półprzezroczyste w środku dokumentu) i miarki (linie poziome) to standardowe elementy. Drukujemy je razem z nagłówkiem i stopką w jednym przebiegu druku. Znak wodny w postaci „półprzezroczystej” osiągamy przez druk 4/0 z grafiką w jasnym odcieniu (10–20% intensywności).",
      },
      {
        question: "Czy oferujecie perforację lub bigowanie?",
        answer:
          "Tak, jako opcje. Perforacja (linia perforacyjna do oderwania kuponu lub dolnej części) i bigowanie (linia zagięcia, np. dla papieru, który ma być składany do koperty C5) dostępne jako wykończenia za dopłatą ok. 15% do ceny. Wymagają wskazania w pliku linii (warstwa pomocnicza) i potwierdzenia w konfiguratorze.",
      },
      {
        question: "Ile czasu zajmuje druk papieru firmowego?",
        answer:
          "48 h od potwierdzenia pliku, niezależnie od nakładu (100 sztuk czy 5000). Powód: druk to jeden przebieg ofsetu lub laserowy, czas druku nie zmienia się znacząco. Dla nakładów >5000 czas może wynosić 72 h, bo druk wymaga dłuższego nadzoru pracy maszyny. Kurier dokłada 1 dzień roboczy — paczka u Ciebie w 3 dni robocze.",
      },
      {
        question: "Czy mogę zamówić papier firmowy w nakładzie 100 sztuk?",
        answer:
          "Tak, minimum to 100 sztuk. Cena za 100 sztuk A4 z drukiem 4/0 to ok. 75 zł brutto (0,75 zł za sztukę), 250 sztuk — 110 zł (0,44 zł), 500 sztuk — 145 zł (0,29 zł), 1000 sztuk — 215 zł (0,22 zł). Spadek ceny jednostkowej z nakładem jest znaczący — większe nakłady są zdecydowanie ekonomiczniejsze.",
      },
      {
        question:
          "Czy papier firmowy jest dostępny w innych kolorach niż biały?",
        answer:
          "Tak — opcjonalnie offset kremowy 90 g (klasyk dla kancelarii prawnych) i offset ecru 90 g (papier z lekkim odcieniem beżu, używany w branży eventowej). Cena: ok. 15% więcej niż biały. Inne kolory (niebieski, zielony) dostępne na zamówienie specjalne z wyprzedzeniem 14 dni i minimalnym nakładem 500 sztuk.",
      },
      {
        question: "Czy oferujecie identyczną grafikę na kopertach?",
        answer:
          "To osobny produkt — koperty firmowe nie są dostępne w bieżącej ofercie DobrePrinty, ale możemy zrealizować je na zamówienie specjalne (z wyprzedzeniem 7 dni). Koperty C6, DL, C5 z nadrukiem 4/0 to popularne uzupełnienie papieru firmowego. Zapytaj biuro obsługi o ofertę.",
      },
    ],
    seoParagraph: [
      "Druk papieru firmowego online to standardowa pozycja w katalogu drukarni — i w DobrePrinty realizujemy go w wersji uproszczonej, ale konkurencyjnej cenowo. Papier firmowy A4 lub A5, offset biały 90 g, druk 4/0 w pełnym kolorze lub 1/0 jednokolorowy. Pakowanie po 100 sztuk w opaskę papierową, dostawa 2 dni robocze. Konfigurator pokazuje cenę brutto z VAT od razu po wybraniu nakładu — bez gwiazdek, bez dopłat.",
      "Papier firmowy to nadal podstawowe narzędzie B2B, mimo digitalizacji wielu procesów. Faktury, oferty wstępne, listy intencyjne, pisma urzędowe i korespondencja z klientami — wszystko to nadal wymaga papieru z firmowym logo i danymi rejestrowymi. Tania drukarnia papieru firmowego pozwala obsłużyć zarówno mikroprzedsiębiorców (nakład 100–250 sztuk dla freelancera), jak i większe firmy (1000–5000 sztuk dla działu sprzedaży korporacji).",
      "Druk papieru firmowego musi spełniać wymogi prawne: każdy egzemplarz musi zawierać dane obowiązkowe zgodnie z KSH (pełna nazwa firmy, forma prawna, adres siedziby, NIP, REGON, KRS, kapitał zakładowy). Klient odpowiada za poprawność tych danych, ale my przy preflight sprawdzamy, czy stopka zawiera minimalny zestaw informacji — jeśli brakuje istotnego elementu (np. NIP-u), zwracamy uwagę przed drukiem. Drobiazg, który chroni Klienta przed karami administracyjnymi.",
    ],
    aggregateRating: { value: "4.8", count: "780" },
    ctaCopy:
      "Wgraj plik z nagłówkiem i stopką — papier firmowy drukujemy w 48 h, pakowane po 100 sztuk w opaskę papierową.",
  },

  wizytowki: {
    keyword: "wizytówki",
    heroLead:
      "Druk wizytówek online to nasza najszybsza pozycja w katalogu — produkujemy w 24 h, nadajemy następnego dnia. Wizytówki na kartonie 350 g kreda mat, druk 4/4 dwustronny, narożniki proste. Dwa formaty: klasyczny 85 × 55 mm i europejski 90 × 50 mm. Pakowanie po 100 sztuk w pudełku zabezpieczającym. Dostawa 1–2 dni robocze.",
    whyBlocks: [
      {
        tytul: "Druk wizytówek w 24 h",
        opis: "Wizytówki są technicznie najprostszym produktem w naszej ofercie — mały format, jednolity papier, mały plik. Dlatego produkujemy je w 24 h od potwierdzenia pliku. Zamówienie w środę rano = paczka w piątek. Express 12 h dostępny za dopłatą (dla naprawdę pilnych spotkań).",
      },
      {
        tytul: "Karton 350 g kreda mat",
        opis: "350 g to standard premium dla wizytówek — wystarczająco sztywne, żeby wizytówka „trzymała się” w portfelu, ale nie zbyt grube, żeby się nie dawało wsunąć do typowej szczelinki na karty. 300 g też dostępne (taniej, mniej premium), 400 g dla branży kreatywnej z folią matową.",
      },
      {
        tytul: "Druk 4/4 dwustronny",
        opis: "Standardem jest druk 4/4 — przód z imieniem, nazwiskiem, telefonem, e-mailem, tył z logo lub claimem firmy. To wykorzystuje całą powierzchnię wizytówki. 4/0 jednostronny dostępny taniej, ale rzadziej zamawiany — większość wizytówek B2B wykorzystuje dwie strony.",
      },
      {
        tytul: "Folia matowa lub błyszcząca",
        opis: "Opcjonalna folia matowa daje premium look i odporność na zarysowanie, idealna dla wizytówek noszonych długo w portfelu. Folia błyszcząca intensyfikuje kolory, dobrze działa przy logo z gradientami lub fotografii. Folia dodaje 48 h do czasu realizacji i ok. 35% do ceny.",
      },
    ],
    params: [
      {
        parametr: "Papier",
        wartosc: "Karton kreda mat 350 g",
        opcje: "kreda błysk 350 g, karton 300 g, karton 400 g",
      },
      {
        parametr: "Druk",
        wartosc: "4/4 (dwustronny)",
        opcje: "4/0 (jednostronny)",
      },
      { parametr: "Format klasyczny", wartosc: "85 × 55 mm" },
      { parametr: "Format europejski", wartosc: "90 × 50 mm" },
      {
        parametr: "Narożniki",
        wartosc: "Proste",
        opcje: "zaokrąglone R3 lub R6 (dopłata)",
      },
      {
        parametr: "Wykończenie",
        wartosc: "Standard",
        opcje:
          "folia mat, folia błysk, lakier UV punktowy, tłoczenie folią złotą",
      },
      { parametr: "Pakowanie", wartosc: "Pudełko z gumką, 100 szt." },
      {
        parametr: "Czas realizacji",
        wartosc: "24 h (standard), 12 h (express)",
      },
    ],
    filePrepIntro:
      "Plik do druku wizytówek to jeden PDF z dwoma stronami: str. 1 = przód, str. 2 = tył. Format z spadami. Poniżej szczegóły.",
    filePrepSteps: [
      {
        tytul: "1. Format z spadami 3 mm",
        opis: "Klasyczna wizytówka 85 × 55 mm + 3 mm spadu na każdą krawędź = plik 91 × 61 mm. Europejska 90 × 50 mm + spady = 96 × 56 mm. Pracujesz w skali 1:1, w rzeczywistym rozmiarze.",
      },
      {
        tytul: "2. Marginesy bezpieczeństwa 4 mm",
        opis: "Tekst (imię, telefon, e-mail, adres) trzymaj minimum 4 mm od krawędzi netto. Mniejsze marginesy → ryzyko obcięcia tekstu przy minimalnych odchyleniach gilotyny. Logo z spadem do krawędzi: tak, jeśli ma tło kolorowe.",
      },
      {
        tytul: "3. Font min. 7 pt",
        opis: "Najmniejszy czytelny font na wizytówce to 7 pt — przy mniejszej wielkości tekst staje się rozmyty. Imię i nazwisko: 11–14 pt. Stanowisko: 8–9 pt. Dane kontaktowe: 7–9 pt. Nie próbuj wcisnąć wszystkiego na 6 pt — wizytówka stanie się nieczytelna.",
      },
      {
        tytul: "4. CMYK i fonty w krzywych",
        opis: "Standard: CMYK ISO Coated v2 (ECI), fonty na krzywe lub osadzone. Czarna typografia: K100. Kolorowe logo: jeśli masz PMS, oznacz w pliku — drukarnia spróbuje dopasować w CMYK lub spot color (premium, dopłata).",
      },
      {
        tytul: "5. Zdjęcia min. 300 dpi",
        opis: "Jeśli na wizytówce jest zdjęcie (typowe dla agentów nieruchomości i adwokatów), minimum 300 dpi w docelowym rozmiarze. Zdjęcie 3 × 4 cm wymaga 354 × 472 px. Sprawdź w programie graficznym wartość dpi po przeskalowaniu — niektóre programy domyślnie ustawiają 72 dpi i zdjęcie wychodzi nieostre.",
      },
      {
        tytul: "6. Eksport do PDF/X-4 jako 2 strony",
        opis: "Jeden plik PDF z dwiema stronami w kolejności: str. 1 = przód, str. 2 = tył. NIE łącz przodu i tyłu na jednej stronie (np. obok siebie) — nasz preflight czeka na dwustronicowy plik. Eksport z presetu „[PDF/X-4:2008]”, bez warstw, ze spłaszczoną przezroczystością.",
      },
    ],
    faqs: [
      {
        question: "Ile czasu zajmuje druk wizytówek?",
        answer:
          "24 h dla standardowego zamówienia (karton 350 g, druk 4/4, bez folii) od potwierdzenia pliku. Wizytówki to nasz najszybszy produkt — wgrywasz plik w środę rano, wizytówki są u Ciebie w piątek po południu. Express 12 h dostępny za dopłatą 50% — plik do 12:00, paczka tego samego dnia po 19:00. Folia dodaje 48 h do terminu.",
      },
      {
        question: "Jaki karton wybrać do wizytówek?",
        answer:
          "Standardem premium jest karton 350 g kreda mat — sztywny, ale jeszcze mieści się w szczelinkach portfela. Dla wizytówek noszonych regularnie i wielokrotnie wręczanych: 350 g z folią matową (chroni przed zarysowaniem). Dla branży kreatywnej i ekskluzywnej: 400 g — wizytówka czuje się „cięższa” w dłoni, ale niektóre portfele jej nie przyjmują. 300 g — ekonomicznie, dla pracowników masowo wymieniających wizytówki na targach.",
      },
      {
        question: "Czy oferujecie zaokrąglone narożniki?",
        answer:
          "Tak, jako opcja. Zaokrąglenie R3 (małe, subtelne) lub R6 (większe, „designerskie”). Cena: dopłata ok. 25% za 100 sztuk. Wymaga wycinania laserowego po druku, więc termin wydłuża się o 48 h. Zaokrąglone narożniki rzadziej dostają „odbarwień” na krawędziach w portfelu, ale nie pasują do każdej estetyki.",
      },
      {
        question: "Czy mogę zamówić wizytówki z tłoczeniem folią złotą?",
        answer:
          "Tak. Tłoczenie folią złotą lub srebrną to opcja premium, używana dla logo lub inicjałów. Wymaga osobnego pliku z maską tłoczenia (warstwa wskazująca obszar tłoczenia) i wydłuża czas realizacji o 72 h. Cena: +120 zł za 100 sztuk. Efekt premium, ale tylko jeśli pasuje do brand identity firmy (kancelarie prawne, hotele, marki luksusowe).",
      },
      {
        question: "Czy mogę zamówić wizytówki w nakładzie 50 sztuk?",
        answer:
          "Tak, minimum to 50 sztuk, ale rekomendujemy 100+ dla optymalnej ceny jednostkowej. 50 sztuk = ok. 18 zł brutto (0,36 zł/szt.), 100 sztuk = 25 zł (0,25 zł/szt.), 500 sztuk = 65 zł (0,13 zł/szt.). Wizytówki są tanie w produkcji niezależnie od nakładu — w masowym zamówieniu znaczna jest oszczędność jednostkowa.",
      },
      {
        question: "Czy oferujecie wizytówki personalizowane (różne imiona)?",
        answer:
          "Tak — to opcja zaawansowana. Dla 5 osób w zespole z różnymi imionami / nazwiskami / stanowiskami zamawiasz „wizytówki personalizowane” — 5 różnych wzorów wizytówek po 100 sztuk każda (lub innym nakładzie). Cena: nakład × 1,4 (dopłata 40% za personalizację, bo druk wymaga zatrzymywania maszyny i wymiany pliku). Plik: jeden Excel z imionami + jeden szablon graficzny.",
      },
      {
        question: "Czy oferujecie projekt graficzny wizytówek?",
        answer:
          "Nie drukujemy z generatorów szablonów, bo wynik byłby uniwersalny i banalny. Polecamy współpracę z grafikiem freelancerem (200–600 zł za projekt) lub własną grafikę w Canva/Affinity Designer. Mamy darmowy szablon PSD/AI/PDF z marginesami i spadami — pobierz, podstaw treść, wyeksportuj. Dla najbardziej istotnych wizytówek (dyrektorzy, brand premium) zalecamy projekt u grafika.",
      },
    ],
    seoParagraph: [
      "Druk wizytówek online to klasyczna pozycja katalogu DobrePrinty — i nasza najszybsza pozycja w produkcji. Wizytówki 85 × 55 mm (klasyk) lub 90 × 50 mm (europejski), karton 350 g kreda mat, druk 4/4 dwustronny, narożniki proste lub zaokrąglone. Konfigurator pokazuje cenę brutto z VAT od razu, a 28 drukarni partnerskich pozwala produkować w 24 h dla standardowych zamówień. Wizytówki to drobiazg, który robi pierwsze wrażenie, więc warto go zrobić dobrze.",
      "Tania drukarnia wizytówek nie musi oznaczać kompromisu jakości. Standardem jest dla nas karton 350 g kreda mat — sztywne, premium, ale jeszcze mieści się w szczelinkach portfela. Dla wizytówek noszonych długo polecamy folię matową na okładce (chroni przed zarysowaniem). Dla branży premium (kancelarie prawne, hotele, marki luksusowe) — tłoczenie folią złotą lub srebrną. Opcje są szerokie, ale standard jest na tyle dobry, że większość zamówień nie wymaga dodatków.",
      "Druk wizytówek w 24 h to nasz produkt „awaryjny”. Jeśli rano w środę dowiedziałeś się, że masz prezentację u klienta w piątek i potrzebujesz wizytówek — wgrywasz plik do 12:00 w środę, paczka jest u Ciebie w czwartek po południu lub piątek rano. Express 12 h dla pilnych zamówień. Wizytówki to też produkt, w którym największe znaczenie ma jakość pliku — fonty na krzywe, CMYK, spady. Sprawdzamy każdy plik przed drukiem i jeśli coś jest nie tak, dzwonimy w ciągu 2 godzin roboczych.",
    ],
    aggregateRating: { value: "4.9", count: "2890" },
    ctaCopy:
      "Wgraj plik PDF — wizytówki drukujemy w 24 h, dostawa kurierem w 1–2 dni robocze. Pakowanie po 100 sztuk w pudełku z gumką.",
  },

  "kartki-pocztowki": {
    keyword: "kartki i pocztówki",
    heroLead:
      "Druk kartek i pocztówek online to ciepły, namacalny gest. Pocztówki drukujemy na kartonie 300 g kreda mat, druk 4/4 dwustronny, standardowo z polem adresowym i ramką znaczka na tylnej stronie. Trzy formaty: A6 (klasyk pocztówki), DL (długa pocztówka) i A5 (kartki świąteczne i okolicznościowe). Dostawa 3 dni robocze.",
    whyBlocks: [
      {
        tytul: "Karton 300 g kreda mat",
        opis: "Pocztówka musi być sztywna — ma przejść przez sortownię pocztową, kilka rąk listonosza i lądować w skrzynce odbiorcy. Karton 300 g kreda mat to standard, który wytrzymuje transport pocztowy bez zagięć. Cieńszy karton (250 g) ryzykuje zagniecenia, grubszy (350 g) może nie zmieścić się w skrzynce.",
      },
      {
        tytul: "Pole adresowe i ramka znaczka",
        opis: "Standardowo tył pocztówki ma podzielenie 50/50: lewa strona dla treści (życzeń, krótkiej wiadomości), prawa dla adresu odbiorcy. W prawym górnym rogu ramka znaczka. Wszystko gotowe do nadania pocztą — wystarczy nakleić znaczek i wrzucić do skrzynki.",
      },
      {
        tytul: "Trzy formaty do wyboru",
        opis: "A6 (105 × 148 mm) to klasyk pocztówki turystycznej. DL (100 × 210 mm) to dłuższy format dla pocztówek hotelowych i promocyjnych. A5 (148 × 210 mm) to kartki okolicznościowe (świąteczne, urodzinowe, ślubne, pogrzebowe). Każdy format dostępny w jednakowej cenie jednostkowej za karton 300 g.",
      },
      {
        tytul: "Standard nadawania pocztą",
        opis: "Pocztówki w naszych formatach mieszczą się w standardach Poczty Polskiej dla nadawania jako „kartka pocztowa” (najtańsza forma przesyłki, ok. 4 zł za sztukę). Nadawanie kartek A6 i DL kosztuje 3,30 zł za znaczek, A5 — wchodzi w stawkę „przesyłka standardowa” (4,50 zł). Idealne na masowe wysyłki marketingowe.",
      },
    ],
    params: [
      {
        parametr: "Papier",
        wartosc: "Karton kreda mat 300 g",
        opcje: "kreda błysk 300 g, karton ekologiczny 300 g",
      },
      {
        parametr: "Druk",
        wartosc: "4/4 (dwustronny)",
        opcje: "4/0 (jednostronny — bez pola adresowego)",
      },
      { parametr: "Format A6", wartosc: "105 × 148 mm" },
      { parametr: "Format DL", wartosc: "100 × 210 mm" },
      { parametr: "Format A5", wartosc: "148 × 210 mm" },
      {
        parametr: "Pole adresowe",
        wartosc: "Standardowo na tylnej stronie",
        opcje: "bez pola (dla projektów artystycznych)",
      },
      { parametr: "Pakowanie", wartosc: "Folie po 50 lub 100 sztuk" },
      { parametr: "Czas realizacji", wartosc: "72 h" },
    ],
    filePrepIntro:
      "Plik do druku pocztówek jest podobny do wizytówek: dwie strony PDF (przód i tył), CMYK, spady. Różnica w tym, że tył wymaga zachowania pola adresowego, jeśli pocztówka ma być nadawana.",
    filePrepSteps: [
      {
        tytul: "1. Format z spadami",
        opis: "A6 (105 × 148 mm) + 3 mm spadu = 111 × 154 mm. DL (100 × 210 mm) + spady = 106 × 216 mm. A5 (148 × 210 mm) + spady = 154 × 216 mm. Pracujesz w skali 1:1.",
      },
      {
        tytul: "2. Strona przednia — pełna kompozycja",
        opis: "Przód pocztówki to pełna kompozycja graficzna: zdjęcie, ilustracja, claim, ewentualnie logo. Marginesy bezpieczeństwa 4 mm od krawędzi netto. Tekst na zdjęciu — z białym tłem lub ciemnym fontem na jasnym obszarze. Zdjęcia min. 300 dpi w skali wydruku.",
      },
      {
        tytul: "3. Strona tylna — z polem adresowym",
        opis: "Tył dzieli się na trzy obszary: lewa połowa (treść/życzenia), prawa połowa (adres + znaczek). Linia podziału — opcjonalna, ale ułatwia wypełnienie. Pole adresowe minimum 4 linijki tekstu na adres + 2 cm wolne na prawej krawędzi na znaczek. Font drukowany na tle: czarny lub ciemnoszary, czytelny font (Helvetica, Arial, Open Sans).",
      },
      {
        tytul: "4. Tył bez pola adresowego — dla projektów artystycznych",
        opis: "Jeśli pocztówka jest projektem artystycznym (np. promocyjnym dla galerii sztuki) i nie będzie wysyłana pocztą, możesz zrezygnować z pola adresowego — w konfiguratorze odznaczasz „dodaj pole adresowe”. Wtedy tył jest dostępny w pełni dla grafiki/treści.",
      },
      {
        tytul: "5. CMYK i jakość zdjęć",
        opis: "Tak jak w pozostałych produktach: CMYK ISO Coated v2 (ECI), fonty na krzywe, zdjęcia min. 300 dpi. Dla pocztówek z fotografią (turystyczne, ślubne) zdjęcia są kluczowym elementem — warto upewnić się, że są wysokiej jakości i poprawnie skadrowane.",
      },
      {
        tytul: "6. Eksport do PDF/X-4 jako 2 strony",
        opis: "Jeden plik PDF z dwiema stronami: str. 1 = przód, str. 2 = tył. Jeśli zamawiasz pocztówki w kilku wariantach (np. 5 różnych zdjęć), zamów 5 osobnych nakładów. Konfigurator nie obsługuje „wymieszanego” nakładu z różnymi wzorami.",
      },
    ],
    faqs: [
      {
        question: "Czy pocztówki mogę nadać pocztą?",
        answer:
          "Tak, każdy nasz format (A6, DL, A5) mieści się w standardach Poczty Polskiej dla nadawania jako kartka pocztowa lub przesyłka standardowa. Wystarczy nakleić znaczek (3,30 zł dla A6/DL, 4,50 zł dla A5) i wrzucić do skrzynki nadawczej. Nie trzeba koperty — wpisujesz adres na tylnej stronie pocztówki i już.",
      },
      {
        question: "Jaki format wybrać do kartek świątecznych korporacyjnych?",
        answer:
          "A5 (148 × 210 mm) to standard dla korporacyjnych kartek świątecznych — większy format daje miejsce na pełną grafikę świąteczną na przodzie i obszerne życzenia w środku (po złożeniu na pół). A5 składany w połowie tworzy „kartkę otwieralną” — popularny format prezentowy. Bigujemy linię złożenia (dodatkowo +10% do ceny).",
      },
      {
        question: "Czy oferujecie kartki świąteczne z kopertami?",
        answer:
          "Koperty A6, DL i C5 (dla A5) nie są w standardowej ofercie, ale możemy je zrealizować jako zamówienie specjalne (z wyprzedzeniem 5–7 dni). Koperty białe lub kolorowe (kreda mat 100 g), bez nadruku lub z prostym nadrukiem 1/0. Typowy zestaw: 100 kartek A5 + 100 kopert C5 z białego papieru = ok. 195 zł brutto.",
      },
      {
        question: "Ile czasu zajmuje druk pocztówek?",
        answer:
          "72 h od potwierdzenia pliku, niezależnie od nakładu. Kurier dokłada 1 dzień roboczy. Zamówienie w poniedziałek = paczka w czwartek. Dla pilnych zamówień (np. kartki świąteczne na ostatnią chwilę) dostępny express 48 h za dopłatą 30%. Powyżej 1000 sztuk: 4–5 dni roboczych.",
      },
      {
        question: "Czy można drukować pocztówki bez pola adresowego?",
        answer:
          "Tak — to opcja dla projektów artystycznych, promocyjnych, kolekcjonerskich. Wtedy tylna strona jest pełna grafiki/treści, bez ramki znaczka i pola na adres. Takie pocztówki nie są przeznaczone do nadawania pocztą — wkładasz je do koperty z innym znaczkiem lub wręczasz osobiście. W konfiguratorze odznaczasz „dodaj pole adresowe”.",
      },
      {
        question: "Czy oferujecie pocztówki ekologiczne?",
        answer:
          "Tak — karton ekologiczny 300 g (recyclingowy, beżowy odcień) dostępny jako opcja za dopłatą 15%. Idealne dla marek o pozycjonowaniu eko (np. firmy z certyfikatem B Corp, kosmetyki naturalne, marki vegan). Druk na ekologicznym kartonie wychodzi nieco ciemniej i mniej nasycony — to świadomy wybór estetyczny, nie wada.",
      },
      {
        question:
          "Czy oferujecie tłoczenie folią złotą na kartkach świątecznych?",
        answer:
          "Tak — opcja premium dla kartek korporacyjnych. Tłoczenie złotą lub srebrną folią na elementach świątecznych (gwiazda, choinka, śnieżynka, monogram firmy). Wymaga osobnego pliku z maską tłoczenia i wydłuża czas realizacji o 72 h. Cena: +95 zł za 100 sztuk A5. Efekt premium, idealny dla kartek B2B do najważniejszych klientów.",
      },
    ],
    seoParagraph: [
      "Druk kartek i pocztówek online to w DobrePrinty pozycja sezonowa — największe nakłady realizujemy w listopadzie i grudniu (kartki świąteczne), w lutym (walentynki), w marcu (Dzień Kobiet, Wielkanoc) i jesienią (kartki dla branży eventowej). Pocztówki turystyczne i hotelowe drukujemy stale przez cały rok. Drukujemy na kartonie 300 g kreda mat w trzech formatach: A6 (klasyk pocztówki), DL (długa pocztówka), A5 (kartki okolicznościowe).",
      "Tania drukarnia kartek i pocztówek musi obsłużyć zarówno mikronakłady (50 sztuk dla małej firmy wysyłającej kartki świąteczne do kluczowych klientów), jak i duże (5000+ dla sieci hotelowej zamawiającej pocztówki promocyjne). Konfigurator pokazuje cenę brutto z VAT od razu po wybraniu nakładu, a 28 drukarni partnerskich pozwala dobrać partnera pod konkretne wymagania. Standardowy nakład dla kartek świątecznych B2B to 250–500 sztuk.",
      "Pocztówki nadawane pocztą są w polskim biznesie nadal popularnym narzędziem marketingowym — szczególnie dla branży hotelowej i turystycznej (pocztówki z miejscami pobytu wysyłane do byłych gości jako forma reaktywacji), dla branży eventowej (kartki z podziękowaniami po wydarzeniu), dla branży edukacyjnej (kartki z gratulacjami po ukończeniu kursu). Druk pocztówek z polem adresowym i ramką znaczka pozwala bezpośrednio nadać przesyłkę bez dodatkowego pakowania.",
    ],
    aggregateRating: { value: "4.8", count: "560" },
    ctaCopy:
      "Wybierz format i nakład — kartki i pocztówki drukujemy w 72 h, gotowe do nadania pocztą lub do wręczenia osobiście.",
  },

  plakaty: {
    keyword: "plakaty",
    heroLead:
      "Druk plakatów online to nasza specjalizacja dla wielkoformatu w skali B1/A0. Drukujemy plakaty na papierze satynowym 170 g, druk 4/0 jednostronny w pełnym kolorze. Pięć formatów do wyboru: A3, A2, A1, B1, A0. Każdy zamówiony plakat pakujemy w sztywną tubę kartonową, żeby transport nie pozostawił zagnieceń. Dostawa 3 dni robocze.",
    whyBlocks: [
      {
        tytul: "Papier satynowy 170 g",
        opis: "Satynowy 170 g to standard dla plakatów wewnętrznych (gabloty, witryny, wnętrza klubów i restauracji). Pół-mat, pół-błysk — minimalizuje refleksy z oświetlenia sklepowego, ale daje intensywniejsze kolory niż czysty mat. Dla plakatów outdoorowych dostępny papier blueback 135 g (do oklejania słupów reklamowych).",
      },
      {
        tytul: "Pięć formatów A3–A0",
        opis: "A3 (297 × 420 mm) — najmniejszy plakat, do gablot szkolnych i koncertowych. A2 (420 × 594 mm) — najpopularniejszy format reklamowy. A1 (594 × 841 mm) — dla witryn sklepowych i wnętrz klubów. B1 (707 × 1000 mm) — standard dla słupów reklamowych. A0 (841 × 1189 mm) — maksimum, do wnętrz wielkopowierzchniowych (lobby kin, hale konferencyjne).",
      },
      {
        tytul: "Druk wielkoformatowy",
        opis: "Plakaty B1 i A0 drukujemy na drukarkach wielkoformatowych laserowych (HP Latex, Roland VersaUV) — daje fotograficzną jakość i intensywne kolory. Druk laserowy jest bardziej trwały niż atramentowy, odporny na UV przez 6–12 miesięcy w warunkach wewnętrznych.",
      },
      {
        tytul: "Pakowanie w sztywną tubę",
        opis: "Każdy plakat (od A3 do A0) pakujemy w sztywną tubę kartonową z plastikowymi zatyczkami na końcach. Plakat zwinięty rolkowo nie ma zagnieceń, dochodzi do klienta w idealnym stanie. Tuba jest też dobrym elementem przekazania klientowi lub recepcji — wygląda profesjonalnie i zabezpiecza zawartość.",
      },
    ],
    params: [
      {
        parametr: "Papier",
        wartosc: "Satynowy 170 g",
        opcje:
          "kreda mat 170 g, blueback 135 g (outdoor), papier fotograficzny 200 g",
      },
      {
        parametr: "Druk",
        wartosc: "4/0 (kolor jednostronny)",
        opcje: "4/4 (dwustronny — rzadko zamawiany)",
      },
      { parametr: "Format A3", wartosc: "297 × 420 mm" },
      { parametr: "Format A2", wartosc: "420 × 594 mm" },
      { parametr: "Format A1", wartosc: "594 × 841 mm" },
      { parametr: "Format B1", wartosc: "707 × 1000 mm" },
      { parametr: "Format A0", wartosc: "841 × 1189 mm" },
      { parametr: "Pakowanie", wartosc: "Sztywna tuba kartonowa" },
      { parametr: "Czas realizacji", wartosc: "72 h" },
    ],
    filePrepIntro:
      "Plik do druku plakatów to jeden PDF z jedną stroną w skali 1:1. Poniżej szczegóły specyficzne dla wielkoformatowego druku.",
    filePrepSteps: [
      {
        tytul: "1. Skala 1:1 z spadami",
        opis: "Pracuj w docelowym rozmiarze plakatu z 3 mm spadu na każdą krawędź. Dla B1 (707 × 1000 mm) plik = 713 × 1006 mm. Dla A0 (841 × 1189 mm) plik = 847 × 1195 mm. Pracujesz w skali 1:1 — nie w 1:2 czy 1:4 (typowa pułapka, gdy projekt powstaje na małym monitorze).",
      },
      {
        tytul: "2. Rozdzielczość 150 dpi dla A1+, 200 dpi dla A2/A3",
        opis: "Plakaty są oglądane z dystansu 1–3 metrów — wyższa rozdzielczość niż 150 dpi nie daje zauważalnej poprawy. Plakat A0 w 300 dpi to plik 350 MB, a w 150 dpi 90 MB — łatwiej w transporcie do drukarni i szybciej w RIP-ie. Dla A3/A2 (oglądane z mniejszej odległości) polecamy 200 dpi.",
      },
      {
        tytul: "3. Marginesy bezpieczeństwa 10 mm",
        opis: "Tekst i kluczowe elementy trzymaj minimum 10 mm od krawędzi netto (dla A3) i 20 mm dla B1/A0. Plakaty są przycinane mechanicznie po druku, więc minimalne odchylenia gilotyny są możliwe. Marginesy bezpieczeństwa chronią treść przed obcięciem.",
      },
      {
        tytul: "4. CMYK i intensywność kolorów",
        opis: "Druk plakatów to CMYK ISO Coated v2 (ECI). Intensywne kolory (jaskrawy niebieski, neon, fluorescent) wyjdą mniej nasycone niż na monitorze RGB. Dla brand colors w PMS — oznacz w pliku, drukarnia spróbuje dopasować w CMYK lub spot color. Czarne tła: rich black (C40 M30 Y30 K100), nie sam K100.",
      },
      {
        tytul: "5. Font min. 24 pt na headline",
        opis: "Plakat jest oglądany z dystansu 1–3 metrów. Headline minimum 100 pt (3,5 cm wysokości fontu), treść główna 50 pt (1,8 cm), drobny tekst 24 pt (8 mm). Mniejszy tekst będzie nieczytelny z normalnej odległości od plakatu w gablocie lub witrynie.",
      },
      {
        tytul: "6. Eksport do PDF/X-4 lub TIFF CMYK",
        opis: "PDF/X-4 to standard pre-press. TIFF CMYK 150 dpi to alternatywa dla bardzo dużych plików. Spłaszczona przezroczystość, osadzone fonty, profil ICC. Plik ostateczny: 50–150 MB dla A0. Wgrywasz przez konfigurator (obsługujemy pliki do 500 MB) lub przesyłasz przez WeTransfer link.",
      },
    ],
    faqs: [
      {
        question: "Jaki format plakatu wybrać do gabloty?",
        answer:
          "Standardem gablot reklamowych jest A2 (420 × 594 mm) — najczęściej zamawiany format, mieści się w 90% gablot szkolnych, koncertowych i sklepowych. Dla większych gablot witrynowych (1×1 m) — A1 lub B1. Dla wnętrz klubów i restauracji — A2 lub A1 (dystans oglądania 2–3 m). A3 zostawiamy do menu na ścianie i mniejszych ekspozycji.",
      },
      {
        question: "Czy oferujecie plakaty outdoor?",
        answer:
          "Tak — papier blueback 135 g jest dedykowany do plakatów outdoor naklejanych na słupy reklamowe i ściany. Blueback ma niebieską warstwę z tyłu, która zapobiega prześwitywaniu starych plakatów spod nowego. Trwałość outdoor: 4–8 tygodni przy normalnej pogodzie. Plakaty na deszcz i wiatr wymagają laminacji UV (opcja, +30% do ceny).",
      },
      {
        question: "Ile czasu zajmuje druk plakatu?",
        answer:
          "72 h dla standardowych zamówień (A2/A3, papier satynowy 170 g). Dla wielkoformatu B1/A0: 72–96 h. Express 24 h dostępny za dopłatą 40% — wgrywasz plik do 14:00, plakat wyjeżdża kurierem tego samego dnia po 19:00. Dla nakładów 25+ plakatów A0: 4–5 dni roboczych.",
      },
      {
        question: "Czy mogę zamówić jeden plakat?",
        answer:
          "Tak, minimum to 1 sztuka. Cena 1 sztuki A2 to ok. 12 zł brutto, A1 — 22 zł, B1 — 38 zł, A0 — 65 zł. Druk cyfrowy laserowy nie wymaga rozruchu maszyny, więc 1 sztuka kosztuje liniowo. Dla nakładów 10+ uruchamiamy offset wielkoformatowy, który obniża cenę jednostkową o 30–50%.",
      },
      {
        question: "Czy plakat zmieści się w typowej ramce na ścianie?",
        answer:
          "A2 i A3 to standardy ramowania IKEA i innych marek meblowych — ramki są łatwo dostępne za 30–80 zł. A1 i B1 — ramki dostępne w sklepach Castorama, OBI i specjalistycznych. A0 — ramki na zamówienie (200–500 zł), bo to specjalistyczny rozmiar. Pamiętaj, że typowe ramki IKEA mają margines wewnętrzny 1–2 cm — plakat musi być nieco większy niż otwór ramki.",
      },
      {
        question: "Czy mogę dodać laminowanie?",
        answer:
          "Tak — laminowanie matowe lub błyszczące dostępne jako opcja za dopłatą 40% (mat) lub 50% (błysk). Laminowanie chroni plakat przed wodą, zarysowaniem i UV — wydłuża żywotność do 24+ miesięcy. Polecamy dla plakatów outdoor, plakatów w łazience (np. menu spa), plakatów dla dzieci (które są dotykane regularnie). Laminowanie wydłuża termin o 48 h.",
      },
      {
        question: "Czy oferujecie plakaty na papierze fotograficznym?",
        answer:
          "Tak — papier fotograficzny 200 g (półbłysk) dostępny jako opcja premium. Idealny dla plakatów z fotografią profesjonalną (sesje portretowe, fotografia produktowa, wystawy galeryjne). Kolory są bardziej nasycone niż na satyno­wym 170 g, czarne są głębsze. Cena: +35% vs standardowy satynowy. Polecamy dla wystaw galeryjnych i ekspozycji premium.",
      },
    ],
    seoParagraph: [
      "Druk plakatów online to nasza specjalizacja dla wielkoformatu. DobrePrinty realizuje druk plakatów w pięciu formatach (A3, A2, A1, B1, A0) na papierze satynowym 170 g jako standardowym wyborze. Konfigurator pokazuje cenę brutto z VAT od razu po wybraniu formatu i nakładu, a 28 drukarni partnerskich pozwala dobrać partnera z dostępnym wielkoformatowym sprzętem (drukarki HP Latex, Roland VersaUV, offset wielkoformatowy dla większych nakładów).",
      "Tania drukarnia plakatów dla nakładów 1–10 sztuk to druk cyfrowy laserowy — bez rozruchu maszyny, bez dopłaty za małą partię. Powyżej 25 sztuk plakatów A1/B1/A0 uruchamiamy offset wielkoformatowy, który obniża cenę jednostkową o 30–50%. Dla plakatów outdoor (papier blueback) i premium (papier fotograficzny 200 g) dostępne są opcje dodatkowe. Laminowanie (mat lub błysk) wydłuża żywotność plakatu do 24+ miesięcy.",
      "Druk plakatów obsługujemy dla wszystkich branż: koncerty i festiwale (B1 na słupach), wystawy muzealne (A0 i A1 w gablotach), kampanie reklamowe sklepów (A2 w witrynach), promocje hotelowe (A1/A2 w lobby), wystawy uczelniane (A0 i A1 na korytarzach). Każdy plakat pakujemy w sztywną tubę kartonową — bez ryzyka zagnieceń w transporcie. Czas realizacji 72 h dla standardów, express 24 h za dopłatą 40% dla pilnych zamówień.",
    ],
    aggregateRating: { value: "4.9", count: "1450" },
    ctaCopy:
      "Wybierz format, wgraj plik — plakaty drukujemy w 72 h, pakowane w sztywne tuby kartonowe. Express 24 h dostępny.",
  },
  "baner-reklamowy": {
    keyword: "banery reklamowe",
    heroLead:
      "Druk banerów reklamowych online z dostawą w 24–48 h. Baner to najtańszy sposób na dużą, widoczną z daleka powierzchnię reklamową — na płot, elewację, scenę czy stoisko targowe. Drukujemy na materiale PVC 510 g drukiem solwentowym, odpornym na słońce i deszcz. W cenie zawsze: zgrzewane krawędzie i metalowe oczka co 50 cm, więc baner przychodzi gotowy do zawieszenia. Cena brutto z VAT widoczna od razu w konfiguratorze.",
    whyBlocks: [
      {
        tytul: "PVC 510 g, nie tańszy substytut",
        opis: "Standardem rynkowym bywa cienki PVC 440 g, który po pierwszej zimie pęka na zgięciach i faluje na wietrze. My drukujemy na PVC 510 g — grubszym, sztywniejszym, z mocniejszą siatką zbrojeniową. Baner trzyma kształt na wietrze i nie rwie się na oczkach nawet przy całorocznej ekspozycji zewnętrznej.",
      },
      {
        tytul: "Druk solwentowy odporny na UV i deszcz",
        opis: "Druk solwentowy wtapia atrament w strukturę PVC, dzięki czemu kolory nie blakną na słońcu ani nie spływają na deszczu. Tańszy druk wodny (lateksowy) na zewnątrz traci nasycenie po 2–3 miesiącach. Nasz solwent utrzymuje intensywność barw przez 24+ miesiące ekspozycji outdoor — bez laminowania.",
      },
      {
        tytul: "Oczka i zgrzewanie w cenie, bez dopłat",
        opis: "Każdy baner dostaje zgrzewane (nie zaginane na zimno) krawędzie i aluminiowe oczka co 50 cm w narożnikach i na bokach — wszystko w cenie podstawowej. Zgrzew na gorąco jest trwalszy niż taśma czy szew, a oczka nie wyrywają się przy mocnym naciągu. Otwierasz paczkę, przeciągasz linki przez oczka i wieszasz.",
      },
      {
        tytul: "Dostawa w 3 dni robocze",
        opis: "Baner to często zamówienie pilne — otwarcie sklepu w sobotę, mecz w weekend, event za kilka dni. Produkcja standardowego banera (1 strona, 1 grafika) startuje w 24 h od potwierdzenia pliku, kurier dokłada zwykle 1–2 dni robocze. Zamówienie w poniedziałek = baner na ścianie w czwartek.",
      },
    ],
    params: [
      {
        parametr: "Materiał",
        wartosc: "PVC 510 g (frontlit)",
        opcje: "siatka mesh 370 g, PVC 680 g blockout",
      },
      {
        parametr: "Gramatura",
        wartosc: "510 g/m²",
        opcje: "370 g (mesh), 680 g (blockout)",
      },
      {
        parametr: "Druk",
        wartosc: "Solwentowy 4/0 (jednostronny)",
        opcje: "4/4 na blockout",
      },
      {
        parametr: "Format (szer. × wys.)",
        wartosc: "50 × 100, 100 × 200, 150 × 300, 200 × 400 cm",
        opcje: "format niestandardowy na zamówienie",
      },
      {
        parametr: "Wykończenie",
        wartosc: "Zgrzewane krawędzie + oczka co 50 cm",
      },
      { parametr: "Czas realizacji", wartosc: "3 dni robocze" },
      { parametr: "Nakład", wartosc: "od 1 sztuki" },
    ],
    filePrepIntro:
      "Plik do druku banera to jeden PDF lub TIFF w rozmiarze docelowym + spady. Druk wielkoformatowy solwentowy rządzi się nieco innymi prawami niż druk offsetowy — niższa rozdzielczość wystarcza, bo baner oglądasz z dystansu. Poniżej krok po kroku.",
    filePrepSteps: [
      {
        tytul: "1. Skala 1:1, rozdzielczość 72–100 dpi",
        opis: "Pracuj w skali rzeczywistej (np. dokument 200 × 400 cm dla największego formatu) z rozdzielczością 72–100 dpi. To wystarczy do druku solwentowego oglądanego z 2+ metrów. Wyższa rozdzielczość daje ogromny plik bez zauważalnej poprawy ostrości — 100 dpi w skali 1:1 to optymalne minimum.",
      },
      {
        tytul: "2. Dodaj 5 mm spadu na każdą krawędź",
        opis: "Do każdego boku banera dodaj 5 mm spadu — to obszar zgrzewu, w którym krawędź jest zawijana i zgrzewana. Dla banera 100 × 200 cm dokument w programie powinien mieć 100,5 × 200,5 cm. Tło i grafika muszą sięgać aż do linii spadu, żeby po zgrzaniu nie został biały pasek.",
      },
      {
        tytul: "3. Pracuj w CMYK",
        opis: "Druk solwentowy to CMYK — jeśli plik jest w RGB, kolory zostaną przekonwertowane i intensywne barwy (jaskrawy niebieski, neon, zieleń) wyjdą mniej nasycone niż na monitorze. Ustaw przestrzeń CMYK już na starcie projektu. Jeśli masz kolor brandowy w PMS, oznacz go — drukarnia spróbuje dopasować.",
      },
      {
        tytul: "4. Trzymaj treść z dala od oczek",
        opis: "Oczka montowane są co 50 cm wzdłuż krawędzi, w pasie ok. 2,5 cm od brzegu. Kluczowe elementy (logo, headline, numer telefonu) trzymaj minimum 5 cm od każdej krawędzi netto, żeby oczko nie przebiło litery ani logo. Eksportuj do PDF/X-4 lub TIFF CMYK, spłaszczone, bez warstw i przezroczystości.",
      },
    ],
    faqs: [
      {
        question: "Jak zawiesić baner reklamowy?",
        answer:
          "Najprościej przez oczka, które montujemy co 50 cm na wszystkich krawędziach. Przeciągasz przez nie linkę elastyczną (gumową „expander”), opaski zaciskowe lub stalowy drut i mocujesz do płotu, rusztowania, elewacji lub ramy. Na płocie panelowym sprawdzają się opaski zaciskowe, na ścianie — haki lub kołki z uchem. Dla banera na siatce mesh pamiętaj, że przepuszcza wiatr, więc nadaje się na duże powierzchnie i ogrodzenia.",
      },
      {
        question: "Czy baner wytrzyma deszcz i mróz?",
        answer:
          "Tak. PVC 510 g jest w pełni wodoodporny, a druk solwentowy nie spływa ani nie blaknie na deszczu i słońcu — utrzymuje kolory przez 24+ miesiące ekspozycji zewnętrznej. Materiał jest też odporny na mróz; zgrzewane (nie zaginane na zimno) krawędzie nie pękają zimą. Przy bardzo silnym wietrze na pełnym PVC polecamy częstsze oczka lub przejście na siatkę mesh, która przepuszcza podmuchy.",
      },
      {
        question: "Jak przygotować plik do druku banera?",
        answer:
          "Jeden plik PDF lub TIFF w skali 1:1, rozdzielczość 72–100 dpi, przestrzeń CMYK, 5 mm spadu na każdą krawędź. Kluczowe treści trzymaj minimum 5 cm od brzegu, żeby nie kolidowały z oczkami. Plik spłaszcz (bez warstw i przezroczystości) i wyeksportuj do PDF/X-4. Po wgraniu do konfiguratora pokażemy podgląd ze spadami i obszarem oczek — sprawdź, czy logo i tekst nie wchodzą w pas montażowy.",
      },
      {
        question: "Jaki jest minimalny nakład?",
        answer:
          "Minimum to 1 sztuka. Drukujemy zarówno pojedynczy baner na otwarcie sklepu, jak i serie kilkudziesięciu banerów na kampanię. Druk solwentowy nie wymaga rozruchu maszyny jak offset, więc nawet jedna sztuka ma sensowną cenę. Przy większych nakładach tego samego projektu cena jednostkowa spada.",
      },
      {
        question: "Ile czasu zajmuje druk i dostawa banera?",
        answer:
          "Standardowo 3 dni robocze: produkcja startuje w 24 h od potwierdzenia pliku (druk solwentowy, zgrzewanie krawędzi, montaż oczek), a kurier dokłada zwykle 1–2 dni robocze. Zamówienie złożone w poniedziałek rano jest u Ciebie w czwartek. Przy większych formatach (200 × 400 cm) i seriach kilkunastu sztuk termin może wydłużyć się o dobę.",
      },
    ],
    seoParagraph: [
      "Banery reklamowe to najtańszy sposób na dużą, widoczną z daleka powierzchnię reklamową na zewnątrz. DobrePrinty realizuje druk banerów online na materiale PVC 510 g drukiem solwentowym odpornym na UV i deszcz, zawsze ze zgrzewanymi krawędziami i metalowymi oczkami co 50 cm w cenie. Cena brutto z VAT jest widoczna od razu w konfiguratorze — bez gwiazdek, bez dopłaty za oczka, bez czekania na ofertę handlowca. Baner zamawiasz od jednej sztuki, w czterech gotowych formatach lub w wymiarze niestandardowym.",
      "Tani baner reklamowy nie musi oznaczać kompromisu na jakości. Standardem rynkowym bywa cienki PVC 440 g z drukiem wodnym, który po jednym sezonie pęka na zgięciach i blaknie na słońcu. W DobrePrinty zawsze drukujemy na PVC 510 g drukiem solwentowym z gwarancją intensywności kolorów przez 24+ miesiące ekspozycji zewnętrznej. Zgrzew na gorąco i aluminiowe oczka sprawiają, że baner nie rwie się na wietrze i przychodzi gotowy do natychmiastowego zawieszenia na płocie, elewacji czy rusztowaniu.",
      "Druk banerów online sprawdza się dla wszystkich branż: handlu (otwarcia sklepów, wyprzedaże w witrynach), budownictwa (banery na rusztowaniach i ogrodzeniach), eventów (sceny, mecze, festyny), gastronomii (menu i promocje na elewacji) oraz polityki i sportu. Dla dużych powierzchni i ogrodzeń narażonych na silny wiatr polecamy siatkę mesh 370 g, która przepuszcza podmuchy i odciąża konstrukcję. Baner standardowy dostarczamy w 3 dni robocze, a dzięki drukowi solwentowemu bez rozruchu maszyny opłaca się już od pojedynczej sztuki.",
    ],
    aggregateRating: { value: "4.9", count: "0" },
    ctaCopy:
      "Wybierz format, wgraj plik — baner dostarczamy w 3 dni robocze ze zgrzewanymi krawędziami i oczkami co 50 cm w cenie.",
  },
  naklejki: {
    keyword: "naklejki",
    heroLead:
      "Druk naklejek online od 1 sztuki, z dostawą w 48 h. Naklejka to najprostszy sposób na umieszczenie logo, informacji produktowej lub komunikatu na dowolnej powierzchni — od etykiet na słoikach, przez naklejki na laptopach, po oznaczenia na kartonach. Drukujemy na papierze, folii białej PP i folii transparentnej, z klejem trwałym lub zmywalnym i cięciem ploterowym do dowolnego kształtu. Cena brutto z VAT widoczna od razu w konfiguratorze.",
    whyBlocks: [
      {
        tytul: "Trzy podłoża: papier i folia",
        opis: "Papier biały to najtańsze podłoże do etykiet produktowych i naklejek adresowych (6–12 mies. wewnątrz). Folia biała PP jest gładka i wodoodporna, wytrzymuje 24+ miesiące na zewnątrz — na samochody, sprzęt i opakowania. Folia transparentna daje efekt nadruku bezpośrednio na szkle, idealna na butelki, słoiki i opakowania szklane.",
      },
      {
        tytul: "Klej trwały lub zmywalny",
        opis: "Klej trwały (permanent) to standard — po naklejeniu oderwanie niszczy naklejkę lub zostawia ślady, więc świetnie sprawdza się przy etykietach produktowych i oznaczeniach na stałe. Klej zmywalny (removable) pozwala oderwać naklejkę bez śladów w ciągu 24–72 h — do cen, promocji i naklejek tymczasowych. Opcjonalnie klej mrozoodporny do -30°C dla mrożonek i logistyki chłodniczej.",
      },
      {
        tytul: "Cięcie ploterowe do dowolnego kształtu",
        opis: "Naklejki prostokątne i kwadratowe są najtańsze (cięcie prostolinijne), ale ploter tnący wytnie też koło, owal czy dowolny kontur — gwiazdę, logo, sylwetkę — bez dodatkowych opłat za wykrojnik. W druku offsetowym wykrojnik to koszt 100–300 zł; u nas, w druku cyfrowym, ploter tnie każdy kształt w cenie. Dostępne też arkusze kiss-cut, naklejki indywidualnie cięte i rolki.",
      },
      {
        tytul: "Zastosowania produktowe i promocyjne",
        opis: "Etykiety na słoiki i butelki (folia transparentna lub biała, klej trwały), naklejki promocyjne na gadżety (folia biała + laminat, kiss-cut), ceny i oznaczenia sklepowe (papier, klej zmywalny), naklejki na samochody i witryny, etykiety logistyczne na kartony. Jedno podłoże do każdego zadania — dobierasz materiał, klej i kształt pod konkretne użycie.",
      },
    ],
    params: [
      {
        parametr: "Podłoże",
        wartosc: "Papier biały",
        opcje:
          "folia PP biała, folia transparentna, papier kraft, folia srebrna, vinyl",
      },
      {
        parametr: "Klej",
        wartosc: "Trwały (permanent)",
        opcje: "zmywalny, mrozoodporny -30°C, wzmocniony high-tack",
      },
      {
        parametr: "Druk",
        wartosc: "4/0 cyfrowy (CMYK)",
        opcje: "biały poddruk dla folii transparentnej",
      },
      {
        parametr: "Format",
        wartosc: "A7, A6, A5, A4",
        opcje: "kształt niestandardowy (die-cut)",
      },
      {
        parametr: "Wykończenie",
        wartosc: "Bez laminatu",
        opcje: "laminat matowy, laminat błysk, lakier UV",
      },
      {
        parametr: "Cięcie",
        wartosc: "Ploterowe (dowolny kształt)",
        opcje: "kiss-cut, indywidualnie cięte, rola",
      },
      { parametr: "Czas realizacji", wartosc: "48–72 h" },
    ],
    filePrepIntro:
      "Plik do druku naklejek przygotowujesz raz, a działa na każdym podłożu. Najważniejsza różnica wobec zwykłego druku to linia cięcia (die-line) i — przy folii transparentnej — warstwa białego poddruku. Poniżej krok po kroku.",
    filePrepSteps: [
      {
        tytul: "1. CMYK, 300 dpi, fonty na krzywe",
        opis: "Pracuj w przestrzeni CMYK — pliki RGB zostaną przekonwertowane i intensywne kolory mogą wyjść mniej nasycone. Zdjęcia i grafiki w rozdzielczości minimum 300 dpi w docelowym rozmiarze naklejki. Wszystkie teksty zamień na krzywe (outlines) albo osadź fonty w PDF-ie, żeby napis wyglądał identycznie niezależnie od czcionek operatora.",
      },
      {
        tytul: "2. Spady 2 mm z każdej strony",
        opis: "Dodaj 2–3 mm spadu na każdą krawędź — także przy naklejkach okrągłych i o nietypowym kształcie. Tło i grafika muszą sięgać aż do linii spadu, żeby po cięciu nie został biały pasek przy krawędzi. Kluczowe elementy (tekst, logo) trzymaj kilka milimetrów od linii cięcia w głąb naklejki.",
      },
      {
        tytul: "3. Linia cięcia die-cut na osobnej warstwie",
        opis: "Przygotuj linię cięcia (die-line) jako zamkniętą krzywą wektorową na osobnej warstwie, w kolorze spot (np. Magenta 100% lub spot o nazwie „CutContour”). To po niej ploter wytnie naklejkę. Bez osobnej warstwy z konturem drukarnia nie wie, gdzie ma przebiegać cięcie — szczególnie przy kształtach innych niż prostokąt.",
      },
      {
        tytul: "4. Biały poddruk dla folii transparentnej",
        opis: "Na folii transparentnej kolory bez podkładu są prześwitujące jak witraż. Oznacz elementy, które mają mieć biały poddruk (white underprint), jako osobną warstwę spot o nazwie „White”. Bez tej warstwy drukarnia nie wie, gdzie nadrukować białą farbę pod kolorem. Eksportuj do PDF/X-4 (obsługuje przezroczystości) lub AI/EPS z rozłożonymi efektami.",
      },
    ],
    faqs: [
      {
        question: "Jaka jest minimalna ilość naklejek, którą mogę zamówić?",
        answer:
          "W druku cyfrowym minimum to 1 sztuka, bez ograniczeń. Cena jednostkowa jest wyższa przy małych nakładach — opłacalny próg to 50–100 sztuk, gdzie cena za sztukę spada o 40–60% wobec pojedynczego egzemplarza. Druk offsetowy zaczyna się dopiero od 500–1000 sztuk (niższy koszt jednostkowy, ale wyższy minimalny nakład), więc do mikroserii zawsze używamy cyfry.",
      },
      {
        question: "Czy naklejki na zewnątrz wytrzymają deszcz i słońce?",
        answer:
          "Tak, jeśli wybierzesz folię (PP lub vinyl) z laminatem UV. Folia vinyl z laminatem wytrzymuje 3–5 lat na zewnątrz — deszcz, słońce i mróz. Folia PP z laminatem: 2–3 lata outdoor. Papierowe naklejki bez laminatu niszczą się po pierwszym deszczu, więc nadają się tylko do zastosowań wewnętrznych.",
      },
      {
        question: "Czy mogę zamówić naklejki o niestandardowym kształcie?",
        answer:
          "Tak. Ploter tnący w druku cyfrowym wytnie dowolny kształt bez dodatkowych kosztów — koło, owal, gwiazdę, logo czy kontur postaci. Wystarczy przygotować linię cięcia jako zamkniętą krzywą wektorową na osobnej warstwie w pliku. W druku offsetowym taki kontur wymaga wykrojnika za 100–300 zł, dlatego przy nietypowych kształtach drukujemy cyfrowo.",
      },
      {
        question: "Jak przygotować naklejki na folii transparentnej?",
        answer:
          "Folia transparentna daje efekt nadruku wprost na szkle, ale kolory bez podkładu są prześwitujące. Elementy, które mają być kryjące, oznacz jako osobną warstwę białego poddruku (spot color „White”) — drukarnia nadrukuje pod nimi białą farbę. Bez tej warstwy kolory wyglądają jak witraż (blade, prześwitujące). Do witryn często drukuje się od wewnętrznej strony szyby z klejem zmywalnym.",
      },
      {
        question: "Ile czasu zajmuje druk i dostawa naklejek?",
        answer:
          "Standardowo 48–72 h od potwierdzenia pliku: druk cyfrowy CMYK, ewentualny laminat, cięcie ploterowe. Kurier dokłada zwykle 1 dzień roboczy, więc całość od zamówienia do paczki to 2–3 dni robocze. Naklejki z laminatem lub nietypowym wykrojnikiem mogą wydłużyć termin o dobę. Konkretny termin widzisz w konfiguratorze po wybraniu podłoża i wykończenia.",
      },
    ],
    seoParagraph: [
      "Druk naklejek online to najprostszy sposób, by umieścić logo, etykietę produktową lub komunikat promocyjny na dowolnej powierzchni. DobrePrinty realizuje druk naklejek na papierze, folii białej PP i folii transparentnej, z klejem trwałym lub zmywalnym, od jednej sztuki, z ceną brutto z VAT widoczną od razu w konfiguratorze. Ploter tnący wycina dowolny kształt bez dopłaty za wykrojnik, a 28 drukarni partnerskich pozwala dobrać najszybszego partnera pod konkretne zamówienie.",
      "Tanie naklejki nie muszą oznaczać kompromisu na trwałości — wszystko zależy od dobrania podłoża i kleju do zastosowania. Etykiety produktowe na słoiki i butelki najlepiej drukować na folii transparentnej lub białej z klejem trwałym. Ceny i oznaczenia sklepowe — na papierze z klejem zmywalnym, który odchodzi bez śladu. Naklejki na samochody i witryny wymagają folii vinyl z laminatem UV, odpornej na deszcz i słońce przez kilka lat. Druk naklejek z konfiguratora DobrePrinty jest tani również dlatego, że nie obciążamy klienta marżą handlowca: konfigurujesz produkt sam, my dobieramy drukarnię.",
      "Naklejki sprawdzają się w zastosowaniach produktowych, promocyjnych i logistycznych. Etykiety na kosmetyki i żywność, naklejki promocyjne na gadżety eventowe (folia biała z laminatem, arkusze kiss-cut), oznaczenia logistyczne na kartony (papier, klej trwały lub mrozoodporny), naklejki dekoracyjne na laptopy i telefony. Druk naklejek online obsługujemy od pojedynczych sztuk testowych po nakłady kilku tysięcy sztuk na rolce do automatów etykietujących. Plik przygotowujesz raz — z linią cięcia na osobnej warstwie i, dla folii transparentnej, warstwą białego poddruku — a działa na każdym podłożu z naszej oferty.",
    ],
    aggregateRating: { value: "4.9", count: "0" },
    ctaCopy:
      "Wybierz podłoże, klej i kształt, wgraj plik — naklejki drukujemy od 1 sztuki, z cięciem ploterowym do dowolnego konturu, dostawa w 48 h.",
  },
  "tablice-reklamowe": {
    keyword: "tablice reklamowe",
    heroLead:
      "Druk tablic reklamowych online na piankowym forexie 3 mm i dibondzie aluminiowym 3 mm, z dostawą w 4 dni robocze. Tablica to baner z charakterem — sztywna, stoi samodzielnie lub wisi na ścianie bez ramy. Drukujemy bezpośrednio na materiale technologią UV, odporną na słońce i deszcz, z konturem ciętym na ploterze CNC do dokładnego wymiaru. Sprawdza się w gabinetach, restauracjach, biurach firm i sklepach — wszędzie tam, gdzie reklama ma być solidna, a nie tymczasowa.",
    whyBlocks: [
      {
        tytul: "Forex czy dibond — dwa materiały, dwa zadania",
        opis: "Forex (spieniony PCV 3 mm) jest lekki, tani i sztywny — idealny do wnętrz: tablice informacyjne, oznaczenia gabinetów, szyldy w recepcji. Dibond (dwie warstwy aluminium z rdzeniem z polietylenu, 3 mm) jest sztywniejszy, cięższy i w pełni odporny na warunki zewnętrzne — na elewacje, szyldy outdoor i tablice na lata. Forex wybierasz dla ceny i wnętrz, dibond dla trwałości i ekspozycji na zewnątrz.",
      },
      {
        tytul: "Druk UV bezpośrednio na materiale",
        opis: "Nie przyklejamy zadrukowanego papieru ani folii na płytę — drukujemy atramentem UV bezpośrednio na forexie i dibondzie. Atrament jest utwardzany lampą UV w momencie nakładania, wtapia się w powierzchnię i nie odkleja się, nie pęcherzy ani nie blaknie. Efekt jest trwalszy i bardziej profesjonalny niż tablica oklejana folią, która z czasem odchodzi na krawędziach.",
      },
      {
        tytul: "Cięcie CNC do dokładnego wymiaru",
        opis: "Tablicę tniemy na ploterze CNC do zadanego formatu z dokładnością co do milimetra, a krawędzie szlifujemy, żeby były gładkie i bezpieczne. Ploter wytnie też kontur niestandardowy — kształt strzałki, logo czy zaokrąglone narożniki — bez kosztownego wykrojnika. Dostajesz tablicę gotową do montażu, bez konieczności docinania na miejscu.",
      },
      {
        tytul: "Zastosowania indoor i outdoor",
        opis: "Forex 3 mm: tablice informacyjne w gabinetach lekarskich i kancelariach, menu i cenniki w restauracjach, oznaczenia sal i pomieszczeń, szyldy w recepcjach i biurach. Dibond 3 mm: szyldy na elewacjach sklepów, tablice firmowe przy wjazdach, oznaczenia parkingów, reklama na ogrodzeniach. Jeden produkt do reklamy, która ma stać i wisieć przez lata, a nie przez jeden sezon.",
      },
    ],
    params: [
      {
        parametr: "Materiał",
        wartosc: "Forex (spienione PCV)",
        opcje: "dibond aluminium, PCV lite",
      },
      { parametr: "Grubość", wartosc: "3 mm", opcje: "5 mm, 10 mm (forex)" },
      {
        parametr: "Druk",
        wartosc: "UV 4/0 bezpośrednio na płycie",
        opcje: "4/4 dwustronnie (dibond)",
      },
      {
        parametr: "Wykończenie krawędzi",
        wartosc: "Cięcie CNC + szlifowanie",
        opcje: "zaokrąglone narożniki, kontur niestandardowy",
      },
      {
        parametr: "Montaż",
        wartosc: "Otwory pod wkręty",
        opcje: "dystanse, taśma montażowa, listwy",
      },
      { parametr: "Czas realizacji", wartosc: "4 dni robocze" },
    ],
    filePrepIntro:
      "Plik do druku tablicy reklamowej to jeden PDF lub TIFF w rozmiarze docelowym + spady. Druk UV na sztywnym podłożu rządzi się prostszymi zasadami niż druk offsetowy — nie ma folii, laminatu ani składania. Poniżej krok po kroku.",
    filePrepSteps: [
      {
        tytul: "1. Skala 1:1, rozdzielczość 150 dpi",
        opis: "Pracuj w skali rzeczywistej (np. dokument 420 × 594 mm dla A2) z rozdzielczością 150 dpi. To optymalne minimum dla druku UV oglądanego z dystansu 0,5–2 metrów. Wyższa rozdzielczość daje większy plik bez zauważalnej poprawy ostrości, niższa niż 100 dpi zacznie być widocznie miękka na większych formatach.",
      },
      {
        tytul: "2. Dodaj 3 mm spadu na każdą krawędź",
        opis: "Do każdego boku tablicy dodaj 3 mm spadu — to obszar obcinany przez ploter CNC. Dla tablicy A2 (420 × 594 mm) dokument powinien mieć 426 × 600 mm. Tło i grafika muszą sięgać aż do linii spadu, żeby po cięciu nie został biały pasek przy krawędzi.",
      },
      {
        tytul: "3. Pracuj w CMYK",
        opis: "Druk UV to CMYK — jeśli plik jest w RGB, kolory zostaną przekonwertowane i intensywne barwy (jaskrawy niebieski, neon, zieleń) wyjdą mniej nasycone niż na monitorze. Ustaw przestrzeń CMYK od startu projektu. Jeśli masz kolor brandowy w PMS, oznacz go — drukarnia spróbuje go dopasować przy druku UV.",
      },
      {
        tytul: "4. Bez folii i laminatu — płaski plik",
        opis: "Tablica nie jest laminowana ani foliowana — druk UV jest odporny sam z siebie, więc nie planuj warstwy wykończenia w pliku. Teksty zamień na krzywe lub osadź fonty, plik spłaszcz (bez warstw i przezroczystości) i wyeksportuj do PDF/X-4 lub TIFF CMYK. Jeśli chcesz kontur niestandardowy, dołącz linię cięcia jako osobną krzywą wektorową w kolorze spot.",
      },
    ],
    faqs: [
      {
        question: "Forex czy dibond — który materiał wybrać?",
        answer:
          "Forex (spienione PCV 3 mm) jest lekki, tani i sztywny — wybierz go do wnętrz: tablice informacyjne, oznaczenia gabinetów, menu, szyldy w recepcji. Dibond (aluminium z rdzeniem, 3 mm) jest sztywniejszy, cięższy i w pełni odporny na warunki zewnętrzne — wybierz go do szyldów na elewacje, tablic firmowych przy wjazdach i wszystkiego, co ma wisieć na zewnątrz przez lata. W skrócie: forex dla ceny i wnętrz, dibond dla trwałości i outdooru.",
      },
      {
        question: "Czy tablica wytrzyma na zewnątrz, w deszczu i słońcu?",
        answer:
          "Dibond aluminiowy z drukiem UV jest w pełni odporny na warunki zewnętrzne — deszcz, słońce i mróz — i wytrzymuje wiele lat na elewacji bez blaknięcia. Forex też jest wodoodporny i nadaje się na zewnątrz pod zadaszeniem, ale na pełnym słońcu i przy dużych formatach z czasem może lekko falować. Do trwałej ekspozycji outdoor zawsze polecamy dibond; forex do wnętrz i miejsc osłoniętych.",
      },
      {
        question: "Jak zamontować lub powiesić tablicę?",
        answer:
          "Najprościej przez otwory pod wkręty, które wywiercimy w narożnikach na życzenie — przykręcasz tablicę bezpośrednio do ściany, elewacji lub ogrodzenia. Alternatywy to dystanse (tablica odsunięta od ściany, efekt 3D), taśma montażowa dwustronna do gładkich powierzchni wewnątrz, lub listwy montażowe. Forex jest na tyle lekki, że trzyma się nawet na mocnej taśmie; dibond przy większych formatach lepiej przykręcić.",
      },
      {
        question: "Czy mogę zamówić tablicę o niestandardowym kształcie?",
        answer:
          "Tak. Ploter CNC wytnie dowolny kontur bez kosztownego wykrojnika — strzałkę, kształt logo, zaokrąglone narożniki czy sylwetkę. Wystarczy dołączyć linię cięcia jako zamkniętą krzywą wektorową na osobnej warstwie w kolorze spot. Krawędzie po cięciu szlifujemy, żeby były gładkie. To przewaga druku na sztywnych płytach nad tablicami oklejanymi folią.",
      },
      {
        question: "Ile czasu zajmuje druk i dostawa tablicy?",
        answer:
          "Standardowo 4 dni robocze od potwierdzenia pliku: druk UV bezpośrednio na płycie, cięcie CNC do wymiaru, szlifowanie krawędzi i ewentualne wiercenie otworów montażowych. Kurier dokłada zwykle 1–2 dni robocze, a tablice pakujemy w sztywne narożniki ochronne, żeby nie uszkodziły się w transporcie. Większe formaty (70 × 100 cm) i serie kilku sztuk mogą wydłużyć termin o dobę.",
      },
    ],
    seoParagraph: [
      "Druk tablic reklamowych online to rozwiązanie dla firm, które potrzebują solidnej, trwałej reklamy zamiast tymczasowego banera. DobrePrinty realizuje druk tablic na piankowym forexie 3 mm i dibondzie aluminiowym 3 mm, zawsze technologią UV bezpośrednio na płycie, z cięciem CNC do dokładnego wymiaru. Cena brutto z VAT jest widoczna od razu w konfiguratorze — bez gwiazdek, bez dopłaty za cięcie, bez czekania na ofertę handlowca. Tablicę zamawiasz od jednej sztuki, w formatach od A3 po 70 × 100 cm lub w wymiarze niestandardowym.",
      "Tablice forex to najpopularniejszy wybór do wnętrz: lekkie, sztywne i tanie, świetnie sprawdzają się jako tablice informacyjne w gabinetach lekarskich, oznaczenia sal, menu i cenniki w restauracjach oraz szyldy w recepcjach. Tam, gdzie reklama ma stać na zewnątrz przez lata — szyldy na elewacjach, tablice firmowe przy wjazdach, oznaczenia parkingów — polecamy dibond aluminiowy, w pełni odporny na deszcz, słońce i mróz. Druk UV wtapia atrament w powierzchnię materiału, dzięki czemu tablica nie odkleja się ani nie blaknie jak nośniki oklejane folią.",
      "Druk tablic reklamowych w 28-osobowej sieci drukarni partnerskich pozwala obsłużyć zarówno pojedyncze sztuki (oznaczenie jednego gabinetu), jak i serie kilkudziesięciu tablic na sieć placówek. Cięcie CNC umożliwia dowolny kontur bez kosztu wykrojnika, a szlifowane krawędzie i otwory montażowe sprawiają, że tablica przychodzi gotowa do powieszenia. Tania tablica reklamowa nie musi oznaczać kompromisu na jakości — kontrolujemy plik przed drukiem (spady, rozdzielczość, CMYK), a każda drukarnia partnerska przechodzi kwartalny audyt jakości druku i terminowości.",
    ],
    aggregateRating: { value: "4.9", count: "0" },
    ctaCopy:
      "Wybierz materiał i format, wgraj plik — tablice reklamowe drukujemy UV z cięciem CNC, gotowe do montażu w 4 dni robocze.",
  },
  koszulki: {
    keyword: "koszulki z nadrukiem",
    heroLead:
      "Druk koszulek online z własnym projektem, od jednej sztuki. Drukujemy bezpośrednio na tkaninie (DTG) na białej bawełnie 100% 180 g — pełny kolor, miękki w dotyku nadruk, który nie pęka i nie blaknie w praniu. Wgraj grafikę w konfiguratorze i od razu zobacz podgląd na koszulce. Cena brutto z VAT widoczna od razu, dostawa w 3 dni robocze.",
    whyBlocks: [
      {
        tytul: "Koszulki z nadrukiem od 1 sztuki",
        opis: "Brak minimalnego nakładu — drukujemy jedną koszulkę na prezent tak samo chętnie, jak serię 200 sztuk na event firmowy. Technologia DTG nie wymaga sit ani matryc, więc opłaca się już przy pojedynczych sztukach i przy każdym, nawet najbardziej kolorowym projekcie.",
      },
      {
        tytul: "Podgląd nadruku przed zamówieniem",
        opis: "Wgraj swoją grafikę w konfiguratorze i zobacz, jak wygląda na białej koszulce — możesz dopasować rozmiar nadruku, zanim zamówisz. Plik produkcyjny w pełnej rozdzielczości dosyłasz w kroku zamówienia.",
      },
      {
        tytul: "Trwały druk DTG w pełnym kolorze",
        opis: "Druk bezpośredni na tkaninie (Direct To Garment) wtapia atrament w bawełnę: nadruk jest miękki, oddychający i odporny na pranie. Drukujemy pełen kolor ze zdjęciami i gradientami, bez dopłat za liczbę kolorów — inaczej niż w sitodruku.",
      },
      {
        tytul: "Rozmiary S–XXL, dostawa w 3 dni",
        opis: "Wybierasz rozmiar w konfiguratorze: S, M, L, XL lub XXL. Produkcja standardowo startuje w 24 h od potwierdzenia projektu, kurier dokłada zwykle 1–2 dni robocze w całej Polsce.",
      },
    ],
    params: [
      { parametr: "Materiał", wartosc: "Bawełna 100%", opcje: "180 g/m²" },
      { parametr: "Kolor", wartosc: "Biała" },
      { parametr: "Druk", wartosc: "DTG 4/0 (przód)", opcje: "pełny kolor" },
      { parametr: "Rozmiary", wartosc: "S, M, L, XL, XXL" },
      { parametr: "Pole nadruku", wartosc: "Przód, ~A4" },
      { parametr: "Czas realizacji", wartosc: "24–72 h" },
      { parametr: "Nakład", wartosc: "od 1 sztuki" },
    ],
    filePrepIntro:
      "Nadruk na koszulce wygląda najlepiej, gdy plik jest przygotowany pod druk na tkaninie. Poniżej krótki przewodnik — działa niezależnie od tego, czy projektujesz w Photoshopie, Illustratorze czy Canvie.",
    filePrepSteps: [
      {
        tytul: "1. Wgraj plik w wysokiej rozdzielczości",
        opis: "Najlepsza jest grafika w rozdzielczości minimum 300 dpi w docelowym rozmiarze nadruku (do A4). Grafiki wektorowe (PDF, SVG) skalują się bez utraty jakości — przy zdjęciach pilnuj rozdzielczości, bo nadruk DTG wiernie pokazuje piksele.",
      },
      {
        tytul: "2. Przezroczyste tło (PNG)",
        opis: "Jeśli nadruk ma nie mieć prostokątnego tła, zapisz plik jako PNG z przezroczystością. Na białej koszulce białe elementy projektu zleją się z materiałem — pamiętaj o tym przy jasnych grafikach.",
      },
      {
        tytul: "3. Pracuj w sRGB / CMYK",
        opis: "Druk DTG dobrze odwzorowuje żywe kolory, ale bardzo nasycone neony mogą wyjść nieco ciemniej. Trzymaj się sRGB lub CMYK i unikaj kolorów spoza gamutu druku, jeśli zależy Ci na wiernym odwzorowaniu.",
      },
      {
        tytul: "4. Sprawdź podgląd w konfiguratorze",
        opis: "Po wgraniu grafiki zobaczysz ją na koszulce. Dopasuj rozmiar nadruku suwakiem tak, by mieścił się w polu druku (ok. A4) i był wyśrodkowany na klatce piersiowej.",
      },
    ],
    faqs: [
      {
        question: "Czy mogę zamówić jedną koszulkę z własnym nadrukiem?",
        answer:
          "Tak, minimum to 1 sztuka. Druk DTG nie wymaga sit ani matryc, więc pojedyncza koszulka kosztuje tyle samo za sztukę co kilka — bez dopłat za przygotowanie. To idealne rozwiązanie na prezent albo próbkę przed większym zamówieniem.",
      },
      {
        question: "Czy nadruk nie spierze się po praniu?",
        answer:
          "Nie, jeśli przestrzegasz zaleceń: pranie do 30–40°C na lewej stronie, bez wybielaczy, prasowanie nadruku przez tkaninę lub na lewej stronie. Druk DTG wtapia atrament w bawełnę, więc przy prawidłowym praniu zachowuje kolor przez dziesiątki cykli.",
      },
      {
        question: "Jak duży może być nadruk na koszulce?",
        answer:
          "Standardowe pole nadruku na przodzie to mniej więcej format A4 (ok. 21 × 29 cm). W podglądzie w konfiguratorze widzisz dokładnie, jak grafika układa się na koszulce i możesz dopasować jej rozmiar przed zamówieniem.",
      },
      {
        question: "Czy drukujecie też na kolorowych koszulkach?",
        answer:
          "Na ten moment oferujemy nadruk na białej koszulce bawełnianej — to najtańsza i najbardziej uniwersalna opcja, na której kolory wychodzą najwierniej. Jeśli potrzebujesz koszulek w innym kolorze, napisz do nas na hej@dobreprinty.pl po wycenę indywidualną.",
      },
    ],
    seoParagraph: [
      "Koszulki z własnym nadrukiem to jeden z najpopularniejszych nośników reklamy i odzieży eventowej: koszulki firmowe dla zespołu, gadżety na konferencje i targi, koszulki na wieczory kawalerskie i panieńskie, prezenty z autorską grafiką. Druk DTG na białej bawełnie pozwala odtworzyć dowolnie kolorowy projekt — zdjęcie, ilustrację, logo z gradientem — bez dopłat za liczbę kolorów, które obowiązują w klasycznym sitodruku.",
      "Zamawianie koszulek online w DobrePrinty jest proste: wgrywasz grafikę, w podglądzie widzisz nadruk na koszulce, dopasowujesz jego rozmiar, wybierasz rozmiar koszulki i nakład, a cenę brutto z VAT widzisz od razu. Drukujemy od pojedynczych sztuk po serie na cały zespół, z dostawą kurierem w 3 dni robocze w całej Polsce.",
    ],
    aggregateRating: { value: "4.9", count: "210" },
    ctaCopy:
      "Wgraj grafikę, dopasuj nadruk w podglądzie i zamów — koszulki drukujemy od 1 sztuki, DTG w pełnym kolorze, dostawa w 3 dni.",
  },
  "torby-papierowe": {
    keyword: "torby papierowe",
    heroLead:
      "Druk papierowych toreb z własnym logo online. Ekologiczne opakowanie z papieru białego lub kraft 120 g, z uchwytem skręcanym i wzmacnianym dnem. Wgraj grafikę i zobacz podgląd nadruku na torbie. Cena brutto z VAT od razu, dostawa w 4 dni robocze.",
    whyBlocks: [
      {
        tytul: "Ekologiczne opakowanie z logo",
        opis: "Papierowa torba z nadrukiem to opakowanie, które klient nosi po całym mieście — chodząca reklama Twojej marki. W pełni nadająca się do recyklingu alternatywa dla foliówek, idealna do sklepów, kawiarni, cukierni i butików.",
      },
      {
        tytul: "Papier biały lub kraft",
        opis: "Wybierasz charakter opakowania: gładki biały papier pod żywy, pełnokolorowy nadruk albo naturalny kraft o ekologicznym, rzemieślniczym wyglądzie. Oba na gramaturze 120 g, z wzmacnianym dnem, które utrzyma realne zakupy.",
      },
      {
        tytul: "Podgląd nadruku przed zamówieniem",
        opis: "Wgraj grafikę w konfiguratorze i zobacz, jak wygląda na torbie. Dopasuj rozmiar nadruku, zanim zamówisz — plik produkcyjny w pełnej rozdzielczości dosyłasz w kroku zamówienia.",
      },
      {
        tytul: "Trzy rozmiary, dostawa w 4 dni",
        opis: "Mała, średnia i duża — dobierasz rozmiar pod swoje produkty. Produkcja startuje w 24–48 h od potwierdzenia projektu, kurier dokłada zwykle 1–2 dni robocze.",
      },
    ],
    params: [
      { parametr: "Papier", wartosc: "Biały lub kraft", opcje: "120 g/m²" },
      { parametr: "Druk", wartosc: "4/0 (przód)", opcje: "pełny kolor" },
      { parametr: "Uchwyt", wartosc: "Skręcany papierowy" },
      { parametr: "Rozmiary", wartosc: "18×8×22, 26×12×33, 32×14×42 cm" },
      { parametr: "Dno", wartosc: "Wzmacniane" },
      { parametr: "Czas realizacji", wartosc: "48–96 h" },
      { parametr: "Nakład", wartosc: "od 25 sztuk" },
    ],
    filePrepIntro:
      "Nadruk na papierowej torbie obejmuje przednią ściankę. Poniżej kilka wskazówek, jak przygotować plik, żeby logo i grafika wyszły czysto.",
    filePrepSteps: [
      {
        tytul: "1. Przygotuj grafikę pod przednią ściankę",
        opis: "Nadruk obejmuje front torby. Trzymaj kluczowe elementy (logo, nazwę) z dala od krawędzi i zagięcia dna, żeby nic nie zostało ucięte ani zniekształcone na zgięciu.",
      },
      {
        tytul: "2. Pracuj w CMYK, min. 300 dpi",
        opis: "Druk na papierze używa CMYK — pliki RGB zostaną przekonwertowane i intensywne kolory mogą wyjść mniej nasycone. Grafiki i zdjęcia w rozdzielczości minimum 300 dpi w docelowym rozmiarze.",
      },
      {
        tytul: "3. Pamiętaj o kolorze papieru kraft",
        opis: "Na papierze kraft nadruk drukujemy bez bieli podkładowej, więc kolory mieszają się z brązowym tłem (efekt eko, vintage). Jeśli chcesz wierne, jaskrawe kolory — wybierz papier biały.",
      },
      {
        tytul: "4. Sprawdź podgląd w konfiguratorze",
        opis: "Po wgraniu grafiki zobaczysz ją na torbie. Dopasuj rozmiar nadruku suwakiem tak, by był wyśrodkowany na przedniej ściance.",
      },
    ],
    faqs: [
      {
        question: "Jaki jest minimalny nakład toreb papierowych?",
        answer:
          "Minimum to 25 sztuk. Torby papierowe produkujemy seriami, dlatego najlepsze ceny jednostkowe osiągasz przy nakładach od 100 sztuk w górę. Dla mniejszych zamówień napisz do nas po wycenę indywidualną.",
      },
      {
        question: "Czym różni się papier biały od kraft?",
        answer:
          "Biały papier daje gładkie, jasne tło, na którym kolory nadruku są żywe i wierne — idealny do logo z mocnymi barwami. Kraft ma naturalny brązowy kolor i rzemieślniczy, ekologiczny charakter, ale nadruk miesza się z jego odcieniem. Wybór zależy od stylu marki.",
      },
      {
        question: "Czy torby utrzymają ciężkie zakupy?",
        answer:
          "Tak. Papier 120 g ze wzmacnianym dnem i skręcanym uchwytem papierowym jest przeznaczony do realnych zakupów — udźwig zależy od rozmiaru, ale standardowa średnia torba bez problemu uniesie kilka kilogramów.",
      },
    ],
    seoParagraph: [
      "Papierowe torby z nadrukiem to ekologiczne opakowanie, które jednocześnie pełni funkcję nośnika reklamy. Sprawdzają się w sklepach odzieżowych i obuwniczych, cukierniach i piekarniach, kawiarniach z daniami na wynos, butikach i na stoiskach targowych. Klient, który wychodzi z Twoją torbą, nieświadomie reklamuje markę wszędzie, gdzie się pojawi — to jeden z najtańszych sposobów na budowanie rozpoznawalności.",
      "W DobrePrinty zamawiasz torby papierowe online: wybierasz papier (biały lub kraft), rozmiar i nakład, wgrywasz grafikę i w podglądzie widzisz nadruk na torbie. Cena brutto z VAT widoczna od razu, bez czekania na ofertę handlowca. Drukujemy z dostawą kurierem w całej Polsce w 4 dni robocze.",
    ],
    aggregateRating: { value: "4.8", count: "96" },
    ctaCopy:
      "Wybierz papier i rozmiar, wgraj logo i zobacz podgląd — torby papierowe drukujemy od 25 sztuk, z dostawą w 4 dni.",
  },
  "torby-plocienne": {
    keyword: "torby płócienne",
    heroLead:
      "Druk płóciennych toreb bawełnianych z własnym nadrukiem A4. Ekologiczne torby tote z naturalnej bawełny, z długimi uchami na ramię. Im większy nakład, tym taniej — od 16 zł za sztukę do 10 zł przy większych ilościach. Wgraj grafikę i zobacz podgląd na torbie przed zamówieniem.",
    whyBlocks: [
      {
        tytul: "Ekologiczna reklama, którą się nosi",
        opis: "Płócienna torba bawełniana to nośnik reklamy wielokrotnego użytku — klient nosi ją na zakupy, na uczelnię i do pracy przez lata. Naturalna bawełna zamiast plastiku, a Twoje logo w obiegu każdego dnia.",
      },
      {
        tytul: "Cena maleje z nakładem: od 16 do 10 zł",
        opis: "Pojedyncza torba kosztuje 16 zł, a przy większych nakładach cena jednostkowa sukcesywnie spada aż do 10 zł za sztukę. Im więcej zamówisz — na event, dla zespołu czy do sklepu — tym mniej płacisz za każdą torbę.",
      },
      {
        tytul: "Pełnokolorowy nadruk A4",
        opis: "Drukujemy dowolny projekt w pełnym kolorze na polu wielkości A4 — zdjęcia, ilustracje, logo z gradientem. Bez dopłat za liczbę kolorów. Nadruk jest trwały i odporny na pranie zgodnie z zaleceniami.",
      },
      {
        tytul: "Podgląd nadruku przed zamówieniem",
        opis: "Wgraj grafikę w konfiguratorze i zobacz, jak wygląda na płóciennej torbie. Dopasuj rozmiar nadruku suwakiem — plik produkcyjny w pełnej rozdzielczości dosyłasz w kroku zamówienia.",
      },
    ],
    params: [
      {
        parametr: "Materiał",
        wartosc: "Bawełna naturalna",
        opcje: "~140 g/m²",
      },
      { parametr: "Druk", wartosc: "4/0 (przód)", opcje: "pełny kolor, do A4" },
      { parametr: "Uchwyt", wartosc: "Długie ucha na ramię" },
      { parametr: "Rozmiary", wartosc: "37×41, 38×42, 40×42 cm" },
      {
        parametr: "Cena",
        wartosc: "od 16 zł/szt.",
        opcje: "do 10 zł przy nakładzie",
      },
      { parametr: "Czas realizacji", wartosc: "24–72 h" },
      { parametr: "Nakład", wartosc: "od 1 sztuki" },
    ],
    filePrepIntro:
      "Nadruk na płóciennej torbie obejmuje pole wielkości A4 na przedniej ściance. Poniżej wskazówki, jak przygotować plik, żeby grafika wyszła ostro i wiernie.",
    filePrepSteps: [
      {
        tytul: "1. Wgraj grafikę min. 300 dpi",
        opis: "Najlepsza jest grafika w rozdzielczości minimum 300 dpi w docelowym rozmiarze nadruku (do A4, ok. 21 × 29 cm). Grafiki wektorowe (PDF, SVG) skalują się bez utraty jakości.",
      },
      {
        tytul: "2. Przezroczyste tło (PNG)",
        opis: "Jeśli nadruk nie ma mieć prostokątnego tła, zapisz plik jako PNG z przezroczystością. Na naturalnej bawełnie jasne i białe elementy projektu mogą zlewać się z materiałem.",
      },
      {
        tytul: "3. Pracuj w sRGB / CMYK",
        opis: "Druk na bawełnie wiernie oddaje żywe kolory, ale bardzo nasycone neony mogą wyjść nieco ciemniej. Trzymaj się sRGB lub CMYK, jeśli zależy Ci na przewidywalnym odwzorowaniu.",
      },
      {
        tytul: "4. Sprawdź podgląd w konfiguratorze",
        opis: "Po wgraniu grafiki zobaczysz ją na torbie. Dopasuj rozmiar nadruku suwakiem tak, by mieścił się w polu A4 i był wyśrodkowany na przedniej ściance.",
      },
    ],
    faqs: [
      {
        question: "Ile kosztuje płócienna torba z nadrukiem?",
        answer:
          "Pojedyncza torba kosztuje 16 zł, a cena jednostkowa maleje wraz z nakładem — przy 10 sztukach to 14 zł, przy 50 sztukach 12 zł, a od 250 sztuk już 10 zł za torbę. Pełną cenę brutto z VAT dla wybranego nakładu widzisz od razu w konfiguratorze.",
      },
      {
        question: "Czy mogę zamówić jedną płócienną torbę?",
        answer:
          "Tak, minimum to 1 sztuka. Druk nie wymaga matryc, więc możesz zamówić pojedynczą torbę na próbę albo na prezent. Pamiętaj jednak, że im większy nakład, tym niższa cena za sztukę — od 16 zł przy jednej do 10 zł przy większych ilościach.",
      },
      {
        question: "Jak duży jest nadruk na torbie?",
        answer:
          "Standardowe pole nadruku to format A4 (ok. 21 × 29 cm) na przedniej ściance. W podglądzie w konfiguratorze widzisz dokładnie, jak grafika układa się na torbie, i możesz dopasować jej rozmiar przed zamówieniem.",
      },
      {
        question: "Jak prać torbę, żeby nadruk się nie zniszczył?",
        answer:
          "Pierz w temperaturze do 30–40°C na lewej stronie, bez wybielaczy, i prasuj nadruk przez tkaninę lub na lewej stronie. Przy takim postępowaniu nadruk zachowuje kolor i nie pęka przez wiele cykli prania.",
      },
    ],
    seoParagraph: [
      "Płócienne torby bawełniane (tote bag) to ekologiczny nośnik reklamy wielokrotnego użytku, który zastępuje jednorazowe foliówki. Sprawdzają się jako torby firmowe, gadżety na konferencje, targi i festiwale, opakowania w sklepach ekologicznych i butikach, a także jako prezenty z autorską grafiką. W przeciwieństwie do papierowych toreb, płócienna służy latami — a wraz z nią Twoje logo krąży po mieście każdego dnia.",
      "W DobrePrinty zamawiasz torby płócienne online: wgrywasz grafikę, w podglądzie widzisz nadruk A4 na torbie, dopasowujesz jego rozmiar i wybierasz nakład. Cennik jest ilościowy — od 16 zł za pojedynczą sztukę do 10 zł przy większych nakładach — więc im więcej zamówisz, tym taniej wychodzi każda torba. Drukujemy pełnym kolorem na naturalnej bawełnie, z dostawą kurierem w całej Polsce w 3 dni robocze.",
    ],
    aggregateRating: { value: "4.92", count: "371" },
    ctaCopy:
      "Wgraj grafikę, zobacz podgląd na torbie i wybierz nakład — płócienne torby od 16 zł, taniej z każdą kolejną sztuką, dostawa w 3 dni.",
  },
  "test-platnosci-internal": {
    keyword: "test płatności",
    heroLead:
      "Wewnętrzny produkt do testu integracji Stripe end-to-end. Cena jednostkowa 1 grosz, bez opłaty rozruchowej. Nie widoczny na listach, w wyszukiwarce ani w sitemapie.",
    whyBlocks: [
      {
        tytul: "Test E2E",
        opis: "Weryfikuje pełną ścieżkę: konfigurator → Convex → Stripe Checkout → webhook → status zamówienia.",
      },
      {
        tytul: "Min. Stripe",
        opis: "163 szt. × 1 gr = 1,63 PLN netto → 2,00 PLN brutto. Trafia w minimum Stripe dla PLN (2,00).",
      },
      {
        tytul: "Ukryty",
        opis: "Brak na grid, search, related, sitemap, drukarnia-* /produkt/. Dostępny wyłącznie po bezpośrednim URL.",
      },
      {
        tytul: "Noindex",
        opis: "Strona ma robots: noindex, follow: false — Google jej nie zaindeksuje.",
      },
    ],
    params: [
      { parametr: "Cena jednostkowa", wartosc: "0,01 PLN netto" },
      { parametr: "Setup fee", wartosc: "Pominięte (noFees)" },
      { parametr: "Nakład domyślny", wartosc: "163 szt. → 2,00 PLN brutto" },
    ],
    filePrepIntro: "Wgranie pliku nie jest wymagane do testu Stripe.",
    filePrepSteps: [
      {
        tytul: "1. Zostaw nakład 163",
        opis: "163 szt. × 1 gr netto + 23% VAT = 2,00 PLN brutto, dokładne minimum Stripe.",
      },
      {
        tytul: "2. Wgraj dowolny plik PDF (opcjonalnie)",
        opis: "Możesz przejść bez pliku — pole jest opcjonalne.",
      },
      {
        tytul: "3. Sprawdź checkout",
        opis: "Po submit otrzymasz redirect do Stripe. Użyj karty testowej (4242 …) lub realnej.",
      },
      {
        tytul: "4. Zweryfikuj webhook",
        opis: "Po opłaceniu status w Convex powinien zmienić się na paid.",
      },
    ],
    faqs: [
      {
        question: "Dlaczego nakład 163?",
        answer:
          "Stripe PLN min = 2,00 PLN brutto. 163 szt. × 1 gr × 1,23 = 2,0049 → toFixed(2) = 2,00 → Stripe ok.",
      },
      {
        question: "Co przy mniejszym nakładzie?",
        answer:
          "Stripe odrzuci sesję: „Amount must convert to at least pln 2,00”.",
      },
      {
        question: "Czy strona jest indeksowana?",
        answer: "Nie. Metadata zawiera robots: noindex, follow: false.",
      },
    ],
    seoParagraph: ["Strona testowa, nieprzeznaczona do indeksacji."],
    aggregateRating: { value: "0", count: "0" },
    ctaCopy: "Tylko do testów wewnętrznych. Nie udostępniaj URL-a publicznie.",
  },
};

export function getProductContent(slug: string): ProductContent | undefined {
  return productContent[slug];
}
