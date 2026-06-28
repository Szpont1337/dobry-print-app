"use node";

import { v } from "convex/values";
import nodemailer from "nodemailer";

import { internal } from "./_generated/api";
import { action } from "./_generated/server";
import { codeDisplay, plainBlock, renderShell } from "./mailShell";

function generateSixDigitCode(): string {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  const n =
    ((bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3]) >>> 0;
  return String(n % 1_000_000).padStart(6, "0");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function htmlBody(code: string, locale: "pl" | "en"): string {
  if (locale === "en") {
    return renderShell({
      lang: "en",
      preheader: `Your DobrePrinty login code: ${code}`,
      headline: "Your one-time login code",
      intro:
        "Use this code to finish signing in to DobrePrinty. It expires in 10 minutes.",
      detailsHtml: codeDisplay(code),
      followUpHtml: plainBlock(
        "If you didn't request this code, you can safely ignore this email — nobody can sign in without it.",
      ),
      signature: "See you on the other side,<br>DobrePrinty team",
      footerNote:
        "DobrePrinty sp. z o.o. · hej@dobreprinty.pl<br>You're receiving this email because someone requested a sign-in code for your address.",
    });
  }
  return renderShell({
    preheader: `Twój kod logowania do DobrePrinty: ${code}`,
    headline: "Twój jednorazowy kod logowania",
    intro:
      "Wpisz ten kod, aby dokończyć logowanie w DobrePrinty. Kod jest ważny 10 minut.",
    detailsHtml: codeDisplay(code),
    followUpHtml: plainBlock(
      "Jeśli to nie Ty go zamówiłeś, zignoruj tę wiadomość — bez kodu nikt się nie zaloguje.",
    ),
    signature: "Do zobaczenia w panelu,<br>zespół DobrePrinty",
    footerNote:
      "DobrePrinty sp. z o.o. · hej@dobreprinty.pl<br>Otrzymujesz tę wiadomość, bo ktoś poprosił o kod logowania dla tego adresu.",
  });
}

function textBody(code: string, locale: "pl" | "en"): string {
  return locale === "en"
    ? `Your DobrePrinty login code: ${code}\n\nThe code is valid for 10 minutes.`
    : `Twój kod logowania do DobrePrinty: ${code}\n\nKod jest ważny 10 minut.`;
}

async function sendCodeEmail(email: string, code: string, locale: "pl" | "en") {
  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.MAIL_FROM ?? user;
  const secureRaw = process.env.SMTP_SECURE;

  if (!host || !portRaw || !user || !pass || !from) {
    // Never log the code itself — Convex logs are readable from the dashboard.
    console.log(
      `[auth/dev] Brak konfiguracji SMTP — kod dla ${email} zapisany w bazie auth_codes.`,
    );
    return;
  }

  const port = Number(portRaw);
  if (!Number.isFinite(port)) {
    throw new Error("SMTP_PORT musi być liczbą.");
  }
  const secure = secureRaw === undefined ? port === 465 : secureRaw === "true";

  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const subject =
    locale === "en"
      ? `${code} — your DobrePrinty login code`
      : `${code} — Twój kod logowania do DobrePrinty`;

  try {
    await transport.sendMail({
      from,
      to: email,
      subject,
      text: textBody(code, locale),
      html: htmlBody(code, locale),
    });
  } catch (err) {
    console.error("[auth] SMTP error", err);
    throw new Error("Nie udało się wysłać kodu na e-mail.");
  }
}

export const requestPin = action({
  args: {
    email: v.string(),
    locale: v.optional(v.union(v.literal("pl"), v.literal("en"))),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    if (!isValidEmail(email)) {
      throw new Error(
        args.locale === "en"
          ? "Enter a valid email address."
          : "Podaj prawidłowy adres e-mail.",
      );
    }
    const code = generateSixDigitCode();
    await ctx.runMutation(internal.authDb.storeCode, {
      email,
      code,
      locale: args.locale,
    });
    await sendCodeEmail(email, code, args.locale ?? "pl");
    return { ok: true as const };
  },
});
