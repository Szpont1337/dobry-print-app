"use client";

import { useAction } from "convex/react";
import { makeFunctionReference } from "convex/server";
import { ConvexError } from "convex/values";
import { Loader2 } from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import type { Id } from "@convex/_generated/dataModel";

import { Button, Input } from "@/components/ui";

// Funkcje są na wspólnym backendzie Convex drukalo + dobreprinty, który wdraża
// repo drukalo-poc (convex/hubFaktury.ts) - stąd referencje po nazwie.
const stanFakturyRef = makeFunctionReference<
  "action",
  { token: string; orderId: Id<"orders"> },
  Stan
>("hubFaktury:stanFaktury");
const wgrajFaktureRef = makeFunctionReference<
  "action",
  { token: string; orderId: Id<"orders">; numer: string; pdf: ArrayBuffer },
  { ok: true }
>("hubFaktury:wgrajFakture");

const MAX_PDF_BYTES = 4 * 1024 * 1024;

type Stan =
  | { dostepne: false }
  | {
      dostepne: true;
      status: string | null;
      numer: string | null;
      wyslanoAt: number | null;
    };

/**
 * Faktura do zamówienia: stan z huba i pole na PDF. Plik leży w B2 huba, a mail do
 * klienta wychodzi ze sklepu w ciągu kilku minut.
 */
export function HubInvoice({ token, orderId }: { token: string; orderId: Id<"orders"> }) {
  const { t } = useTranslation("admin");
  const pobierzStan = useAction(stanFakturyRef);
  const wgraj = useAction(wgrajFaktureRef);
  const [stan, setStan] = useState<Stan | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const odswiez = useCallback(
    () =>
      pobierzStan({ token, orderId })
        .then(setStan)
        .catch(() => setStan({ dostepne: false })),
    [pobierzStan, token, orderId],
  );
  useEffect(() => {
    void odswiez();
  }, [odswiez]);

  if (!stan?.dostepne) return null;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const plik = fd.get("pdf");
    if (!(plik instanceof File) || plik.size === 0) return;
    if (plik.size > MAX_PDF_BYTES) {
      setError(t("hubInvoice.tooBig"));
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await wgraj({
        token,
        orderId,
        numer: String(fd.get("numer") ?? ""),
        pdf: await plik.arrayBuffer(),
      });
      form.reset();
      await odswiez();
    } catch (err) {
      setError(err instanceof ConvexError ? String(err.data) : t("hubInvoice.error"));
    } finally {
      setBusy(false);
    }
  };

  const opis = stan.numer
    ? stan.wyslanoAt
      ? t("hubInvoice.sent", {
          number: stan.numer,
          date: new Date(stan.wyslanoAt).toLocaleString("pl-PL"),
        })
      : t("hubInvoice.queued", { number: stan.numer })
    : stan.status === "dismissed"
      ? t("hubInvoice.dismissed")
      : stan.status === "issued"
        ? t("hubInvoice.issuedNoFile")
        : t("hubInvoice.waiting");

  return (
    <section className="rounded-2xl border border-border bg-muted/30 p-4">
      <h4 className="text-sm font-medium text-foreground">{t("hubInvoice.title")}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{opis}</p>
      <form
        onSubmit={(event) => void submit(event)}
        className="mt-3 flex flex-wrap items-end gap-3"
      >
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">{t("hubInvoice.number")}</span>
          <Input name="numer" required className="h-10 rounded-full bg-secondary/60 px-4" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">{t("hubInvoice.file")}</span>
          <Input
            name="pdf"
            type="file"
            accept="application/pdf"
            required
            className="h-10 rounded-full bg-secondary/60 px-4"
          />
        </label>
        <Button type="submit" size="sm" disabled={busy} className="h-9 px-4">
          {busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
          {t("hubInvoice.submit")}
        </Button>
      </form>
      {error && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </section>
  );
}
