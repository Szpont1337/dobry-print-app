"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { CheckCircle2, Loader2, MapPin, Truck } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { type Resolver, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { api } from "@convex/_generated/api";
import { getOrderAttribution } from "@/lib/attribution";
import { clearCart, itemHasDesign, type ResolvedCartItem } from "@/lib/cart";
import type { CartTotals } from "@/lib/pricing";
import { safeCapture } from "@/lib/posthog-client";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";
import { Button, Input, Textarea, Typography } from "@/components/ui";
import { cn } from "@/lib/utils";

import { useAuth } from "./auth-provider";
import { ParcelLockerPicker, type ParcelLocker } from "./parcel-locker-picker";

type DeliveryMethod = "courier" | "parcel_locker";
type Mode = "form" | "submitting" | "redirecting" | "error";

type Fields = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  /** opcjonalne dane firmy — trafiają na fakturę wystawianą przez Stripe */
  companyName: string;
  taxId: string;
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
};

const EMPTY_FIELDS: Fields = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  companyName: "",
  taxId: "",
  shippingStreet: "",
  shippingCity: "",
  shippingPostalCode: "",
  shippingCountry: "Polska",
};

const NAME_RE = /^[\p{L}][\p{L}\s.'-]*$/u;
const CITY_RE = /^[\p{L}][\p{L}\s.-]*$/u;
const PHONE_RE = /^\+?[0-9][0-9\s-]{7,}$/;
const POSTAL_RE = /^\d{2}-\d{3}$/;
/** NIP: 10 cyfr, spacje i myślniki dozwolone przy wpisywaniu. */
const NIP_RE = /^\d{10}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Dane kupującego przeżywają odświeżenie strony — koszyk trzyma się osobno. */
const CHECKOUT_DRAFT_KEY = "DobrePrinty:checkout:v1";

type CheckoutDraft = {
  fields: Fields;
  deliveryMethod: DeliveryMethod;
  parcelLocker: ParcelLocker | null;
};

const formatPLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  minimumFractionDigits: 2,
});
const formatQty = new Intl.NumberFormat("pl-PL");

