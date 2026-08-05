import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "overprint-naddruk-w-druku",
  title: "Overprint (naddruk) w druku — czym jest i kiedy go używać",
  excerpt:
    "Overprint i knockout w druku offsetowym i cyfrowym: definicja, różnice, pułapka białego naddruku, czarny tekst K100 i jak sprawdzić overprint w Acrobacie przed wysłaniem pliku.",
  category: "pliki-do-druku",
  tags: ["overprint", "naddruk", "DTP", "CMYK", "PDF"],
  publishedAt: "2026-07-24",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["ulotki", "wizytowki"],
  sections: [
    {
      type: "p",
      text: "Overprint (po polsku naddruk) to jedno z tych ustawień DTP, które potrafi zniszczyć projekt bez ostrzeżenia — plik wygląda idealnie na ekranie, a z maszyny schodzi z brakującym logo albo z białym napisem, który zniknął bez śladu. To najczęstsza „niewidzialna” przyczyna reklamacji, bo błędu nie widać w zwykłym podglądzie PDF-a. W tym poradniku wyjaśniamy dokładnie, czym jest overprint, czym różni się od knockoutu, kiedy naddruk jest Twoim sprzymierzeńcem, a kiedy pułapką, i jak sprawdzić go w Acrobacie w 30 sekund, zanim plik trafi do drukarni.",
    },
    {
      type: "h2",
      id: "czym-jest-overprint",
      text: "Czym jest overprint (naddruk)",
    },
    {
      type: "p",
      text: "Overprint to ustawienie, przy którym górny obiekt drukuje się BEZPOŚREDNIO NA obiekcie leżącym pod spodem, zamiast go „wybić” (usunąć). Farby obu obiektów nakładają się na tym samym miejscu arkusza i mieszają optycznie. Przeciwieństwem jest knockout (wybieranie): górny obiekt wycina w tle dziurę o swoim kształcie, dzięki czemu drukuje się tylko on, na czystym, niezadrukowanym papierze. Knockout jest ustawieniem domyślnym w programach DTP — overprint włączasz świadomie lub, częściej niż myślisz, przypadkiem.",
    },
    {
      type: "p",
      text: "Prosty przykład: żółty tekst na niebieskim tle. Przy knockoucie maszyna nakłada żółć na biały papier w kształcie liter — tekst jest czysto żółty. Przy overprincie żółć drukuje się na niebieskim tle — a żółty + niebieski daje zielony. Twój żółty napis wychodzi zielony. To nie awaria maszyny, tylko włączony naddruk.",
    },
    {
      type: "h2",
      id: "overprint-vs-knockout",
      text: "Overprint vs knockout — porównanie",
    },
    {
      type: "table",
      caption: "Overprint (naddruk) kontra knockout (wybieranie) w skrócie",
      headers: ["Cecha", "Overprint / naddruk", "Knockout / wybieranie"],
      rows: [
        [
          "Co się dzieje",
          "Górny obiekt drukuje się na tle, farby się nakładają",
          "Górny obiekt wycina tło i drukuje na czystym papierze",
        ],
        [
          "Kolor wynikowy",
          "Mieszanka obu farb (żółć na cyjanie = zieleń)",
          "Czysty kolor górnego obiektu",
        ],
        [
          "Ustawienie domyślne",
          "Nie — trzeba włączyć",
          "Tak — standard w InDesign/Illustrator",
        ],
        [
          "Typowe zastosowanie",
          "Czarny tekst K100, pułapki (trapping), efekty",
          "Kolorowa grafika na kolorowym tle",
        ],
        [
          "Ryzyko",
          "Biały overprint = obiekt znika; zmiana koloru",
          "Białe szczeliny przy pasowaniu (dlatego stosuje się trapping)",
        ],
      ],
    },
    {
      type: "callout",
      variant: "warn",
      text: "Najgroźniejszy błąd: overprint ustawiony na obiekcie BIAŁYM. Biel w druku to brak farby, czyli kolor papieru. Biały obiekt z włączonym naddrukiem nie wybija tła — a skoro sam nie ma farby, to znika całkowicie. Białe logo na czarnej wizytówce z overprintem po prostu nie wydrukuje się. To jedna z najczęstszych przyczyn reklamacji, których nie widać w zwykłym podglądzie.",
    },
    {
      type: "h2",
      id: "kiedy-uzywac-overprint",
      text: "Kiedy naddruk jest pożądany",
    },
    {
      type: "p",
      text: "Overprint nie jest wrogiem — w kilku sytuacjach jest wręcz niezbędny i dlatego RIP-y drukarni często wymuszają go automatycznie:",
    },
    {
      type: "list",
      items: [
        "Czarny tekst K100 na kolorowym tle — naddruk czerni zapobiega białym szczelinom (misregistration), gdyby pasowanie maszyny było o włos przesunięte. Drobny czarny tekst prawie zawsze powinien być na overprint.",
        "Trapping (zalewkowanie) — celowe nakładanie krawędzi sąsiadujących kolorów o kilka setnych milimetra, żeby przy niedokładnym pasowaniu nie prześwitywał biały papier.",
        "Lakier wybiórczy i biały podkład — warstwy technologiczne (spot UV, białe krycie na folii) definiuje się jako overprint, żeby leżały na grafice, a nie ją wycinały.",
        "Linie cięcia, bigowania i technologiczne w kolorach spot — zawsze na overprint, żeby nie wybijały dziur w projekcie.",
      ],
    },
    {
      type: "h3",
      id: "czarny-tekst-k100",
      text: "Czarny tekst — K100 na overprint, ale nie duże aple",
    },
    {
      type: "p",
      text: "Drobny czarny tekst i cienkie linie: K100 (100% czarnego, zero CMY) na naddruku — to bezpieczne i zalecane. Duże czarne aple i tła to inna historia: sam K100 na overprincie potrafi prześwitywać (spod czerni widać kolor tła). Do dużych czarnych powierzchni użyj rich black w knockoucie, a nie K100 na naddruku. Różnicę między czernią techniczną a rich black rozkładamy na czynniki pierwsze w osobnym poradniku o [rich black vs czarny K100](/blog/rich-black-vs-czarny-k100).",
    },
    {
      type: "h2",
      id: "pulapki-overprint",
      text: "Pułapki — jak naddruk psuje projekty",
    },
    {
      type: "list",
      items: [
        "Biały obiekt na overprint → znika z wydruku (opisane wyżej — najczęstszy przypadek).",
        "Kolorowy obiekt na overprint na kolorowym tle → niezamierzona zmiana barwy (żółty robi się zielony, magenta na cyjanie robi się fiolet).",
        "Overprint „przeniesiony” z logo klienta — pliki firmowe bywają zapisane z ustawieniami nadruku, które w Twoim layoutcie dają inny efekt niż u autora.",
        "Efekt mnożenia (Multiply) mylony z overprintem — tryb mieszania z panelu przezroczystości wygląda podobnie na ekranie, ale RIP interpretuje go inaczej niż atrybut overprint.",
      ],
    },
    {
      type: "h2",
      id: "jak-sprawdzic",
      text: "Jak sprawdzić overprint przed wysłaniem",
    },
    {
      type: "p",
      text: "Podstawowa zasada: nigdy nie ufaj zwykłemu podglądowi. Domyślnie programy i przeglądarki symulują knockout, więc overprint jest niewidoczny do momentu, aż go świadomie podejrzysz. Oto jak:",
    },
    {
      type: "list",
      items: [
        "Adobe Acrobat Pro: Widok → Narzędzia → Print Production → Output Preview → zaznacz „Simulate Overprinting”. Napisy i obiekty, które znikają lub zmieniają kolor po zaznaczeniu, mają problem.",
        "Adobe InDesign / Illustrator: włącz View → Overprint Preview (Podgląd nadruku), skrót Ctrl+Alt+Shift+Y. Przełączaj go i patrz, co się zmienia.",
        "W Acrobacie sprawdź też Output Preview → separacje: wyłączaj kolejne płyty CMYK i patrz, czy pod czarnym tekstem jest tło (K100 na overprint) czy dziura (knockout).",
        "Preflight (Acrobat / PDF/X): profil kontroli wstępnej wykryje białe obiekty z nadrukiem i ostrzeże przed wysyłką.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Szybki test na przyszłość: zanim zamkniesz projekt, włącz Overprint Preview i przewiń całość. Jeśli nic nie zniknęło i nie zmieniło koloru — jesteś bezpieczny. Ten jeden odruch eliminuje większość „niewidzialnych” reklamacji. Zapisuj plik jako [PDF/X](/blog/format-pdf-pdf-x-rozne-standardy), bo ten standard porządkuje obsługę nadruku i przezroczystości.",
    },
    {
      type: "h2",
      id: "overprint-a-cmyk",
      text: "Overprint działa tylko w CMYK i spot",
    },
    {
      type: "p",
      text: "Overprint to koncept druku rozbarwianego — ma sens wyłącznie w przestrzeni CMYK i kolorach dodatkowych (Pantone/spot). W RGB nie istnieje. Dlatego zanim zaczniesz walczyć z nadrukiem, upewnij się, że projekt jest w [CMYK, a nie RGB](/blog/cmyk-vs-rgb) — inaczej i tak czekają Cię niespodzianki kolorystyczne po konwersji. Kolejność jest prosta: najpierw poprawna przestrzeń barw, potem kontrola overprintu, na końcu eksport do PDF/X i [sprawdzenie pliku przed drukiem](/blog/jak-przygotowac-pdf-do-druku).",
    },
    {
      type: "faq",
      items: [
        {
          q: "Czym różni się overprint od knockout?",
          a: "Overprint (naddruk) drukuje górny obiekt na tle, więc farby się nakładają i mieszają. Knockout (wybieranie) wycina w tle dziurę w kształcie górnego obiektu, więc drukuje się on na czystym papierze w swoim czystym kolorze. Knockout jest ustawieniem domyślnym; overprint włącza się świadomie.",
        },
        {
          q: "Dlaczego mój biały napis zniknął z wydruku?",
          a: "Najprawdopodobniej biały obiekt miał włączony overprint. Biel w druku to brak farby (kolor papieru), więc biały obiekt na naddruku nie wybija tła i sam się nie drukuje — po prostu znika. Wyłącz overprint na wszystkich białych elementach.",
        },
        {
          q: "Czy czarny tekst powinien być na overprint?",
          a: "Drobny czarny tekst i cienkie linie w K100 — tak, naddruk zapobiega białym szczelinom przy niedokładnym pasowaniu. Duże czarne aple i tła — nie w K100; użyj rich black w knockoucie, bo sam K100 na naddruku potrafi prześwitywać kolorem tła.",
        },
        {
          q: "Jak zobaczyć overprint w pliku PDF?",
          a: "W Adobe Acrobat Pro: Print Production → Output Preview → zaznacz „Simulate Overprinting”. W InDesign i Illustratorze włącz View → Overprint Preview (Ctrl+Alt+Shift+Y). Obiekty, które po włączeniu podglądu znikają lub zmieniają kolor, mają problem z nadrukiem.",
        },
        {
          q: "Czy overprint działa w RGB?",
          a: "Nie. Overprint to mechanizm druku rozbarwianego i istnieje tylko w CMYK oraz kolorach spot (Pantone). W plikach RGB pojęcie nadruku nie ma zastosowania — dlatego projekty do druku zawsze przygotowuj w CMYK.",
        },
        {
          q: "Kto ustawia trapping — ja czy drukarnia?",
          a: "W nowoczesnym workflow zalewkowanie (trapping) wykonuje najczęściej RIP drukarni automatycznie, więc zwykle nie musisz robić go ręcznie. Twoim zadaniem jest poprawne przygotowanie pliku: CMYK, czarny tekst K100 na overprint, brak białych obiektów z nadrukiem i eksport do PDF/X.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Nie masz pewności co do nadruku w pliku?",
      body: "Wgraj projekt do DobrePrinty — w kontroli przed drukiem sprawdzamy overprint, białe obiekty z nadrukiem, czerń tekstu i przestrzeń barw, zanim ruszy maszyna. Ulotki, wizytówki i materiały firmowe z profesjonalnym preflightem w cenie.",
      href: "/produkty/ulotki",
      label: "Zamów druk w DobrePrinty →",
    },
  ],
};
