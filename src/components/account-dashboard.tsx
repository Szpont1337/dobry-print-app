"use client";

import { useMutation, useQuery } from "convex/react";
import {
  Building2,
  ClipboardList,
  Inbox,
  Loader2,
  Mail,
  MapPin,
  PackageCheck,
  ReceiptText,
  Truck,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useTranslation } from "react-i18next";

import { api } from "@convex/_generated/api";

import {
  Badge,
  Breadcrumbs,
  Button,
  Input,
  SectionHeader,
} from "@/components/ui";
import { cn } from "@/lib/cn";

import { useAuth } from "./auth-provider";

function initialsFrom(name: string | null, email: string): string {
  const source = name?.trim() || email.split("@")[0];
  const parts = source.split(/[\s._-]+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((p) => p[0]);
  return (letters.join("") || source[0] || "?").toUpperCase();
}

type OrderStatus =
  | "pending"
  | "in_production"
  | "ready_to_ship"
  | "shipped"
  | "awaiting_pickup"
  | "completed"
  | "cancelled";

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Oczekujące",
  in_production: "W produkcji",
  ready_to_ship: "Przygotowanie do wysyłki",
  shipped: "Wysłane",
  awaiting_pickup: "Czeka na odbiór",
  completed: "Zrealizowane",
  cancelled: "Anulowane",
};

const STATUS_TONE: Record<OrderStatus, string> = {
  pending: "bg-accent text-accent-foreground",
  in_production: "bg-chart-3/15 text-chart-3",
  ready_to_ship: "bg-chart-2/15 text-chart-2",
  shipped: "bg-chart-4/15 text-chart-4",
  awaiting_pickup: "bg-chart-1/15 text-chart-1",
  completed: "bg-primary/15 text-primary",
  cancelled: "bg-destructive/10 text-destructive",
};

const formatPLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  minimumFractionDigits: 2,
});
const formatQty = new Intl.NumberFormat("pl-PL");
const formatDate = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function AccountDashboard() {
  const { token, status, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "anonymous") router.push("/");
  }, [status, router]);

  if (status !== "authenticated" || !token || !user) {
    return (
      <section className="flex flex-1 items-center justify-center px-6 pt-40 pb-24">
        <Loader2
          aria-hidden
          className="size-8 animate-spin text-muted-foreground"
        />
      </section>
    );
  }

  return (
    <>
      <WelcomeBanner email={user.email} name={user.name} />
      <OrdersSection token={token} />
      <ProfileSection token={token} userEmail={user.email} />
    </>
  );
}

function WelcomeBanner({
  email,
  name,
}: {
  email: string;
  name: string | null;
}) {
  const { t } = useTranslation("account");
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-accent/40 via-background to-background pt-36 pb-12 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(0,0,0,0.04)_0%,_transparent_60%)]"
      />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Breadcrumbs
          items={[{ label: t("home"), href: "/" }, { label: t("breadcrumb") }]}
        />

        <div className="mt-8 flex flex-wrap items-end justify-between gap-5 border-t-2 border-foreground pt-4">
          <div className="flex items-center gap-5">
            <span
              aria-hidden
              className="grid size-16 shrink-0 place-items-center rounded-lg bg-primary text-xl font-extrabold tracking-tight text-primary-foreground sm:size-20 sm:text-2xl"
            >
              {initialsFrom(name, email)}
            </span>
            <div>
              <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                <span className="text-primary">00</span>
                <span aria-hidden>/</span>
                {t("eyebrow")}
              </p>
              <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {t("welcome")}
                <span className="text-primary">
                  {name?.split(" ")[0] || email.split("@")[0]}
                </span>
                .
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:text-lg">
                {t("intro")}
              </p>
            </div>
          </div>
          <Button href="/#produkty" variant="primary" size="lg">
            {t("ctaNew")}
            <span aria-hidden>→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

type Order = {
  _id: string;
  _creationTime: number;
  productName: string;
  formatLabel: string;
  quantity: number;
  netTotal: number;
  vatTotal: number;
  grossTotal: number;
  status: OrderStatus;
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  fileUrl?: string;
  notes?: string;
  companyName?: string;
  taxId?: string;
  pickupPointAddress?: string;
  pickupCode?: string;
  pickupPhone?: string;
};

