"use client";

import type { Id } from "@convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { makeFunctionReference } from "convex/server";
import { ExternalLink, Loader2 } from "lucide-react";
import { type FormEvent, useId, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, Input } from "@/components/ui";

// Funkcja jest na wspólnym backendzie Convex drukalo + dobreprinty, który wdraża
// repo drukalo-poc (convex/admin.ts) - stąd referencja po nazwie.
const setAllegroPurchaseRef = makeFunctionReference<
  "mutation",
  { token: string; orderId: Id<"orders">; allegroPurchaseId: string },
  { message?: string }
>("admin:setAllegroPurchase");

const purchaseUrl = (id: string) =>
  `https://allegro.pl/moje-allegro/zakupy/kupione/${id}`;

/**
 * Kupione ręcznie na Allegro: wklejony adres zakupu od razu liczy się jako kupione,
 * status przechodzi dalej, a tracker zna paczkę. Tu zmienia się też podpięty zakup.
 */
export function AllegroPurchaseLink({
  token,
  orderId,
  purchaseId,
}: {
  token: string;
  orderId: Id<"orders">;
  purchaseId?: string;
}) {
  const { t } = useTranslation("admin");
  const setPurchase = useMutation(setAllegroPurchaseRef);
  const id = useId();
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!value.trim()) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await setPurchase({
        token,
        orderId,
        allegroPurchaseId: value.trim(),
      });
      setValue("");
      setMsg({ ok: true, text: res?.message ?? t("allegroLink.saved") });
    } catch (err) {
      setMsg({
        ok: false,
        text: err instanceof Error ? err.message : t("allegroLink.error"),
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={(event) => void submit(event)} className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {purchaseId ? t("allegroLink.change") : t("allegroLink.label")}
      </label>
      {purchaseId && (
        <a
          href={purchaseUrl(purchaseId)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <ExternalLink aria-hidden className="size-4" />
          {t("allegroLink.open")}
        </a>
      )}
      <div className="flex flex-wrap gap-2">
        <Input
          id={id}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="https://allegro.pl/moje-allegro/zakupy/kupione/…"
          className="min-w-0 flex-1"
        />
        <Button type="submit" disabled={busy || !value.trim()}>
          {busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
          {t("allegroLink.save")}
        </Button>
      </div>
      {msg && (
        <p
          role={msg.ok ? undefined : "alert"}
          className={`text-sm ${msg.ok ? "text-primary" : "text-destructive"}`}
        >
          {msg.text}
        </p>
      )}
    </form>
  );
}
