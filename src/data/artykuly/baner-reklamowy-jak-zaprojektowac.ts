import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "baner-reklamowy-jak-zaprojektowac",
  title:
    "Baner reklamowy — jak zaprojektować i przygotować plik do druku",
  excerpt:
    "Projektowanie banerów PVC: rozdzielczość dla wielkiego formatu, czytelność z odległości, oczka i zgrzewy, przygotowanie pliku 1:1 lub w skali.",
  category: "poradniki",
  tags: ["baner", "wielki format", "PVC", "projektowanie"],
  publishedAt: "2026-06-29",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["baner-reklamowy", "roll-up"],
  sections: [
    {
      type: "p",
      text: "Baner reklamowy to najtańszy metr kwadratowy reklamy zewnętrznej — ale tylko wtedy, gdy da się go przeczytać. Projekt, który świetnie wygląda na ekranie laptopa, z 20 metrów potrafi zmienić się w kolorową plamę bez treści. W tym poradniku pokazujemy, jak zaprojektować [baner PVC](/produkty/baner-reklamowy) od strony treści (jedno hasło, 3 sekundy uwagi), typografii (wielkość liter zależna od odległości widza), rozdzielczości (nie, nie potrzebujesz 300 DPI) i wykończenia (zgrzewy, oczka co 50 cm). Na końcu znajdziesz listę najczęstszych błędów i FAQ.",
    },
    {
      type: "h2",
      id: "mniej-znaczy-wiecej",
      text: "Mniej znaczy więcej — masz 3 sekundy",
    },
    {
      type: "p",
      text: "Kierowca jadący 50 km/h widzi Twój baner przez 2-4 sekundy. Pieszy — niewiele dłużej, bo baner to tło, a nie treść, na której się skupia. W tym czasie odbiorca jest w stanie przeczytać jedno hasło i jeden kontakt. Wszystko ponad to obniża skuteczność całości: im więcej elementów, tym mniejszy każdy z nich i tym trudniej wyłowić najważniejszy.",
    },
    {
      type: "list",
      items: [
        "Jedno hasło główne — maksymalnie 3-5 słów (np. „Wynajem koparek”, „Pizza z pieca — 20 m dalej”)",
        "Jeden kontakt — numer telefonu LUB adres www, nie oba w tej samej wielkości",
        "Logo — mniejsze niż hasło; ludzie zapamiętują komunikat, nie znak firmowy",
        "Maksymalnie 2 kroje pisma i 2-3 kolory poza tłem",
        "Zero długich zdań, list zalet i drobnych dopisków — tego nikt nie przeczyta z odległości",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      text: "Test windy: pokaż projekt komuś na ekranie telefonu z odległości wyprostowanej ręki przez 3 sekundy. Jeśli nie potrafi powtórzyć hasła i kontaktu — projekt jest zbyt gęsty. To symuluje realne warunki odbioru banera z kilkunastu metrów.",
    },
    {
      type: "h2",
      id: "czytelnosc-z-odleglosci",
      text: "Czytelność z odległości — wielkość liter i kontrast",
    },
    {
      type: "p",
      text: "Podstawowa reguła: na każdy metr odległości widza litera powinna mieć co najmniej 25 mm wysokości, jeśli ma być komfortowo czytelna (przyjmuje się też uproszczenie 10 mm/m dla tekstu „ledwo czytelnego” — ale przy banerze celuj w komfort, nie w minimum). Baner przy drodze oglądany z 20-30 m potrzebuje hasła o wysokości liter 500-750 mm — czyli połowy wysokości typowego banera 2 x 1 m. To dlatego na dobrym banerze mieści się tak mało treści.",
    },
    {
      type: "table",
      caption:
        "Odległość widza a minimalna wysokość liter i wystarczająca rozdzielczość projektu",
      headers: [
        "Odległość widza",
        "Min. wysokość liter (komfortowa)",
        "Wystarczające DPI w skali 1:1",
      ],
      rows: [
        ["1 m", "25 mm", "150 DPI"],
        ["3 m", "75 mm", "100-120 DPI"],
        ["5 m", "125 mm", "80-100 DPI"],
        ["10 m", "250 mm", "50-70 DPI"],
        ["20 m", "500 mm", "30-40 DPI"],
        ["50 m", "1000 mm", "15-20 DPI"],
      ],
    },
    {
      type: "p",
      text: "Drugi filar czytelności to kontrast. Najlepiej sprawdzają się pary: ciemny granat/czerń + biel lub żółć, biel + czerwień, żółć + czerń. Unikaj tekstu na zdjęciu bez apli lub podbicia — fotografia ma zmienne jasności i litery „toną” w detalach. Jeśli musisz położyć tekst na zdjęciu, dodaj półprzezroczystą aplę lub mocny cień. Zasady doboru wielkości do formatu opisaliśmy szerzej w poradniku o [formatach plakatów](/blog/druk-plakatow-formaty) — dla banera obowiązuje ta sama logika, tylko odległości są większe.",
    },
    {
      type: "h2",
      id: "rozdzielczosc-wielki-format",
      text: "Rozdzielczość w wielkim formacie — 300 DPI to mit",
    },
    {
      type: "p",
      text: "300 DPI to standard dla druku oglądanego z 30 cm: ulotki, wizytówki, katalogi. Baner nikt nie ogląda z 30 cm. Oko ludzkie z 10 m nie odróżni wydruku 50 DPI od 150 DPI — a plik banera 5 x 2 m w 300 DPI miałby ponad 59 000 x 23 600 pikseli i ważył kilka gigabajtów. Takiego pliku nie przetworzy ani Twój komputer, ani RIP drukarni. W praktyce: baner oglądany z 5 m i więcej przygotuj w 72-100 DPI w skali 1:1, a wielkie sitaki i banery na budynki (odbiór z 20-50 m) w 20-40 DPI.",
    },
    {
      type: "h3",
      id: "skala-1-1-czy-1-10",
      text: "Skala 1:1 czy 1:10?",
    },
    {
      type: "p",
      text: "Plik możesz przygotować na dwa sposoby. Skala 1:1 — dokument ma fizyczny wymiar banera (np. 500 x 200 cm) i rozdzielczość 72-100 DPI. Skala 1:10 — dokument ma 1/10 wymiaru (50 x 20 cm), ale rozdzielczość 10x wyższą (np. 720 DPI zamiast 72 DPI), bo przy powiększeniu DPI dzieli się przez 10. Skala 1:10 przydaje się, gdy program ma limit wymiaru strony (starsze wersje Illustratora: 578,7 cm) albo gdy plik 1:1 robi się zbyt ciężki. Zawsze zaznacz w zamówieniu, w jakiej skali jest plik — i nigdy nie mieszaj skal w jednym dokumencie.",
    },
    {
      type: "callout",
      variant: "warn",
      text: "Uwaga na skalę i elementy rastrowe: jeśli projektujesz 1:10, zdjęcie umieszczone w dokumencie musi mieć efektywne 300-1000 DPI w skali projektu, żeby po powiększeniu dać 30-100 DPI na banerze. Sprawdź efektywną rozdzielczość podlinkowanych obrazów (w InDesign: panel Links → Effective PPI) — to najczęstszy powód rozpikselowanych banerów.",
    },
    {
      type: "h2",
      id: "kolory-cmyk",
      text: "Kolory — CMYK i pułapki pełnych apli",
    },
    {
      type: "p",
      text: "Baner drukuje się w [CMYK, nie RGB](/blog/cmyk-vs-rgb) — soczysta limonkowa zieleń czy elektryczny błękit z ekranu na PVC wyjdą przygaszone. Projektuj od początku w CMYK i pamiętaj o dwóch specyficznych dla wielkiego formatu zasadach. Po pierwsze: unikaj rozległych, pełnych apli bardzo ciemnych kolorów (TIL powyżej ~300%). Baner wisi na słońcu — ciemna powierzchnia nagrzewa się mocniej, folia PVC pracuje termicznie, a nadmiar atramentu wydłuża schnięcie i może się smużyć przy zwijaniu. Po drugie: czarne tła zamiast K100 przygotuj jako umiarkowany rich black (np. C40 M30 Y30 K100), a bardzo ciemne granaty i grafity rozjaśnij o 5-10% względem wersji ekranowej — w solwencie i UV ciemne aple szybko się „zalewają” i tracą rysunek.",
    },
    {
      type: "p",
      text: "Kolory firmowe podaj drukarni jako wartości CMYK lub numer Pantone do symulacji — nie licz na to, że „czerwony jak w logo” wyjdzie sam z siebie. Przy banerach dwustronnych (blockout) pamiętaj, że każda strona drukowana jest osobno i minimalne różnice odcienia są normalne.",
    },
    {
      type: "h2",
      id: "materialy",
      text: "Materiały — frontlit, blockout, siatka mesh",
    },
    {
      type: "table",
      caption: "Najpopularniejsze materiały banerowe i ich zastosowania",
      headers: ["Materiał", "Gramatura", "Zastosowanie"],
      rows: [
        [
          "PVC frontlit",
          "440-510 g/m²",
          "Standard: ogrodzenia, ściany, rusztowania, stelaże — 90% zamówień",
        ],
        [
          "PVC blockout",
          "610-680 g/m²",
          "Baner dwustronny lub jednostronny wymagający pełnego krycia (nieprzepuszcza światła)",
        ],
        [
          "Siatka mesh",
          "270-340 g/m²",
          "Ogrodzenia i miejsca wietrzne, wielkie fasady — perforacja przepuszcza 20-40% wiatru",
        ],
        [
          "PVC backlit",
          "440-550 g/m²",
          "Kasetony i konstrukcje podświetlane od tyłu",
        ],
      ],
    },
    {
      type: "p",
      text: "Frontlit 440-510 g/m² to bezpieczny wybór do większości zastosowań na 1-3 sezony. Siatkę mesh wybierz wszędzie tam, gdzie baner działa jak żagiel: ogrodzenia budów, balustrady, wysokie elewacje. Pełny baner PVC o powierzchni kilkunastu metrów kwadratowych przy silnym wietrze potrafi wyrwać oczka albo przewrócić lekkie ogrodzenie — mesh redukuje napór wiatru o kilkadziesiąt procent kosztem lekko „rastrowego” wyglądu grafiki z bliska. Do reklamy przenośnej na targi i do wnętrz rozważ zamiast banera [roll-up](/produkty/roll-up) — grafika 85 x 200 cm z własnym stelażem rozkładanym w 30 sekund.",
    },
    {
      type: "h2",
      id: "wykonczenie",
      text: "Wykończenie — zgrzew, oczka, tunele",
    },
    {
      type: "p",
      text: "Standardowe wykończenie banera to zgrzew obwodowy i oczka. Zgrzew polega na podwinięciu i zgrzaniu krawędzi na szerokość 2-3 cm — podwójna warstwa folii wzmacnia brzeg i trzyma oczka. Oczka (metalowe pierścienie o średnicy wewnętrznej ok. 10-12 mm) rozmieszcza się standardowo co 50 cm na całym obwodzie; w miejscach wietrznych warto zagęścić je do co 25-30 cm. Alternatywą są tunele — rękawy zgrzane wzdłuż górnej i dolnej krawędzi, w które wsuwa się rurkę lub linkę; sprawdzają się przy systemach napinających i banerach wieszanych nad ulicą.",
    },
    {
      type: "p",
      text: "Dla projektu oznacza to jedno: strefa bezpieczna. Trzymaj teksty i logotypy minimum 5-8 cm od krawędzi, bo pas zgrzewu z oczkami „zjada” 2-3 cm obwodu, a oczko wycina otwór w grafice. Spad w banerach jest mniejszy niż w druku arkuszowym — zwykle wystarczy 2-5 mm lub projekt dokładnie na wymiar (tolerancja cięcia wielkiego formatu to kilka milimetrów, niewidocznych przy tej skali). Sprawdź specyfikację konkretnej drukarni; w DobrePrinty do banera zgrzewanego wystarczy plik na format netto.",
    },
    {
      type: "h2",
      id: "montaz-i-trwalosc",
      text: "Montaż i trwałość na zewnątrz",
    },
    {
      type: "p",
      text: "Baner frontlit z atramentami solwentowymi lub UV wytrzymuje na zewnątrz 3-5 lat, zanim kolory zauważalnie wyblakną — w praktyce większość banerów „umiera” wcześniej mechanicznie, przez zły montaż. Zasady: mocuj za wszystkie oczka (nie tylko narożne — cały sens rozstawu co 50 cm to równomierne rozłożenie naprężeń), używaj opasek zaciskowych lub elastycznych gum montażowych zamiast sztywnego drutu (guma amortyzuje szarpnięcia wiatru), napnij baner równomiernie, ale bez przeciągania (fale = zbyt luźno, zniekształcone oczka = zbyt mocno). Baner na zimę warto zdjąć albo przynajmniej sprawdzić mocowania — mokry śnieg i grudniowe wichury to główni zabójcy banerów.",
    },
    {
      type: "h2",
      id: "najczestsze-bledy",
      text: "Najczęstsze błędy w projektach banerów",
    },
    {
      type: "list",
      items: [
        "Za dużo treści — 3 hasła, 5 zalet, 2 numery telefonu i mapka dojazdu; z 15 m czytelne jest nic",
        "Litery za małe względem odległości odbioru — hasło 10 cm na banerze czytanym z 20 m",
        "Projekt w RGB — kolory po konwersji do CMYK bledną w nieprzewidzianych miejscach",
        "Zdjęcie o niskiej efektywnej rozdzielczości powiększone 10x — pikseloza widoczna nawet z daleka",
        "Tekst i logo przy samej krawędzi — przecięte zgrzewem albo przedziurawione oczkiem",
        "Pełny baner PVC na ażurowym ogrodzeniu w wietrznym miejscu zamiast siatki mesh",
        "Fonty niezamienione na krzywe — na komputerze drukarni tekst składa się innym krojem",
        "Plik w skali 1:10 bez informacji dla drukarni — baner wydrukowany 10x za mały to nie legenda, to reklamacja, którą naprawdę widzieliśmy",
      ],
    },
    {
      type: "p",
      text: "Finalny plik zapisz jako PDF z fontami zamienionymi na krzywe lub osadzonymi, spłaszczonymi przezroczystościami i obrazami w docelowej rozdzielczości. Pełną procedurę eksportu opisaliśmy w poradniku [jak przygotować PDF do druku](/blog/jak-przygotowac-pdf-do-druku) — dla banera dodatkowo dopisz w nazwie pliku skalę, np. „baner_500x200_skala1-10.pdf”.",
    },
    {
      type: "faq",
      items: [
        {
          q: "W jakiej rozdzielczości przygotować baner 3 x 1 m?",
          a: "Zależy od odległości odbioru. Baner oglądany z 3-5 m (witryna, stoisko): 100-120 DPI w skali 1:1. Baner przy drodze oglądany z 10-20 m: wystarczy 50-70 DPI. Nie przygotowuj banera w 300 DPI — plik będzie ogromny, a różnicy nikt nie zobaczy.",
        },
        {
          q: "Czy do banera potrzebne są spady jak przy ulotkach?",
          a: "Zwykle nie w klasycznym rozumieniu 3 mm spadu i linii cięcia. Przy banerze zgrzewanym z oczkami większość drukarń prosi o plik na wymiar netto lub z 2-5 mm zapasu. Ważniejsza jest strefa bezpieczna: teksty i logo minimum 5-8 cm od krawędzi, żeby nie weszły w zgrzew ani pod oczka.",
        },
        {
          q: "Frontlit czy siatka mesh — co wybrać na ogrodzenie budowy?",
          a: "Na ażurowe ogrodzenie w miejscu wystawionym na wiatr — mesh (270-340 g/m²). Perforacja przepuszcza część wiatru, więc baner nie działa jak żagiel i nie wyrywa oczek ani nie przewraca przęseł. Frontlit 440-510 g/m² wybierz na pełne ściany, rusztowania z siatką osłonową od tyłu i miejsca osłonięte.",
        },
        {
          q: "Jak długo baner wytrzyma na zewnątrz?",
          a: "Druk solwentowy i UV na frontlicie zachowuje kolory 3-5 lat. W praktyce żywotność ogranicza mechanika: wiatr, mocowanie za same narożniki, ostre krawędzie konstrukcji. Dobrze zamontowany baner (wszystkie oczka co 50 cm, elastyczne mocowania, równomierny naciąg) spokojnie służy 2-3 sezony bez utraty wyglądu.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Gotowy projekt banera? My zajmiemy się resztą",
      body: "Wgraj plik do DobrePrinty — sprawdzimy rozdzielczość, skalę i strefy bezpieczne pod oczka przed drukiem. Frontlit 510 g, blockout i mesh, zgrzew z oczkami co 50 cm w standardzie, wysyłka w 48 h.",
      href: "/produkty/baner-reklamowy",
      label: "Zamów baner w DobrePrinty →",
    },
  ],
};
