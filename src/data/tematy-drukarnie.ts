/**
 * Tematyczne strony docelowe „drukarnia <typ>”. Każda celuje w ODRĘBNĄ intencję
 * wyszukiwania wokół słowa „drukarnia” i ma własną, unikalną treść — to świadoma
 * alternatywa dla powielania niemal identycznych podstron (doorway pages), które
 * Google traktuje jako spam. Renderowane wspólnym komponentem `TopicLanding`.
 */
export type TematFaq = { question: string; answer: string };

export type TematDrukarnia = {
  slug: string;
  /** Mała etykieta nad H1 */
  eyebrow: string;
  /** Główna fraza kluczowa (dopełniacz/biernik do meta i opisów) */
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  /** H1 składa się z części zwykłej + wyróżnionej kolorem */
  h1Lead: string;
  h1Highlight: string;
  heroLead: string;
  heroStats: { value: string; label: string }[];
  /** Nagłówek sekcji z kafelkami przewag */
  bulletsHeading: string;
  bullets: { title: string; body: string }[];
  /** Nagłówek sekcji prozy + akapity (unikalne) */
  bodyHeading: string;
  body: string[];
  /** Slugi produktów z src/lib/products.ts do wyróżnienia */
  relatedProducts: string[];
  productsHeading: string;
  productsLead: string;
  faqs: TematFaq[];
  cta: { heading: string; body: string; href: string; label: string };
};

