import { v } from "convex/values";

import { CHANNEL_META, type TrafficChannel } from "../src/lib/traffic-source";
import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";

const PLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
});

function deliveryLabel(method: string | undefined): string {
  if (method === "courier") return "Kurier";
  if (method === "parcel_locker") return "Paczkomat InPost";
  return "—";
}

// Ładny opis źródła ruchu zamówienia do embeda ("🤖 ChatGPT").
function trafficSourceLabel(
  channel: string | undefined,
  sourceName: string | undefined,
): string {
  if (!channel) return "—";
  const meta = CHANNEL_META[channel as TrafficChannel];
  const emoji = meta?.emoji ?? "";
  const name = sourceName || meta?.label || channel;
  return `${emoji} ${name}`.trim();
}

// Powiadomienie na Discord o nowym (opłaconym) zamówieniu.
// Używa zwykłego webhooka kanału — bez bota/tokena/gateway.
// URL trzymany w zmiennej środowiskowej DISCORD_WEBHOOK_URL.
export const sendOrderNotification = internalAction({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.log("[discord] DISCORD_WEBHOOK_URL nie skonfigurowane, pomijam.");
      return;
    }

    const order = await ctx.runQuery(internal.emailDb.getOrder, {
      orderId: args.orderId,
    });
    if (!order) {
      console.warn("[discord] Brak zamówienia", args.orderId);
      return;
    }

    const fields: { name: string; value: string; inline?: boolean }[] = [
      {
        name: "Produkt",
        value: `${order.productName} — ${order.formatLabel}`,
      },
      { name: "Ilość", value: String(order.quantity), inline: true },
      {
        name: "Kwota brutto",
        value: PLN.format(order.grossTotal),
        inline: true,
      },
      { name: "Klient", value: order.customerName, inline: true },
      { name: "E-mail", value: order.customerEmail, inline: true },
      { name: "Telefon", value: order.customerPhone, inline: true },
      {
        name: "Dostawa",
        value: deliveryLabel(order.deliveryMethod),
        inline: true,
      },
      {
        name: "Źródło ruchu",
        value: trafficSourceLabel(order.attrChannel, order.attrSourceName),
        inline: true,
      },
    ];

    if (order.companyName) {
      fields.push({
        name: "Firma",
        value: order.taxId
          ? `${order.companyName} (NIP ${order.taxId})`
          : order.companyName,
      });
    }
    if (order.notes) {
      fields.push({ name: "Uwagi", value: order.notes.slice(0, 1000) });
    }

    const payload = {
      username: "DobrePrinty — zamówienia",
      embeds: [
        {
          title: "🟢 Nowe opłacone zamówienie",
          description: `Zamówienie \`${order._id}\``,
          color: 0x22c55e,
          fields,
          timestamp: new Date(order.paidAt ?? Date.now()).toISOString(),
        },
      ],
    };

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error(
          "[discord] Webhook zwrócił",
          res.status,
          await res.text(),
        );
      }
    } catch (err) {
      // Nie wywracamy płatności jeśli Discord padnie — tylko logujemy.
      console.error("[discord] Błąd wysyłki webhooka", err);
    }
  },
});
