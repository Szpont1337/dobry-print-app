"use client";

import { AlertCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { itemHasDesign, removeCartItem, type ResolvedCartItem, updateCartItem } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { MAX_QTY, MIN_QTY, clampQuantity } from "@/lib/pricing";
import { Input, Textarea } from "@/components/ui";
import UploadPlikDoDruku, { type UploadedFileInfo } from "@/components/UploadPlikDoDruku";

const formatPLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  minimumFractionDigits: 2,
});

export function CartLines({
  items,
  onUploadingChange,
}: {
  items: ResolvedCartItem[];
  /** zgłasza, że pozycja wysyła pliki — checkout blokuje wtedy płatność */
  onUploadingChange: (itemId: string, uploading: boolean) => void;
}) {
  return (
    <ul className="flex flex-col gap-5">
      {items.map((item) => (
        <li key={item.id}>
          <CartLine item={item} onUploadingChange={onUploadingChange} />
        </li>
      ))}
    </ul>
  );
}

function CartLine({
  item,
  onUploadingChange,
}: {
  item: ResolvedCartItem;
  onUploadingChange: (itemId: string, uploading: boolean) => void;
}) {
  const { t } = useTranslation("order");
  const { id } = item;

  // Stabilne callbacki: inline arrow tworzyłby nową referencję co render, a
  // efekt w UploadPlikDoDruku zależny od `onChange` wpadałby w pętlę
  // onChange → zapis koszyka → render → nowy onChange → …
  const handleFilesChange = useCallback(
    (files: UploadedFileInfo[]) => updateCartItem(id, { files }),
    [id],
  );
  const handleUploadingChange = useCallback(
    (uploading: boolean) => onUploadingChange(id, uploading),
    [id, onUploadingChange],
  );

  const missingDesign = !itemHasDesign(item);

  return (
    <article className="border border-border bg-card">
      <header className="flex items-start justify-between gap-3 border-b border-border px-5 py-4 sm:px-8">
        <div className="min-w-0">
          <Link
            href={`/produkty/${item.slug}`}
            className="text-base font-extrabold tracking-tight text-foreground transition-colors hover:text-primary"
          >
            {item.product.name}
          </Link>
          <p className="mt-0.5 text-xs text-muted-foreground">{item.format.label}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-base font-extrabold tracking-tight text-foreground tabular-nums">
            {formatPLN.format(item.total)}
          </span>
          <button
            type="button"
            onClick={() => removeCartItem(id)}
            aria-label={t("cart.remove")}
            title={t("cart.remove")}
            className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
          >
            <Trash2 aria-hidden className="size-4" />
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-5 p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-foreground">{t("cart.quantity")}</span>
          <div className="flex items-stretch gap-2">
            <button
              type="button"
              aria-label={t("cart.decrease")}
              onClick={() => updateCartItem(id, { quantity: item.quantity - 1 })}
              className="grid size-10 place-items-center rounded-lg border border-input bg-card text-lg font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-muted"
            >
              −
            </button>
            <Input
              type="number"
              inputMode="numeric"
              min={item.product.minQuantity ?? MIN_QTY}
              max={MAX_QTY}
              step={1}
              aria-label={t("cart.quantity")}
              value={item.quantity}
              onChange={(e) =>
                updateCartItem(id, {
                  quantity: clampQuantity(Number(e.target.value) || 1, item.product.minQuantity),
                })
              }
              className="w-28 text-center font-bold tabular-nums"
            />
            <button
              type="button"
              aria-label={t("cart.increase")}
              onClick={() => updateCartItem(id, { quantity: item.quantity + 1 })}
              className="grid size-10 place-items-center rounded-lg border border-input bg-card text-lg font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-muted"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <p
            className={cn(
              "flex items-center gap-1.5 text-sm font-semibold",
              missingDesign ? "text-destructive" : "text-foreground",
            )}
          >
            {missingDesign && <AlertCircle aria-hidden className="size-4" />}
            {missingDesign ? t("cart.designRequired") : t("cart.design")}
          </p>
          <div className="mt-3">
            <UploadPlikDoDruku
              initialFiles={item.files}
              onChange={handleFilesChange}
              onUploadingChange={handleUploadingChange}
            />
          </div>

          <details className="mt-3 text-sm" open={Boolean(item.fileUrl)}>
            <summary className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
              {t("fields.fileUrlSummary")}
            </summary>
            <label className="mt-3 flex flex-col gap-1.5">
              <span className="font-semibold tracking-tight text-foreground">
                {t("fields.fileUrl")}
              </span>
              <Input
                type="url"
                value={item.fileUrl ?? ""}
                onChange={(e) => updateCartItem(id, { fileUrl: e.target.value })}
                placeholder="https://…"
              />
              <span className="text-xs text-muted-foreground">{t("fields.fileUrlHint")}</span>
            </label>
          </details>

          <details className="mt-3 text-sm" open={Boolean(item.notes)}>
            <summary className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
              {t("cart.notesSummary")}
            </summary>
            <label className="mt-3 flex flex-col gap-1.5">
              <span className="font-semibold tracking-tight text-foreground">
                {t("fields.notes")}
              </span>
              <Textarea
                rows={3}
                value={item.notes ?? ""}
                onChange={(e) => updateCartItem(id, { notes: e.target.value })}
                className="resize-y"
              />
            </label>
          </details>
        </div>
      </div>
    </article>
  );
}
