import { v } from "convex/values";

import {
  internalMutation,
  mutation,
  query,
} from "./_generated/server";

const CODE_TTL_MS = 10 * 60 * 1000; // 10 minut
const MAX_ATTEMPTS = 5;
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 dni
const RESEND_COOLDOWN_MS = 60 * 1000; // min. 60 s między prośbami o kod

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export const storeCode = internalMutation({
  args: {
    email: v.string(),
    code: v.string(),
    locale: v.optional(v.union(v.literal("pl"), v.literal("en"))),
  },
  handler: async (ctx, args) => {
    const email = normalizeEmail(args.email);
    const existing = await ctx.db
      .query("auth_codes")
      .withIndex("by_email", (q) => q.eq("email", email))
      .collect();
    // Rate-limit: block a fresh code if one was issued in the cooldown window
    // (anti email-bombing + prevents resetting the brute-force attempt counter).
    const recent = existing.some(
      (row) => row._creationTime > Date.now() - RESEND_COOLDOWN_MS,
    );
    if (recent) {
      throw new Error(
        args.locale === "en"
          ? "Please wait a moment before requesting another code."
          : "Poczekaj chwilę przed ponowną prośbą o kod.",
      );
    }
    for (const row of existing) {
      if (!row.consumed) {
        await ctx.db.patch(row._id, { consumed: true });
      }
    }
    await ctx.db.insert("auth_codes", {
      email,
      code: args.code,
      expiresAt: Date.now() + CODE_TTL_MS,
      consumed: false,
      attempts: 0,
    });
  },
});

export const verifyPin = mutation({
  args: {
    email: v.string(),
    code: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const email = normalizeEmail(args.email);
    const candidates = await ctx.db
      .query("auth_codes")
      .withIndex("by_email", (q) => q.eq("email", email))
      .order("desc")
      .take(5);
    const open = candidates.find((c) => !c.consumed);
    if (!open) {
      throw new Error("Brak aktywnego kodu. Poproś o nowy.");
    }
    if (open.expiresAt < Date.now()) {
      await ctx.db.patch(open._id, { consumed: true });
      throw new Error("Kod wygasł. Poproś o nowy.");
    }
    if (open.attempts >= MAX_ATTEMPTS) {
      await ctx.db.patch(open._id, { consumed: true });
      throw new Error("Zbyt wiele nieudanych prób. Poproś o nowy kod.");
    }
    if (open.code !== args.code.trim()) {
      await ctx.db.patch(open._id, { attempts: open.attempts + 1 });
      throw new Error("Nieprawidłowy kod.");
    }

    await ctx.db.patch(open._id, { consumed: true });

    let user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (!user) {
      const id = await ctx.db.insert("users", {
        email,
        name: args.name?.trim() || undefined,
        lastLoginAt: Date.now(),
      });
      user = await ctx.db.get(id);
    } else {
      const patch: Record<string, unknown> = { lastLoginAt: Date.now() };
      if (args.name && !user.name) patch.name = args.name.trim();
      await ctx.db.patch(user._id, patch);
    }

    if (!user) throw new Error("Nie udało się utworzyć konta.");

    const token = generateToken();
    await ctx.db.insert("sessions", {
      userId: user._id,
      token,
      expiresAt: Date.now() + SESSION_TTL_MS,
    });

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name ?? null,
      },
    };
  },
});

export const me = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
    if (!session) return null;
    if (session.expiresAt < Date.now()) return null;
    const user = await ctx.db.get(session.userId);
    if (!user) return null;
    return {
      id: user._id,
      email: user.email,
      name: user.name ?? null,
    };
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
    if (session) await ctx.db.delete(session._id);
  },
});
