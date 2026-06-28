// Renders the branded "completed / odebrane" order email (same shell as convex/email.ts)
// and sends a sample via Resend. Usage: node scripts/send-completed-example.mjs <to>
const to = process.argv[2];
if (!to) {
  console.error("Usage: node scripts/send-completed-example.mjs <to-email>");
  process.exit(1);
}

const BRAND = {
  primary: "#e64b1b",
  primarySoft: "#fce4d4",
  foreground: "#111111",
  muted: "#6b6b6b",
  border: "#e7e5e2",
  background: "#fdfcfa",
  cardBackground: "#ffffff",
};

const escapeHtml = (t) =>
  t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function renderShell({
  preheader,
  headline,
  intro,
  detailsHtml = "",
  followUpHtml = "",
  signature = "Pozdrawiamy,<br>zespół dobreprinty",
  footerNote = "dobreprinty sp. z o.o. · hej@dobreprinty.pl",
  lang = "pl",
}) {
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>dobreprinty</title>
  </head>
  <body style="margin:0;padding:0;background:${BRAND.background};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:${BRAND.foreground}">
    <span style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden">${escapeHtml(preheader)}</span>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BRAND.background}">
      <tr>
        <td align="center" style="padding:32px 16px">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;width:100%">
            <tr>
              <td style="padding:8px 0 28px">
                <span style="font-size:22px;font-weight:600;letter-spacing:-0.02em;color:${BRAND.foreground}">
                  <span style="color:${BRAND.primary}">druk</span>alo
                </span>
              </td>
            </tr>
            <tr>
              <td style="background:${BRAND.cardBackground};border:1px solid ${BRAND.border};border-radius:20px;padding:32px 32px 28px">
                <h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:600;color:${BRAND.foreground};letter-spacing:-0.01em">${escapeHtml(headline)}</h1>
                <p style="margin:16px 0 24px;font-size:16px;line-height:1.55;color:${BRAND.foreground}">${intro}</p>
                ${detailsHtml}
                ${followUpHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:24px 8px 8px;font-size:13px;line-height:1.55;color:${BRAND.muted}">
                ${signature}
              </td>
            </tr>
            <tr>
              <td style="padding:16px 8px 0;font-size:12px;line-height:1.5;color:${BRAND.muted}">
                ${footerNote}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

const callout = (text) =>
  `<div style="background:${BRAND.primarySoft};border-radius:14px;padding:14px 18px;margin:0 0 16px"><p style="margin:0;font-size:14px;line-height:1.5;color:${BRAND.foreground}">${text}</p></div>`;
const plainBlock = (text) =>
  `<p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:${BRAND.foreground}">${text}</p>`;

const formatPLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  minimumFractionDigits: 2,
});
const formatQty = new Intl.NumberFormat("pl-PL");
const shortId = (id) => id.slice(-8).toUpperCase();

// --- sample order (courier delivery, free shipping) ---
const order = {
  _id: "ord_9f3a7b2c",
  productName: "Wizytówki klasyczne",
  quantity: 500,
  formatLabel: "90 × 50 mm",
  deliveryMethod: "courier",
  shippingStreet: "ul. Stanisława Leszczyńskiego 25",
  shippingPostalCode: "20-400",
  shippingCity: "Lublin",
  shippingCountry: "Polska",
  shippingFee: 0,
  grossTotal: 89.0,
  vatTotal: 16.64,
};

function detailsBox(o) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid ${BRAND.border};border-radius:14px;background:${BRAND.background};margin:0 0 24px">
      <tr><td style="padding:18px 20px 14px;border-bottom:1px solid ${BRAND.border}">
        <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:0.14em;color:${BRAND.muted}">Zamówienie</p>
        <p style="margin:4px 0 0;font-size:18px;font-weight:600;color:${BRAND.foreground};font-family:'IBM Plex Mono',ui-monospace,monospace">#${shortId(o._id)}</p>
      </td></tr>
      <tr><td style="padding:16px 20px">
        <p style="margin:0;font-size:16px;font-weight:600;color:${BRAND.foreground}">${escapeHtml(o.productName)}</p>
        <p style="margin:4px 0 0;font-size:14px;color:${BRAND.muted}">${formatQty.format(o.quantity)} szt. · ${escapeHtml(o.formatLabel)}</p>
      </td></tr>
      <tr><td style="padding:0 20px 16px">
        <p style="margin:0;font-size:13px;color:${BRAND.muted}">Adres dostawy</p>
        <p style="margin:4px 0 0;font-size:14px;color:${BRAND.foreground};line-height:1.5">
          ${escapeHtml(o.shippingStreet)}<br>${escapeHtml(o.shippingPostalCode)} ${escapeHtml(o.shippingCity)}<br>${escapeHtml(o.shippingCountry)}
        </p>
      </td></tr>
      <tr><td style="padding:14px 20px 18px;border-top:1px solid ${BRAND.border}">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr><td style="font-size:13px;color:${BRAND.muted}">Wysyłka</td><td align="right" style="font-size:14px;color:${BRAND.foreground};font-variant-numeric:tabular-nums">${o.shippingFee > 0 ? formatPLN.format(o.shippingFee) : "Gratis"}</td></tr>
          <tr><td style="padding-top:8px;font-size:14px;color:${BRAND.muted}">Razem brutto</td><td align="right" style="padding-top:8px;font-size:18px;font-weight:600;color:${BRAND.foreground};font-variant-numeric:tabular-nums">${formatPLN.format(o.grossTotal)}</td></tr>
          <tr><td style="padding-top:4px;font-size:12px;color:${BRAND.muted}">w tym VAT 23%</td><td align="right" style="padding-top:4px;font-size:12px;color:${BRAND.muted};font-variant-numeric:tabular-nums">${formatPLN.format(o.vatTotal)}</td></tr>
        </table>
      </td></tr>
    </table>`;
}

const ORDER_FOOTER =
  "dobreprinty · Hubert Kolejko · hej@dobreprinty.pl<br>Otrzymujesz tę wiadomość, bo złożyłeś zamówienie w dobreprinty.pl.";

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

const html = renderShell({
  preheader: `Zamknęliśmy Twoje zamówienie. Zostaw opinię i odbierz 10% rabatu.`,
  headline,
  intro,
  detailsHtml: detailsBox(order),
  followUpHtml: followUp,
  signature: "Dziękujemy.<br>zespół dobreprinty",
  footerNote: ORDER_FOOTER,
});

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
  "dobreprinty · hej@dobreprinty.pl",
].join("\n");

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error("Brak RESEND_API_KEY w środowisku.");
  process.exit(1);
}

const res = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from: process.env.MAIL_FROM ?? "dobreprinty <hej@dobreprinty.pl>",
    to: [to],
    subject: `Zamówienie #${shortId(order._id)} odebrane - zostaw opinię i odbierz 10% rabatu`,
    html,
    text,
  }),
});
console.log("HTTP", res.status);
console.log(await res.text());
