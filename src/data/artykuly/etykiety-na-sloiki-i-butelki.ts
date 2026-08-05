import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "etykiety-na-sloiki-i-butelki",
  title: "Etykiety na słoiki i butelki — jak zaprojektować i wydrukować",
  excerpt:
    "Etykiety samoprzylepne na słoiki i butelki: papier czy folia, klej trwały czy zmywalny, wodoodporność, wymiary pod popularne pojemniki, spad i dane obowiązkowe na żywności i kosmetykach.",
  category: "produkty",
  tags: ["etykiety", "naklejki", "słoiki", "butelki", "opakowania"],
  publishedAt: "2026-07-30",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "HowTo",
  relatedProducts: ["naklejki"],
  sections: [
    {
      type: "p",
      text: "Etykieta na słoik z miodem, butelkę nalewki czy pojemnik kosmetyku to często pierwszy kontakt klienta z produktem — i jednocześnie najtrudniejsza technicznie naklejka, bo musi przetrwać wilgoć, lodówkę, tłuszcz i dłonie. Zła decyzja o materiale albo kleju kończy się etykietą, która odkleja się w chłodziarce albo rozmazuje po kontakcie z wodą. W tym poradniku przechodzimy krok po kroku przez wybór podłoża i kleju, dobór wymiaru do popularnych słoików i butelek, przygotowanie pliku ze spadem oraz dane, które PRAWO wymaga umieścić na żywności i kosmetykach.",
    },
    {
      type: "h2",
      id: "material-papier-czy-folia",
      text: "Krok 1: Materiał — papier czy folia",
    },
    {
      type: "p",
      text: "Najważniejsza decyzja. Papier jest tańszy i ma naturalny, „rzemieślniczy” wygląd, ale rozmięka od wody i tłuszczu. Folia PP (polipropylen) jest wodoodporna, wytrzymała i dostępna w wersji białej lub transparentnej — ta druga daje modny efekt „no-label look”, czyli etykiety, przez którą widać zawartość butelki. Wybór dyktuje środowisko, w jakim będzie żył produkt.",
    },
    {
      type: "table",
      caption: "Materiał etykiety a zastosowanie",
      headers: ["Materiał", "Wodoodporność", "Wygląd", "Do czego"],
      rows: [
        [
          "Papier biały",
          "Niska — rozmięka",
          "Naturalny, matowy",
          "Suche produkty: kawa, herbata, przyprawy, świece",
        ],
        [
          "Papier + laminat",
          "Średnia",
          "Naturalny z ochroną",
          "Miód, dżemy, słoiki bez zanurzania w wodzie",
        ],
        [
          "Folia PP biała",
          "Wysoka",
          "Gładki, „produktowy”",
          "Kosmetyki, chemia, napoje, lodówka",
        ],
        [
          "Folia PP transparentna",
          "Wysoka",
          "Efekt no-label look",
          "Butelki, słoiki premium, napoje",
        ],
      ],
    },
    {
      type: "h2",
      id: "klej",
      text: "Krok 2: Klej — trwały czy zmywalny",
    },
    {
      type: "p",
      text: "Do etykiet produktowych, które mają zostać na opakowaniu na stałe, wybiera się klej trwały (permanentny). Klej zmywalny (removable) stosuje się tam, gdzie słoik ma być myty i używany ponownie albo gdy etykieta jest tymczasowa (promocja, oznaczenie). Kluczowy jest jednak warunek nakładania i przechowywania: klej łapie pełną przyczepność dopiero po 24–48 h, a nakładanie na wilgotną, zimną lub tłustą powierzchnię drastycznie obniża jego siłę.",
    },
    {
      type: "callout",
      variant: "warn",
      text: "Etykieta do lodówki i na mrożonki to osobny przypadek. Na zimnej butelce skrapla się kondensacja, a standardowy klej nie chwyta wilgotnej powierzchni. Do produktów chłodzonych i mrożonych używaj folii z klejem odpornym na niskie temperatury (deep freeze), naklejaj na SUCHE i ogrzane do temperatury pokojowej opakowanie, a dopiero potem wstawiaj do chłodni.",
    },
    {
      type: "h2",
      id: "ksztalt-i-wymiary",
      text: "Krok 3: Kształt i wymiar pod pojemnik",
    },
    {
      type: "p",
      text: "Wymiar etykiety liczy się od obwodu i wysokości pojemnika. Etykieta owijana (wrap) powinna być o kilka milimetrów krótsza niż pełny obwód, żeby nie zachodziła sama na siebie brzydkim szwem — chyba że celowo projektujesz zakład (overlap) 5–10 mm z przezroczystym marginesem. Poniżej orientacyjne wymiary pod popularne pojemniki:",
    },
    {
      type: "table",
      caption: "Orientacyjne wymiary etykiet pod popularne pojemniki",
      headers: ["Pojemnik", "Obwód (ok.)", "Sugerowana etykieta (szer. × wys.)"],
      rows: [
        ["Słoik miodowy 250 ml (Ø 66 mm)", "~207 mm", "200 × 60 mm (owijana)"],
        ["Słoik 370–420 ml (Ø 72 mm)", "~226 mm", "80 × 90 mm (frontowa)"],
        ["Słoik 900 ml (Ø 100 mm)", "~314 mm", "90 × 100 mm (frontowa)"],
        ["Butelka 0,33 l piwo (Ø 60 mm)", "~189 mm", "90 × 90 mm (frontowa)"],
        ["Butelka 0,5 l nalewka (Ø 70 mm)", "~220 mm", "70 × 100 mm (frontowa)"],
        ["Słoiczek kosmetyczny 50 ml (Ø 50 mm)", "~157 mm", "150 × 30 mm (owijana)"],
      ],
    },
    {
      type: "p",
      text: "Na zaokrąglonej powierzchni (wąskie słoiczki, butelki o małej średnicy) unikaj etykiet szerszych niż ~1/3 obwodu, bo na mocno wygiętej ściance rogi prostokątnej etykiety odstają. Dla wąskich pojemników lepszy jest format owijany na cały obwód albo etykieta o zaokrąglonych narożnikach.",
    },
    {
      type: "h2",
      id: "projekt-i-spad",
      text: "Krok 4: Przygotowanie pliku — spad i kontur cięcia",
    },
    {
      type: "list",
      items: [
        "Spad (bleed) minimum 2–3 mm z każdej strony — kolor musi wychodzić poza linię cięcia, inaczej przy tolerancji noża zostanie biały pasek. Zasady spadu opisujemy w poradniku [jak zrobić bleed](/blog/jak-zrobic-bleed).",
        "Bezpieczny margines na tekst i logo: 3–4 mm od linii cięcia do wewnątrz.",
        "Rozdzielczość 300 dpi w skali 1:1, kolory w [CMYK, nie RGB](/blog/cmyk-vs-rgb).",
        "Kontur cięcia (cutline) jako osobna ścieżka wektorowa w kolorze spot „CutContour” — jeśli etykieta ma kształt inny niż prostokąt.",
        "Na folii transparentnej zaplanuj biały podkład (white) pod elementy, które mają być kryjące — inaczej kolory będą przezroczyste i wtopią się w zawartość.",
      ],
    },
    {
      type: "h2",
      id: "dane-obowiazkowe",
      text: "Krok 5: Dane, które muszą się znaleźć na etykiecie",
    },
    {
      type: "p",
      text: "Etykieta produktowa to nie tylko grafika — na żywności i kosmetykach obowiązują wymogi prawne. Braki mogą oznaczać wycofanie partii ze sprzedaży, więc zaplanuj miejsce na te dane już na etapie projektu:",
    },
    {
      type: "list",
      items: [
        "Żywność: nazwa produktu, wykaz składników (malejąco wg masy), alergeny wyróżnione, masa/objętość netto, data minimalnej trwałości lub termin przydatności, dane producenta, warunki przechowywania, kraj pochodzenia (gdy wymagany), wartość odżywcza.",
        "Miód: dodatkowo rodzaj miodu i kraj/kraje pozyskania.",
        "Napoje alkoholowe: objętość, moc (% obj.), ostrzeżenia, dane producenta.",
        "Kosmetyki: nazwa, funkcja, skład INCI, ilość nominalna, data trwałości lub symbol PAO (otwarty słoiczek z liczbą miesięcy), numer partii, dane odpowiedzialnego, ostrzeżenia.",
        "Wszędzie warto: kod kreskowy/EAN (jeśli produkt idzie do sklepów) i symbole recyklingu opakowania.",
      ],
    },
    {
      type: "callout",
      variant: "info",
      text: "Tekst prawny bywa drobny — zadbaj o czytelność. Skład i dane producenta trzymaj minimum na 6 pkt (im więcej, tym lepiej), w wysokim kontraście do tła i NIE na zdjęciu bez podkładu. Jeśli danych jest dużo, a słoik mały, rozważ etykietę dwuczęściową: ozdobny front i osobna, gęściej zadrukowana etykieta z tyłu.",
    },
    {
      type: "h2",
      id: "druk-arkusz-czy-rolka",
      text: "Krok 6: Arkusz czy rolka",
    },
    {
      type: "p",
      text: "Etykiety na arkuszu (cięte pojedynczo lub w kiss-cut) sprawdzają się przy małych i średnich nakładach oraz ręcznym naklejaniu. Etykiety na rolce są niezbędne, gdy naklejasz aplikatorem lub półautomatem przy większej produkcji — wtedy podaj drukarni średnicę rdzenia (najczęściej 40 lub 76 mm), kierunek nawoju i liczbę etykiet na rolce. Przy pełnokolorowych, krótkich seriach najtańszy jest druk cyfrowy z cięciem ploterowym do dowolnego konturu — więcej o rodzajach naklejek i klejów w artykule o [naklejkach i etykietach](/blog/naklejki-i-etykiety).",
    },
    {
      type: "faq",
      items: [
        {
          q: "Papier czy folia na etykietę do słoika?",
          a: "Jeśli produkt ma kontakt z wilgocią, lodówką lub tłuszczem — folia PP (biała lub transparentna), bo jest wodoodporna. Papier wybierz tylko do suchych produktów (kawa, przyprawy, świece) albo z laminatem ochronnym. Miód i dżemy najlepiej znoszą folię lub papier laminowany.",
        },
        {
          q: "Jaki klej do etykiet na butelki chłodzone?",
          a: "Do lodówki i mrożonek użyj folii z klejem odpornym na niskie temperatury (deep freeze). Kluczowe jest naklejanie na suche i ogrzane do temperatury pokojowej opakowanie — na zimnej, zroszonej butelce żaden standardowy klej nie chwyta dobrze.",
        },
        {
          q: "Jaki spad przygotować dla etykiety?",
          a: "Minimum 2–3 mm spadu z każdej strony, żeby po cięciu nie został biały pasek. Tekst i logo trzymaj 3–4 mm od linii cięcia do wewnątrz. Plik w 300 dpi i CMYK, a przy kształcie innym niż prostokąt dołóż kontur cięcia jako ścieżkę spot „CutContour”.",
        },
        {
          q: "Co to jest efekt no-label look?",
          a: "To etykieta na folii transparentnej, przez którą widać zawartość butelki lub słoika — wygląda, jakby napis był nadrukowany bezpośrednio na szkle. Przy tym efekcie zaplanuj biały podkład pod elementy, które mają być kryjące, inaczej kolory będą przezroczyste.",
        },
        {
          q: "Jakie dane muszą być na etykiecie żywności?",
          a: "Nazwa produktu, wykaz składników z wyróżnionymi alergenami, masa/objętość netto, data trwałości lub termin przydatności, dane producenta, warunki przechowywania, w wielu przypadkach wartość odżywcza i kraj pochodzenia. Kosmetyki wymagają dodatkowo składu INCI i symbolu PAO. Zaplanuj miejsce na te dane już w projekcie.",
        },
        {
          q: "Etykiety na arkuszu czy na rolce?",
          a: "Arkusz — do małych i średnich nakładów oraz ręcznego naklejania. Rolka — gdy używasz aplikatora lub półautomatu przy większej produkcji; wtedy podaj średnicę rdzenia (40 lub 76 mm), kierunek nawoju i liczbę etykiet na rolce.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Zaprojektuj etykietę, którą nosi Twój produkt",
      body: "W DobrePrinty drukujemy etykiety na papierze i folii PP (białej i transparentnej), z klejem trwałym lub zmywalnym i cięciem ploterowym do dowolnego kształtu — już od 1 arkusza. Idealne na słoiki, butelki i kosmetyki.",
      href: "/produkty/naklejki",
      label: "Zamów etykiety →",
    },
  ],
};
