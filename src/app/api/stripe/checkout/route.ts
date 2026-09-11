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
  /** koszyk: wszystkie zamówienia z jednej grupy (bundle) */
  orderIds?: string[];
  /** pojedyncze zamówienie — zgodność ze starymi wywołaniami */
  orderId?: string;
  locale?: string;
  /** ?test — pełny przepływ bez pobierania pieniędzy */
  test?: boolean;
};

export async function POST(request: Request) {
  try {
    assertStripeConfigured();

    const body = (await request.json().catch(() => ({}))) as Body;
    const ids = body.orderIds?.length ? body.orderIds : body.orderId ? [body.orderId] : [];
    if (ids.length === 0) {
      return NextResponse.json({ error: "Brak orderId." }, { status: 400 });
    }

    const convex = getConvexHttp();
    const serverSecret = getServerSecret();

    const orders = [];
    for (const id of ids) {
      const order = await convex.query(api.orders.getById, {
        serverSecret,
        id: id as Id<"orders">,
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
      orders.push(order);
    }

    const site = getSiteUrl();
    const locale = body.locale === "en" ? "en" : "pl";

    // Zamówienie testowe: pomijamy Stripe i od razu księgujemy „wpłatę".
    // `applyPaid` w Convexie widzi flagę `test` i nie wysyła maili ani Discorda,
    // więc klient przechodzi całą ścieżkę, a na zewnątrz nic się nie dzieje.
    if (body.test) {
      for (const member of orders) {
        await convex.mutation(api.orders.markPaid, {
          serverSecret,
          orderId: String(member._id),
        });
      }
      return NextResponse.json({
        url: `${site}/zamowienia/${orders[0]._id}/sukces`,
      });
    }
    // Zamówienie prowadzące: na nie wraca klient po płatności i jego kwota
    // zawiera wysyłkę całego koszyka (patrz convex/orderPricing splitCartTotals).
    const lead = orders[0];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: "pln",
      customer_email: lead.customerEmail,
      locale,
      // Jedna pozycja Stripe = jedno zamówienie, więc suma sesji zgadza się co
      // do grosza z kwotami zapisanymi w bazie (maile, faktury, panel).
      line_items: orders.map((order) => ({
        quantity: 1,
        price_data: {
          currency: "pln" as const,
          unit_amount: Math.round(order.grossTotal * 100),
          product_data: {
            name: order.productName,
            description: `${order.formatLabel} · ${order.quantity} szt.`,
          },
        },
      })),
      // orderIds = klucz księgowania całego koszyka. Webhook i strona sukcesu
      // oznaczają po nim KAŻDE zamówienie; samo id sesji nie wystarcza, bo
      // dzieli je kilka zamówień naraz.
      metadata: {
        orderId: String(lead._id),
        orderIds: orders.map((o) => String(o._id)).join(","),
      },
      payment_intent_data: {
        metadata: {
          orderId: String(lead._id),
          orderIds: orders.map((o) => String(o._id)).join(","),
        },
      },
      invoice_creation: { enabled: true },
      success_url: `${site}/zamowienia/${lead._id}/sukces?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/zamowienia/${lead._id}/anulowane?session_id={CHECKOUT_SESSION_ID}`,
    });

    for (const order of orders) {
      await convex.mutation(api.orders.attachStripeSession, {
        serverSecret,
        orderId: order._id,
        stripeSessionId: session.id,
      });
    }

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
