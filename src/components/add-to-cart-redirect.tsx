"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { openCartSheet } from "@/hooks/use-cart-sheet";
import { upsertCartItem } from "@/lib/cart";

/**
 * Stary link „/zamowienie/<produkt>" (zakładki klientów, linki z maili) wrzuca
 * konfigurację do koszyka, otwiera panel koszyka i wraca na stronę produktu —
 * zamawianie odbywa się dziś przez koszyk, niezależnie od liczby produktów.
 */
export function AddToCartRedirect({
  slug,
  formatId,
  quantity,
}: {
  slug: string;
  formatId: string;
  quantity: number;
}) {
  const router = useRouter();
  const { t } = useTranslation("order");
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    upsertCartItem({ slug, formatId, quantity, files: [] });
    router.replace(`/produkty/${slug}`);
    openCartSheet();
  }, [slug, formatId, quantity, router]);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center gap-3 px-5 py-21 text-sm text-muted-foreground sm:px-8">
      <Loader2 aria-hidden className="size-5 animate-spin text-primary" />
      {t("cart.redirecting")}
    </div>
  );
}
