"use client";

import { AlertCircle, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Input,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  buttonVariants,
} from "@/components/ui";
import { useCart } from "@/hooks/use-cart";
import { closeCartSheet, useCartSheetOpen } from "@/hooks/use-cart-sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  itemHasDesign,
  removeCartItem,
  type ResolvedCartItem,
  updateCartItem,
} from "@/lib/cart";
import { MAX_QTY, MIN_QTY, clampQuantity } from "@/lib/pricing";

const formatPLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  minimumFractionDigits: 2,
});
const formatQty = new Intl.NumberFormat("pl-PL");

/**
 * Koszyk jako panel: sheet przy prawej krawędzi na desktopie, szuflada od dołu
 * na telefonie (shadcn/ui: Sheet = Radix Dialog, Drawer = vaul).
 *
 * Projekty (pliki) i dane do faktury zbieramy dalej, na /checkout — w wąskim
 * panelu nie ma na to miejsca, a i tak są potrzebne dopiero przy płatności.
 */
export function CartSheet() {
  const { t } = useTranslation("order");
  const open = useCartSheetOpen();
  const isMobile = useIsMobile();
  const { items, totals } = useCart();

  const title = t("cart.itemsHeading", { count: items.length });
  const onOpenChange = (next: boolean) => {
    if (!next) closeCartSheet();
  };

  const body = <CartBody items={items} />;
  const footer = items.length > 0 ? <CartFooter totals={totals} /> : null;

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription className="sr-only">{t("cart.description")}</DrawerDescription>
          </DrawerHeader>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">{body}</div>
          {footer && <DrawerFooter>{footer}</DrawerFooter>}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className="sr-only">{t("cart.description")}</SheetDescription>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-5">{body}</div>
        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  );
}

function CartBody({ items }: { items: ResolvedCartItem[] }) {
  const { t } = useTranslation("order");

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 py-13 text-center">
        <span className="grid size-16 place-items-center rounded-lg bg-accent text-primary">
          <ShoppingCart aria-hidden className="size-8" />
        </span>
        <h3 className="text-lg font-extrabold tracking-tight text-foreground">
          {t("cart.emptyTitle")}
        </h3>
        <p className="text-sm text-muted-foreground">{t("cart.emptyBody")}</p>
        <Link
          href="/#produkty"
          onClick={closeCartSheet}
          className={buttonVariants({ variant: "default", size: "default" })}
        >
          {t("cart.emptyCta")}
        </Link>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-5">
      {items.map((item) => (
        <li key={item.id}>
          <CartLine item={item} />
        </li>
      ))}
    </ul>
  );
}

function CartFooter({ totals }: { totals: ReturnType<typeof useCart>["totals"] }) {
  const { t } = useTranslation("order");
  const router = useRouter();

  return (
    <div className="flex w-full flex-col gap-3">
      <dl className="flex flex-col gap-2 text-sm">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {t("cart.shipping")}
          </dt>
          <dd className="font-semibold text-foreground tabular-nums">
            {totals.shippingFee > 0
              ? formatPLN.format(totals.shippingFee)
              : t("cart.shippingFree")}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
            {t("cart.total")}
          </dt>
          <dd className="text-lg font-extrabold tracking-tight text-foreground tabular-nums">
            {formatPLN.format(totals.gross)}
          </dd>
        </div>
      </dl>
      <Button
        type="button"
        variant="default"
        size="lg"
        className="w-full"
        onClick={() => {
          closeCartSheet();
          router.push("/checkout");
        }}
      >
        {t("cart.checkout")}
        <span aria-hidden>→</span>
      </Button>
    </div>
  );
}

function CartLine({ item }: { item: ResolvedCartItem }) {
  const { t } = useTranslation("order");

  return (
    <article className="flex flex-col gap-3 rounded-lg border border-border p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={`/produkty/${item.slug}`}
            onClick={closeCartSheet}
            className="text-sm font-bold tracking-tight text-foreground transition-colors hover:text-primary"
          >
            {item.product.name}
          </Link>
          <p className="mt-0.5 text-xs text-muted-foreground">{item.format.label}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-sm font-extrabold tracking-tight text-foreground tabular-nums">
            {formatPLN.format(item.gross)}
          </span>
          <button
            type="button"
            onClick={() => removeCartItem(item.id)}
            aria-label={t("cart.remove")}
            title={t("cart.remove")}
            className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
          >
            <Trash2 aria-hidden className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-stretch gap-2">
          <button
            type="button"
            aria-label={t("cart.decrease")}
            onClick={() => updateCartItem(item.id, { quantity: item.quantity - 1 })}
            className="grid size-9 place-items-center rounded-lg border border-input bg-card font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-muted"
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
              updateCartItem(item.id, { quantity: clampQuantity(Number(e.target.value) || 1, item.product.minQuantity) })
            }
            className="h-9 w-24 text-center text-sm font-bold tabular-nums"
          />
          <button
            type="button"
            aria-label={t("cart.increase")}
            onClick={() => updateCartItem(item.id, { quantity: item.quantity + 1 })}
            className="grid size-9 place-items-center rounded-lg border border-input bg-card font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-muted"
          >
            +
          </button>
        </div>
        <span className="text-xs text-muted-foreground tabular-nums">
          {formatQty.format(item.quantity)} szt.
        </span>
      </div>

      {!itemHasDesign(item) && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
          <AlertCircle aria-hidden className="size-3.5" />
          {t("cart.designLater")}
        </p>
      )}
    </article>
  );
}
