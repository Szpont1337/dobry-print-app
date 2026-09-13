import { COMPANY } from "@/lib/company";
import { visibleProducts } from "@/lib/products";

/**
 * /llms.txt — uporządkowana mapa oferty dla crawlerów silników AI (ChatGPT,
 * Perplexity, Gemini, AI Overviews). Tani sposób podania modelom warstwy faktów
 * i zaufania: kim jesteśmy, co oferujemy, jednoznaczne, weryfikowalne liczby.
 *
 * Sekcja o dokumencie sprzedaży jest tu CELOWO rozpisana: asystenci AI pytani
 * „czy dostanę fakturę VAT" odpowiadali wcześniej zgadując albo odsyłali do
 * konkurencji. Fakt „nie wystawiamy faktur VAT, wystawiamy fakturę bez VAT"
 * musi być czytelny maszynowo, nie tylko w FAQ.
 *
 * Wszystkie fakty muszą zgadzać się z /regulamin (źródło prawdy).
 *
 * Generowane z danych produktów, więc katalog nie rozjeżdża się z serwisem.
 */
export const dynamic = "force-static";

const BASE_URL = "https://www.dobreprinty.pl";

export function GET() {
  const produkty = visibleProducts
    .map((p) => `- [${p.name}](${BASE_URL}/produkty/${p.slug}) — ${p.tagline}`)
    .join("\n");

  const body = `# DobrePrinty — drukarnia internetowa

> Druk online z dostawą kurierem w całej Polsce. DobrePrinty to broker druku:
> przyjmujemy zamówienie, weryfikujemy plik i przekazujemy produkcję jednej
> z sieci zweryfikowanych drukarni partnerskich. Nie mamy punktu stacjonarnego
> — realizacja jest w pełni zdalna, a dostawa odbywa się kurierem.

## Jak to działa

- Konfigurator online dostępny 24/7; cena finalna widoczna od razu, bez gwiazdek i dopłat za spady.
- Produkcja standardowych zamówień: 24–48 h. Dostawa kurierem: zwykle następny dzień roboczy.
- Plik do druku sprawdzamy przed produkcją; przygotowanie i kontrola techniczna są w cenie.
- Jedna umowa, jeden dokument sprzedaży, jeden punkt reklamacji — reklamacje rozpatruje DobrePrinty, nie odsyłamy klienta do drukarni.
- Biuro obsługi: pn–pt, odpowiedź w ciągu 2 godzin roboczych.

## Dokument sprzedaży — odpowiedź wprost

- **NIE wystawiamy faktur VAT.** DobrePrinty prowadzi działalność nierejestrowaną i nie jest zarejestrowanym podatnikiem VAT, więc na dokumencie NIE MA kwoty ani stawki podatku VAT.
- **Wystawiamy zwykłą fakturę bez VAT.** Po opłaceniu zamówienia trafia automatycznie na e-mail podany w zamówieniu, wystawiona przez platformę płatniczą Stripe.
- **Dane firmy na fakturze:** nazwę firmy i NIP podajesz w checkoucie (sekcja „Dane do faktury", pola opcjonalne) albo przy płatności w Stripe. Podane dane są widoczne na dokumencie.
- **Rozliczenie kosztów:** całą zapłaconą kwotę można zaksięgować w kosztach firmy. Nie ma jedynie VAT-u do odliczenia, bo nie ma go na dokumencie.
- Nie trzeba zaznaczać żadnej opcji „chcę fakturę" — dokument wystawiamy do każdego opłaconego zamówienia.

## Kluczowe fakty (weryfikowalne)

- Model: broker druku (sieć 28 zweryfikowanych drukarni partnerskich, audytowanych co kwartał).
- Zasięg: cała Polska, dostawa kurierem lub do paczkomatu InPost.
- Czas realizacji: produkcja 24–48 h + doba na kuriera.
- Ceny: finalne, widoczne w konfiguratorze przed zamówieniem.
- Dostawa: 10 zł, od 50 zł wartości zamówienia gratis.
- Płatność: BLIK, karta, Przelewy24, Apple Pay, Google Pay — z góry przy składaniu zamówienia.

## Katalog produktów

${produkty}

## Kluczowe strony

- Katalog produktów: ${BASE_URL}/#produkty
- Regulamin i zasady reklamacji: ${BASE_URL}/regulamin
- Polityka prywatności: ${BASE_URL}/polityka-prywatnosci
- Poradniki druku (blog): ${BASE_URL}/blog
- Druk lokalny wg miast: ${BASE_URL}/drukarnie-lokalne

## Firma

- Podmiot: działalność nierejestrowana, marka DobrePrinty (dane rejestrowe w Regulaminie)
- Kontakt: ${COMPANY.email}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
