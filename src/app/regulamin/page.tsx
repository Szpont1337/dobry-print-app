import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { COMPANY } from "@/lib/company";

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
      updatedAt="11 września 2026"
    >
      <h2>1. Definicje</h2>
      <ul>
        <li>
          <strong>DobrePrinty</strong>, czyli serwis dobreprinty.pl prowadzony przez {COMPANY.owner}
          , {COMPANY.address} (administrator danych osobowych), w ramach działalności
          nierejestrowanej w rozumieniu art. 5 ustawy z dnia 6 marca 2018 r. – Prawo
          przedsiębiorców. DobrePrinty nie jest zarejestrowanym podatnikiem VAT (pkt 7).
        </li>
        <li>
          <strong>Klient</strong>, czyli osoba fizyczna, prawna lub jednostka organizacyjna
          składająca zamówienie.
        </li>
        <li>
          <strong>Konsument</strong>, czyli Klient będący osobą fizyczną zawierającą umowę
          niezwiązaną bezpośrednio z jego działalnością gospodarczą lub zawodową.
        </li>
        <li>
          <strong>Drukarnia partnerska</strong>, czyli niezależny podmiot realizujący fizyczny druk
          po przekazaniu zlecenia przez DobrePrinty.
        </li>
      </ul>

      <h2>2. Model pośrednictwa</h2>
      <p>
        <strong>
          DobrePrinty działa jako pośrednik między Klientem a drukarniami partnerskimi.
        </strong>{" "}
        Otrzymujemy zamówienie, weryfikujemy plik pod kątem technicznym, dobieramy drukarnię z sieci
        zweryfikowanych partnerów i przekazujemy zlecenie do produkcji. Klient zawiera umowę o
        świadczenie usług z DobrePrinty; wszelkie reklamacje rozpatrujemy my, nie drukarnia.
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
        Zamówienie składasz w konfiguratorze produktu, wybierając nakład i format. Cena pokazywana
        jest ceną końcową do zapłaty (DobrePrinty nie dolicza podatku VAT — pkt 7); nie zawiera
        kosztów dostawy, które dobierane są na etapie podsumowania.
      </p>

      <h2>5. Pliki do druku i odpowiedzialność za treść</h2>
      <p>
        DobrePrinty nie wykonuje projektów graficznych. Nasza usługa obejmuje wyłącznie techniczne
        przygotowanie (dostosowanie) do druku pliku dostarczonego przez Klienta. Dlatego oczekujemy
        plików przygotowanych zgodnie ze specyfikacją.
      </p>
      <ul>
        <li>
          Klient dostarcza pliki do druku i ponosi wyłączną odpowiedzialność za ich treść oraz
          poprawność — w tym pisownię, dane, ceny, układ graficzny, rozdzielczość, spady i marginesy
          bezpieczne oraz przestrzeń barwną (CMYK).
        </li>
        <li>
          Weryfikacja pliku po stronie DobrePrinty ma charakter wyłącznie techniczny (m.in. format,
          rozdzielczość, spady). Nie sprawdzamy ani nie korygujemy treści merytorycznej, ortografii
          czy poprawności danych.
        </li>
        <li>
          Drukujemy zgodnie z plikiem zaakceptowanym przez Klienta. Zatwierdzenie projektu lub
          podglądu przez Klienta oznacza akceptację jego zawartości — DobrePrinty nie odpowiada za
          wady wynikające z błędów w materiałach dostarczonych przez Klienta.
        </li>
        <li>
          Jeżeli plik nie spełnia wymogów technicznych, możemy wstrzymać realizację do czasu
          dostarczenia poprawnego pliku; wydłuża to termin realizacji.
        </li>
      </ul>

      <h2>6. Usługi dodatkowe (opcjonalne)</h2>
      <p>
        Na etapie zamówienia Klient może dobrać płatne usługi dodatkowe. Ich wybór jest dobrowolny —
        rezygnacja z nich oznacza, że zastosowanie mają pkt 5 i 9.
      </p>
      <ul>
        <li>
          <strong>Wydruk próbny (proof)</strong> — fizyczny wydruk kontrolny do zatwierdzenia
          kolorystyki i treści przed produkcją nakładu. Wierne odwzorowanie kolorów gwarantujemy
          wyłącznie na podstawie zamówionego proofa; bez niego obowiązuje tolerancja CMYK (pkt 9), a
          reklamacje dotyczące samej kolorystyki są wyłączone.
        </li>
        <li>
          <strong>Techniczne przygotowanie / korekta pliku do druku</strong> — odpłatne dostosowanie
          pliku Klienta do wymogów druku (spady, format, rozdzielczość, konwersja barw). Usługa nie
          obejmuje projektowania graficznego, redakcji ani korekty treści.
        </li>
      </ul>

      <h2>7. Płatności i dokumenty sprzedaży</h2>
      <ul>
        <li>BLIK, karta płatnicza, Przelewy24, Apple Pay, Google Pay</li>
        <li>
          Rachunek (potwierdzenie zapłaty) generowany automatycznie przez platformę płatniczą Stripe
          i wysyłany na adres e-mail Klienta po zaksięgowaniu płatności
        </li>
      </ul>
      <p>
        DobrePrinty prowadzi działalność nierejestrowaną i nie jest zarejestrowanym podatnikiem VAT.
        Nie wystawiamy faktur VAT. Jedynym dokumentem potwierdzającym zakup jest rachunek wystawiany
        przez platformę Stripe (operatora płatności), który zawiera dane sprzedawcy, Klienta, opis
        zamówienia i zapłaconą kwotę. Ceny w serwisie nie zawierają podatku VAT — nie ma podatku do
        odliczenia. Rachunek
        trafia na adres e-mail podany w zamówieniu; w razie potrzeby ponownej wysyłki napisz na{" "}
        <strong>{COMPANY.email}</strong>.
      </p>

      <h2>8. Realizacja i dostawa</h2>
      <p>
        Czas produkcji podany przy produkcie jest orientacyjny i liczony od zaksięgowania płatności
        oraz zaakceptowania pliku do druku; nie obejmuje czasu dostawy. Wysyłka odbywa się kurierem
        lub do paczkomatu (DPD, InPost, DHL). List przewozowy jest na DobrePrinty, nie na drukarnię
        partnerską.
      </p>
      <p>
        DobrePrinty nie ponosi odpowiedzialności za opóźnienia i zdarzenia powstałe po stronie
        przewoźnika (kurier, paczkomat) ani za okoliczności niezależne od DobrePrinty, w tym siłę
        wyższą (m.in. awarie, zdarzenia losowe, działania organów władzy). W takich przypadkach
        termin realizacji ulega odpowiedniemu przedłużeniu.
      </p>

      <h2>9. Tolerancje poligraficzne</h2>
      <p>Poniższe różnice mieszczą się w normach poligraficznych i nie stanowią wady:</p>
      <ul>
        <li>
          różnice kolorystyczne między podglądem na ekranie (RGB) a wydrukiem (CMYK) oraz między
          kolejnymi nakładami i partiami produkcyjnymi;
        </li>
        <li>tolerancja krojenia i pozycjonowania do ±2 mm;</li>
        <li>
          nieznaczne różnice odcienia, gramatury i faktury papieru wynikające z dostępności surowca
          u drukarni partnerskiej;
        </li>
        <li>
          przy nakładach masowych — naddatki lub niedodatki nakładu do 5% zamówionej ilości (norma
          poligraficzna); rozliczamy faktycznie dostarczoną ilość.
        </li>
      </ul>
      <p>
        Wierne odwzorowanie kolorów gwarantuje wyłącznie zamówiony wydruk próbny (proof) (pkt 6).
        Bez proofa obowiązuje tolerancja CMYK, a reklamacje dotyczące samej kolorystyki są
        wyłączone. Zalecamy dostarczanie plików w CMYK z profilem kolorystycznym; kolory spoza
        gamutu CMYK mogą zostać odwzorowane z odchyleniem.
      </p>

      <h2>10. Reklamacje</h2>
      <p>
        Reklamacje przyjmujemy w 14 dni od otrzymania zamówienia na adres{" "}
        <strong>{COMPANY.email}</strong>. Rozpatrujemy je w 7 dni roboczych. Podstawą rozpatrzenia
        jest udokumentowanie wady (np. zdjęcia) oraz — w miarę możliwości — udostępnienie
        reklamowanego nakładu.
      </p>
      <p>
        Podstawowym sposobem załatwienia uznanej reklamacji jest ponowny druk (wymiana) wadliwego
        zakresu. Zwrot ceny następuje wyłącznie, gdy ponowny druk jest niemożliwy albo nieskuteczny.
        Reklamacja obejmuje wyłącznie egzemplarze faktycznie wadliwe, a nie cały nakład — dodruk lub
        zwrot rozliczamy proporcjonalnie. Jeśli wina leży po stronie drukarni partnerskiej, koszt
        pokrywamy my; to nasza umowa z partnerem.
      </p>
      <p>
        <strong>Uszkodzenia transportowe:</strong> Klient sprawdza przesyłkę przy odbiorze. Podstawą
        reklamacji transportowej jest udokumentowanie uszkodzenia (zdjęcia opakowania i zawartości),
        a przy uszkodzeniu widocznym — spisanie protokołu szkody z kurierem.
      </p>
      <p>
        Reklamacji nie podlegają: różnice mieszczące się w tolerancjach poligraficznych (pkt 9) oraz
        wady wynikające z błędów w plikach lub materiałach dostarczonych przez Klienta (pkt 5).
      </p>
      <p>
        <strong>Zwrot środków:</strong> jeśli reklamacja kończy się zwrotem ceny (w całości lub
        proporcjonalnie), zwracamy ją przez platformę Stripe na metodę płatności użytą przy
        zamówieniu, w terminie do 14 dni od uznania reklamacji. Potwierdzeniem zwrotu jest dokument
        wygenerowany przez Stripe. Ponieważ DobrePrinty prowadzi działalność nierejestrowaną i nie
        wystawia faktur VAT (pkt 7), nie wystawiamy również faktur korygujących.
      </p>
      <p>
        Wobec Klientów niebędących konsumentami (przedsiębiorców) odpowiedzialność DobrePrinty z
        tytułu rękojmi zostaje wyłączona (art. 558 § 1 Kodeksu cywilnego). Powyższe wyłączenia i
        ograniczenia nie naruszają praw konsumenta wynikających z bezwzględnie obowiązujących
        przepisów.
      </p>

      <h2>11. Ograniczenie odpowiedzialności</h2>
      <p>
        W zakresie dopuszczalnym przez prawo odpowiedzialność DobrePrinty wobec Klientów niebędących
        konsumentami ograniczona jest do wartości zamówienia (kwoty faktycznie zapłaconej za dane
        zamówienie) i nie obejmuje utraconych korzyści ani szkód pośrednich (m.in. przestojów,
        utraty kontraktów, roszczeń osób trzecich). Ograniczenie nie dotyczy szkód wyrządzonych
        umyślnie.
      </p>
      <p>
        Postanowienia niniejszego punktu nie ograniczają odpowiedzialności DobrePrinty wobec
        konsumentów w zakresie wynikającym z przepisów bezwzględnie obowiązujących.
      </p>

      <h2>12. Odstąpienie od umowy</h2>
      <p>
        Wydruki są produktem personalizowanym na indywidualne zamówienie, więc zgodnie z art. 38
        ustawy o prawach konsumenta nie podlegają standardowemu prawu odstąpienia w 14 dni. Anulować
        bezpłatnie można zamówienie do momentu wgrania danych do druku; wpłacone środki zwracamy
        przez platformę Stripe na pierwotną metodę płatności.
      </p>

      <h2>13. Postanowienia końcowe</h2>
      <p>
        W sprawach nieuregulowanych obowiązują przepisy prawa polskiego. Spory z Klientami
        niebędącymi konsumentami rozstrzyga sąd właściwy dla siedziby DobrePrinty; w przypadku
        konsumentów właściwość sądu ustala się zgodnie z przepisami. DobrePrinty może zmienić
        regulamin z ważnych przyczyn; do zamówień złożonych przed zmianą stosuje się regulamin w
        brzmieniu obowiązującym w dniu złożenia zamówienia.
      </p>
    </LegalPage>
  );
}
