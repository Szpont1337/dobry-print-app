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
import { ORDER_DRAFT_EVENT, ORDER_DRAFT_KEY, type OrderDraftConfig } from "@/hooks/use-order-draft";
import { computeTotals } from "@/lib/pricing";
import type { Product } from "@/lib/products";
import { safeCapture } from "@/lib/posthog-client";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";
import { Button, Input, Textarea } from "@/components/ui";
import { cn } from "@/lib/cn";

import { useAuth } from "./auth-provider";
import { ParcelLockerPicker, type ParcelLocker } from "./parcel-locker-picker";
import UploadPlikDoDruku, { type UploadedFileInfo } from "./UploadPlikDoDruku";

type DeliveryMethod = "courier" | "parcel_locker";
type Mode = "form" | "submitting" | "redirecting" | "error";

type Fields = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName: string;
  taxId: string;
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  fileUrl: string;
  notes: string;
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
  fileUrl: "",
  notes: "",
};

const NAME_RE = /^[\p{L}][\p{L}\s.'-]*$/u;
const CITY_RE = /^[\p{L}][\p{L}\s.-]*$/u;
const PHONE_RE = /^\+?[0-9][0-9\s-]{7,}$/;
const POSTAL_RE = /^\d{2}-\d{3}$/;
const NIP_RE = /^\d{10}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isUrlish = (value: string) => {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

type Draft = {
  /** konfiguracja produktu — pozwala wrócić do zamówienia z ikony koszyka */
  config: OrderDraftConfig;
  fields: Fields;
  deliveryMethod: DeliveryMethod;
  parcelLocker: ParcelLocker | null;
  uploadedFiles: UploadedFileInfo[];
};

function notifyDraftChanged() {
  try {
    window.dispatchEvent(new Event(ORDER_DRAFT_EVENT));
  } catch {
    // SSR / brak window — ignorujemy
  }
}

const formatPLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  minimumFractionDigits: 2,
});
const formatQty = new Intl.NumberFormat("pl-PL");

