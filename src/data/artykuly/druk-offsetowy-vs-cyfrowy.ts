import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "druk-offsetowy-vs-cyfrowy",
  title: "Druk offsetowy vs cyfrowy — różnice, kiedy co wybrać",
  excerpt:
    "Czym różni się druk offsetowy od cyfrowego? Porównanie technologii, kosztów, czasu realizacji i jakości. Praktyczny przewodnik z konkretnymi zaleceniami dla różnych nakładów.",
  category: "poradniki",
  tags: ["offset", "druk cyfrowy", "technologia", "drukarnia"],
  publishedAt: "2026-02-05",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["ulotki", "broszury-klejone", "wizytowki"],
  sections: [
    {
      type: "p",
      text: "Offset czy cyfra? To pytanie zadaje sobie każdy, kto pierwszy raz zamawia druk większego nakładu. Druk offsetowy króluje w nakładach masowych (1 000+), druk cyfrowy w mikronakładach (1-500). Ale granica nie jest jednoznaczna — niektóre projekty z 800 sztukami warto drukować offsetowo, inne z 5 000 sztukami — cyfrowo. W tym artykule rozkładamy obie technologie na czynniki pierwsze i pokazujemy, kiedy która ma sens.",
    },
    {
      type: "h2",
      id: "jak-dziala-offset",
      text: "Jak działa druk offsetowy",
    },
    {
      type: "p",
      text: "Druk offsetowy to klasyczna technologia pre-press oparta na przeniesieniu farby z formy drukowej (płyty offsetowej) na cylinder gumowy, a następnie na arkusz papieru. Każdy kolor (CMYK) ma osobną płytę i własny zespół drukujący. Wadą jest długi rozruch — przed pierwszym dobrym arkuszem trzeba wykonać 100-300 arkuszy próbnych, żeby ustabilizować kolor i pasowanie. Dlatego offset jest nieopłacalny dla małych nakładów.",
    },
    {
      type: "p",
      text: "Zalety offsetu: niska cena jednostkowa przy dużych nakładach (od 1000-2000 sztuk), wysoka jakość przy dużych powierzchniach (gradienty, tła, zdjęcia), trwałe pigmenty (lepsze od cyfrowego dla materiałów outdoorowych), elastyczność w doborze papieru (od najtańszego offsetu po grube kartony i specjalne podłoża).",
    },
    {
      type: "h2",
      id: "jak-dziala-cyfra",
      text: "Jak działa druk cyfrowy",
    },
    {
      type: "p",
      text: "Druk cyfrowy to bezpośredni transfer obrazu z pliku PDF na arkusz przez maszynę cyfrową (Konica Minolta, HP Indigo, Xerox). Brak płyt, brak rozruchu — pierwszy arkusz jest dobry. Każdy arkusz może być inny (personalizacja, druk zmiennej treści). Idealny dla mikronakładów (od 1 sztuki) i krótkich serii (do 500-1000 sztuk).",
    },
    {
      type: "p",
      text: "Zalety cyfry: brak rozruchu (opłacalne od 1 sztuki), personalizacja (każdy arkusz może być inny), szybki czas realizacji (24 h dla [wizytówek](/produkty/wizytowki), 48 h dla ulotek), brak konieczności magazynowania płyt. Wady: wyższa cena jednostkowa przy dużych nakładach, gorsza jakość przy intensywnych kolorach i dużych zalewkach (offset jest lepszy dla plakatów z pełnym tłem).",
    },
    {
      type: "table",
      caption: "Porównanie druku offsetowego i cyfrowego",
      headers: ["Parametr", "Offset", "Cyfra"],
      rows: [
        ["Minimalny nakład", "500-1000 sztuk (opłacalnie 2000+)", "1 sztuka"],
        ["Czas rozruchu", "30-60 minut", "0 minut"],
        ["Cena jednostkowa (mała seria)", "Wysoka", "Niska"],
        ["Cena jednostkowa (duża seria)", "Niska", "Wysoka"],
        ["Personalizacja", "Niemożliwa", "Pełna (każdy arkusz inny)"],
        ["Jakość koloru — gradienty", "Doskonała", "Bardzo dobra"],
        ["Jakość — drobny tekst", "Bardzo dobra", "Doskonała"],
        ["Trwałość pigmentów", "Dłuższa (lepsze do outdoor)", "Krótsza"],
        [
          "Dobór papieru",
          "Bardzo szeroki",
          "Ograniczony (głównie kreda 90-350g)",
        ],
        ["Czas realizacji", "5-7 dni roboczych", "1-2 dni robocze"],
      ],
    },
    {
      type: "h2",
      id: "kiedy-offset",
      text: "Kiedy wybrać offset",
    },
    {
      type: "p",
      text: "Offset to oczywisty wybór dla nakładów 2000+ sztuk. Cena jednostkowa spada drastycznie z każdą kolejną tysiącną sztukami — przy 5000 sztuk ulotek A5 cena jednostkowa może być nawet 60% niższa niż w cyfrze. Dla kampanii masowych (skrzynki pocztowe, gazety jako insert, [dystrybucja stoiskowa na targach](/blog/tani-druk-na-targi)), offset jest jedyną sensowną opcją.",
    },
    {
      type: "p",
      text: "Drugim scenariuszem dla offsetu są projekty z pełnokoorystymi tłami i gradientami. Maszyny offsetowe lepiej zachowują równomierność dużych płaszczyzn kolorystycznych — bez „smug” i „kresek”, które bywają widoczne w cyfrze przy intensywnych tłach. Dla [plakatów wielkoformatowych B1/A0](/produkty/plakaty) z pełnym kolorem na całej powierzchni — offset wielkoformatowy daje wyraźnie lepszy efekt niż druk cyfrowy.",
    },
    {
      type: "p",
      text: "Trzeci scenariusz: druk na nietypowych papierach. Offset obsługuje papiery specjalne (kraft, recycling, fakturowane, metalizowane), gramatury 400-500g, papier dwuwarstwowy (np. blockout). Drukarki cyfrowe są ograniczone do gładkich papierów kredowanych w gramaturach 90-350g.",
    },
    {
      type: "h2",
      id: "kiedy-cyfra",
      text: "Kiedy wybrać druk cyfrowy",
    },
    {
      type: "p",
      text: "Cyfra to oczywisty wybór dla mikronakładów: 1-100 sztuk wizytówek dla freelancera, 50 ulotek na targi lokalne, 25 plakatów A2 do gabloty szkolnej. Dla takich zamówień offset jest po prostu niedostępny — koszt rozruchu (płyty, kalibracja maszyny) przewyższałby koszt samego druku.",
    },
    {
      type: "p",
      text: "Cyfra wygrywa też tam, gdzie potrzebna jest personalizacja: 100 wizytówek z różnymi imionami dla zespołu, 500 zaproszeń z różnymi nazwiskami gości, 1000 pocztówek z różnymi adresami odbiorców. Offset nie obsługuje takiego druku — każdy arkusz musi być identyczny.",
    },
    {
      type: "p",
      text: "Trzeci scenariusz: szybki czas realizacji. Druk cyfrowy gotowy jest w 24-48 h od potwierdzenia pliku. Offset wymaga 3-5 dni (rozruch + druk + suszenie). Dla pilnych zamówień (konferencja w przyszłym tygodniu, premiera produktowa w piątek) cyfra jest jedyną opcją.",
    },
    {
      type: "h2",
      id: "ekonomia-prog-oplacalnosci",
      text: "Ekonomia — gdzie jest próg opłacalności",
    },
    {
      type: "table",
      caption:
        "Próg opłacalności offsetu vs cyfra dla typowych produktów (orientacyjnie)",
      headers: ["Produkt", "Próg opłacalności offsetu", "Komentarz"],
      rows: [
        [
          "Wizytówki 85×55 mm",
          "1500+ sztuk",
          "Pod tym progiem cyfra wygrywa cenowo",
        ],
        ["Ulotki A5", "2000+ sztuk", "Offset opłacalny dla kampanii masowych"],
        [
          "Ulotki A4",
          "1000+ sztuk",
          "Większy format = wcześniejszy próg opłacalności",
        ],
        ["Plakaty A2", "200+ sztuk", "Większy format = wcześniejszy próg"],
        ["Plakaty B1", "100+ sztuk", "Wielkoformat — offset szybko wygrywa"],
        [
          "Broszury klejone A5 (48 stron)",
          "500+ sztuk",
          "Składanie + klejenie wymaga offsetu od mniejszych nakładów",
        ],
        [
          "Pocztówki A6",
          "1500+ sztuk",
          "Mały format, podobne progi jak wizytówki",
        ],
      ],
    },
    {
      type: "p",
      text: "Progi w tabeli są orientacyjne — zależą od dokładnej specyfikacji (papier, gramatura, kolorystyka). W praktyce w DobrePrinty dobieramy technologię automatycznie: konfigurator pokazuje cenę, a my w tle wybieramy między cyfrą a offsetem partner-zależnie. Klient nie musi sam podejmować decyzji technologicznej — dostaje optymalną cenę przy zadanej jakości.",
    },
    {
      type: "h2",
      id: "jakosc-kolorow",
      text: "Jakość kolorów — różnice w praktyce",
    },
    {
      type: "p",
      text: "W większości projektów różnica w jakości kolorów między offsetem a cyfrą jest niezauważalna — oba systemy obsługują pełną gamę [CMYK](/blog/cmyk-vs-rgb) z profilem ISO Coated v2 (ECI). Różnica zaczyna być widoczna dla:",
    },
    {
      type: "list",
      items: [
        "Dużych płaszczyzn ciemnych kolorów (np. czarne tło na A2): offset równiejszy, cyfra może mieć smugi",
        "Gradientów (przejście z jednego koloru do drugiego): offset gładszy, cyfra może mieć „pasy”",
        "Drobnego tekstu (font 6-7 pt): cyfra ostrzejsza, offset bywa „rozmyty”",
        "Kolorów spot (PMS): offset może odwzorować PMS dokładnie, cyfra konwertuje do CMYK",
        "Bardzo intensywnych kolorów (neon, fluorescent): cyfra czasem lepsza dzięki dodatkowym tonerom (np. Indigo White)",
      ],
    },
    {
      type: "callout",
      variant: "info",
      text: "W DobrePrinty dla nakładów 100-2000 sztuk drukujemy cyfrowo (Konica Minolta lub HP Indigo). Dla 2000+ przechodzimy na offset. Dla 50-100 sztuk gdzie ważna jest jakość koloru (np. portfolio fotograficzne) używamy HP Indigo — daje praktycznie offsetową jakość przy cyfrowej elastyczności.",
    },
    {
      type: "h2",
      id: "papier-i-podloza",
      text: "Papier i podłoża — gdzie offset jest bezkonkurencyjny",
    },
    {
      type: "p",
      text: "Offset obsługuje praktycznie każdy papier i podłoże, którego dotknie wałek farby: kreda mat/błysk w gramaturach 90-450g, offsety, papiery ekologiczne, papiery z dodatkami (perła, srebro), kartony, blockouty (do roll-upów), folie samoprzylepne. Cyfra ma ograniczenia — większość drukarek cyfrowych przyjmuje papiery do max 350g i tylko gładkie. Papier kraft, recycled lub fakturowany nie wejdzie w drukarkę Konica Minolta.",
    },
    {
      type: "p",
      text: "Jeśli Twój projekt wymaga specjalnego papieru (np. wizytówki na kraftowym kartonie z efektem „starodawnej karty”), offset jest jedyną opcją. Cena będzie wyższa (papier specjalny + offset), ale efekt unikatowy.",
    },
    {
      type: "faq",
      items: [
        {
          q: "Czy klient widzi różnicę między drukiem offsetowym a cyfrowym?",
          a: "W większości przypadków nie — przy standardowych ulotkach reklamowych, wizytówkach, broszurach różnica jest niezauważalna. Klient zauważy różnicę tylko przy projektach „testujących technologię”: dużych płaszczyznach jednolitego koloru (gdzie offset jest równiejszy), drobnym tekście (gdzie cyfra jest ostrzejsza), gradientach (gdzie offset jest gładszy). 95% klientów nie odróżni druku cyfrowego od offsetowego.",
        },
        {
          q: "Czy mogę poprosić drukarnię o konkretną technologię?",
          a: "Tak, większość drukarni przyjmuje życzenie klienta. W DobrePrinty dobieramy automatycznie, ale przy zamówieniach 200+ zł klient może w konfiguratorze zaznaczyć preferowaną technologię (offset / cyfra). Dla nakładów 1500+ sztuk standardowo wybieramy offset, ale można zażyczyć cyfry (np. dla pilnego terminu).",
        },
        {
          q: "Czy offset jest droższy od cyfry?",
          a: "Zależy od nakładu. Dla 100 sztuk offset jest 5× droższy od cyfry (przez koszt rozruchu). Dla 5000 sztuk offset jest 60% tańszy od cyfry. Punkt przełamania jest typowo w okolicach 1500-2000 sztuk (zależnie od produktu). Nasz konfigurator automatycznie pokazuje cenę optymalną dla zadanego nakładu.",
        },
        {
          q: "Jaka technologia daje trwalsze kolory?",
          a: "Offset — pigmenty offsetowe są bardziej odporne na UV i czas niż tonery cyfrowe. Plakat outdoor z offsetu zachowuje intensywność kolorów 6-12 miesięcy, plakat cyfrowy 3-6 miesięcy. Dla materiałów archiwalnych (np. książki szyte nicią, plakaty muzealne) offset jest standardem.",
        },
        {
          q: "Czy druk cyfrowy nadaje się do druku zdjęć?",
          a: "Tak, szczególnie HP Indigo daje fotograficzną jakość — odwzorowanie kolorów lepsze niż standardowy offset CMYK. Dla portfolio fotograficznych, albumów rodzinnych, kalendarzy zdjęciowych Indigo jest świetnym wyborem. Konica Minolta to klasa niżej — wystarcza do większości projektów, ale fotograficy zauważają różnicę.",
        },
        {
          q: "Co to są kolory spot (PMS)?",
          a: "PMS (Pantone Matching System) to system standaryzowanych kolorów, używany w brand identity. Każdy kolor PMS ma unikalny numer (np. PMS 286 — niebieski Coca-Coli). Offset może odwzorować PMS dokładnie (osobna płyta dla danego koloru). Druk cyfrowy konwertuje PMS do najbliższego CMYK, co bywa różnicą widoczną gołym okiem. Dla projektów z brand colors PMS — offset jest lepszy.",
        },
        {
          q: "Kiedy NIE wybierać offsetu?",
          a: "Gdy nakład jest mały (do 500-1000 sztuk), gdy potrzebujesz personalizacji (każdy egzemplarz inny), gdy termin jest pilny (<3 dni), gdy projekt zawiera drobny tekst <8 pt (cyfra ostrzejsza), gdy budżet jest ograniczony do mikronakładu. Dla freelancerów, startupów i mikrofirm cyfra jest praktycznie zawsze właściwa.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Sprawdź, która technologia pasuje do Twojego projektu",
      body: "W konfiguratorze DobrePrinty wpisz nakład, format i papier — pokażemy optymalną cenę i czas realizacji. W tle dobierzemy najlepszą technologię (offset lub cyfra) dla Twojego zamówienia.",
      href: "/produkty/ulotki",
      label: "Skonfiguruj druk →",
    },
  ],
};
