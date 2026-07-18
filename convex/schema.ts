import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    // Product configuration
    productSlug: v.string(),
    productName: v.string(),
    formatId: v.string(),
    formatLabel: v.string(),
    quantity: v.number(),

    // Price (all values in PLN)
    unitPrice: v.number(),
    netTotal: v.number(),
    vatTotal: v.number(),
    grossTotal: v.number(),
    // Shipping fee (gross, in PLN). 0 / absent means free shipping.
    shippingFee: v.optional(v.number()),

    // Customer details
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    companyName: v.optional(v.string()),
    taxId: v.optional(v.string()),

    // Delivery method
    deliveryMethod: v.optional(
      v.union(v.literal("courier"), v.literal("parcel_locker")),
    ),

    // Shipping address (courier)
    shippingStreet: v.optional(v.string()),
    shippingCity: v.optional(v.string()),
    shippingPostalCode: v.optional(v.string()),
    shippingCountry: v.optional(v.string()),

    // InPost parcel locker
    parcelLockerId: v.optional(v.string()),
    parcelLockerName: v.optional(v.string()),
    parcelLockerAddress: v.optional(v.string()),
    parcelLockerDescription: v.optional(v.string()),

    // Optional
    fileUrl: v.optional(v.string()),
    notes: v.optional(v.string()),

    // Shipment
    trackingNumber: v.optional(v.string()),
    carrier: v.optional(v.string()),

    // Pickup point (package awaiting pickup)
    pickupPointAddress: v.optional(v.string()),
    pickupCode: v.optional(v.string()),
    pickupPhone: v.optional(v.string()),

    // Status and metadata
    status: v.union(
      v.literal("pending"),
      v.literal("in_production"),
      v.literal("ready_to_ship"),
      v.literal("shipped"),
      v.literal("awaiting_pickup"),
      v.literal("completed"),
      v.literal("cancelled"),
    ),
    source: v.optional(v.string()),

    // Payment (Stripe)
    paymentStatus: v.optional(
      v.union(
        v.literal("unpaid"),
        v.literal("paid"),
        v.literal("failed"),
      ),
    ),
    stripeSessionId: v.optional(v.string()),
    stripePaymentIntentId: v.optional(v.string()),
    paidAt: v.optional(v.number()),

    // Automated payment reminders
    paymentReminderCount: v.optional(v.number()),
    lastPaymentReminderAt: v.optional(v.number()),
    // When true, the reminder cron never auto-cancels this order (manual override).
    autoCancelPaused: v.optional(v.boolean()),
  })
    .index("by_email", ["customerEmail"])
    .index("by_status", ["status"])
    .index("by_stripe_session", ["stripeSessionId"])
    .index("by_payment_status", ["paymentStatus"]),

  pliki_zamowien: defineTable({
    fileKey: v.string(),
    fileName: v.string(),
    fileSize: v.number(),
    fileType: v.string(),
    status: v.union(
      v.literal("oczekuje_weryfikacji"),
      v.literal("zatwierdzony"),
      v.literal("odrzucony"),
    ),
    zamowienieId: v.optional(v.id("orders")),
  })
    .index("by_fileKey", ["fileKey"])
    .index("by_status", ["status"])
    .index("by_zamowienieId", ["zamowienieId"]),

  // Short, shareable links that let a printing house download an order's
  // files (as a ZIP or individually) without an admin login. The `code` is an
  // unguessable random token; access is gated solely by knowing it.
  share_links: defineTable({
    code: v.string(),
    orderId: v.id("orders"),
    createdAt: v.number(),
    // Optional expiry (epoch ms). Absent = never expires.
    expiresAt: v.optional(v.number()),
  })
    .index("by_code", ["code"])
    .index("by_order", ["orderId"]),

  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    lastLoginAt: v.optional(v.number()),
    locale: v.optional(v.string()),
  }).index("by_email", ["email"]),

  auth_codes: defineTable({
    email: v.string(),
    code: v.string(),
    expiresAt: v.number(),
    consumed: v.boolean(),
    attempts: v.number(),
  }).index("by_email", ["email"]),

  sessions: defineTable({
    userId: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
  })
    .index("by_token", ["token"])
    .index("by_user", ["userId"]),

  // Allegro offer mapping: productSlug -> the Allegro auction we re-buy from.
  // Used by the "Kup na Allegro" admin flow to open the right offer.
  allegroOffers: defineTable({
    productSlug: v.string(),
    offerUrl: v.string(), // https://allegro.pl/oferta/...
    variantNote: v.optional(v.string()), // hint, e.g. "A3, 25 szt."
    label: v.optional(v.string()),
    active: v.optional(v.boolean()),
  }).index("by_productSlug", ["productSlug"]),

  user_profiles: defineTable({
    userId: v.id("users"),
    companyName: v.optional(v.string()),
    taxId: v.optional(v.string()),
    phone: v.optional(v.string()),
    shippingStreet: v.optional(v.string()),
    shippingCity: v.optional(v.string()),
    shippingPostalCode: v.optional(v.string()),
    shippingCountry: v.optional(v.string()),
  }).index("by_user", ["userId"]),
});
