import { httpRouter } from "convex/server";

import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const PLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
});

function hexToBytes(hex: string): Uint8Array<ArrayBuffer> {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

// Weryfikuje podpis Ed25519, którym Discord podpisuje KAŻDE żądanie interakcji.
async function verifyDiscordRequest(
  publicKeyHex: string,
  signatureHex: string,
  timestamp: string,
  rawBody: string,
): Promise<boolean> {
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      hexToBytes(publicKeyHex),
      { name: "Ed25519" },
      false,
      ["verify"],
    );
    return await crypto.subtle.verify(
      "Ed25519",
      key,
      hexToBytes(signatureHex),
      new TextEncoder().encode(timestamp + rawBody),
    );
  } catch {
    return false;
  }
}

// Endpoint interakcji Discorda (slash commands). Hostowany przez Convex —
// URL: https://<deployment>.convex.site/discord/interactions
const handleDiscordInteraction = httpAction(async (ctx, request) => {
  const publicKey = process.env.DISCORD_PUBLIC_KEY;
  if (!publicKey) {
    return new Response("Server not configured", { status: 500 });
  }

  const signature = request.headers.get("X-Signature-Ed25519");
  const timestamp = request.headers.get("X-Signature-Timestamp");
  const rawBody = await request.text();

  if (!signature || !timestamp) {
    return new Response("Missing signature", { status: 401 });
  }
  const valid = await verifyDiscordRequest(
    publicKey,
    signature,
    timestamp,
    rawBody,
  );
  if (!valid) {
    return new Response("Invalid request signature", { status: 401 });
  }

  const interaction = JSON.parse(rawBody);

  // Type 1 = PING — Discord weryfikuje endpoint przy zapisie URL.
  if (interaction.type === 1) {
    return Response.json({ type: 1 });
  }

  // Type 2 = APPLICATION_COMMAND (slash command).
  if (interaction.type === 2) {
    const name = interaction.data?.name;
    if (name === "utarg") {
      const stats = await ctx.runQuery(internal.orderStats.paidRevenue, {});
      return Response.json({
        type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
        data: {
          flags: 64, // EPHEMERAL — widoczne tylko dla pytającego
          embeds: [
            {
              title: "💰 Łączny utarg",
              color: 0x22c55e,
              description: "Liczone tylko zamówienia **zrealizowane**.",
              fields: [
                {
                  name: "Brutto (z VAT)",
                  value: PLN.format(stats.gross),
                  inline: true,
                },
                {
                  name: "Netto",
                  value: PLN.format(stats.net),
                  inline: true,
                },
                {
                  name: "Liczba zamówień",
                  value: String(stats.count),
                  inline: true,
                },
                {
                  name: "Średnia wartość (brutto)",
                  value: PLN.format(stats.avgGross),
                  inline: true,
                },
              ],
            },
          ],
        },
      });
    }
    // Nieznana komenda.
    return Response.json({
      type: 4,
      data: { flags: 64, content: "Nieznana komenda." },
    });
  }

  return new Response("Unknown interaction type", { status: 400 });
});

const http = httpRouter();

http.route({
  path: "/discord/interactions",
  method: "POST",
  handler: handleDiscordInteraction,
});

export default http;
