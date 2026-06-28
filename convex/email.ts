"use node";

import { v } from "convex/values";
import nodemailer from "nodemailer";

import { internal } from "./_generated/api";
import type { Doc } from "./_generated/dataModel";
import { internalAction } from "./_generated/server";
import {
  BRAND,
  callout,
  escapeHtml,
  plainBlock,
  renderShell,
} from "./mailShell";

type Order = Doc<"orders">;
type StatusKind =
  | "pending"
  | "in_production"
  | "ready_to_ship"
  | "shipped"
  | "awaiting_pickup"
  | "completed";

const formatPLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  minimumFractionDigits: 2,
});
const formatQty = new Intl.NumberFormat("pl-PL");
const formatDate = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function shortId(id: string): string {
  return id.slice(-8).toUpperCase();
}

const ORDER_FOOTER =
  "DobrePrinty sp. z o.o. · hej@dobreprinty.pl<br>Otrzymujesz tę wiadomość, bo złożyłeś zamówienie w dobreprinty.pl.";

const SITE_URL = (process.env.SITE_URL ?? "https://dobreprinty.pl").replace(
  /\/$/,
  "",
);

function payUrl(order: Order): string {
  return `${SITE_URL}/api/stripe/pay?order=${order._id}`;
}

function detailsBox(order: Order): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid ${BRAND.border};border-radius:14px;background:${BRAND.background};margin:0 0 24px">
      <tr>
        <td style="padding:18px 20px 14px;border-bottom:1px solid ${BRAND.border}">
          <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:0.14em;color:${BRAND.muted}">Zamówienie</p>
          <p style="margin:4px 0 0;font-size:18px;font-weight:600;color:${BRAND.foreground};font-family:'IBM Plex Mono',ui-monospace,monospace">#${shortId(order._id)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 20px">
          <p style="margin:0;font-size:16px;font-weight:600;color:${BRAND.foreground}">${escapeHtml(order.productName)}</p>
          <p style="margin:4px 0 0;font-size:14px;color:${BRAND.muted}">${formatQty.format(order.quantity)} szt. · ${escapeHtml(order.formatLabel)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:0 20px 16px">
          ${
            order.deliveryMethod === "parcel_locker"
              ? `<p style="margin:0;font-size:13px;color:${BRAND.muted}">Paczkomat InPost</p>
            <p style="margin:4px 0 0;font-size:14px;color:${BRAND.foreground};line-height:1.5">
              <strong>${escapeHtml(order.parcelLockerId ?? "")}</strong>${order.parcelLockerAddress ? `<br>${escapeHtml(order.parcelLockerAddress)}` : ""}${order.parcelLockerDescription ? `<br><span style="color:${BRAND.muted}">${escapeHtml(order.parcelLockerDescription)}</span>` : ""}
            </p>`
              : `<p style="margin:0;font-size:13px;color:${BRAND.muted}">Adres dostawy</p>
            <p style="margin:4px 0 0;font-size:14px;color:${BRAND.foreground};line-height:1.5">
              ${escapeHtml(order.shippingStreet ?? "")}<br>
              ${escapeHtml(order.shippingPostalCode ?? "")} ${escapeHtml(order.shippingCity ?? "")}<br>
              ${escapeHtml(order.shippingCountry ?? "")}
            </p>`
          }
        </td>
      </tr>
      <tr>
        <td style="padding:14px 20px 18px;border-top:1px solid ${BRAND.border}">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="font-size:13px;color:${BRAND.muted}">Wysyłka</td>
              <td align="right" style="font-size:14px;color:${BRAND.foreground};font-variant-numeric:tabular-nums">${order.shippingFee && order.shippingFee > 0 ? formatPLN.format(order.shippingFee) : "Gratis"}</td>
            </tr>
            <tr>
              <td style="padding-top:8px;font-size:14px;color:${BRAND.muted}">Razem brutto</td>
              <td align="right" style="padding-top:8px;font-size:18px;font-weight:600;color:${BRAND.foreground};font-variant-numeric:tabular-nums">${formatPLN.format(order.grossTotal)}</td>
            </tr>
            <tr>
              <td style="padding-top:4px;font-size:12px;color:${BRAND.muted}">w tym VAT 23%</td>
              <td align="right" style="padding-top:4px;font-size:12px;color:${BRAND.muted};font-variant-numeric:tabular-nums">${formatPLN.format(order.vatTotal)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

function deliveryLine(order: Order): string {
  if (order.deliveryMethod === "parcel_locker") {
    const id = order.parcelLockerId ?? "";
    const addr = order.parcelLockerAddress
      ? ` (${order.parcelLockerAddress})`
      : "";
    return `Paczkomat InPost: ${id}${addr}`;
  }
  return `Adres dostawy: ${order.shippingStreet ?? ""}, ${order.shippingPostalCode ?? ""} ${order.shippingCity ?? ""}`;
}

function plainSummary(order: Order, headline: string, body: string): string {
  return [
    headline,
    "",
    body,
    "",
    `Zamówienie #${shortId(order._id)}`,
    `Produkt: ${order.productName}`,
    `Nakład: ${formatQty.format(order.quantity)} szt. · ${order.formatLabel}`,
    deliveryLine(order),
    `Razem brutto: ${formatPLN.format(order.grossTotal)} (VAT 23%: ${formatPLN.format(order.vatTotal)})`,
    "",
    "DobrePrinty · hej@dobreprinty.pl",
  ].join("\n");
}

function summaryEmail(order: Order) {
  const headline = `Mamy Twoje zamówienie #${shortId(order._id)}.`;
  const intro =
    "Dziękujemy za zlecenie. W ciągu kilkunastu minut sprawdzamy plik i dobieramy drukarnię partnerską z naszej sieci.";
  const followUp = [
    callout(
      "Co dalej: jeśli plik nie wymaga poprawek, w ciągu 24 godzin ruszamy z produkcją. Odezwiemy się tylko wtedy, kiedy coś będzie wymagać Twojej decyzji.",
    ),
    plainBlock(
      `Status zamówienia możesz śledzić w panelu klienta: <a href="https://dobreprinty.pl/konto" style="color:${BRAND.primary};text-decoration:underline">dobreprinty.pl/konto</a>.`,
    ),
  ].join("");

  return {
    subject: `Zamówienie #${shortId(order._id)} przyjęte`,
    preheader: `Dziękujemy. Sprawdzamy plik i ruszamy z produkcją w ciągu 24 godzin.`,
    html: renderShell({
      preheader: `Mamy Twoje zamówienie #${shortId(order._id)} i ruszamy z produkcją w ciągu 24 godzin.`,
      headline,
      intro,
      detailsHtml: detailsBox(order),
      followUpHtml: followUp,
      signature: "Pozdrawiamy,<br>zespół DobrePrinty",
      footerNote: ORDER_FOOTER,
    }),
    text: plainSummary(order, headline, intro),
  };
}

function inProductionEmail(order: Order) {
  const headline = `Drukujemy Twoje zamówienie #${shortId(order._id)}.`;
  const intro =
    "Plik jest zatwierdzony, drukarnia partnerska właśnie pracuje nad Twoim zleceniem.";
  const followUp = [
    callout(
      "Standardowy czas produkcji to 24 do 48 godzin. Jak tylko paczka będzie u kuriera, dostaniesz kolejną wiadomość z numerem listu przewozowego.",
    ),
  ].join("");

  return {
    subject: `Drukujemy zamówienie #${shortId(order._id)}`,
    preheader: `Twoje ${order.productName} są właśnie produkowane.`,
    html: renderShell({
      preheader: `Drukarnia partnerska pracuje nad Twoim zamówieniem.`,
      headline,
      intro,
      detailsHtml: detailsBox(order),
      followUpHtml: followUp,
      signature: "Wracamy z aktualizacją po wysyłce.<br>zespół DobrePrinty",
      footerNote: ORDER_FOOTER,
    }),
    text: plainSummary(order, headline, intro),
  };
}

function readyToShipEmail(order: Order) {
  const headline = `Pakujemy zamówienie #${shortId(order._id)}.`;
  const intro =
    "Druk gotowy, kompletujemy paczkę. W ciągu najbliższych godzin nadamy ją u przewoźnika i wyślemy Ci numer listu przewozowego.";
  const followUp = [
    callout(
      "Status zmieni się na „Wysłane” jak tylko paczka opuści magazyn. Wtedy dostaniesz osobnego maila z numerem śledzenia.",
    ),
    plainBlock(
      `Coś trzeba doprecyzować przed wysyłką? Napisz na <a href="mailto:hej@dobreprinty.pl" style="color:${BRAND.primary};text-decoration:underline">hej@dobreprinty.pl</a>.`,
    ),
  ].join("");

  return {
    subject: `Pakujemy zamówienie #${shortId(order._id)}`,
    preheader: `Twoje ${order.productName} czekają na kuriera.`,
    html: renderShell({
      preheader: `Druk gotowy, przygotowujemy paczkę do wysyłki.`,
      headline,
      intro,
      detailsHtml: detailsBox(order),
      followUpHtml: followUp,
      signature: "Wracamy z numerem listu przewozowego.<br>zespół DobrePrinty",
      footerNote: ORDER_FOOTER,
    }),
    text: plainSummary(order, headline, intro),
  };
}

function shippedEmail(order: Order) {
  const headline = `Paczka jest w drodze.`;
  const intro = `Twoje zamówienie #${shortId(order._id)} przed chwilą trafiło do kuriera. Standardowo dostawa zajmuje jeden dzień roboczy.`;
  const trackingBlock = order.trackingNumber
    ? callout(
        `Przewoźnik: <strong>${escapeHtml(order.carrier ?? "")}</strong><br>Numer listu przewozowego: <strong>${escapeHtml(order.trackingNumber)}</strong>`,
      )
    : "";
  const deliveryDest =
    order.deliveryMethod === "parcel_locker"
      ? `Paczkomat <strong>${escapeHtml(order.parcelLockerId ?? "")}</strong>${order.parcelLockerAddress ? ` · ${escapeHtml(order.parcelLockerAddress)}` : ""}`
      : `<strong>${escapeHtml(order.shippingStreet ?? "")}, ${escapeHtml(order.shippingPostalCode ?? "")} ${escapeHtml(order.shippingCity ?? "")}</strong>`;
  const followUp = [
    trackingBlock,
    callout(
      `Dostawa: ${deliveryDest}.${order.trackingNumber ? "" : " Numer listu przewozowego dostaniesz osobnym mailem od kuriera w ciągu godziny."}`,
    ),
    plainBlock(
      `Jeśli coś trzeba zmienić, daj znać na <a href="mailto:hej@dobreprinty.pl" style="color:${BRAND.primary};text-decoration:underline">hej@dobreprinty.pl</a>.`,
    ),
  ].join("");

  const preheaderTarget =
    order.deliveryMethod === "parcel_locker"
      ? `paczkomatu ${order.parcelLockerId ?? ""}`
      : (order.shippingCity ?? "");

  return {
    subject: `Wysłaliśmy zamówienie #${shortId(order._id)}`,
    preheader: `Paczka jedzie do ${escapeHtml(preheaderTarget)}.`,
    html: renderShell({
      preheader: `Paczka wyruszyła. Dostawa zwykle następnego dnia roboczego.`,
      headline,
      intro,
      detailsHtml: detailsBox(order),
      followUpHtml: followUp,
      signature: "Do zobaczenia przy kolejnym druku.<br>zespół DobrePrinty",
      footerNote: ORDER_FOOTER,
    }),
    text: plainSummary(order, headline, intro),
  };
}

function awaitingPickupEmail(order: Order) {
  const headline = `Paczka czeka na odbiór.`;
  const intro = `Twoje zamówienie #${shortId(order._id)} dotarło do punktu odbioru i czeka na Ciebie. Odbierz je, podając kod odbioru poniżej.`;

  const pickupRows = [
    order.pickupPointAddress
      ? `Punkt odbioru: <strong>${escapeHtml(order.pickupPointAddress)}</strong>`
      : "",
    order.pickupCode
      ? `Kod odbioru: <strong style="font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:18px;letter-spacing:0.08em">${escapeHtml(order.pickupCode)}</strong>`
      : "",
    order.pickupPhone
      ? `Numer telefonu odbiorcy: <strong>${escapeHtml(order.pickupPhone)}</strong>`
      : "",
  ]
    .filter(Boolean)
    .join("<br>");

  const followUp = [
    pickupRows ? callout(pickupRows) : "",
    plainBlock(
      `Masz pytania o odbiór? Napisz na <a href="mailto:hej@dobreprinty.pl" style="color:${BRAND.primary};text-decoration:underline">hej@dobreprinty.pl</a>.`,
    ),
  ]
    .filter(Boolean)
    .join("");

  const text = [
    headline,
    "",
    intro,
    "",
    order.pickupPointAddress
      ? `Punkt odbioru: ${order.pickupPointAddress}`
      : "",
    order.pickupCode ? `Kod odbioru: ${order.pickupCode}` : "",
    order.pickupPhone ? `Numer telefonu odbiorcy: ${order.pickupPhone}` : "",
    "",
    `Zamówienie #${shortId(order._id)}`,
    `Produkt: ${order.productName}`,
    `Nakład: ${formatQty.format(order.quantity)} szt. · ${order.formatLabel}`,
    "",
    "DobrePrinty · hej@dobreprinty.pl",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `Zamówienie #${shortId(order._id)} czeka na odbiór`,
    preheader: `Twoje ${order.productName} czekają w punkcie odbioru.`,
    html: renderShell({
      preheader: `Paczka dotarła do punktu odbioru. Użyj kodu odbioru.`,
      headline,
      intro,
      detailsHtml: detailsBox(order),
      followUpHtml: followUp,
      signature: "Do zobaczenia przy kolejnym druku.<br>zespół DobrePrinty",
      footerNote: ORDER_FOOTER,
    }),
    text,
  };
}

function completedEmail(order: Order) {
  const headline = `Zamówienie #${shortId(order._id)} odebrane.`;
  const intro =
    "Paczka dotarła, a my zamykamy zamówienie po naszej stronie. Mamy nadzieję, że jakość spełnia Twoje oczekiwania.";
  const followUp = [
    callout(
      `Zadowolony z druku? Poświęć 30 sekund i wystaw opinię na Trustpilot. Za <strong>wystawienie opinii</strong> dajemy Ci <strong>10% rabatu na następne zamówienie</strong> - po opublikowaniu recenzji odpowiedz na tego maila, a wyślemy Ci kod.`,
    ),
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:18px 0 4px"><tr><td style="background:${BRAND.primary};border-radius:12px"><a href="https://pl.trustpilot.com/review/dobreprinty.pl" style="display:inline-block;padding:12px 22px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600">Wystaw opinię na Trustpilot</a></td></tr></table>`,
    plainBlock(
      `Jeśli coś jest nie tak, napisz na <a href="mailto:hej@dobreprinty.pl" style="color:${BRAND.primary};text-decoration:underline">hej@dobreprinty.pl</a>. Rozpatrujemy zgłoszenie w 7 dni roboczych.`,
    ),
    plainBlock(
      `Kolejne zamówienie? Dane do faktury i adres są zapisane w panelu klienta - następny druk to dosłownie cztery kliknięcia na <a href="https://dobreprinty.pl/" style="color:${BRAND.primary};text-decoration:underline">dobreprinty.pl</a>.`,
    ),
  ].join("");

  const text = [
    headline,
    "",
    intro,
    "",
    "Zadowolony z druku? Wystaw opinię na Trustpilot i odbierz 10% rabatu na następne zamówienie:",
    "https://pl.trustpilot.com/review/dobreprinty.pl",
    "Po opublikowaniu recenzji odpowiedz na tego maila, a wyślemy Ci kod zniżkowy.",
    "",
    "Reklamacje: hej@dobreprinty.pl (rozpatrujemy w 7 dni roboczych).",
    "",
    `Zamówienie #${shortId(order._id)}`,
    `Produkt: ${order.productName}`,
    `Nakład: ${formatQty.format(order.quantity)} szt. · ${order.formatLabel}`,
    `Razem brutto: ${formatPLN.format(order.grossTotal)} (VAT 23%: ${formatPLN.format(order.vatTotal)})`,
    "",
    "DobrePrinty · hej@dobreprinty.pl",
  ].join("\n");

  return {
    subject: `Zamówienie #${shortId(order._id)} odebrane - zostaw opinię i odbierz 10% rabatu`,
    preheader: `Dziękujemy za zaufanie. Zostaw opinię i odbierz 10% rabatu.`,
    html: renderShell({
      preheader: `Zamknęliśmy Twoje zamówienie. Zostaw opinię i odbierz 10% rabatu.`,
      headline,
      intro,
      detailsHtml: detailsBox(order),
      followUpHtml: followUp,
      signature: "Dziękujemy.<br>zespół DobrePrinty",
      footerNote: ORDER_FOOTER,
    }),
    text,
  };
}

function paymentReminderEmail(order: Order, reminderNumber: number) {
  const last = reminderNumber >= 3;
  const headline = last
    ? `Ostatnie przypomnienie o płatności #${shortId(order._id)}.`
    : `Dokończ płatność za zamówienie #${shortId(order._id)}.`;
  const intro = last
    ? "Twoje zamówienie wciąż czeka na opłacenie. Opłać je teraz, żebyśmy mogli ruszyć z drukiem - w przeciwnym razie wkrótce automatycznie je anulujemy."
    : "Zauważyliśmy, że Twoje zamówienie nie zostało jeszcze opłacone. Dokończ płatność, a od razu sprawdzimy plik i ruszymy z produkcją.";

  const followUp = [
    callout(
      `Do zapłaty: <strong>${formatPLN.format(order.grossTotal)}</strong> brutto. Płatność zajmuje chwilę - BLIK, karta, Przelewy24, Apple Pay lub Google Pay.`,
    ),
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:18px 0 4px"><tr><td style="background:${BRAND.primary};border-radius:12px"><a href="${payUrl(order)}" style="display:inline-block;padding:12px 22px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600">Zapłać teraz</a></td></tr></table>`,
    plainBlock(
      `Jeśli to pomyłka albo masz pytania, napisz na <a href="mailto:hej@dobreprinty.pl" style="color:${BRAND.primary};text-decoration:underline">hej@dobreprinty.pl</a>.`,
    ),
  ].join("");

  const text = [
    headline,
    "",
    intro,
    "",
    `Do zapłaty: ${formatPLN.format(order.grossTotal)} brutto.`,
    `Opłać zamówienie: ${payUrl(order)}`,
    "",
    `Zamówienie #${shortId(order._id)}`,
    `Produkt: ${order.productName}`,
    `Nakład: ${formatQty.format(order.quantity)} szt. · ${order.formatLabel}`,
    "",
    "DobrePrinty · hej@dobreprinty.pl",
  ].join("\n");

  return {
    subject: last
      ? `Ostatnie przypomnienie: opłać zamówienie #${shortId(order._id)}`
      : `Dokończ płatność za zamówienie #${shortId(order._id)}`,
    preheader: `Do zapłaty ${formatPLN.format(order.grossTotal)}. Opłać, żebyśmy ruszyli z drukiem.`,
    html: renderShell({
      preheader: last
        ? `Ostatnie przypomnienie - opłać zamówienie, zanim je anulujemy.`
        : `Twoje zamówienie czeka na opłacenie.`,
      headline,
      intro,
      detailsHtml: detailsBox(order),
      followUpHtml: followUp,
      signature: "Pozdrawiamy,<br>zespół DobrePrinty",
      footerNote: ORDER_FOOTER,
    }),
    text,
  };
}

function adminNotificationEmail(order: Order) {
  const headline = `Nowe opłacone zamówienie #${shortId(order._id)}`;
  const intro = `Klient właśnie zapłacił. Plik czeka na weryfikację, a zamówienie na uruchomienie produkcji.`;

  const contactRow = `
    <tr>
      <td style="padding:14px 20px;border-top:1px solid ${BRAND.border}">
        <p style="margin:0;font-size:13px;text-transform:uppercase;letter-spacing:0.14em;color:${BRAND.muted}">Klient</p>
        <p style="margin:6px 0 0;font-size:14px;color:${BRAND.foreground};line-height:1.5">
          <strong>${escapeHtml(order.customerName)}</strong><br>
          <a href="mailto:${escapeHtml(order.customerEmail)}" style="color:${BRAND.primary};text-decoration:underline">${escapeHtml(order.customerEmail)}</a><br>
          <a href="tel:${escapeHtml(order.customerPhone)}" style="color:${BRAND.foreground};text-decoration:none">${escapeHtml(order.customerPhone)}</a>
          ${order.companyName ? `<br><span style="color:${BRAND.muted}">${escapeHtml(order.companyName)}${order.taxId ? ` · NIP ${escapeHtml(order.taxId)}` : ""}</span>` : ""}
        </p>
      </td>
    </tr>`;

  const sourceRow = order.source
    ? `
    <tr>
      <td style="padding:0 20px 16px">
        <p style="margin:0;font-size:12px;color:${BRAND.muted}">Źródło: ${escapeHtml(order.source)}</p>
      </td>
    </tr>`
    : "";

  const detailsHtml = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid ${BRAND.border};border-radius:14px;background:${BRAND.background};margin:0 0 24px">
      <tr>
        <td style="padding:18px 20px 14px;border-bottom:1px solid ${BRAND.border}">
          <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:0.14em;color:${BRAND.muted}">Zamówienie</p>
          <p style="margin:4px 0 0;font-size:18px;font-weight:600;color:${BRAND.foreground};font-family:'IBM Plex Mono',ui-monospace,monospace">#${shortId(order._id)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 20px">
          <p style="margin:0;font-size:16px;font-weight:600;color:${BRAND.foreground}">${escapeHtml(order.productName)}</p>
          <p style="margin:4px 0 0;font-size:14px;color:${BRAND.muted}">${formatQty.format(order.quantity)} szt. · ${escapeHtml(order.formatLabel)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:0 20px 16px">
          ${
            order.deliveryMethod === "parcel_locker"
              ? `<p style="margin:0;font-size:13px;color:${BRAND.muted}">Paczkomat InPost</p>
            <p style="margin:4px 0 0;font-size:14px;color:${BRAND.foreground};line-height:1.5">
              <strong>${escapeHtml(order.parcelLockerId ?? "")}</strong>${order.parcelLockerAddress ? `<br>${escapeHtml(order.parcelLockerAddress)}` : ""}
            </p>`
              : `<p style="margin:0;font-size:13px;color:${BRAND.muted}">Adres dostawy</p>
            <p style="margin:4px 0 0;font-size:14px;color:${BRAND.foreground};line-height:1.5">
              ${escapeHtml(order.shippingStreet ?? "")}<br>
              ${escapeHtml(order.shippingPostalCode ?? "")} ${escapeHtml(order.shippingCity ?? "")}<br>
              ${escapeHtml(order.shippingCountry ?? "")}
            </p>`
          }
        </td>
      </tr>
      ${contactRow}
      ${sourceRow}
      <tr>
        <td style="padding:14px 20px 18px;border-top:1px solid ${BRAND.border}">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="font-size:14px;color:${BRAND.muted}">Razem brutto (opłacone)</td>
              <td align="right" style="font-size:18px;font-weight:600;color:${BRAND.foreground};font-variant-numeric:tabular-nums">${formatPLN.format(order.grossTotal)}</td>
            </tr>
            <tr>
              <td style="padding-top:4px;font-size:12px;color:${BRAND.muted}">w tym VAT 23%</td>
              <td align="right" style="padding-top:4px;font-size:12px;color:${BRAND.muted};font-variant-numeric:tabular-nums">${formatPLN.format(order.vatTotal)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  const followUp = [
    callout(
      `Co dalej: zweryfikuj plik i ustaw status na <strong>w produkcji</strong>. Klient ma automatyczne powiadomienia na każdym kroku.`,
    ),
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:18px 0 4px"><tr><td style="background:${BRAND.primary};border-radius:12px"><a href="https://dobreprinty.pl/admin" style="display:inline-block;padding:12px 22px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600">Otwórz panel admina</a></td></tr></table>`,
  ].join("");

  const text = [
    headline,
    "",
    intro,
    "",
    `Zamówienie #${shortId(order._id)}`,
    `Produkt: ${order.productName}`,
    `Nakład: ${formatQty.format(order.quantity)} szt. · ${order.formatLabel}`,
    deliveryLine(order),
    `Klient: ${order.customerName} <${order.customerEmail}> · ${order.customerPhone}`,
    order.companyName
      ? `Firma: ${order.companyName}${order.taxId ? ` (NIP ${order.taxId})` : ""}`
      : "",
    order.source ? `Źródło: ${order.source}` : "",
    `Razem brutto: ${formatPLN.format(order.grossTotal)} (VAT 23%: ${formatPLN.format(order.vatTotal)})`,
    "",
    "Panel admina: https://dobreprinty.pl/admin",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `Nowe zamówienie #${shortId(order._id)} · ${order.productName} · ${formatPLN.format(order.grossTotal)}`,
    preheader: `${order.customerName} zapłacił za ${formatQty.format(order.quantity)} szt. ${order.productName}.`,
    html: renderShell({
      preheader: `Nowe opłacone zamówienie #${shortId(order._id)} czeka na weryfikację.`,
      headline,
      intro,
      detailsHtml,
      followUpHtml: followUp,
      signature: "Powodzenia w produkcji,<br>DobrePrinty",
      footerNote:
        "Wiadomość systemowa dla administratorów dobreprinty.pl. Lista odbiorców: ADMIN_EMAILS w konfiguracji.",
    }),
    text,
  };
}

function buildEmail(order: Order, kind: StatusKind) {
  switch (kind) {
    case "pending":
      return summaryEmail(order);
    case "in_production":
      return inProductionEmail(order);
    case "ready_to_ship":
      return readyToShipEmail(order);
    case "shipped":
      return shippedEmail(order);
    case "awaiting_pickup":
      return awaitingPickupEmail(order);
    case "completed":
      return completedEmail(order);
  }
}

async function send({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.MAIL_FROM ?? user;
  const secureRaw = process.env.SMTP_SECURE;

  if (!host || !portRaw || !user || !pass || !from) {
    console.log(
      `[email/dev] Brak SMTP. Pominięto wysyłkę do ${to}: ${subject}`,
    );
    return;
  }

  const port = Number(portRaw);
  const secure = secureRaw === undefined ? port === 465 : secureRaw === "true";

  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  try {
    await transport.sendMail({ from, to, subject, html, text });
  } catch (err) {
    console.error("[email] SMTP error", err);
    throw new Error("Nie udało się wysłać powiadomienia.");
  }
}

export const sendOrderStatusEmail = internalAction({
  args: {
    orderId: v.id("orders"),
    kind: v.union(
      v.literal("pending"),
      v.literal("in_production"),
      v.literal("ready_to_ship"),
      v.literal("shipped"),
      v.literal("awaiting_pickup"),
      v.literal("completed"),
    ),
  },
  handler: async (ctx, args) => {
    const order = await ctx.runQuery(internal.emailDb.getOrder, {
      orderId: args.orderId,
    });
    if (!order) {
      console.warn("[email] Brak zamówienia", args.orderId);
      return;
    }
    const built = buildEmail(order, args.kind);
    await send({
      to: order.customerEmail,
      subject: built.subject,
      html: built.html,
      text: built.text,
    });
  },
});

export const sendPaymentReminderEmail = internalAction({
  args: {
    orderId: v.id("orders"),
    reminderNumber: v.number(),
  },
  handler: async (ctx, args) => {
    const order = await ctx.runQuery(internal.emailDb.getOrder, {
      orderId: args.orderId,
    });
    if (!order) {
      console.warn("[email/reminder] Brak zamówienia", args.orderId);
      return;
    }
    if (order.paymentStatus === "paid" || order.status === "cancelled") {
      return;
    }
    const built = paymentReminderEmail(order, args.reminderNumber);
    await send({
      to: order.customerEmail,
      subject: built.subject,
      html: built.html,
      text: built.text,
    });
  },
});

function adminEmailList(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.includes("@"));
}

export const sendAdminOrderNotification = internalAction({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const recipients = adminEmailList();
    if (recipients.length === 0) {
      console.log("[email/admin] ADMIN_EMAILS nie skonfigurowane, pomijam.");
      return;
    }
    const order = await ctx.runQuery(internal.emailDb.getOrder, {
      orderId: args.orderId,
    });
    if (!order) {
      console.warn("[email/admin] Brak zamówienia", args.orderId);
      return;
    }
    const built = adminNotificationEmail(order);
    for (const to of recipients) {
      await send({
        to,
        subject: built.subject,
        html: built.html,
        text: built.text,
      });
    }
  },
});
