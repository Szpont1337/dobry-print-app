import { v } from "convex/values";

import type { Id } from "./_generated/dataModel";
import { internalMutation } from "./_generated/server";
import { computeOrderTotals } from "./orderPricing";

const ALLEGRO_URL =
  "https://allegro.pl/oferta/pojedynczy-plakat-a3-druk-cyfrowy-druk-na-grubym-papierze-350g-16333282246";

// Dev-only seed: a paid "plakaty / A3" order with one attached file, plus the
// productSlug -> Allegro offer mapping the fulfilment flow needs. Internal, so
// it bypasses auth gates — never expose this publicly. Safe to delete once the
// share-link / agent-spec flow is verified on dev.
export const insertSeed = internalMutation({
  args: {
    fileKey: v.string(),
    fileName: v.string(),
    fileSize: v.number(),
    fileType: v.string(),
  },
  handler: async (ctx, args) => {
    const quantity = 25;
    const computed = computeOrderTotals("plakaty", "a3", quantity, "pl");

    const orderId = await ctx.db.insert("orders", {
      productSlug: "plakaty",
      productName: computed.productName,
      formatId: "a3",
      formatLabel: computed.formatLabel,
      quantity,
      unitPrice: computed.unitPrice,
      netTotal: computed.netTotal,
      vatTotal: computed.vatTotal,
      grossTotal: computed.grossTotal,
      shippingFee: computed.shippingFee,

      customerName: "Jan Testowy",
      customerEmail: "test+seed@dobreprinty.pl",
      customerPhone: "+48600100200",

      deliveryMethod: "parcel_locker",
      parcelLockerId: "KRA01M",
      parcelLockerName: "Paczkomat KRA01M",
      parcelLockerAddress: "ul. Testowa 1, 30-001 Kraków",

      notes: "Zamówienie testowe (seed dev). Plakat A3, papier 350g.",

      status: "pending",
      source: "seed-dev",
      paymentStatus: "paid",
      paidAt: Date.now(),
    });

    await ctx.db.insert("pliki_zamowien", {
      fileKey: args.fileKey,
      fileName: args.fileName,
      fileSize: args.fileSize,
      fileType: args.fileType,
      status: "zatwierdzony",
      zamowienieId: orderId,
    });

    // Upsert the Allegro offer mapping for plakaty.
    const existing = await ctx.db
      .query("allegroOffers")
      .withIndex("by_productSlug", (q) => q.eq("productSlug", "plakaty"))
      .first();
    const offerFields = {
      productSlug: "plakaty",
      offerUrl: ALLEGRO_URL,
      variantNote: "A3, papier 350g",
      label: "Plakat A3 (druk cyfrowy 350g)",
      active: true,
    };
    if (existing) {
      await ctx.db.patch(existing._id, offerFields);
    } else {
      await ctx.db.insert("allegroOffers", offerFields);
    }

    return { orderId };
  },
});

// Dev-only: set an order's status (so the Allegro/Claude buttons, gated on
// in_production/ready_to_ship, become visible on the seeded order).
export const setOrderStatus = internalMutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal("pending"),
      v.literal("in_production"),
      v.literal("ready_to_ship"),
      v.literal("shipped"),
      v.literal("awaiting_pickup"),
      v.literal("completed"),
      v.literal("cancelled"),
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, { status: args.status });
    return { ok: true };
  },
});

// Dev-only: mint a share link for an order without the admin gate, so the
// public /d/<code> + /zip routes can be smoke-tested headlessly.
export const shareForOrder = internalMutation({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const alphabet =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
    const bytes = new Uint8Array(11);
    crypto.getRandomValues(bytes);
    let code = "";
    for (let i = 0; i < bytes.length; i++)
      code += alphabet[bytes[i] % alphabet.length];

    await ctx.db.insert("share_links", {
      code,
      orderId: args.orderId as Id<"orders">,
      createdAt: Date.now(),
    });
    return { code };
  },
});