export function CheckoutForm({
  items,
  totals,
  filesUploading,
  testMode = false,
}: {
  items: ResolvedCartItem[];
  totals: CartTotals;
  filesUploading: boolean;
  /** ?test — zamówienie testowe: bez obciążenia i bez powiadomień */
  testMode?: boolean;
}) {
  const { t, i18n } = useTranslation("order");
  const submitCart = useMutation(api.orders.submitCart);
  const { token } = useAuth();
  const profileData = useQuery(api.profile.get, token ? { token } : "skip");
  const profileReady = !token || profileData !== undefined;

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totals.productTotal);

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("courier");
  const [parcelLocker, setParcelLocker] = useState<ParcelLocker | null>(null);
  const [mode, setMode] = useState<Mode>("form");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lockerError, setLockerError] = useState<string | null>(null);

  const [hydrated, setHydrated] = useState(false);
  const hadDraftRef = useRef(false);
  const prefilledRef = useRef(false);

  const summaryId = useId();

  const schema = useMemo(() => {
    const base = {
      customerName: z
        .string()
        .trim()
        .min(1, t("errors.nameRequired"))
        .regex(NAME_RE, t("errors.nameInvalid")),
      customerEmail: z
        .string()
        .trim()
        .min(1, t("errors.emailRequired"))
        .regex(EMAIL_RE, t("errors.emailInvalid")),
      customerPhone: z
        .string()
        .trim()
        .min(1, t("errors.phoneRequired"))
        .regex(PHONE_RE, t("errors.phoneInvalid")),
      // Firma i NIP są opcjonalne — podaje je tylko kupujący na firmę.
      companyName: z.string().trim().optional(),
      taxId: z
        .string()
        .trim()
        .optional()
        .refine(
          (value) => !value || NIP_RE.test(value.replace(/[\s-]/g, "")),
          t("errors.taxIdInvalid"),
        ),
    };
    const shipping =
      deliveryMethod === "courier"
        ? {
            shippingStreet: z.string().trim().min(3, t("errors.streetRequired")),
            shippingCity: z
              .string()
              .trim()
              .min(1, t("errors.cityRequired"))
              .regex(CITY_RE, t("errors.cityInvalid")),
            shippingPostalCode: z
              .string()
              .trim()
              .min(1, t("errors.postalRequired"))
              .regex(POSTAL_RE, t("errors.postalInvalid")),
            shippingCountry: z.string().trim().optional(),
          }
        : {};
    return z.object({ ...base, ...shipping });
  }, [t, deliveryMethod]);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Fields>({
    resolver: zodResolver(schema) as unknown as Resolver<Fields>,
    defaultValues: EMPTY_FIELDS,
    // Surface validation errors as the user fills the form (on first blur, then
    // live on every change) instead of only after pressing submit.
    mode: "onTouched",
  });

  // 1) Wczytanie szkicu z localStorage (jednorazowo, przed pierwszym zapisem).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHECKOUT_DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as Partial<CheckoutDraft>;
        if (draft.fields) {
          reset({ ...EMPTY_FIELDS, ...draft.fields });
          // Szkic z danymi blokuje prefill z profilu — klient mógł je nadpisać.
          hadDraftRef.current = true;
        }
        if (draft.deliveryMethod) setDeliveryMethod(draft.deliveryMethod);
        if (draft.parcelLocker) setParcelLocker(draft.parcelLocker);
      }
    } catch {
      // uszkodzony szkic ignorujemy — startujemy z pustego formularza
    }
    setHydrated(true);
  }, [reset]);

  // 2) Prefill z profilu konta — tylko gdy NIE było zapisanego szkicu.
  useEffect(() => {
    if (!hydrated || hadDraftRef.current || prefilledRef.current) return;
    if (!profileData) return;
    prefilledRef.current = true;
    const cur = getValues();
    reset({
      ...cur,
      customerName: cur.customerName || profileData.user.name || "",
      customerEmail: cur.customerEmail || profileData.user.email || "",
      customerPhone: cur.customerPhone || profileData.profile?.phone || "",
      shippingStreet: cur.shippingStreet || profileData.profile?.shippingStreet || "",
      shippingCity: cur.shippingCity || profileData.profile?.shippingCity || "",
      shippingPostalCode: cur.shippingPostalCode || profileData.profile?.shippingPostalCode || "",
      shippingCountry: cur.shippingCountry || profileData.profile?.shippingCountry || "Polska",
    });
  }, [hydrated, profileData, getValues, reset]);

  // 3) Zapis szkicu przy każdej zmianie — przeżywa odświeżenie i zamknięcie karty.
  //
  //    UWAGA: `watch`/`getValues` z react-hook-form zmieniają referencję przy
  //    każdym renderze. Gdyby trafiły do tablicy zależności, efekt biegałby co
  //    render, a zapis do localStorage tworzyłby pętlę re-renderów, która
  //    głodziła nawigację Next.js. Dlatego stan spoza formularza trzymamy w
  //    ref, a `watch` subskrybujemy raz.
  const draftStateRef = useRef({ deliveryMethod, parcelLocker });
  draftStateRef.current = { deliveryMethod, parcelLocker };

  const persistDraft = useCallback((fields: Fields) => {
    try {
      const { deliveryMethod, parcelLocker } = draftStateRef.current;
      const draft: CheckoutDraft = { fields, deliveryMethod, parcelLocker };
      localStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // brak miejsca / prywatny tryb — trudno, lecimy dalej
    }
  }, []);

  // 3a) Subskrybujemy edycję pól formularza — RAZ (po hydratacji).
  useEffect(() => {
    if (!hydrated) return;
    const sub = watch((value) => persistDraft(value as Fields));
    return () => sub.unsubscribe();
    // watch ma niestabilną referencję — celowo poza zależnościami.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, persistDraft]);

  // 3b) Zapis przy zmianie stanu spoza formularza (dostawa / paczkomat).
  useEffect(() => {
    if (!hydrated) return;
    persistDraft(getValues());
    // getValues ma niestabilną referencję — celowo poza zależnościami.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, deliveryMethod, parcelLocker, persistDraft]);

  const onValid = async (values: Fields) => {
    setLockerError(null);

    if (deliveryMethod === "parcel_locker" && !parcelLocker) {
      setLockerError(t("errPicker"));
      return;
    }
    if (filesUploading) {
      setErrorMsg(t("errUploading"));
      setMode("error");
      return;
    }
    const missing = items.filter((item) => !itemHasDesign(item));
    if (missing.length > 0) {
      setErrorMsg(
        t("cart.errMissingDesign", { products: missing.map((i) => i.product.name).join(", ") }),
      );
      setMode("error");
      return;
    }

    setMode("submitting");
    setErrorMsg(null);

    const optional = (value: string) => {
      const v = value.trim();
      return v === "" ? undefined : v;
    };

    try {
      const { orderIds } = await submitCart({
        // Price/format labels are recomputed server-side from the catalog —
        // the client only sends what to buy, never the price.
        locale: i18n.language === "en" ? "en" : "pl",
        items: items.map((item) => ({
          productSlug: item.slug,
          formatId: item.format.id,
          quantity: item.quantity,
          fileKeys: item.files.length > 0 ? item.files.map((f) => f.fileKey) : undefined,
          fileUrl: optional(item.fileUrl ?? ""),
          notes: optional(item.notes ?? ""),
        })),
        customerName: values.customerName.trim(),
        customerEmail: values.customerEmail.trim(),
        customerPhone: values.customerPhone.trim(),
        deliveryMethod,
        shippingStreet: deliveryMethod === "courier" ? values.shippingStreet.trim() : undefined,
        shippingCity: deliveryMethod === "courier" ? values.shippingCity.trim() : undefined,
        shippingPostalCode:
          deliveryMethod === "courier" ? values.shippingPostalCode.trim() : undefined,
        shippingCountry:
          deliveryMethod === "courier" ? values.shippingCountry.trim() || "Polska" : undefined,
        parcelLockerId: deliveryMethod === "parcel_locker" ? parcelLocker?.id : undefined,
        parcelLockerName: deliveryMethod === "parcel_locker" ? parcelLocker?.name : undefined,
        parcelLockerAddress: deliveryMethod === "parcel_locker" ? parcelLocker?.address : undefined,
        parcelLockerDescription:
          deliveryMethod === "parcel_locker" ? (parcelLocker?.description ?? undefined) : undefined,
        source: testMode ? "koszyk (test)" : "koszyk",
        test: testMode || undefined,
        // Marka (wg domeny) + first-touch atrybucja ruchu — skąd trafił kupujący.
        ...getOrderAttribution(),
      });

      safeCapture("order_submitted", {
        item_count: items.length,
        product_slugs: items.map((i) => i.slug),
        gross_total: totals.total,
        delivery_method: deliveryMethod,
      });

      // Zamówienia zapisane — koszyk nie jest już potrzebny.
      clearCart();

      setMode("redirecting");
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          orderIds: orderIds.map(String),
          locale: i18n.language,
          test: testMode,
        }),
      });
      const payload = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };
      if (!res.ok || !payload.url) {
        throw new Error(payload.error ?? t("errSubmit"));
      }
      window.location.assign(payload.url);
    } catch (err) {
      const message = err instanceof Error ? err.message : t("errSubmit");
      setErrorMsg(message);
      setMode("error");
    }
  };

  const isSubmitting = mode === "submitting" || mode === "redirecting";
  const canSubmit = !isSubmitting && !filesUploading && items.length > 0;

  if (!profileReady) {
    return (
      <div className="flex items-center justify-center gap-3 border border-border bg-card p-12 text-sm text-muted-foreground">
        <Loader2 aria-hidden className="size-5 animate-spin text-primary" />
        {t("loadingProfile")}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      noValidate
      className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start"
    >
      <div className="flex flex-col gap-5">
        <Fieldset index="01" legend={t("fieldsetInvoice")}>
          <Field
            label={t("fields.customerName")}
            required
            autoComplete="name"
            registration={register("customerName")}
            error={errors.customerName?.message}
          />
          <Field
            label={t("fields.customerEmail")}
            type="email"
            required
            autoComplete="email"
            registration={register("customerEmail")}
            error={errors.customerEmail?.message}
          />
          <Field
            label={t("fields.customerPhone")}
            type="tel"
            required
            autoComplete="tel"
            placeholder="+48 …"
            registration={register("customerPhone")}
            error={errors.customerPhone?.message}
          />
          <Field
            label={t("fields.companyName")}
            autoComplete="organization"
            registration={register("companyName")}
            error={errors.companyName?.message}
          />
          <Field
            label={t("fields.taxId")}
            inputMode="numeric"
            placeholder="1234567890"
            registration={register("taxId")}
            error={errors.taxId?.message}
          />
          <Typography as="p" variant="small" className="col-span-full text-muted-foreground">
            {t("invoiceNote")}
          </Typography>
        </Fieldset>

        <Fieldset index="02" legend={t("fieldsetDelivery")}>
          <div className="col-span-full grid gap-2 sm:grid-cols-2">
            <DeliveryOption
              icon={<Truck aria-hidden className="size-5" />}
              label={t("deliveryCourier")}
              hint={t("deliveryCourierHint")}
              selected={deliveryMethod === "courier"}
              onClick={() => setDeliveryMethod("courier")}
            />
            <DeliveryOption
              icon={<MapPin aria-hidden className="size-5" />}
              label={t("deliveryLocker")}
              hint={t("deliveryLockerHint")}
              selected={deliveryMethod === "parcel_locker"}
              onClick={() => setDeliveryMethod("parcel_locker")}
            />
          </div>

          {deliveryMethod === "courier" ? (
            <>
              <Field
                label={t("fields.shippingStreet")}
                required
                autoComplete="street-address"
                full
                registration={register("shippingStreet")}
                error={errors.shippingStreet?.message}
              />
              <Field
                label={t("fields.shippingCity")}
                required
                autoComplete="address-level2"
                registration={register("shippingCity")}
                error={errors.shippingCity?.message}
              />
              <Field
                label={t("fields.shippingPostalCode")}
                required
                autoComplete="postal-code"
                placeholder="00-000"
                registration={register("shippingPostalCode")}
                error={errors.shippingPostalCode?.message}
              />
              <Field
                label={t("fields.shippingCountry")}
                autoComplete="country-name"
                registration={register("shippingCountry")}
                error={errors.shippingCountry?.message}
              />
            </>
          ) : (
            <div className="col-span-full">
              <ParcelLockerPicker
                value={parcelLocker}
                onChange={(locker) => {
                  setParcelLocker(locker);
                  if (locker) setLockerError(null);
                }}
                initialPostCode={getValues("shippingPostalCode")}
              />
              {lockerError && (
                <p className="mt-2 text-xs font-medium text-destructive">{lockerError}</p>
              )}
            </div>
          )}
        </Fieldset>

        <div className="flex items-start gap-2.5 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
          <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0" strokeWidth={2.5} />
          <span>{t("filePrepReassurance")}</span>
        </div>
      </div>

      <aside className="flex flex-col gap-3 lg:sticky lg:top-24">
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-5 py-4 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:px-8">
            <span className="text-primary">03</span>
            <span aria-hidden>/</span>
            <h2
              id={summaryId}
              className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-foreground"
            >
              {t("cart.summary")}
            </h2>
          </div>
          <div className="p-5 sm:p-8">
            <dl className="flex flex-col gap-3 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-4">
                  <dt className="min-w-0 text-muted-foreground">
                    <span className="block font-semibold text-foreground">{item.product.name}</span>
                    <span className="block text-xs">
                      {formatQty.format(item.quantity)} szt. · {item.format.label}
                    </span>
                  </dt>
                  <dd className="shrink-0 text-right font-semibold text-foreground tabular-nums">
                    {formatPLN.format(item.total)}
                  </dd>
                </div>
              ))}
              <div className="flex items-start justify-between gap-4 border-t border-border pt-3">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {t("cart.shipping")}
                </dt>
                <dd className="text-right font-semibold text-foreground">
                  {totals.shippingFee > 0
                    ? formatPLN.format(totals.shippingFee)
                    : t("cart.shippingFree")}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-t border-border pt-3">
                <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                  {t("cart.total")}
                </dt>
                <dd className="text-right text-lg font-extrabold tracking-tight text-foreground tabular-nums">
                  {formatPLN.format(totals.total)}
                </dd>
              </div>
            </dl>

            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={!canSubmit}
              title={filesUploading ? t("tooltipUploading") : undefined}
              className="mt-5 w-full"
            >
              {(isSubmitting || filesUploading) && (
                <Loader2 aria-hidden className="size-4 animate-spin" />
              )}
              {mode === "redirecting"
                ? t("redirecting")
                : mode === "submitting"
                  ? t("submitting")
                  : filesUploading
                    ? t("uploadingFiles")
                    : testMode
                      ? t("cart.testSubmit")
                      : t("submit")}
            </Button>

            {mode === "error" && errorMsg ? (
              <p className="mt-3 text-sm text-destructive">{errorMsg}</p>
            ) : (
              <p className="mt-3 text-xs text-muted-foreground">
                {t("consentBefore")}
                <Link
                  href="/regulamin"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  {t("consentTerms")}
                </Link>
                {t("consentAnd")}
                <Link
                  href="/polityka-prywatnosci"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  {t("consentPrivacy")}
                </Link>
                {t("consentAfter")}
              </p>
            )}
          </div>
        </div>

        <p className="px-1 text-center text-xs text-muted-foreground">
          {totals.shippingFee > 0
            ? t("cart.freeShippingHint", {
                missing: formatPLN.format(amountToFreeShipping),
              })
            : t("cart.freeShippingDone")}
        </p>
      </aside>
    </form>
  );
}

