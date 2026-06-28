import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "jak-zaprojektowac-nadruk-na-torbe",
  title: "Jak zaprojektować nadruk na torbę — krok po kroku",
  excerpt:
    "Poradnik projektowania nadruku na torby płócienne i papierowe: 300 dpi, PNG z przezroczystością, kontrast na ecru, pole A4 i podgląd 3D w konfiguratorze.",
  category: "pliki-do-druku",
  tags: ["nadruk", "projekt graficzny", "torby", "pliki do druku", "PNG"],
  publishedAt: "2026-06-09",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "HowTo",
  relatedProducts: ["torby-plocienne", "torby-papierowe"],
  sections: [
    {
      type: "p",
      text: "Projektowanie nadruku na torbę różni się od projektowania ulotki czy plakatu. Grafika trafia na tkaninę lub papier o własnym kolorze, jest oglądana z kilku metrów, a nie z trzydziestu centymetrów, i musi dobrze wyglądać na trójwymiarowym, ruchomym obiekcie. Dobra wiadomość: wystarczy kilka prostych zasad, żeby uniknąć 90% typowych wpadek. W tym poradniku przechodzimy krok po kroku przez przygotowanie grafiki na [torbę płócienną](/produkty/torby-plocienne) z polem nadruku A4 — a większość zasad stosuje się też do [toreb papierowych](/produkty/torby-papierowe). Jeśli dopiero wybierasz produkt, zacznij od [przewodnika po torbach płóciennych](/blog/torby-plocienne-z-nadrukiem-przewodnik).",
    },
    {
      type: "h2",
      id: "krok-1-rozdzielczosc",
      text: "Krok 1: Przygotuj plik w 300 dpi",
    },
    {
      type: "p",
      text: "Rozdzielczość to fundament. Grafika rastrowa (zdjęcie, ilustracja z Procreate czy Photoshopa) powinna mieć 300 dpi w docelowym rozmiarze nadruku. Pole nadruku na torbie płóciennej ma format A4, czyli 21 × 29 cm — przy 300 dpi daje to plik o wymiarach około 2480 × 3425 pikseli. Jeśli Twoja grafika ma wypełnić całe pole, celuj w te wartości lub wyższe. Mniejszy nadruk wymaga proporcjonalnie mniej pikseli: logo drukowane w szerokości 10 cm potrzebuje około 1180 px szerokości.",
    },
    {
      type: "p",
      text: "Najczęstszy błąd to skalowanie małego pliku w górę. Logo pobrane ze strony internetowej ma zwykle 200–500 px szerokości — powiększone do rozmiaru nadruku da rozmyte krawędzie i widoczne piksele, a żaden program nie „dorobi” brakujących szczegółów. Zawsze zaczynaj od źródłowego pliku w pełnej jakości: eksportu z programu graficznego, pliku od projektanta lub wersji wektorowej logo wyeksportowanej do dużego PNG. Skalowanie w dół jest bezpieczne, w górę — nigdy.",
    },
    {
      type: "h2",
      id: "krok-2-png-przezroczystosc",
      text: "Krok 2: Zapisz jako PNG z przezroczystym tłem",
    },
    {
      type: "p",
      text: "Rekomendowany format pliku to PNG z przezroczystością (kanałem alfa). Dlaczego przezroczystość jest tak ważna? Bo nadruk trafia na tkaninę w kolorze ecru — jeśli Twoja grafika ma białe prostokątne tło, to ten biały prostokąt również zostanie wydrukowany i będzie wyraźnie odcinał się od naturalnego koloru torby. Zamiast eleganckiego logo na płótnie dostaniesz logo w białym pudełku. Przezroczyste tło sprawia, że drukowane są wyłącznie elementy projektu, a tkanina pozostaje widoczna wszędzie poza nimi.",
    },
    {
      type: "p",
      text: "Jak sprawdzić, czy plik ma przezroczystość? Otwórz go w dowolnym edytorze graficznym — przezroczyste obszary wyświetlają się jako szara szachownica. Format JPG nie obsługuje przezroczystości w ogóle, więc jeśli masz tylko JPG z białym tłem, tło trzeba usunąć w edytorze i zapisać wynik jako PNG. Uwaga na automatyczne usuwacze tła: przy drobnych detalach i cienkich liniach potrafią zostawić białe obwódki wokół krawędzi, które na wydruku będą widoczne.",
    },
    {
      type: "callout",
      variant: "warn",
      text: "JPG z białym tłem to najczęstszy błąd w plikach na torby. Na ekranie konfiguratora białe tło łatwo przeoczyć, ale na torbie ecru wydrukowany biały prostokąt będzie pierwszym, co rzuci się w oczy. Zawsze wgrywaj PNG z przezroczystością.",
    },
    {
      type: "h2",
      id: "krok-3-kolory-na-ecru",
      text: "Krok 3: Dobierz kolory pod tkaninę ecru",
    },
    {
      type: "p",
      text: "Torba płócienna ma naturalny kolor ecru — lekko kremowy, cieplejszy od bieli. To piękne tło, ale stawia jeden warunek: kontrast. Ciemne i nasycone kolory (czerń, granat, butelkowa zieleń, bordo, intensywna czerwień) wyglądają na ecru znakomicie. Problemy zaczynają się przy kolorach jasnych: pastele, jasne żółcie, beże i blade szarości zlewają się z tłem i z dystansu stają się nieczytelne. Czysta biel w projekcie również wymaga ostrożności — na kremowej tkaninie jej efekt zależy od wielkości i otoczenia elementu.",
    },
    {
      type: "p",
      text: "Praktyczny test: nałóż w programie graficznym swoją grafikę na tło w kolorze zbliżonym do ecru (np. #F3EBDC zamiast czystej bieli) i pomniejsz widok tak, by symulował oglądanie torby z 3–4 metrów. Jeśli kluczowe elementy znikają, zwiększ kontrast: pociemnij kolory, dodaj obrys lub zamień jasne wypełnienia na ciemniejsze odpowiedniki z palety marki. Pamiętaj też, że tkanina ma fakturę — bardzo drobne detale i linie cieńsze niż ~1 mm mogą się na splocie „rozmyć”, więc upraszczaj tam, gdzie się da.",
    },
    {
      type: "h3",
      id: "typografia-na-tkaninie",
      text: "Typografia na tkaninie — krótko o tekście",
    },
    {
      type: "p",
      text: "Tekst na torbie rządzi się własnymi prawami. Faktura splotu bawełny „zjada” bardzo cienkie kreski, dlatego unikaj krojów typu thin i light w małych rozmiarach — bezpieczne minimum to litery o wysokości około 5 mm i grubości kreski powyżej 1 mm. Hasła pisane wersalikami solidnym groteskiem (np. odpowiednikiem wagi medium lub bold) pozostają czytelne nawet z drugiej strony ulicy. Jeśli projekt zawiera dłuższy tekst — cytat, manifest marki, listę — potraktuj go jak element graficzny: wyrównaj świadomie, zostaw światło wokół i sprawdź czytelność w pomniejszeniu, zanim przejdziesz dalej.",
    },
    {
      type: "h2",
      id: "krok-4-proporcje-pole-a4",
      text: "Krok 4: Zaplanuj proporcje w polu A4",
    },
    {
      type: "p",
      text: "Pole nadruku na przedniej ściance torby płóciennej ma maksymalnie 21 × 29 cm (format A4) — to obszar pionowy, więc kompozycje pionowe i kwadratowe zagospodarują go naturalnie, a bardzo szerokie poziome grafiki wykorzystają tylko pasek pola. Nie znaczy to, że zawsze trzeba drukować „na pełnię”: małe logo na środku ścianki bywa bardziej eleganckie niż grafika od krawędzi do krawędzi. Kluczowe jest świadome ustawienie rozmiaru i pozycji względem całej torby, a nie tylko względem pola nadruku.",
    },
    {
      type: "table",
      caption: "Typowe układy nadruku w polu A4 na torbie płóciennej",
      headers: ["Układ", "Rozmiar grafiki", "Efekt", "Dla kogo"],
      rows: [
        [
          "Pełne pole",
          "~21 × 29 cm",
          "Mocny, plakatowy, widoczny z daleka",
          "Ilustracje, merch, grafiki festiwalowe",
        ],
        [
          "Centralny motyw",
          "~12–16 cm szerokości",
          "Zbalansowany, uniwersalny",
          "Logo z hasłem, marki, eventy",
        ],
        [
          "Małe logo",
          "~6–10 cm szerokości",
          "Minimalistyczny, subtelny",
          "Marki premium, prezenty, biuro",
        ],
        [
          "Kompozycja pionowa",
          "wąska, na wysokość pola",
          "Nowoczesny, edytorski",
          "Typografia, księgarnie, kultura",
        ],
      ],
    },
    {
      type: "p",
      text: "Te same zasady proporcji obowiązują przy [torbach papierowych](/produkty/torby-papierowe) — z tą różnicą, że torby papierowe występują w różnych formatach ścianek, więc grafikę warto dopasować do konkretnego rozmiaru torby (przegląd znajdziesz w artykule o [rozmiarach i gramaturach toreb papierowych](/blog/torby-papierowe-rozmiary-i-gramatury)). Jeśli projektujesz zestaw — torba płócienna plus papierowa, plus [koszulki](/blog/koszulki-firmowe-z-nadrukiem) — używaj tej samej wersji logo i tej samej palety na wszystkich nośnikach.",
    },
    {
      type: "h2",
      id: "krok-5-podglad-3d",
      text: "Krok 5: Sprawdź projekt w podglądzie 3D",
    },
    {
      type: "p",
      text: "Konfigurator na stronie produktu to ostatni i najważniejszy etap kontroli. Po wgraniu pliku ustawiasz grafikę w polu nadruku i oglądasz wynik w dwóch trybach. Podgląd 2D pokazuje dokładne położenie i wymiary grafiki na ściance — tu weryfikujesz, czy nic nie wystaje poza pole i czy marginesy są równe. Podgląd 3D renderuje całą torbę, którą możesz obracać — tu oceniasz to, czego płaski widok nie pokaże: proporcje nadruku względem uch i całej bryły, czytelność z dystansu, ogólne wrażenie.",
    },
    {
      type: "p",
      text: "Dobra praktyka: po ustawieniu grafiki odsuń się od ekranu na dwa–trzy metry albo pomniejsz okno przeglądarki i spójrz na podgląd 3D świeżym okiem. Czy wiadomo, co jest na torbie? Czy tekst da się przeczytać? Jeśli musisz mrużyć oczy — grafika jest za mała albo kontrast za niski. Warto też zamówić jedną sztukę próbną (16 zł) przed większym nakładem: ekran nigdy w stu procentach nie odda kolorów na tkaninie, a próbka kosztuje mniej niż poprawka całego nakładu. Tym bardziej że wysyłka w 3 dni robocze nie wydłuży istotnie harmonogramu.",
    },
    {
      type: "callout",
      variant: "tip",
      text: "Planujesz nakład 50+ sztuk? Zamów najpierw 1 torbę próbną za 16 zł. Zobaczysz kolory na żywo, sprawdzisz rozmiar grafiki w realu i dopiero wtedy uruchomisz pełny nakład — przy progach cenowych (np. 11 zł/szt. od 100 sztuk) próbka to ułamek wartości zamówienia.",
    },
    {
      type: "h2",
      id: "typowe-bledy",
      text: "Typowe błędy — checklista przed wysłaniem pliku",
    },
    {
      type: "p",
      text: "Zanim klikniesz „zamów”, przejdź przez krótką checklistę najczęstszych błędów. Każdy z nich widzieliśmy w plikach klientów wielokrotnie — i każdego da się uniknąć w minutę.",
    },
    {
      type: "list",
      items: [
        "Za niska rozdzielczość — logo ściągnięte ze strony WWW zamiast pliku źródłowego; minimum to 300 dpi w rozmiarze druku",
        "Białe tło zamiast przezroczystości — JPG z białym prostokątem wokół logo; wgrywaj PNG z kanałem alfa",
        "Jasne kolory na ecru — pastele i blade odcienie zlewają się z kremową tkaniną; testuj na tle #F3EBDC",
        "Białe obwódki po usuwaniu tła — automatyczne narzędzia zostawiają halo wokół krawędzi; powiększ plik i obejrzyj krawędzie",
        "Grafika za mała względem torby — czytelna na ekranie, niewidoczna z 3 metrów; sprawdź w podglądzie 3D",
        "Tekst zbyt drobny lub cienki — litery poniżej ~5 mm wysokości i linie cieńsze niż 1 mm giną na fakturze tkaniny",
        "Pominięcie próbki przy dużym nakładzie — jedna torba testowa za 16 zł eliminuje ryzyko kosztownej pomyłki",
      ],
    },
    {
      type: "p",
      text: "Jeśli plik przechodzi całą checklistę, jesteś gotowy. Cały proces — od wgrania grafiki, przez podgląd 3D, po zamówienie — odbywa się online, a torby wysyłamy w 3 dni robocze. Zastanawiasz się jeszcze nad nakładem i budżetem? Kalkulacje przy progach cenowych (od 16 zł za sztukę do 10 zł przy 250+) rozkładamy na czynniki pierwsze w artykule o [torbie bawełnianej jako gadżecie reklamowym](/blog/torba-bawelniana-gadzet-reklamowy).",
    },
    {
      type: "faq",
      items: [
        {
          q: "Jaki format pliku jest najlepszy na nadruk na torbie?",
          a: "PNG z przezroczystym tłem (kanałem alfa) w rozdzielczości 300 dpi w docelowym rozmiarze druku. Dla pełnego pola A4 (21 × 29 cm) to około 2480 × 3425 pikseli. JPG nie obsługuje przezroczystości, więc nie nadaje się do grafik z tłem innym niż pełnowymiarowe.",
        },
        {
          q: "Jak duży może być nadruk na torbie płóciennej?",
          a: "Maksymalne pole nadruku to format A4 — 21 × 29 cm na przedniej ściance torby. W tym obszarze możesz umieścić grafikę dowolnej wielkości i w dowolnym miejscu, co ustawisz w konfiguratorze.",
        },
        {
          q: "Czy mogę wydrukować zdjęcie na torbie?",
          a: "Tak — nadruk jest pełnokolorowy, więc zdjęcia i gradienty są dozwolone bez dopłat. Zadbaj o rozdzielczość 300 dpi i pamiętaj, że bardzo jasne partie zdjęcia będą miały niższy kontrast na kremowej tkaninie ecru.",
        },
        {
          q: "Jak usunąć białe tło z logo?",
          a: "W edytorze graficznym (Photoshop, GIMP, Affinity, Canva Pro) zaznacz i usuń tło, a wynik zapisz jako PNG. Po usunięciu powiększ obraz i sprawdź krawędzie — automatyczne narzędzia często zostawiają białe obwódki, które wydrukują się na torbie.",
        },
        {
          q: "Czy ten sam projekt zadziała na torbie płóciennej i papierowej?",
          a: "Zasady są wspólne: 300 dpi, przezroczystość, kontrast, czytelność z dystansu. Różni się podłoże (ecru vs kolor torby papierowej) i format ścianki, więc proporcje warto dopasować do konkretnego rozmiaru. Formaty toreb papierowych opisujemy w osobnym artykule na blogu.",
        },
        {
          q: "Co pokazuje podgląd 3D w konfiguratorze?",
          a: "Po wgraniu grafiki konfigurator renderuje całą torbę z Twoim nadrukiem — model możesz obracać i oglądać z każdej strony. To najlepszy sposób, by przed zamówieniem ocenić proporcje grafiki, jej położenie i czytelność na gotowym produkcie.",
        },
        {
          q: "Czy biały kolor w projekcie zostanie wydrukowany?",
          a: "Tak — drukujemy pełnokolorowo, więc biel w grafice jest drukowana. Na kremowej tkaninie ecru biel jest widoczna, ale daje subtelniejszy kontrast niż na ciemnym podłożu. Jeśli biel ma być mocnym akcentem, sprawdź efekt na próbnej sztuce.",
        },
        {
          q: "Czy nadruk wytrzyma pranie?",
          a: "Tak, przy właściwej pielęgnacji: pranie do 30–40°C na lewej stronie, bez wybielaczy i suszarki bębnowej. Szczegóły pielęgnacji opisujemy w kompletnym przewodniku po torbach płóciennych.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Przetestuj swój projekt w konfiguratorze",
      body: "Wgraj grafikę, ustaw ją w polu A4 i obejrzyj torbę w podglądzie 3D — za darmo, przed zamówieniem. Drukujemy od 1 sztuki, wysyłka w 3 dni robocze.",
      href: "/produkty/torby-plocienne",
      label: "Zamów torby płócienne →",
    },
  ],
};
