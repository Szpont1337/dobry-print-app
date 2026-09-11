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
    // Koszyk = kilka zamówień z jednej płatności. Link „zapłać" musi domknąć
    // CAŁĄ grupę — inaczej klient zapłaciłby tylko jedną pozycję i dostał
    // niekompletną paczkę.
    const bundle = await convex.query(api.orders.getBundleOrders, {
      serverSecret,
      id: orderId as Id<"orders">,
    });
    const order = bundle.find((o) => String(o._id) === orderId);

    if (!order) {
      return NextResponse.redirect(`${site}/`);
    }
    if (order.paymentStatus === "paid") {
      return NextResponse.redirect(`${site}/zamowienia/${order._id}/sukces`);
    }
    if (order.status === "cancelled") {
      return NextResponse.redirect(`${site}/zamowienia/${order._id}/anulowane`);
    }

    // Opłacone pozycje z grupy pomijamy (płatność częściowa nie powinna się
    // zdarzyć, ale nie każemy płacić dwa razy).
    const toPay = bundle.filter(
      (o) => o.paymentStatus !== "paid" && o.status !== "cancelled",
    );
    const orders = toPay.length > 0 ? toPay : [order];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: "pln",
      customer_email: order.customerEmail,
      locale: "pl",
      line_items: orders.map((member) => ({
        quantity: 1,
        price_data: {
          currency: "pln" as const,
          unit_amount: Math.round(member.grossTotal * 100),
          product_data: {
            name: member.productName,
            description: `${member.formatLabel} · ${member.quantity} szt.`,
          },
        },
      })),
      metadata: {
        orderId: String(order._id),
        orderIds: orders.map((o) => String(o._id)).join(","),
      },
      payment_intent_data: {
        metadata: {
          orderId: String(order._id),
          orderIds: orders.map((o) => String(o._id)).join(","),
        },
      },
      invoice_creation: { enabled: true },
      success_url: `${site}/zamowienia/${order._id}/sukces?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/zamowienia/${order._id}/anulowane?session_id={CHECKOUT_SESSION_ID}`,
    });

    for (const member of orders) {
      await convex.mutation(api.orders.attachStripeSession, {
        serverSecret,
        orderId: member._id,
        stripeSessionId: session.id,
      });
    }

    if (!session.url) {
      return NextResponse.redirect(`${site}/`);
    }

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("[stripe/pay]", err);
    return NextResponse.redirect(`${site}/`);
  }
}