export const tematyDrukarnie: TematDrukarnia[] = [
  {
    slug: "drukarnia-internetowa",
    eyebrow: "Drukarnia internetowa",
    keyword: "drukarnia internetowa",
    metaTitle: "Drukarnia internetowa — zamów druk online | DobrePrinty",
    metaDescription:
      "Drukarnia internetowa DobrePrinty: cały proces online, konfigurator 24/7, cena z VAT od razu i dostawa kurierem w 24–48 h. Bez maili i handlowca.",
    h1Lead: "Drukarnia",
    h1Highlight: "internetowa",
    heroLead:
      "Cały druk załatwiasz przez przeglądarkę: wybierasz produkt, nakład i format, wgrywasz plik i płacisz online. Bez maili z prośbą o wycenę i bez czekania na handlowca.",
    heroStats: [
      { value: "24/7", label: "konfigurator online" },
      { value: "2 h", label: "odpowiedź biura obsługi" },
      { value: "24–48 h", label: "do wysyłki" },
    ],
    bulletsHeading: "Dlaczego drukarnia internetowa DobrePrinty",
    bullets: [
      {
        title: "Wycena bez pytania o ofertę",
        body: "Kwota brutto z VAT pokazuje się przy każdej zmianie nakładu i formatu. Nie wysyłasz zapytań ofertowych i nie czekasz na odpowiedź — cenę znasz od pierwszego kliknięcia.",
      },
      {
        title: "Plik sprawdzamy za Ciebie",
        body: "Po wgraniu projektu preflight weryfikuje spady, rozdzielczość i kolory. Jeśli czegoś brakuje, wracamy z konkretną listą poprawek, zanim cokolwiek pójdzie do druku.",
      },
      {
        title: "28 drukarni partnerskich",
        body: "Do każdego produktu dobieramy partnera, który zrobi go najszybciej i najtaniej. Ty zamawiasz w jednym miejscu, my zarządzamy produkcją w tle.",
      },
      {
        title: "Faktura i historia zamówień",
        body: "Faktura VAT przychodzi na maila razem z potwierdzeniem, a wszystkie zamówienia masz w panelu — łatwo ponowić poprzedni druk jednym kliknięciem.",
      },
    ],
    bodyHeading: "Jak działa drukarnia online",
    body: [
      "Drukarnia internetowa to model, w którym zamiast jeździć do punktu ksero i dogadywać szczegóły z handlowcem, konfigurujesz zamówienie samodzielnie w przeglądarce. W DobrePrinty wygląda to tak: wybierasz produkt z katalogu, ustawiasz nakład i format, a kalkulator od razu pokazuje cenę brutto. Potem wgrywasz plik PDF, wybierasz dostawę i płacisz online — gotowe.",
      "Największą zaletą jest przewidywalność. Konfigurator działa tak samo o 9:00, jak o 22:00, więc zamówienie złożysz wtedy, kiedy masz na to czas, a nie w godzinach pracy biura. Cena nie zmienia się „po wycenie” — to, co widzisz w koszyku, płacisz. Nie ma dopłat za spady, gwiazdek ani ukrytych kosztów obsługi zamówienia.",
      "Druk internetowy nie oznacza kompromisu jakościowego. Produkcję realizuje jedna z 28 zweryfikowanych drukarni partnerskich, każda po kwartalnym audycie jakości i terminowości. Reklamacje rozpatrujemy my — nie odsyłamy Cię do drukarni, która fizycznie wykonała zlecenie.",
    ],
    relatedProducts: [
      "ulotki",
      "wizytowki",
      "plakaty",
      "roll-up",
      "skladane-ulotki",
      "broszury-klejone",
    ],
    productsHeading: "Co wydrukujesz online",
    productsLead:
      "Pełen katalog DobrePrinty dostępny w konfiguratorze — wycenę i termin widzisz od razu.",
    faqs: [
      {
        question: "Czy muszę zakładać konto, żeby zamówić druk online?",
        answer:
          "Nie musisz. Zamówienie złożysz jako gość — wystarczy adres e-mail do potwierdzenia i faktury. Konto przydaje się, jeśli chcesz mieć historię zamówień i szybko ponawiać wcześniejsze druki.",
      },
      {
        question: "W jakim formacie wgrać plik do drukarni internetowej?",
        answer:
          "Najlepiej PDF (PDF/X-1a lub PDF/X-4) z 3 mm spadów i czcionkami zamienionymi na krzywe. Przyjmujemy też pliki graficzne (PNG, JPG, TIFF) — preflight sprawdzi je przed produkcją i zasygnalizuje, jeśli rozdzielczość będzie za niska.",
      },
      {
        question: "Ile czeka się na druk zamówiony przez internet?",
        answer:
          "Standardowa produkcja to 24–48 h, a dostawa kurierem zwykle kolejny dzień roboczy. Przy zamówieniu złożonym we wtorek rano paczka jest najczęściej u Ciebie w czwartek lub piątek. Dla pilnych zleceń dostępna jest produkcja ekspresowa.",
      },
      {
        question: "Czy dostanę fakturę VAT?",
        answer:
          "Tak, automatycznie na maila razem z potwierdzeniem zamówienia. Dla firm obsługujemy też płatność odroczoną (proforma z terminem 14 dni) przy większych zamówieniach.",
      },
    ],
    cta: {
      heading: "Zamów druk online w 5 minut",
      body: "Wybierz produkt, ustaw nakład, wgraj plik — cena z VAT i termin pokażą się od razu.",
      href: "/#produkty",
      label: "Otwórz konfigurator →",
    },
  },
  {
    slug: "drukarnia-cyfrowa",
    eyebrow: "Drukarnia cyfrowa",
    keyword: "drukarnia cyfrowa",
    metaTitle:
      "Drukarnia cyfrowa — druk małych i średnich nakładów | DobrePrinty",
    metaDescription:
      "Drukarnia cyfrowa DobrePrinty: opłacalny druk od 1 sztuki, krótkie terminy i personalizacja. Sprawdź, kiedy druk cyfrowy bije offset ceną i czasem.",
    h1Lead: "Drukarnia",
    h1Highlight: "cyfrowa",
    heroLead:
      "Druk cyfrowy opłaca się tam, gdzie liczy się szybki start i mały lub średni nakład. Bez kosztownego przygotowania form — produkcja rusza od pierwszej sztuki.",
    heroStats: [
      { value: "1+", label: "sztuka minimum" },
      { value: "24 h", label: "start produkcji" },
      { value: "do ~1000", label: "opłacalny nakład" },
    ],
    bulletsHeading: "Mocne strony druku cyfrowego",
    bullets: [
      {
        title: "Niski próg wejścia",
        body: "Brak kosztu wykonania matryc czy form drukowych. Za 100 ulotek nie przepłacasz za przygotowalnię, bo cyfra nie potrzebuje rozbiegu produkcyjnego.",
      },
      {
        title: "Krótkie terminy",
        body: "Plik trafia prosto do maszyny — produkcja standardowych zamówień to 24–48 h. Idealne, gdy materiał jest potrzebny na pojutrze, a nie za dwa tygodnie.",
      },
      {
        title: "Personalizacja i wersjonowanie",
        body: "Cyfra pozwala drukować różne warianty w jednym zleceniu — np. wizytówki z różnymi nazwiskami albo ulotki z różnymi kodami rabatowymi.",
      },
      {
        title: "Próbny nakład bez ryzyka",
        body: "Możesz wydrukować małą serię testową, sprawdzić efekt na żywo i dopiero potem zamówić większą partię. Tania weryfikacja przed kampanią.",
      },
    ],
    bodyHeading: "Druk cyfrowy a offset — kiedy co wybrać",
    body: [
      "Druk cyfrowy odwzorowuje plik bezpośrednio na maszynie, bez pośredniego etapu naświetlania form. To dlatego jest tak szybki i opłacalny przy małych nakładach: nie ponosisz stałego kosztu przygotowania, który w offsecie trzeba rozłożyć na całe zlecenie.",
      "Granica opłacalności przebiega zwykle w okolicach 500–1000 sztuk, zależnie od formatu i papieru. Poniżej tej granicy cyfra prawie zawsze wygrywa ceną i czasem. Powyżej — coraz bardziej opłaca się offset, bo jego koszt jednostkowy spada wraz z nakładem. Jeśli nie masz pewności, nasz konfigurator pokaże cenę dla Twojego nakładu, a my dobierzemy technologię pod konkretne zlecenie.",
      "Cyfra świetnie sprawdza się przy wizytówkach, ulotkach na wydarzenie, krótkich seriach broszur, materiałach personalizowanych i wszystkim, co trzeba mieć „na już”. Jakość współczesnych maszyn cyfrowych jest na tyle wysoka, że na typowych produktach reklamowych różnicy wobec offsetu zwyczajny odbiorca nie zauważy.",
    ],
    relatedProducts: [
      "wizytowki",
      "ulotki",
      "skladane-ulotki",
      "kartki-pocztowki",
      "naklejki",
      "broszury-szyte",
    ],
    productsHeading: "Produkty idealne na druk cyfrowy",
    productsLead:
      "Małe i średnie nakłady z krótkim terminem — wyceń w konfiguratorze.",
    faqs: [
      {
        question: "Czym różni się druk cyfrowy od offsetowego?",
        answer:
          "Cyfrowy drukuje plik wprost na maszynie, bez form drukowych — jest szybki i tani przy małych nakładach. Offset wymaga przygotowania form, więc opłaca się dopiero przy dużych ilościach, gdzie koszt jednostkowy mocno spada.",
      },
      {
        question: "Czy druk cyfrowy jest gorszej jakości?",
        answer:
          "Nie na typowych produktach reklamowych. Nowoczesne maszyny cyfrowe dają nasycone kolory i ostry tekst. Różnice bywają zauważalne dopiero przy bardzo dużych powierzchniach jednolitego koloru albo specjalistycznych zastosowaniach — wtedy doradzamy offset.",
      },
      {
        question: "Jaki nakład opłaca się drukować cyfrowo?",
        answer:
          "Zwykle do około 500–1000 sztuk, zależnie od formatu i papieru. Powyżej tej granicy warto rozważyć offset. Konfigurator pokaże cenę dla Twojego nakładu, więc łatwo porównasz.",
      },
      {
        question: "Czy mogę zamówić jedną sztukę?",
        answer:
          "Tak, wiele produktów drukujemy już od 1 sztuki. To jedna z głównych zalet druku cyfrowego — brak minimów produkcyjnych narzucanych przez technologię.",
      },
    ],
    cta: {
      heading: "Mały nakład, krótki termin?",
      body: "Druk cyfrowy w DobrePrinty rusza od pierwszej sztuki. Sprawdź cenę dla swojego nakładu.",
      href: "/#produkty",
      label: "Wyceń druk cyfrowy →",
    },
  },
  {
    slug: "drukarnia-wielkoformatowa",
    eyebrow: "Drukarnia wielkoformatowa",
    keyword: "drukarnia wielkoformatowa",
    metaTitle:
      "Drukarnia wielkoformatowa — plakaty, banery, roll-upy | DobrePrinty",
    metaDescription:
      "Drukarnia wielkoformatowa DobrePrinty: plakaty A1–B1, banery, roll-upy i tablice reklamowe. Trwałe materiały, soczyste kolory, dostawa w 24–48 h.",
    h1Lead: "Drukarnia",
    h1Highlight: "wielkoformatowa",
    heroLead:
      "Plakaty, banery, roll-upy i tablice — wszystko, co ma przyciągać wzrok z daleka. Druk wielkoformatowy na trwałych materiałach, gotowy na warunki zewnętrzne.",
    heroStats: [
      { value: "do B1/A0", label: "i większe formaty" },
      { value: "200 g", label: "blockout roll-up" },
      { value: "24–48 h", label: "produkcja" },
    ],
    bulletsHeading: "Co wyróżnia druk wielkoformatowy w DobrePrinty",
    bullets: [
      {
        title: "Materiały na zewnątrz i do wnętrz",
        body: "Satynowy papier na plakaty, blockout na roll-upy, banery na siatce lub PVC, sztywne podłoża na tablice. Dobieramy nośnik do tego, gdzie materiał ma wisieć.",
      },
      {
        title: "Soczyste, równe kolory",
        body: "Duże powierzchnie jednolitego koloru to test dla drukarni. Nasi partnerzy wielkoformatowi pilnują pasowania i nasycenia, żeby tło nie było „w paski”.",
      },
      {
        title: "Kompletny zestaw na stoisko",
        body: "Roll-up ze stelażem i pokrowcem, plakaty w tubach, baner z oczkami. Dostajesz gotowe materiały, nie półprodukty do składania.",
      },
      {
        title: "Większe spady, mniej ryzyka",
        body: "Dla formatów B1, A0 i roll-upów stosujemy 5 mm spadu, bo przy dużych arkuszach tolerancje cięcia są większe. Preflight pilnuje tego za Ciebie.",
      },
    ],
    bodyHeading: "Druk wielkoformatowy krok po kroku",
    body: [
      "Druk wielkoformatowy to wszystko, co nie mieści się w klasycznym arkuszu biurowym: plakaty od A2 w górę, banery liczone w metrach, roll-upy, ścianki i tablice. Rządzą się one nieco innymi zasadami niż druk ulotek — liczy się dobór nośnika, gramatura i odporność na światło oraz wilgoć.",
      "Do materiałów eventowych i targowych najczęściej wybiera się roll-upy na blockoucie 200 g (nie prześwitują pod oświetleniem hali) oraz plakaty na papierze satynowym 170 g. Na zewnątrz sprawdzają się banery z oczkami montażowymi i tablice na sztywnym podłożu. W konfiguratorze wybierasz format i nakład, a my podpowiadamy optymalny materiał.",
      "Przy dużych formatach szczególnie ważne jest przygotowanie pliku: odpowiedni spad (5 mm dla B1 i większych), wystarczająca rozdzielczość przy skali 1:1 i bezpieczne marginesy na tekst. Każdy projekt przechodzi preflight, więc nie obudzisz się z plakatem, na którym ucięło połowę hasła.",
    ],
    relatedProducts: [
      "plakaty",
      "roll-up",
      "baner-reklamowy",
      "tablice-reklamowe",
    ],
    productsHeading: "Produkty wielkoformatowe",
    productsLead:
      "Od plakatu A2 po baner na całą witrynę — wyceń i zamów online.",
    faqs: [
      {
        question: "Jakie maksymalne formaty drukujecie?",
        answer:
          "Plakaty drukujemy do B1 i A0, a banery oraz tablice na wymiar — także w dużych rozmiarach liczonych w metrach. Jeśli potrzebujesz nietypowego formatu, napisz do biura obsługi, dobierzemy nośnik i wycenę.",
      },
      {
        question: "Czy roll-up przychodzi ze stelażem?",
        answer:
          "Tak. Roll-up dostarczamy w komplecie z aluminiowym stelażem i pokrowcem transportowym — rozkładasz go w 30 sekund. Druk wykonujemy na blockoucie 200 g, który nie prześwituje pod światło.",
      },
      {
        question: "Jak przygotować plik do druku wielkoformatowego?",
        answer:
          "Najlepiej w skali 1:1 lub proporcjonalnie pomniejszonej, z zachowaną rozdzielczością, w CMYK, z 5 mm spadu dla dużych formatów. Tekst trzymaj w bezpiecznym marginesie od krawędzi. Preflight sprawdzi plik przed produkcją.",
      },
      {
        question: "Czy banery nadają się na zewnątrz?",
        answer:
          "Tak, banery drukujemy na materiałach odpornych na deszcz i słońce, z oczkami montażowymi do zawieszenia. To standardowy nośnik na ogrodzenia, rusztowania i witryny.",
      },
    ],
    cta: {
      heading: "Duży format, duże wrażenie",
      body: "Plakaty, banery i roll-upy z dostawą w 24–48 h. Skonfiguruj swój materiał wielkoformatowy.",
      href: "/produkty/roll-up",
      label: "Zamów wielki format →",
    },
  },
  {
    slug: "drukarnia-ekspresowa",
    eyebrow: "Drukarnia ekspresowa",
    keyword: "drukarnia ekspresowa",
    metaTitle:
      "Drukarnia ekspresowa — druk 24h na ostatnią chwilę | DobrePrinty",
    metaDescription:
      "Drukarnia ekspresowa DobrePrinty: produkcja od 24 h i dostawa kurierem następnego dnia. Ratujemy deadline na ulotki, wizytówki, plakaty i roll-upy.",
    h1Lead: "Drukarnia",
    h1Highlight: "ekspresowa",
    heroLead:
      "Termin goni, a materiały muszą być na wczoraj? Druk ekspresowy w DobrePrinty skraca produkcję do 24 h, a kurier rusza zaraz po niej.",
    heroStats: [
      { value: "24 h", label: "produkcja ekspres" },
      { value: "+1 dzień", label: "dostawa kurierem" },
      { value: "do 22:00", label: "zamówisz online" },
    ],
    bulletsHeading: "Jak ratujemy Twój deadline",
    bullets: [
      {
        title: "Produkcja od 24 godzin",
        body: "Standardowe produkty — ulotki, wizytówki, plakaty — schodzą z maszyny w trybie ekspres w dobę. Plik zaakceptowany rano potrafi jechać do Ciebie następnego dnia.",
      },
      {
        title: "Szybki preflight",
        body: "Przy zleceniach na czas weryfikacja pliku to priorytet. Jeśli czegoś brakuje, dzwonimy lub piszemy od razu, żeby nie tracić ani godziny.",
      },
      {
        title: "Dostawa pod adres lub na godzinę",
        body: "Kurier dowozi paczkę zwykle następnego dnia roboczego. Dla firm dostępna jest dostawa pod konkretną godzinę za dopłatą — np. na rozpoczęcie targów.",
      },
      {
        title: "Jasna cena ekspresu",
        body: "Dopłata za tryb ekspresowy jest widoczna z góry, bez niespodzianek. Wiesz, ile kosztuje pośpiech, zanim klikniesz „zamawiam”.",
      },
    ],
    bodyHeading: "Kiedy warto sięgnąć po druk ekspresowy",
    body: [
      "Druk ekspresowy to opcja dla sytuacji, w których standardowe 3–5 dni roboczych to za długo: targi za dwa dni, otwarcie lokalu w weekend, materiały na konferencję, którą ktoś „zapomniał” zgłosić na czas. Zamiast szukać po mieście punktu, który „może zdąży”, konfigurujesz zamówienie online i wybierasz tryb ekspresowy.",
      "Najszybciej produkujemy rzeczy o krótkim cyklu: ulotki, wizytówki, plakaty, roll-upy. Bardziej złożone wykończenia (tłoczenie folią, oprawa klejona, laminowanie) wydłużają proces, więc przy nich ekspres ma swoje granice — uczciwie to sygnalizujemy, zamiast obiecywać niemożliwe.",
      "Najlepszy ekspres to taki, którego nie potrzebujesz: jeśli masz choć kilka dni zapasu, druk standardowy będzie tańszy. Ale gdy zegar tyka, lepiej dopłacić 20–30% za tryb ekspresowy niż stanąć na evencie z pustym stoiskiem. Planujesz większy projekt? Daj znać biuru obsługi — ułożymy harmonogram tak, żeby zdążyć bez paniki.",
    ],
    relatedProducts: ["ulotki", "wizytowki", "plakaty", "roll-up"],
    productsHeading: "Najszybsze produkty",
    productsLead:
      "Krótki cykl produkcji = realny ekspres. Sprawdź dostępność trybu na żądanie.",
    faqs: [
      {
        question: "Co znaczy druk 24h?",
        answer:
          "To produkcja w ciągu jednego dnia roboczego od akceptacji pliku — bez dostawy. Do całkowitego czasu dolicz transport kurierem, zwykle kolejny dzień roboczy. Czyli plik zaakceptowany rano potrafi być u Ciebie pojutrze.",
      },
      {
        question: "Które produkty da się wydrukować ekspresowo?",
        answer:
          "Najlepiej te o krótkim cyklu: ulotki, wizytówki, plakaty, roll-upy. Produkty z wykończeniami (tłoczenie, laminat, oprawa klejona) wymagają więcej czasu — przy nich tryb ekspres bywa niedostępny, co zawsze sygnalizujemy.",
      },
      {
        question: "Ile kosztuje druk ekspresowy?",
        answer:
          "Dopłata za ekspres to zwykle 20–50% wobec ceny standardowej, zależnie od produktu i terminu. Kwota jest widoczna w konfiguratorze przed złożeniem zamówienia — nie ma ukrytych kosztów pośpiechu.",
      },
      {
        question: "Do której godziny mogę złożyć pilne zamówienie?",
        answer:
          "Konfigurator działa całą dobę, ale żeby produkcja ruszyła tego samego dnia, najlepiej złożyć i opłacić zamówienie oraz wgrać poprawny plik w godzinach pracy biura. Przy bardzo napiętych terminach napisz do nas — potwierdzimy realny czas realizacji.",
      },
    ],
    cta: {
      heading: "Potrzebujesz tego na już?",
      body: "Wybierz produkt i tryb ekspresowy — produkcja od 24 h, kurier zaraz po niej.",
      href: "/#produkty",
      label: "Zamów ekspres →",
    },
  },
  {
    slug: "tania-drukarnia-online",
    eyebrow: "Tania drukarnia online",
    keyword: "tania drukarnia online",
    metaTitle:
      "Tania drukarnia online — niska cena bez ukrytych kosztów | DobrePrinty",
    metaDescription:
      "Tania drukarnia online DobrePrinty: cena brutto z VAT od razu, bez dopłat za spady i ukrytych kosztów. Zobacz, jak drukować tanio bez utraty jakości.",
    h1Lead: "Tania drukarnia",
    h1Highlight: "online",
    heroLead:
      "Tanio nie musi znaczyć byle jak. Pokazujemy pełną cenę z VAT od razu, bez gwiazdek i dopłat — a Ty decydujesz, na czym oszczędzić, a na czym nie.",
    heroStats: [
      { value: "0 zł", label: "ukrytych dopłat" },
      { value: "z VAT", label: "cena od razu" },
      { value: "od 1 szt.", label: "bez wysokich minimów" },
    ],
    bulletsHeading: "Skąd niska cena (i czego w niej nie ma)",
    bullets: [
      {
        title: "Cena z VAT, nie netto „od”",
        body: "Pokazujemy kwotę brutto, którą realnie zapłacisz. Żadnego „od 9 zł netto” rosnącego w koszyku o dopłaty za spady, przygotowanie czy obsługę zamówienia.",
      },
      {
        title: "Model agencyjny obniża koszt",
        body: "Zlecenie trafia do partnera, który dla danego produktu ma najlepszą cenę i obłożenie. Konkurencja 28 drukarni pracuje na Twoją korzyść.",
      },
      {
        title: "Niższy koszt przy większym nakładzie",
        body: "Cena jednostkowa spada wraz z nakładem. Czasem 1500 ulotek wychodzi taniej w przeliczeniu niż 1000 — konfigurator pokaże, gdzie jest próg opłacalności.",
      },
      {
        title: "Bez kosztu, którego nie potrzebujesz",
        body: "Nie płacisz za premium wykończenia tam, gdzie nie dają efektu. Doradzamy, gdzie folia czy wyższa gramatura to wartość, a gdzie tylko podbity rachunek.",
      },
    ],
    bodyHeading: "Jak drukować tanio i nie żałować",
    body: [
      "„Tania drukarnia” kojarzy się czasem z ryzykiem: prześwitującym roll-upem, cienkimi wizytówkami albo terminem, który okazuje się fikcją. My podchodzimy do tego inaczej — niska cena bierze się z modelu (konfigurator zamiast handlowca, sieć drukarni zamiast jednej maszyny), a nie z oszczędzania na materiale czy uczciwości terminu.",
      "Najwięcej zaoszczędzisz na świadomych decyzjach: jeden wzór ulotki w większym nakładzie zamiast trzech małych serii, rezygnacja z lakieru na materiałach masowych, dobór formatu pod standardowy arkusz. Z kolei na gramaturze wizytówek, blockoucie roll-upa czy laminacie menu nie warto schodzić — tam oszczędność widać i czuć w dłoni.",
      "Cała cena jest transparentna od początku. Kwota brutto z VAT aktualizuje się przy każdej zmianie nakładu i formatu, więc tani druk planujesz na spokojnie, porównując warianty — bez wysyłania zapytań i czekania na „indywidualną wycenę”, która zawsze okazuje się wyższa.",
    ],
    relatedProducts: [
      "ulotki",
      "wizytowki",
      "plakaty",
      "naklejki",
      "kartki-pocztowki",
      "skladane-ulotki",
    ],
    productsHeading: "Tanio i konkretnie",
    productsLead:
      "Najczęściej zamawiane produkty z ceną z VAT widoczną od razu.",
    faqs: [
      {
        question: "Czy tani druk oznacza gorszą jakość?",
        answer:
          "Nie musi. Nasza niska cena wynika z modelu agencyjnego i konfiguratora online, a nie z oszczędzania na materiałach. Każda drukarnia partnerska przechodzi audyt jakości, a reklamacje obsługujemy my.",
      },
      {
        question: "Czy do ceny dochodzą jakieś dopłaty?",
        answer:
          "Cena w konfiguratorze jest brutto z VAT i obejmuje druk. Nie doliczamy opłat za spady ani „kosztów obsługi”. Jedyne dodatki, które wybierasz świadomie, to np. tryb ekspresowy czy dostawa — i widzisz je przed zamówieniem.",
      },
      {
        question: "Jak zamówić druk najtaniej?",
        answer:
          "Zwiększ nakład jednego wzoru zamiast dzielić na małe serie, wybierz standardowy format, zrezygnuj z premium wykończeń tam, gdzie nie dają efektu, i planuj z wyprzedzeniem, by uniknąć dopłaty ekspresowej. Konfigurator pokaże próg opłacalności nakładu.",
      },
      {
        question: "Czy jest minimalna wartość zamówienia?",
        answer:
          "Wiele produktów drukujemy już od 1 sztuki, bez wysokich minimów. Przy bardzo małych zamówieniach dochodzi niewielka, jawna opłata przygotowawcza — również widoczna w cenie od razu.",
      },
    ],
    cta: {
      heading: "Policz, ile zapłacisz naprawdę",
      body: "Cena brutto z VAT bez gwiazdek. Ustaw nakład i format, a zobaczysz pełną kwotę.",
      href: "/#produkty",
      label: "Sprawdź ceny →",
    },
  },
  {
    slug: "drukarnia-dla-firm",
    eyebrow: "Drukarnia dla firm",
    keyword: "drukarnia dla firm",
    metaTitle:
      "Drukarnia dla firm — druk B2B, faktura, stała obsługa | DobrePrinty",
    metaDescription:
      "Drukarnia dla firm DobrePrinty: faktura VAT automatycznie, płatność odroczona, większe nakłady i powtarzalne zamówienia. Druk firmowy bez handlowca.",
    h1Lead: "Drukarnia",
    h1Highlight: "dla firm",
    heroLead:
      "Materiały firmowe bez wysyłania zapytań ofertowych. Faktura VAT na maila, płatność odroczona przy większych zamówieniach i powtarzalny druk jednym kliknięciem.",
    heroStats: [
      { value: "14 dni", label: "termin płatności B2B" },
      { value: "10 000+", label: "obsługiwane nakłady" },
      { value: "1 panel", label: "historia i ponawianie" },
    ],
    bulletsHeading: "Druk firmowy ułożony pod B2B",
    bullets: [
      {
        title: "Faktura VAT od ręki",
        body: "Faktura przychodzi na maila razem z potwierdzeniem zamówienia — bez proszenia i czekania. Wszystkie dokumenty masz w jednym miejscu, gotowe do księgowości.",
      },
      {
        title: "Płatność odroczona",
        body: "Przy zamówieniach powyżej progu udostępniamy fakturę proforma z 14-dniowym terminem. Materiały produkujemy, zanim zamknie się przelew.",
      },
      {
        title: "Większe i powtarzalne nakłady",
        body: "Serie wizytówek dla całego zespołu, 10 000 ulotek dla sieci, materiały na cykliczne eventy. Powtórzysz wcześniejsze zamówienie z panelu bez ponownej konfiguracji.",
      },
      {
        title: "Spójność marki",
        body: "Trzymamy te same kolory i papier w kolejnych zleceniach, żeby wizytówki z marca pasowały do tych z listopada. Ważne, gdy materiały robią różni ludzie w firmie.",
      },
    ],
    bodyHeading: "Druk dla firm bez działu zakupów",
    body: [
      "Dla firmy druk to często powtarzalny proces: wizytówki dla nowych pracowników, ulotki na kolejną kampanię, teczki i papier firmowy, materiały na targi. DobrePrinty upraszcza to do jednego konta: konfigurujesz, zamawiasz, dostajesz fakturę — bez rundy maili z handlowcem i bez „prześlemy wycenę do końca tygodnia”.",
      "Dla większych organizacji liczą się trzy rzeczy: przewidywalny koszt, terminowość i dokumentacja. Cena z VAT jest jawna od razu, terminy realne (a przy pilnych zleceniach mamy tryb ekspresowy), a faktury i historia zamówień są w panelu. Przy zamówieniach powyżej progu dostępna jest płatność odroczona — proforma z terminem 14 dni.",
      "Obsługujemy zarówno jednoosobowe działalności, jak i większe firmy oraz instytucje. Niezależnie od skali zlecenie trafia do jednej z 28 drukarni partnerskich dobranej pod konkretny produkt, a reklamacje prowadzimy my — masz jednego partnera do rozliczeń, nie kilka drukarni do pilnowania.",
    ],
    relatedProducts: [
      "wizytowki",
      "papier-firmowy",
      "ulotki",
      "broszury-klejone",
      "roll-up",
      "skladane-ulotki",
    ],
    productsHeading: "Materiały firmowe",
    productsLead:
      "Od wizytówek całego zespołu po materiały targowe — zamów i odbierz fakturę.",
    faqs: [
      {
        question: "Czy dostanę fakturę VAT na firmę?",
        answer:
          "Tak, automatycznie na adres e-mail razem z potwierdzeniem zamówienia. Wystarczy podać dane firmy przy zamawianiu — nie trzeba prosić o fakturę osobno.",
      },
      {
        question: "Czy oferujecie płatność z odroczonym terminem?",
        answer:
          "Tak, przy zamówieniach powyżej ustalonego progu udostępniamy fakturę proforma z 14-dniowym terminem płatności. Produkcję uruchamiamy bez czekania na zaksięgowanie przelewu.",
      },
      {
        question: "Czy obsługujecie duże nakłady i stałą współpracę?",
        answer:
          "Tak. Realizujemy nakłady 10 000+ ulotek, serie wizytówek dla całych zespołów i cykliczne zamówienia. W panelu łatwo ponowisz wcześniejszy druk, a my pilnujemy spójności kolorów i papieru między partiami.",
      },
      {
        question: "Jak zapanować nad spójnością materiałów w firmie?",
        answer:
          "Zapisując zamówienia na koncie, korzystasz z tych samych ustawień przy kolejnych partiach. Dzięki temu materiały zamawiane przez różne osoby w firmie wychodzą na tym samym papierze i w tych samych kolorach.",
      },
    ],
    cta: {
      heading: "Druk firmowy bez zbędnych maili",
      body: "Skonfiguruj materiały, odbierz fakturę VAT, ponawiaj zamówienia z panelu.",
      href: "/produkty/wizytowki",
      label: "Zamów dla firmy →",
    },
  },
  {
    slug: "drukarnia-offsetowa",
    eyebrow: "Drukarnia offsetowa",
    keyword: "drukarnia offsetowa",
    metaTitle:
      "Drukarnia offsetowa — druk dużych nakładów w niskiej cenie | DobrePrinty",
    metaDescription:
      "Drukarnia offsetowa DobrePrinty: opłacalny druk dużych nakładów, równe kolory i niski koszt jednostkowy. Sprawdź, od jakiej ilości offset się opłaca.",
    h1Lead: "Drukarnia",
    h1Highlight: "offsetowa",
    heroLead:
      "Przy dużych nakładach offset jest bezkonkurencyjny: im więcej sztuk, tym niższy koszt jednej. Równe kolory i powtarzalna jakość na całym zleceniu.",
    heroStats: [
      { value: "od ~1000", label: "opłacalny nakład" },
      { value: "↓ cena/szt.", label: "rośnie nakład" },
      { value: "CMYK + Pantone", label: "wierne kolory" },
    ],
    bulletsHeading: "Dlaczego offset przy dużym nakładzie",
    bullets: [
      {
        title: "Niski koszt jednostkowy",
        body: "Koszt przygotowania form rozkłada się na cały nakład — przy 5 000 czy 50 000 sztuk cena jednej spada do poziomu nieosiągalnego dla druku cyfrowego.",
      },
      {
        title: "Równe, powtarzalne kolory",
        body: "Offset trzyma kolor na całym nakładzie i między dodrukami. To ważne dla marek, gdzie odcień logo musi być zawsze taki sam.",
      },
      {
        title: "Szeroki wybór papierów",
        body: "Offset współpracuje z bogatą gamą podłoży i gramatur — od cienkich papierów na ulotki masowe po kartony na okładki i opakowania.",
      },
      {
        title: "Kolory dodatkowe i wykończenia",
        body: "Pantone, lakiery, folie, tłoczenia — przy dużych nakładach offset otwiera pełną paletę wykończeń uszlachetniających materiał.",
      },
    ],
    bodyHeading: "Offset czy cyfra — gdzie jest próg",
    body: [
      "Druk offsetowy przenosi obraz z formy na obciągowy cylinder, a dopiero z niego na papier. Przygotowanie form to koszt stały — dlatego przy małych nakładach offset bywa droższy od cyfry. Ale ten koszt rozkłada się na cały nakład, więc im więcej sztuk, tym taniej wychodzi pojedynczy egzemplarz.",
      "Próg opłacalności zależy od formatu i papieru, ale zwykle powyżej 1000–2000 sztuk offset zaczyna wygrywać ceną, a przy kilku czy kilkudziesięciu tysiącach przewaga staje się ogromna. Jeśli wahasz się między technologiami, nasz konfigurator pokaże cenę dla Twojego nakładu, a biuro obsługi doradzi, co bardziej się opłaca.",
      "Offset to też wybór, gdy zależy Ci na maksymalnej wierności kolorów i bogatych wykończeniach — kolory Pantone, lakier wybiórczy, tłoczenia. Przy katalogach, książkach, dużych seriach ulotek i opakowaniach to standard. Mniejsze, pilne nakłady zwykle taniej i szybciej zrobimy cyfrowo — uczciwie podpowiemy, która droga jest dla Ciebie lepsza.",
    ],
    relatedProducts: [
      "ulotki",
      "broszury-klejone",
      "broszury-szyte",
      "plakaty",
      "broszury-szyte-nicia",
    ],
    productsHeading: "Produkty na duże nakłady",
    productsLead:
      "Ulotki, broszury i katalogi w nakładach, gdzie offset daje najniższą cenę.",
    faqs: [
      {
        question: "Od jakiego nakładu opłaca się offset?",
        answer:
          "Zwykle od około 1000–2000 sztuk w górę, zależnie od formatu i papieru. Poniżej tego progu zazwyczaj taniej wychodzi druk cyfrowy. Konfigurator pokaże cenę dla konkretnego nakładu, więc łatwo porównasz obie opcje.",
      },
      {
        question: "Czy offset daje lepsze kolory niż cyfra?",
        answer:
          "Offset zapewnia bardzo równy, powtarzalny kolor na całym nakładzie i pozwala stosować kolory dodatkowe (Pantone). Przy markach wymagających precyzyjnego odcienia logo to istotna przewaga. Na typowych materiałach reklamowych różnica bywa nieduża.",
      },
      {
        question: "Czy mogę dodrukować ten sam materiał później?",
        answer:
          "Tak, a offset dobrze trzyma kolor między dodrukami, więc kolejna partia będzie spójna z pierwszą. Warto zachować ustawienia zamówienia, żeby dodruk był identyczny.",
      },
      {
        question: "Jakie wykończenia są dostępne w offsecie?",
        answer:
          "Przy nakładach offsetowych dostępne są m.in. lakiery, folie matowe i błyszczące, lakier UV wybiórczy oraz tłoczenia. To pełna paleta uszlachetnień do okładek, katalogów i materiałów premium.",
      },
    ],
    cta: {
      heading: "Duży nakład? Policz offset",
      body: "Sprawdź cenę dla swojej ilości — przy dużych nakładach koszt jednej sztuki mocno spada.",
      href: "/produkty/ulotki",
      label: "Wyceń duży nakład →",
    },
  },
  {
    slug: "drukarnia-ekologiczna",
    eyebrow: "Drukarnia ekologiczna",
    keyword: "drukarnia ekologiczna",
    metaTitle:
      "Drukarnia ekologiczna — druk na papierze z recyklingu | DobrePrinty",
    metaDescription:
      "Drukarnia ekologiczna DobrePrinty: papier z recyklingu i ze źródeł kontrolowanych, mniej odpadu dzięki dobraniu nakładu. Eko druk dla świadomych marek.",
    h1Lead: "Drukarnia",
    h1Highlight: "ekologiczna",
    heroLead:
      "Druk z myślą o środowisku: papiery z recyklingu i ze źródeł kontrolowanych, świadomy dobór nakładu i mniej marnowania. Eco bez greenwashingu.",
    heroStats: [
      { value: "recykling", label: "papiery z odzysku" },
      { value: "FSC®", label: "źródła kontrolowane" },
      { value: "0 nadmiaru", label: "nakład pod potrzebę" },
    ],
    bulletsHeading: "Co znaczy u nas „eko”",
    bullets: [
      {
        title: "Papier z recyklingu",
        body: "Oferujemy podłoża z włókien z odzysku — naturalne w kolorze, z charakterystyczną fakturą. Dobre na ulotki, wizytówki i materiały, które mają komunikować wartości marki.",
      },
      {
        title: "Źródła kontrolowane (FSC)",
        body: "Tam, gdzie to możliwe, korzystamy z papierów z certyfikowanych, odpowiedzialnie zarządzanych lasów — czyli surowca z kontrolowanego pochodzenia.",
      },
      {
        title: "Mniej odpadu na starcie",
        body: "Pomagamy dobrać nakład do realnej potrzeby, zamiast drukować „na zapas”, który ląduje w koszu. Najbardziej eko jest materiał, którego nie wyrzucasz.",
      },
      {
        title: "Bez greenwashingu",
        body: "Nie obiecujemy „zerowego śladu”. Mówimy wprost, co jest z recyklingu, co z FSC, a gdzie ekologiczny wybór oznacza kompromis wizualny — żebyś decydował świadomie.",
      },
    ],
    bodyHeading: "Ekologiczny druk w praktyce",
    body: [
      "Ekologiczny druk to suma decyzji, a nie jeden magiczny certyfikat: rodzaj papieru, jego pochodzenie, nakład dobrany do potrzeby i sensowny cykl życia materiału. W DobrePrinty skupiamy się na tym, na co realnie masz wpływ przy zamówieniu — przede wszystkim na wyborze podłoża i ilości.",
      "Papiery z recyklingu mają naturalny, lekko kremowy lub szary odcień i wyczuwalną fakturę. To zaleta dla marek z obszaru eco, slow i rzemiosła — materiał od razu „mówi” o wartościach. Warto pamiętać, że na papierze z odzysku kolory bywają nieco bardziej stonowane niż na kredzie błysk; przy mocno fotograficznych projektach podpowiemy najlepszy kompromis.",
      "Druga dźwignia to nakład. Zamiast drukować 5000 ulotek „bo taniej za sztukę”, a potem wyrzucać połowę, lepiej zamówić tyle, ile realnie rozdasz, i ewentualnie dodrukować. Konfigurator pokazuje, jak cena jednostkowa zmienia się z nakładem, więc łatwo znaleźć rozsądny punkt między kosztem a ilością odpadu.",
    ],
    relatedProducts: [
      "ulotki",
      "wizytowki",
      "torby-papierowe",
      "kartki-pocztowki",
      "torby-plocienne",
      "papier-firmowy",
    ],
    productsHeading: "Produkty w wersji eko",
    productsLead:
      "Zapytaj o papier z recyklingu lub FSC do tych produktów — wyceń online.",
    faqs: [
      {
        question: "Czy oferujecie papier z recyklingu?",
        answer:
          "Tak, mamy w ofercie podłoża z włókien z odzysku — naturalne w kolorze i fakturze. Sprawdzają się na ulotki, wizytówki, papier firmowy i materiały marek o profilu eko. Przy zamówieniu doradzimy konkretny papier pod Twój projekt.",
      },
      {
        question: "Czym jest papier FSC?",
        answer:
          "To papier z surowca pochodzącego z odpowiedzialnie zarządzanych, certyfikowanych lasów (Forest Stewardship Council). Oznacza kontrolowane pochodzenie drewna. Tam, gdzie to możliwe, korzystamy z takich źródeł.",
      },
      {
        question: "Czy druk eko jest droższy?",
        answer:
          "Papiery z recyklingu i certyfikowane bywają nieco droższe od standardowych, ale różnica zwykle nie jest duża. Często więcej zaoszczędzisz, dobierając nakład do realnej potrzeby, niż dopłacisz za ekologiczny papier.",
      },
      {
        question: "Czy na papierze z recyklingu kolory wyjdą dobrze?",
        answer:
          "Wyjdą dobrze, choć nieco bardziej stonowane i z naturalnym odcieniem tła. To często zaleta wizualna dla marek eco. Przy bardzo fotograficznych projektach podpowiemy, czy lepszy będzie papier z odzysku, czy inny kompromis.",
      },
    ],
    cta: {
      heading: "Drukuj świadomie",
      body: "Zapytaj o papier z recyklingu lub FSC do swojego produktu — dobierzemy podłoże i nakład.",
      href: "/#produkty",
      label: "Zamów eko druk →",
    },
  },
  {
    slug: "drukarnia-z-dostawa",
    eyebrow: "Drukarnia z dostawą",
    keyword: "drukarnia z dostawą",
    metaTitle:
      "Drukarnia z dostawą — kurier w całej Polsce 24–48 h | DobrePrinty",
    metaDescription:
      "Drukarnia z dostawą DobrePrinty: kurier pod wskazany adres w całej Polsce, zwykle następnego dnia po produkcji. Druk online bez wychodzenia z biura.",
    h1Lead: "Drukarnia",
    h1Highlight: "z dostawą",
    heroLead:
      "Zamawiasz online, my drukujemy i wysyłamy kurierem pod wskazany adres w całej Polsce. Nie musisz wychodzić z biura ani szukać punktu odbioru.",
    heroStats: [
      { value: "cała PL", label: "zasięg kuriera" },
      { value: "+1 dzień", label: "po produkcji" },
      { value: "pod adres", label: "lub na godzinę" },
    ],
    bulletsHeading: "Dostawa, na której można polegać",
    bullets: [
      {
        title: "Kurier w całej Polsce",
        body: "Dostarczamy pod dowolny adres w kraju — biuro, dom, magazyn, miejsce eventu. Druk z dostawą działa tam, gdzie akurat jesteś, bez wizyty w punkcie.",
      },
      {
        title: "Szybko po produkcji",
        body: "Kurier startuje zaraz po wydrukowaniu zamówienia, więc paczka jest u Ciebie zwykle następnego dnia roboczego. Status zamówienia widzisz na bieżąco.",
      },
      {
        title: "Bezpieczne pakowanie",
        body: "Plakaty w sztywnych tubach, roll-upy w pokrowcach, ulotki w opaskach. Materiały docierają bez zagnieceń i wgnieceń narożników.",
      },
      {
        title: "Dostawa na godzinę dla firm",
        body: "Gdy materiały muszą być na miejscu o konkretnej porze — np. na otwarcie targów — dostępna jest dostawa pod wskazaną godzinę za dopłatą.",
      },
    ],
    bodyHeading: "Druk online z wysyłką pod drzwi",
    body: [
      "Drukarnia z dostawą to wygoda, której trudno się oduczyć: zamiast planować wyjazd po wydruki, składasz zamówienie online, a gotowe materiały przyjeżdżają do Ciebie kurierem. Cały proces — od konfiguracji, przez płatność, po śledzenie przesyłki — odbywa się bez wychodzenia z biura.",
      "Realny czas oczekiwania to suma produkcji (standardowo 24–48 h) i transportu (zwykle jeden dzień roboczy). Zamówienie złożone na początku tygodnia trafia pod adres pod koniec tygodnia. Dla pilnych terminów łączymy tryb ekspresowy z szybką wysyłką, a firmom oferujemy dostawę pod konkretną godzinę.",
      "Dostawa kurierem obejmuje całą Polskę, więc nie ma znaczenia, czy Twoja firma jest w dużym mieście, czy w mniejszej miejscowości — materiały dojadą pod wskazany adres tak samo. Jeśli szukasz oferty pod konkretne miasto, zajrzyj też do naszych stron lokalnych, gdzie opisujemy druk i dostawę w Twojej okolicy.",
    ],
    relatedProducts: [
      "ulotki",
      "wizytowki",
      "plakaty",
      "roll-up",
      "broszury-klejone",
      "skladane-ulotki",
    ],
    productsHeading: "Zamów z dostawą",
    productsLead:
      "Każdy produkt z katalogu wyślemy kurierem w całej Polsce. Wyceń online.",
    faqs: [
      {
        question: "Jak długo trwa dostawa?",
        answer:
          "Do czasu produkcji (standardowo 24–48 h) dolicz transport kurierem, zwykle jeden dzień roboczy. W praktyce zamówienie złożone na początku tygodnia jest pod adresem pod jego koniec. Przy pilnych terminach łączymy ekspres z szybką wysyłką.",
      },
      {
        question: "Czy dostarczacie w całej Polsce?",
        answer:
          "Tak, kurier dowozi paczki pod dowolny adres w kraju — niezależnie od wielkości miejscowości. Druk z dostawą działa tak samo w dużym mieście, jak i w mniejszej lokalizacji.",
      },
      {
        question: "Czy mogę odebrać zamówienie osobiście?",
        answer:
          "DobrePrinty działa w modelu online z dostawą — nie prowadzimy stacjonarnych punktów odbioru. Druk realizuje wybrana drukarnia partnerska, a kurier dostarcza paczkę pod wskazany adres.",
      },
      {
        question: "Czy mogę dostać materiały na konkretną godzinę?",
        answer:
          "Dla firm dostępna jest dostawa pod wskazaną godzinę za dopłatą — przydatna np. na rozpoczęcie targów lub event. Szczegóły potwierdzi biuro obsługi przy składaniu zamówienia.",
      },
    ],
    cta: {
      heading: "Zamów, a przyjedzie do Ciebie",
      body: "Druk online z dostawą kurierem w całej Polsce. Skonfiguruj zamówienie i podaj adres.",
      href: "/#produkty",
      label: "Zamów z dostawą →",
    },
  },
  {
    slug: "jak-wybrac-drukarnie-online",
    eyebrow: "Poradnik",
    keyword: "jak wybrać drukarnię online",
    metaTitle:
      "Jak wybrać drukarnię online — praktyczny poradnik | DobrePrinty",
    metaDescription:
      "Jak wybrać drukarnię online: na co zwrócić uwagę przy cenie, terminie, jakości i obsłudze pliku. Checklista, która chroni przed rozczarowaniem.",
    h1Lead: "Jak wybrać",
    h1Highlight: "drukarnię online",
    heroLead:
      "Nie każda tania oferta jest dobra, i nie każda droga — bezpieczna. Oto na co realnie patrzeć, wybierając drukarnię internetową, żeby nie żałować po fakcie.",
    heroStats: [
      { value: "6", label: "kryteriów wyboru" },
      { value: "1 plik", label: "test jakości" },
      { value: "0 gwiazdek", label: "uczciwa cena" },
    ],
    bulletsHeading: "6 rzeczy, które warto sprawdzić",
    bullets: [
      {
        title: "Cena z VAT, nie „od netto”",
        body: "Sprawdź, czy widzisz pełną kwotę brutto przed zamówieniem. Oferty „od X zł netto” potrafią urosnąć o dopłaty za spady, przygotowanie i obsługę — porównuj ceny końcowe.",
      },
      {
        title: "Realny, nie obiecany termin",
        body: "Zwróć uwagę, czy termin obejmuje produkcję i dostawę, czy tylko jedno z nich. Uczciwa drukarnia rozdziela te etapy i nie obiecuje „24 h pod drzwi”, jeśli kurier potrzebuje dnia.",
      },
      {
        title: "Weryfikacja pliku (preflight)",
        body: "Dobra drukarnia sprawdza spady, rozdzielczość i kolory przed drukiem i wraca do Ciebie z poprawkami. Bez tego ryzykujesz białe paski na krawędziach albo ucięty tekst.",
      },
      {
        title: "Kto rozpatruje reklamacje",
        body: "Sprawdź, czy w razie problemu masz jednego partnera, czy zostaniesz odesłany do „drukarni, która to fizycznie wykonała”. To pierwsza różnica między wygodą a kłopotem.",
      },
    ],
    bodyHeading: "Checklista wyboru drukarni online",
    body: [
      "Wybór drukarni internetowej sprowadza się do kilku pytań, które warto zadać przed pierwszym zamówieniem. Pierwsze: czy cena, którą widzę, jest pełna? Kwota brutto z VAT, bez dopłat pojawiających się w koszyku, pozwala uczciwie porównać oferty. Druga sprawa to termin — i to, czy obejmuje produkcję, dostawę, czy obie rzeczy razem.",
      "Trzeci punkt to obsługa pliku. Drukarnia, która tylko „przyjmuje PDF i drukuje”, przerzuca całe ryzyko na Ciebie. Taka z preflightem sprawdzi spady, rozdzielczość i czerń tekstu, i odezwie się, zanim coś pójdzie nie tak. Czwarty: kto odpowiada za reklamacje — jeden partner czy łańcuszek podwykonawców. Piąty: wybór materiałów i wykończeń pod Twój konkretny produkt. Szósty: dostępność i czas reakcji obsługi, gdy pojawi się pytanie.",
      "Najprostszy test w praktyce: zamów mały nakład jednego produktu i zobacz, jak przebiega proces — od jasności ceny, przez kontakt przy pliku, po jakość i termin dostawy. Tak sprawdzisz drukarnię taniej niż na dużym, ważnym zleceniu. W DobrePrinty każdy z tych punktów jest wpisany w sam model: cena z VAT od razu, preflight w standardzie, reklamacje po naszej stronie i 28 drukarni partnerskich dobieranych pod produkt.",
    ],
    relatedProducts: ["wizytowki", "ulotki", "plakaty", "roll-up"],
    productsHeading: "Przetestuj nas na małym zamówieniu",
    productsLead:
      "Zamów mały nakład i sprawdź proces od ceny po dostawę. Wyceń w konfiguratorze.",
    faqs: [
      {
        question: "Na co najpierw zwrócić uwagę przy wyborze drukarni online?",
        answer:
          "Na pełną cenę z VAT (bez dopłat doliczanych później), realny termin obejmujący produkcję i dostawę oraz na to, czy drukarnia weryfikuje plik przed drukiem. To trzy rzeczy, które najczęściej decydują o tym, czy będziesz zadowolony.",
      },
      {
        question: "Jak sprawdzić jakość drukarni bez ryzyka?",
        answer:
          "Zamów mały nakład jednego produktu i przejdź cały proces: ocena ceny, kontakt przy pliku, jakość druku i termin dostawy. Tania próba na małym zleceniu chroni przed rozczarowaniem na dużym, ważnym zamówieniu.",
      },
      {
        question: "Czy najtańsza oferta jest najlepsza?",
        answer:
          "Niekoniecznie. Bardzo niska cena bywa okupiona prześwitującym materiałem, cienkim papierem albo terminem, który okazuje się fikcją. Porównuj ceny końcowe z VAT i sprawdzaj, co dokładnie obejmują — czasem „drożej” znaczy „bez niespodzianek”.",
      },
      {
        question: "Co to jest preflight i czemu jest ważny?",
        answer:
          "Preflight to automatyczna i ręczna kontrola pliku przed drukiem: spady, rozdzielczość, kolory, czerń tekstu. Dzięki niemu drukarnia wyłapie błędy, zanim trafią na papier, i wróci do Ciebie z poprawkami — zamiast wydrukować wadliwy materiał.",
      },
    ],
    cta: {
      heading: "Gotowy, żeby przetestować?",
      body: "Zamów mały nakład i sprawdź DobrePrinty na własnym projekcie — cena, plik, jakość, dostawa.",
      href: "/#produkty",
      label: "Zacznij od małego →",
    },
  },
];

export function getTematBySlug(slug: string): TematDrukarnia | undefined {
  return tematyDrukarnie.find((t) => t.slug === slug);
}

/** Like getTematBySlug but throws on a missing slug — keeps page modules typed
 *  as non-nullable without a non-null assertion. */
export function getTematOrThrow(slug: string): TematDrukarnia {
  const temat = getTematBySlug(slug);
  if (!temat) throw new Error(`Brak danych tematu: ${slug}`);
  return temat;
}

export function getAllTematSlugs(): string[] {
  return tematyDrukarnie.map((t) => t.slug);
}
