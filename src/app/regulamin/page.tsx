import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Regulamin. DobrePrinty",
  description:
    "Regulamin serwisu dobreprinty.pl. Zasady składania zamówień, realizacji druku przez drukarnie partnerskie i obsługi reklamacji.",
};

export default function RegulaminPage() {
  return (
    <LegalPage
      title="Regulamin"
      intro="Zasady korzystania z serwisu dobreprinty.pl, składania i realizacji zamówień oraz odpowiedzialności stron."
      updatedAt="20 maja 2026"
    >
      <h2>1. Definicje</h2>
      <ul>
        <li>
          <strong>DobrePrinty</strong>, czyli serwis dobreprinty.pl prowadzony
          przez MYMIDWIFE sp. z o.o. z siedzibą przy ul. Kazimierza
          Tetmajera-Przerwy 10, 21-500 Biała Podlaska, KRS 0001220264, NIP
          5372694237, REGON 543833099 (administrator danych osobowych).
        </li>
        <li>
          <strong>Klient</strong>, czyli osoba fizyczna, prawna lub jednostka
          organizacyjna składająca zamówienie.
        </li>
        <li>
          <strong>Drukarnia partnerska</strong>, czyli niezależny podmiot
          realizujący fizyczny druk po przekazaniu zlecenia przez DobrePrinty.
        </li>
      </ul>

      <h2>2. Model pośrednictwa</h2>
      <p>
        <strong>
          DobrePrinty działa jako pośrednik między Klientem a drukarniami
          partnerskimi.
        </strong>{" "}
        Otrzymujemy zamówienie, weryfikujemy plik, dobieramy drukarnię z sieci
        28 zweryfikowanych partnerów i przekazujemy zlecenie do produkcji.
        Klient zawiera umowę o świadczenie usług z DobrePrinty; wszelkie
        reklamacje rozpatrujemy my, nie drukarnia.
      </p>

      <h2>3. Weryfikacja drukarni</h2>
      <p>Każda drukarnia partnerska przed dopuszczeniem do sieci przechodzi:</p>
      <ul>
        <li>audyt jakości druku (testowe wydruki w 12 formatach)</li>
        <li>weryfikację terminowości (test serii 30 zamówień)</li>
        <li>audyt RODO i bezpieczeństwa danych</li>
        <li>kwartalne re-audyty utrzymujące status partnera</li>
      </ul>

      <h2>4. Zamówienia</h2>
      <p>
        Zamówienie składasz w konfiguratorze produktu, wybierając nakład i
        format. Cena pokazywana jest brutto i jest finalna; nie zawiera kosztów
        dostawy, które dobierane są na etapie podsumowania.
      </p>

      <h2>5. Płatności</h2>
      <ul>
        <li>BLIK, karta płatnicza, Przelewy24, Apple Pay, Google Pay</li>
        <li>Faktura proforma z 14-dniowym terminem dla klientów biznesowych</li>
        <li>Faktura VAT wystawiana automatycznie po opłaceniu zamówienia</li>
      </ul>

      <h2>6. Realizacja i dostawa</h2>
      <p>
        Czas produkcji jest widoczny przy każdym produkcie. Wysyłka odbywa się
        kurierem (DPD, InPost). List przewozowy jest na DobrePrinty, nie na
        drukarnię partnerską.
      </p>

      <h2>7. Reklamacje</h2>
      <p>
        Reklamacje przyjmujemy w 14 dni od otrzymania zamówienia na adres{" "}
        <strong>hej@dobreprinty.pl</strong>. Rozpatrujemy je w 7 dni roboczych.
        Jeśli wina leży po stronie drukarni partnerskiej, koszt ponownego druku
        pokrywamy my; to nasza umowa z partnerem.
      </p>

      <h2>8. Odstąpienie od umowy</h2>
      <p>
        Wydruki są produktem personalizowanym, więc nie podlegają standardowemu
        prawu odstąpienia w 14 dni. Anulować bezpłatnie można zamówienie do
        momentu wgrania danych do druku.
      </p>

      <h2>9. Postanowienia końcowe</h2>
      <p>
        W sprawach nieuregulowanych obowiązują przepisy prawa polskiego. Spory
        rozstrzyga sąd właściwy dla siedziby DobrePrinty, chyba że Klient jest
        konsumentem; wtedy stosuje się przepisy o właściwości sądu
        konsumenckiego.
      </p>
    </LegalPage>
  );
}