function DeliveryOption({
  icon,
  label,
  hint,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  hint: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex items-start gap-3 rounded-lg border p-3 text-left transition-colors",
        selected
          ? "border-primary bg-secondary ring-2 ring-primary/25"
          : "border-border bg-card hover:border-primary/40 hover:bg-muted",
      )}
    >
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-lg",
          selected ? "bg-primary/12 text-primary" : "bg-muted text-foreground",
        )}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1 text-sm">
        <span className="block font-semibold text-foreground">{label}</span>
        <span className="block text-xs text-muted-foreground">{hint}</span>
      </span>
    </button>
  );
}

function Fieldset({
  index,
  legend,
  children,
}: {
  index: string;
  legend: string;
  children: React.ReactNode;
}) {
  const id = useId();
  return (
    <fieldset aria-labelledby={id} className="border border-border bg-card">
      <div
        id={id}
        className="flex items-center gap-2 border-b border-border px-5 py-4 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:px-8"
      >
        <span className="text-primary">{index}</span>
        <span aria-hidden>/</span>
        {legend}
      </div>
      <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-8">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  type = "text",
  required = false,
  autoComplete,
  placeholder,
  hint,
  error,
  multiline = false,
  full = false,
  inputMode,
  registration,
}: {
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  multiline?: boolean;
  full?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  registration: ReturnType<ReturnType<typeof useForm<Fields>>["register"]>;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <label htmlFor={id} className={cn("flex flex-col gap-1.5 text-sm", full && "sm:col-span-2")}>
      <span className="font-semibold tracking-tight text-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </span>
      {multiline ? (
        <Textarea
          id={id}
          rows={3}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...registration}
          className="resize-y"
        />
      ) : (
        <Input
          id={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          inputMode={inputMode}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...registration}
        />
      )}
      {error ? (
        <span id={errorId} className="text-xs font-medium text-destructive">
          {error}
        </span>
      ) : hint ? (
        <span className="text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  );
}
