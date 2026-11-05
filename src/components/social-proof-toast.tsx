"use client";

import { useQuery } from "convex/react";
import { makeFunctionReference } from "convex/server";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { getProduct } from "@/lib/products";

import { ProductMockup } from "./product-mockup";

const FIRST_DELAY_MS = 6_000;
const ROLL_INTERVAL_MS = 20_000;
const VISIBLE_DURATION_MS = 6_500;
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

type Purchase = { productSlug: string; quantity: number; paidAt: number };

// Backend wdraża drukalo-poc; lokalny convex/ tej funkcji nie ma.
const recentPurchases = makeFunctionReference<
  "query",
  { brand: string },
  Purchase[]
>("recentPurchases:list");

const formatQty = new Intl.NumberFormat("pl-PL");

function timeAgo(paidAt: number): { key: string; count?: number } {
  const minutes = Math.floor((Date.now() - paidAt) / 60_000);
  if (minutes < 2) return { key: "justNow" };
  if (minutes < 60) return { key: "minutesAgo", count: minutes };
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return { key: "hoursAgo", count: hours };
  const days = Math.floor(hours / 24);
  return days === 1 ? { key: "yesterday" } : { key: "daysAgo", count: days };
}

// Tylko prawdziwe, opłacone zakupy z ostatniego tygodnia, każdy raz na wizytę.
// Bez zakupów powiadomienia się nie pokazują.
export function SocialProofToast() {
  const { t } = useTranslation("home");
  const purchases = useQuery(recentPurchases, { brand: "dobreprinty" });
  const [order, setOrder] = useState<Purchase | null>(null);
  const shown = useRef(new Set<number>());
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queue = useRef<Purchase[]>([]);
  queue.current = purchases ?? [];

  useEffect(() => {
    const show = () => {
      const next = queue.current.find(
        (p) =>
          !shown.current.has(p.paidAt) &&
          Date.now() - p.paidAt < MAX_AGE_MS &&
          getProduct(p.productSlug),
      );
      if (!next) return;
      shown.current.add(next.paidAt);
      setOrder(next);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setOrder(null), VISIBLE_DURATION_MS);
    };

    const firstTimer = setTimeout(show, FIRST_DELAY_MS);
    const roll = setInterval(show, ROLL_INTERVAL_MS);

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

  const product = order && getProduct(order.productSlug);
  const ago = order && timeAgo(order.paidAt);

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-40 max-w-[calc(100vw-2.5rem)]">
      <AnimatePresence>
        {order && product && ago && (
          <motion.output
            key={order.paidAt}
            initial={{ opacity: 0, x: -24, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex w-80 items-start gap-3 rounded-2xl border border-border bg-card p-3 shadow-2xl"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-border bg-background">
              <ProductMockup variant={product.variant} className="h-9 w-9" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                <span className="truncate">{t("socialProof.someone")}</span>
                <span aria-hidden>·</span>
                <span className="shrink-0">
                  {t(`socialProof.timeAgo.${ago.key}`, { count: ago.count })}
                </span>
              </p>
              <p className="mt-0.5 text-sm leading-snug text-foreground">
                {t("socialProof.ordered")}{" "}
                <span className="font-semibold">
                  {formatQty.format(order.quantity)}{" "}
                  {t(`socialProof.noun.${product.variant}`, {
                    count: order.quantity,
                    defaultValue: product.name,
                  })}
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={dismiss}
              aria-label={t("socialProof.dismiss")}
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
