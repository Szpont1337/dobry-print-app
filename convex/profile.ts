import { v } from "convex/values";

import type { Doc } from "./_generated/dataModel";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import { mutation, query } from "./_generated/server";

async function userFromToken(
  ctx: QueryCtx | MutationCtx,
  token: string,
): Promise<Doc<"users"> | null> {
  const session = await ctx.db
    .query("sessions")
    .withIndex("by_token", (q) => q.eq("token", token))
    .unique();
  if (!session) return null;
  if (session.expiresAt < Date.now()) return null;
  return await ctx.db.get(session.userId);
}

export const get = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const user = await userFromToken(ctx, args.token);
    if (!user) return null;
    const profile = await ctx.db
      .query("user_profiles")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();
    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name ?? null,
      },
      profile: profile
        ? {
            companyName: profile.companyName ?? null,
            taxId: profile.taxId ?? null,
            phone: profile.phone ?? null,
            shippingStreet: profile.shippingStreet ?? null,
            shippingCity: profile.shippingCity ?? null,
            shippingPostalCode: profile.shippingPostalCode ?? null,
            shippingCountry: profile.shippingCountry ?? null,
          }
        : null,
    };
  },
});

export const upsert = mutation({
  args: {
    token: v.string(),
    name: v.optional(v.string()),
    companyName: v.optional(v.string()),
    taxId: v.optional(v.string()),
    phone: v.optional(v.string()),
    shippingStreet: v.optional(v.string()),
    shippingCity: v.optional(v.string()),
    shippingPostalCode: v.optional(v.string()),
    shippingCountry: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await userFromToken(ctx, args.token);
    if (!user) throw new Error("Brak aktywnej sesji.");

    const normalize = (value: string | undefined) => {
      if (value === undefined) return undefined;
      const trimmed = value.trim();
      return trimmed === "" ? undefined : trimmed;
    };

    const nextName = normalize(args.name);
    if (nextName !== user.name) {
      await ctx.db.patch(user._id, { name: nextName });
    }

    const profileData = {
      companyName: normalize(args.companyName),
      taxId: normalize(args.taxId),
      phone: normalize(args.phone),
      shippingStreet: normalize(args.shippingStreet),
      shippingCity: normalize(args.shippingCity),
      shippingPostalCode: normalize(args.shippingPostalCode),
      shippingCountry: normalize(args.shippingCountry),
    };

    const existing = await ctx.db
      .query("user_profiles")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, profileData);
    } else {
      await ctx.db.insert("user_profiles", {
        userId: user._id,
        ...profileData,
      });
    }
    return { ok: true as const };
  },
});
