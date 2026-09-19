import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";

import { SuccessContent } from "./components/success-content";
import { sideLabelForOrder } from "@/lib/products";
import {
  getConvexHttp,
  getServerSecret,
  orderIdsFromMetadata,
  stripe,
} from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Płatność potwierdzona · DobrePrinty",
  description: "Twoja płatność została zaksięgowana.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Params = { id: string };
type Search = { session_id?: string };

export default async function PaymentSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { id } = await params;
  const { session_id: sessionId } = await searchParams;

  const convex = getConvexHttp();
  const serverSecret = getServerSecret();
  const orderId = id as Id<"orders">;
  // Koszyk: jedna płatność = kilka zamówień spiętych bundleId. Pokazujemy
  // wszystko, co klient właśnie opłacił.
  const initial = await convex.query(api.orders.getBundleOrders, {
    serverSecret,
    id: orderId,
  });
  if (initial.length === 0) notFound();
  const anyUnpaid = initial.some((o) => o.paymentStatus !== "paid");

  // Synchronous verification with Stripe (like an OAuth callback) — no need to wait for the webhook.
  if (sessionId && anyUnpaid) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid") {
        const paymentIntentId =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id;
        const ids = orderIdsFromMetadata(session.metadata);
        const targets = ids.length > 0 ? ids : initial.map((o) => String(o._id));
        for (const target of targets) {
          await convex.mutation(api.orders.markPaid, {
            serverSecret,
            orderId: target,
            stripeSessionId: session.id,
            paymentIntentId,
          });
        }
      }
    } catch (err) {
      console.warn("[stripe/sukces] verify session", err);
    }
  }

  const bundle =
    sessionId && anyUnpaid
      ? ((await convex.query(api.orders.getBundleOrders, {
          serverSecret,
          id: orderId,
        })) ?? initial)
      : initial;
  const order = bundle.find((o) => String(o._id) === id) ?? bundle[0];
  const grossTotal = bundle.reduce((sum, o) => sum + o.grossTotal, 0);

  const paid = bundle.every((o) => o.paymentStatus === "paid");

  return (
    <SuccessContent
      paid={paid}
      test={order.test}
      orderId={String(order._id)}
      customerEmail={order.customerEmail}
      items={bundle.map((member) => ({
        id: String(member._id),
        productName: member.productName,
        quantity: member.quantity,
        formatLabel: member.formatLabel,
        sideLabel: sideLabelForOrder(member.productSlug, member.sides),
        grossTotal: member.grossTotal,
      }))}
      grossTotal={grossTotal}
    />
  );
}