export function OrderForm({
  product,
  initialFormatId,
  initialQuantity,
}: {
  product: Product;
  initialFormatId: string;
  initialQuantity: number;
}) {
  const { t, i18n } = useTranslation("order");
  const submitOrder = useMutation(api.orders.submitOrder);
  const { token } = useAuth();
  const profileData = useQuery(api.profile.get, token ? { token } : "skip");
  const profileReady = !token || profileData !== undefined;

  const format = useMemo(
    () => product.formats.find((f) => f.id === initialFormatId) ?? product.formats[0],
    [product.formats, initialFormatId],
  );
  const totals = useMemo(
    () => computeTotals(product, format, initialQuantity),
    [product, format, initialQuantity],
  );
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totals.productGross);
  const config = useMemo<OrderDraftConfig>(
    () => ({
      slug: product.slug,
      formatId: format.id,
      quantity: initialQuantity,
    }),
    [product.slug, format.id, initialQuantity],
  );

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("courier");
  const [parcelLocker, setParcelLocker] = useState<ParcelLocker | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileInfo[]>([]);
  const [filesUploading, setFilesUploading] = useState(false);
  const [mode, setMode] = useState<Mode>("form");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [filesError, setFilesError] = useState<string | null>(null);
  const [lockerError, setLockerError] = useState<string | null>(null);
  const [urlDetailsOpen, setUrlDetailsOpen] = useState(false);

  const [hydrated, setHydrated] = useState(false);
  const hadDraftRef = useRef(false);
  const prefilledRef = useRef(false);

  const headingId = useId();
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
      companyName: z.string().trim().optional(),
      taxId: z
        .string()
        .trim()
        .optional()
        .refine((v) => !v || NIP_RE.test(v.replace(/[\s-]/g, "")), t("errors.taxIdInvalid")),
      fileUrl: z
        .string()
        .trim()
        .optional()
        .refine((v) => !v || isUrlish(v), t("errors.fileUrlInvalid")),
      notes: z.string().trim().optional(),
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
      const raw = localStorage.getItem(ORDER_DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as Partial<Draft>;
        if (draft.fields) {
          reset({ ...EMPTY_FIELDS, ...draft.fields });
          if (draft.fields.fileUrl) setUrlDetailsOpen(true);
          // Tylko szkic z danymi pól blokuje prefill z profilu. Szkice z samej
          // konfiguracji + plików (z konfiguratora / kreatora projektu) nie mają
          // pól, więc zalogowany użytkownik wciąż dostaje dane z konta.
          hadDraftRef.current = true;
        }
        if (draft.deliveryMethod) setDeliveryMethod(draft.deliveryMethod);
        if (draft.parcelLocker) setParcelLocker(draft.parcelLocker);
        if (Array.isArray(draft.uploadedFiles)) {
          setUploadedFiles(draft.uploadedFiles);
        }
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
      companyName: cur.companyName || profileData.profile?.companyName || "",
      taxId: cur.taxId || profileData.profile?.taxId || "",
      shippingStreet: cur.shippingStreet || profileData.profile?.shippingStreet || "",
      shippingCity: cur.shippingCity || profileData.profile?.shippingCity || "",
      shippingPostalCode: cur.shippingPostalCode || profileData.profile?.shippingPostalCode || "",
      shippingCountry: cur.shippingCountry || profileData.profile?.shippingCountry || "Polska",
    });
  }, [hydrated, profileData, getValues, reset]);

  // 3) Zapis szkicu przy każdej zmianie — gwarantuje przetrwanie wyjścia ze
  //    strony, odświeżenia i zamknięcia karty.
  //
  //    UWAGA: `watch`/`getValues` z react-hook-form zmieniają referencję przy
  //    każdym renderze. Gdyby trafiły do tablicy zależności, efekt biegałby co
  //    render, a `notifyDraftChanged()` + zapis do localStorage tworzyłyby pętlę
  //    re-renderów, która głodziła nawigację Next.js (kliknięcia w <Link> nie
  //    nawigowały). Dlatego najświeższy stan spoza formularza trzymamy w ref,
  //    a `watch` subskrybujemy raz.
  const draftStateRef = useRef({
    config,
    deliveryMethod,
    parcelLocker,
    uploadedFiles,
  });
  draftStateRef.current = {
    config,
    deliveryMethod,
    parcelLocker,
    uploadedFiles,
  };

  const persistDraft = useCallback((fields: Fields) => {
    try {
      const { config, deliveryMethod, parcelLocker, uploadedFiles } = draftStateRef.current;
      const draft: Draft = {
        config,
        fields,
        deliveryMethod,
        parcelLocker,
        uploadedFiles,
      };
      localStorage.setItem(ORDER_DRAFT_KEY, JSON.stringify(draft));
      notifyDraftChanged();
    } catch {
      // brak miejsca / prywatny tryb — trudno, lecimy dalej
    }
  }, []);

  // Stabilny callback dla uploadu. Inline arrow tworzyłby nową referencję co
  // render, a efekt w UploadPlikDoDruku zależny od `onChange` wpadałby w pętlę:
  // onChange → setUploadedFiles(nowa tablica) → render → nowy onChange → …
  // (~1000 renderów/s), która głodziła nawigację Next.js (kliknięcia w <Link>
  // w koszyku nie nawigowały). useCallback przerywa cykl.
  const handleFilesChange = useCallback((files: UploadedFileInfo[]) => {
    setUploadedFiles(files);
    if (files.length > 0) setFilesError(null);
  }, []);

  // 3a) Subskrybujemy edycję pól formularza — RAZ (po hydratacji).
  useEffect(() => {
    if (!hydrated) return;
    const sub = watch((value) => persistDraft(value as Fields));
    return () => sub.unsubscribe();
    // watch ma niestabilną referencję — celowo poza zależnościami.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, persistDraft]);

  // 3b) Zapis przy zmianie stanu spoza formularza (dostawa / paczkomat / pliki).
  useEffect(() => {
    if (!hydrated) return;
    persistDraft(getValues());
    // getValues ma niestabilną referencję — celowo poza zależnościami.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, config, deliveryMethod, parcelLocker, uploadedFiles, persistDraft]);

  const onValid = async (values: Fields) => {
    setFilesError(null);
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

    const trimmedUrl = values.fileUrl.trim();
    if (uploadedFiles.length === 0 && trimmedUrl === "") {
      setFilesError(t("errFilesRequired"));
      return;
    }

    setMode("submitting");
    setErrorMsg(null);

    const optional = (value: string) => {
      const v = value.trim();
      return v === "" ? undefined : v;
    };

    try {
      const id = await submitOrder({
        // Price/format labels are recomputed server-side from the catalog —
        // the client only sends what to buy, never the price.
        locale: i18n.language === "en" ? "en" : "pl",
        productSlug: product.slug,
        formatId: format.id,
        quantity: initialQuantity,
        customerName: values.customerName.trim(),
        customerEmail: values.customerEmail.trim(),
        customerPhone: values.customerPhone.trim(),
        companyName: optional(values.companyName),
        taxId: optional(values.taxId),
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
        fileKeys: uploadedFiles.length > 0 ? uploadedFiles.map((f) => f.fileKey) : undefined,
        fileUrl: trimmedUrl === "" ? undefined : trimmedUrl,
        notes: optional(values.notes),
        source: `produkty/${product.slug}`,
      });

      safeCapture("order_submitted", {
        product_slug: product.slug,
        product_name: product.name,
        format: format.label,
        quantity: initialQuantity,
        gross_total: totals.gross,
        delivery_method: deliveryMethod,
        has_files: uploadedFiles.length > 0,
        file_count: uploadedFiles.length,
      });

      // Zamówienie zapisane — szkic nie jest już potrzebny.
      try {
        localStorage.removeItem(ORDER_DRAFT_KEY);
        notifyDraftChanged();
      } catch {
        // ignore
      }

      setMode("redirecting");
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          orderId: String(id),
          locale: i18n.language,
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
  const canSubmit = !isSubmitting && !filesUploading;
  const ready = hydrated && profileReady;

  return (
    <div className="bg-background-alt py-8 sm:py-13">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Link
          href={`/produkty/${product.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          <span aria-hidden>←</span>
          {t("back")}
        </Link>

        <header className="mt-5">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-primary">
            Zamówienie
          </p>
          <h1
            id={headingId}
            className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl"
          >
            {product.name}
          </h1>
          <p id={summaryId} className="mt-1 text-sm text-muted-foreground">
            {t("summary", {
              quantity: formatQty.format(initialQuantity),
              format: format.label,
              price: formatPLN.format(totals.gross),
            })}
          </p>
        </header>

        {!ready ? (
          <div className="mt-5 flex items-center justify-center gap-3 border border-border bg-card p-12 text-sm text-muted-foreground">
            <Loader2 aria-hidden className="size-5 animate-spin text-primary" />
            {t("loadingProfile")}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onValid)}
            noValidate
            className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start"
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
                  hint={t("fields.optional")}
                  registration={register("companyName")}
                  error={errors.companyName?.message}
                />
                <Field
                  label={t("fields.taxId")}
                  inputMode="numeric"
                  hint={t("fields.optional")}
                  registration={register("taxId")}
                  error={errors.taxId?.message}
                />
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

              <Fieldset index="03" legend={t("fieldsetFiles")}>
                <div className="col-span-full flex items-start gap-2.5 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
                  <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0" strokeWidth={2.5} />
                  <span>{t("filePrepReassurance")}</span>
                </div>
                <div className="col-span-full">
                  <UploadPlikDoDruku
                    initialFiles={uploadedFiles}
                    onChange={handleFilesChange}
                    onUploadingChange={setFilesUploading}
                  />
                  <details
                    className="mt-3 text-sm"
                    open={urlDetailsOpen}
                    onToggle={(e) =>
                      setUrlDetailsOpen((e.currentTarget as HTMLDetailsElement).open)
                    }
                  >
                    <summary className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
                      {t("fields.fileUrlSummary")}
                    </summary>
                    <div className="mt-3">
                      <Field
                        label={t("fields.fileUrl")}
                        type="url"
                        hint={t("fields.fileUrlHint")}
                        registration={register("fileUrl")}
                        error={errors.fileUrl?.message}
                        full
                      />
                    </div>
                  </details>
                  {filesError && (
                    <p className="mt-2 text-xs font-medium text-destructive">{filesError}</p>
                  )}
                </div>
                <Field
                  label={t("fields.notes")}
                  hint={t("fields.optional")}
                  multiline
                  full
                  registration={register("notes")}
                  error={errors.notes?.message}
                />
              </Fieldset>
            </div>

            <aside className="flex flex-col gap-3 lg:sticky lg:top-24">
              <div className="border border-border bg-card">
                <div className="flex items-center gap-2 border-b border-border px-5 py-4 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:px-8">
                  <span className="text-primary">04</span>
                  <span aria-hidden>/</span>
                  <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
                    Podsumowanie
                  </h2>
                </div>
                <div className="p-5 sm:p-8">
                  <dl className="flex flex-col gap-3 text-sm">
                    <div className="flex items-start justify-between gap-4">
                      <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Produkt
                      </dt>
                      <dd className="text-right font-semibold text-foreground">{product.name}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Nakład
                      </dt>
                      <dd className="text-right font-semibold text-foreground">
                        {formatQty.format(initialQuantity)} szt.
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Format
                      </dt>
                      <dd className="text-right font-semibold text-foreground">{format.label}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Wysyłka
                      </dt>
                      <dd className="text-right font-semibold text-foreground">
                        {totals.shippingFee > 0 ? formatPLN.format(totals.shippingFee) : "Gratis"}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 border-t border-border pt-3">
                      <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                        Razem brutto
                      </dt>
                      <dd className="text-right text-lg font-extrabold tracking-tight text-foreground tabular-nums">
                        {formatPLN.format(totals.gross)}
                      </dd>
                    </div>
                  </dl>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={!canSubmit}
                    title={
                      filesUploading
                        ? t("tooltipUploading")
                        : uploadedFiles.length === 0
                          ? t("tooltipFilesRequired")
                          : undefined
                    }
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
                          : t("submit")}
                  </Button>

                  {mode === "error" && errorMsg ? (
                    <p className="mt-3 text-sm text-destructive">{errorMsg}</p>
                  ) : (
                    <p className="mt-3 text-xs text-muted-foreground">
                      {t("consentBefore")}
                      <a
                        href="/regulamin"
                        className="underline underline-offset-4 hover:text-foreground"
                      >
                        {t("consentTerms")}
                      </a>
                      {t("consentAnd")}
                      <a
                        href="/polityka-prywatnosci"
                        className="underline underline-offset-4 hover:text-foreground"
                      >
                        {t("consentPrivacy")}
                      </a>
                      {t("consentAfter")}
                    </p>
                  )}
                </div>
              </div>

              <p className="px-1 text-center text-xs text-muted-foreground">
                {totals.shippingFee > 0 ? (
                  <>
                    Wysyłka {formatPLN.format(totals.shippingFee)} — dodaj jeszcze{" "}
                    <span className="font-semibold text-foreground">
                      {formatPLN.format(amountToFreeShipping)}
                    </span>{" "}
                    do darmowej wysyłki.
                  </>
                ) : (
                  <span className="font-semibold text-primary">
                    Darmowa wysyłka w 3 dni robocze.
                  </span>
                )}
              </p>
            </aside>
          </form>
        )}
      </div>
    </div>
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
