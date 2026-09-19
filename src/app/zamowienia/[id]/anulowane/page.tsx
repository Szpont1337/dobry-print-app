import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";

import { getConvexHttp, getServerSecret, stripe } from "@/lib/stripe";

import { CancelledContent } from "./components/cancelled-content";

export const metadata: Metadata = {
  title: "Płatność anulowana · DobrePrinty",
  description: "Płatność została anulowana, zamówienie nie zostało przyjęte.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Params = { id: string };
type Search = { session_id?: string };

export default async function PaymentCancelledPage({
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
  // Koszyk = kilka zamówień na jednej sesji; anulujemy całą grupę.
  const bundle = await convex.query(api.orders.getBundleOrders, {
    serverSecret,
    id: id as Id<"orders">,
  });
  const order = bundle.find((o) => String(o._id) === id);
  if (!order) notFound();

  // Hard rule: no retry. Expire the Stripe session and mark the orders.
  if (sessionId && order.paymentStatus !== "paid") {
    try {
      await stripe.checkout.sessions.expire(sessionId);
    } catch (err) {
      // Session may already be expired — not an error.
      console.warn("[stripe/cancel] expire session", err);
    }
    for (const member of bundle) {
      try {
        await convex.mutation(api.orders.markPaymentFailed, {
          serverSecret,
          orderId: String(member._id),
          stripeSessionId: sessionId,
        });
      } catch (err) {
        console.error("[stripe/cancel] markPaymentFailed", err);
      }
    }
  }

  return (
    <CancelledContent
      orderId={String(order._id)}
      productSlug={order.productSlug}
      items={bundle.map((member) => ({
        id: String(member._id),
        productName: member.productName,
        grossTotal: member.grossTotal,
      }))}
      grossTotal={bundle.reduce((sum, o) => sum + o.grossTotal, 0)}
    />
  );
}
