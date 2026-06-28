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

type Body = {
  orderId?: string;
  locale?: string;
};

export async function POST(request: Request) {
  try {
    assertStripeConfigured();

    const body = (await request.json().catch(() => ({}))) as Body;
    const orderId = body.orderId;
    if (!orderId) {
      return NextResponse.json(
        { error: "Brak orderId." },
        { status: 400 },
      );
    }

    const convex = getConvexHttp();
    const serverSecret = getServerSecret();
    const order = await convex.query(api.orders.getById, {
      serverSecret,
      id: orderId as Id<"orders">,
    });

    if (!order) {
      return NextResponse.json(
        { error: "Zamówienie nie istnieje." },
        { status: 404 },
      );
    }

    if (order.paymentStatus === "paid") {
      return NextResponse.json(
        { error: "Zamówienie już opłacone." },
        { status: 409 },
      );
    }

    const site = getSiteUrl();
    const unitAmount = Math.round(order.grossTotal * 100);
    const locale = body.locale === "en" ? "en" : "pl";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: "pln",
      customer_email: order.customerEmail,
      locale,
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
      metadata: {
        orderId: String(order._id),
      },
      payment_intent_data: {
        metadata: {
          orderId: String(order._id),
        },
      },
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
      return NextResponse.json(
        { error: "Stripe nie zwrócił URL sesji." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Błąd serwera płatności.";
    console.error("[stripe/checkout]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
