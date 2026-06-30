import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";

import { Header } from "@/components/header";
import { Button } from "@/components/ui";
import { getConvexHttp, getServerSecret, stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Płatność anulowana · DobrePrinty",
  description: "Płatność została anulowana, zamówienie nie zostało przyjęte.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const formatPLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  minimumFractionDigits: 2,
});

function shortId(id: string) {
  return id.slice(-8).toUpperCase();
}

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
  const order = await convex.query(api.orders.getById, {
    serverSecret,
    id: id as Id<"orders">,
  });
  if (!order) notFound();

  // Hard rule: no retry. Expire the Stripe session and mark the order.
  if (sessionId && order.paymentStatus !== "paid") {
    try {
      await stripe.checkout.sessions.expire(sessionId);
    } catch (err) {
      // Session may already be expired — not an error.
      console.warn("[stripe/cancel] expire session", err);
    }
    try {
      await convex.mutation(api.orders.markPaymentFailed, {
        serverSecret,
        stripeSessionId: sessionId,
      });
    } catch (err) {
      console.error("[stripe/cancel] markPaymentFailed", err);
    }
  }

  return (
    <main className="relative flex flex-1 flex-col bg-background-alt">
      <Header />
      <section className="mx-auto flex w-full max-w-xl flex-col px-5 py-13 sm:px-8 sm:py-21">
        <div className="flex flex-col items-center gap-5 border border-border bg-card p-8 text-center sm:p-13">
          <span className="grid size-16 place-items-center rounded-full bg-destructive/10 text-destructive">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="size-8"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </span>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Zamówienie #{shortId(String(order._id))}
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Płatność anulowana.
          </h1>
          <p className="max-w-md text-muted-foreground">
            Zamówienie nie zostało przyjęte — nic nie obciążyliśmy. Jeśli to
            pomyłka, złóż je ponownie z poziomu strony produktu.
          </p>

          <div className="mt-2 grid w-full max-w-md gap-3 border border-border bg-background-alt px-5 py-4 text-left text-sm">
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Produkt
              </span>
              <span className="text-right font-semibold text-foreground">
                {order.productName}
              </span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Kwota
              </span>
              <span className="text-right font-semibold text-foreground">
                {formatPLN.format(order.grossTotal)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Button href={`/produkty/${order.productSlug}`} variant="primary">
              Wróć do produktu
            </Button>
            <Button href="/#produkty" variant="outline">
              Inne produkty
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
