"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Header } from "@/components/header";
import { Button } from "@/components/ui";

const formatPLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  minimumFractionDigits: 2,
});

function shortId(id: string) {
  return id.slice(-8).toUpperCase();
}

export function CancelledContent({
  orderId,
  productSlug,
  items,
  grossTotal,
}: {
  orderId: string;
  productSlug: string;
  items: { id: string; productName: string; grossTotal: number }[];
  grossTotal: number;
}) {
  const { t } = useTranslation("pages");

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
            {t("cancelled.orderLabel", { id: shortId(orderId) })}
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {t("cancelled.title")}
          </h1>
          <p className="max-w-md text-muted-foreground">{t("cancelled.body")}</p>

          <div className="mt-2 grid w-full max-w-md gap-3 border border-border bg-background-alt px-5 py-4 text-left text-sm">
            {items.map((member) => (
              <div key={member.id} className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {member.productName}
                </span>
                <span className="text-right font-semibold text-foreground">
                  {formatPLN.format(member.grossTotal)}
                </span>
              </div>
            ))}
            <div className="flex items-start justify-between gap-4 border-t border-border pt-3">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {t("cancelled.amount")}
              </span>
              <span className="text-right font-semibold text-foreground">
                {formatPLN.format(grossTotal)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="default">
              <Link href={`/produkty/${productSlug}`}>{t("cancelled.backToProduct")}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/#produkty">{t("cancelled.otherProducts")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
