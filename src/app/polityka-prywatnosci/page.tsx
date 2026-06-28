import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Polityka prywatności. DobrePrinty",
  description:
    "Polityka prywatności DobrePrinty. Jakie dane zbieramy, w jakim celu i jak je chronimy.",
};

export default function PolitykaPrywatnosciPage() {
  return (
    <LegalPage
      title="Polityka prywatności"
      intro="Wyjaśniamy, jakie dane osobowe zbieramy, do czego ich potrzebujemy i jakie masz prawa."
      updatedAt="20 maja 2026"
    >
      <h2>1. Administrator danych</h2>
      <p>
        Administratorem Twoich danych osobowych jest{" "}
        <strong>MYMIDWIFE sp. z o.o.</strong> z siedzibą przy ul. Kazimierza
        Tetmajera-Przerwy 10, 21-500 Biała Podlaska, wpisana do rejestru
        przedsiębiorców KRS pod numerem 0001220264, NIP 5372694237, REGON
        543833099, prowadząca serwis dobreprinty.pl. Kontakt:
        hej@dobreprinty.pl.
      </p>

      <h2>2. Zakres zbieranych danych</h2>
      <p>
        Przetwarzamy dane, które podajesz przy rejestracji konta, składaniu
        zamówienia oraz korzystaniu z usług:
      </p>
      <ul>
        <li>imię, nazwisko, e-mail, telefon, adres dostawy i faktury</li>
        <li>
          dane do druku (pliki graficzne), wyłącznie w celu realizacji zlecenia
        </li>
        <li>dane techniczne: IP, identyfikator sesji, dane przeglądarki</li>
      </ul>

      <h2>3. Cele przetwarzania</h2>
      <ul>
        <li>realizacja zamówień i obsługa posprzedażowa</li>
        <li>wystawianie faktur i obowiązki podatkowe</li>
        <li>obsługa reklamacji i kontakt z klientem</li>
        <li>analityka i poprawa działania serwisu (dane zanonimizowane)</li>
      </ul>

      <h2>4. Powierzanie danych drukarniom partnerskim</h2>
      <p>
        DobrePrinty działa jako pośrednik. Twoje pliki do druku oraz adres
        dostawy są przekazywane wybranej drukarni partnerskiej{" "}
        <strong>tylko w zakresie niezbędnym do realizacji zlecenia</strong>.
        Wszystkie nasze drukarnie podpisały umowę powierzenia danych zgodną z
        RODO i są audytowane raz na kwartał.
      </p>

      <h2>5. Twoje prawa</h2>
      <ul>
        <li>dostęp do danych, ich sprostowanie i usunięcie</li>
        <li>ograniczenie przetwarzania i sprzeciw</li>
        <li>przeniesienie danych</li>
        <li>skarga do Prezesa UODO</li>
      </ul>

      <h2>6. Pliki cookies</h2>
      <p>
        Używamy ciasteczek niezbędnych (logowanie, koszyk) oraz statystycznych
        (Plausible, bez identyfikatorów osobowych). Nie korzystamy z plików
        marketingowych bez Twojej zgody.
      </p>

      <h2>7. Kontakt</h2>
      <p>
        W sprawach prywatności napisz na <strong>privacy@dobreprinty.pl</strong>
        . Odpowiadamy w 72 godziny.
      </p>
    </LegalPage>
  );
}
