import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";

import { Header } from "@/components/header";
import { Button } from "@/components/ui";
import { getConvexHttp, getServerSecret, stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Płatność potwierdzona · DobrePrinty",
  description: "Twoja płatność została zaksięgowana.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const formatPLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  minimumFractionDigits: 2,
});
const formatQty = new Intl.NumberFormat("pl-PL");

function shortId(id: string) {
  return id.slice(-8).toUpperCase();
}

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
  const initial = await convex.query(api.orders.getById, {
    serverSecret,
    id: orderId,
  });
  if (!initial) notFound();

  // Synchronous verification with Stripe (like an OAuth callback) — no need to wait for the webhook.
  if (sessionId && initial.paymentStatus !== "paid") {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
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
      }
    } catch (err) {
      console.warn("[stripe/sukces] verify session", err);
    }
  }

  const order =
    sessionId && initial.paymentStatus !== "paid"
      ? ((await convex.query(api.orders.getById, {
          serverSecret,
          id: orderId,
        })) ?? initial)
      : initial;

  const paid = order.paymentStatus === "paid";

  return (
    <main className="relative flex flex-1 flex-col bg-background-alt">
      <Header />
      <section className="mx-auto flex w-full max-w-xl flex-col px-5 py-13 sm:px-8 sm:py-21">
        <div className="flex flex-col items-center gap-5 border border-border bg-card p-8 text-center sm:p-13">
          <span className="grid size-16 place-items-center rounded-full bg-accent text-primary">
            {paid ? (
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
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : (
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
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            )}
          </span>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-primary">
            Zamówienie #{shortId(String(order._id))}
          </p>
          {paid ? (
            <>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Dziękujemy za zamówienie!
              </h1>
              <p className="max-w-md text-muted-foreground">
                Płatność potwierdzona. Potwierdzenie wysłaliśmy na{" "}
                <strong className="text-foreground">
                  {order.customerEmail}
                </strong>
                . Sprawdzamy plik i ruszamy z produkcją w ciągu 24 godzin.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Płatność jest przetwarzana.
              </h1>
              <p className="max-w-md text-muted-foreground">
                Otrzymaliśmy potwierdzenie od Stripe, ale jeszcze nie
                zaksięgowaliśmy płatności. Odśwież stronę za chwilę — jak tylko
                wszystko będzie ok, wyślemy Ci potwierdzenie na{" "}
                <strong className="text-foreground">
                  {order.customerEmail}
                </strong>
                .
              </p>
            </>
          )}

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
                Nakład
              </span>
              <span className="text-right font-semibold text-foreground">
                {formatQty.format(order.quantity)} szt. · {order.formatLabel}
              </span>
            </div>
            <div className="flex items-start justify-between gap-4 border-t border-border pt-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                Razem brutto
              </span>
              <span className="text-right font-extrabold tracking-tight text-foreground">
                {formatPLN.format(order.grossTotal)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Button href="/konto" variant="primary">
              Zobacz w panelu
            </Button>
            <Button href="/" variant="outline">
              Strona główna
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
