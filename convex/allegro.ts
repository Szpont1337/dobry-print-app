import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./admin";
import { assertServerSecret } from "./serverAuth";

/**
 * Resolve the mapped Allegro offer for a product. Server-gated: called from the
 * Next.js /api/allegro/prepare route with INTERNAL_API_SECRET, never the browser.
 */
export const getOfferForSlug = query({
  args: { serverSecret: v.string(), productSlug: v.string() },
  handler: async (ctx, args) => {
    assertServerSecret(args.serverSecret);
    const offer = await ctx.db
      .query("allegroOffers")
      .withIndex("by_productSlug", (q) => q.eq("productSlug", args.productSlug))
      .first();
    if (!offer) return null;
    if (offer.active === false) return null;
    return { offerUrl: offer.offerUrl, variantNote: offer.variantNote ?? null };
  },
});

// --- Admin management of the productSlug -> offer mapping ---

export const listOffers = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    return await ctx.db.query("allegroOffers").order("desc").collect();
  },
});

export const upsertOffer = mutation({
  args: {
    token: v.string(),
    productSlug: v.string(),
    offerUrl: v.string(),
    variantNote: v.optional(v.string()),
    label: v.optional(v.string()),
    active: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const productSlug = args.productSlug.trim();
    const offerUrl = args.offerUrl.trim();
    if (!productSlug) throw new Error("productSlug jest wymagany.");
    if (!/^https:\/\/allegro\.pl\//.test(offerUrl)) {
      throw new Error("offerUrl musi zaczynać się od https://allegro.pl/");
    }
    const existing = await ctx.db
      .query("allegroOffers")
      .withIndex("by_productSlug", (q) => q.eq("productSlug", productSlug))
      .first();
    const patch = {
      productSlug,
      offerUrl,
      variantNote: args.variantNote?.trim() || undefined,
      label: args.label?.trim() || undefined,
      active: args.active ?? true,
    };
    if (existing) {
      await ctx.db.patch(existing._id, patch);
      return existing._id;
    }
    return await ctx.db.insert("allegroOffers", patch);
  },
});

export const deleteOffer = mutation({
  args: { token: v.string(), id: v.id("allegroOffers") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
    return { ok: true as const };
  },
});
