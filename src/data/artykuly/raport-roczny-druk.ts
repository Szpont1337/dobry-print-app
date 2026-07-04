import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "raport-roczny-druk",
  title: "Druk raportu rocznego — format, papier, oprawa",
  excerpt:
    "Jak wydrukować raport roczny, który buduje wiarygodność: format, papier, oprawa klejona, typografia danych finansowych i terminy produkcji.",
  category: "biznes",
  tags: ["raport roczny", "spółki", "broszury klejone", "B2B"],
  publishedAt: "2026-06-21",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["broszury-klejone", "broszury-szyte-nicia"],
  sections: [
    {
      type: "p",
      text: "Raport roczny to najbardziej reprezentacyjny dokument, jaki spółka publikuje w ciągu roku. Trafia do rąk akcjonariuszy na walnym zgromadzeniu, na biurka inwestorów instytucjonalnych, do banków i partnerów strategicznych. Wersja PDF jest obowiązkowa, ale to egzemplarz drukowany — z dobrze dobranym papierem, oprawą i typografią liczb — buduje wrażenie solidności, którego ekran nie odda. W tym poradniku przechodzimy przez wszystkie decyzje produkcyjne: od formatu i objętości, przez oprawę klejoną i szycie nicią, po harmonogram druku zsynchronizowany z terminem walnego.",
    },
    {
      type: "h2",
      id: "po-co-drukowac-raport",
      text: "Po co drukować raport roczny w erze PDF-ów",
    },
    {
      type: "p",
      text: "Drukowany raport pełni trzy funkcje, których wersja elektroniczna nie zastąpi. Po pierwsze — walne zgromadzenie: akcjonariusze oczekują egzemplarza do ręki, do którego mogą wracać podczas obrad, robić notatki na marginesach i porównywać tabele bez przełączania okien. Po drugie — relacje inwestorskie: raport wręczany podczas spotkań one-on-one z funduszami czy analitykami działa jak wizytówka całej organizacji. Po trzecie — archiwum i prestiż: komplet raportów z kolejnych lat na półce w siedzibie spółki to fizyczny dowód ciągłości i stabilności.",
    },
    {
      type: "p",
      text: "Badania czytelności konsekwentnie pokazują, że dokumenty wielostronicowe z gęstymi danymi liczbowymi czyta się na papierze uważniej niż na ekranie — czytelnik łatwiej nawiguje między notą objaśniającą a bilansem, gdy może fizycznie trzymać zakładkę w dwóch miejscach. Dlatego standardem rynkowym jest model hybrydowy: pełny nakład online (PDF dostępny na stronie relacji inwestorskich) plus niewielki, dopracowany nakład drukowany na walne i spotkania z inwestorami.",
    },
    {
      type: "h2",
      id: "format-i-objetosc",
      text: "Format i objętość — A4 jako bezpieczny standard",
    },
    {
      type: "p",
      text: "Zdecydowana większość raportów rocznych powstaje w formacie A4 (210 × 297 mm) w orientacji pionowej. To nie przypadek: A4 mieści szerokie tabele finansowe bez zmniejszania stopnia pisma poniżej granicy czytelności, pasuje do segregatorów i teczek konferencyjnych, a koszt druku jest optymalny, bo arkusze drukarskie są pod ten format skrojone. Spółki, które chcą się wyróżnić, sięgają po format zbliżony do kwadratu (np. 210 × 210 mm) albo zwężony (200 × 280 mm) — wygląda to efektownie, ale utrudnia skład szerokich tabel i podnosi koszt przez większy odpad papieru.",
    },
    {
      type: "p",
      text: "Objętość typowego raportu rocznego to 48–160 stron: list prezesa, opis działalności, sprawozdanie zarządu, sprawozdanie finansowe z notami, opinia biegłego rewidenta, ład korporacyjny. Kluczowa zasada techniczna: liczba stron musi być podzielna przez 4, bo raport powstaje ze składek (arkuszy złożonych na pół). Jeśli treść kończy się na stronie 93, musicie dołożyć wakaty lub strony działowe do 96. Zaplanujcie to na etapie projektu — puste strony na końcu wyglądają przypadkowo, a celowe strony działowe z grafiką porządkują strukturę.",
    },
    {
      type: "h2",
      id: "oprawa",
      text: "Oprawa: klejona jako standard, szyta nicią dla wersji premium",
    },
    {
      type: "p",
      text: "Dla raportów od około 48 stron wzwyż standardem jest [oprawa klejona](/produkty/broszury-klejone) (PUR lub hotmelt): blok stron sklejony w grzbiecie i oklejony okładką. Daje płaski, elegancki grzbiet, na którym można nadrukować tytuł i rok — komplet raportów na półce wygląda wtedy jak seria wydawnicza. Klej PUR jest zdecydowanie trwalszy od klasycznego hotmeltu i lepiej znosi papiery powlekane, dlatego przy raportach na kredzie zawsze rekomendujemy PUR.",
    },
    {
      type: "p",
      text: "Wersją premium jest [oprawa szyta nicią](/produkty/broszury-szyte-nicia): składki są najpierw przeszywane, a dopiero potem klejone i oklejane okładką. Raport otwiera się bardziej płasko (istotne przy rozkładówkach z wykresami), a blok nie ma prawa się rozpaść nawet po latach intensywnego kartkowania. To wybór dla spółek, które traktują raport jako element budowania marki — koszt jest wyższy o kilkanaście–kilkadziesiąt procent, ale przy nakładzie 100–300 egzemplarzy różnica w budżecie jest niewielka. Szczegółowe porównanie technologii znajdziecie w artykule [broszury szyte vs klejone vs szyte nicią](/blog/broszury-szyte-vs-klejone-vs-szyte-nicia).",
    },
    {
      type: "table",
      caption: "Liczba stron raportu a zalecana oprawa i papier",
      headers: [
        "Liczba stron (środek)",
        "Zalecana oprawa",
        "Papier środka",
        "Papier okładki",
      ],
      rows: [
        [
          "16–40",
          "Zeszytowa (2 zszywki) lub klejona",
          "Kreda mat 115–130 g/m²",
          "Kreda mat 250–300 g/m²",
        ],
        [
          "48–96",
          "Klejona PUR (standard raportowy)",
          "Kreda mat 100–130 g/m² lub offset 100–120 g/m²",
          "Kreda mat 300–350 g/m² + folia mat/soft-touch",
        ],
        [
          "100–160",
          "Klejona PUR lub szyta nicią",
          "Kreda mat 100–115 g/m² (niższa gramatura = smuklejszy grzbiet)",
          "Kreda mat 300–350 g/m² + folia soft-touch",
        ],
        [
          "160+",
          "Szyta nicią (klejona przy dużej objętości bywa sztywna)",
          "Offset 90–100 g/m² lub kreda mat 100 g/m²",
          "Kreda 350 g/m² + folia, opcjonalnie skrzydełka",
        ],
      ],
    },
    {
      type: "callout",
      variant: "warn",
      text: "Oprawa klejona wymaga minimalnej grubości grzbietu — zwykle około 3 mm, co przy kredzie 115 g/m² oznacza mniej więcej 40–48 stron środka. Cieńszy raport klejony będzie miał zbyt wąski grzbiet: klej nie utrzyma bloku, a napis na grzbiecie się nie zmieści. Przy objętości poniżej 40 stron wybierzcie oprawę zeszytową albo zwiększcie liczbę stron o sekcje działowe.",
    },
    {
      type: "h2",
      id: "papier",
      text: "Papier: środek, okładka i uszlachetnienia",
    },
    {
      type: "p",
      text: "Na środek raportu sprawdzają się dwa kierunki. Kreda matowa 100–130 g/m² to wybór bezpieczny: świetnie oddaje wykresy i zdjęcia, nie odbija światła (ważne przy czytaniu gęstych tabel), a przy 115 g/m² nie prześwituje druk z drugiej strony. Papier offsetowy (niepowlekany) 100–120 g/m² daje z kolei szlachetny, „wydawniczy” charakter i przyjemniejszy chwyt — coraz częściej wybierany przez spółki komunikujące zrównoważony rozwój, zwłaszcza w wariantach z recyklingu z certyfikatem FSC. Pamiętajcie tylko, że offset mocniej wchłania farbę: zdjęcia będą mniej kontrastowe, a duże aple wymagają korekty nafarbienia.",
    },
    {
      type: "p",
      text: "Okładka to kreda 300–350 g/m² — sztywna na tyle, by raport nie „klapał” w rękach, ale nadal zginalna w grzbiecie bez pękania (przy ciemnych aplach na bigu zamówcie bigowanie, nie samo złamanie). Standardowe uszlachetnienie to folia matowa; wersją premium jest folia soft-touch, która daje aksamitny chwyt kojarzony z segmentem luksusowym. Na folii soft-touch świetnie wygląda lakier UV wybiórczy na logo lub roku — kontrast matowej powierzchni i błyszczącego detalu to klasyka raportów rocznych. Uwaga praktyczna: folia soft-touch łapie tłuste odciski palców na jasnych kolorach, więc najlepiej pracuje na okładkach ciemnych lub mocno nasyconych.",
    },
    {
      type: "h2",
      id: "typografia-danych",
      text: "Typografia danych finansowych — tam, gdzie raport wygrywa lub przegrywa",
    },
    {
      type: "p",
      text: "Serce raportu to sprawozdanie finansowe, a jego czytelność zależy od detali typograficznych. Najważniejszy z nich: cyfry tabelaryczne (tabular lining figures) — wariant cyfr o jednakowej szerokości, dzięki któremu kolumny liczb równają się idealnie w pionie, a tysiące i miliony można porównywać wzrokiem bez wodzenia palcem. Większość profesjonalnych fontów udostępnia je jako funkcję OpenType (tnum). Jeśli wasz font ma tylko cyfry proporcjonalne, zmieńcie font — o doborze krojów piszemy szerzej w poradniku [wybór czcionek do druku](/blog/wybor-czcionek-do-druku).",
    },
    {
      type: "list",
      items: [
        "Wyrównujcie liczby w tabelach do prawej, do separatora dziesiętnego — nigdy do lewej ani do środka",
        "Wartości ujemne zapisujcie konsekwentnie: minus lub nawias, ale jedno na cały raport; unikajcie samego koloru czerwonego jako jedynego wyróżnika (druk jednobarwny i czytelnicy z zaburzeniami widzenia barw)",
        "Stopień pisma w tabelach: minimum 7,5–8 pt dla treści i 6,5 pt dla przypisów — poniżej tej granicy audytorzy i akcjonariusze sięgają po lupę",
        "Linie tabel w K100, nie w rich blacku ani w składowych CMYK — cienkie linie z czterech kolorów rozmywają się przy najmniejszym błędzie pasowania",
        "Wykresy przygotowujcie w CMYK już na etapie projektu: wykres wklejony z Excela jest w RGB i po konwersji potrafi zmienić kolory serii danych, przez co legenda przestaje się zgadzać z wykresem",
        "Zaplanujcie palety wykresów rozróżnialne także w skali szarości — raport bywa kserowany i skanowany",
      ],
    },
    {
      type: "h2",
      id: "korekta-i-sign-off",
      text: "Korekta i sign-off — zanim cokolwiek trafi na maszynę",
    },
    {
      type: "p",
      text: "Raport roczny to dokument, w którym literówka w liście prezesa jest wstydliwa, ale błędna liczba w bilansie to problem prawny. Dlatego proces akceptacji musi być formalny: korekta językowa całości, niezależne sprawdzenie zgodności liczb ze sprawozdaniem zbadanym przez biegłego rewidenta (co do złotówki, łącznie z sumami kontrolnymi tabel), a na końcu pisemny sign-off zarządu lub działu relacji inwestorskich na finalnym PDF-ie. Od momentu sign-offu plik jest zamrożony — każda zmiana wymaga nowej rundy akceptacji.",
    },
    {
      type: "p",
      text: "Plik produkcyjny przygotujcie zgodnie z zasadami opisanymi w poradniku [jak przygotować PDF do druku](/blog/jak-przygotowac-pdf-do-druku): spady 3 mm, fonty osadzone, kolory w CMYK, czarny tekst w K100. Przed pełnym nakładem zamówcie proof lub egzemplarz próbny — przy oprawie klejonej zweryfikujecie na nim także, czy elementy na rozkładówkach nie wpadają w grzbiet (w oprawie klejonej „ucieka” w niego 3–5 mm z każdej strony).",
    },
    {
      type: "callout",
      variant: "tip",
      text: "Rozkładówki z wykresami projektujcie tak, by żadna oś, liczba ani legenda nie leżała bliżej niż 10 mm od grzbietu. W oprawie klejonej rozkładówka nigdy nie otwiera się w pełni płasko — dane schowane w grzbiecie to jeden z najczęstszych błędów w drukowanych raportach rocznych.",
    },
    {
      type: "h2",
      id: "terminy",
      text: "Terminy produkcji vs termin walnego zgromadzenia",
    },
    {
      type: "p",
      text: "Harmonogram liczcie od tyłu, od daty walnego. Sama produkcja broszury klejonej w druku cyfrowym to zwykle 4–6 dni roboczych, offsetowej 7–10 dni roboczych; oprawa szyta nicią dodaje 2–3 dni. Do tego dochodzi wysyłka (1–2 dni) oraz — co najważniejsze — bufor na proof i ewentualną korektę. Bezpieczny harmonogram wygląda tak: finalny, zaakceptowany PDF minimum 3 tygodnie przed walnym, proof i akceptacja w ciągu 2–3 dni, start produkcji 2 tygodnie przed terminem, dostawa na tydzień przed walnym. Ten tygodniowy zapas ratuje sytuację, gdy kurier zawiedzie albo w nakładzie trafi się wada wymagająca dodruku.",
    },
    {
      type: "p",
      text: "Najczęstszy scenariusz awaryjny to zmiana danych po zamknięciu projektu — na przykład korekta w nocie po ostatniej rozmowie z audytorem. Dlatego nie wysyłajcie pliku do drukarni „na styk”: różnica między spokojnym terminem standardowym a drukiem ekspresowym to często 30–50% ceny i realne ryzyko kompromisów jakościowych.",
    },
    {
      type: "h2",
      id: "naklad",
      text: "Nakład: małe serie cyfrowo, dystrybucja online",
    },
    {
      type: "p",
      text: "Czasy nakładów po kilka tysięcy egzemplarzy minęły. Dziś typowa spółka drukuje 100–500 egzemplarzy: na walne, dla zarządu i rady nadzorczej, dla kluczowych inwestorów, banków i do archiwum. Przy takich ilościach druk cyfrowy jest tańszy i szybszy od offsetu, a jakość maszyn produkcyjnych jest w pełni wystarczająca dla tabel, tekstu i wykresów. Offset zaczyna się opłacać zwykle powyżej 500–800 egzemplarzy albo przy specjalnych wymaganiach (kolory Pantone w identyfikacji spółki).",
    },
    {
      type: "p",
      text: "Dobra praktyka: zamówcie 10–15% egzemplarzy więcej, niż wynika z listy dystrybucyjnej. Dodruk 20 sztuk po miesiącu oznacza nowe przygotowanie zlecenia i wyższą cenę jednostkową, a raporty „znikają” w ciągu roku — na spotkania z nowymi inwestorami, do przetargów, dla nowych członków rady. Resztę dystrybucji przejmuje wersja online: dostępny publicznie PDF (najlepiej z wersją zgodną ze standardem dostępności) na stronie relacji inwestorskich.",
    },
    {
      type: "faq",
      items: [
        {
          q: "Ile stron minimum musi mieć raport, żeby zastosować oprawę klejoną?",
          a: "Praktyczne minimum to około 40–48 stron środka przy kredzie 115 g/m², co daje grzbiet w okolicach 3 mm. Poniżej tej grubości klej nie utrzyma prawidłowo bloku, a grzbiet będzie zbyt wąski na nadruk tytułu. Cieńsze raporty drukujcie w oprawie zeszytowej (2 zszywki) — pamiętając, że liczba stron zawsze musi być podzielna przez 4.",
        },
        {
          q: "Kreda czy papier offsetowy na środek raportu rocznego?",
          a: "Kreda matowa 100–130 g/m² to standard: najlepiej oddaje wykresy i zdjęcia, nie odbija światła przy czytaniu tabel. Papier offsetowy 100–120 g/m² wybierzcie, gdy zależy wam na „wydawniczym” charakterze i komunikacji ekologicznej (warianty z recyklingu, certyfikat FSC) — ale liczcie się z mniej kontrastowymi zdjęciami, bo papier niepowlekany mocniej wchłania farbę.",
        },
        {
          q: "Kiedy warto dopłacić do oprawy szytej nicią zamiast klejonej?",
          a: "Gdy raport ma ponad 150–160 stron, gdy zawiera rozkładówki z wykresami, które muszą otwierać się płasko, albo gdy egzemplarz będzie intensywnie używany przez lata (archiwum, biblioteki analityków). Szycie nicią to także sygnał premium — przy nakładzie 100–300 egzemplarzy dopłata w skali całego budżetu raportu jest niewielka.",
        },
        {
          q: "Ile czasu przed walnym zgromadzeniem trzeba oddać plik do druku?",
          a: "Bezpiecznie: finalny, zaakceptowany PDF minimum 3 tygodnie przed walnym. To daje 2–3 dni na proof i akceptację, 4–10 dni roboczych na produkcję (zależnie od technologii i oprawy), 1–2 dni na wysyłkę oraz tygodniowy bufor na nieprzewidziane sytuacje. Druk ekspresowy jest możliwy, ale kosztuje 30–50% więcej i odbiera margines na korekty.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Drukujesz raport roczny?",
      body: "Zamów broszurę klejoną w DobrePrinty — dobierzemy gramatury, sprawdzimy plik w preflighcie i zaplanujemy produkcję pod termin walnego zgromadzenia. Przy pierwszym zleceniu przygotujemy bezpłatny egzemplarz próbny do akceptacji.",
      href: "/produkty/broszury-klejone",
      label: "Zamów druk raportu w DobrePrinty →",
    },
  ],
};
