# dobreprinty → Allegro Fulfillment (wtyczka MV3)

Wtyczka przeglądarki, która prefilluje checkout Allegro danymi dostawy z panelu
dobreprinty, gdy kupujesz produkt do realizacji zamówienia klienta. Allegro **nie ma
API do kupowania**, więc to jedyna droga do automatyzacji — klik „kup i zapłać"
zawsze zostaje po Twojej stronie (to Twój moment weryfikacji).

## Jak to działa

1. W panelu dobreprinty, na opłaconym zamówieniu klikasz **„Kup na Allegro"**.
2. Otwiera się właściwa aukcja (z mapowania `produkt → oferta`) z krótkożyciowym
   tokenem w adresie (`#dfo=...`, ważny 5 min).
3. Wtyczka czyta token, od razu czyści go z paska adresu, pobiera dane z dobreprinty
   i wypełnia: **kod paczkomatu** (geowidget InPost), **uwagi do sprzedawcy**,
   **ilość**. Po prawej pojawia się **panel weryfikacyjny** z danymi i przyciskami
   „kopiuj".
4. Weryfikujesz, klikasz „kup i zapłać" na Allegro.

> Auto-fill jest _best-effort_. Jeśli Allegro zmieni układ strony i pole się nie
> wypełni, panel pokaże dane oznaczone „wypełnij ręcznie" + przycisk „kopiuj" —
> przepływ się nie zablokuje.

## Instalacja (load unpacked)

1. `chrome://extensions` → włącz **Tryb dewelopera**.
2. **Załaduj rozpakowane** → wskaż ten folder (`extension/`).
3. Zanotuj wygenerowane **ID rozszerzenia** (przyda się, jeśli zechcesz zawęzić
   CORS w `/api/allegro/fulfillment` do origin `chrome-extension://<id>`).

## Konfiguracja

- **Adres dobreprinty**: stała `dobreprinty_BASE` na górze `background.js`. Domyślnie
  `https://dobreprinty.pl`. Do testów lokalnych ustaw `http://localhost:3000` i
  przeładuj wtyczkę.
- **Mapowanie aukcji** (`produkt → oferta Allegro`): zarządzane po stronie
  dobreprinty (panel admina lub dashboard Convex, tabela `allegroOffers`). Wtyczka
  niczego tu nie konfiguruje — ofertę rozwiązuje serwer w `/api/allegro/prepare`.

## Utrzymanie — selektory checkoutu

Najbardziej kruchy element to **DOM checkoutu Allegro**, zwłaszcza geowidget
InPost. Wszystkie selektory są zebrane w jednym obiekcie `SELECTORS` na górze
`content.js`. Gdy coś przestanie się wypełniać:

1. Otwórz checkout Allegro, znajdź właściwe pole w DevTools.
2. Zaktualizuj odpowiednią tablicę kandydatów w `SELECTORS` (kolejność = priorytet).
3. Przeładuj wtyczkę w `chrome://extensions`.

Dla paczkomatu wtyczka świadomie tylko **wpisuje kod** w pole wyszukiwarki
geowidgetu (i zawsze pokazuje kod w panelu do skopiowania) — wybór punktu z listy
zostaw sobie, bo widget często odrzuca syntetyczne kliknięcia.

## Pliki

- `manifest.json` — uprawnienia (allegro.pl + dobreprinty.pl), content script, worker.
- `background.js` — pobiera payload z `/api/allegro/fulfillment` (omija page-CORS).
- `content.js` — czyta token, wypełnia pola, renderuje panel weryfikacyjny.
