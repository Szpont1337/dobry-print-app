import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "jak-przygotowac-nadruk-na-koszulke",
  title: "Jak przygotować nadruk na koszulkę — poradnik krok po kroku",
  excerpt:
    "Rozdzielczość 300 dpi, PNG z przezroczystością, pole nadruku A4 i podgląd 3D. Kompletny poradnik przygotowania pliku do druku DTG na koszulce.",
  category: "pliki-do-druku",
  tags: ["koszulki", "DTG", "pliki do druku", "PNG", "rozdzielczość"],
  publishedAt: "2026-06-11",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "HowTo",
  relatedProducts: ["koszulki"],
  sections: [
    {
      type: "p",
      text: "Dobry nadruk na koszulce zaczyna się od dobrego pliku. Możesz mieć świetny pomysł na grafikę, ale jeśli prześlesz ją w rozdzielczości 72 dpi, z białym tłem zamiast przezroczystości albo w rozmiarze znaczka pocztowego — efekt na bawełnie Cię rozczaruje. W tym poradniku przechodzimy krok po kroku przez cały proces przygotowania pliku do druku DTG: od rozdzielczości i formatu, przez kolory, po pole nadruku i podgląd 3D w konfiguratorze. Po lekturze będziesz wiedzieć dokładnie, jak przygotować grafikę, która na koszulce wygląda tak samo dobrze jak na ekranie. A jeśli zastanawiasz się, czy DTG to w ogóle dobra technologia dla Twojego projektu, zajrzyj do porównania [DTG vs sitodruk](/blog/druk-dtg-czy-sitodruk-koszulki).",
    },
    {
      type: "h2",
      id: "krok-1-rozdzielczosc",
      text: "Krok 1: Rozdzielczość — 300 dpi w skali 1:1",
    },
    {
      type: "p",
      text: "Najczęstsza przyczyna rozmytych nadruków to za niska rozdzielczość pliku. Standard w druku DTG to 300 dpi (punktów na cal) w docelowym rozmiarze nadruku. Co to znaczy w praktyce? Jeśli chcesz nadruk na całe pole A4 (21×29 cm), Twój plik powinien mieć co najmniej 2480×3425 pikseli. Grafika ściągnięta z internetu w rozmiarze 800×600 px po powiększeniu do formatu A4 będzie miała efektywnie około 70 dpi — na koszulce zobaczysz piksele i rozmyte krawędzie.",
    },
    {
      type: "p",
      text: "Jak sprawdzić rozdzielczość swojego pliku? W Photoshopie: Obraz → Rozmiar obrazu — zobaczysz wymiary w pikselach i dpi. W darmowym GIMP-ie: Obraz → Rozmiar wydruku. Możesz też policzyć samodzielnie: szerokość w pikselach podzielona przez szerokość nadruku w calach (1 cal = 2,54 cm) daje efektywne dpi. Ważne: nie da się „dorobić” rozdzielczości przez sztuczne powiększenie pliku w edytorze — program tylko rozmywa istniejące piksele. Jeśli masz logo w wektorze (AI, SVG, EPS), wyeksportuj je do PNG w wysokiej rozdzielczości — wektor można skalować bez strat.",
    },
    {
      type: "table",
      caption:
        "Minimalne wymiary pliku dla różnych rozmiarów nadruku (300 dpi)",
      headers: ["Rozmiar nadruku", "Wymiary w cm", "Minimalna liczba pikseli"],
      rows: [
        ["Małe logo na piersi", "8×8 cm", "945×945 px"],
        ["Średni nadruk", "15×15 cm", "1772×1772 px"],
        ["Nadruk A5", "14,8×21 cm", "1748×2480 px"],
        ["Pełne pole A4", "21×29 cm", "2480×3425 px"],
      ],
    },
    {
      type: "h2",
      id: "krok-2-format-png",
      text: "Krok 2: Format pliku — PNG z przezroczystym tłem",
    },
    {
      type: "p",
      text: "Do druku DTG na koszulce najlepszym formatem jest PNG z kanałem alfa, czyli z przezroczystym tłem. Dlaczego to takie ważne? Drukarka DTG nadrukowuje dokładnie to, co jest w pliku. Jeśli Twoja grafika ma białe tło (typowy JPG), na koszulce zostanie nadrukowany biały prostokąt z grafiką w środku — zamiast samej grafiki. Na białej koszulce różnica bywa subtelna, ale nadrukowany biały prostokąt ma inną fakturę niż tkanina i jest wyraźnie widoczny pod światło i w dotyku.",
    },
    {
      type: "p",
      text: "Jak usunąć tło? W Photoshopie użyj narzędzia Zaznaczanie obiektu lub Usuń tło, a następnie zapisz jako PNG-24. W GIMP-ie: dodaj kanał alfa (Warstwa → Przezroczystość → Dodaj kanał alfa), zaznacz tło różdżką i usuń. Istnieją też darmowe narzędzia online do usuwania tła — działają dobrze przy wyraźnych konturach, ale przy włosach, cieniach i półprzezroczystych elementach warto wynik skontrolować w powiększeniu. Format JPG odpada również dlatego, że stosuje kompresję stratną — wokół ostrych krawędzi (tekst, logo) pojawiają się artefakty, które drukarka wiernie odwzoruje na tkaninie.",
    },
    {
      type: "callout",
      variant: "warn",
      text: "Sprawdź plik na ciemnym tle przed wysłaniem. Otwórz PNG w przeglądarce lub edytorze i podłóż pod niego ciemne tło. Jeśli wokół grafiki widzisz białą obwódkę lub resztki tła — usuwanie tła nie zostało dokończone i te fragmenty zostaną nadrukowane.",
    },
    {
      type: "h2",
      id: "krok-3-kolory",
      text: "Krok 3: Kolory — sRGB lub CMYK, bez kanałów dodatkowych",
    },
    {
      type: "p",
      text: "W druku DTG plik możesz przygotować w przestrzeni sRGB lub CMYK — maszyna i tak konwertuje kolory do własnego profilu przed nadrukiem. Najbezpieczniejszy wybór to sRGB: to domyślna przestrzeń większości edytorów graficznych i ekranów, więc to, co widzisz na monitorze, jest najbliższe temu, co zobaczy operator. Jeśli pracujesz w programach DTP i masz plik w CMYK — też zadziała. Czego unikać? Egzotycznych przestrzeni (Adobe RGB, ProPhoto RGB) bez osadzonego profilu oraz kolorów spotowych (Pantone) — w DTG nie ma osobnych farb spotowych, więc zostaną przeliczone automatycznie, czasem z zaskakującym wynikiem.",
    },
    {
      type: "p",
      text: "Pamiętaj o ogólnej zasadzie znanej z każdego druku: ekran świeci, tkanina odbija światło. Bardzo jaskrawe, neonowe kolory RGB na bawełnie będą o ton spokojniejsze. Bardzo ciemne przejścia tonalne (np. grafika utrzymana w odcieniach grafitu na czarnym tle gradientu) mogą się zlewać. Jeśli kolory są krytyczne — np. firmowy odcień z księgi znaku — warto najpierw zamówić jedną sztukę próbną. Przy druku [od 1 sztuki](/produkty/koszulki) to tani sposób na weryfikację: koszulka próbna kosztuje 39 zł i dociera w 3 dni robocze.",
    },
    {
      type: "h2",
      id: "krok-4-pole-nadruku",
      text: "Krok 4: Pole nadruku — maksymalnie A4 (21×29 cm) na przodzie",
    },
    {
      type: "p",
      text: "Standardowe pole nadruku DTG na naszych koszulkach to format zbliżony do A4: 21×29 cm na przodzie koszulki. To dużo — wystarczy na pełnowymiarową grafikę „na całą pierś”. Nie musisz jednak wykorzystywać całego pola. Małe logo na lewej piersi (8–10 cm szerokości), poziomy napis pod dekoltem czy pionowa grafika wzdłuż boku — wszystko mieści się w tym samym polu, a o pozycji decydujesz w konfiguratorze. Druk wykonujemy w trybie 4/0, czyli pełny kolor na przodzie — tył pozostaje czysty.",
    },
    {
      type: "list",
      items: [
        "Grafika na całą pierś: wykorzystaj pełne pole 21×29 cm, ale zostaw 1–2 cm „oddechu” od krawędzi pola — nadruk pod samą szyją wygląda ciasno",
        "Logo na piersi: 8–10 cm szerokości to klasyka — większe logo na małej koszulce (S) optycznie dominuje",
        "Napis poziomy: maksymalnie 21 cm szerokości; pamiętaj, że na rozmiarze S i XXL ta sama szerokość wygląda inaczej względem sylwetki",
        "Cienkie linie i mały tekst: minimum 1,5–2 pkt grubości linii i 8 pkt tekstu — bawełna ma fakturę i bardzo drobne detale się w niej „rozpływają”",
      ],
    },
    {
      type: "h2",
      id: "krok-5-podglad-3d",
      text: "Krok 5: Podgląd 2D i 3D w konfiguratorze",
    },
    {
      type: "p",
      text: "Po przygotowaniu pliku wgraj go do konfiguratora na stronie produktu. Zobaczysz podgląd nadruku w 2D — płaski widok przodu koszulki z naniesioną grafiką w skali — oraz podgląd 3D, w którym możesz obrócić koszulkę i ocenić, jak nadruk układa się na sylwetce. To najlepszy moment na korekty: sprawdź, czy grafika nie jest za wysoko lub za nisko, czy proporcje względem koszulki są takie, jak sobie wyobrażasz, i czy nic nie zostało przycięte na granicy pola nadruku. Finalny plik produkcyjny wgrywasz w kroku zamówienia — to on trafia na maszynę, więc upewnij się, że wgrywasz wersję ostateczną, w pełnej rozdzielczości.",
    },
    {
      type: "callout",
      variant: "tip",
      text: "Podgląd 3D świetnie weryfikuje skalę nadruku. Grafika, która na ekranie wydaje się duża, na koszulce w widoku 3D często okazuje się skromna — i odwrotnie. Obróć model, spójrz z dystansu i dopiero wtedy zatwierdź rozmiar.",
    },
    {
      type: "h2",
      id: "typowe-bledy",
      text: "Typowe błędy — i jak ich uniknąć",
    },
    {
      type: "p",
      text: "Po setkach zrealizowanych zamówień widzimy, że te same błędy wracają regularnie. Dobra wiadomość: każdy z nich łatwo wyeliminować przed wysłaniem pliku. Oto lista kontrolna, którą warto przejść przed kliknięciem „Zamów” — zajmie Ci to dwie minuty, a oszczędzi rozczarowania przy odbiorze paczki.",
    },
    {
      type: "p",
      text: "Osobna kategoria błędów to pomyłki organizacyjne, nie graficzne. Najczęstsza: wgranie roboczej wersji pliku zamiast finalnej — wersji z literówką w haśle, ze starym logo albo z warstwą pomocniczą, która miała zostać ukryta. Przed wgraniem pliku produkcyjnego w kroku zamówienia otwórz go raz jeszcze i przeczytaj każdy napis na głos; literówka na dwudziestu koszulkach eventowych boli bardziej niż na jednej. Druga pomyłka: projektowanie grafiki pod ciemną koszulkę, podczas gdy nasze koszulki są białe — jasnożółty napis, który świetnie wyglądał na czarnym tle projektu, na białej bawełnie będzie ledwo widoczny.",
    },
    {
      type: "table",
      caption: "Najczęstsze błędy w plikach do nadruku na koszulki",
      headers: ["Błąd", "Skutek na koszulce", "Jak naprawić"],
      rows: [
        [
          "Rozdzielczość poniżej 150 dpi",
          "Rozmyte krawędzie, widoczne piksele",
          "Plik min. 300 dpi w skali 1:1; logo eksportuj z wektora",
        ],
        [
          "JPG z białym tłem",
          "Nadrukowany biały prostokąt wokół grafiki",
          "PNG z przezroczystością, kontrola na ciemnym tle",
        ],
        [
          "Resztki tła po wycinaniu",
          "Biała obwódka lub „duchy” wokół konturu",
          "Powiększ do 200–300% i doczyść krawędzie",
        ],
        [
          "Mały tekst poniżej 8 pkt",
          "Nieczytelne litery wtopione w fakturę tkaniny",
          "Zwiększ tekst lub uprość projekt",
        ],
        [
          "Półprzezroczyste cienie i poświaty",
          "Brudne, szare plamy zamiast delikatnego efektu",
          "Unikaj przezroczystości poniżej 30% krycia",
        ],
        [
          "Grafika dotykająca krawędzi pola",
          "Przycięty nadruk",
          "Zostaw margines wewnątrz pola 21×29 cm",
        ],
      ],
    },
    {
      type: "h2",
      id: "po-druku-pranie",
      text: "Po druku: jak dbać o koszulkę z nadrukiem DTG",
    },
    {
      type: "p",
      text: "Nadruk DTG na bawełnie 100% (180 g/m²) jest trwały, ale jego żywotność zależy od pielęgnacji. Pierz koszulkę na lewej stronie, w temperaturze do 30–40°C — wyższe temperatury i tarcie o bęben pralki przyspieszają blaknięcie. Unikaj suszenia w suszarce bębnowej na wysokiej temperaturze i prasowania bezpośrednio po nadruku (jeśli musisz — prasuj na lewej stronie). Przy takiej pielęgnacji nadruk zniesie dziesiątki prań bez wyraźnej utraty koloru. Te same zasady projektowe — rozdzielczość, przezroczystość, skala — obowiązują zresztą przy innych tekstyliach; jeśli planujesz spójny zestaw gadżetów, zobacz poradnik [jak zaprojektować nadruk na torbę](/blog/jak-zaprojektowac-nadruk-na-torbe).",
    },
    {
      type: "faq",
      items: [
        {
          q: "Jaki format pliku jest najlepszy do nadruku na koszulce?",
          a: "PNG z przezroczystym tłem (kanał alfa), w rozdzielczości 300 dpi w docelowym rozmiarze nadruku. JPG odpada przez brak przezroczystości i artefakty kompresji. Jeśli masz logo w wektorze (AI, SVG, EPS), wyeksportuj je do PNG w wysokiej rozdzielczości.",
        },
        {
          q: "Czy mogę użyć grafiki znalezionej w internecie?",
          a: "Technicznie — tylko jeśli ma wystarczającą rozdzielczość (zwykle nie ma). Prawnie — tylko jeśli masz licencję na jej użycie. Grafiki z wyszukiwarki są zwykle chronione prawem autorskim. Bezpieczne źródła to banki zdjęć z licencją komercyjną, własne projekty i grafiki na licencjach otwartych.",
        },
        {
          q: "Jak duży może być nadruk na koszulce?",
          a: "Maksymalne pole nadruku to format zbliżony do A4: 21×29 cm na przodzie koszulki. W tym polu możesz umieścić grafikę dowolnej wielkości i w dowolnej pozycji — od małego logo na piersi po pełnowymiarowy projekt na całą pierś.",
        },
        {
          q: "Czy nadruk DTG może mieć gradienty i zdjęcia?",
          a: "Tak — to największa zaleta DTG. Technologia drukuje pełny kolor (4/0) bez dopłat za liczbę barw, więc fotografie, gradienty i wielokolorowe ilustracje wychodzą bardzo dobrze. Unikaj jedynie bardzo delikatnych przezroczystości (poniżej 30% krycia), które na tkaninie wyglądają jak szare plamy.",
        },
        {
          q: "Co jeśli mój plik ma za niską rozdzielczość?",
          a: "Najlepiej wrócić do źródła: poprosić grafika o eksport w wyższej rozdzielczości lub odtworzyć logo w wektorze. Sztuczne powiększanie pliku w edytorze nie doda detali — program tylko rozmyje piksele. Przy prostych grafikach (logo, napis) odtworzenie w wektorze to zwykle szybka praca.",
        },
        {
          q: "Czy zobaczę, jak nadruk będzie wyglądał przed zamówieniem?",
          a: "Tak. W konfiguratorze na stronie produktu wgrywasz grafikę i widzisz podgląd 2D oraz 3D — możesz obrócić koszulkę i ocenić pozycję oraz skalę nadruku na sylwetce. Finalny plik produkcyjny wgrywasz w kroku zamówienia.",
        },
        {
          q: "W jakiej temperaturze prać koszulkę z nadrukiem?",
          a: "Do 30–40°C, na lewej stronie. Unikaj suszarki bębnowej na wysokich temperaturach i prasowania bezpośrednio po nadruku. Przy takiej pielęgnacji nadruk DTG wytrzymuje dziesiątki prań.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Masz gotowy plik? Sprawdź go w konfiguratorze",
      body: "Wgraj grafikę, obejrzyj podgląd 2D i 3D, wybierz rozmiar. Biała bawełna 100% (180 g/m²), pełny kolor DTG, od 39 zł za sztukę — już od 1 koszulki, wysyłka w 3 dni robocze.",
      href: "/produkty/koszulki",
      label: "Zamów koszulki →",
    },
  ],
};
