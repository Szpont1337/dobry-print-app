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
