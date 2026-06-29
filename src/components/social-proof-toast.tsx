"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { pickRandomOrder, type SocialProofOrder } from "@/lib/social-proof";

import { ProductMockup } from "./product-mockup";

const FIRST_DELAY_MS = 6_000;
const ROLL_INTERVAL_MS = 20_000;
const SHOW_PROBABILITY = 1;
const VISIBLE_DURATION_MS = 6_500;

const formatPLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
});
const formatQty = new Intl.NumberFormat("pl-PL");

export function SocialProofToast() {
  const [order, setOrder] = useState<SocialProofOrder | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const show = () => {
      setOrder(pickRandomOrder());
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setOrder(null), VISIBLE_DURATION_MS);
    };

    // Pierwsze powiadomienie pokazujemy szybko, żeby było widać że działa.
    const firstTimer = setTimeout(show, FIRST_DELAY_MS);

    // Potem co 20 s losujemy z 20% szansą kolejne powiadomienie.
    const roll = setInterval(() => {
      if (Math.random() < SHOW_PROBABILITY) show();
    }, ROLL_INTERVAL_MS);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(roll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const dismiss = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setOrder(null);
  };

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-40 max-w-[calc(100vw-2.5rem)]">
      <AnimatePresence>
        {order && (
          <motion.output
            key={order.id}
            initial={{ opacity: 0, x: -24, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex w-80 items-start gap-3 rounded-2xl border border-border bg-card p-3 shadow-2xl"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-border bg-background">
              <ProductMockup variant={order.variant} className="h-9 w-9" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                <span className="truncate">Ktoś {order.city}</span>
                <span aria-hidden>·</span>
                <span className="shrink-0">{order.timeAgo}</span>
              </p>
              <p className="mt-0.5 text-sm leading-snug text-foreground">
                zamówił(a){" "}
                <span className="font-semibold">
                  {formatQty.format(order.quantity)} {order.noun}
                </span>
              </p>
              <span className="mt-1.5 inline-flex items-center rounded-lg bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
                {formatPLN.format(order.amount)}
              </span>
            </div>

            <button
              type="button"
              onClick={dismiss}
              aria-label="Zamknij powiadomienie"
              className="-mr-1 -mt-1 shrink-0 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="size-4"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.output>
        )}
      </AnimatePresence>
    </div>
  );
}
