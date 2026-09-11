"use client";

import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { type Product, unitPriceForQuantity } from "@/lib/products";
import { Badge, Button, Card, PriceTag } from "@/components/ui";
import { cn } from "@/lib/utils";
import { FilePrepBadge } from "@/components/file-prep-badge";
import { PrintPreview } from "@/components/print-preview";
import UploadPlikDoDruku, { type UploadedFileInfo } from "@/components/UploadPlikDoDruku";
import { openCartSheet } from "@/hooks/use-cart-sheet";
import { MAX_CART_ITEMS, addCartItem } from "@/lib/cart";
import { safeCapture } from "@/lib/posthog-client";
import { MAX_QTY, MIN_QTY, clampQuantity, priceFor } from "@/lib/pricing";
import { FREE_SHIPPING_THRESHOLD, shippingFeeFor, withShipping } from "@/lib/shipping";

const formatPLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  minimumFractionDigits: 2,
});

const formatQty = new Intl.NumberFormat("pl-PL");

const QUICK_AMOUNTS = [1, 25, 100, 500, 1000, 5000];

export function ProductConfigurator({ product }: { product: Product }) {
  // Minimum nakładu wynika z technologii druku i jest walidowane server-side —
  // konfigurator nie może pozwolić zejść niżej.
  const minQty = Math.max(MIN_QTY, product.minQuantity ?? MIN_QTY);
  const [quantity, setQuantity] = useState(Math.max(product.defaultQuantity, minQty));
  const [formatId, setFormatId] = useState<string>(product.defaultFormatId);

  const format = useMemo(
    () => product.formats.find((f) => f.id === formatId) ?? product.formats[0],
    [formatId, product.formats],
  );

  const unitPrice = useMemo(
    () => unitPriceForQuantity(product, format, quantity),
    [product, format, quantity],
  );

  const productTotal = useMemo(
    () => priceFor(quantity, unitPrice, product.noFees),
    [quantity, unitPrice, product.noFees],
  );
  const shippingFee = shippingFeeFor(productTotal);
  const totals = withShipping(productTotal);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - productTotal);

  const clamp = (n: number) => clampQuantity(n, minQty);
  // Skróty nakładu poniżej minimum nie mają sensu; zamiast nich pokazujemy samo
  // minimum jako pierwszy skrót.
  const amounts = [minQty, ...QUICK_AMOUNTS.filter((n) => n > minQty)];
  const designHref = `/zaprojektuj/${product.slug}?qty=${quantity}&format=${format.id}`;

  // Plik wgrywamy już w konfiguratorze. Stabilny callback — inline arrow tworzyłby
  // nową referencję co render i zapętlał efekt-notyfikator w UploadPlikDoDruku.
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileInfo[]>([]);
  const handleFilesChange = useCallback((files: UploadedFileInfo[]) => {
    setUploadedFiles(files);
  }, []);
  const hasFiles = uploadedFiles.length > 0;

  // „Dodaj do koszyka": konfiguracja + wgrane pliki lecą do koszyka
  // (localStorage). Zamówienie powstaje dopiero przy płatności w /checkout.
  const router = useRouter();
  // Potwierdzenie „Dodano" znika po zmianie konfiguracji — inaczej sugerowałoby,
  // że w koszyku leży nakład/format, którego tam nie ma.
  const [addedKey, setAddedKey] = useState<string | null>(null);
  const [cartError, setCartError] = useState<string | null>(null);
  const configKey = `${format.id}:${quantity}`;
  const added = addedKey === configKey;

  const addToCart = useCallback(() => {
    const id = addCartItem({
      slug: product.slug,
      formatId: format.id,
      quantity,
      files: uploadedFiles,
    });
    if (!id) {
      setCartError(`Koszyk mieści maksymalnie ${MAX_CART_ITEMS} pozycji.`);
      return null;
    }
    setCartError(null);
    safeCapture("cart_item_added", {
      product_slug: product.slug,
      product_name: product.name,
      format: format.label,
      quantity,
      gross_total: totals.total,
      has_files: uploadedFiles.length > 0,
      file_count: uploadedFiles.length,
    });
    return id;
  }, [product.slug, product.name, format.id, format.label, quantity, uploadedFiles, totals.total]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
      <section className="rounded-lg border border-border bg-card p-5 sm:p-8">
        <header className="mb-8 flex items-end justify-between gap-3 border-b border-border pb-5">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Konfigurator
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
              Zamów w 3 krokach
            </h2>
          </div>
          <Badge variant="accent">Proste jak druk</Badge>
        </header>

        {product.mockupPreview && (
          <div className="mb-8">
            <PrintPreview
              surface={product.mockupPreview.surface}
              printArea={product.mockupPreview.printArea}
            />
          </div>
        )}

        <div className="space-y-8">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/70">
              Krok 01
            </p>
            <label
              htmlFor="quantity"
              className="mt-1 flex items-baseline justify-between text-sm font-semibold text-foreground"
            >
              <span>Nakład</span>
              <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                od {formatQty.format(minQty)} {minQty === 1 ? "sztuki" : "szt."}
              </span>
            </label>
            <div className="mt-3 flex items-stretch gap-2">
              <button
                type="button"
                aria-label="Zmniejsz nakład"
                onClick={() => setQuantity((q) => clamp(q - 1))}
                className="grid size-12 place-items-center rounded-lg border border-input bg-card text-lg font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-muted"
              >
                −
              </button>
              <input
                id="quantity"
                type="number"
                inputMode="numeric"
                min={minQty}
                max={MAX_QTY}
                step={1}
                value={quantity}
                onChange={(e) => setQuantity(clamp(Number(e.target.value) || minQty))}
                className="h-12 min-w-0 flex-1 rounded-lg border border-input bg-card px-4 text-center text-lg font-bold text-foreground tabular-nums outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/25"
              />
              <button
                type="button"
                aria-label="Zwiększ nakład"
                onClick={() => setQuantity((q) => clamp(q + 1))}
                className="grid size-12 place-items-center rounded-lg border border-input bg-card text-lg font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-muted"
              >
                +
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {amounts.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setQuantity(clamp(n))}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-sm font-semibold tracking-tight transition-colors",
                    quantity === n
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-card text-foreground hover:border-primary/40 hover:text-primary",
                  )}
                >
                  {formatQty.format(n)} szt.
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/70">
              Krok 02
            </p>
            <span className="mt-1 block text-sm font-semibold text-foreground">
              {product.formatNoun ?? "Format"}
            </span>
            <div className="mt-3 grid border-l border-t border-border sm:grid-cols-2">
              {product.formats.map((f) => {
                const selected = formatId === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormatId(f.id)}
                    aria-pressed={selected}
                    className={cn(
                      "flex items-center justify-between border-r border-b border-border px-4 py-3 text-left transition-colors",
                      selected ? "bg-primary/5" : "hover:bg-secondary/50",
                    )}
                  >
                    <span className="text-sm font-semibold text-foreground">{f.label}</span>
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-5 place-items-center rounded-lg border",
                        selected ? "border-primary bg-primary" : "border-input bg-card",
                      )}
                    >
                      {selected && <span className="size-2 rounded-lg bg-primary-foreground" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/70">
              Krok 03
            </p>
            <span className="mt-1 block text-sm font-semibold text-foreground">Wgraj projekt</span>
            <p className="mt-1 text-xs text-muted-foreground">
              Dołącz gotowy plik teraz — dane do rachunku, dostawę i płatność uzupełnisz w jednym,
              ostatnim kroku.
            </p>
            <div className="mt-3">
              <UploadPlikDoDruku onChange={handleFilesChange} />
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                albo
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <Link
              href={designHref}
              prefetch={false}
              onClick={() => {
                safeCapture("design_editor_opened", {
                  product_slug: product.slug,
                  product_name: product.name,
                  format: format.label,
                  quantity,
                });
              }}
              className="mt-5 flex items-center gap-4 rounded-lg border border-primary/30 bg-primary/5 p-4 text-left transition-colors hover:border-primary hover:bg-primary/10"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles aria-hidden className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold tracking-tight text-foreground">
                  Zaprojektuj samodzielnie w aplikacji
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  Wrzuć zdjęcia, dodaj tekst i kształty — przygotujemy plik do druku.
                </span>
              </span>
              <span aria-hidden className="text-primary">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <Card className="p-5 sm:p-8 rounded-lg shadow-none">
          <header className="border-b border-border pb-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Wycena na żywo
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
              Nasza oferta
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Cena aktualizuje się w czasie rzeczywistym.
            </p>
          </header>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-baseline justify-between">
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Nakład
              </dt>
              <dd className="font-semibold text-foreground tabular-nums">
                {formatQty.format(quantity)} szt.
              </dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {product.formatNoun ?? "Format"}
              </dt>
              <dd className="font-semibold text-foreground">{format.label}</dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Cena za sztukę
              </dt>
              <dd className="font-semibold text-foreground tabular-nums">
                {formatPLN.format(productTotal / quantity)}
              </dd>
            </div>
            <div className="my-3 h-px bg-border" />
            {shippingFee > 0 && (
              <div className="flex items-baseline justify-between">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Druk
                </dt>
                <dd className="font-semibold text-foreground tabular-nums">
                  {formatPLN.format(productTotal)}
                </dd>
              </div>
            )}
            <div className="flex items-baseline justify-between">
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Wysyłka
              </dt>
              <dd className="font-semibold tabular-nums">
                {shippingFee > 0 ? (
                  <span className="text-foreground">{formatPLN.format(shippingFee)}</span>
                ) : (
                  <span className="text-primary">Gratis</span>
                )}
              </dd>
            </div>
            <div className="mt-3 flex items-baseline justify-between rounded-lg bg-accent px-5 py-3">
              <dt className="font-mono text-xs font-bold uppercase tracking-wider text-accent-foreground">
                Razem
              </dt>
              <PriceTag
                amount={formatPLN.format(totals.total)}
                suffix=""
                size="lg"
                className="text-accent-foreground"
              />
            </div>
          </dl>

          <FilePrepBadge className="mt-5 w-full justify-center" />

          <p className="mt-5 text-xs text-muted-foreground">
            {shippingFee > 0 ? (
              <>
                Wysyłka {formatPLN.format(shippingFee)}. Dodaj jeszcze{" "}
                <span className="font-semibold text-foreground">
                  {formatPLN.format(amountToFreeShipping)}
                </span>{" "}
                do darmowej wysyłki (od {formatPLN.format(FREE_SHIPPING_THRESHOLD)}).
              </>
            ) : (
              <>
                <span className="font-semibold text-primary">Darmowa wysyłka</span> — wysyłka w 3
                dni robocze.
              </>
            )}
          </p>

          {hasFiles && (
            <p className="mt-5 flex items-center justify-center gap-1.5 rounded-lg bg-primary/8 px-3 py-2 text-xs font-semibold text-primary">
              <span aria-hidden>✓</span>
              {uploadedFiles.length}{" "}
              {uploadedFiles.length === 1 ? "plik gotowy" : "plików gotowych"} — zostaje przy
              zamówieniu
            </p>
          )}

          <div className="mt-8 flex flex-col gap-2">
            <Button
              type="button"
              variant="default"
              size="lg"
              className="w-full"
              onClick={() => {
                if (addToCart()) router.push("/checkout");
              }}
            >
              {hasFiles ? "Dokończ zamówienie" : "Przejdź do danych i płatności"}
              <span aria-hidden>→</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => {
                if (addToCart()) {
                  setAddedKey(configKey);
                  openCartSheet();
                }
              }}
            >
              {added ? (
                <>
                  <Check aria-hidden className="size-4" />
                  Dodano do koszyka
                </>
              ) : (
                "Dodaj do koszyka i kupuj dalej"
              )}
            </Button>
            {cartError && (
              <p className="text-center text-xs font-medium text-destructive">{cartError}</p>
            )}
          </div>
        </Card>
      </aside>
    </div>
  );
}