function OrdersSection({ token }: { token: string }) {
  const { t } = useTranslation("account");
  const orders = useQuery(api.orders.getMyOrders, { token });
  const isLoading = orders === undefined;

  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeader
          index="01"
          eyebrow={
            <>
              <ClipboardList aria-hidden className="size-4" />
              {t("tabOrders")}
            </>
          }
          title={t("tabHistory")}
          aside={
            !isLoading && orders.length > 0 ? (
              <Badge tone="neutral">{orders.length} / 50</Badge>
            ) : null
          }
        />

        {isLoading ? (
          <div className="mt-10 grid place-items-center border border-border bg-card py-16">
            <Loader2
              aria-hidden
              className="size-8 animate-spin text-muted-foreground"
            />
          </div>
        ) : orders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <ul className="mt-8 space-y-4">
            {(orders as Order[]).map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function EmptyOrders() {
  const { t } = useTranslation("account");
  return (
    <div className="mt-10 grid place-items-center border border-dashed border-border bg-card px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-lg bg-accent text-accent-foreground">
        <Inbox aria-hidden className="size-7" />
      </span>
      <h3 className="mt-5 text-lg font-extrabold tracking-tight text-foreground">
        {t("empty")}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {t("emptyHint")}
      </p>
      <Button href="/#produkty" variant="primary" className="mt-6">
        {t("chooseProduct")}
        <span aria-hidden>→</span>
      </Button>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const { t } = useTranslation("account");
  const shortId = order._id.slice(-8).toUpperCase();
  return (
    <li>
      <div className="border border-border bg-card p-5 sm:p-6">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              #{shortId}
            </p>
            <h3 className="mt-1 text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
              {order.productName}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatQty.format(order.quantity)} · {order.formatLabel}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider ${STATUS_TONE[order.status]}`}
            >
              {t(`status.${order.status}`)}
            </span>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {formatDate.format(order._creationTime)}
            </p>
          </div>
        </header>

        <dl className="mt-5 grid gap-4 border-t border-border pt-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="flex items-center gap-1.5 text-muted-foreground">
              <ReceiptText aria-hidden className="size-4" />
              {t("grossAmount")}
            </dt>
            <dd className="mt-1 font-mono text-lg font-semibold text-foreground tabular-nums">
              {formatPLN.format(order.grossTotal)}
            </dd>
            <dd className="font-mono text-xs text-muted-foreground">
              {t("netVat", {
                net: formatPLN.format(order.netTotal),
                vat: formatPLN.format(order.vatTotal),
              })}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-muted-foreground">
              <Truck aria-hidden className="size-4" />
              {t("shippingAddress")}
            </dt>
            <dd className="mt-1 text-foreground">
              {order.shippingStreet}
              <br />
              {order.shippingPostalCode} {order.shippingCity}
              {order.shippingCountry !== "Polska" && (
                <>
                  <br />
                  {order.shippingCountry}
                </>
              )}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-muted-foreground">
              <PackageCheck aria-hidden className="size-4" />
              {t("printFile")}
            </dt>
            <dd className="mt-1 text-foreground">
              {order.fileUrl ? (
                <span className="truncate text-sm">
                  {order.fileUrl.startsWith("zamowienia/")
                    ? order.fileUrl.split("/").pop()
                    : order.fileUrl}
                </span>
              ) : (
                <span className="text-muted-foreground">{t("noFile")}</span>
              )}
            </dd>
          </div>
        </dl>

        {order.status === "awaiting_pickup" &&
          (order.pickupPointAddress || order.pickupCode) && (
            <div className="mt-4 border border-chart-1/30 bg-chart-1/5 p-4">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <PackageCheck aria-hidden className="size-4 text-chart-1" />
                {t("pickupTitle")}
              </p>
              <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                {order.pickupPointAddress && (
                  <div className="sm:col-span-2">
                    <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin aria-hidden className="size-3.5" />
                      {t("pickupAddress")}
                    </dt>
                    <dd className="mt-0.5 text-sm text-foreground">
                      {order.pickupPointAddress}
                    </dd>
                  </div>
                )}
                {order.pickupCode && (
                  <div>
                    <dt className="text-xs text-muted-foreground">
                      {t("pickupCode")}
                    </dt>
                    <dd className="mt-0.5 font-mono text-lg font-semibold tracking-wider text-foreground">
                      {order.pickupCode}
                    </dd>
                  </div>
                )}
                {order.pickupPhone && (
                  <div>
                    <dt className="text-xs text-muted-foreground">
                      {t("pickupPhone")}
                    </dt>
                    <dd className="mt-0.5 text-sm text-foreground">
                      {order.pickupPhone}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}

        {(order.notes || order.companyName) && (
          <footer className="mt-4 grid gap-2 border-t border-border pt-3 text-sm text-muted-foreground">
            {order.companyName && (
              <p>
                <strong className="text-foreground">{order.companyName}</strong>
                {order.taxId ? ` · ${order.taxId}` : ""}
              </p>
            )}
            {order.notes && (
              <p>
                {t("notesPrefix")}
                {order.notes}
              </p>
            )}
          </footer>
        )}
      </div>
    </li>
  );
}

function ProfileSection({
  token,
  userEmail,
}: {
  token: string;
  userEmail: string;
}) {
  const { t } = useTranslation("account");
  const data = useQuery(api.profile.get, { token });
  const save = useMutation(api.profile.upsert);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<
    { kind: "ok" | "err"; message: string } | null
  >(null);

  const nameId = useId();
  const phoneId = useId();
  const companyId = useId();
  const taxId = useId();
  const streetId = useId();
  const cityId = useId();
  const zipId = useId();
  const countryId = useId();

  if (data === undefined) {
    return (
      <section className="bg-background-alt py-12 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid place-items-center border border-border bg-card py-16">
            <Loader2
              aria-hidden
              className="size-8 animate-spin text-muted-foreground"
            />
          </div>
        </div>
      </section>
    );
  }

  if (data === null) return null;

  const profile = data.profile;
  const name = data.user.name ?? "";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const get = (key: string) => String(fd.get(key) ?? "");
    setBusy(true);
    setFeedback(null);
    try {
      await save({
        token,
        name: get("name"),
        phone: get("phone"),
        companyName: get("companyName"),
        taxId: get("taxId"),
        shippingStreet: get("shippingStreet"),
        shippingCity: get("shippingCity"),
        shippingPostalCode: get("shippingPostalCode"),
        shippingCountry: get("shippingCountry"),
      });
      setFeedback({ kind: "ok", message: t("saved") });
    } catch (err) {
      setFeedback({
        kind: "err",
        message:
          err instanceof Error ? err.message : t("saveError"),
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="bg-background-alt py-12 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeader
          index="02"
          eyebrow={
            <>
              <UserRound aria-hidden className="size-4" />
              {t("profileEyebrow")}
            </>
          }
          title={t("profileHeadline")}
          description={t("profileSub")}
        />

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-6 border border-border bg-card p-6 sm:p-8"
        >
          <Fieldset legend={t("fieldsetBasic")} icon={Mail}>
            <ReadonlyField label={t("fields.email")} value={userEmail} />
            <Field
              id={nameId}
              label={t("fields.name")}
              name="name"
              defaultValue={name}
              autoComplete="name"
            />
            <Field
              id={phoneId}
              label={t("fields.phone")}
              name="phone"
              type="tel"
              defaultValue={profile?.phone ?? ""}
              autoComplete="tel"
              placeholder="+48 …"
            />
          </Fieldset>

          <Fieldset legend={t("fieldsetCompany")} icon={Building2}>
            <Field
              id={companyId}
              label={t("fields.companyName")}
              name="companyName"
              defaultValue={profile?.companyName ?? ""}
              autoComplete="organization"
            />
            <Field
              id={taxId}
              label={t("fields.taxId")}
              name="taxId"
              defaultValue={profile?.taxId ?? ""}
              inputMode="numeric"
            />
          </Fieldset>

          <Fieldset legend={t("fieldsetAddress")} icon={Truck}>
            <Field
              id={streetId}
              label={t("fields.shippingStreet")}
              name="shippingStreet"
              defaultValue={profile?.shippingStreet ?? ""}
              autoComplete="street-address"
              full
            />
            <Field
              id={cityId}
              label={t("fields.shippingCity")}
              name="shippingCity"
              defaultValue={profile?.shippingCity ?? ""}
              autoComplete="address-level2"
            />
            <Field
              id={zipId}
              label={t("fields.shippingPostalCode")}
              name="shippingPostalCode"
              defaultValue={profile?.shippingPostalCode ?? ""}
              autoComplete="postal-code"
              placeholder="00-000"
            />
            <Field
              id={countryId}
              label={t("fields.shippingCountry")}
              name="shippingCountry"
              defaultValue={profile?.shippingCountry ?? "Polska"}
              autoComplete="country-name"
            />
          </Fieldset>

          <footer className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            {feedback ? (
              <p
                className={`text-sm ${
                  feedback.kind === "ok"
                    ? "text-primary"
                    : "text-destructive"
                }`}
              >
                {feedback.message}
              </p>
            ) : (
              <span className="text-xs text-muted-foreground">
                {t("privacy")}
              </span>
            )}
            <Button type="submit" variant="primary" disabled={busy}>
              {busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
              {busy ? t("saving") : t("save")}
            </Button>
          </footer>
        </form>
      </div>
    </section>
  );
}

function Fieldset({
  legend,
  icon: Icon,
  children,
}: {
  legend: string;
  icon: React.ComponentType<{ "aria-hidden"?: boolean; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="grid gap-4 sm:grid-cols-2">
      <legend className="col-span-full flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
        <Icon aria-hidden className="size-4" />
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  id,
  label,
  name,
  type = "text",
  defaultValue,
  autoComplete,
  placeholder,
  inputMode,
  full = false,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  full?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className={cn("flex flex-col gap-1.5 text-sm", full && "sm:col-span-2")}
    >
      <span className="font-semibold tracking-tight text-foreground">
        {label}
      </span>
      <Input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        placeholder={placeholder}
        inputMode={inputMode}
      />
    </label>
  );
}

function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5 text-sm">
      <span className="font-semibold tracking-tight text-foreground">
        {label}
      </span>
      <div className="flex h-11 items-center rounded-lg border border-input bg-muted/40 px-4 text-sm text-muted-foreground">
        {value}
      </div>
    </div>
  );
}
