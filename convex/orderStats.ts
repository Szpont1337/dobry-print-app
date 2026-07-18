import { v } from "convex/values";

import type { TrafficChannel } from "../src/lib/traffic-source";
import { internalQuery } from "./_generated/server";

// Sumuje wyłącznie ZREALIZOWANE zamówienia (status "completed"): brutto, netto, liczba.
// To realny utarg — pieniądze za faktycznie zrealizowane zlecenia, nie tylko opłacone.
// Korzysta z indeksu by_status, więc nie skanuje całej tabeli.
export const paidRevenue = internalQuery({
  args: {},
  handler: async (ctx) => {
    const completed = await ctx.db
      .query("orders")
      .withIndex("by_status", (q) => q.eq("status", "completed"))
      .collect();

    let gross = 0;
    let net = 0;
    for (const o of completed) {
      gross += o.grossTotal;
      net += o.netTotal;
    }

    return {
      count: completed.length,
      gross,
      net,
      avgGross: completed.length > 0 ? gross / completed.length : 0,
    };
  },
});

// Utarg DZIENNY = zamówienia OPŁACONE w oknie [startMs, endMs) (paidAt).
// Inaczej niż paidRevenue (które liczy tylko zrealizowane) — tu chodzi o
// realną dzienną sprzedaż. Dodatkowo rozbicie brutto na kanały źródła ruchu.
export const dailyPaidRevenue = internalQuery({
  args: { startMs: v.number(), endMs: v.number() },
  handler: async (ctx, args) => {
    const paid = await ctx.db
      .query("orders")
      .withIndex("by_payment_status", (q) => q.eq("paymentStatus", "paid"))
      .collect();

    let gross = 0;
    let net = 0;
    let count = 0;
    const byChannel: Record<string, number> = {};

    for (const o of paid) {
      const at = o.paidAt;
      if (at == null || at < args.startMs || at >= args.endMs) continue;
      gross += o.grossTotal;
      net += o.netTotal;
      count += 1;
      const channel = (o.attrChannel as TrafficChannel | undefined) ?? "direct";
      byChannel[channel] = (byChannel[channel] ?? 0) + o.grossTotal;
    }

    return { count, gross, net, byChannel };
  },
});
