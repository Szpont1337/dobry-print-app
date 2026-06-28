import { NextResponse } from "next/server";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";

import {
  assertStripeConfigured,
  getConvexHttp,
  getServerSecret,
  getSiteUrl,
  stripe,
} from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/stripe/pay?order=<id>
// Stable, clickable pay link used by payment-reminder emails: creates a fresh
// Stripe Checkout session for an unpaid order and redirects the customer to it.
export async function GET(request: Request) {
  const site = getSiteUrl();
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("order");

  if (!orderId) {
    return NextResponse.redirect(`${site}/`);
  }

  try {
    assertStripeConfigured();

    const convex = getConvexHttp();
    const serverSecret = getServerSecret();
    const order = await convex.query(api.orders.getById, {
      serverSecret,
      id: orderId as Id<"orders">,
    });

    if (!order) {
      return NextResponse.redirect(`${site}/`);
    }
    if (order.paymentStatus === "paid") {
      return NextResponse.redirect(`${site}/zamowienia/${order._id}/sukces`);
    }
    if (order.status === "cancelled") {
      return NextResponse.redirect(`${site}/zamowienia/${order._id}/anulowane`);
    }

    const unitAmount = Math.round(order.grossTotal * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: "pln",
      customer_email: order.customerEmail,
      locale: "pl",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "pln",
            unit_amount: unitAmount,
            product_data: {
              name: order.productName,
              description: `${order.formatLabel} · ${order.quantity} szt.`,
            },
          },
        },
      ],
      metadata: { orderId: String(order._id) },
      payment_intent_data: { metadata: { orderId: String(order._id) } },
      invoice_creation: { enabled: true },
      success_url: `${site}/zamowienia/${order._id}/sukces?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/zamowienia/${order._id}/anulowane?session_id={CHECKOUT_SESSION_ID}`,
    });

    await convex.mutation(api.orders.attachStripeSession, {
      serverSecret,
      orderId: order._id,
      stripeSessionId: session.id,
    });

    if (!session.url) {
      return NextResponse.redirect(`${site}/`);
    }

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("[stripe/pay]", err);
    return NextResponse.redirect(`${site}/`);
  }
}
