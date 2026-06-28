import { NextResponse } from "next/server";

import { api } from "@convex/_generated/api";

import { getPostHogServer } from "@/lib/posthog-server";
import {
  assertStripeConfigured,
  getConvexHttp,
  getServerSecret,
  stripe,
} from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  assertStripeConfigured();

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[stripe/webhook] Brak STRIPE_WEBHOOK_SECRET.");
    return NextResponse.json({ error: "missing secret" }, { status: 500 });
  }

  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json(
      { error: "Brak nagłówka stripe-signature." },
      { status: 400 },
    );
  }

  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "signature error";
    console.error("[stripe/webhook] Bad signature:", message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 },
    );
  }

  const convex = getConvexHttp();
  const serverSecret = getServerSecret();

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object;
        if (session.payment_status === "paid") {
          const paymentIntentId =
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id;
          await convex.mutation(api.orders.markPaid, {
            serverSecret,
            stripeSessionId: session.id,
            paymentIntentId,
          });

          const posthog = getPostHogServer();
          if (posthog) {
            const email =
              session.customer_email ??
              session.customer_details?.email ??
              undefined;
            posthog.capture({
              distinctId: email ?? `stripe:${session.id}`,
              event: "purchase_completed",
              properties: {
                stripe_session_id: session.id,
                stripe_payment_intent_id: paymentIntentId,
                amount: session.amount_total != null
                  ? session.amount_total / 100
                  : undefined,
                currency: session.currency ?? undefined,
                email,
              },
            });
            await posthog.flush();
          }
        }
        break;
      }
      case "checkout.session.async_payment_failed":
      case "checkout.session.expired": {
        const session = event.data.object;
        await convex.mutation(api.orders.markPaymentFailed, {
          serverSecret,
          stripeSessionId: session.id,
        });
        break;
      }
      default:
        // ignore
        break;
    }
  } catch (err) {
    console.error("[stripe/webhook] handler error", event.type, err);
    return NextResponse.json(
      { error: "handler error" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
