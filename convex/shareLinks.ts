import { v } from "convex/values";

import type { Doc } from "./_generated/dataModel";
import {
  internalQuery,
  mutation,
  query,
  type QueryCtx,
} from "./_generated/server";
import { requireAdmin } from "./admin";

// Unguessable, URL-safe code. ~11 chars of base62 ≈ 65 bits of entropy — not
// brute-forceable, and short enough to paste into an email / chat.
const ALPHABET =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789"; // no 0/O/1/I/l
const CODE_LENGTH = 11;

function generateCode(): string {
  const bytes = new Uint8Array(CODE_LENGTH);
  crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return out;
}

async function linkByCode(
  ctx: QueryCtx,
  code: string,
): Promise<Doc<"share_links"> | null> {
  const link = await ctx.db
    .query("share_links")
    .withIndex("by_code", (q) => q.eq("code", code))
    .unique();
  if (!link) return null;
  if (link.expiresAt && link.expiresAt < Date.now()) return null;
  return link;
}

// Admin: create (or reuse the existing, non-expired) share link for an order.
// Returns just the code — the caller builds the public URL (origin + /d/<code>).
export const createForOrder = mutation({
  args: {
    token: v.string(),
    orderId: v.id("orders"),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);

    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Brak zamówienia.");

    // Reuse an existing live link so the URL stays stable across clicks.
    const existing = await ctx.db
      .query("share_links")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .collect();
    const now = Date.now();
    const live = existing.find((l) => !l.expiresAt || l.expiresAt > now);
    if (live) return { code: live.code };

    let code = generateCode();
    // Vanishingly unlikely, but guard against a collision.
    while (
      await ctx.db
        .query("share_links")
        .withIndex("by_code", (q) => q.eq("code", code))
        .unique()
    ) {
      code = generateCode();
    }

    await ctx.db.insert("share_links", {
      code,
      orderId: args.orderId,
      createdAt: now,
    });
    return { code };
  },
});

// Public: metadata for the share landing page. Deliberately minimal — exposes
// only what a printing house needs (product, format, quantity, notes, file
// list). No customer e-mail/phone/address.
export const getByCode = query({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    const link = await linkByCode(ctx, args.code);
    if (!link) return null;

    const order = await ctx.db.get(link.orderId);
    if (!order) return null;

    const files = await ctx.db
      .query("pliki_zamowien")
      .withIndex("by_zamowienieId", (q) => q.eq("zamowienieId", link.orderId))
      .collect();

    return {
      orderShortId: link.orderId.slice(-6).toUpperCase(),
      productName: order.productName,
      formatLabel: order.formatLabel,
      quantity: order.quantity,
      notes: order.notes ?? null,
      fileUrl: order.fileUrl ?? null,
      files: files.map((f) => ({
        fileName: f.fileName,
        fileSize: f.fileSize,
        fileType: f.fileType,
      })),
    };
  },
});

// Internal: resolve a code to the order's file keys for the Node action that
// mints presigned B2 URLs. Returns null when the link is missing/expired.
export const resolve = internalQuery({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    const link = await linkByCode(ctx, args.code);
    if (!link) return null;

    const order = await ctx.db.get(link.orderId);
    if (!order) return null;

    const files = await ctx.db
      .query("pliki_zamowien")
      .withIndex("by_zamowienieId", (q) => q.eq("zamowienieId", link.orderId))
      .collect();

    return {
      orderShortId: link.orderId.slice(-6).toUpperCase(),
      files: files.map((f) => ({
        fileKey: f.fileKey,
        fileName: f.fileName,
        fileSize: f.fileSize,
      })),
    };
  },
});
