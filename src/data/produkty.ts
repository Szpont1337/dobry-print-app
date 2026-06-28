export type Produkt = {
  nazwa: string;
  slug: string;
  opis_krotki: string;
};

export const produkty: Produkt[] = [
  {
    nazwa: "Ulotki",
    slug: "ulotki",
    opis_krotki:
      "Ulotki reklamowe w formatach od A7 do A3, druk dwustronny 4/4 na papierze 135 g kreda mat.",
  },
  {
    nazwa: "Składane ulotki",
    slug: "skladane-ulotki",
    opis_krotki:
      "Sześciostronicowe składane ulotki w formacie DL, A5 i A4 z falcowaniem typu C na papierze 170 g.",
  },
  {
    nazwa: "Broszury szyte",
    slug: "broszury-szyte",
    opis_krotki:
      "Spinane drutem broszury w formatach A6, A5 i A4, do 48 stron, idealne na cenniki i programy wydarzeń.",
  },
  {
    nazwa: "Broszury z klejoną oprawą",
    slug: "broszury-klejone",
    opis_krotki:
      "Profesjonalna oprawa klejona hotmelt w A5 i A4, okładka 300 g, środek 135 g, do 200 stron.",
  },
  {
    nazwa: "Książki z oprawą szytą nicią",
    slug: "broszury-szyte-nicia",
    opis_krotki:
      "Najbardziej trwała oprawa szyta nicią, otwiera się na płasko, idealna do monografii i albumów.",
  },
  {
    nazwa: "Roll-up",
    slug: "roll-up",
    opis_krotki:
      "Mobilna reklama ze stelażem aluminiowym, druk laserowy na blockoucie 200 g, pokrowiec w cenie.",
  },
  {
    nazwa: "Papier firmowy",
    slug: "papier-firmowy",
    opis_krotki:
      "Klasyczny papier firmowy w A4 i A5, offset biały 90 g, druk 4/0, pakowane po 100 sztuk.",
  },
  {
    nazwa: "Wizytówki",
    slug: "wizytowki",
    opis_krotki:
      "Wizytówki 85 × 55 mm lub 90 × 50 mm, karton 350 g kreda mat, druk 4/4, narożniki proste.",
  },
  {
    nazwa: "Kartki & Pocztówki",
    slug: "kartki-pocztowki",
    opis_krotki:
      "Pocztówki i kartki okolicznościowe w A6, DL i A5, karton 300 g, druk 4/4 z polem adresowym.",
  },
  {
    nazwa: "Plakaty",
    slug: "plakaty",
    opis_krotki:
      "Plakaty w formatach od A3 do B1, papier satynowy 170 g, druk 4/0, pakowane w sztywne tuby.",
  },
  {
    nazwa: "Banery reklamowe",
    slug: "baner-reklamowy",
    opis_krotki:
      "Banery PVC 510 g i siatka mesh — druk solwentowy odporny na UV, zgrzewane krawędzie i oczka w cenie, dostawa 3 dni.",
  },
  {
    nazwa: "Naklejki",
    slug: "naklejki",
    opis_krotki:
      "Naklejki na papierze i folii od 1 szt. — kształt prostokąt lub kontur, klej trwały lub zmywalny, dostawa 48 h.",
  },
  {
    nazwa: "Tablice reklamowe",
    slug: "tablice-reklamowe",
    opis_krotki:
      "Tablice reklamowe na forex 3 mm i dibond aluminium — druk UV, cięcie CNC, gotowe do montażu w 4 dni.",
  },
  {
    nazwa: "Koszulki",
    slug: "koszulki",
    opis_krotki:
      "Koszulki z własnym nadrukiem od 1 szt. — biała bawełna, druk DTG w pełnym kolorze, podgląd na koszulce, dostawa 3 dni.",
  },
  {
    nazwa: "Torby papierowe",
    slug: "torby-papierowe",
    opis_krotki:
      "Papierowe torby z logo — papier biały lub kraft 120 g, uchwyt skręcany, podgląd nadruku, dostawa 4 dni.",
  },
  {
    nazwa: "Torby płócienne",
    slug: "torby-plocienne",
    opis_krotki:
      "Bawełniane torby tote z nadrukiem A4 — od 16 zł, taniej przy nakładzie do 10 zł/szt., podgląd na torbie, dostawa 3 dni.",
  },
];

export function getAllProduktSlugs(): string[] {
  return produkty.map((p) => p.slug);
}
