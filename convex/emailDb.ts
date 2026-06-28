import { v } from "convex/values";

import { internalQuery } from "./_generated/server";

export const getOrder = internalQuery({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.orderId);
  },
});
