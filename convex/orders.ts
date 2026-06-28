import { v } from "convex/values";

import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { type Locale, tErr } from "./i18nError";
import { computeOrderTotals } from "./orderPricing";
import { assertServerSecret } from "./serverAuth";

// Reject absurdly long free-text fields (DoS / table bloat / email payload).
function capped(
  value: string | undefined,
  max: number,
  fieldPl: string,
  fieldEn: string,
  locale: Locale | undefined,
): void {
  if (value && value.length > max) {
    throw new Error(
      tErr(
        locale,
        `${fieldPl}: za długa wartość (max ${max} znaków).`,
        `${fieldEn}: too long (max ${max} characters).`,
      ),
    );
  }
}

export const submitOrder = mutation({
  args: {
    locale: v.optional(v.union(v.literal("pl"), v.literal("en"))),
    productSlug: v.string(),
    formatId: v.string(),
    quantity: v.number(),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    companyName: v.optional(v.string()),
    taxId: v.optional(v.string()),
    deliveryMethod: v.optional(
      v.union(v.literal("courier"), v.literal("parcel_locker")),
    ),
    shippingStreet: v.optional(v.string()),
    shippingCity: v.optional(v.string()),
    shippingPostalCode: v.optional(v.string()),
    shippingCountry: v.optional(v.string()),
    parcelLockerId: v.optional(v.string()),
    parcelLockerName: v.optional(v.string()),
    parcelLockerAddress: v.optional(v.string()),
    parcelLockerDescription: v.optional(v.string()),
    fileUrl: v.optional(v.string()),
    fileKeys: v.optional(v.array(v.string())),
    notes: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const locale = args.locale;
    if (!args.customerEmail.includes("@")) {
      throw new Error(
        tErr(locale, "Nieprawidłowy adres e-mail.", "Invalid email address."),
      );
    }

    // Price is recomputed server-side from the catalog — the client-supplied
    // quantity/format are validated here too (throws on unknown / out of range).
    const computed = computeOrderTotals(
      args.productSlug,
      args.formatId,
      args.quantity,
      locale,
    );

    capped(args.customerName, 120, "Imię i nazwisko", "Full name", locale);
    capped(args.customerEmail, 200, "E-mail", "Email", locale);
    capped(args.customerPhone, 40, "Telefon", "Phone", locale);
    capped(args.companyName, 200, "Nazwa firmy", "Company name", locale);
    capped(args.taxId, 30, "NIP", "Tax ID", locale);
    capped(args.shippingStreet, 200, "Ulica", "Street", locale);
    capped(args.shippingCity, 120, "Miasto", "City", locale);
    capped(args.shippingPostalCode, 20, "Kod pocztowy", "Postal code", locale);
    capped(args.shippingCountry, 120, "Kraj", "Country", locale);
    capped(args.fileUrl, 2000, "Link do pliku", "File link", locale);
    capped(args.notes, 2000, "Uwagi", "Notes", locale);

    const hasUpload = (args.fileKeys?.length ?? 0) > 0;
    const hasUrl = (args.fileUrl ?? "").trim() !== "";
    if (!hasUpload && !hasUrl) {
      throw new Error(
        tErr(
          locale,
          "Dodaj plik z projektem lub link do projektu (Drive / WeTransfer / Dropbox).",
          "Add a design file or a link to your design (Drive / WeTransfer / Dropbox).",
        ),
      );
    }

    const method = args.deliveryMethod ?? "courier";
    if (method === "courier") {
      if (
        !args.shippingStreet ||
        !args.shippingCity ||
        !args.shippingPostalCode
      ) {
        throw new Error(
          tErr(
            locale,
            "Adres dostawy jest wymagany dla wysyłki kurierem.",
            "A delivery address is required for courier shipping.",
          ),
        );
      }
    } else {
      if (!args.parcelLockerId) {
        throw new Error(
          tErr(locale, "Wybierz paczkomat InPost.", "Choose an InPost locker."),
        );
      }
    }

    const orderId = await ctx.db.insert("orders", {
      // Buyer-chosen, validated above
      productSlug: args.productSlug,
      formatId: args.formatId,
      customerName: args.customerName,
      customerEmail: args.customerEmail,
      customerPhone: args.customerPhone,
      companyName: args.companyName,
      taxId: args.taxId,
      shippingStreet: args.shippingStreet,
      shippingCity: args.shippingCity,
      shippingPostalCode: args.shippingPostalCode,
      shippingCountry: args.shippingCountry,
      parcelLockerId: args.parcelLockerId,
      parcelLockerName: args.parcelLockerName,
      parcelLockerAddress: args.parcelLockerAddress,
      parcelLockerDescription: args.parcelLockerDescription,
      fileUrl: args.fileUrl,
      notes: args.notes,
      source: args.source,
      // Server-computed — never trusted from the client
      productName: computed.productName,
      formatLabel: computed.formatLabel,
      quantity: computed.quantity,
      unitPrice: computed.unitPrice,
      netTotal: computed.netTotal,
      vatTotal: computed.vatTotal,
      grossTotal: computed.grossTotal,
      shippingFee: computed.shippingFee,
      deliveryMethod: method,
      status: "pending",
      paymentStatus: "unpaid",
    });

    const { fileKeys } = args;

    if (fileKeys && fileKeys.length > 0) {
      for (const fileKey of fileKeys) {
        const plik = await ctx.db
          .query("pliki_zamowien")
          .withIndex("by_fileKey", (q) => q.eq("fileKey", fileKey))
          .unique();
        if (plik) {
          await ctx.db.patch(plik._id, { zamowienieId: orderId });
        }
      }
    }

    return orderId;
  },
});

