export type Miasto = {
  nazwa: string;
  slug: string;
  wojewodztwo: string;
  populacja: number;
  opis_krotki: string;
  /**
   * Ręczny override indeksowania w Google. `true` wymusza indeks (np. małe
   * miasto z dużym popytem turystycznym), `false` wyklucza. Brak pola →
   * decyduje próg populacji (patrz `src/lib/miasta-seo.ts`).
   */
  indeksuj?: boolean;
  /** Rozpoznawalne dzielnice/okolice — wplatane w treść dla unikalności. */
  dzielnice?: string[];
  /** Charakterystyczne miejsca, obiekty, wydarzenia. */
  landmarki?: string[];
  /** Dominujące lokalne branże i więksi pracodawcy. */
  branze?: string[];
  /** Uczelnie i ważniejsze instytucje (źródło zamówień B2B/edu). */
  uczelnie?: string[];
};

export const miasta: Miasto[] = [
  {
    nazwa: "Warszawa",
    slug: "warszawa",
    wojewodztwo: "mazowieckie",
    populacja: 1861000,
    opis_krotki:
      "Stolica Polski i największe centrum biznesowe kraju, siedziba central banków i   korporacji.",
  },
  {
    nazwa: "Kraków",
    slug: "krakow",
    wojewodztwo: "małopolskie",
    populacja: 804000,
    opis_krotki:
      "Drugie co do wielkości miasto Polski, ważny ośrodek akademicki, turystyczny i IT.",
  },
  {
    nazwa: "Wrocław",
    slug: "wroclaw",
    wojewodztwo: "dolnośląskie",
    populacja: 674000,
    opis_krotki:
      "Stolica Dolnego Śląska, dynamiczne centrum biznesu, technologii i kultury.",
    dzielnice: ["Stare Miasto", "Krzyki", "Psie Pole", "Fabryczna", "Śródmieście"],
    landmarki: [
      "Rynek z Ratuszem",
      "Hala Stulecia",
      "Sky Tower",
      "Stadion Wrocław",
      "Ostrów Tumski",
    ],
    branze: [
      "software house'y i sektor IT",
      "centra usług wspólnych (BPO/SSC)",
      "produkcja AGD i motoryzacja",
      "logistyka",
    ],
    uczelnie: [
      "Uniwersytet Wrocławski",
      "Politechnika Wrocławska",
      "Uniwersytet Ekonomiczny",
    ],
  },
  {
    nazwa: "Łódź",
    slug: "lodz",
    wojewodztwo: "łódzkie",
    populacja: 664000,
    opis_krotki:
      "Dawna stolica włókiennictwa, dziś centrum logistyczne i filmowe Polski centralnej.",
    dzielnice: ["Bałuty", "Górna", "Polesie", "Śródmieście", "Widzew"],
    landmarki: [
      "ulica Piotrkowska",
      "Manufaktura",
      "EC1",
      "Off Piotrkowska",
    ],
    branze: [
      "przemysł filmowy i kreatywny",
      "logistyka i e-commerce",
      "AGD (BSH)",
      "centra usług wspólnych",
    ],
    uczelnie: [
      "Uniwersytet Łódzki",
      "Politechnika Łódzka",
      "Szkoła Filmowa",
    ],
  },
  {
    nazwa: "Poznań",
    slug: "poznan",
    wojewodztwo: "wielkopolskie",
    populacja: 533000,
    opis_krotki:
      "Stolica Wielkopolski, ośrodek targowy i przemysłowy z silnym sektorem MŚP.",
    dzielnice: ["Stare Miasto", "Grunwald", "Jeżyce", "Wilda", "Nowe Miasto"],
    landmarki: [
      "Stary Rynek",
      "Międzynarodowe Targi Poznańskie",
      "Ostrów Tumski",
      "Stadion Poznań",
    ],
    branze: [
      "targi, kongresy i eventy",
      "motoryzacja (Volkswagen)",
      "logistyka",
      "sektor MŚP i IT",
    ],
    uczelnie: [
      "Uniwersytet im. Adama Mickiewicza",
      "Politechnika Poznańska",
      "Uniwersytet Ekonomiczny",
    ],
  },
  {
    nazwa: "Gdańsk",
    slug: "gdansk",
    wojewodztwo: "pomorskie",
    populacja: 487000,
    opis_krotki:
      "Główny port morski Polski, część Trójmiasta i centrum branży morskiej oraz IT.",
    dzielnice: ["Śródmieście", "Wrzeszcz", "Oliwa", "Przymorze", "Zaspa"],
    landmarki: [
      "Długi Targ i Żuraw",
      "Europejskie Centrum Solidarności",
      "Polsat Plus Arena",
      "Stocznia Gdańska",
    ],
    branze: [
      "gospodarka morska i port",
      "sektor IT",
      "petrochemia (Grupa Lotos/Orlen)",
      "turystyka i eventy",
    ],
    uczelnie: ["Uniwersytet Gdański", "Politechnika Gdańska"],
  },
  {
    nazwa: "Szczecin",
    slug: "szczecin",
    wojewodztwo: "zachodniopomorskie",
    populacja: 395000,
    opis_krotki:
      "Największe miasto Pomorza Zachodniego, port nad Odrą i transgraniczny ośrodek biznesu.",
    dzielnice: ["Śródmieście", "Prawobrzeże", "Pogodno", "Niebuszewo"],
    landmarki: [
      "Wały Chrobrego",
      "Zamek Książąt Pomorskich",
      "Filharmonia im. Mieczysława Karłowicza",
    ],
    branze: [
      "gospodarka morska i port",
      "logistyka transgraniczna",
      "sektor IT",
      "przemysł stoczniowy",
    ],
    uczelnie: [
      "Uniwersytet Szczeciński",
      "Zachodniopomorski Uniwersytet Technologiczny",
    ],
  },
  {
    nazwa: "Bydgoszcz",
    slug: "bydgoszcz",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 338000,
    opis_krotki:
      "Ośmiokątne miasto nad Brdą, centrum logistyczne i wojskowe regionu.",
    landmarki: [
      "Wyspa Młyńska",
      "Stary Rynek",
      "Opera Nova",
      "Spichrze nad Brdą",
    ],
    branze: [
      "logistyka i transport",
      "przemysł elektroniczny i zbrojeniowy",
      "centra usług wspólnych",
    ],
    uczelnie: [
      "Uniwersytet Kazimierza Wielkiego",
      "Politechnika Bydgoska",
    ],
  },
  {
    nazwa: "Lublin",
    slug: "lublin",
    wojewodztwo: "lubelskie",
    populacja: 331000,
    opis_krotki:
      "Stolica Lubelszczyzny, największy ośrodek akademicki wschodniej Polski.",
  },
  {
    nazwa: "Białystok",
    slug: "bialystok",
    wojewodztwo: "podlaskie",
    populacja: 294000,
    opis_krotki:
      "Stolica Podlasia, ośrodek biznesu na wschodniej granicy Polski.",
  },
  {
    nazwa: "Katowice",
    slug: "katowice",
    wojewodztwo: "śląskie",
    populacja: 285000,
    opis_krotki:
      "Serce Górnośląsko-Zagłębiowskiej Metropolii, centrum biznesowe i kongresowe Śląska.",
    dzielnice: ["Śródmieście", "Ligota", "Nikiszowiec", "Załęże"],
    landmarki: [
      "Spodek",
      "Międzynarodowe Centrum Kongresowe",
      "siedziba NOSPR",
      "Strefa Kultury",
    ],
    branze: [
      "kongresy i eventy",
      "sektor IT",
      "górnictwo i energetyka",
      "centra usług wspólnych",
    ],
    uczelnie: ["Uniwersytet Śląski", "Uniwersytet Ekonomiczny"],
  },
  {
    nazwa: "Gdynia",
    slug: "gdynia",
    wojewodztwo: "pomorskie",
    populacja: 243000,
    opis_krotki:
      "Modernistyczne miasto Trójmiasta, port pasażerski i centrum branży morskiej.",
    dzielnice: ["Śródmieście", "Orłowo", "Redłowo", "Witomino"],
    landmarki: [
      "Skwer Kościuszki",
      "Dar Pomorza",
      "molo i Bulwar Nadmorski",
      "Gdynia Arena",
    ],
    branze: [
      "gospodarka morska i port pasażerski",
      "sektor IT",
      "eventy (Open'er Festival)",
    ],
  },
  {
    nazwa: "Częstochowa",
    slug: "czestochowa",
    wojewodztwo: "śląskie",
    populacja: 210000,
    opis_krotki:
      "Miasto Jasnej Góry, ośrodek przemysłowy i pielgrzymkowy północnego Śląska.",
    landmarki: ["Jasna Góra", "aleja Najświętszej Maryi Panny"],
    branze: [
      "turystyka pielgrzymkowa",
      "przemysł metalurgiczny i hutniczy",
      "produkcja tworzyw",
    ],
  },
  {
    nazwa: "Radom",
    slug: "radom",
    wojewodztwo: "mazowieckie",
    populacja: 199000,
    opis_krotki:
      "Największe miasto południowego Mazowsza, ośrodek przemysłu zbrojeniowego.",
    landmarki: [
      "Stare Miasto",
      "Resursa Obywatelska",
      "Lotnisko Radom-Sadków",
    ],
    branze: [
      "przemysł zbrojeniowy (Fabryka Broni Łucznik)",
      "przemysł skórzany i obuwniczy",
      "logistyka",
    ],
  },
  {
    nazwa: "Rzeszów",
    slug: "rzeszow",
    wojewodztwo: "podkarpackie",
    populacja: 198000,
    opis_krotki:
      "Stolica Podkarpacia, centrum Doliny Lotniczej i sektora IT południowo-wschodniej Polski.",
    landmarki: [
      "Rynek z Ratuszem",
      "Wieża zamkowa",
      "Podziemna Trasa Turystyczna",
    ],
    branze: [
      "Dolina Lotnicza (przemysł lotniczy)",
      "sektor IT",
      "produkcja przemysłowa",
    ],
    uczelnie: ["Uniwersytet Rzeszowski", "Politechnika Rzeszowska"],
  },
  {
    nazwa: "Toruń",
    slug: "torun",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 196000,
    opis_krotki:
      "Gotyckie miasto Kopernika, ośrodek akademicki i turystyczny nad Wisłą.",
    landmarki: [
      "Starówka wpisana na listę UNESCO",
      "Dom Mikołaja Kopernika",
      "Krzywa Wieża",
    ],
    branze: [
      "turystyka",
      "przemysł spożywczy (pierniki, cukiernictwo)",
      "sektor IT",
    ],
    uczelnie: ["Uniwersytet Mikołaja Kopernika"],
  },
  {
    nazwa: "Sosnowiec",
    slug: "sosnowiec",
    wojewodztwo: "śląskie",
    populacja: 190000,
    opis_krotki:
      "Największe miasto Zagłębia Dąbrowskiego, część metropolii śląskiej.",
    landmarki: ["Pałac Schoena (muzeum)", "Park Sielecki", "Katedra Wniebowzięcia NMP"],
    branze: ["handel i usługi", "przemysł motoryzacyjny i metalowy", "logistyka"],
  },
  {
    nazwa: "Kielce",
    slug: "kielce",
    wojewodztwo: "świętokrzyskie",
    populacja: 189000,
    opis_krotki:
      "Stolica Świętokrzyskiego, miasto Targów Kielce i centrum przemysłowe regionu.",
    landmarki: [
      "Targi Kielce",
      "Pałac Biskupów Krakowskich",
      "Rynek",
    ],
    branze: [
      "targi i wystawy",
      "przemysł metalowy i budowlany",
      "logistyka",
    ],
    uczelnie: [
      "Politechnika Świętokrzyska",
      "Uniwersytet Jana Kochanowskiego",
    ],
  },
  {
    nazwa: "Gliwice",
    slug: "gliwice",
    wojewodztwo: "śląskie",
    populacja: 174000,
    opis_krotki:
      "Akademickie miasto Górnego Śląska, dom Politechniki Śląskiej i fabryki Opel/Stellantis.",
    landmarki: ["Radiostacja Gliwicka", "Rynek", "Palmiarnia Miejska"],
    branze: [
      "motoryzacja (fabryka Stellantis/Opel)",
      "sektor IT",
      "przemysł maszynowy",
    ],
    uczelnie: ["Politechnika Śląska"],
  },
  {
    nazwa: "Olsztyn",
    slug: "olsztyn",
    wojewodztwo: "warmińsko-mazurskie",
    populacja: 169000,
    opis_krotki:
      "Stolica Warmii i Mazur, brama do Krainy Tysiąca Jezior.",
    landmarki: [
      "Zamek Kapituły Warmińskiej",
      "Stare Miasto",
      "jezioro Ukiel",
    ],
    branze: [
      "przemysł oponiarski (Michelin)",
      "przemysł spożywczy",
      "turystyka",
    ],
    uczelnie: ["Uniwersytet Warmińsko-Mazurski"],
  },
  {
    nazwa: "Bielsko-Biała",
    slug: "bielsko-biala",
    wojewodztwo: "śląskie",
    populacja: 165000,
    opis_krotki:
      "Ośrodek przemysłu motoryzacyjnego u podnóża Beskidów, dom Fiata.",
    landmarki: [
      "Zamek Sułkowskich",
      "Starówka",
      "studio filmów rysunkowych (Bolek i Lolek)",
    ],
    branze: [
      "motoryzacja (Fiat/Stellantis)",
      "przemysł maszynowy",
      "turystyka beskidzka",
    ],
  },
  {
    nazwa: "Zabrze",
    slug: "zabrze",
    wojewodztwo: "śląskie",
    populacja: 164000,
    opis_krotki:
      "Miasto Górnego Śląska, ośrodek medyczny ze Śląskim Centrum Chorób Serca.",
    landmarki: [
      "Sztolnia Królowa Luiza",
      "Kopalnia Guido",
      "Śląskie Centrum Chorób Serca",
    ],
    branze: [
      "medycyna i kardiologia",
      "górnictwo i energetyka",
      "turystyka poprzemysłowa",
    ],
  },
  {
    nazwa: "Bytom",
    slug: "bytom",
    wojewodztwo: "śląskie",
    populacja: 155000,
    opis_krotki:
      "Historyczne miasto Górnego Śląska z bogatą tradycją górniczą.",
    landmarki: ["Rynek", "Opera Śląska", "Muzeum Górnictwa Węglowego"],
    branze: ["górnictwo (tradycja)", "kultura (Opera Śląska)", "handel i usługi"],
  },
  {
    nazwa: "Zielona Góra",
    slug: "zielona-gora",
    wojewodztwo: "lubuskie",
    populacja: 140000,
    opis_krotki:
      "Stolica Lubuskiego, miasto winnic i Uniwersytetu Zielonogórskiego.",
    landmarki: ["Palmiarnia", "Winobranie", "deptak Stary Rynek"],
    branze: [
      "winiarstwo i turystyka",
      "przemysł elektroniczny",
      "sektor IT",
    ],
    uczelnie: ["Uniwersytet Zielonogórski"],
  },
  {
    nazwa: "Rybnik",
    slug: "rybnik",
    wojewodztwo: "śląskie",
    populacja: 135000,
    opis_krotki:
      "Górnicze miasto subregionu rybnickiego, ośrodek przemysłu energetycznego.",
    landmarki: ["Bazylika św. Antoniego", "Rynek", "Zalew Rybnicki"],
    branze: ["górnictwo węgla", "energetyka (Elektrownia Rybnik)", "handel i usługi"],
  },
  {
    nazwa: "Ruda Śląska",
    slug: "ruda-slaska",
    wojewodztwo: "śląskie",
    populacja: 133000,
    opis_krotki:
      "Konurbacyjne miasto Górnego Śląska, dawne zagłębie kopalń węgla.",
    landmarki: ["zabytkowa Kolonia Ficinus", "kościół św. Józefa", "Park Strzelnica"],
    branze: ["górnictwo węgla", "hutnictwo", "logistyka"],
  },
  {
    nazwa: "Opole",
    slug: "opole",
    wojewodztwo: "opolskie",
    populacja: 127000,
    opis_krotki:
      "Stolica Opolszczyzny, miasto festiwali piosenki polskiej.",
    landmarki: [
      "amfiteatr (Krajowy Festiwal Piosenki Polskiej)",
      "Wieża Piastowska",
      "Rynek",
    ],
    branze: [
      "przemysł cementowy",
      "energetyka",
      "rolnictwo i przetwórstwo",
    ],
    uczelnie: ["Uniwersytet Opolski", "Politechnika Opolska"],
  },
  {
    nazwa: "Tychy",
    slug: "tychy",
    wojewodztwo: "śląskie",
    populacja: 125000,
    opis_krotki:
      "Modernistyczne miasto Śląska, siedziba browaru Tyskie i fabryki Stellantis.",
    landmarki: ["Browar Tyskie", "modernistyczne osiedla literowe"],
    branze: [
      "motoryzacja (Stellantis)",
      "browarnictwo (Tyskie)",
      "produkcja przemysłowa",
    ],
  },
  {
    nazwa: "Gorzów Wielkopolski",
    slug: "gorzow-wielkopolski",
    wojewodztwo: "lubuskie",
    populacja: 115000,
    opis_krotki:
      "Druga stolica Lubuskiego, ośrodek przemysłu nad Wartą.",
    landmarki: ["Katedra", "Bulwar Nadwarciański", "Spichlerz"],
    branze: [
      "motoryzacja i części (TPV, Faurecia)",
      "przemysł przetwórczy",
      "logistyka",
    ],
  },
  {
    nazwa: "Dąbrowa Górnicza",
    slug: "dabrowa-gornicza",
    wojewodztwo: "śląskie",
    populacja: 115000,
    opis_krotki:
      "Przemysłowe miasto Zagłębia Dąbrowskiego, siedziba huty ArcelorMittal.",
    landmarki: ["jeziora Pogoria", "Pałac Kultury Zagłębia", "huta ArcelorMittal"],
    branze: ["hutnictwo (ArcelorMittal)", "przemysł ciężki", "logistyka i magazyny"],
  },
  {
    nazwa: "Elbląg",
    slug: "elblag",
    wojewodztwo: "warmińsko-mazurskie",
    populacja: 115000,
    opis_krotki:
      "Miasto kanału Elbląskiego i portu śródlądowego nad Zalewem Wiślanym.",
    landmarki: [
      "Kanał Elbląski",
      "Stare Miasto",
      "Bulwar Zygmunta Augusta",
    ],
    branze: [
      "przemysł maszynowy",
      "port śródlądowy i logistyka",
      "turystyka",
    ],
  },
  {
    nazwa: "Płock",
    slug: "plock",
    wojewodztwo: "mazowieckie",
    populacja: 113000,
    opis_krotki:
      "Najstarsze miasto Mazowsza, siedziba PKN Orlen i centrum petrochemii.",
    landmarki: [
      "Wzgórze Tumskie z katedrą",
      "molo nad Wisłą",
      "rafineria PKN Orlen",
    ],
    branze: [
      "petrochemia i rafineria (PKN Orlen)",
      "przemysł chemiczny",
      "energetyka",
    ],
  },
  {
    nazwa: "Wałbrzych",
    slug: "walbrzych",
    wojewodztwo: "dolnośląskie",
    populacja: 103000,
    opis_krotki:
      "Dawne miasto górnicze Dolnego Śląska, dziś centrum przemysłu motoryzacyjnego.",
    landmarki: ["Zamek Książ", "Stara Kopalnia", "Palmiarnia"],
    branze: [
      "motoryzacja (Toyota)",
      "przemysł i logistyka (strefa ekonomiczna)",
      "turystyka",
    ],
  },
  {
    nazwa: "Włocławek",
    slug: "wloclawek",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 104000,
    opis_krotki:
      "Miasto nad Wisłą, ośrodek przemysłu chemicznego i ceramicznego.",
    landmarki: ["Katedra", "bulwary nad Wisłą", "zapora wodna na Wiśle"],
    branze: ["przemysł chemiczny (Anwil, Orlen)", "ceramika i fajans", "energetyka wodna"],
  },
  {
    nazwa: "Tarnów",
    slug: "tarnow",
    wojewodztwo: "małopolskie",
    populacja: 104000,
    opis_krotki:
      "Renesansowa perła Małopolski, ośrodek przemysłu chemicznego.",
    landmarki: [
      "renesansowy Rynek",
      "katedra",
      "Mauzoleum gen. Józefa Bema",
    ],
    branze: [
      "przemysł chemiczny (Grupa Azoty)",
      "turystyka",
      "logistyka",
    ],
  },
  {
    nazwa: "Koszalin",
    slug: "koszalin",
    wojewodztwo: "zachodniopomorskie",
    populacja: 104000,
    opis_krotki:
      "Drugie miasto Pomorza Zachodniego, brama do Mielna i wybrzeża Bałtyku.",
    landmarki: ["Góra Chełmska", "katedra", "amfiteatr"],
    branze: [
      "turystyka nadmorska",
      "przemysł elektroniczny",
      "handel i usługi",
    ],
  },
  {
    nazwa: "Chorzów",
    slug: "chorzow",
    wojewodztwo: "śląskie",
    populacja: 102000,
    opis_krotki:
      "Miasto Stadionu Śląskiego i Parku Śląskiego, część metropolii GZM.",
    landmarki: ["Park Śląski", "Stadion Śląski", "Legendia", "Planetarium Śląskie"],
    branze: ["kultura i rekreacja", "hutnictwo (tradycja)", "handel"],
  },
  {
    nazwa: "Kalisz",
    slug: "kalisz",
    wojewodztwo: "wielkopolskie",
    populacja: 96000,
    opis_krotki:
      "Najstarsze miasto w Polsce, ośrodek przemysłu lotniczego i fortepianowego.",
    landmarki: ["Główny Rynek", "Sanktuarium św. Józefa", "park miejski"],
    branze: ["przemysł lotniczy (WSK PZL-Kalisz)", "produkcja fortepianów (Calisia)", "włókiennictwo"],
    uczelnie: ["Akademia Kaliska"],
  },
  {
    nazwa: "Legnica",
    slug: "legnica",
    wojewodztwo: "dolnośląskie",
    populacja: 96000,
    opis_krotki:
      "Miasto Dolnego Śląska, ośrodek przemysłu miedziowego i specjalna strefa ekonomiczna.",
    landmarki: ["Zamek Piastowski", "Katedra", "Rynek"],
    branze: ["przemysł miedziowy (KGHM, Huta Miedzi Legnica)", "Legnicka Specjalna Strefa Ekonomiczna", "motoryzacja"],
  },
  {
    nazwa: "Grudziądz",
    slug: "grudziadz",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 91000,
    opis_krotki:
      "Miasto nad Wisłą z gotycką starówką i tradycjami garnizonowymi.",
    landmarki: ["Spichrze nad Wisłą", "Góra Zamkowa", "Cytadela"],
    branze: ["przemysł gumowy i oponiarski", "przemysł metalowy", "logistyka"],
  },
  {
    nazwa: "Słupsk",
    slug: "slupsk",
    wojewodztwo: "pomorskie",
    populacja: 89000,
    opis_krotki:
      "Miasto Pomorza Środkowego, ośrodek przemysłu drzewnego i meblarskiego.",
    landmarki: ["Zamek Książąt Pomorskich", "Ratusz", "Młyn Zamkowy"],
    branze: ["przemysł drzewny i meblarski", "przemysł spożywczy", "usługi"],
  },
  {
    nazwa: "Jaworzno",
    slug: "jaworzno",
    wojewodztwo: "śląskie",
    populacja: 87000,
    opis_krotki:
      "Miasto Górnego Śląska z elektrownią Jaworzno III i jeziorem Sosina.",
    landmarki: ["jezioro Sosina", "Geosfera (dawny kamieniołom)", "Elektrownia Jaworzno"],
    branze: ["energetyka (Elektrownia Jaworzno)", "chemia", "górnictwo (tradycja)"],
  },
  {
    nazwa: "Jastrzębie-Zdrój",
    slug: "jastrzebie-zdroj",
    wojewodztwo: "śląskie",
    populacja: 85000,
    opis_krotki:
      "Górnicze miasto subregionu rybnickiego, siedziba JSW.",
    landmarki: ["Park Zdrojowy", "kopalnie JSW"],
    branze: ["górnictwo węgla koksowego (JSW)", "energetyka", "usługi"],
  },
  {
    nazwa: "Nowy Sącz",
    slug: "nowy-sacz",
    wojewodztwo: "małopolskie",
    populacja: 83000,
    opis_krotki:
      "Stolica Sądecczyzny, ośrodek turystyczny u bram Beskidu Sądeckiego.",
    landmarki: ["Rynek z Ratuszem", "Sądecki Park Etnograficzny", "ruiny zamku"],
    branze: ["turystyka (Beskid Sądecki)", "produkcja taboru kolejowego (Newag)", "przemysł spożywczy"],
  },
  {
    nazwa: "Siedlce",
    slug: "siedlce",
    wojewodztwo: "mazowieckie",
    populacja: 77000,
    opis_krotki:
      "Subregionalne centrum wschodniego Mazowsza, miasto Uniwersytetu Przyrodniczo-Humanistycznego.",
    landmarki: ["Ratusz (Jacek)", "Katedra", "pałac Ogińskich"],
    branze: ["handel i usługi", "przemysł spożywczy", "logistyka"],
    uczelnie: ["Uniwersytet w Siedlcach"],
  },
  {
    nazwa: "Jelenia Góra",
    slug: "jelenia-gora",
    wojewodztwo: "dolnośląskie",
    populacja: 75000,
    opis_krotki:
      "Brama do Karkonoszy, ośrodek turystyczny i uzdrowiskowy Dolnego Śląska.",
    landmarki: ["Plac Ratuszowy", "uzdrowisko Cieplice", "Zamek Chojnik"],
    branze: ["turystyka (Karkonosze)", "uzdrowiska (Cieplice)", "przemysł farmaceutyczny i optyczny"],
  },
  {
    nazwa: "Mysłowice",
    slug: "myslowice",
    wojewodztwo: "śląskie",
    populacja: 73000,
    opis_krotki:
      "Miasto trzech granic, część metropolii GZM nad Przemszą.",
    landmarki: ["Trójkąt Trzech Cesarzy", "promenada nad Przemszą"],
    branze: ["górnictwo (tradycja)", "logistyka", "handel"],
  },
  {
    nazwa: "Piła",
    slug: "pila",
    wojewodztwo: "wielkopolskie",
    populacja: 72000,
    opis_krotki:
      "Największe miasto północnej Wielkopolski, węzeł kolejowy.",
    landmarki: ["wieża ciśnień", "park na Wyspie", "fontanna"],
    branze: ["przemysł oświetleniowy (Signify/Philips)", "logistyka i węzeł kolejowy", "przemysł drzewny"],
  },
  {
    nazwa: "Ostrów Wielkopolski",
    slug: "ostrow-wielkopolski",
    wojewodztwo: "wielkopolskie",
    populacja: 72000,
    opis_krotki:
      "Miasto południowej Wielkopolski, ośrodek przemysłu kolejowego.",
    landmarki: ["Rynek z Ratuszem", "Synagoga", "park miejski"],
    branze: ["przemysł kolejowy i taboru", "motoryzacja", "przemysł spożywczy"],
  },
  {
    nazwa: "Konin",
    slug: "konin",
    wojewodztwo: "wielkopolskie",
    populacja: 71000,
    opis_krotki:
      "Miasto wschodniej Wielkopolski, ośrodek energetyki i przemysłu aluminiowego.",
    landmarki: ["słup koniński", "starówka", "jeziora konińskie"],
    branze: ["energetyka (ZE PAK)", "przemysł aluminiowy", "górnictwo węgla brunatnego"],
  },
  {
    nazwa: "Piotrków Trybunalski",
    slug: "piotrkow-trybunalski",
    wojewodztwo: "łódzkie",
    populacja: 71000,
    opis_krotki:
      "Historyczne miasto Trybunału Koronnego, węzeł komunikacyjny przy A1.",
    landmarki: ["Stare Miasto", "Zamek Królewski", "Rynek Trybunalski"],
    branze: ["logistyka (węzeł A1)", "przemysł szklarski", "meblarstwo"],
  },
  {
    nazwa: "Inowrocław",
    slug: "inowroclaw",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 70000,
    opis_krotki:
      "Uzdrowiskowe miasto Kujaw, ośrodek przemysłu solnego.",
    landmarki: ["Park Solankowy", "tężnie solankowe", "uzdrowisko"],
    branze: ["uzdrowiska i turystyka zdrowotna", "przemysł chemiczny (soda)", "przemysł spożywczy"],
  },
  {
    nazwa: "Lubin",
    slug: "lubin",
    wojewodztwo: "dolnośląskie",
    populacja: 70000,
    opis_krotki:
      "Miasto KGHM, ośrodek górnictwa miedzi na Dolnym Śląsku.",
    landmarki: ["Wzgórze Zamkowe", "stadion Zagłębia Lubin"],
    branze: ["górnictwo miedzi (KGHM)", "hutnictwo", "usługi okołogórnicze"],
  },
  {
    nazwa: "Suwałki",
    slug: "suwalki",
    wojewodztwo: "podlaskie",
    populacja: 70000,
    opis_krotki:
      "Stolica Suwalszczyzny, brama do Pojezierza Wigierskiego.",
    landmarki: ["Konkatedra", "park Konstytucji 3 Maja", "Suwalski Park Krajobrazowy"],
    branze: ["Suwalska Specjalna Strefa Ekonomiczna", "przemysł drzewny i meblarski", "turystyka"],
  },
  {
    nazwa: "Gniezno",
    slug: "gniezno",
    wojewodztwo: "wielkopolskie",
    populacja: 66000,
    opis_krotki:
      "Pierwsza stolica Polski, miasto Pałacu Lecha i katedry prymasowskiej.",
    landmarki: ["Katedra z Drzwiami Gnieźnieńskimi", "Wzgórze Lecha", "Rynek"],
    branze: ["turystyka (Szlak Piastowski)", "przemysł skórzany i obuwniczy", "przemysł spożywczy"],
  },
  {
    nazwa: "Stargard",
    slug: "stargard",
    wojewodztwo: "zachodniopomorskie",
    populacja: 65000,
    opis_krotki:
      "Miasto Pomorza Zachodniego z zachowanymi murami obronnymi z XIV wieku.",
    landmarki: ["mury obronne z Bramą Pyrzycką", "kolegiata NMP", "Rynek Staromiejski"],
    branze: ["logistyka", "motoryzacja (Bridgestone)", "przemysł"],
  },
  {
    nazwa: "Ostrowiec Świętokrzyski",
    slug: "ostrowiec-swietokrzyski",
    wojewodztwo: "świętokrzyskie",
    populacja: 64000,
    opis_krotki:
      "Miasto przemysłu hutniczego, siedziba dawnych zakładów Celsa Huta Ostrowiec.",
    landmarki: ["Krzemionki (kopalnie krzemienia UNESCO)", "Park Miejski"],
    branze: ["hutnictwo (Celsa Huta Ostrowiec)", "metalurgia", "przemysł"],
  },
  {
    nazwa: "Siemianowice Śląskie",
    slug: "siemianowice-slaskie",
    wojewodztwo: "śląskie",
    populacja: 64000,
    opis_krotki:
      "Miasto konurbacji śląskiej z tradycjami hutniczymi i górniczymi.",
    landmarki: ["Park Pszczelnik", "Willa Fitznera"],
    branze: ["hutnictwo i górnictwo (tradycja)", "logistyka", "przemysł"],
  },
  {
    nazwa: "Głogów",
    slug: "glogow",
    wojewodztwo: "dolnośląskie",
    populacja: 63000,
    opis_krotki:
      "Miasto nad Odrą, ośrodek przemysłu miedziowego i siedziba Huty Głogów.",
    landmarki: ["Zamek Książąt Głogowskich", "kolegiata", "Stare Miasto"],
    branze: ["hutnictwo miedzi (KGHM, Huta Głogów)", "przemysł", "logistyka"],
  },
  {
    nazwa: "Pruszków",
    slug: "pruszkow",
    wojewodztwo: "mazowieckie",
    populacja: 63000,
    opis_krotki:
      "Miasto Aglomeracji Warszawskiej, ośrodek logistyki i e-commerce.",
    landmarki: ["Muzeum Dulag 121", "park Potulickich", "Muzeum Starożytnego Hutnictwa Mazowieckiego"],
    branze: ["logistyka i magazyny", "e-commerce", "przemysł"],
  },
  {
    nazwa: "Pabianice",
    slug: "pabianice",
    wojewodztwo: "łódzkie",
    populacja: 62000,
    opis_krotki:
      "Miasto aglomeracji łódzkiej z tradycjami włókienniczymi i farmaceutycznymi.",
    landmarki: ["Stary Rynek z dworem", "kościół św. Mateusza"],
    branze: ["farmacja (Polfa Pabianice)", "włókiennictwo (tradycja)", "logistyka"],
  },
  {
    nazwa: "Leszno",
    slug: "leszno",
    wojewodztwo: "wielkopolskie",
    populacja: 62000,
    opis_krotki:
      "Miasto południowo-zachodniej Wielkopolski, ośrodek lotnictwa sportowego.",
    landmarki: ["Rynek z Ratuszem", "lotnisko Aeroklubu Leszczyńskiego"],
    branze: ["lotnictwo sportowe", "przemysł spożywczy", "logistyka"],
  },
  {
    nazwa: "Łomża",
    slug: "lomza",
    wojewodztwo: "podlaskie",
    populacja: 62000,
    opis_krotki:
      "Subregionalne miasto Podlasia, brama do Doliny Narwi.",
    landmarki: ["Katedra", "Stary Rynek", "skansen kurpiowski"],
    branze: ["przemysł spożywczy (Browar Łomża)", "przemysł drzewny", "usługi"],
  },
  {
    nazwa: "Zamość",
    slug: "zamosc",
    wojewodztwo: "lubelskie",
    populacja: 62000,
    opis_krotki:
      "Renesansowa Padwa Północy wpisana na listę UNESCO.",
    landmarki: ["Rynek Wielki (UNESCO)", "Ratusz", "twierdza Zamość", "Akademia Zamojska"],
    branze: ["turystyka (Stare Miasto UNESCO)", "handel i usługi", "przemysł spożywczy"],
  },
  {
    nazwa: "Ełk",
    slug: "elk",
    wojewodztwo: "warmińsko-mazurskie",
    populacja: 62000,
    opis_krotki:
      "Największe miasto Mazur, ośrodek turystyczny nad Jeziorem Ełckim.",
    landmarki: ["Jezioro Ełckie", "promenada", "Ełcka Kolej Wąskotorowa"],
    branze: ["turystyka (Mazury)", "przemysł drzewny", "przemysł spożywczy"],
  },
  {
    nazwa: "Żory",
    slug: "zory",
    wojewodztwo: "śląskie",
    populacja: 61000,
    opis_krotki:
      "Miasto subregionu rybnickiego z najmłodszą populacją wśród miast Śląska.",
    landmarki: ["Starówka", "Park Cegielnia", "Muzeum Ognia"],
    branze: ["górnictwo węgla", "handel", "usługi"],
  },
  {
    nazwa: "Tarnowskie Góry",
    slug: "tarnowskie-gory",
    wojewodztwo: "śląskie",
    populacja: 60000,
    opis_krotki:
      "Miasto kopalni srebra wpisanej na listę UNESCO, brama do północnego Śląska.",
    landmarki: ["Zabytkowa Kopalnia Srebra (UNESCO)", "Sztolnia Czarnego Pstrąga", "Rynek"],
    branze: ["turystyka (UNESCO)", "przemysł", "logistyka"],
  },
  {
    nazwa: "Tomaszów Mazowiecki",
    slug: "tomaszow-mazowiecki",
    wojewodztwo: "łódzkie",
    populacja: 60000,
    opis_krotki:
      "Miasto środkowego Mazowsza, ośrodek przemysłu włókienniczego.",
    landmarki: ["Groty Nagórzyckie", "rezerwat Niebieskie Źródła", "skansen rzeki Pilicy"],
    branze: ["włókiennictwo (tradycja)", "przemysł chemiczny", "energetyka"],
  },
  {
    nazwa: "Chełm",
    slug: "chelm",
    wojewodztwo: "lubelskie",
    populacja: 60000,
    opis_krotki:
      "Miasto wschodniej Lubelszczyzny, ośrodek przemysłu cementowego.",
    landmarki: ["Chełmskie Podziemia Kredowe", "Górka Chełmska z bazyliką"],
    branze: ["przemysł cementowy (Cementownia Chełm)", "logistyka przygraniczna", "przemysł spożywczy"],
  },
  {
    nazwa: "Mielec",
    slug: "mielec",
    wojewodztwo: "podkarpackie",
    populacja: 59000,
    opis_krotki:
      "Centrum Doliny Lotniczej, siedziba PZL Mielec i specjalna strefa ekonomiczna.",
    landmarki: ["lotnisko i zakłady PZL Mielec", "Rynek"],
    branze: ["przemysł lotniczy (PZL Mielec, Dolina Lotnicza)", "Specjalna Strefa Ekonomiczna Euro-Park", "motoryzacja"],
  },
  {
    nazwa: "Kędzierzyn-Koźle",
    slug: "kedzierzyn-kozle",
    wojewodztwo: "opolskie",
    populacja: 58000,
    opis_krotki:
      "Miasto Opolszczyzny, ośrodek przemysłu chemicznego nad Odrą.",
    landmarki: ["Twierdza Koźle", "port nad Odrą", "Kanał Gliwicki"],
    branze: ["przemysł chemiczny (Grupa Azoty ZAK)", "logistyka (port rzeczny)", "energetyka"],
  },
  {
    nazwa: "Przemyśl",
    slug: "przemysl",
    wojewodztwo: "podkarpackie",
    populacja: 58000,
    opis_krotki:
      "Najstarsze miasto Podkarpacia, ośrodek przygraniczny przy granicy z Ukrainą.",
    landmarki: ["Twierdza Przemyśl", "Zamek Kazimierzowski", "Wieża Zegarowa", "Stare Miasto"],
    branze: ["turystyka", "handel przygraniczny", "przemysł drzewny"],
  },
  {
    nazwa: "Stalowa Wola",
    slug: "stalowa-wola",
    wojewodztwo: "podkarpackie",
    populacja: 58000,
    opis_krotki:
      "Miasto przemysłowe Podkarpacia, siedziba HSW i fabryki Bumar Łabędy.",
    landmarki: ["Huta Stalowa Wola", "zabytkowy Rozwadów"],
    branze: ["przemysł zbrojeniowy i metalowy (HSW)", "Specjalna Strefa Ekonomiczna", "energetyka"],
  },
  {
    nazwa: "Tczew",
    slug: "tczew",
    wojewodztwo: "pomorskie",
    populacja: 58000,
    opis_krotki:
      "Miasto nad Wisłą z historycznym mostem Tczewskim, węzeł kolejowy Pomorza.",
    landmarki: ["Most Tczewski", "Fabryka Sztuk", "Stare Miasto nad Wisłą"],
    branze: ["logistyka (węzeł kolejowy)", "motoryzacja", "przemysł elektroniczny"],
  },
  {
    nazwa: "Biała Podlaska",
    slug: "biala-podlaska",
    wojewodztwo: "lubelskie",
    populacja: 57000,
    opis_krotki:
      "Miasto przygraniczne wschodniej Lubelszczyzny, akademickie centrum Podlasia.",
    landmarki: ["zespół pałacowy Radziwiłłów", "Rynek"],
    branze: ["logistyka przygraniczna", "handel", "lotnictwo (tradycja)"],
  },
  {
    nazwa: "Bełchatów",
    slug: "belchatow",
    wojewodztwo: "łódzkie",
    populacja: 55000,
    opis_krotki:
      "Miasto największej elektrowni węglowej w Europie i kopalni odkrywkowej.",
    landmarki: ["Elektrownia Bełchatów", "odkrywkowa Kopalnia Węgla Brunatnego", "Góra Kamieńsk"],
    branze: ["energetyka (PGE, Elektrownia Bełchatów)", "górnictwo węgla brunatnego", "usługi"],
  },
  {
    nazwa: "Świdnica",
    slug: "swidnica",
    wojewodztwo: "dolnośląskie",
    populacja: 55000,
    opis_krotki:
      "Miasto Dolnego Śląska z Kościołem Pokoju wpisanym na listę UNESCO.",
    landmarki: ["Kościół Pokoju (UNESCO)", "Rynek", "Katedra"],
    branze: ["motoryzacja i elektronika (strefa ekonomiczna)", "przemysł", "turystyka"],
  },
  {
    nazwa: "Będzin",
    slug: "bedzin",
    wojewodztwo: "śląskie",
    populacja: 55000,
    opis_krotki:
      "Historyczne miasto Zagłębia Dąbrowskiego z gotyckim zamkiem.",
    landmarki: ["Zamek w Będzinie", "Wzgórze Zamkowe", "Pałac Mieroszewskich"],
    branze: ["energetyka", "górnictwo (tradycja)", "handel"],
  },
  {
    nazwa: "Zgierz",
    slug: "zgierz",
    wojewodztwo: "łódzkie",
    populacja: 54000,
    opis_krotki:
      "Miasto aglomeracji łódzkiej z tradycjami sukienniczymi.",
    landmarki: ["Park Miejski", "domy tkaczy przy Starym Rynku"],
    branze: ["włókiennictwo (tradycja)", "przemysł chemiczny", "logistyka"],
  },
  {
    nazwa: "Legionowo",
    slug: "legionowo",
    wojewodztwo: "mazowieckie",
    populacja: 54000,
    opis_krotki:
      "Miasto aglomeracji warszawskiej z tradycjami wojskowymi.",
    landmarki: ["Muzeum Historyczne", "okolice Jeziora Zegrzyńskiego"],
    branze: ["usługi (aglomeracja warszawska)", "handel", "logistyka"],
  },
  {
    nazwa: "Racibórz",
    slug: "raciborz",
    wojewodztwo: "śląskie",
    populacja: 54000,
    opis_krotki:
      "Miasto Górnego Śląska nad Odrą, dawna stolica księstwa raciborskiego.",
    landmarki: ["Zamek Piastowski", "Rynek", "Arboretum Bramy Morawskiej"],
    branze: ["przemysł maszynowy (Rafako)", "farmacja", "przemysł spożywczy"],
  },
  {
    nazwa: "Piekary Śląskie",
    slug: "piekary-slaskie",
    wojewodztwo: "śląskie",
    populacja: 53000,
    opis_krotki:
      "Sanktuaryjne miasto Górnego Śląska z bazyliką Matki Sprawiedliwości.",
    landmarki: ["Bazylika NMP (sanktuarium)", "Kalwaria Piekarska"],
    branze: ["górnictwo (tradycja)", "handel", "usługi"],
  },
  {
    nazwa: "Ostrołęka",
    slug: "ostroleka",
    wojewodztwo: "mazowieckie",
    populacja: 52000,
    opis_krotki:
      "Miasto północnego Mazowsza nad Narwią, ośrodek przemysłu papierniczego.",
    landmarki: ["most na Narwi", "Stary Rynek", "Elektrownia Ostrołęka"],
    branze: ["energetyka (Elektrownia Ostrołęka)", "przemysł papierniczy (Stora Enso)", "przemysł drzewny"],
  },
  {
    nazwa: "Piaseczno",
    slug: "piaseczno",
    wojewodztwo: "mazowieckie",
    populacja: 50000,
    opis_krotki:
      "Miasto aglomeracji warszawskiej, jeden z najszybciej rosnących ośrodków pod Warszawą.",
    landmarki: ["Rynek", "Piaseczyńsko-Grójecka Kolej Wąskotorowa", "park miejski"],
    branze: ["logistyka i magazyny", "e-commerce", "media i druk"],
  },
  {
    nazwa: "Rumia",
    slug: "rumia",
    wojewodztwo: "pomorskie",
    populacja: 50000,
    opis_krotki:
      "Miasto Małego Trójmiasta Kaszubskiego, podgdyński ośrodek mieszkaniowy.",
    landmarki: ["stacja kolejowa", "Galeria Rumia", "rezerwat Beka"],
    branze: ["logistyka (Małe Trójmiasto)", "handel", "usługi"],
  },
  {
    nazwa: "Wejherowo",
    slug: "wejherowo",
    wojewodztwo: "pomorskie",
    populacja: 50000,
    opis_krotki:
      "Stolica duchowa Kaszub z barokową Kalwarią Wejherowską.",
    landmarki: ["Kalwaria Wejherowska", "Pałac Przebendowskich", "Plac Wejhera"],
    branze: ["turystyka (Kaszuby)", "handel", "usługi"],
  },
  {
    nazwa: "Świętochłowice",
    slug: "swietochlowice",
    wojewodztwo: "śląskie",
    populacja: 48000,
    opis_krotki:
      "Najmniejsze powierzchniowo miasto wojewódzkie Górnego Śląska.",
  },
  {
    nazwa: "Starachowice",
    slug: "starachowice",
    wojewodztwo: "świętokrzyskie",
    populacja: 48000,
    opis_krotki:
      "Miasto Staropolskiego Okręgu Przemysłowego, dom fabryki samochodów ciężarowych Star.",
  },
  {
    nazwa: "Zawiercie",
    slug: "zawiercie",
    wojewodztwo: "śląskie",
    populacja: 48000,
    opis_krotki:
      "Miasto Jury Krakowsko-Częstochowskiej, ośrodek przemysłu hutniczego.",
  },
  {
    nazwa: "Skierniewice",
    slug: "skierniewice",
    wojewodztwo: "łódzkie",
    populacja: 47000,
    opis_krotki:
      "Miasto między Łodzią a Warszawą, ośrodek nauki sadowniczej.",
  },
  {
    nazwa: "Starogard Gdański",
    slug: "starogard-gdanski",
    wojewodztwo: "pomorskie",
    populacja: 47000,
    opis_krotki:
      "Stolica Kociewia, miasto cukierni Kopernika i likieru Sobieski.",
  },
  {
    nazwa: "Tarnobrzeg",
    slug: "tarnobrzeg",
    wojewodztwo: "podkarpackie",
    populacja: 46000,
    opis_krotki:
      "Miasto Kotliny Sandomierskiej, dawne centrum wydobycia siarki.",
  },
  {
    nazwa: "Kołobrzeg",
    slug: "kolobrzeg",
    wojewodztwo: "zachodniopomorskie",
    populacja: 46000,
    opis_krotki:
      "Uzdrowiskowe miasto nad Bałtykiem, jeden z najpopularniejszych kurortów wybrzeża.",
    indeksuj: true,
    landmarki: ["molo", "latarnia morska", "konkatedra"],
    branze: [
      "turystyka i uzdrowiska",
      "gastronomia i HoReCa",
      "hotelarstwo",
    ],
  },
  {
    nazwa: "Otwock",
    slug: "otwock",
    wojewodztwo: "mazowieckie",
    populacja: 46000,
    opis_krotki:
      "Uzdrowiskowe miasto pod Warszawą znane z architektury świdermajer.",
  },
  {
    nazwa: "Puławy",
    slug: "pulawy",
    wojewodztwo: "lubelskie",
    populacja: 46000,
    opis_krotki:
      "Miasto Grupy Azoty, siedziba zakładów chemicznych i Pałacu Czartoryskich.",
  },
  {
    nazwa: "Radomsko",
    slug: "radomsko",
    wojewodztwo: "łódzkie",
    populacja: 46000,
    opis_krotki:
      "Miasto południowego Łódzkiego z tradycjami meblarskimi i metalowymi.",
  },
  {
    nazwa: "Wodzisław Śląski",
    slug: "wodzislaw-slaski",
    wojewodztwo: "śląskie",
    populacja: 46000,
    opis_krotki:
      "Miasto subregionu rybnickiego, ośrodek górniczy w pobliżu granicy z Czechami.",
  },
  {
    nazwa: "Dębica",
    slug: "debica",
    wojewodztwo: "podkarpackie",
    populacja: 46000,
    opis_krotki:
      "Miasto Podkarpacia, siedziba fabryki opon Goodyear Dębica.",
  },
  {
    nazwa: "Krosno",
    slug: "krosno",
    wojewodztwo: "podkarpackie",
    populacja: 45000,
    opis_krotki:
      "Miasto naftowe Podkarpacia, ośrodek przemysłu szklarskiego.",
  },
  {
    nazwa: "Skarżysko-Kamienna",
    slug: "skarzysko-kamienna",
    wojewodztwo: "świętokrzyskie",
    populacja: 45000,
    opis_krotki:
      "Miasto przemysłu zbrojeniowego, siedziba zakładów Mesko.",
  },
  {
    nazwa: "Kutno",
    slug: "kutno",
    wojewodztwo: "łódzkie",
    populacja: 43000,
    opis_krotki:
      "Miasto północnego Łódzkiego, węzeł kolejowy i ośrodek farmacji.",
  },
  {
    nazwa: "Ciechanów",
    slug: "ciechanow",
    wojewodztwo: "mazowieckie",
    populacja: 43000,
    opis_krotki:
      "Miasto północnego Mazowsza z renesansowym zamkiem książąt mazowieckich.",
  },
  {
    nazwa: "Nysa",
    slug: "nysa",
    wojewodztwo: "opolskie",
    populacja: 43000,
    opis_krotki:
      "Miasto Opolszczyzny zwane Śląskim Rzymem, brama do Sudetów.",
  },
  {
    nazwa: "Sieradz",
    slug: "sieradz",
    wojewodztwo: "łódzkie",
    populacja: 41000,
    opis_krotki:
      "Historyczne miasto Sieradzkiego, jedna z najstarszych osad ziemi łódzkiej.",
  },
  {
    nazwa: "Zduńska Wola",
    slug: "zdunska-wola",
    wojewodztwo: "łódzkie",
    populacja: 41000,
    opis_krotki:
      "Miasto centralnego Łódzkiego z tradycjami tkackimi.",
  },
  {
    nazwa: "Mińsk Mazowiecki",
    slug: "minsk-mazowiecki",
    wojewodztwo: "mazowieckie",
    populacja: 41000,
    opis_krotki:
      "Miasto wschodniego Mazowsza, ośrodek przemysłu zbrojeniowego.",
  },
  {
    nazwa: "Chojnice",
    slug: "chojnice",
    wojewodztwo: "pomorskie",
    populacja: 40000,
    opis_krotki:
      "Stolica Borów Tucholskich, brama do Kaszubsko-Pomorskiego.",
  },
  {
    nazwa: "Świnoujście",
    slug: "swinoujscie",
    wojewodztwo: "zachodniopomorskie",
    populacja: 40000,
    opis_krotki:
      "Wyspowe miasto nad Bałtykiem, port morski i terminal LNG.",
    indeksuj: true,
    landmarki: ["Latarnia Morska", "Stawa Młyny", "promenada nadmorska"],
    branze: [
      "turystyka i uzdrowiska",
      "gospodarka morska i port",
      "energetyka (terminal LNG)",
    ],
  },
  {
    nazwa: "Mikołów",
    slug: "mikolow",
    wojewodztwo: "śląskie",
    populacja: 40000,
    opis_krotki:
      "Miasto Górnego Śląska, ośrodek między Katowicami a Tychami.",
  },
  {
    nazwa: "Ząbki",
    slug: "zabki",
    wojewodztwo: "mazowieckie",
    populacja: 39000,
    opis_krotki:
      "Miasto wschodniej aglomeracji warszawskiej, jedno z najszybciej rosnących pod stolicą.",
  },
  {
    nazwa: "Żyrardów",
    slug: "zyrardow",
    wojewodztwo: "mazowieckie",
    populacja: 39000,
    opis_krotki:
      "Miasto fabryczne zachodniego Mazowsza z dawną Osadą Lniarską.",
  },
  {
    nazwa: "Świdnik",
    slug: "swidnik",
    wojewodztwo: "lubelskie",
    populacja: 39000,
    opis_krotki:
      "Lotnicze miasto pod Lublinem, dom PZL-Świdnik.",
  },
  {
    nazwa: "Bolesławiec",
    slug: "boleslawiec",
    wojewodztwo: "dolnośląskie",
    populacja: 38000,
    opis_krotki:
      "Miasto ceramiki bolesławieckiej i przemysłu szklarskiego.",
  },
  {
    nazwa: "Wołomin",
    slug: "wolomin",
    wojewodztwo: "mazowieckie",
    populacja: 38000,
    opis_krotki:
      "Miasto wschodniej aglomeracji warszawskiej z dworkiem Zofii Nałkowskiej.",
  },
  {
    nazwa: "Nowa Sól",
    slug: "nowa-sol",
    wojewodztwo: "lubuskie",
    populacja: 38000,
    opis_krotki:
      "Miasto Lubuskiego nad Odrą, ośrodek przemysłu kolejowego.",
  },
  {
    nazwa: "Knurów",
    slug: "knurow",
    wojewodztwo: "śląskie",
    populacja: 38000,
    opis_krotki:
      "Górnicze miasto Górnego Śląska między Gliwicami a Rybnikiem.",
  },
  {
    nazwa: "Oświęcim",
    slug: "oswiecim",
    wojewodztwo: "małopolskie",
    populacja: 38000,
    opis_krotki:
      "Historyczne miasto Małopolski, ośrodek przemysłu chemicznego nad Sołą.",
  },
  {
    nazwa: "Żary",
    slug: "zary",
    wojewodztwo: "lubuskie",
    populacja: 38000,
    opis_krotki:
      "Miasto południowego Lubuskiego z barokowo-renesansową starówką.",
  },
  {
    nazwa: "Szczecinek",
    slug: "szczecinek",
    wojewodztwo: "zachodniopomorskie",
    populacja: 38000,
    opis_krotki:
      "Miasto Pojezierza Drawskiego, ośrodek przemysłu drzewnego (Kronospan).",
  },
  {
    nazwa: "Marki",
    slug: "marki",
    wojewodztwo: "mazowieckie",
    populacja: 37000,
    opis_krotki:
      "Miasto wschodniej aglomeracji warszawskiej, dynamicznie rosnące przy S8.",
  },
  {
    nazwa: "Jarosław",
    slug: "jaroslaw",
    wojewodztwo: "podkarpackie",
    populacja: 37000,
    opis_krotki:
      "Historyczne miasto Podkarpacia z renesansową starówką nad Sanem.",
  },
  {
    nazwa: "Kwidzyn",
    slug: "kwidzyn",
    wojewodztwo: "pomorskie",
    populacja: 37000,
    opis_krotki:
      "Miasto Doliny Dolnej Wisły z zamkiem krzyżackim, ośrodek przemysłu papierniczego.",
  },
  {
    nazwa: "Malbork",
    slug: "malbork",
    wojewodztwo: "pomorskie",
    populacja: 37000,
    opis_krotki:
      "Miasto największego ceglanego zamku Europy wpisanego na listę UNESCO.",
  },
  {
    nazwa: "Sanok",
    slug: "sanok",
    wojewodztwo: "podkarpackie",
    populacja: 37000,
    opis_krotki:
      "Brama do Bieszczad, siedziba fabryki autobusów Autosan.",
  },
  {
    nazwa: "Sopot",
    slug: "sopot",
    wojewodztwo: "pomorskie",
    populacja: 36000,
    opis_krotki:
      "Najmniejsze miasto Trójmiasta, kurort nadmorski z najdłuższym molo w Europie.",
    indeksuj: true,
    landmarki: ["molo w Sopocie", "Krzywy Domek", "Opera Leśna"],
    branze: [
      "turystyka i hotelarstwo",
      "gastronomia i HoReCa",
      "organizacja eventów",
    ],
  },
  {
    nazwa: "Chrzanów",
    slug: "chrzanow",
    wojewodztwo: "małopolskie",
    populacja: 36000,
    opis_krotki:
      "Miasto zachodniej Małopolski, dawne centrum produkcji lokomotyw Fablok.",
  },
  {
    nazwa: "Brzeg",
    slug: "brzeg",
    wojewodztwo: "opolskie",
    populacja: 35000,
    opis_krotki:
      "Renesansowe miasto Opolszczyzny nad Odrą, dawna stolica książąt brzeskich.",
  },
  {
    nazwa: "Olkusz",
    slug: "olkusz",
    wojewodztwo: "małopolskie",
    populacja: 35000,
    opis_krotki:
      "Miasto Jury Krakowsko-Częstochowskiej z tradycjami górnictwa srebra i cynku.",
  },
  {
    nazwa: "Sochaczew",
    slug: "sochaczew",
    wojewodztwo: "mazowieckie",
    populacja: 35000,
    opis_krotki:
      "Miasto zachodniego Mazowsza, ośrodek logistyczny przy A2.",
  },
  {
    nazwa: "Lębork",
    slug: "lebork",
    wojewodztwo: "pomorskie",
    populacja: 35000,
    opis_krotki:
      "Miasto Pomorza Środkowego, brama do Słowińskiego Parku Narodowego.",
  },
  {
    nazwa: "Czechowice-Dziedzice",
    slug: "czechowice-dziedzice",
    wojewodztwo: "śląskie",
    populacja: 35000,
    opis_krotki:
      "Miasto Podbeskidzia z rafinerią Lotos Czechowice.",
  },
  {
    nazwa: "Cieszyn",
    slug: "cieszyn",
    wojewodztwo: "śląskie",
    populacja: 33000,
    opis_krotki:
      "Historyczne miasto przygraniczne nad Olzą, brama do czeskiego Cieszyna.",
  },
  {
    nazwa: "Pruszcz Gdański",
    slug: "pruszcz-gdanski",
    wojewodztwo: "pomorskie",
    populacja: 33000,
    opis_krotki:
      "Miasto Aglomeracji Trójmiejskiej, jeden z najszybciej rosnących ośrodków Pomorza.",
  },
  {
    nazwa: "Police",
    slug: "police",
    wojewodztwo: "zachodniopomorskie",
    populacja: 33000,
    opis_krotki:
      "Miasto Aglomeracji Szczecińskiej, siedziba zakładów chemicznych Grupy Azoty.",
  },
  {
    nazwa: "Iława",
    slug: "ilawa",
    wojewodztwo: "warmińsko-mazurskie",
    populacja: 33000,
    opis_krotki:
      "Miasto Pojezierza Iławskiego nad jeziorem Jeziorak.",
  },
  {
    nazwa: "Ostróda",
    slug: "ostroda",
    wojewodztwo: "warmińsko-mazurskie",
    populacja: 33000,
    opis_krotki:
      "Miasto Mazur, węzeł kanału Elbląskiego i ośrodek turystyczny.",
  },
  {
    nazwa: "Nowy Targ",
    slug: "nowy-targ",
    wojewodztwo: "małopolskie",
    populacja: 33000,
    opis_krotki:
      "Stolica Podhala, ośrodek turystyczny u podnóża Tatr i Gorców.",
  },
  {
    nazwa: "Dzierżoniów",
    slug: "dzierzoniow",
    wojewodztwo: "dolnośląskie",
    populacja: 33000,
    opis_krotki:
      "Miasto Dolnego Śląska u podnóża Gór Sowich.",
  },
  {
    nazwa: "Oława",
    slug: "olawa",
    wojewodztwo: "dolnośląskie",
    populacja: 33000,
    opis_krotki:
      "Miasto Aglomeracji Wrocławskiej, ośrodek przemysłu elektronicznego.",
  },
  {
    nazwa: "Grodzisk Mazowiecki",
    slug: "grodzisk-mazowiecki",
    wojewodztwo: "mazowieckie",
    populacja: 32000,
    opis_krotki:
      "Miasto zachodniego Mazowsza, jeden z głównych ośrodków podwarszawskich.",
  },
  {
    nazwa: "Luboń",
    slug: "lubon",
    wojewodztwo: "wielkopolskie",
    populacja: 32000,
    opis_krotki:
      "Miasto Aglomeracji Poznańskiej, dynamicznie rosnący ośrodek mieszkaniowy.",
  },
  {
    nazwa: "Swarzędz",
    slug: "swarzedz",
    wojewodztwo: "wielkopolskie",
    populacja: 31000,
    opis_krotki:
      "Miasto Aglomeracji Poznańskiej, polska stolica meblarstwa.",
  },
  {
    nazwa: "Żywiec",
    slug: "zywiec",
    wojewodztwo: "śląskie",
    populacja: 31000,
    opis_krotki:
      "Miasto Beskidu Żywieckiego, siedziba browaru Grupy Żywiec.",
  },
  {
    nazwa: "Bochnia",
    slug: "bochnia",
    wojewodztwo: "małopolskie",
    populacja: 30000,
    opis_krotki:
      "Miasto Małopolski z zabytkową kopalnią soli wpisaną na listę UNESCO.",
  },
  {
    nazwa: "Łuków",
    slug: "lukow",
    wojewodztwo: "lubelskie",
    populacja: 30000,
    opis_krotki:
      "Miasto północnej Lubelszczyzny, ośrodek przemysłu mięsnego.",
  },
  {
    nazwa: "Augustów",
    slug: "augustow",
    wojewodztwo: "podlaskie",
    populacja: 30000,
    opis_krotki:
      "Uzdrowiskowe miasto Suwalszczyzny nad Kanałem Augustowskim.",
  },
  {
    nazwa: "Mława",
    slug: "mlawa",
    wojewodztwo: "mazowieckie",
    populacja: 30000,
    opis_krotki:
      "Miasto północnego Mazowsza, ośrodek produkcji telewizorów LG.",
  },
  {
    nazwa: "Zgorzelec",
    slug: "zgorzelec",
    wojewodztwo: "dolnośląskie",
    populacja: 30000,
    opis_krotki:
      "Miasto przygraniczne nad Nysą Łużycką, polska strona Görlitz.",
  },
  {
    nazwa: "Czeladź",
    slug: "czeladz",
    wojewodztwo: "śląskie",
    populacja: 30000,
    opis_krotki:
      "Miasto Zagłębia Dąbrowskiego z najstarszą starówką Górnego Śląska.",
  },
  {
    nazwa: "Śrem",
    slug: "srem",
    wojewodztwo: "wielkopolskie",
    populacja: 30000,
    opis_krotki:
      "Miasto Wielkopolski nad Wartą, ośrodek odlewniczy.",
  },
  {
    nazwa: "Września",
    slug: "wrzesnia",
    wojewodztwo: "wielkopolskie",
    populacja: 30000,
    opis_krotki:
      "Miasto wschodniej Wielkopolski, siedziba fabryki Volkswagena.",
  },
  {
    nazwa: "Bielawa",
    slug: "bielawa",
    wojewodztwo: "dolnośląskie",
    populacja: 29000,
    opis_krotki:
      "Miasto Dolnego Śląska u podnóża Gór Sowich z dawnymi tradycjami włókienniczymi.",
  },
  {
    nazwa: "Giżycko",
    slug: "gizycko",
    wojewodztwo: "warmińsko-mazurskie",
    populacja: 29000,
    opis_krotki:
      "Stolica polskich Mazur, ośrodek żeglarski nad jeziorami Niegocin i Kisajno.",
  },
  {
    nazwa: "Krotoszyn",
    slug: "krotoszyn",
    wojewodztwo: "wielkopolskie",
    populacja: 28000,
    opis_krotki:
      "Miasto południowej Wielkopolski, ośrodek przemysłu drzewnego.",
  },
  {
    nazwa: "Łowicz",
    slug: "lowicz",
    wojewodztwo: "łódzkie",
    populacja: 28000,
    opis_krotki:
      "Miasto Księstwa Łowickiego, ośrodek folkloru i pasiastej kultury.",
  },
  {
    nazwa: "Nowy Dwór Mazowiecki",
    slug: "nowy-dwor-mazowiecki",
    wojewodztwo: "mazowieckie",
    populacja: 28000,
    opis_krotki:
      "Miasto u zbiegu Wisły i Narwi, brama lotniska Warszawa-Modlin.",
  },
  {
    nazwa: "Wyszków",
    slug: "wyszkow",
    wojewodztwo: "mazowieckie",
    populacja: 28000,
    opis_krotki:
      "Miasto północno-wschodniego Mazowsza nad Bugiem.",
  },
  {
    nazwa: "Gorlice",
    slug: "gorlice",
    wojewodztwo: "małopolskie",
    populacja: 28000,
    opis_krotki:
      "Miasto Podkarpacia naftowego, kolebka przemysłu naftowego Ignacego Łukasiewicza.",
  },
  {
    nazwa: "Turek",
    slug: "turek",
    wojewodztwo: "wielkopolskie",
    populacja: 26000,
    opis_krotki:
      "Miasto wschodniej Wielkopolski, dawne centrum przemysłu jedwabniczego.",
  },
  {
    nazwa: "Czerwionka-Leszczyny",
    slug: "czerwionka-leszczyny",
    wojewodztwo: "śląskie",
    populacja: 26000,
    opis_krotki:
      "Górnicze miasto subregionu rybnickiego.",
  },
  {
    nazwa: "Kętrzyn",
    slug: "ketrzyn",
    wojewodztwo: "warmińsko-mazurskie",
    populacja: 26000,
    opis_krotki:
      "Miasto Mazur, w pobliżu Wilczego Szańca i Świętej Lipki.",
  },
  {
    nazwa: "Zakopane",
    slug: "zakopane",
    wojewodztwo: "małopolskie",
    populacja: 26000,
    opis_krotki:
      "Zimowa stolica Polski, główny kurort Tatr i Podhala.",
    indeksuj: true,
    landmarki: ["Krupówki", "Gubałówka", "Wielka Krokiew"],
    branze: [
      "turystyka górska i hotelarstwo",
      "gastronomia i HoReCa",
      "handel pamiątkarski",
    ],
  },
  {
    nazwa: "Reda",
    slug: "reda",
    wojewodztwo: "pomorskie",
    populacja: 26000,
    opis_krotki:
      "Miasto Małego Trójmiasta Kaszubskiego między Wejherowem a Rumią.",
  },
  {
    nazwa: "Wałcz",
    slug: "walcz",
    wojewodztwo: "zachodniopomorskie",
    populacja: 25000,
    opis_krotki:
      "Miasto Pojezierza Wałeckiego, ośrodek sportowy z Centralnym Ośrodkiem Sportu.",
  },
  {
    nazwa: "Żagań",
    slug: "zagan",
    wojewodztwo: "lubuskie",
    populacja: 25000,
    opis_krotki:
      "Miasto Lubuskiego, garnizon 11. Dywizji Kawalerii Pancernej.",
  },
  {
    nazwa: "Skawina",
    slug: "skawina",
    wojewodztwo: "małopolskie",
    populacja: 25000,
    opis_krotki:
      "Miasto Aglomeracji Krakowskiej z elektrownią Skawina i strefą ekonomiczną.",
  },
  {
    nazwa: "Pszczyna",
    slug: "pszczyna",
    wojewodztwo: "śląskie",
    populacja: 25000,
    opis_krotki:
      "Miasto Górnego Śląska z neorenesansowym zamkiem książęcym.",
  },
  {
    nazwa: "Jarocin",
    slug: "jarocin",
    wojewodztwo: "wielkopolskie",
    populacja: 25000,
    opis_krotki:
      "Miasto południowej Wielkopolski, kolebka polskiego rocka.",
  },
  {
    nazwa: "Bielsk Podlaski",
    slug: "bielsk-podlaski",
    wojewodztwo: "podlaskie",
    populacja: 25000,
    opis_krotki:
      "Miasto Podlasia, ośrodek kultury białoruskiej w Polsce.",
  },
  {
    nazwa: "Świecie",
    slug: "swiecie",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 25000,
    opis_krotki:
      "Miasto Doliny Dolnej Wisły, ośrodek przemysłu papierniczego (Mondi Świecie).",
  },
  {
    nazwa: "Szczytno",
    slug: "szczytno",
    wojewodztwo: "warmińsko-mazurskie",
    populacja: 24000,
    opis_krotki:
      "Miasto Mazur, siedziba Wyższej Szkoły Policji.",
  },
  {
    nazwa: "Bartoszyce",
    slug: "bartoszyce",
    wojewodztwo: "warmińsko-mazurskie",
    populacja: 24000,
    opis_krotki:
      "Miasto Warmii przy granicy z Obwodem Kaliningradzkim.",
  },
  {
    nazwa: "Lubliniec",
    slug: "lubliniec",
    wojewodztwo: "śląskie",
    populacja: 24000,
    opis_krotki:
      "Miasto północnego Śląska, siedziba Jednostki Wojskowej Komandosów.",
  },
  {
    nazwa: "Wieliczka",
    slug: "wieliczka",
    wojewodztwo: "małopolskie",
    populacja: 24000,
    opis_krotki:
      "Miasto kopalni soli wpisanej na listę UNESCO, brama Aglomeracji Krakowskiej.",
  },
  {
    nazwa: "Wągrowiec",
    slug: "wagrowiec",
    wojewodztwo: "wielkopolskie",
    populacja: 24000,
    opis_krotki:
      "Miasto północnej Wielkopolski nad Jeziorem Durowskim.",
  },
  {
    nazwa: "Białogard",
    slug: "bialogard",
    wojewodztwo: "zachodniopomorskie",
    populacja: 23000,
    opis_krotki:
      "Miasto Pomorza Środkowego nad Parsętą.",
  },
  {
    nazwa: "Kluczbork",
    slug: "kluczbork",
    wojewodztwo: "opolskie",
    populacja: 23000,
    opis_krotki:
      "Miasto północnej Opolszczyzny, węzeł kolejowy.",
  },
  {
    nazwa: "Kościerzyna",
    slug: "koscierzyna",
    wojewodztwo: "pomorskie",
    populacja: 23000,
    opis_krotki:
      "Miasto Kaszub, ośrodek przemysłu drzewnego i turystyki.",
  },
  {
    nazwa: "Sandomierz",
    slug: "sandomierz",
    wojewodztwo: "świętokrzyskie",
    populacja: 22000,
    opis_krotki:
      "Historyczne miasto nad Wisłą, jedna z najstarszych perł architektonicznych Polski.",
  },
  {
    nazwa: "Piastów",
    slug: "piastow",
    wojewodztwo: "mazowieckie",
    populacja: 22000,
    opis_krotki:
      "Miasto zachodniej aglomeracji warszawskiej między Pruszkowem a Ursusem.",
  },
  {
    nazwa: "Świebodzice",
    slug: "swiebodzice",
    wojewodztwo: "dolnośląskie",
    populacja: 22000,
    opis_krotki:
      "Miasto Dolnego Śląska z dawnym Zamkiem Książ w pobliżu.",
  },
  {
    nazwa: "Jawor",
    slug: "jawor",
    wojewodztwo: "dolnośląskie",
    populacja: 22000,
    opis_krotki:
      "Miasto Dolnego Śląska z Kościołem Pokoju UNESCO i fabryką Mercedes-Benz.",
  },
  {
    nazwa: "Polkowice",
    slug: "polkowice",
    wojewodztwo: "dolnośląskie",
    populacja: 22000,
    opis_krotki:
      "Miasto KGHM, dom fabryki Volkswagen Motor Polska.",
  },
  {
    nazwa: "Świebodzin",
    slug: "swiebodzin",
    wojewodztwo: "lubuskie",
    populacja: 22000,
    opis_krotki:
      "Miasto Lubuskiego znane z największego pomnika Chrystusa Króla.",
  },
  {
    nazwa: "Środa Wielkopolska",
    slug: "sroda-wielkopolska",
    wojewodztwo: "wielkopolskie",
    populacja: 22000,
    opis_krotki:
      "Miasto centralnej Wielkopolski, kolebka demokracji szlacheckiej.",
  },
  {
    nazwa: "Goleniów",
    slug: "goleniow",
    wojewodztwo: "zachodniopomorskie",
    populacja: 22000,
    opis_krotki:
      "Miasto Aglomeracji Szczecińskiej, siedziba lotniska Solidarność i strefy ekonomicznej.",
  },
  {
    nazwa: "Płońsk",
    slug: "plonsk",
    wojewodztwo: "mazowieckie",
    populacja: 22000,
    opis_krotki:
      "Miasto północnego Mazowsza, ośrodek przemysłu cukrowniczego.",
  },
  {
    nazwa: "Lubań",
    slug: "luban",
    wojewodztwo: "dolnośląskie",
    populacja: 21000,
    opis_krotki:
      "Miasto zachodniego Dolnego Śląska na pograniczu Łużyc.",
  },
  {
    nazwa: "Józefów",
    slug: "jozefow",
    wojewodztwo: "mazowieckie",
    populacja: 21000,
    opis_krotki:
      "Miasto Aglomeracji Warszawskiej, willowe przedmieście stolicy.",
  },
  {
    nazwa: "Opoczno",
    slug: "opoczno",
    wojewodztwo: "łódzkie",
    populacja: 21000,
    opis_krotki:
      "Miasto Łódzkiego, ośrodek przemysłu ceramicznego.",
  },
  {
    nazwa: "Aleksandrów Łódzki",
    slug: "aleksandrow-lodzki",
    wojewodztwo: "łódzkie",
    populacja: 21000,
    opis_krotki:
      "Miasto aglomeracji łódzkiej z dawnymi tradycjami pończoszniczymi.",
  },
  {
    nazwa: "Wieluń",
    slug: "wielun",
    wojewodztwo: "łódzkie",
    populacja: 21000,
    opis_krotki:
      "Miasto południowo-zachodniego Łódzkiego, miejsce pierwszych bombardowań II wojny.",
  },
  {
    nazwa: "Trzebinia",
    slug: "trzebinia",
    wojewodztwo: "małopolskie",
    populacja: 21000,
    opis_krotki:
      "Miasto Małopolski, ośrodek przemysłu paliwowego.",
  },
  {
    nazwa: "Andrychów",
    slug: "andrychow",
    wojewodztwo: "małopolskie",
    populacja: 21000,
    opis_krotki:
      "Miasto Beskidu Małego, ośrodek przemysłu maszynowego.",
  },
  {
    nazwa: "Koło",
    slug: "kolo",
    wojewodztwo: "wielkopolskie",
    populacja: 21000,
    opis_krotki:
      "Miasto wschodniej Wielkopolski nad Wartą.",
  },
  {
    nazwa: "Grajewo",
    slug: "grajewo",
    wojewodztwo: "podlaskie",
    populacja: 21000,
    opis_krotki:
      "Miasto Podlasia, siedziba zakładów Pfleiderer Grajewo.",
  },
  {
    nazwa: "Mrągowo",
    slug: "mragowo",
    wojewodztwo: "warmińsko-mazurskie",
    populacja: 21000,
    opis_krotki:
      "Miasto Mazur, organizator Pikniku Country Mrągowo.",
  },
  {
    nazwa: "Działdowo",
    slug: "dzialdowo",
    wojewodztwo: "warmińsko-mazurskie",
    populacja: 21000,
    opis_krotki:
      "Miasto Mazur na pograniczu Mazowsza, węzeł kolejowy.",
  },
  {
    nazwa: "Rawicz",
    slug: "rawicz",
    wojewodztwo: "wielkopolskie",
    populacja: 21000,
    opis_krotki:
      "Miasto południowej Wielkopolski, historyczna stolica protestancka.",
  },
  {
    nazwa: "Łaziska Górne",
    slug: "laziska-gorne",
    wojewodztwo: "śląskie",
    populacja: 22000,
    opis_krotki:
      "Miasto Górnego Śląska z elektrownią Łaziska.",
  },
  {
    nazwa: "Orzesze",
    slug: "orzesze",
    wojewodztwo: "śląskie",
    populacja: 21000,
    opis_krotki:
      "Miasto subregionu rybnickiego, dynamicznie rozwijający się ośrodek mieszkaniowy.",
  },
  {
    nazwa: "Rydułtowy",
    slug: "rydultowy",
    wojewodztwo: "śląskie",
    populacja: 22000,
    opis_krotki:
      "Górnicze miasto subregionu rybnickiego.",
  },
  {
    nazwa: "Bieruń",
    slug: "bierun",
    wojewodztwo: "śląskie",
    populacja: 20000,
    opis_krotki:
      "Miasto Górnego Śląska, dom fabryki Stellantis Tychy-Bieruń.",
  },
  {
    nazwa: "Prudnik",
    slug: "prudnik",
    wojewodztwo: "opolskie",
    populacja: 20000,
    opis_krotki:
      "Miasto Opolszczyzny u podnóża Gór Opawskich.",
  },
  {
    nazwa: "Hajnówka",
    slug: "hajnowka",
    wojewodztwo: "podlaskie",
    populacja: 20000,
    opis_krotki:
      "Miasto Podlasia, brama do Puszczy Białowieskiej.",
  },
  {
    nazwa: "Łańcut",
    slug: "lancut",
    wojewodztwo: "podkarpackie",
    populacja: 17000,
    opis_krotki:
      "Miasto Podkarpacia z barokowym zespołem zamkowo-parkowym Lubomirskich.",
  },
  {
    nazwa: "Tomaszów Lubelski",
    slug: "tomaszow-lubelski",
    wojewodztwo: "lubelskie",
    populacja: 19000,
    opis_krotki:
      "Miasto Roztocza, ośrodek przygraniczny południowo-wschodniej Lubelszczyzny.",
  },
  {
    nazwa: "Pułtusk",
    slug: "pultusk",
    wojewodztwo: "mazowieckie",
    populacja: 19000,
    opis_krotki:
      "Miasto północnego Mazowsza z jednym z najdłuższych rynków w Europie.",
  },
  {
    nazwa: "Końskie",
    slug: "konskie",
    wojewodztwo: "świętokrzyskie",
    populacja: 19000,
    opis_krotki:
      "Miasto Świętokrzyskiego, ośrodek przemysłu odlewniczego.",
  },
  {
    nazwa: "Sulejówek",
    slug: "sulejowek",
    wojewodztwo: "mazowieckie",
    populacja: 19000,
    opis_krotki:
      "Miasto wschodniej aglomeracji warszawskiej, dom Marszałka Józefa Piłsudskiego.",
  },
  {
    nazwa: "Szamotuły",
    slug: "szamotuly",
    wojewodztwo: "wielkopolskie",
    populacja: 19000,
    opis_krotki:
      "Miasto Wielkopolski, ośrodek produkcji serów twarogowych.",
  },
  {
    nazwa: "Ozorków",
    slug: "ozorkow",
    wojewodztwo: "łódzkie",
    populacja: 19000,
    opis_krotki:
      "Miasto aglomeracji łódzkiej nad Bzurą.",
  },
  {
    nazwa: "Wadowice",
    slug: "wadowice",
    wojewodztwo: "małopolskie",
    populacja: 19000,
    opis_krotki:
      "Rodzinne miasto Karola Wojtyły, słynące z papieskich kremówek.",
  },
  {
    nazwa: "Pisz",
    slug: "pisz",
    wojewodztwo: "warmińsko-mazurskie",
    populacja: 19000,
    opis_krotki:
      "Miasto Mazur nad Pisą, brama Puszczy Piskiej.",
  },
  {
    nazwa: "Złotów",
    slug: "zlotow",
    wojewodztwo: "wielkopolskie",
    populacja: 18000,
    opis_krotki:
      "Miasto Krajny, otoczone pięcioma jeziorami.",
  },
  {
    nazwa: "Chodzież",
    slug: "chodziez",
    wojewodztwo: "wielkopolskie",
    populacja: 18000,
    opis_krotki:
      "Miasto północnej Wielkopolski, ośrodek przemysłu porcelanowego.",
  },
  {
    nazwa: "Krasnystaw",
    slug: "krasnystaw",
    wojewodztwo: "lubelskie",
    populacja: 18000,
    opis_krotki:
      "Miasto Lubelszczyzny, organizator festiwalu Chmielaki Krasnostawskie.",
  },
  {
    nazwa: "Międzyrzecz",
    slug: "miedzyrzecz",
    wojewodztwo: "lubuskie",
    populacja: 18000,
    opis_krotki:
      "Miasto Lubuskiego z umocnieniami Międzyrzeckiego Rejonu Umocnionego.",
  },
  {
    nazwa: "Myślenice",
    slug: "myslenice",
    wojewodztwo: "małopolskie",
    populacja: 18000,
    opis_krotki:
      "Miasto Małopolski, brama do Beskidu Wyspowego.",
  },
  {
    nazwa: "Kamienna Góra",
    slug: "kamienna-gora",
    wojewodztwo: "dolnośląskie",
    populacja: 18000,
    opis_krotki:
      "Miasto Dolnego Śląska u podnóża Karkonoszy, ośrodek strefy ekonomicznej.",
  },
  {
    nazwa: "Lesko",
    slug: "lesko",
    wojewodztwo: "podkarpackie",
    populacja: 11000,
    opis_krotki:
      "Miasto Bieszczad nad Sanem, brama do Bieszczadzkiego Parku Narodowego.",
  },
  {
    nazwa: "Konstantynów Łódzki",
    slug: "konstantynow-lodzki",
    wojewodztwo: "łódzkie",
    populacja: 17000,
    opis_krotki:
      "Miasto aglomeracji łódzkiej z dawnymi tradycjami tkackimi.",
  },
  {
    nazwa: "Łomianki",
    slug: "lomianki",
    wojewodztwo: "mazowieckie",
    populacja: 17000,
    opis_krotki:
      "Miasto północnej aglomeracji warszawskiej nad Wisłą.",
  },
  {
    nazwa: "Konstancin-Jeziorna",
    slug: "konstancin-jeziorna",
    wojewodztwo: "mazowieckie",
    populacja: 17000,
    opis_krotki:
      "Uzdrowiskowe miasto Aglomeracji Warszawskiej z tężniami solankowymi.",
  },
  {
    nazwa: "Garwolin",
    slug: "garwolin",
    wojewodztwo: "mazowieckie",
    populacja: 17000,
    opis_krotki:
      "Miasto wschodniego Mazowsza przy drodze S17.",
  },
  {
    nazwa: "Zielonka",
    slug: "zielonka",
    wojewodztwo: "mazowieckie",
    populacja: 17000,
    opis_krotki:
      "Miasto wschodniej aglomeracji warszawskiej z dużym kompleksem leśnym.",
  },
  {
    nazwa: "Sulechów",
    slug: "sulechow",
    wojewodztwo: "lubuskie",
    populacja: 17000,
    opis_krotki:
      "Miasto Lubuskiego, ośrodek akademicki przy drodze S3.",
  },
  {
    nazwa: "Słubice",
    slug: "slubice",
    wojewodztwo: "lubuskie",
    populacja: 17000,
    opis_krotki:
      "Miasto przygraniczne nad Odrą, polska strona Frankfurtu nad Odrą.",
  },
  {
    nazwa: "Kostrzyn nad Odrą",
    slug: "kostrzyn-nad-odra",
    wojewodztwo: "lubuskie",
    populacja: 17000,
    opis_krotki:
      "Miasto przygraniczne Lubuskiego, ośrodek festiwalu Pol'and'Rock.",
  },
  {
    nazwa: "Hrubieszów",
    slug: "hrubieszow",
    wojewodztwo: "lubelskie",
    populacja: 17000,
    opis_krotki:
      "Najdalej na wschód wysunięte miasto Polski, ośrodek przygraniczny z Ukrainą.",
  },
  {
    nazwa: "Pyskowice",
    slug: "pyskowice",
    wojewodztwo: "śląskie",
    populacja: 17000,
    opis_krotki:
      "Miasto Górnego Śląska między Gliwicami a Tarnowskimi Górami.",
  },
  {
    nazwa: "Pleszew",
    slug: "pleszew",
    wojewodztwo: "wielkopolskie",
    populacja: 17000,
    opis_krotki:
      "Miasto południowej Wielkopolski, ośrodek przemysłu spożywczego.",
  },
  {
    nazwa: "Oborniki",
    slug: "oborniki",
    wojewodztwo: "wielkopolskie",
    populacja: 17000,
    opis_krotki:
      "Miasto Wielkopolski nad Wartą i Wełną.",
  },
  {
    nazwa: "Radlin",
    slug: "radlin",
    wojewodztwo: "śląskie",
    populacja: 17000,
    opis_krotki:
      "Górnicze miasto subregionu rybnickiego.",
  },
  {
    nazwa: "Łask",
    slug: "lask",
    wojewodztwo: "łódzkie",
    populacja: 17000,
    opis_krotki:
      "Miasto Łódzkiego, siedziba 32. Bazy Lotnictwa Taktycznego.",
  },
  {
    nazwa: "Strzelce Opolskie",
    slug: "strzelce-opolskie",
    wojewodztwo: "opolskie",
    populacja: 17000,
    opis_krotki:
      "Miasto Opolszczyzny, ośrodek przemysłu wapienniczego.",
  },
  {
    nazwa: "Brzesko",
    slug: "brzesko",
    wojewodztwo: "małopolskie",
    populacja: 16000,
    opis_krotki:
      "Miasto Małopolski, siedziba browaru Okocim.",
  },
  {
    nazwa: "Ustroń",
    slug: "ustron",
    wojewodztwo: "śląskie",
    populacja: 16000,
    opis_krotki:
      "Uzdrowiskowe miasto Beskidu Śląskiego.",
  },
  {
    nazwa: "Busko-Zdrój",
    slug: "busko-zdroj",
    wojewodztwo: "świętokrzyskie",
    populacja: 16000,
    opis_krotki:
      "Uzdrowiskowe miasto Świętokrzyskiego z siarczkowymi wodami leczniczymi.",
  },
  {
    nazwa: "Lidzbark Warmiński",
    slug: "lidzbark-warminski",
    wojewodztwo: "warmińsko-mazurskie",
    populacja: 16000,
    opis_krotki:
      "Historyczna stolica Warmii z zamkiem biskupów warmińskich.",
  },
  {
    nazwa: "Milanówek",
    slug: "milanowek",
    wojewodztwo: "mazowieckie",
    populacja: 16000,
    opis_krotki:
      "Miasto-ogród Aglomeracji Warszawskiej z willową architekturą.",
  },
  {
    nazwa: "Krapkowice",
    slug: "krapkowice",
    wojewodztwo: "opolskie",
    populacja: 16000,
    opis_krotki:
      "Miasto Opolszczyzny nad Odrą, ośrodek przemysłu papierniczego.",
  },
  {
    nazwa: "Namysłów",
    slug: "namyslow",
    wojewodztwo: "opolskie",
    populacja: 16000,
    opis_krotki:
      "Miasto Opolszczyzny, siedziba browaru Namysłów.",
  },
  {
    nazwa: "Kartuzy",
    slug: "kartuzy",
    wojewodztwo: "pomorskie",
    populacja: 16000,
    opis_krotki:
      "Stolica Szwajcarii Kaszubskiej, ośrodek kultury kaszubskiej.",
  },
  {
    nazwa: "Gryfice",
    slug: "gryfice",
    wojewodztwo: "zachodniopomorskie",
    populacja: 16000,
    opis_krotki:
      "Miasto Pomorza Zachodniego nad Regą, brama do Trzęsacza.",
  },
  {
    nazwa: "Gubin",
    slug: "gubin",
    wojewodztwo: "lubuskie",
    populacja: 16000,
    opis_krotki:
      "Miasto przygraniczne nad Nysą Łużycką, polska strona Guben.",
  },
  {
    nazwa: "Braniewo",
    slug: "braniewo",
    wojewodztwo: "warmińsko-mazurskie",
    populacja: 16000,
    opis_krotki:
      "Najstarsze miasto Warmii, w pobliżu granicy z Obwodem Kaliningradzkim.",
  },
  {
    nazwa: "Kęty",
    slug: "kety",
    wojewodztwo: "małopolskie",
    populacja: 19000,
    opis_krotki:
      "Miasto Beskidu Małego, siedziba zakładów aluminiowych Grupa Kęty.",
  },
  {
    nazwa: "Lubawa",
    slug: "lubawa",
    wojewodztwo: "warmińsko-mazurskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Mazur, dawna siedziba biskupów chełmińskich.",
  },
  {
    nazwa: "Bytów",
    slug: "bytow",
    wojewodztwo: "pomorskie",
    populacja: 17000,
    opis_krotki:
      "Miasto Kaszub z gotyckim zamkiem krzyżackim.",
  },
  {
    nazwa: "Radzyń Podlaski",
    slug: "radzyn-podlaski",
    wojewodztwo: "lubelskie",
    populacja: 15000,
    opis_krotki:
      "Miasto Podlasia z rokokowym pałacem Potockich.",
  },
  {
    nazwa: "Nisko",
    slug: "nisko",
    wojewodztwo: "podkarpackie",
    populacja: 15000,
    opis_krotki:
      "Miasto Podkarpacia nad Sanem, część Specjalnej Strefy Ekonomicznej.",
  },
  {
    nazwa: "Ropczyce",
    slug: "ropczyce",
    wojewodztwo: "podkarpackie",
    populacja: 15000,
    opis_krotki:
      "Miasto Podkarpacia, ośrodek przemysłu materiałów ogniotrwałych.",
  },
  {
    nazwa: "Zlotoryja",
    slug: "zlotoryja",
    wojewodztwo: "dolnośląskie",
    populacja: 15000,
    opis_krotki:
      "Najstarsze miasto Polski lokowane na prawie magdeburskim.",
  },
  {
    nazwa: "Skoczów",
    slug: "skoczow",
    wojewodztwo: "śląskie",
    populacja: 14000,
    opis_krotki:
      "Miasto Beskidu Śląskiego, rodzinne miasto błogosławionego Jana Sarkandra.",
  },
  {
    nazwa: "Pszów",
    slug: "pszow",
    wojewodztwo: "śląskie",
    populacja: 14000,
    opis_krotki:
      "Górnicze miasto subregionu rybnickiego z sanktuarium maryjnym.",
  },
  {
    nazwa: "Sławno",
    slug: "slawno",
    wojewodztwo: "zachodniopomorskie",
    populacja: 12000,
    opis_krotki:
      "Miasto Pomorza Środkowego, ośrodek przemysłu spożywczego.",
  },
  {
    nazwa: "Darłowo",
    slug: "darlowo",
    wojewodztwo: "zachodniopomorskie",
    populacja: 13000,
    opis_krotki:
      "Nadmorskie miasto Pomorza Środkowego z zamkiem Eryka Pomorskiego.",
  },
  {
    nazwa: "Limanowa",
    slug: "limanowa",
    wojewodztwo: "małopolskie",
    populacja: 14000,
    opis_krotki:
      "Miasto Beskidu Wyspowego, ośrodek przemysłu drzewnego.",
  },
  {
    nazwa: "Głowno",
    slug: "glowno",
    wojewodztwo: "łódzkie",
    populacja: 14000,
    opis_krotki:
      "Miasto Łódzkiego z tradycjami spożywczymi.",
  },
  {
    nazwa: "Łęczyca",
    slug: "leczyca",
    wojewodztwo: "łódzkie",
    populacja: 13000,
    opis_krotki:
      "Historyczne miasto Łódzkiego z gotyckim zamkiem królewskim.",
  },
  {
    nazwa: "Staszów",
    slug: "staszow",
    wojewodztwo: "świętokrzyskie",
    populacja: 14000,
    opis_krotki:
      "Miasto Świętokrzyskiego, ośrodek przemysłu siarkowego.",
  },
  {
    nazwa: "Jędrzejów",
    slug: "jedrzejow",
    wojewodztwo: "świętokrzyskie",
    populacja: 14000,
    opis_krotki:
      "Miasto Świętokrzyskiego z opactwem cysterskim i Muzeum Zegarów.",
  },
  {
    nazwa: "Słupca",
    slug: "slupca",
    wojewodztwo: "wielkopolskie",
    populacja: 14000,
    opis_krotki:
      "Miasto wschodniej Wielkopolski przy autostradzie A2.",
  },
  {
    nazwa: "Kępno",
    slug: "kepno",
    wojewodztwo: "wielkopolskie",
    populacja: 14000,
    opis_krotki:
      "Miasto południowej Wielkopolski, polska stolica meblarstwa tapicerowanego.",
  },
  {
    nazwa: "Ostrzeszów",
    slug: "ostrzeszow",
    wojewodztwo: "wielkopolskie",
    populacja: 14000,
    opis_krotki:
      "Miasto południowej Wielkopolski, ośrodek przemysłu meblarskiego.",
  },
  {
    nazwa: "Ząbkowice Śląskie",
    slug: "zabkowice-slaskie",
    wojewodztwo: "dolnośląskie",
    populacja: 14000,
    opis_krotki:
      "Miasto Dolnego Śląska ze słynną krzywą wieżą.",
  },
  {
    nazwa: "Wschowa",
    slug: "wschowa",
    wojewodztwo: "lubuskie",
    populacja: 14000,
    opis_krotki:
      "Historyczne miasto Lubuskiego, niegdyś rezydencja królów Polski.",
  },
  {
    nazwa: "Wisła",
    slug: "wisla",
    wojewodztwo: "śląskie",
    populacja: 11000,
    opis_krotki:
      "Miasto Beskidu Śląskiego, kolebka polskich skoków narciarskich.",
  },
  {
    nazwa: "Krynica-Zdrój",
    slug: "krynica-zdroj",
    wojewodztwo: "małopolskie",
    populacja: 10000,
    opis_krotki:
      "Uzdrowiskowa stolica Beskidu Sądeckiego, perła polskich uzdrowisk.",
  },
  {
    nazwa: "Niepołomice",
    slug: "niepolomice",
    wojewodztwo: "małopolskie",
    populacja: 13000,
    opis_krotki:
      "Miasto Aglomeracji Krakowskiej, dom zamku Kazimierza Wielkiego.",
  },
  {
    nazwa: "Włodawa",
    slug: "wlodawa",
    wojewodztwo: "lubelskie",
    populacja: 13000,
    opis_krotki:
      "Miasto trzech kultur na styku granic z Białorusią i Ukrainą.",
  },
  {
    nazwa: "Mosina",
    slug: "mosina",
    wojewodztwo: "wielkopolskie",
    populacja: 13000,
    opis_krotki:
      "Miasto Aglomeracji Poznańskiej, brama Wielkopolskiego Parku Narodowego.",
  },
  {
    nazwa: "Człuchów",
    slug: "czluchow",
    wojewodztwo: "pomorskie",
    populacja: 13000,
    opis_krotki:
      "Miasto Pomorza, ruiny drugiego co do wielkości zamku krzyżackiego.",
  },
  {
    nazwa: "Głuchołazy",
    slug: "glucholazy",
    wojewodztwo: "opolskie",
    populacja: 13000,
    opis_krotki:
      "Uzdrowiskowe miasto Opolszczyzny u podnóża Gór Opawskich.",
  },
  {
    nazwa: "Leżajsk",
    slug: "lezajsk",
    wojewodztwo: "podkarpackie",
    populacja: 13000,
    opis_krotki:
      "Miasto Podkarpacia z barokową bazyliką i organami Stanisława Studzińskiego.",
  },
  {
    nazwa: "Brwinów",
    slug: "brwinow",
    wojewodztwo: "mazowieckie",
    populacja: 12000,
    opis_krotki:
      "Miasto-ogród zachodniej Aglomeracji Warszawskiej.",
  },
  {
    nazwa: "Brzeziny",
    slug: "brzeziny",
    wojewodztwo: "łódzkie",
    populacja: 12000,
    opis_krotki:
      "Miasto aglomeracji łódzkiej z tradycjami krawiectwa i tkactwa.",
  },
  {
    nazwa: "Sucha Beskidzka",
    slug: "sucha-beskidzka",
    wojewodztwo: "małopolskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Beskidu Makowskiego z renesansowym zamkiem Suskim.",
  },
  {
    nazwa: "Pyrzyce",
    slug: "pyrzyce",
    wojewodztwo: "zachodniopomorskie",
    populacja: 12000,
    opis_krotki:
      "Miasto Pomorza Zachodniego znane z geotermii.",
  },
  {
    nazwa: "Choszczno",
    slug: "choszczno",
    wojewodztwo: "zachodniopomorskie",
    populacja: 14000,
    opis_krotki:
      "Miasto Pomorza Zachodniego nad jeziorem Klukom.",
  },
  {
    nazwa: "Kowary",
    slug: "kowary",
    wojewodztwo: "dolnośląskie",
    populacja: 11000,
    opis_krotki:
      "Miasto Karkonoszy z tradycjami górniczymi i unikalnym parkiem miniatur.",
  },
  {
    nazwa: "Strzelin",
    slug: "strzelin",
    wojewodztwo: "dolnośląskie",
    populacja: 11000,
    opis_krotki:
      "Miasto Dolnego Śląska, ośrodek przemysłu cukrowniczego.",
  },
  {
    nazwa: "Krosno Odrzańskie",
    slug: "krosno-odrzanskie",
    wojewodztwo: "lubuskie",
    populacja: 11000,
    opis_krotki:
      "Miasto Lubuskiego u zbiegu Odry i Bobru.",
  },
  {
    nazwa: "Lubaczów",
    slug: "lubaczow",
    wojewodztwo: "podkarpackie",
    populacja: 11000,
    opis_krotki:
      "Miasto przygraniczne Podkarpacia z Ukrainą.",
  },
  {
    nazwa: "Bukowno",
    slug: "bukowno",
    wojewodztwo: "małopolskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Jury Krakowsko-Częstochowskiej, ośrodek górnictwa cynku.",
  },
  {
    nazwa: "Drawsko Pomorskie",
    slug: "drawsko-pomorskie",
    wojewodztwo: "zachodniopomorskie",
    populacja: 11000,
    opis_krotki:
      "Miasto Pojezierza Drawskiego, ośrodek największego poligonu w UE.",
  },
  {
    nazwa: "Łobez",
    slug: "lobez",
    wojewodztwo: "zachodniopomorskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Pomorza Zachodniego nad Regą.",
  },
  {
    nazwa: "Parczew",
    slug: "parczew",
    wojewodztwo: "lubelskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Polesia Zachodniego nad Piwonią.",
  },
  {
    nazwa: "Pińczów",
    slug: "pinczow",
    wojewodztwo: "świętokrzyskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Świętokrzyskiego nad Nidą, ośrodek wydobycia kamienia pińczowskiego.",
  },
  {
    nazwa: "Włoszczowa",
    slug: "wloszczowa",
    wojewodztwo: "świętokrzyskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Świętokrzyskiego, węzeł kolejowy linii Centralnej Magistrali Kolejowej.",
  },
  {
    nazwa: "Drezdenko",
    slug: "drezdenko",
    wojewodztwo: "lubuskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Lubuskiego, brama do Puszczy Noteckiej.",
  },
  {
    nazwa: "Strzelce Krajeńskie",
    slug: "strzelce-krajenskie",
    wojewodztwo: "lubuskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Lubuskiego z gotyckimi murami obronnymi.",
  },
  {
    nazwa: "Czarnków",
    slug: "czarnkow",
    wojewodztwo: "wielkopolskie",
    populacja: 10000,
    opis_krotki:
      "Miasto północnej Wielkopolski nad Notecią.",
  },
  {
    nazwa: "Maków Mazowiecki",
    slug: "makow-mazowiecki",
    wojewodztwo: "mazowieckie",
    populacja: 10000,
    opis_krotki:
      "Miasto północnego Mazowsza nad Orzycem.",
  },
  {
    nazwa: "Trzcianka",
    slug: "trzcianka",
    wojewodztwo: "wielkopolskie",
    populacja: 16000,
    opis_krotki:
      "Miasto północnej Wielkopolski, ośrodek przemysłu drzewnego.",
  },
  {
    nazwa: "Janów Lubelski",
    slug: "janow-lubelski",
    wojewodztwo: "lubelskie",
    populacja: 11000,
    opis_krotki:
      "Miasto Lubelszczyzny u progu Roztocza.",
  },
  {
    nazwa: "Lubartów",
    slug: "lubartow",
    wojewodztwo: "lubelskie",
    populacja: 21000,
    opis_krotki:
      "Miasto Lubelszczyzny z barokowym pałacem Sanguszków.",
  },
  {
    nazwa: "Międzyrzec Podlaski",
    slug: "miedzyrzec-podlaski",
    wojewodztwo: "lubelskie",
    populacja: 17000,
    opis_krotki:
      "Miasto Podlasia, węzeł komunikacyjny przy drodze A2.",
  },
  {
    nazwa: "Sokółka",
    slug: "sokolka",
    wojewodztwo: "podlaskie",
    populacja: 18000,
    opis_krotki:
      "Miasto Podlasia, sanktuarium Cudu Eucharystycznego.",
  },
  {
    nazwa: "Połaniec",
    slug: "polaniec",
    wojewodztwo: "świętokrzyskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Świętokrzyskiego, ośrodek energetyki cieplnej.",
  },
  {
    nazwa: "Pelplin",
    slug: "pelplin",
    wojewodztwo: "pomorskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Kociewia z barokową bazyliką cysterską i Biblią Gutenberga.",
  },
  {
    nazwa: "Gniew",
    slug: "gniew",
    wojewodztwo: "pomorskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Pomorza z monumentalnym zamkiem krzyżackim nad Wisłą.",
  },
  {
    nazwa: "Debrzno",
    slug: "debrzno",
    wojewodztwo: "pomorskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Krajny Złotowskiej w południowo-zachodnim Pomorzu.",
  },
  {
    nazwa: "Strzyżów",
    slug: "strzyzow",
    wojewodztwo: "podkarpackie",
    populacja: 10000,
    opis_krotki:
      "Miasto Podkarpacia nad Wisłokiem, brama Pogórza Strzyżowskiego.",
  },
  {
    nazwa: "Sędziszów Małopolski",
    slug: "sedziszow-malopolski",
    wojewodztwo: "podkarpackie",
    populacja: 12000,
    opis_krotki:
      "Miasto Podkarpacia, ośrodek przemysłu lotniczego.",
  },
  {
    nazwa: "Mszana Dolna",
    slug: "mszana-dolna",
    wojewodztwo: "małopolskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Beskidu Wyspowego, brama Gorców.",
  },
  {
    nazwa: "Halinów",
    slug: "halinow",
    wojewodztwo: "mazowieckie",
    populacja: 10000,
    opis_krotki:
      "Miasto wschodniej Aglomeracji Warszawskiej przy drodze ekspresowej S2.",
  },
  {
    nazwa: "Sułkowice",
    slug: "sulkowice",
    wojewodztwo: "małopolskie",
    populacja: 11000,
    opis_krotki:
      "Miasto Pogórza Wielickiego, ośrodek kowalstwa.",
  },
  {
    nazwa: "Świątniki Górne",
    slug: "swiatniki-gorne",
    wojewodztwo: "małopolskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Małopolski, dawne centrum kowalstwa zamków.",
  },
  {
    nazwa: "Stronie Śląskie",
    slug: "stronie-slaskie",
    wojewodztwo: "dolnośląskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Kotliny Kłodzkiej, ośrodek przemysłu szklarskiego.",
  },
  {
    nazwa: "Bystrzyca Kłodzka",
    slug: "bystrzyca-klodzka",
    wojewodztwo: "dolnośląskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Kotliny Kłodzkiej, ośrodek turystyczny Masywu Śnieżnika.",
  },
  {
    nazwa: "Kłodzko",
    slug: "klodzko",
    wojewodztwo: "dolnośląskie",
    populacja: 26000,
    opis_krotki:
      "Stolica ziemi kłodzkiej, miasto fortecy i Twierdzy Kłodzkiej.",
  },
  {
    nazwa: "Duszniki-Zdrój",
    slug: "duszniki-zdroj",
    wojewodztwo: "dolnośląskie",
    populacja: 10000,
    opis_krotki:
      "Uzdrowiskowe miasto Kotliny Kłodzkiej, miasto Chopinowskiego Festiwalu.",
  },
  {
    nazwa: "Polanica-Zdrój",
    slug: "polanica-zdroj",
    wojewodztwo: "dolnośląskie",
    populacja: 10000,
    opis_krotki:
      "Uzdrowiskowe miasto Kotliny Kłodzkiej z wodami leczniczymi.",
  },
  {
    nazwa: "Nowa Ruda",
    slug: "nowa-ruda",
    wojewodztwo: "dolnośląskie",
    populacja: 21000,
    opis_krotki:
      "Miasto Sudetów Środkowych, dawne centrum górnictwa węgla kamiennego.",
  },
  {
    nazwa: "Cybinka",
    slug: "cybinka",
    wojewodztwo: "lubuskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Lubuskiego przy granicy z Niemcami.",
  },
  {
    nazwa: "Witkowo",
    slug: "witkowo",
    wojewodztwo: "wielkopolskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Wielkopolski, ośrodek garnizonowy.",
  },
  {
    nazwa: "Sępólno Krajeńskie",
    slug: "sepolno-krajenskie",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Krajny, ośrodek rolniczy nad Jeziorem Sępoleńskim.",
  },
  {
    nazwa: "Aleksandrów Kujawski",
    slug: "aleksandrow-kujawski",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 11000,
    opis_krotki:
      "Miasto Kujaw, historyczne miejsce spotkania cara i cesarza Niemiec.",
  },
  {
    nazwa: "Chełmża",
    slug: "chelmza",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 14000,
    opis_krotki:
      "Miasto Kujaw nad Jeziorem Chełmżyńskim z gotycką katedrą.",
  },
  {
    nazwa: "Solec Kujawski",
    slug: "solec-kujawski",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 15000,
    opis_krotki:
      "Miasto Aglomeracji Bydgosko-Toruńskiej, ośrodek leśny i przemysłowy.",
  },
  {
    nazwa: "Brodnica",
    slug: "brodnica",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 28000,
    opis_krotki:
      "Stolica Pojezierza Brodnickiego, brama do Doliny Drwęcy.",
  },
  {
    nazwa: "Nakło nad Notecią",
    slug: "naklo-nad-notecia",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 19000,
    opis_krotki:
      "Miasto północnych Kujaw nad Notecią.",
  },
  {
    nazwa: "Mogilno",
    slug: "mogilno",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 12000,
    opis_krotki:
      "Miasto Pojezierza Gnieźnieńskiego nad Jeziorem Mogileńskim.",
  },
  {
    nazwa: "Rypin",
    slug: "rypin",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 16000,
    opis_krotki:
      "Miasto Pojezierza Dobrzyńskiego, ośrodek przemysłu spożywczego.",
  },
  {
    nazwa: "Lipno",
    slug: "lipno",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 14000,
    opis_krotki:
      "Miasto Ziemi Dobrzyńskiej, ośrodek rolniczy.",
  },
  {
    nazwa: "Tuchola",
    slug: "tuchola",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 14000,
    opis_krotki:
      "Stolica Borów Tucholskich z UNESCO Rezerwatem Biosfery.",
  },
  {
    nazwa: "Żnin",
    slug: "znin",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 14000,
    opis_krotki:
      "Miasto Pojezierza Gnieźnieńskiego, ośrodek archeologiczny Biskupina.",
  },
  {
    nazwa: "Golub-Dobrzyń",
    slug: "golub-dobrzyn",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 12000,
    opis_krotki:
      "Miasto Pojezierza Dobrzyńskiego z gotyckim zamkiem krzyżackim.",
  },
  {
    nazwa: "Wąbrzeźno",
    slug: "wabrzezno",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 13000,
    opis_krotki:
      "Miasto Ziemi Chełmińskiej nad jeziorami Zamkowym i Frydek.",
  },
  {
    nazwa: "Chełmno",
    slug: "chelmno",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 18000,
    opis_krotki:
      "Miasto zakochanych nad Wisłą z relikwiami św. Walentego.",
  },
  {
    nazwa: "Kowalewo Pomorskie",
    slug: "kowalewo-pomorskie",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 11000,
    opis_krotki:
      "Miasto Ziemi Chełmińskiej, ośrodek rolniczy.",
  },
  {
    nazwa: "Łysomice",
    slug: "lysomice",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Kujaw, dom strefy ekonomicznej z fabryką telewizorów Sharp.",
  },
  {
    nazwa: "Janowiec Wielkopolski",
    slug: "janowiec-wielkopolski",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Pałuk w pobliżu szlaku Piastowskiego.",
  },
  {
    nazwa: "Łabiszyn",
    slug: "labiszyn",
    wojewodztwo: "kujawsko-pomorskie",
    populacja: 10000,
    opis_krotki:
      "Miasto Kujaw nad Notecią, dawna siedziba Czarneckich.",
  },
  {
    nazwa: "Barlinek",
    slug: "barlinek",
    wojewodztwo: "zachodniopomorskie",
    populacja: 14000,
    opis_krotki:
      "Miasto Pomorza Zachodniego, perła Puszczy Barlineckiej.",
  },
  {
    nazwa: "Myszków",
    slug: "myszkow",
    wojewodztwo: "śląskie",
    populacja: 30000,
    opis_krotki:
      "Miasto Jury Krakowsko-Częstochowskiej, ośrodek przemysłu papierniczego.",
  },
  {
    nazwa: "Pawłowice",
    slug: "pawlowice",
    wojewodztwo: "śląskie",
    populacja: 17000,
    opis_krotki:
      "Gmina górnicza subregionu rybnickiego z kopalnią Pniówek.",
  },
  {
    nazwa: "Lędziny",
    slug: "ledziny",
    wojewodztwo: "śląskie",
    populacja: 16000,
    opis_krotki:
      "Miasto Górnego Śląska z kopalnią Ziemowit.",
  },
];

export function getAllMiastoSlugs(): string[] {
  return miasta.map((m) => m.slug);
}
