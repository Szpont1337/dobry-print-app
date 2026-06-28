import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASSWORD,
  MAIL_FROM,
  MAIL_REPLY_TO,
} = process.env;

const to = process.argv[2];
if (!to) {
  console.error("Usage: bun scripts/test-mail.mjs <recipient@example.com>");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: SMTP_SECURE === "true",
  auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
});

console.log(`→ Łączę z ${SMTP_HOST}:${SMTP_PORT} jako ${SMTP_USER}`);
await transporter.verify();
console.log("✓ Połączenie SMTP OK");

const info = await transporter.sendMail({
  from: MAIL_FROM,
  to,
  replyTo: MAIL_REPLY_TO,
  subject: "Test wysyłki z dobreprinty.pl",
  text:
    "To jest testowa wiadomość wysłana z hej@dobreprinty.pl przez home.pl SMTP.\n" +
    "Jeśli ją widzisz — konfiguracja działa.\n\n— dobreprinty",
  html:
    "<p>To jest testowa wiadomość wysłana z <b>hej@dobreprinty.pl</b> przez home.pl SMTP.</p>" +
    "<p>Jeśli ją widzisz — konfiguracja działa.</p><p>— dobreprinty</p>",
});

console.log("✓ Wysłano");
console.log("  messageId:", info.messageId);
console.log("  response :", info.response);
console.log("  accepted :", info.accepted);
console.log("  rejected :", info.rejected);
