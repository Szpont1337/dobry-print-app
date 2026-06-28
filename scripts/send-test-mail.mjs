import nodemailer from "nodemailer";

const to = process.argv[2];
if (!to) {
  console.error("Usage: bun scripts/send-test-mail.mjs <to-email>");
  process.exit(1);
}

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const orderNumber = String(Date.now()).slice(-6);
const subject = `Potwierdzenie zamówienia nr ${orderNumber} — dobreprinty.pl`;

const text = [
  "Dzień dobry,",
  "",
  `dziękujemy za złożenie zamówienia nr ${orderNumber} w drukarni internetowej dobreprinty.pl.`,
  "",
  "Szczegóły zamówienia:",
  "  • Produkt: Ulotki DL (100 × 210 mm)",
  "  • Nakład: 1000 sztuk",
  "  • Wartość: 153,14 zł brutto",
  "",
  "Status zamówienia możesz śledzić na: https://dobreprinty.pl/zamowienia",
  "W razie pytań odpowiedz na tę wiadomość albo zadzwoń pod numer wsparcia.",
  "",
  "Pozdrawiamy,",
  "Zespół dobreprinty.pl",
  "",
  "—",
  "dobreprinty.pl • ul. Przykładowa 1 • 00-001 Warszawa",
  "Aby zrezygnować z powiadomień o zamówieniach napisz na hej@dobreprinty.pl",
].join("\n");

const html = `<!DOCTYPE html>
<html><body style="font-family: -apple-system, Segoe UI, Helvetica, sans-serif; max-width: 560px; margin: 24px auto; color:#222; line-height:1.5;">
  <p>Dzień dobry,</p>
  <p>dziękujemy za złożenie zamówienia nr <strong>${orderNumber}</strong> w drukarni internetowej <a href="https://dobreprinty.pl">dobreprinty.pl</a>.</p>
  <h3 style="margin:24px 0 8px 0;font-size:15px;">Szczegóły zamówienia</h3>
  <ul style="padding-left:20px;margin:0;">
    <li>Produkt: Ulotki DL (100 × 210 mm)</li>
    <li>Nakład: 1000 sztuk</li>
    <li>Wartość: <strong>153,14 zł brutto</strong></li>
  </ul>
  <p style="margin-top:24px;">Status zamówienia możesz śledzić na <a href="https://dobreprinty.pl/zamowienia">dobreprinty.pl/zamowienia</a>. W razie pytań odpowiedz na tę wiadomość lub zadzwoń pod numer wsparcia.</p>
  <p>Pozdrawiamy,<br>Zespół dobreprinty.pl</p>
  <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
  <p style="font-size:12px;color:#666;">dobreprinty.pl • ul. Przykładowa 1 • 00-001 Warszawa<br>
  Aby zrezygnować z powiadomień o zamówieniach <a href="mailto:hej@dobreprinty.pl?subject=Rezygnacja">napisz do nas</a>.</p>
</body></html>`;

try {
  const info = await transport.sendMail({
    from: process.env.MAIL_FROM,
    to,
    replyTo: process.env.MAIL_REPLY_TO,
    subject,
    text,
    html,
    headers: {
      "List-Unsubscribe": "<mailto:hej@dobreprinty.pl?subject=Unsubscribe>",
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      "X-Entity-Ref-ID": `order-${orderNumber}`,
    },
  });
  console.log("messageId:", info.messageId);
  console.log("response:", info.response);
  console.log("accepted:", info.accepted);
  console.log("rejected:", info.rejected);
} catch (err) {
  console.error("SMTP error:", err);
  process.exit(1);
}
