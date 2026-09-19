"use client";

import Link from "next/link";
import { Trans, useTranslation } from "react-i18next";

import { Header } from "@/components/header";
import { Button } from "@/components/ui";

import { ClearCartOnSuccess } from "./clear-cart-on-success";

const formatPLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  minimumFractionDigits: 2,
});
const formatQty = new Intl.NumberFormat("pl-PL");

function shortId(id: string) {
  return id.slice(-8).toUpperCase();
}

export type SuccessItem = {
  id: string;
  productName: string;
  quantity: number;
  formatLabel: string | null | undefined;
  sideLabel: string | null;
  grossTotal: number;
};

export function SuccessContent({
  paid,
  test,
  orderId,
  customerEmail,
  items,
  grossTotal,
}: {
  paid: boolean;
  test: boolean | undefined;
  orderId: string;
  customerEmail: string;
  items: SuccessItem[];
  grossTotal: number;
}) {
  const { t } = useTranslation("pages");
  const status = paid ? "paid" : "pending";

  return (
    <main className="relative flex flex-1 flex-col bg-background-alt">
      {paid ? <ClearCartOnSuccess /> : null}
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
            {items.length > 1
              ? t("success.ordersLabel", {
                  ids: items.map((o) => `#${shortId(o.id)}`).join(" · "),
                })
              : t("success.orderLabel", { id: shortId(orderId) })}
          </p>
          {test && (
            <span className="rounded-lg bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
              {t("success.testBadge")}
            </span>
          )}
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {t(`success.${status}.title`)}
          </h1>
          <p className="max-w-md text-muted-foreground">
            <Trans
              t={t}
              i18nKey={`success.${status}.body`}
              values={{ email: customerEmail }}
              components={{ strong: <strong className="text-foreground" /> }}
            />
          </p>

          <div className="mt-2 grid w-full max-w-md gap-3 border border-border bg-background-alt px-5 py-4 text-left text-sm">
            {items.map((member) => (
              <div key={member.id} className="flex items-start justify-between gap-4">
                <span className="min-w-0 text-muted-foreground">
                  <span className="block font-semibold text-foreground">
                    {member.productName}
                  </span>
                  <span className="block font-mono text-xs uppercase tracking-wider">
                    {[
                      t("success.qty", { qty: formatQty.format(member.quantity) }),
                      member.formatLabel,
                      member.sideLabel,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </span>
                <span className="shrink-0 text-right font-semibold text-foreground tabular-nums">
                  {formatPLN.format(member.grossTotal)}
                </span>
              </div>
            ))}
            <div className="flex items-start justify-between gap-4 border-t border-border pt-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                {t("success.total")}
              </span>
              <span className="text-right font-extrabold tracking-tight text-foreground">
                {formatPLN.format(grossTotal)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="default">
              <Link href="/konto">{t("success.viewPanel")}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">{t("success.home")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
