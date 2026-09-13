import { v } from "convex/values";

import { internal } from "./_generated/api";
import type { Doc } from "./_generated/dataModel";
import { type MutationCtx, mutation, query } from "./_generated/server";
import { type Locale, tErr } from "./i18nError";
import {
  computeItemTotals,
  computeOrderTotals,
  splitCartTotals,
} from "./orderPricing";
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
    /** zamówienie testowe — bez obciążenia i bez powiadomień */
    test: v.optional(v.boolean()),
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
      test: args.test,
      // Server-computed — never trusted from the client
      productName: computed.productName,
      formatLabel: computed.formatLabel,
      quantity: computed.quantity,
      unitPrice: computed.unitPrice,
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

/** Ile pozycji wolno wrzucić do jednego koszyka. Limit chroni mutację (N
 *  insertów w jednej transakcji) i metadane sesji Stripe, gdzie lecą id
 *  wszystkich zamówień (Stripe daje na wartość 500 znaków). */
const MAX_CART_ITEMS = 10;

/**
 * Koszyk: JEDNA płatność za kilka produktów.
 *
 * Każda pozycja zostaje OSOBNYM zamówieniem — osobny plik, status, faktura i
 * mail, tak jak działa reszta systemu. Spina je wspólny `bundleId` (grupa
 * realizacji): jeden zakup i jedna przesyłka na wspólny adres.
 *
 * Wysyłkę liczymy RAZ, od sumy całego koszyka (próg darmowej wysyłki też
 * patrzy na sumę), i doklejamy w całości do pierwszego zamówienia — patrz
 * `splitCartTotals`. Dzięki temu suma `grossTotal` zamówień = kwota, którą
 * realnie pobiera Stripe, więc maile i faktury się zgadzają.
 */
