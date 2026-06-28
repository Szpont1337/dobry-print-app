import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "gramatura-papieru-ulotki",
  title: "Jaką gramaturę papieru wybrać do ulotek — 130g vs 170g vs 250g",
  excerpt:
    "Praktyczny przewodnik po gramaturze papieru do ulotek. Porównanie 130g, 170g, 250g i 350g pod kątem zastosowania, ceny, sztywności i wyglądu. Sprawdź, która gramatura sprawdzi się w Twoim projekcie.",
  category: "papier",
  tags: ["ulotki", "papier", "gramatura", "kreda mat", "drukarnia"],
  publishedAt: "2026-01-22",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["ulotki", "skladane-ulotki", "kartki-pocztowki"],
  sections: [
    {
      type: "p",
      text: "Gramatura papieru to jeden z najważniejszych parametrów ulotki — decyduje o sztywności, „odczuciu w dłoni”, trwałości i koszcie. 130g to ekonomia, 170g to standard premium, 250g to broszury i menu. Wybór gramatury zależy od zastosowania, kanału dystrybucji i tego, jak długo ulotka ma działać. W tym poradniku porównujemy najpopularniejsze gramatury i pokazujemy, którą wybrać w Twoim projekcie.",
    },
    {
      type: "h2",
      id: "czym-jest-gramatura",
      text: "Czym jest gramatura papieru i co oznacza w praktyce",
    },
    {
      type: "p",
      text: "Gramatura papieru to jego waga wyrażona w gramach na metr kwadratowy (g/m² lub g). 130g znaczy, że arkusz papieru o powierzchni 1 m² waży 130 gramów. Im wyższa gramatura, tym papier jest grubszy, sztywniejszy i cięższy. Gramatura nie określa bezpośrednio grubości — ta zależy też od typu papieru (kreda mat, kreda błysk, offset, karton) — ale jest najlepszym przybliżeniem.",
    },
    {
      type: "p",
      text: "W praktyce ulotki drukujemy najczęściej na gramaturach 130–200 g. Poniżej 130g papier wydaje się „tani” i mało profesjonalny — przebija drugą stronę przy druku 4/4 i łatwo się mnie. Powyżej 250g zaczyna się kategoria „broszury” i „kartki” — papier robi się sztywny jak karton, droższy w produkcji, gorszy do dystrybucji w skrzynkach pocztowych.",
    },
    {
      type: "h2",
      id: "porownanie-gramatur",
      text: "Porównanie gramatur 130g, 170g, 250g i 350g",
    },
    {
      type: "table",
      caption:
        "Porównanie najpopularniejszych gramatur papieru kreda mat dla ulotek",
      headers: [
        "Gramatura",
        "Charakterystyka",
        "Typowe zastosowanie",
        "Cena względna",
      ],
      rows: [
        [
          "130 g",
          "Cienki, lekko prześwituje przy druku 4/4",
          "Ulotki masowe (skrzynki pocztowe, ulice)",
          "1,0× (baza)",
        ],
        [
          "170 g",
          "Standardowa sztywność, nie prześwituje",
          "Ulotki promocyjne, menu restauracyjne, składane ulotki",
          "1,15×",
        ],
        [
          "200 g",
          "Wyraźnie sztywniejsze, premium look",
          "Karty menu, vouchery, zaproszenia",
          "1,30×",
        ],
        [
          "250 g",
          "Tekstura kartonowa, sztywne",
          "Mini-kartki, vouchery, ulotki ekspozycyjne",
          "1,55×",
        ],
        [
          "300 g",
          "Karton, nie zwijają się",
          "Pocztówki, kartki świąteczne, ulotki premium",
          "1,75×",
        ],
        [
          "350 g",
          "Standardowy karton wizytówkowy",
          "Wizytówki, vouchery, drobne broszury",
          "2,00×",
        ],
      ],
    },
    {
      type: "h3",
      id: "gramatura-130",
      text: "130g — kiedy się sprawdza",
    },
    {
      type: "p",
      text: "130g to ekonomiczna gramatura dla ulotek masowych: kampanii dystrybuowanych do skrzynek pocztowych, rozdawanych na ulicach, wkładanych do gazet jako insert reklamowy. Cena jednostkowa jest najniższa, więc 10 000 sztuk ulotek 130g będzie tańsze niż to samo na 170g o ok. 15%. Wadą jest lekkie prześwitywanie tylnej strony przez przednią przy druku 4/4 — szczególnie widoczne, gdy tył ma ciemne tło.",
    },
    {
      type: "p",
      text: "130g sprawdza się dla ulotek, które są oglądane raz i wyrzucane. Nie sprawdza się dla menu restauracyjnych (zniszczone po jednym dniu używania), kart programu konferencji (zwijają się po godzinie), ani kart promocyjnych do portfela klienta (zbyt cienkie, gniotą się). Dla tych zastosowań przejdź na 170g lub wyżej.",
    },
    {
      type: "h3",
      id: "gramatura-170",
      text: "170g — najpopularniejszy wybór",
    },
    {
      type: "p",
      text: "170g to standard premium dla ulotek reklamowych: nie prześwituje, ma „odczucie w dłoni”, wytrzymuje wielokrotne dotknięcia bez zagnieceń. To gramatura, którą wybiera większość firm dla swoich materiałów marketingowych — agencje kreatywne, sieci HoReCa, deweloperzy, organizatorzy eventów. Cena jednostkowa wyższa o 15% od 130g, ale różnica w jakości jest duża.",
    },
    {
      type: "p",
      text: "170g to też standard dla [składanych ulotek](/produkty/skladane-ulotki) (menu, foldery, programy konferencji). Bigowanie 170g daje czyste złożenie bez pęknięć powłoki kredy. Niższa gramatura (130g) ryzykuje pęknięcia po kilkudziesięciu otwarciach, wyższa (200g+) jest niepotrzebnie sztywna do [menu](/blog/menu-restauracyjne-druk), które ma być wygodnie składane przez gościa.",
    },
    {
      type: "h3",
      id: "gramatura-250-300",
      text: "250–300g — premium i ekspozycyjne",
    },
    {
      type: "p",
      text: "250–300g to terytorium pocztówek, kart menu, voucherów, kartek świątecznych i ulotek premium. Sztywność na poziomie kartonu — ulotki nie zwijają się, nie gniotą, ekspozycyjne wyglądają profesjonalnie nawet bez ramki. To gramatura dla materiałów, które klient ma zachować: zaproszenia, karty członkowskie, vouchery prezentowe.",
    },
    {
      type: "p",
      text: "Wadą gramatur 250–300g jest cena (1,5–1,8× droższe niż 130g) i fakt, że nie nadają się do dystrybucji masowej. Listonosz nie wepchnie 250g ulotki do większości skrzynek pocztowych bez zagniecenia. Ekspozycyjne stojaki na ulotki też mają ograniczenia gramatury — większość obsługuje do 200g.",
    },
    {
      type: "h2",
      id: "papier-typ",
      text: "Typ papieru — kreda mat, kreda błysk, offset",
    },
    {
      type: "h3",
      id: "kreda-mat",
      text: "Kreda mat — standardowy wybór",
    },
    {
      type: "p",
      text: "Kreda mat to papier powlekany matowo, najczęściej wybierany dla ulotek reklamowych. Daje dobry kompromis ceny, jakości druku i wyglądu — kolory są nasycone, ale bez refleksów oświetleniowych. To gramatura uniwersalna, sprawdza się w 80% projektów. Dostępna w gramaturach 90–350g.",
    },
    {
      type: "h3",
      id: "kreda-blysk",
      text: "Kreda błysk — intensywne kolory, refleksy",
    },
    {
      type: "p",
      text: "Kreda błysk daje intensywniejsze, bardziej nasycone kolory dzięki błyszczącej powłoce. Sprawdza się dla projektów z dużą ilością zdjęć produktowych (katalogi mody, ulotki ekspresji), gdzie kolory mają być „krzykliwe”. Wadą są refleksy oświetleniowe — przy sztucznym świetle sklepowym mogą utrudniać czytanie tekstu pod kątem.",
    },
    {
      type: "h3",
      id: "offset-niepowlekany",
      text: "Offset (papier niepowlekany)",
    },
    {
      type: "p",
      text: "Offset to papier niepowlekany, „matowy w środku”. Kolory mniej nasycone niż na kredzie, ale daje „naturalniejsze”, „ciepłe” wrażenie. Dobrze działa do papieru firmowego (gdzie potem dopisuje się ręcznie lub drukuje treść na drukarce laserowej), do ulotek o profilu ekologicznym (papier oczywiście wygląda eko), do gazet i materiałów wewnętrznych.",
    },
    {
      type: "table",
      caption: "Wybór gramatury i typu papieru wg zastosowania",
      headers: ["Zastosowanie", "Gramatura", "Typ papieru", "Komentarz"],
      rows: [
        ["Ulotki masowe (skrzynki)", "130 g", "Kreda mat", "Najtańsza opcja"],
        [
          "Ulotki promocyjne (stoiska)",
          "170 g",
          "Kreda mat",
          "Standard premium",
        ],
        [
          "Menu restauracyjne",
          "170 g",
          "Kreda mat lub błysk",
          "Bigowanie + folia mat",
        ],
        [
          "Składane ulotki (foldery)",
          "170 g",
          "Kreda mat",
          "Bigowanie wymagane",
        ],
        ["Vouchery prezentowe", "250–300 g", "Kreda mat", "Sztywne, premium"],
        ["Wizytówki", "350 g", "Karton kreda mat", "Standard wizytówkowy"],
        [
          "Pocztówki",
          "300 g",
          "Karton kreda mat",
          "Przejdą pocztą bez zagnieceń",
        ],
        ["Plakaty wewnętrzne", "170 g", "Satynowy", "Bez refleksów"],
        [
          "Papier firmowy",
          "90 g",
          "Offset biały",
          "Kompatybilny z drukarką laserową",
        ],
      ],
    },
    {
      type: "h2",
      id: "wykonczenia",
      text: "Wykończenia — folia, lakier UV, tłoczenie",
    },
    {
      type: "p",
      text: "Wybór gramatury to nie wszystko — [wykończenia](/blog/wykonczenia-folia-uv-tloczenie) mogą podnieść percepcję jakości nawet przy niższej gramaturze. Folia matowa dodaje premium look i chroni przed zarysowaniem. Folia błyszcząca intensyfikuje kolory. Lakier UV punktowy podkreśla wybrane elementy (logo, claim). Tłoczenie folią złotą lub srebrną to opcja dla materiałów ekskluzywnych.",
    },
    {
      type: "p",
      text: "Każde wykończenie podnosi cenę o 20–50% i wydłuża czas realizacji o 24–72 h. Dla większości projektów wystarcza dobra gramatura (170g) bez wykończeń. Folia matowa polecana dla projektów premium (zaproszenia, kartki świąteczne korporacyjne) i tam, gdzie ulotka będzie noszona długo (np. menu restauracji, karty członkowskie).",
    },
    {
      type: "callout",
      variant: "tip",
      text: "Jeśli budżet jest ograniczony, lepiej wybrać dobrą gramaturę (170g) bez folii niż niską gramaturę (130g) z folią matową. Gramatura decyduje o pierwszym wrażeniu w dłoni — wykończenie podkreśla, ale nie zastępuje sztywności.",
    },
    {
      type: "h2",
      id: "ekonomia",
      text: "Ekonomia — kiedy warto przepłacić za wyższą gramaturę",
    },
    {
      type: "p",
      text: "Przy nakładzie 1000 ulotek różnica między 130g a 170g wynosi ok. 20–30 zł na całym nakładzie. To nieistotna kwota wobec wartości materiałów reklamowych, które robią pierwsze wrażenie u klienta. Przepłać za 170g zamiast 130g w 99% przypadków — różnica w jakości jest 10× większa niż różnica w cenie.",
    },
    {
      type: "p",
      text: "Wyjątek: kampanie masowe z dystrybucją do skrzynek pocztowych w nakładach 10 000+. Tu różnica między 130g a 170g to już 200–300 zł na nakładzie, a ulotka i tak trafia do skrzynki, gdzie nie ma czasu zrobić wrażenia premium. Dla takich kampanii 130g jest racjonalnym wyborem.",
    },
    {
      type: "faq",
      items: [
        {
          q: "Czy 130g ulotka prześwituje przy druku 4/4?",
          a: "Tak, przy ciemnych tłach na obu stronach prześwitywanie może być widoczne. 130g kreda mat ma minimalną „nieprzezroczystość” (opacity) — wystarczającą dla ulotek z dużą ilością białego tła, niewystarczającą dla projektów typu „czarna ulotka z białym tekstem” drukowanych 4/4. Dla takich projektów przejdź na 170g (mniej prześwituje) lub 200g (praktycznie nie prześwituje).",
        },
        {
          q: "Jaką gramaturę wybrać do menu restauracyjnego, które gości codziennie?",
          a: "170g kreda mat z bigowaniem i folią matową to złoty standard. Bigowanie chroni linię złożenia przed pęknięciem powłoki, folia matowa chroni okładkę przed śladami palców i odbarwieniami. Dla menu w lokalu premium (gdzie gość ogląda menu kilka minut) warto rozważyć 250g — sztywne, „kartonowe” wrażenie, dłuższa trwałość.",
        },
        {
          q: "Czy wyższa gramatura zawsze oznacza lepszą jakość?",
          a: "Nie zawsze. Gramatura musi pasować do zastosowania. 350g karton w skrzynce pocztowej (np. ulotka 250g+ wkładana do nieotwartej koperty) jest po prostu niepraktyczny — listonosz nie wepchnie jej do skrzynki bez zagniecenia. Z drugiej strony 130g ulotka w roli karty menu wytrzyma jeden dzień. Wyższa gramatura = lepsza w zastosowaniach, gdzie liczy się sztywność i trwałość, nie zawsze tam, gdzie chodzi o masową dystrybucję.",
        },
        {
          q: "Jak gramatura wpływa na cenę?",
          a: "Cena rośnie liniowo z gramaturą: 130g jest bazą, 170g ok. 15% drożej, 200g 30%, 250g 55%, 300g 75%, 350g 100% (2× droższe). Dla mikronakładów (50-100 sztuk) różnica jest praktycznie nieistotna (kilka złotych). Dla nakładów 5 000+ różnica może wynosić 300-1000 zł. Wybór gramatury to świadome balansowanie ceny vs jakość.",
        },
        {
          q: "Czy mogę zamówić ulotkę na papierze ekologicznym?",
          a: "Tak, oferujemy papier ekologiczny (recycling) w gramaturach 90, 120, 170 i 200g. Ma beżowy odcień, jest lekko szorstki w dotyku, kolory drukują się mniej nasycone niż na kredzie. Idealny dla marek o pozycjonowaniu eko (B Corp, marki natur, kosmetyki naturalne). Cena: ok. 20% wyższa niż standardowy papier kredowany.",
        },
        {
          q: "Czy gramatura wpływa na czas realizacji?",
          a: "W standardowych zamówieniach nie. 130g i 170g idą przez tę samą maszynę cyfrową lub offsetową, czas druku jest identyczny. Wpływ na czas mają tylko wyższe gramatury (300g+) z wykończeniami (folia, lakier UV) — wtedy dochodzi etap suszenia i kontroli jakości, dodaje to 24-72 h. Standardowe ulotki 130-200g: 24-48 h od potwierdzenia pliku.",
        },
        {
          q: "Jaką gramaturę wybrać do pocztówek nadawanych pocztą?",
          a: "300g karton kreda mat to standard. Mniej (250g) ryzykuje zagniecenia w sortowni pocztowej, więcej (350g) mieści się gorzej w skrzynkach pocztowych odbiorców. 300g daje optymalny kompromis: sztywne, wytrzymuje transport pocztowy, przechodzi przez standardową szczelinę skrzynki. Format A6, DL lub A5 — wszystkie w standardach Poczty Polskiej dla nadawania jako kartka pocztowa.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Wybierz gramaturę i zamów druk",
      body: "W konfiguratorze DobrePrinty gramatura jest opcją wybieraną przy każdym produkcie. Cena brutto z VAT zmienia się od razu po zmianie gramatury — możesz porównać 130g vs 170g na żywo i wybrać świadomie.",
      href: "/produkty/ulotki",
      label: "Skonfiguruj ulotki →",
    },
  ],
};
