import { v } from "convex/values";

import { fetchDailyTraffic } from "../src/lib/posthog-query";
import { type TrafficChannel } from "../src/lib/traffic-source";
import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";

// Marka tego deploymentu. Drukalo (agregator) odpytuje ten endpoint po HTTP
// i składa jedną wspólną wiadomość na Discord — tu tylko dostarczamy dane.
const BRAND_NAME = "dobreprinty.pl";

export interface BrandStats {
  brand: string;
  visits: number;
  trafficUnavailable: boolean;
  trafficByChannel: Record<TrafficChannel, number>;
  revenue: {
    gross: number;
    count: number;
    byChannel: Record<string, number>;
  };
}

// Zbiera komplet statystyk dziennych dla TEJ marki (Convex + PostHog).
// Wywoływane przez endpoint HTTP /internal/daily-stats.
export const brandDailyStats = internalAction({
  args: { startMs: v.number(), endMs: v.number() },
  handler: async (ctx, args): Promise<BrandStats> => {
    const [revenue, traffic] = await Promise.all([
      ctx.runQuery(internal.orderStats.dailyPaidRevenue, {
        startMs: args.startMs,
        endMs: args.endMs,
      }),
      fetchDailyTraffic(args.startMs, args.endMs),
    ]);

    return {
      brand: BRAND_NAME,
      visits: traffic.visits,
      trafficUnavailable: traffic.unavailable ?? false,
      trafficByChannel: traffic.byChannel,
      revenue: {
        gross: revenue.gross,
        count: revenue.count,
        byChannel: revenue.byChannel,
      },
    };
  },
});
