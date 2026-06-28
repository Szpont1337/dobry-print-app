import { v } from "convex/values";
import { internal } from "./_generated/api";
import type { Doc } from "./_generated/dataModel";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import { internalQuery, mutation, query } from "./_generated/server";

const ORDER_STATUSES = [
  "pending",
  "in_production",
  "ready_to_ship",
  "shipped",
  "awaiting_pickup",
  "completed",
  "cancelled",
] as const;

const statusValidator = v.union(
  v.literal("pending"),
  v.literal("in_production"),
  v.literal("ready_to_ship"),
  v.literal("shipped"),
  v.literal("awaiting_pickup"),
  v.literal("completed"),
  v.literal("cancelled"),
);

function adminEmailList(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

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

export async function requireAdmin(
  ctx: QueryCtx | MutationCtx,
  token: string,
): Promise<Doc<"users">> {
  const user = await userFromToken(ctx, token);
  if (!user) throw new Error("Brak aktywnej sesji.");
  const admins = adminEmailList();
  if (admins.length === 0) {
    throw new Error(
      "ADMIN_EMAILS nie skonfigurowane w env Convexa.",
    );
  }
  if (!admins.includes(user.email.toLowerCase())) {
    throw new Error("Brak uprawnień administratora.");
  }
  return user;
}

// Internal helper so Node actions (e.g. storage.generateDownloadUrl) can gate
// on admin without re-implementing token resolution.
export const ensureAdmin = internalQuery({
  args: { token: v.string() },
  handler: async (ctx, args): Promise<boolean> => {
    const user = await userFromToken(ctx, args.token);
    if (!user) return false;
    const admins = adminEmailList();
    return admins.length > 0 && admins.includes(user.email.toLowerCase());
  },
});

export const isAdmin = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const user = await userFromToken(ctx, args.token);
    if (!user) return null;
    const admins = adminEmailList();
    if (!admins.includes(user.email.toLowerCase())) return null;
    return {
      email: user.email,
      name: user.name ?? null,
    };
  },
});

export const listOrders = query({
  args: {
    token: v.string(),
    status: v.optional(statusValidator),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const limit = args.limit ?? 200;
    if (args.status) {
      return await ctx.db
        .query("orders")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .take(limit);
    }
    return await ctx.db.query("orders").order("desc").take(limit);
  },
});

export const orderStats = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const stats: Record<(typeof ORDER_STATUSES)[number], number> = {
      pending: 0,
      in_production: 0,
      ready_to_ship: 0,
      shipped: 0,
      awaiting_pickup: 0,
      completed: 0,
      cancelled: 0,
    };
    let total = 0;
    let grossLast30Days = 0;
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const rows = await ctx.db.query("orders").collect();
    for (const order of rows) {
      stats[order.status] = (stats[order.status] ?? 0) + 1;
      total += 1;
      if (order._creationTime >= cutoff) grossLast30Days += order.grossTotal;
    }
    return { total, byStatus: stats, grossLast30Days };
  },
});

export const listUsers = query({
  args: { token: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const limit = args.limit ?? 50;
    return await ctx.db.query("users").order("desc").take(limit);
  },
});

export const listRecentFiles = query({
  args: { token: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const limit = args.limit ?? 20;
    return await ctx.db.query("pliki_zamowien").order("desc").take(limit);
  },
});

export const listOrderFiles = query({
  args: {
    token: v.string(),
    orderId: v.id("orders"),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    return await ctx.db
      .query("pliki_zamowien")
      .withIndex("by_zamowienieId", (q) => q.eq("zamowienieId", args.orderId))
      .collect();
  },
});

export const updateOrderStatus = mutation({
  args: {
    token: v.string(),
    orderId: v.id("orders"),
    status: statusValidator,
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Brak zamówienia.");
    if (order.status === args.status) return { ok: true as const };
    await ctx.db.patch(args.orderId, { status: args.status });
    if (args.status !== "cancelled") {
      await ctx.scheduler.runAfter(0, internal.email.sendOrderStatusEmail, {
        orderId: args.orderId,
        kind: args.status,
      });
    }
    return { ok: true as const };
  },
});

export const markAsShipped = mutation({
  args: {
    token: v.string(),
    orderId: v.id("orders"),
    trackingNumber: v.string(),
    carrier: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Brak zamówienia.");
    const trackingNumber = args.trackingNumber.trim();
    const carrier = args.carrier.trim();
    if (!trackingNumber) throw new Error("Podaj numer listu przewozowego.");
    if (!carrier) throw new Error("Podaj nazwę przewoźnika.");
    await ctx.db.patch(args.orderId, {
      status: "shipped",
      trackingNumber,
      carrier,
    });
    await ctx.scheduler.runAfter(0, internal.email.sendOrderStatusEmail, {
      orderId: args.orderId,
      kind: "shipped",
    });
    return { ok: true as const };
  },
});

export const markAwaitingPickup = mutation({
  args: {
    token: v.string(),
    orderId: v.id("orders"),
    pickupPointAddress: v.string(),
    pickupCode: v.string(),
    pickupPhone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Brak zamówienia.");
    const pickupPointAddress = args.pickupPointAddress.trim();
    const pickupCode = args.pickupCode.trim();
    const pickupPhone = args.pickupPhone?.trim() ?? "";
    if (!pickupPointAddress) {
      throw new Error("Podaj adres punktu odbioru.");
    }
    if (!pickupCode) {
      throw new Error("Podaj kod odbioru.");
    }
    await ctx.db.patch(args.orderId, {
      status: "awaiting_pickup",
      pickupPointAddress,
      pickupCode,
      pickupPhone: pickupPhone || undefined,
    });
    await ctx.scheduler.runAfter(0, internal.email.sendOrderStatusEmail, {
      orderId: args.orderId,
      kind: "awaiting_pickup",
    });
    return { ok: true as const };
  },
});