export const attachStripeSession = mutation({
  args: {
    serverSecret: v.string(),
    orderId: v.id("orders"),
    stripeSessionId: v.string(),
  },
  handler: async (ctx, args) => {
    assertServerSecret(args.serverSecret);
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Brak zamówienia.");
    await ctx.db.patch(args.orderId, {
      stripeSessionId: args.stripeSessionId,
    });
    return { ok: true as const };
  },
});

export const markPaid = mutation({
  args: {
    serverSecret: v.string(),
    stripeSessionId: v.string(),
    paymentIntentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    assertServerSecret(args.serverSecret);
    const order = await ctx.db
      .query("orders")
      .withIndex("by_stripe_session", (q) =>
        q.eq("stripeSessionId", args.stripeSessionId),
      )
      .unique();
    if (!order) {
      return { ok: false as const, reason: "order_not_found" as const };
    }
    if (order.paymentStatus === "paid") {
      return { ok: true as const, already: true as const };
    }
    await ctx.db.patch(order._id, {
      paymentStatus: "paid",
      paidAt: Date.now(),
      stripePaymentIntentId: args.paymentIntentId,
    });
    await ctx.scheduler.runAfter(0, internal.email.sendOrderStatusEmail, {
      orderId: order._id,
      kind: "pending",
    });
    await ctx.scheduler.runAfter(0, internal.email.sendAdminOrderNotification, {
      orderId: order._id,
    });
    await ctx.scheduler.runAfter(0, internal.discord.sendOrderNotification, {
      orderId: order._id,
    });
    return { ok: true as const, already: false as const };
  },
});

export const markPaymentFailed = mutation({
  args: {
    serverSecret: v.string(),
    stripeSessionId: v.string(),
  },
  handler: async (ctx, args) => {
    assertServerSecret(args.serverSecret);
    const order = await ctx.db
      .query("orders")
      .withIndex("by_stripe_session", (q) =>
        q.eq("stripeSessionId", args.stripeSessionId),
      )
      .unique();
    if (!order) {
      return { ok: false as const, reason: "order_not_found" as const };
    }
    if (order.paymentStatus === "paid") {
      return { ok: true as const, already: true as const };
    }
    await ctx.db.patch(order._id, {
      paymentStatus: "failed",
      status: "cancelled",
    });
    return { ok: true as const, already: false as const };
  },
});

export const getById = query({
  args: { serverSecret: v.string(), id: v.id("orders") },
  handler: async (ctx, args) => {
    assertServerSecret(args.serverSecret);
    return await ctx.db.get(args.id);
  },
});

export const getMyOrders = query({
  args: { token: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
    if (!session) return [];
    if (session.expiresAt < Date.now()) return [];
    const user = await ctx.db.get(session.userId);
    if (!user) return [];

    const limit = args.limit ?? 50;
    return await ctx.db
      .query("orders")
      .withIndex("by_email", (q) => q.eq("customerEmail", user.email))
      .order("desc")
      .take(limit);
  },
});
