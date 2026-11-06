"use client";

import { useMutation } from "convex/react";
import { makeFunctionReference } from "convex/server";
import { ConvexError } from "convex/values";
import { Loader2, Plus } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, Input } from "@/components/ui";

// Funkcja jest na wspólnym backendzie Convex drukalo + dobreprinty, który wdraża
// repo drukalo-poc (convex/admin.ts) - stąd referencja po nazwie.
const createTrackedOrderRef = makeFunctionReference<
  "mutation",
  {
    token: string;
    brand: "dobreprinty";
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    productName: string;
    quantity: number;
    deliveryMethod: "courier" | "parcel_locker";
    parcelLockerId?: string;
    shippingStreet?: string;
    shippingPostalCode?: string;
    shippingCity?: string;
    allegroPurchase: string;
  },
  { orderId: string; shortId: string }
>("admin:createTrackedOrder");

const FIELD = "flex flex-col gap-1.5 text-sm";
const INPUT = "h-10 rounded-full bg-secondary/60 px-4";

/**
 * Własne zamówienie do śledzenia: towar domówiony klientowi poza sklepem.
 * Po podpięciu zakupu Allegro klient dostaje maile o przesyłce jak przy
 * zwykłym zamówieniu.
 */
export function TrackedOrderForm({ token }: { token: string }) {
  const { t } = useTranslation("admin");
  const createTrackedOrder = useMutation(createTrackedOrderRef);
  const [open, setOpen] = useState(false);
  const [locker, setLocker] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<string | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const text = (name: string) => String(fd.get(name) ?? "");
    setBusy(true);
    setError(null);
    setCreated(null);
    try {
      const { shortId } = await createTrackedOrder({
        token,
        brand: "dobreprinty",
        customerName: text("customerName"),
        customerEmail: text("customerEmail"),
        customerPhone: text("customerPhone"),
        productName: text("productName"),
        quantity: Number(text("quantity")),
        deliveryMethod: locker ? "parcel_locker" : "courier",
        ...(locker
          ? { parcelLockerId: text("parcelLockerId") }
          : {
              shippingStreet: text("shippingStreet"),
              shippingPostalCode: text("shippingPostalCode"),
              shippingCity: text("shippingCity"),
            }),
        allegroPurchase: text("allegroPurchase"),
      });
      form.reset();
      setCreated(shortId);
    } catch (err) {
      setError(err instanceof ConvexError ? String(err.data) : t("tracked.error"));
    } finally {
      setBusy(false);
    }
  };

  const field = (name: string, label: string, props: Record<string, unknown> = {}) => (
    <label className={FIELD}>
      <span className="font-medium text-foreground">{label}</span>
      <Input name={name} required className={INPUT} {...props} />
    </label>
  );

  return (
    <div className="mb-4">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9 px-4"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Plus aria-hidden className="size-4" />
        {t("tracked.open")}
      </Button>
      {created && (
        <output className="mt-2 block text-sm text-foreground">
          {t("tracked.created", { id: created })}
        </output>
      )}
      {open && (
        <form
          onSubmit={(event) => void submit(event)}
          className="mt-3 grid gap-3 rounded-2xl border border-border bg-muted/30 p-4 sm:grid-cols-2"
        >
          <p className="text-sm text-muted-foreground sm:col-span-2">{t("tracked.hint")}</p>
          {field("allegroPurchase", t("tracked.purchase"), {
            placeholder: "https://allegro.pl/moje-allegro/zakupy/kupione/…",
          })}
          {field("productName", t("tracked.product"))}
          {field("quantity", t("tracked.quantity"), { type: "number", min: 1, step: 1, defaultValue: 1 })}
          {field("customerName", t("tracked.customerName"))}
          {field("customerEmail", t("tracked.customerEmail"), { type: "email" })}
          {field("customerPhone", t("tracked.customerPhone"), { type: "tel", required: false })}
          <fieldset className="flex flex-wrap items-center gap-4 text-sm sm:col-span-2">
            <legend className="mb-1.5 font-medium text-foreground">{t("tracked.delivery")}</legend>
            <label className="flex items-center gap-2">
              <input type="radio" name="delivery" checked={locker} onChange={() => setLocker(true)} />
              {t("tracked.locker")}
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="delivery" checked={!locker} onChange={() => setLocker(false)} />
              {t("tracked.courier")}
            </label>
          </fieldset>
          {locker ? (
            field("parcelLockerId", t("tracked.lockerId"), { placeholder: "WAW01M" })
          ) : (
            <>
              {field("shippingStreet", t("tracked.street"))}
              {field("shippingPostalCode", t("tracked.postalCode"), { placeholder: "00-001" })}
              {field("shippingCity", t("tracked.city"))}
            </>
          )}
          {error && (
            <p role="alert" className="text-sm text-destructive sm:col-span-2">
              {error}
            </p>
          )}
          <div className="flex items-center gap-2 sm:col-span-2">
            <Button type="submit" disabled={busy} size="sm" className="h-9 px-4">
              {busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
              {t("tracked.submit")}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
