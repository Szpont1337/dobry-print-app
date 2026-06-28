import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "menu-restauracyjne-druk",
  title: "Menu restauracyjne — jakie wybrać, format, papier, wykończenie",
  excerpt:
    "Standardy menu restauracyjnego: składane DL, A4 i A5, papier z laminatem, trwałość i odporność na tłuszcz. Praktyczny przewodnik dla lokali gastronomicznych i HoReCa.",
  category: "produkty",
  tags: ["menu", "restauracja", "składane ulotki", "HoReCa"],
  publishedAt: "2026-06-01",
  updatedAt: "2026-06-09",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["skladane-ulotki", "ulotki"],
  sections: [
    {
      type: "p",
      text: "Menu to pierwsza rzecz, jaką gość bierze do ręki po zajęciu stolika — i jeden z najczęściej dotykanych przedmiotów w lokalu. Musi być czytelne, odporne na tłuszcz i wilgoć, a jednocześnie spójne z charakterem miejsca. W tym poradniku przechodzimy przez formaty, papier, wykończenia i przygotowanie pliku, żeby Twoje menu wytrzymało sezon i dobrze prezentowało ofertę.",
    },
    {
      type: "h2",
      id: "formaty",
      text: "Formaty menu — od jednej karty po menu składane",
    },
    {
      type: "p",
      text: "Wybór formatu zależy od długości oferty i sposobu serwowania. Krótkie menu (kawiarnia, bar, food truck) mieści się na jednej karcie A4 lub A5. Restauracja z rozbudowaną kartą dań i napojów potrzebuje [formatu składanego](/produkty/skladane-ulotki) albo menu wielostronicowego w oprawie.",
    },
    {
      type: "table",
      caption: "Porównanie formatów menu",
      headers: ["Format", "Pojemność", "Zastosowanie", "Uwagi"],
      rows: [
        [
          "Karta A5 (jednostronna/dwustronna)",
          "10-25 pozycji",
          "Kawiarnie, bary, menu dnia",
          "Tanie, szybkie do podmiany",
        ],
        [
          "Karta A4 (jedno-/dwustronna)",
          "20-40 pozycji",
          "Restauracje z prostą kartą, pizzerie",
          "Czytelne, łatwe w produkcji",
        ],
        [
          "Składane DL (z A4)",
          "do 6 łamów treści",
          "Menu napojów, oferta sezonowa",
          "Kompaktowe, mieści się na stoliku",
        ],
        [
          "Składane A4 (z A3)",
          "do 6-8 łamów",
          "Pełna karta dań + napoje",
          "Najpopularniejsze w restauracjach",
        ],
        [
          "Menu wielostronicowe w oprawie",
          "16-48 stron",
          "Hotele, restauracje fine dining",
          "Premium, wyższy koszt i termin",
        ],
        [
          "Podkładka pod talerz (placemat)",
          "menu + reklama",
          "Bistro, fast casual, śniadania",
          "Jednorazowa, zawsze świeża",
        ],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Jeśli zmieniasz ceny lub dania co sezon, rozdziel menu: stała karta dań (droższy, trwały druk z laminatem) + wkładka z menu dnia / cenami (tani druk A5 do częstej podmiany). Nie przepłacasz za przedruk całości przy każdej zmianie.",
    },
    {
      type: "h2",
      id: "papier",
      text: "Papier — gramatura i rodzaj",
    },
    {
      type: "p",
      text: "Menu musi być sztywniejsze niż zwykła ulotka — gość trzyma je w dłoni i kładzie na stole. Dla kart jednoarkuszowych standardem jest karton 300-350 g, dla menu składanego [250-300 g](/blog/gramatura-papieru-ulotki) (cieńszy, żeby dobrze się falcował). Kreda mat wygląda elegancko i nie odbija światła, kreda błysk podbija zdjęcia potraw.",
    },
    {
      type: "table",
      caption: "Papier do menu",
      headers: ["Papier", "Gramatura", "Wygląd", "Zastosowanie"],
      rows: [
        [
          "Kreda mat",
          "300-350 g",
          "Stonowany, elegancki",
          "Karty A4/A5, fine dining",
        ],
        [
          "Kreda błysk",
          "300-350 g",
          "Połysk, nasycone kolory",
          "Menu ze zdjęciami dań, pizzerie",
        ],
        [
          "Kreda mat (składane)",
          "250-300 g",
          "Elegancki, dobrze się składa",
          "Menu składane DL/A4",
        ],
        [
          "Papier offsetowy",
          "120-170 g",
          "Naturalny, matowy",
          "Menu dnia, wkładki do podmiany",
        ],
        [
          "Karton ozdobny / strukturalny",
          "300+ g",
          "Fakturowy, premium",
          "Restauracje z mocnym brandingiem",
        ],
      ],
    },
    {
      type: "h2",
      id: "wykonczenie",
      text: "Wykończenie — laminat ratuje menu przed tłuszczem",
    },
    {
      type: "p",
      text: "To najważniejsza decyzja przy menu. Bez zabezpieczenia karta po kilku dniach jest poplamiona tłuszczem, pozaginana i pofalowana od wilgoci. Laminat (folia) na obu stronach przedłuża życie menu z kilku dni do wielu miesięcy i pozwala przecierać kartę ściereczką.",
    },
    {
      type: "list",
      items: [
        "Laminat matowy — elegancki, nie odbija światła, nie widać odcisków palców, lekko stonowane kolory",
        "Laminat błyszczący — podbija kolory i zdjęcia, najłatwiejszy do przecierania, ale widać odbicia i smugi",
        "Laminat soft-touch — aksamitny w dotyku, premium, dla lokali z wyższej półki (droższy)",
        "Lakier dyspersyjny — tańsza ochrona niż laminat, mniej odporny na tłuszcz, OK dla menu o krótkim cyklu życia",
        "Bez wykończenia — tylko dla menu jednorazowych (podkładki) lub bardzo często wymienianych wkładek",
      ],
    },
    {
      type: "callout",
      variant: "warn",
      text: "Menu składane z laminatem łamie się tylko w miejscu bigowania (rylcowania). Bez bigowania laminowany karton pęka na zgięciu i odpryskuje folia. Zawsze zaznacz w zamówieniu bigowanie przed falcowaniem dla gramatur 250 g i wyższych.",
    },
    {
      type: "h2",
      id: "projekt",
      text: "Projekt i struktura treści",
    },
    {
      type: "list",
      items: [
        "Czytelna hierarchia: kategorie (przystawki, dania główne, desery) wyraźnie oddzielone, nazwa dania większa niż opis",
        "Ceny wyrównane do prawej lub tuż przy nazwie — gość ma je znaleźć w ułamku sekundy, bez prowadzącej linii kropek (to przestarzałe)",
        "Składniki alergenne oznaczone numerami/symbolami zgodnie z wymogami (rozporządzenie 1169/2011) — legenda na dole karty",
        "Zdjęcia dań tylko dobrej jakości (min. 300 dpi) — słabe zdjęcie szkodzi bardziej niż jego brak",
        "Marża na opis: najbardziej dochodowe dania umieść w prawym górnym rogu (tam najpierw pada wzrok) lub wyróżnij ramką",
      ],
    },
    {
      type: "h2",
      id: "menu-qr",
      text: "Menu QR a menu drukowane — co wybrać",
    },
    {
      type: "p",
      text: "Menu z kodem QR (gość skanuje i czyta na telefonie) jest tanie i łatwe do aktualizacji, ale nie zastępuje druku — wielu gości woli kartę w ręku, a w słońcu czy przy słabym zasięgu telefon zawodzi. Najczęstszy układ w 2026: drukowana karta dań jako standard + QR jako uzupełnienie (np. pełna karta win, wersje językowe, menu sezonowe). Małe naklejki lub bilboardziki z QR na stoliku drukuje się raz, a treść za nimi aktualizujesz online.",
    },
    {
      type: "h2",
      id: "przygotowanie-pliku",
      text: "Jak przygotować plik do druku menu",
    },
    {
      type: "list",
      items: [
        "[CMYK, 300 dpi, fonty zamienione na krzywe lub osadzone w PDF](/blog/jak-przygotowac-pdf-do-druku)",
        "Spady 3 mm z każdej strony + bezpieczny margines 5 mm od krawędzi na tekst i ceny",
        "Menu składane: dostarcz plik w rozkładówce z zaznaczonymi liniami bigowania (osobna warstwa) — pamiętaj, że łamy nie są równe (łam zawijany do środka jest węższy o 2-3 mm)",
        "Czerń tekstu jako czysty K100 (nie rich black) — uniknie rozmycia drobnego tekstu przy złym pasowaniu",
        "Format pliku: PDF/X-1a lub PDF/X-4; przy menu wielostronicowym strony pojedynczo, w kolejności",
      ],
    },
    {
      type: "faq",
      items: [
        {
          q: "Jaki format menu najlepszy dla średniej restauracji?",
          a: "Składane A4 (z arkusza A3, falcowanie typu C lub na pół) na kredzie 250-300 g z laminatem matowym. Mieści pełną kartę dań i napojów, kompaktowo leży na stoliku, a laminat chroni przed tłuszczem przez cały sezon. Do tego osobna wkładka A5 z menu dnia do częstej podmiany.",
        },
        {
          q: "Czy laminować menu obustronnie czy wystarczy jedna strona?",
          a: "Zawsze obustronnie. Laminat tylko z jednej strony powoduje wyginanie się karty (folia kurczy się inaczej niż papier) i nie chroni rewersu przed tłuszczem. Koszt obustronnego laminatu jest minimalnie wyższy, a różnica w trwałości ogromna.",
        },
        {
          q: "Ile kosztuje druk menu i jaki nakład się opłaca?",
          a: "Cena zależy od formatu, papieru i laminatu — w konfiguratorze kwota brutto z VAT pojawia się od razu po wyborze opcji. Dla lokalu wystarczy zwykle 20-50 sztuk karty (tyle, ile stolików razy 1,5-2). Przy laminacie opłaca się dodrukować zapas — wymiana zniszczonych egzemplarzy w sezonie jest naturalna.",
        },
        {
          q: "Jak szybko zrobicie menu na otwarcie lokalu?",
          a: "Standardowa produkcja menu to 24-48 h, laminowanie dokłada 24-48 h, a kurier zwykle jeden dzień roboczy. Na otwarcie zaplanuj zamówienie z wyprzedzeniem 4-5 dni roboczych. Dla pilnych otwarć dostępna jest produkcja ekspresowa.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Zamów menu dla swojego lokalu",
      body: "Wybierz format (karta A4/A5 lub menu składane), papier i laminat, wgraj plik — drukujemy z dostawą w 24-48 h. Cena brutto z VAT widoczna od razu.",
      href: "/produkty/skladane-ulotki",
      label: "Zamów menu →",
    },
  ],
};
