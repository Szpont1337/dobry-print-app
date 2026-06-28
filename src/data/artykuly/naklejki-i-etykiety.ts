import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "naklejki-i-etykiety",
  title: "Naklejki i etykiety — formaty, kleje, podłoża",
  excerpt:
    "Druk naklejek i etykiet samoprzylepnych. Folia transparentna, biała, papier, klej trwały vs zmywalny. Zastosowania produktowe, promocyjne i logistyczne.",
  category: "produkty",
  tags: ["naklejki", "etykiety", "folia", "samoprzylepne", "produkt"],
  publishedAt: "2026-05-26",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["ulotki", "wizytowki"],
  sections: [
    {
      type: "p",
      text: "Naklejka to najprostszy sposób na umieszczenie logo, informacji produktowej lub komunikatu promocyjnego na dowolnej powierzchni. Od etykiet na słoikach z dżemem, przez naklejki na laptopach, po oznaczenia logistyczne na kartonach — każde zastosowanie wymaga innego materiału, kleju i wykończenia. W tym poradniku porównujemy podłoża, rodzaje klejów i formaty, żeby pomóc Ci zamówić dokładnie to, czego potrzebujesz.",
    },
    {
      type: "h2",
      id: "podloza",
      text: "Podłoża — papier, folia biała, folia transparentna",
    },
    {
      type: "table",
      caption: "Porównanie podłoży do druku naklejek",
      headers: ["Podłoże", "Wygląd", "Trwałość", "Zastosowanie", "Cena"],
      rows: [
        [
          "Papier biały",
          "Matowy, naturalny",
          "6-12 mies. (wewnątrz)",
          "Etykiety produktowe, naklejki adresowe",
          "Niska",
        ],
        [
          "Papier kraft",
          "Brązowy, ekologiczny",
          "6-12 mies. (wewnątrz)",
          "Produkty eko, kosmetyki naturalne, rękodzieło",
          "Niska",
        ],
        [
          "Folia biała (PP)",
          "Biały, gładki",
          "24+ mies. (outdoor)",
          "Naklejki na samochody, sprzęt, opakowania",
          "Średnia",
        ],
        [
          "Folia transparentna",
          "Przezroczysty",
          "24+ mies. (outdoor)",
          "Etykiety na butelki, słoiki, opakowania szklane",
          "Średnia",
        ],
        [
          "Folia srebrna/złota",
          "Metaliczny połysk",
          "24+ mies.",
          "Etykiety premium, alkohole, kosmetyki",
          "Wyższa",
        ],
        [
          "Vinyl",
          "Matowy lub błyszczący",
          "3-5 lat (outdoor)",
          "Naklejki na samochody, witryny, tablice",
          "Wyższa",
        ],
      ],
    },
    {
      type: "h2",
      id: "rodzaje-klejow",
      text: "Rodzaje klejów — trwały, zmywalny, mrozoodporny",
    },
    {
      type: "p",
      text: "Klej trwały (permanent) to standard — po naklejeniu oderwanie niszczy naklejkę lub zostawia ślady kleju. Klej zmywalny (removable) pozwala na oderwanie naklejki bez śladów w ciągu 24-72 h od naklejenia — potem klej twardnieje i staje się trwały. Klej mrozoodporny wytrzymuje temperatury do -30°C bez utraty przyczepności.",
    },
    {
      type: "table",
      caption: "Rodzaje klejów do naklejek",
      headers: ["Klej", "Odrywalność", "Temp. stosowania", "Zastosowanie"],
      rows: [
        [
          "Trwały (permanent)",
          "Nie — niszczy naklejkę",
          "-10°C do +60°C",
          "Etykiety produktowe, oznaczenia trwałe",
        ],
        [
          "Zmywalny (removable)",
          "Tak — do 72 h",
          "+5°C do +50°C",
          "Ceny, promocje, naklejki na samochody demo",
        ],
        [
          "Mrozoodporny",
          "Nie",
          "-30°C do +60°C",
          "Mrożonki, chłodnie, logistyka zimowa",
        ],
        [
          "Wzmocniony (high-tack)",
          "Nie",
          "-10°C do +80°C",
          "Nierówne powierzchnie, kartony faliste, drewno",
        ],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Klej zmywalny na powierzchniach porowatych (karton, drewno surowe) szybko staje się trwały — pory wchłaniają klej w ciągu kilku godzin. Na gładkich powierzchniach (szkło, metal, plastik) zachowuje odrywalność dłużej.",
    },
    {
      type: "h2",
      id: "formaty-i-wycinanie",
      text: "Formaty i wycinanie — arkusz, rola, wykrojnik",
    },
    {
      type: "p",
      text: "Naklejki prostokątne i kwadratowe są najtańsze — cięcie prostolinijne. Naklejki okrągłe, owalne i o niestandardowym kształcie wymagają wykrojnika (ploter tnący lub die-cut). Koszt wykrojnika jest wliczony w cenę przy druku cyfrowym (ploter tnie każdy kształt bez dodatkowych opłat). W druku offsetowym wykrojnik to dodatkowy koszt 100-300 zł.",
    },
    {
      type: "list",
      items: [
        "Naklejki na arkuszach A4/A3 — łatwe do dystrybucji, klient sam odrywa, dobre dla gadżetów i eventów",
        "Naklejki na rolce — do automatów etykietujących, szybkiego oklejania produktów, rolka 500-5000 szt.",
        "Naklejki indywidualnie cięte — każda naklejka osobno, z podkładem, gotowa do naklejenia",
        "Arkusze z naklejkami (kiss-cut) — naklejki nacięte, ale nie oderwane od podkładu, klient odrywam sam",
      ],
    },
    {
      type: "h2",
      id: "wykończenia-naklejek",
      text: "Wykończenia naklejek",
    },
    {
      type: "list",
      items: [
        "Laminat matowy — chroni przed zarysowaniami i UV, stonowane kolory, profesjonalny wygląd",
        "Laminat błyszczący — intensyfikuje kolory, dodaje połysk, odporny na wilgoć",
        "Bez laminatu — tańsze, ale mniej odporne. OK dla naklejek wewnętrznych krótkotrwałych",
        "[Lakier UV](/blog/wykonczenia-folia-uv-tloczenie) — alternatywa dla laminatu, cieńszy, mniej odporny mechanicznie",
      ],
    },
    {
      type: "h2",
      id: "zastosowania",
      text: "Zastosowania — od produktów po marketing",
    },
    {
      type: "table",
      caption: "Zastosowania naklejek i etykiet",
      headers: ["Zastosowanie", "Podłoże", "Klej", "Format"],
      rows: [
        [
          "Etykiety na słoiki/butelki",
          "Folia transparentna lub biała",
          "Trwały",
          "Rola lub indywidualnie cięte",
        ],
        [
          "Naklejki promocyjne (gadżety)",
          "Folia biała + laminat",
          "Trwały",
          "Arkusze kiss-cut",
        ],
        [
          "Ceny / oznaczenia sklepowe",
          "Papier biały",
          "Zmywalny",
          "Arkusze A4",
        ],
        [
          "Naklejki na samochody",
          "Vinyl + laminat UV",
          "Trwały",
          "Indywidualnie cięte",
        ],
        [
          "Naklejki na witryny",
          "Folia transparentna + druk od wewnątrz",
          "Zmywalny",
          "Indywidualnie cięte",
        ],
        [
          "Etykiety logistyczne",
          "Papier biały",
          "Trwały lub mrozoodporny",
          "Rola",
        ],
        [
          "Naklejki na laptopy / telefony",
          "Folia biała + laminat matowy",
          "Zmywalny",
          "Indywidualnie cięte",
        ],
      ],
    },
    {
      type: "h2",
      id: "przygotowanie-pliku",
      text: "Jak przygotować plik do druku naklejek",
    },
    {
      type: "list",
      items: [
        "[CMYK](/blog/cmyk-vs-rgb), 300 dpi, fonty na krzywe",
        "Spady: 2-3 mm z każdej strony (nawet przy naklejkach okrągłych)",
        "Linia cięcia (die-line) na osobnej warstwie — wektor, kolor spot (np. Magenta 100%)",
        "Dla folii transparentnej: podaj, które elementy mają mieć biały poddruk (white underprint). Bez białego poddruku kolory na transparentnej folii są prześwitujące",
        "Format pliku: [PDF/X-4](/blog/format-pdf-pdf-x-rozne-standardy) (obsługuje przezroczystości) lub AI/EPS z rozłożonymi efektami",
      ],
    },
    {
      type: "callout",
      variant: "warn",
      text: "Biały poddruk na folii transparentnej to osobna warstwa w pliku — oznacz ją jako spot color o nazwie White. Bez tej warstwy drukarnia nie wie, gdzie nadrukować białą farbę pod kolorem. Efekt bez poddruku: kolory wyglądają jak witraż (prześwitujące, blade).",
    },
    {
      type: "faq",
      items: [
        {
          q: "Jaka minimalna ilość naklejek mogę zamówić?",
          a: "W druku cyfrowym: od 1 sztuki (bez ograniczeń). Cena jednostkowa jest wyższa przy małych nakładach. Opłacalny próg to 50-100 sztuk — cena jednostkowa spada o 40-60% wobec pojedynczej sztuki. W druku offsetowym: minimum 500-1000 sztuk (niższy koszt jednostkowy, ale wyższy minimalny nakład).",
        },
        {
          q: "Czy naklejki na zewnątrz wytrzymają deszcz i słońce?",
          a: "Tak, jeśli wybierzesz folię vinyl lub PP z laminatem UV. Folia vinyl z laminatem wytrzymuje 3-5 lat na zewnątrz (deszcz, słońce, mróz). Papierowe naklejki bez laminatu niszczą się po pierwszym deszczu. Folia PP z laminatem: 2-3 lata outdoor.",
        },
        {
          q: "Czy mogę zamówić naklejki o niestandardowym kształcie?",
          a: "Tak. Ploter tnący (druk cyfrowy) wytnie dowolny kształt bez dodatkowych kosztów — gwiazda, logo, kontur postaci. Przygotuj linię cięcia jako zamkniętą krzywą wektorową na osobnej warstwie w pliku.",
        },
        {
          q: "Czym się różni naklejka od etykiety?",
          a: "Funkcjonalnie: etykieta to naklejka z informacją produktową (skład, gramatura, kod kreskowy, data ważności). Naklejka to termin ogólny, obejmujący też zastosowania dekoracyjne i promocyjne. Technicznie: ten sam proces druku i materiały. Różnica jest w zastosowaniu, nie w technologii.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Zamów naklejki w DobrePrinty",
      body: "Wybierz podłoże (papier, folia biała, transparentna), klej (trwały, zmywalny), kształt i nakład. Wgraj plik — drukujemy w 48-72 h.",
      href: "/produkty/ulotki",
      label: "Zamów naklejki →",
    },
  ],
};
