"use client";

import { Loader2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { CartLines } from "@/components/cart-lines";
import { CheckoutForm } from "@/components/checkout-form";
import { buttonVariants } from "@/components/ui";
import { useCart } from "@/hooks/use-cart";

export function CheckoutPage({ testMode = false }: { testMode?: boolean }) {
  const { t } = useTranslation("order");
  const { items, totals, ready } = useCart();

  // Płatność musi poczekać na pliki, które właśnie lecą do chmury.
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const handleUploadingChange = useCallback((itemId: string, value: boolean) => {
    setUploading((prev) => (prev[itemId] === value ? prev : { ...prev, [itemId]: value }));
  }, []);
  const filesUploading = Object.values(uploading).some(Boolean);

  if (!ready) {
    return (
      <div className="flex items-center justify-center gap-3 border border-border bg-card p-12 text-sm text-muted-foreground">
        <Loader2 aria-hidden className="size-5 animate-spin text-primary" />
        {t("cart.loading")}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 border border-border bg-card p-8 text-center sm:p-13">
        <span className="grid size-16 place-items-center rounded-lg bg-accent text-primary">
          <ShoppingCart aria-hidden className="size-8" />
        </span>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
          {t("cart.emptyTitle")}
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">{t("cart.emptyBody")}</p>
        <Link href="/#produkty" className={buttonVariants({ variant: "default", size: "lg" })}>
          {t("cart.emptyCta")}
          <span aria-hidden>→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {testMode && (
        <p className="rounded-lg border border-primary/30 bg-primary/5 px-5 py-3 text-sm font-semibold text-primary">
          {t("cart.testBanner")}
        </p>
      )}
      <section>
        <header className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {t("cart.itemsHeading", { count: items.length })}
          </h2>
          <Link
            href="/#produkty"
            className="text-sm font-semibold text-primary underline underline-offset-4"
          >
            {t("cart.addMore")}
          </Link>
        </header>
        <CartLines items={items} onUploadingChange={handleUploadingChange} />
      </section>

      <CheckoutForm
        items={items}
        totals={totals}
        filesUploading={filesUploading}
        testMode={testMode}
      />
    </div>
  );
}
