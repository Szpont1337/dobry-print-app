export const BRAND = {
  primary: "#e64b1b",
  primarySoft: "#fce4d4",
  foreground: "#111111",
  muted: "#6b6b6b",
  border: "#e7e5e2",
  background: "#fdfcfa",
  cardBackground: "#ffffff",
};

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderShell({
  preheader,
  headline,
  intro,
  detailsHtml = "",
  followUpHtml = "",
  signature = "Pozdrawiamy,<br>zespół DobrePrinty",
  footerNote = "DobrePrinty sp. z o.o. · hej@dobreprinty.pl",
  lang = "pl",
}: {
  preheader: string;
  headline: string;
  intro: string;
  detailsHtml?: string;
  followUpHtml?: string;
  signature?: string;
  footerNote?: string;
  lang?: "pl" | "en";
}): string {
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>DobrePrinty</title>
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

export function callout(text: string): string {
  return `
    <div style="background:${BRAND.primarySoft};border-radius:14px;padding:14px 18px;margin:0 0 16px">
      <p style="margin:0;font-size:14px;line-height:1.5;color:${BRAND.foreground}">${text}</p>
    </div>
  `;
}

export function plainBlock(text: string): string {
  return `<p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:${BRAND.foreground}">${text}</p>`;
}

export function codeDisplay(code: string): string {
  return `
    <div style="background:${BRAND.background};border:1px solid ${BRAND.border};border-radius:14px;padding:24px 18px;margin:0 0 20px;text-align:center">
      <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.14em;color:${BRAND.muted}">Kod jednorazowy</p>
      <p style="margin:0;font-size:36px;font-weight:700;letter-spacing:8px;color:${BRAND.foreground};font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,monospace;font-variant-numeric:tabular-nums">${escapeHtml(code)}</p>
    </div>
  `;
}
