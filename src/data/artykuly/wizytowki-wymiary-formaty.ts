import type { Article } from "@/lib/blog-types";

export const article: Article = {
  slug: "wizytowki-wymiary-formaty",
  title: "Wizytówki — wymiary, formaty, co wybrać w 2026",
  excerpt:
    "Wymiary wizytówek: format klasyczny 85×55, europejski 90×50, kwadratowy 55×55, mini 70×40. Wybór formatu, papieru, druku 4/0 vs 4/4. Aktualny przewodnik na rok 2026.",
  category: "produkty",
  tags: ["wizytówki", "formaty", "wymiary", "design"],
  publishedAt: "2026-01-29",
  author: "Zespół DobrePrinty",
  status: "opublikowany",
  schemaType: "Article",
  relatedProducts: ["wizytowki", "ulotki", "papier-firmowy"],
  sections: [
    {
      type: "p",
      text: "Wybór formatu wizytówki to decyzja, która wpływa na to, czy klient nosi Twoją wizytówkę w portfelu, czy wyrzuca ją po pierwszej okazji. Klasyczny 85×55 mm to standard polskiego rynku, europejski 90×50 mm zyskuje na popularności, kwadratowy 55×55 mm wybierają agencje kreatywne, a mini 70×40 mm to nisza dla nietypowych branż. W tym poradniku porównujemy wszystkie formaty wizytówek dostępne w 2026 i pokazujemy, który wybrać dla Twojej branży.",
    },
    {
      type: "h2",
      id: "format-klasyczny",
      text: "Format klasyczny 85×55 mm — standard polskiego rynku",
    },
    {
      type: "p",
      text: "85×55 mm to historyczny standard polskiej [wizytówki](/produkty/wizytowki), używany od lat 90. Mieści się w szczelinkach większości portfeli (gdzie pomieszczone są karty kredytowe — które mają format 85,6×53,98 mm). Pasuje do większości wizytowników, organizerów i bind do wizytówek. Dla 90% projektów B2B w Polsce to bezpieczny i sprawdzony wybór.",
    },
    {
      type: "p",
      text: "Wady: format „niczym się nie wyróżnia”. Jeśli Twoja branża wymaga zwracania uwagi (np. agencje kreatywne, artyści, projektanci wnętrz), klasyk może wyglądać sztampowo. Wtedy alternatywą jest format kwadratowy lub mini.",
    },
    {
      type: "h2",
      id: "format-europejski",
      text: "Format europejski 90×50 mm — międzynarodowy standard",
    },
    {
      type: "p",
      text: "90×50 mm to standard używany w Wielkiej Brytanii, Niemczech, Skandynawii i większości krajów anglojęzycznych. Polskie firmy obsługujące klientów zagranicznych coraz częściej wybierają ten format, żeby ich wizytówka pasowała do międzynarodowych wizytowników. Też mieści się w portfelach, ale jest minimalnie szerszy i niższy od polskiego klasyka.",
    },
    {
      type: "p",
      text: "Dla startupów, scaleupów i firm IT pracujących w międzynarodowych zespołach 90×50 mm jest oczywistym wyborem. Polski freelancer z klientami z USA czy Niemiec też powinien rozważyć ten format. Cena identyczna jak 85×55, papier i wykończenia bez zmian.",
    },
    {
      type: "table",
      caption: "Porównanie formatów wizytówek dostępnych w 2026",
      headers: ["Format", "Wymiary", "Zastosowanie", "Mieści się w portfelu?"],
      rows: [
        [
          "Klasyczny",
          "85 × 55 mm",
          "Standard polski, B2B uniwersalne",
          "Tak (wszystkie portfele)",
        ],
        [
          "Europejski",
          "90 × 50 mm",
          "Międzynarodowe, klienci z UK/DE/US",
          "Tak (większość portfeli)",
        ],
        [
          "Kwadrat",
          "55 × 55 mm",
          "Agencje, design, branża kreatywna",
          "Tak (wszystkie portfele)",
        ],
        [
          "Mini",
          "70 × 40 mm",
          "Hipsterskie marki, kawiarnie specialty",
          "Tak, dyskretnie",
        ],
        [
          "Pionowy",
          "55 × 85 mm",
          "Branża prawnicza, finansowa",
          "Tak (większość portfeli)",
        ],
        [
          "Slim",
          "100 × 35 mm",
          "Nietypowe, design-forward",
          "Częściowo (długie, mogą wystawać)",
        ],
      ],
    },
    {
      type: "h2",
      id: "papier-i-gramatura",
      text: "Papier i gramatura — od czego zależy „odczucie w dłoni”",
    },
    {
      type: "h3",
      id: "karton-350g",
      text: "Karton 350g — standard premium",
    },
    {
      type: "p",
      text: "350g kreda mat to standard premium dla wizytówek B2B. Sztywne, ale jeszcze mieści się w szczelinkach portfela. Większość drukarni polskich wybiera 350g jako default — bo daje optymalny kompromis: dobre odczucie w dłoni, ale bez ryzyka, że klient nie weźmie wizytówki, „bo się nie zmieści”.",
    },
    {
      type: "h3",
      id: "karton-400g",
      text: "Karton 400g — premium dla branży kreatywnej",
    },
    {
      type: "p",
      text: "400g to wybór dla agencji kreatywnych, marek luksusowych, hoteli premium, kancelarii prawnych z najwyższej półki. Wizytówka jest wyraźnie cięższa w dłoni, ma „kartonowe” wrażenie. Wadą: niektóre portfele odmawiają przyjęcia (zwłaszcza minimalistyczne, slim wallety). Cena: ok. 30% wyższa od 350g.",
    },
    {
      type: "h3",
      id: "specjalne-papiery",
      text: "Papiery specjalne — kraft, recycled, fakturowane",
    },
    {
      type: "p",
      text: "Kraft (brązowy karton ekologiczny, 300-350g) to wybór dla kawiarni specialty, marek vegan, startupów eko. Recycled (papier z recyklingu, beżowy) dla marek B Corp i zielonego biznesu. Papiery fakturowane (młotkowane, prążkowane) dla branży artystycznej i designerskiej. Każdy z nich zmienia percepcję marki — wybór nie tylko estetyczny, ale strategiczny.",
    },
    {
      type: "h2",
      id: "druk-4-0-vs-4-4",
      text: "Druk 4/0 vs 4/4 — czy potrzebujesz dwustronnej wizytówki?",
    },
    {
      type: "p",
      text: "4/0 = druk jednostronny w pełnym kolorze. 4/4 = dwustronny. Standardem dla wizytówek B2B jest 4/4 — przód z danymi kontaktowymi (imię, nazwisko, telefon, e-mail, stanowisko), tył z logo lub claimem firmy. Tył wykorzystany jako pole brandingowe robi wrażenie i wzmacnia rozpoznawalność.",
    },
    {
      type: "p",
      text: "4/0 sprawdza się tylko w specyficznych branżach: wizytówki z fotografią (agenci nieruchomości, adwokaci), gdzie tył nie jest potrzebny, lub w mikrobudżetach. Cena: 4/4 jest o ok. 30-40% droższe od 4/0. Dla 100 sztuk różnica to ok. 8 zł — nieistotnie, więc zawsze wybieraj 4/4.",
    },
    {
      type: "h2",
      id: "wykonczenia-wizytowek",
      text: "Wykończenia — folia, lakier UV, tłoczenie folią złotą",
    },
    {
      type: "h3",
      id: "folia-matowa",
      text: "Folia matowa — premium i odporna na zarysowania",
    },
    {
      type: "p",
      text: "Folia matowa na wizytówce daje premium look, chroni przed zarysowaniami w portfelu i sprawia, że palce nie zostawiają śladów. To najpopularniejsze [wykończenie premium](/blog/wykonczenia-folia-uv-tloczenie) — wybiera je większość firm konsultingowych, kancelarii prawnych, hoteli. Cena: +35% za 100 sztuk.",
    },
    {
      type: "h3",
      id: "lakier-uv-punktowy",
      text: "Lakier UV punktowy — selektywny błysk",
    },
    {
      type: "p",
      text: "Lakier UV punktowy to selektywne nakładanie błyszczącego lakieru na wybrane elementy (logo, claim, monogram). Kontrastuje z matową powierzchnią pod spodem, daje efekt 3D. Najczęściej używany razem z folią matową — folia matuje całość, UV podkreśla wybrane miejsca. Wymaga osobnego pliku z maską lakieru. Cena: +50% za 100 sztuk.",
    },
    {
      type: "h3",
      id: "tloczenie-folia-zlota",
      text: "Tłoczenie folią złotą lub srebrną",
    },
    {
      type: "p",
      text: "Tłoczenie folią złotą lub srebrną to opcja najbardziej luksusowa — używana przez kancelarie prawne z 100-letnią tradycją, hotele 5-gwiazdkowe, marki biżuteryjne. Folia jest fizycznie tłoczona w karton, daje efekt 3D i blasku. Wymaga osobnego pliku z maską tłoczenia. Cena: +120 zł netto za 100 sztuk.",
    },
    {
      type: "h2",
      id: "co-umiescic",
      text: "Co umieścić na wizytówce — typografia i hierarchia informacji",
    },
    {
      type: "p",
      text: "Standard polskiej wizytówki B2B: imię i nazwisko (najwyższa hierarchia, font 11-14 pt), stanowisko (8-9 pt), telefon, e-mail, adres www (8-9 pt). Logo firmy umieszczone tradycyjnie w lewym górnym rogu lub na całej tylnej stronie. Adres siedziby — opcjonalny, dla branż gdzie ma znaczenie (kancelarie, biura nieruchomości).",
    },
    {
      type: "p",
      text: "Czego nie umieszczać: domowy telefon, prywatny e-mail, ksywka, social media (chyba że LinkedIn dla kontaktu B2B), zdjęcie (chyba że branża wymaga — agenci nieruchomości, adwokaci). NIP, REGON, KRS — zbędne na wizytówce, to dane dla [papieru firmowego](/produkty/papier-firmowy). Wizytówka to pierwsze wrażenie, nie dokument księgowy.",
    },
    {
      type: "callout",
      variant: "tip",
      text: "Przy projektowaniu wizytówki testuj czytelność z odległości 30 cm. Jeśli tekst jest trudny do odczytania w normalnej odległości oczu, font jest za mały. Minimum to 7 pt, ale dla danych kontaktowych polecamy 8-9 pt.",
    },
    {
      type: "h2",
      id: "trendy-2026",
      text: "Trendy w wizytówkach na 2026",
    },
    {
      type: "p",
      text: "Trendy w 2026: minimalizm (mniej tekstu, więcej powietrza), kolory pastelowe i ziemiste (zamiast standardowego białego), faktury i papiery specjalne (kraft, recycled), QR kody na tylnej stronie (link do portfolio lub LinkedIn), wizytówki cyfrowo-fizyczne (NFC chip w karcie, link otwiera się po dotknięciu telefonem). Branża IT i startupy najwięcej eksperymentują z formatami nietypowymi.",
    },
    {
      type: "p",
      text: "Klasyczny 85×55 mm na 350g kreda mat z folią matową i drukiem 4/4 to nadal najbezpieczniejszy wybór dla 80% branż. Trendy są wartościowe, ale wizytówka to przede wszystkim narzędzie do wymiany kontaktów — nie sztuka.",
    },
    {
      type: "faq",
      items: [
        {
          q: "Jaki format wizytówki wybrać do branży prawniczej?",
          a: "Klasyczny 85×55 mm na 350g lub 400g kreda mat, z folią matową, tłoczeniem folią złotą na logo lub monogramie kancelarii. Branża prawnicza ceni tradycję i konserwatywne wzornictwo — eksperymentalne formaty (kwadrat, mini) źle pasują do garniturów i konserwatywnych klientów. Dla kancelarii premium polecamy 400g + tłoczenie złotą folią.",
        },
        {
          q: "Czy wizytówka z QR kodem ma sens?",
          a: "Tak, jeśli kod prowadzi do czegoś wartościowego: portfolio na Behance, profilu LinkedIn, formularza kontaktowego z prefilled adresem e-mail. Kod prowadzący do strony głównej firmy jest zbędny — szybciej napisać URL. QR kody działają najlepiej na tylnej stronie wizytówki (zostawia więcej miejsca na front) i powinny być min. 2×2 cm dla pewności odczytu.",
        },
        {
          q: "Ile czasu trwa druk wizytówek?",
          a: "Standardowe wizytówki 350g kreda mat z drukiem 4/4 bez wykończeń produkujemy w 24 h od potwierdzenia pliku. Z folią matową: 48 h. Z lakierem UV: 72 h. Z tłoczeniem folią złotą: 96 h. Kurier dokłada 1 dzień roboczy. Express 12 h dostępny za dopłatą 50%.",
        },
        {
          q: "Ile kosztują wizytówki w 2026?",
          a: "Standardowe wizytówki klasyczne 85×55 mm na 350g kreda mat z drukiem 4/4: 100 sztuk ok. 25 zł brutto, 250 sztuk ok. 38 zł, 500 sztuk 65 zł, 1000 sztuk 115 zł. Wykończenia (folia, UV, tłoczenie) dodają 30-70% do ceny. Premium 400g + folia matowa + UV punktowy: 100 sztuk ok. 95 zł brutto.",
        },
        {
          q: "Czy można zamówić wizytówki w nakładzie 25 sztuk?",
          a: "Tak, minimum to 25 sztuk dla mikronakładów. Cena jednostkowa jest wyższa (25 sztuk ok. 18 zł brutto, czyli 0,72 zł za sztukę), ale dla freelancerów testujących projekt wizytówki to sensowny próg. Po zatwierdzeniu wzoru zamów docelowo 250-500 sztuk z lepszą ceną jednostkową.",
        },
        {
          q: "Czy wizytówki z NFC chipem to dobry pomysł?",
          a: "Dla branży tech, startupów i innowatorów — tak. Klient dotyka wizytówki telefonem, otwiera się Twój profil LinkedIn lub strona kontaktowa. Cena: ok. 25-40 zł za sztukę (vs 0,25 zł za standardową), więc to opcja dla wybranych spotkań — nie do masowej dystrybucji. NFC działa z 95% nowoczesnych smartfonów (iOS 14+, Android 8+).",
        },
        {
          q: "Czy mogę zamówić wizytówki spersonalizowane (różne imiona)?",
          a: "Tak. Personalizacja działa tak: jeden szablon graficzny + tabela Excel z imionami, nazwiskami, telefonami i e-mailami pracowników. Drukarnia generuje wariant dla każdej osoby. Cena: nakład × 1,4 (dopłata 40% za personalizację). Dla zespołu 10 osób × 100 wizytówek każda: ok. 350 zł zamiast 250 zł za 1000 identycznych.",
        },
      ],
    },
    {
      type: "cta",
      heading: "Zaprojektuj swoje wizytówki",
      body: "Wybierz format, papier, druk 4/0 lub 4/4 w konfiguratorze DobrePrinty. Cena brutto z VAT widoczna od razu, produkcja 24 h, dostawa kurierem.",
      href: "/produkty/wizytowki",
      label: "Zamów wizytówki →",
    },
  ],
};