export const submitCart = mutation({
  args: {
    locale: v.optional(v.union(v.literal("pl"), v.literal("en"))),
    items: v.array(
      v.object({
        productSlug: v.string(),
        formatId: v.string(),
        quantity: v.number(),
        fileKeys: v.optional(v.array(v.string())),
        fileUrl: v.optional(v.string()),
        notes: v.optional(v.string()),
      }),
    ),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
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
    source: v.optional(v.string()),
    /** zamówienie testowe — bez obciążenia i bez powiadomień */
    test: v.optional(v.boolean()),
    /** marka wg domeny — obie domeny piszą do tej samej bazy */
    brand: v.optional(v.string()),
    /** first-touch atrybucja ruchu (patrz src/lib/attribution.ts) */
    attrChannel: v.optional(v.string()),
    attrSourceName: v.optional(v.string()),
    attrReferrer: v.optional(v.string()),
    attrUtmSource: v.optional(v.string()),
    attrLanding: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const locale = args.locale;
    if (!args.customerEmail.includes("@")) {
      throw new Error(
        tErr(locale, "Nieprawidłowy adres e-mail.", "Invalid email address."),
      );
    }
    if (args.items.length === 0) {
      throw new Error(tErr(locale, "Koszyk jest pusty.", "The cart is empty."));
    }
    if (args.items.length > MAX_CART_ITEMS) {
      throw new Error(
        tErr(
          locale,
          `Maksymalnie ${MAX_CART_ITEMS} pozycji w jednym zamówieniu.`,
          `At most ${MAX_CART_ITEMS} items per order.`,
        ),
      );
    }

    capped(args.customerName, 120, "Imię i nazwisko", "Full name", locale);
    capped(args.customerEmail, 200, "E-mail", "Email", locale);
    capped(args.customerPhone, 40, "Telefon", "Phone", locale);
    capped(args.shippingStreet, 200, "Ulica", "Street", locale);
    capped(args.shippingCity, 120, "Miasto", "City", locale);
    capped(args.shippingPostalCode, 20, "Kod pocztowy", "Postal code", locale);
    capped(args.shippingCountry, 120, "Kraj", "Country", locale);

    // Ceny liczone server-side z katalogu (rzuca na nieznany produkt/format i
    // zły nakład) — klient nigdy nie dyktuje kwoty.
    const computed = args.items.map((item) =>
      computeItemTotals(item.productSlug, item.formatId, item.quantity, locale),
    );

    for (const item of args.items) {
      capped(item.fileUrl, 2000, "Link do pliku", "File link", locale);
      capped(item.notes, 2000, "Uwagi", "Notes", locale);
      const hasUpload = (item.fileKeys?.length ?? 0) > 0;
      const hasUrl = (item.fileUrl ?? "").trim() !== "";
      if (!hasUpload && !hasUrl) {
        throw new Error(
          tErr(
            locale,
            "Każda pozycja potrzebuje pliku z projektem lub linku do projektu (Drive / WeTransfer / Dropbox).",
            "Every item needs a design file or a link to the design (Drive / WeTransfer / Dropbox).",
          ),
        );
      }
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

    const lines = splitCartTotals(computed);
    // Jedno zamówienie w koszyku = zwykłe zamówienie. Jednoelementowa grupa nie
    // ma sensu.
    const bundleId = args.items.length > 1 ? crypto.randomUUID() : undefined;

    const orderIds = [];
    for (let i = 0; i < args.items.length; i++) {
      const cfg = args.items[i];
      const priced = computed[i];
      const totals = lines[i];
      const orderId = await ctx.db.insert("orders", {
        // Buyer-chosen, validated above
        productSlug: cfg.productSlug,
        formatId: cfg.formatId,
        customerName: args.customerName,
        customerEmail: args.customerEmail,
        customerPhone: args.customerPhone,
        shippingStreet: args.shippingStreet,
        shippingCity: args.shippingCity,
        shippingPostalCode: args.shippingPostalCode,
        shippingCountry: args.shippingCountry,
        parcelLockerId: args.parcelLockerId,
        parcelLockerName: args.parcelLockerName,
        parcelLockerAddress: args.parcelLockerAddress,
        parcelLockerDescription: args.parcelLockerDescription,
        fileUrl: cfg.fileUrl,
        notes: cfg.notes,
        source: args.source,
        test: args.test,
        brand: args.brand,
        attrChannel: args.attrChannel,
        attrSourceName: args.attrSourceName,
        attrReferrer: args.attrReferrer,
        attrUtmSource: args.attrUtmSource,
        attrLanding: args.attrLanding,
        // Server-computed — never trusted from the client
        productName: priced.productName,
        formatLabel: priced.formatLabel,
        quantity: priced.quantity,
        unitPrice: priced.unitPrice,
        grossTotal: totals.grossTotal,
        shippingFee: totals.shippingFee,
        deliveryMethod: method,
        status: "pending",
        paymentStatus: "unpaid",
        bundleId,
      });
      orderIds.push(orderId);

      for (const fileKey of cfg.fileKeys ?? []) {
        const plik = await ctx.db
          .query("pliki_zamowien")
          .withIndex("by_fileKey", (q) => q.eq("fileKey", fileKey))
          .unique();
        if (plik) {
          await ctx.db.patch(plik._id, { zamowienieId: orderId });
        }
      }
    }

    // Wszystkie pozycje idą na ten sam adres, więc punkt dostawy grupy jest
    // jednoznaczny — wskazujemy pierwsze zamówienie.
    if (bundleId) {
      for (const id of orderIds) {
        await ctx.db.patch(id, { bundleShipToOrderId: orderIds[0] });
      }
    }

    return { orderIds, bundleId };
  },
});

export const attachStripeSession = mutation({
  args: {
    serverSecret: v.string(),
    orderId: v.id("orders"),
    stripeSessionId: v.string(),
    // Ustawiany tylko przy pierwszej sesji z NIP-em — kolejne go odczytują.
    stripeCustomerId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    assertServerSecret(args.serverSecret);
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Brak zamówienia.");
    await ctx.db.patch(args.orderId, {
      stripeSessionId: args.stripeSessionId,
      ...(args.stripeCustomerId
        ? { stripeCustomerId: args.stripeCustomerId }
        : {}),
    });
    return { ok: true as const };
  },
});

/**
 * Dopina fakturę ze Stripe do zamówienia i wysyła ją klientowi mailem.
 *
 * Własny mail, bo dostarczenie dokumentu nie może zależeć od ustawienia
 * „Customer emails" w Dashboardzie Stripe'a. `invoiceEmailSentAt` pilnuje,
 * żeby klient nie dostał faktury dwa razy.
 */
export const attachStripeInvoice = mutation({
  args: {
    serverSecret: v.string(),
    orderId: v.id("orders"),
    hostedUrl: v.optional(v.string()),
    pdfUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    assertServerSecret(args.serverSecret);
    const order = await ctx.db.get(args.orderId);
    if (!order) {
      return { ok: false as const, reason: "order_not_found" as const };
    }

    await ctx.db.patch(args.orderId, {
      ...(args.hostedUrl ? { stripeInvoiceUrl: args.hostedUrl } : {}),
      ...(args.pdfUrl ? { stripeInvoicePdf: args.pdfUrl } : {}),
    });

    if (order.invoiceEmailSentAt != null) {
      return { ok: true as const, already: true as const };
    }
    // Zamówienie testowe nie mailuje nikogo — tak samo jak przy markPaid.
    if (order.test) return { ok: true as const, already: true as const };
    if (!args.hostedUrl && !args.pdfUrl) {
      return { ok: true as const, already: false as const, sent: false as const };
    }

    await ctx.db.patch(args.orderId, { invoiceEmailSentAt: Date.now() });
    await ctx.scheduler.runAfter(0, internal.email.sendInvoiceEmail, {
      orderId: args.orderId,
    });
    return { ok: true as const, already: false as const, sent: true as const };
  },
});

/**
 * Znajduje zamówienie płatności: NAJPIERW po `orderId` (metadane sesji Stripe),
 * a dopiero potem po id sesji. Przy koszyku jedną sesję dzieli kilka zamówień,
 * więc szukanie po sesji nie jest jednoznaczne — `orderId` jest.
 */
async function findPaymentOrder(
  ctx: MutationCtx,
  orderId: string | undefined,
  stripeSessionId: string | undefined,
): Promise<Doc<"orders"> | null> {
  if (orderId) {
    try {
      const byId = await ctx.db.get(orderId as Doc<"orders">["_id"]);
      if (byId) return byId;
    } catch {
      // Id z innego wdrożenia albo źle sformowane — spadamy na szukanie po sesji.
    }
  }
  if (!stripeSessionId) return null;
  return await ctx.db
    .query("orders")
    .withIndex("by_stripe_session", (q) =>
      q.eq("stripeSessionId", stripeSessionId),
    )
    .first();
}

export const markPaid = mutation({
  args: {
    serverSecret: v.string(),
    // Z metadanych sesji Stripe — pewniejsze niż id sesji, a przy koszyku
    // JEDYNE wyjście: jedną sesję dzieli kilka zamówień.
    orderId: v.optional(v.string()),
    stripeSessionId: v.optional(v.string()),
    paymentIntentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    assertServerSecret(args.serverSecret);
    const order = await findPaymentOrder(
      ctx,
      args.orderId,
      args.stripeSessionId,
    );
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
    orderId: v.optional(v.string()),
    stripeSessionId: v.string(),
  },
  handler: async (ctx, args) => {
    assertServerSecret(args.serverSecret);
    const order = await findPaymentOrder(
      ctx,
      args.orderId,
      args.stripeSessionId,
    );
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

/**
 * Zamówienia z grupy realizacji (koszyk) — najstarsze pierwsze. Zamówienie
 * spoza koszyka → jednoelementowa lista. Strona sukcesu pokazuje dzięki temu
 * wszystko, co klient właśnie opłacił, a nie jedną pozycję.
 */
export const getBundleOrders = query({
  args: { serverSecret: v.string(), id: v.id("orders") },
  handler: async (ctx, args) => {
    assertServerSecret(args.serverSecret);
    const order = await ctx.db.get(args.id);
    if (!order) return [];
    if (!order.bundleId) return [order];
    const members = await ctx.db
      .query("orders")
      .withIndex("by_bundle", (q) => q.eq("bundleId", order.bundleId))
      .collect();
    return (members.length ? members : [order]).sort(
      (a, b) => a._creationTime - b._creationTime,
    );
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
