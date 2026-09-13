import { NextResponse } from "next/server";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";

import { getPostHogServer } from "@/lib/posthog-server";
import {
  assertStripeConfigured,
  getConvexHttp,
  getServerSecret,
  orderIdsFromMetadata,
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
          // Koszyk = kilka zamówień na jednej sesji. Księgujemy każde po jego
          // id z metadanych; bez tego znalezione byłoby tylko jedno.
          const orderIds = orderIdsFromMetadata(session.metadata);
          if (orderIds.length > 0) {
            for (const orderId of orderIds) {
              await convex.mutation(api.orders.markPaid, {
                serverSecret,
                orderId,
                stripeSessionId: session.id,
                paymentIntentId,
              });
            }
          } else {
            await convex.mutation(api.orders.markPaid, {
              serverSecret,
              stripeSessionId: session.id,
              paymentIntentId,
            });
          }

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
      case "invoice.paid": {
        // Faktura ze Stripe (invoice_creation na sesji). Zapisujemy linki przy
        // zamówieniu i wysyłamy własny mail — dostarczenie dokumentu nie może
        // zależeć od ustawienia „Customer emails" w Dashboardzie Stripe'a.
        // Mapowanie po metadanych z invoice_creation.invoice_data.metadata.
        const invoice = event.data.object;
        for (const orderId of orderIdsFromMetadata(invoice.metadata)) {
          await convex.mutation(api.orders.attachStripeInvoice, {
            serverSecret,
            orderId: orderId as Id<"orders">,
            hostedUrl: invoice.hosted_invoice_url ?? undefined,
            pdfUrl: invoice.invoice_pdf ?? undefined,
          });
        }
        break;
      }
      case "payment_intent.succeeded": {
        // Pas bezpieczeństwa dla płatności async (BLIK/Przelewy24): gdy w Stripe
        // nie włączono `checkout.session.async_payment_succeeded`, to JEDYNY
        // event potwierdzający wpłatę w czasie rzeczywistym. Klucz —
        // `metadata.orderId` z payment_intent_data. Idempotentne: markPaid
        // pomija już zaksięgowane.
        const intent = event.data.object;
        for (const orderId of orderIdsFromMetadata(intent.metadata)) {
          await convex.mutation(api.orders.markPaid, {
            serverSecret,
            orderId,
            paymentIntentId: intent.id,
          });
        }
        break;
      }
      case "charge.refunded": {
        // Zwrot zrobiony z Dashboardu Stripe albo przez API. Klient dostaje
        // mail „pieniądze wracają" — inaczej widzi tylko przelew bez kontekstu.
        //
        // Metadane: Charge dziedziczy je z PaymentIntent, ale nie polegamy na
        // tym w ciemno — gdy ich nie ma, dociągamy sam PaymentIntent.
        const charge = event.data.object;
        let orderIds = orderIdsFromMetadata(charge.metadata);
        const intentId =
          typeof charge.payment_intent === "string"
            ? charge.payment_intent
            : charge.payment_intent?.id;
        if (orderIds.length === 0 && intentId) {
          const intent = await stripe.paymentIntents.retrieve(intentId);
          orderIds = orderIdsFromMetadata(intent.metadata);
        }

        const full = charge.amount_refunded >= charge.amount;
        if (full) {
          // Koszyk = jedno obciążenie na kilka zamówień. Przy pełnym zwrocie
          // każde dostaje własną kwotę, więc maile się zgadzają co do grosza.
          for (const orderId of orderIds) {
            await convex.mutation(api.orders.markRefunded, {
              serverSecret,
              orderId,
              full: true,
            });
          }
        } else if (orderIds.length > 0) {
          // Zwrot częściowy z jednego obciążenia na kilka zamówień — nie da się
          // powiedzieć, którego dotyczy. Przypisujemy go zamówieniu wiodącemu
          // (metadata.orderId), czyli temu, na które wraca klient po płatności.
          await convex.mutation(api.orders.markRefunded, {
            serverSecret,
            orderId: orderIds[0],
            refundedTotal: charge.amount_refunded / 100,
            full: false,
          });
        }
        break;
      }
      case "checkout.session.async_payment_failed":
      case "checkout.session.expired": {
        const session = event.data.object;
        const orderIds = orderIdsFromMetadata(session.metadata);
        if (orderIds.length > 0) {
          for (const orderId of orderIds) {
            await convex.mutation(api.orders.markPaymentFailed, {
              serverSecret,
              orderId,
              stripeSessionId: session.id,
            });
          }
        } else {
          await convex.mutation(api.orders.markPaymentFailed, {
            serverSecret,
            stripeSessionId: session.id,
          });
        }
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
