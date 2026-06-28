"use client";

import { useAction, useMutation, useQuery } from "convex/react";
import {
  Bot,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  FileText,
  Inbox,
  Link2,
  Loader2,
  MapPin,
  Package,
  PackageCheck,
  Printer,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Users,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Component, type ErrorInfo, type ReactNode, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";

import {
  Badge,
  Breadcrumbs,
  Button,
  Input,
  SectionHeader,
} from "@/components/ui";
import { cn } from "@/lib/cn";

import { useAuth } from "./auth-provider";

type OrderStatus =
  | "pending"
  | "in_production"
  | "ready_to_ship"
  | "shipped"
  | "awaiting_pickup"
  | "completed"
  | "cancelled";

const STATUS_TONE: Record<OrderStatus, string> = {
  pending: "bg-accent text-accent-foreground",
  in_production: "bg-chart-3/15 text-chart-3",
  ready_to_ship: "bg-chart-2/15 text-chart-2",
  shipped: "bg-chart-4/15 text-chart-4",
  awaiting_pickup: "bg-chart-1/15 text-chart-1",
  completed: "bg-primary/15 text-primary",
  cancelled: "bg-destructive/10 text-destructive",
};

type PaymentStatus = "unpaid" | "paid" | "failed";

const PAYMENT_TONE: Record<PaymentStatus, string> = {
  unpaid: "bg-muted text-muted-foreground",
  paid: "bg-primary/15 text-primary",
  failed: "bg-destructive/10 text-destructive",
};

const PAYMENT_LABEL: Record<PaymentStatus, string> = {
  unpaid: "Nieopłacone",
  paid: "Opłacone",
  failed: "Płatność nieudana",
};

const STATUSES: OrderStatus[] = [
  "pending",
  "in_production",
  "ready_to_ship",
  "shipped",
  "awaiting_pickup",
  "completed",
  "cancelled",
];

type ActionKey =
  | "startProduction"
  | "markReadyToShip"
  | "markShipped"
  | "markAwaitingPickup"
  | "confirmReceived"
  | "restore"
  | "cancel"
  | "backToProduction";

const NEXT_ACTIONS: Record<
  OrderStatus,
  Array<{ to: OrderStatus; labelKey: ActionKey; tone: "primary" | "outline" | "danger" }>
> = {
  pending: [
    { to: "in_production", labelKey: "startProduction", tone: "primary" },
    { to: "cancelled", labelKey: "cancel", tone: "danger" },
  ],
  in_production: [
    { to: "ready_to_ship", labelKey: "markReadyToShip", tone: "primary" },
    { to: "cancelled", labelKey: "cancel", tone: "danger" },
  ],
  ready_to_ship: [
    { to: "shipped", labelKey: "markShipped", tone: "primary" },
    { to: "awaiting_pickup", labelKey: "markAwaitingPickup", tone: "outline" },
    { to: "in_production", labelKey: "backToProduction", tone: "outline" },
    { to: "cancelled", labelKey: "cancel", tone: "danger" },
  ],
  shipped: [
    { to: "awaiting_pickup", labelKey: "markAwaitingPickup", tone: "primary" },
    { to: "completed", labelKey: "confirmReceived", tone: "outline" },
  ],
  awaiting_pickup: [
    { to: "completed", labelKey: "confirmReceived", tone: "primary" },
    { to: "cancelled", labelKey: "cancel", tone: "danger" },
  ],
  completed: [
    { to: "in_production", labelKey: "backToProduction", tone: "outline" },
  ],
  cancelled: [{ to: "pending", labelKey: "restore", tone: "outline" }],
};

const formatPLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  minimumFractionDigits: 2,
});
const formatQty = new Intl.NumberFormat("pl-PL");
const formatDateTime = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
const formatDate = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function AdminDashboard() {
  const { token, status } = useAuth();
  const router = useRouter();
  const adminInfo = useQuery(
    api.admin.isAdmin,
    token ? { token } : "skip",
  );

  useEffect(() => {
    if (status === "anonymous") router.push("/");
  }, [status, router]);

  useEffect(() => {
    if (token && adminInfo === null) router.push("/konto");
  }, [adminInfo, token, router]);

  if (status === "loading" || !token || adminInfo === undefined) {
    return (
      <section className="flex flex-1 items-center justify-center pt-40 pb-24">
        <Loader2
          aria-hidden
          className="size-8 animate-spin text-muted-foreground"
        />
      </section>
    );
  }
  if (!adminInfo) return null;

  return (
    <>
      <AdminBanner email={adminInfo.email} />
      <StatsSection token={token} />
      <OrdersSection token={token} />
      <SideGrid token={token} />
    </>
  );
}

function AdminBanner({ email }: { email: string }) {
  const { t } = useTranslation("admin");
  const { t: tc } = useTranslation("common");
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-accent/40 via-background to-background pt-36 pb-10 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(0,0,0,0.04)_0%,_transparent_60%)]"
      />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Breadcrumbs
          items={[{ label: t("home"), href: "/" }, { label: "Admin" }]}
        />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-5 border-t-2 border-foreground pt-4">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              <span className="text-primary">00</span>
              <span aria-hidden>/</span>
              <ShieldCheck aria-hidden className="size-4" />
              {tc("nav.admin")}
            </p>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t("eyebrow")}
            </h1>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              {t("introWithEmail", { email })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection({ token }: { token: string }) {
  const { t } = useTranslation("admin");
  const stats = useQuery(api.admin.orderStats, { token });
  if (!stats) return null;
  const s = stats.byStatus ?? {};
  const cards = [
    { icon: Inbox, label: t("statTotal"), value: String(stats.total ?? 0) },
    {
      icon: Clock,
      label: t("status.pending"),
      value: String(s.pending ?? 0),
    },
    {
      icon: Printer,
      label: t("status.in_production"),
      value: String(s.in_production ?? 0),
    },
    {
      icon: Package,
      label: t("status.ready_to_ship"),
      value: String(s.ready_to_ship ?? 0),
    },
    {
      icon: Truck,
      label: t("status.shipped"),
      value: String(s.shipped ?? 0),
    },
    {
      icon: MapPin,
      label: t("status.awaiting_pickup"),
      value: String(s.awaiting_pickup ?? 0),
    },
    {
      icon: CheckCircle2,
      label: t("status.completed"),
      value: String(s.completed ?? 0),
    },
    {
      icon: PackageCheck,
      label: "30d",
      value: formatPLN.format(stats.grossLast30Days ?? 0),
    },
  ];
  return (
    <section className="bg-background pt-2 pb-10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <ul className="grid grid-cols-2 border-l border-t border-border sm:grid-cols-4">
          {cards.map((c) => (
            <li
              key={c.label}
              className="border-r border-b border-border p-4"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-foreground">
                <c.icon aria-hidden className="size-4" />
              </span>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {c.label}
              </p>
              <p className="mt-1 text-2xl font-extrabold tracking-tight text-foreground tabular-nums">
                {c.value}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function OrdersSection({ token }: { token: string }) {
  const { t } = useTranslation("admin");
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const orders = useQuery(api.admin.listOrders, {
    token,
    status: filter === "all" ? undefined : filter,
    limit: 100,
  });

  return (
    <section className="bg-background pb-10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeader
          index="01"
          title={t("ordersTitle")}
          description={t("ordersSub")}
        />
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <FilterChip
            active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            {t("statTotal")}
          </FilterChip>
          {STATUSES.map((s) => (
            <FilterChip
              key={s}
              active={filter === s}
              onClick={() => setFilter(s)}
            >
              {t(`status.${s}`)}
            </FilterChip>
          ))}
        </div>

        {orders === undefined ? (
          <div className="mt-8 grid place-items-center border border-border bg-card py-16">
            <Loader2
              aria-hidden
              className="size-8 animate-spin text-muted-foreground"
            />
          </div>
        ) : orders.length === 0 ? (
          <p className="mt-8 border border-dashed border-border bg-card px-6 py-16 text-center text-sm text-muted-foreground">
            {t("emptyFilter")}
          </p>
        ) : (
          <ul className="mt-6 space-y-3">
            {orders.map((order) => (
              <AdminOrderRow key={order._id} token={token} order={order} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={active ? "primary" : "outline"}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

type AdminOrder = {
  _id: Id<"orders">;
  _creationTime: number;
  productName: string;
  formatLabel: string;
  quantity: number;
  grossTotal: number;
  netTotal: number;
  vatTotal: number;
  status: OrderStatus;
  paymentStatus?: "unpaid" | "paid" | "failed";
  paidAt?: number;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName?: string;
  taxId?: string;
  shippingStreet?: string;
  shippingCity?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;
  fileUrl?: string;
  notes?: string;
  trackingNumber?: string;
  carrier?: string;
  pickupPointAddress?: string;
  pickupCode?: string;
  pickupPhone?: string;
  deliveryMethod?: "courier" | "parcel_locker";
  parcelLockerId?: string;
  parcelLockerName?: string;
  parcelLockerAddress?: string;
  parcelLockerDescription?: string;
};

// Whether the "Kup na Allegro" action makes sense: paid and in the
// production/ready window (file verified, not yet shipped).
function canBuyOnAllegro(order: AdminOrder): boolean {
  return (
    order.paymentStatus === "paid" &&
    (order.status === "in_production" || order.status === "ready_to_ship")
  );
}

function AdminOrderRow({ token, order }: { token: string; order: AdminOrder }) {
  const { t } = useTranslation("admin");
  const updateStatus = useMutation(api.admin.updateOrderStatus);
  const markAsShipped = useMutation(api.admin.markAsShipped);
  const markAwaitingPickup = useMutation(api.admin.markAwaitingPickup);
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showShipForm, setShowShipForm] = useState(false);
  const [showPickupForm, setShowPickupForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allegroMsg, setAllegroMsg] = useState<string | null>(null);
  const shortId = order._id.slice(-8).toUpperCase();

  const onCopyAgentPrompt = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    setAllegroMsg(null);
    try {
      const res = await fetch("/api/allegro/agent-spec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, orderId: order._id }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        prompt?: string;
        error?: string;
      };
      if (res.ok && data.prompt) {
        await navigator.clipboard.writeText(data.prompt);
        setAllegroMsg(t("agentPromptCopied"));
      } else {
        setError(t("errAgentPrompt"));
      }
    } catch {
      setError(t("errAgentPrompt"));
    } finally {
      setBusy(false);
    }
  };

  const setStatus = async (next: OrderStatus) => {
    if (busy) return;
    if (next === "shipped") {
      setShowShipForm(true);
      return;
    }
    if (next === "awaiting_pickup") {
      setShowPickupForm(true);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await updateStatus({ token, orderId: order._id, status: next });
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errStatus"));
    } finally {
      setBusy(false);
    }
  };

  const actions = NEXT_ACTIONS[order.status];

  return (
    <li>
      <div className="overflow-hidden border border-border bg-card">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="flex w-full flex-wrap items-center gap-3 px-5 py-4 text-left sm:gap-6"
        >
          <div className="flex shrink-0 flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider ${STATUS_TONE[order.status]}`}
            >
              {t(`status.${order.status}`)}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider ${PAYMENT_TONE[order.paymentStatus ?? "unpaid"]}`}
            >
              {PAYMENT_LABEL[order.paymentStatus ?? "unpaid"]}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-xs text-muted-foreground">
              #{shortId}
            </p>
            <p className="truncate text-sm font-semibold text-foreground sm:text-base">
              {order.productName} · {formatQty.format(order.quantity)} szt.
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {order.customerName} · {order.customerEmail}
            </p>
          </div>
          <p className="hidden font-mono text-sm uppercase tracking-wider text-muted-foreground sm:block">
            {formatDateTime.format(order._creationTime)}
          </p>
          <p className="font-mono text-sm font-semibold text-foreground tabular-nums">
            {formatPLN.format(order.grossTotal)}
          </p>
        </button>

        {expanded && (
          <div className="space-y-4 border-t border-border px-5 pb-5 pt-4 sm:px-6">
            <dl className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Klient
                </dt>
                <dd className="mt-1 text-foreground">
                  {order.customerName}
                  <br />
                  <a
                    href={`mailto:${order.customerEmail}`}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {order.customerEmail}
                  </a>
                  <br />
                  {order.customerPhone}
                  {order.companyName && (
                    <>
                      <br />
                      <strong>{order.companyName}</strong>
                      {order.taxId && (
                        <span className="text-muted-foreground"> · NIP {order.taxId}</span>
                      )}
                    </>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  {order.deliveryMethod === "parcel_locker"
                    ? "Paczkomat InPost"
                    : "Adres dostawy"}
                </dt>
                <dd className="mt-1 text-foreground">
                  {order.deliveryMethod === "parcel_locker" ? (
                    <>
                      <strong>{order.parcelLockerId}</strong>
                      {order.parcelLockerName && (
                        <span className="ml-1 text-muted-foreground">
                          ({order.parcelLockerName})
                        </span>
                      )}
                      {order.parcelLockerAddress && (
                        <>
                          <br />
                          {order.parcelLockerAddress}
                        </>
                      )}
                      {order.parcelLockerDescription && (
                        <>
                          <br />
                          <span className="text-muted-foreground">
                            {order.parcelLockerDescription}
                          </span>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {order.shippingStreet}
                      <br />
                      {order.shippingPostalCode} {order.shippingCity}
                      <br />
                      {order.shippingCountry}
                    </>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Specyfikacja
                </dt>
                <dd className="mt-1 text-foreground">
                  {order.productName}
                  <br />
                  {formatQty.format(order.quantity)} szt. · {order.formatLabel}
                  <br />
                  Netto {formatPLN.format(order.netTotal)} · VAT{" "}
                  {formatPLN.format(order.vatTotal)} · brutto{" "}
                  <strong>{formatPLN.format(order.grossTotal)}</strong>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Płatność (Stripe)
                </dt>
                <dd className="mt-1 text-foreground">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${PAYMENT_TONE[order.paymentStatus ?? "unpaid"]}`}
                  >
                    {PAYMENT_LABEL[order.paymentStatus ?? "unpaid"]}
                  </span>
                  {order.paidAt && (
                    <>
                      <br />
                      <span className="text-muted-foreground">
                        Opłacono: {formatDateTime.format(order.paidAt)}
                      </span>
                    </>
                  )}
                  {order.stripePaymentIntentId && (
                    <>
                      <br />
                      <span className="font-mono text-xs text-muted-foreground">
                        PI: {order.stripePaymentIntentId}
                      </span>
                    </>
                  )}
                </dd>
              </div>
              <QueryErrorBoundary>
                <OrderFiles token={token} orderId={order._id} />
              </QueryErrorBoundary>
              {order.fileUrl && (
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    {t("externalFileLabel")}
                  </dt>
                  <dd className="mt-1 space-y-2">
                    <p className="break-all font-mono text-xs text-muted-foreground">
                      {order.fileUrl}
                    </p>
                    {/^https?:\/\//.test(order.fileUrl) && (
                      <Button
                        href={order.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        size="sm"
                      >
                        {t("openExternalLink")}
                      </Button>
                    )}
                  </dd>
                </div>
              )}
              {order.trackingNumber && (
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    {t("shipmentLabel")}
                  </dt>
                  <dd className="mt-1 text-foreground">
                    <span className="font-medium">{order.carrier}</span>
                    <span className="mx-2 text-muted-foreground">·</span>
                    <span className="font-mono text-xs">
                      {order.trackingNumber}
                    </span>
                  </dd>
                </div>
              )}
              {(order.pickupPointAddress || order.pickupCode) && (
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    {t("pickupLabel")}
                  </dt>
                  <dd className="mt-1 text-foreground">
                    {order.pickupPointAddress}
                    {order.pickupCode && (
                      <>
                        <br />
                        {t("pickupCode")}:{" "}
                        <span className="font-mono font-semibold">
                          {order.pickupCode}
                        </span>
                      </>
                    )}
                    {order.pickupPhone && (
                      <>
                        <br />
                        {t("pickupPhone")}: {order.pickupPhone}
                      </>
                    )}
                  </dd>
                </div>
              )}
              {order.notes && (
                <div className="lg:col-span-2">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Uwagi
                  </dt>
                  <dd className="mt-1 text-foreground">{order.notes}</dd>
                </div>
              )}
            </dl>

            <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
              <p className="mr-auto text-xs text-muted-foreground">
                {t("statusFootnote")}
              </p>
              {canBuyOnAllegro(order) && (
                <Button
                  type="button"
                  variant="outline"
                  disabled={busy}
                  onClick={onCopyAgentPrompt}
                >
                  {busy ? (
                    <Loader2 aria-hidden className="size-4 animate-spin" />
                  ) : (
                    <Bot aria-hidden className="size-4" />
                  )}
                  {t("agentPrompt")}
                </Button>
              )}
              {actions.map((action) => (
                <button
                  key={action.to}
                  type="button"
                  disabled={busy}
                  onClick={() => setStatus(action.to)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold tracking-tight transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                    action.tone === "primary"
                      ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                      : action.tone === "danger"
                        ? "border border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive/10"
                        : "border border-border bg-card text-foreground hover:bg-muted",
                  )}
                >
                  {busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
                  {action.tone === "danger" && !busy && (
                    <XCircle aria-hidden className="size-4" />
                  )}
                  {t(`actions.${action.labelKey}`)}
                </button>
              ))}
            </div>

            {showShipForm && (
              <ShipForm
                onCancel={() => setShowShipForm(false)}
                onSubmit={async ({ trackingNumber, carrier }) => {
                  setBusy(true);
                  setError(null);
                  try {
                    await markAsShipped({
                      token,
                      orderId: order._id,
                      trackingNumber,
                      carrier,
                    });
                    setShowShipForm(false);
                  } catch (err) {
                    setError(
                      err instanceof Error
                        ? err.message
                        : t("errShipment"),
                    );
                  } finally {
                    setBusy(false);
                  }
                }}
                busy={busy}
                initialTracking={order.trackingNumber ?? ""}
                initialCarrier={order.carrier ?? ""}
              />
            )}

            {showPickupForm && (
              <PickupForm
                onCancel={() => setShowPickupForm(false)}
                onSubmit={async (data) => {
                  setBusy(true);
                  setError(null);
                  try {
                    await markAwaitingPickup({
                      token,
                      orderId: order._id,
                      ...data,
                    });
                    setShowPickupForm(false);
                  } catch (err) {
                    setError(
                      err instanceof Error ? err.message : t("errPickup"),
                    );
                  } finally {
                    setBusy(false);
                  }
                }}
                busy={busy}
                initialAddress={
                  order.pickupPointAddress ??
                  order.parcelLockerAddress ??
                  ""
                }
                initialCode={order.pickupCode ?? ""}
                initialPhone={order.pickupPhone ?? order.customerPhone ?? ""}
              />
            )}

            {allegroMsg && (
              <p className="rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground">
                {allegroMsg}
              </p>
            )}

            {error && (
              <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

function ShipForm({
  onCancel,
  onSubmit,
  busy,
  initialTracking,
  initialCarrier,
}: {
  onCancel: () => void;
  onSubmit: (data: { trackingNumber: string; carrier: string }) => Promise<void>;
  busy: boolean;
  initialTracking: string;
  initialCarrier: string;
}) {
  const { t } = useTranslation("admin");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const fd = new FormData(event.currentTarget);
        void onSubmit({
          trackingNumber: String(fd.get("trackingNumber") ?? "").trim(),
          carrier: String(fd.get("carrier") ?? "").trim(),
        });
      }}
      className="grid gap-3 border border-border bg-muted/30 p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
    >
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-semibold tracking-tight text-foreground">
          {t("carrier")}
        </span>
        <Input
          name="carrier"
          required
          defaultValue={initialCarrier}
          placeholder="InPost, DPD, DHL…"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-semibold tracking-tight text-foreground">
          {t("shipmentLabel")}
        </span>
        <Input
          name="trackingNumber"
          required
          defaultValue={initialTracking}
          placeholder="0012 3456 7890"
        />
      </label>
      <div className="flex items-center gap-2 sm:col-span-1">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={busy}
        >
          {t("actions.cancel")}
        </Button>
        <Button type="submit" variant="primary" disabled={busy}>
          {busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
          {t("saveShipment")}
        </Button>
      </div>
    </form>
  );
}

function PickupForm({
  onCancel,
  onSubmit,
  busy,
  initialAddress,
  initialCode,
  initialPhone,
}: {
  onCancel: () => void;
  onSubmit: (data: {
    pickupPointAddress: string;
    pickupCode: string;
    pickupPhone: string;
  }) => Promise<void>;
  busy: boolean;
  initialAddress: string;
  initialCode: string;
  initialPhone: string;
}) {
  const { t } = useTranslation("admin");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const fd = new FormData(event.currentTarget);
        void onSubmit({
          pickupPointAddress: String(fd.get("pickupPointAddress") ?? "").trim(),
          pickupCode: String(fd.get("pickupCode") ?? "").trim(),
          pickupPhone: String(fd.get("pickupPhone") ?? "").trim(),
        });
      }}
      className="grid gap-3 border border-border bg-muted/30 p-4 sm:grid-cols-2"
    >
      <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
        <span className="font-semibold tracking-tight text-foreground">
          {t("pickupAddressLabel")}
        </span>
        <Input
          name="pickupPointAddress"
          required
          defaultValue={initialAddress}
          placeholder="Paczkomat WAW123, ul. Przykładowa 1, Warszawa"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-semibold tracking-tight text-foreground">
          {t("pickupCode")}
        </span>
        <Input
          name="pickupCode"
          required
          defaultValue={initialCode}
          placeholder="856 101"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-semibold tracking-tight text-foreground">
          {t("pickupPhone")}
        </span>
        <Input
          name="pickupPhone"
          defaultValue={initialPhone}
          placeholder="786 164 961"
        />
      </label>
      <div className="flex items-center gap-2 sm:col-span-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={busy}
        >
          {t("actions.cancel")}
        </Button>
        <Button type="submit" variant="primary" disabled={busy}>
          {busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
          {t("savePickup")}
        </Button>
      </div>
    </form>
  );
}

class QueryErrorBoundary extends Component<
  { fallback?: ReactNode; children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("[OrderFiles] query error:", error.message);
  }
  render() {
    if (this.state.error) return this.props.fallback ?? null;
    return this.props.children;
  }
}

function OrderFiles({ token, orderId }: { token: string; orderId: string }) {
  const { t } = useTranslation("admin");
  const files = useQuery(api.admin.listOrderFiles, {
    token,
    orderId: orderId as Id<"orders">,
  });

  if (files === undefined) {
    return (
      <div className="flex items-center gap-2 py-1">
        <Loader2 aria-hidden className="size-4 animate-spin text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{t("loadingFiles")}</span>
      </div>
    );
  }

  if (files.length === 0) return null;

  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">
        {t("uploadedFilesLabel")}
      </dt>
      <ShareLink token={token} orderId={orderId} />
      <dd className="mt-1 space-y-3">
        {files.map((file) => (
          <div
            key={file._id}
            className="border border-border bg-background p-3"
          >
            <div className="flex items-center gap-2">
              <FileText aria-hidden className="size-4 shrink-0 text-muted-foreground" />
              <p className="min-w-0 truncate text-sm font-medium text-foreground">
                {file.fileName}
              </p>
              <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                {(file.fileSize / 1024 / 1024).toFixed(1)} MB
              </span>
              <Badge
                tone={
                  file.status === "zatwierdzony"
                    ? "success"
                    : file.status === "odrzucony"
                      ? "danger"
                      : "accent"
                }
                className="shrink-0"
              >
                {t(`fileStatus.${file.status}`)}
              </Badge>
            </div>
            <div className="mt-2">
              <FileDownload fileKey={file.fileKey} token={token} />
            </div>
          </div>
        ))}
      </dd>
    </div>
  );
}

function ShareLink({ token, orderId }: { token: string; orderId: string }) {
  const { t } = useTranslation("admin");
  const create = useMutation(api.shareLinks.createForOrder);
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buildUrl = (code: string) =>
    `${typeof window !== "undefined" ? window.location.origin : ""}/d/${code}`;

  const generate = async () => {
    setBusy(true);
    setError(null);
    try {
      const { code } = await create({
        token,
        orderId: orderId as Id<"orders">,
      });
      const full = buildUrl(code);
      setUrl(full);
      try {
        await navigator.clipboard.writeText(full);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Clipboard may be blocked — the link is still shown for manual copy.
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errShareLink"));
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setError(t("errCopy"));
    }
  };

  return (
    <div className="mt-2 border border-dashed border-border bg-muted/30 p-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={generate}
          disabled={busy}
        >
          {busy ? (
            <Loader2 aria-hidden className="size-3.5 animate-spin" />
          ) : (
            <Link2 aria-hidden className="size-3.5" />
          )}
          {t("shareLink")}
        </Button>
        <span className="text-xs text-muted-foreground">{t("shareLinkHint")}</span>
      </div>
      {url && (
        <div className="mt-2 flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 flex-1 truncate rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-foreground"
          >
            {url}
          </a>
          <Button type="button" variant="outline" size="sm" onClick={copy}>
            {copied ? (
              <Check aria-hidden className="size-3.5 text-primary" />
            ) : (
              <Copy aria-hidden className="size-3.5" />
            )}
            {copied ? t("copied") : t("copy")}
          </Button>
        </div>
      )}
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function FileDownload({
  fileKey,
  token,
}: {
  fileKey: string;
  token: string;
}) {
  const { t } = useTranslation("admin");
  const { t: tc } = useTranslation("common");
  const generate = useAction(api.storage.generateDownloadUrl);
  const [busy, setBusy] = useState<"open" | "copy" | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openInNewTab = async () => {
    setBusy("open");
    setError(null);
    try {
      const url = await generate({ token, fileKey });
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errDownload"));
    } finally {
      setBusy(null);
    }
  };

  const copyLink = async () => {
    setBusy("copy");
    setError(null);
    try {
      const url = await generate({ token, fileKey });
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errCopy"));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={openInNewTab}
        disabled={busy !== null}
      >
        {busy === "open" ? (
          <Loader2 aria-hidden className="size-3.5 animate-spin" />
        ) : (
          <Download aria-hidden className="size-3.5" />
        )}
        {t("download")}
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={copyLink}
        disabled={busy !== null}
      >
        {busy === "copy" ? (
          <Loader2 aria-hidden className="size-3.5 animate-spin" />
        ) : copied ? (
          <Check aria-hidden className="size-3.5 text-primary" />
        ) : (
          <Copy aria-hidden className="size-3.5" />
        )}
        {copied ? t("copied") : t("copy")}
      </Button>
      <span className="text-xs text-muted-foreground">
        {t("downloadHint")}
      </span>
      {error && (
        <p className="basis-full text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}

function SideGrid({ token }: { token: string }) {
  return (
    <section className="bg-background-alt py-12 sm:py-16">
      <div className="mx-auto grid max-w-[1400px] gap-6 px-6 lg:grid-cols-2 lg:px-10">
        <RecentFiles token={token} />
        <UsersList token={token} />
        <div className="lg:col-span-2">
          <AllegroOffersSection token={token} />
        </div>
      </div>
    </section>
  );
}

function AllegroOffersSection({ token }: { token: string }) {
  const offers = useQuery(api.allegro.listOffers, { token });
  const upsert = useMutation(api.allegro.upsertOffer);
  const remove = useMutation(api.allegro.deleteOffer);
  const [productSlug, setProductSlug] = useState("");
  const [offerUrl, setOfferUrl] = useState("");
  const [variantNote, setVariantNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      await upsert({
        token,
        productSlug: productSlug.trim(),
        offerUrl: offerUrl.trim(),
        variantNote: variantNote.trim() || undefined,
      });
      setProductSlug("");
      setOfferUrl("");
      setVariantNote("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nie udało się zapisać.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="border border-border bg-card p-6">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-foreground">
          <ShoppingCart aria-hidden className="size-5 text-primary" />
          Aukcje Allegro
        </h2>
        {offers && <Badge tone="neutral">{offers.length}</Badge>}
      </header>
      <p className="mt-1 text-sm text-muted-foreground">
        Mapowanie produkt (slug) → aukcja, z której odkupujesz. „Kup na Allegro”
        otwiera tu zmapowaną ofertę.
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_2fr_1fr_auto]">
        <Input
          value={productSlug}
          onChange={(e) => setProductSlug(e.target.value)}
          placeholder="productSlug (np. ulotki)"
        />
        <Input
          value={offerUrl}
          onChange={(e) => setOfferUrl(e.target.value)}
          placeholder="https://allegro.pl/oferta/..."
        />
        <Input
          value={variantNote}
          onChange={(e) => setVariantNote(e.target.value)}
          placeholder="wariant (opc.)"
        />
        <Button
          type="button"
          variant="primary"
          disabled={busy || !productSlug.trim() || !offerUrl.trim()}
          onClick={submit}
        >
          {busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
          Zapisz
        </Button>
      </div>
      {error && (
        <p className="mt-2 rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {offers === undefined ? (
        <div className="mt-6 grid place-items-center py-8">
          <Loader2 aria-hidden className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : offers.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          Brak zmapowanych aukcji.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-border text-sm">
          {offers.map((o) => (
            <li key={o._id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">
                  <span className="font-mono">{o.productSlug}</span>
                  {o.variantNote ? (
                    <span className="ml-2 text-xs text-muted-foreground">
                      · {o.variantNote}
                    </span>
                  ) : null}
                </p>
                <a
                  href={o.offerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate text-xs text-primary underline-offset-4 hover:underline"
                >
                  {o.offerUrl}
                </a>
              </div>
              <button
                type="button"
                onClick={() => remove({ token, id: o._id })}
                className="shrink-0 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-1 text-xs font-semibold tracking-tight text-destructive hover:bg-destructive/10"
              >
                Usuń
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function RecentFiles({ token }: { token: string }) {
  const { t } = useTranslation("admin");
  const files = useQuery(api.admin.listRecentFiles, { token, limit: 12 });
  return (
    <div className="border border-border bg-card p-6">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-foreground">
          <FileText aria-hidden className="size-5 text-primary" />
          {t("filesTitle")}
        </h2>
        {files && <Badge tone="neutral">{files.length}</Badge>}
      </header>
      {files === undefined ? (
        <div className="mt-6 grid place-items-center py-8">
          <Loader2
            aria-hidden
            className="size-6 animate-spin text-muted-foreground"
          />
        </div>
      ) : files.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          {t("noFiles")}
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-border text-sm">
          {files.map((f) => (
            <li key={f._id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{f.fileName}</p>
                <p className="truncate font-mono text-xs text-muted-foreground">
                  {f.fileKey} · {(f.fileSize / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
              <Badge tone="accent" className="shrink-0">
                {t(`fileStatus.${f.status}`)}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function UsersList({ token }: { token: string }) {
  const { t } = useTranslation("admin");
  const users = useQuery(api.admin.listUsers, { token, limit: 12 });
  return (
    <div className="border border-border bg-card p-6">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-foreground">
          <Users aria-hidden className="size-5 text-primary" />
          {t("usersTitle")}
        </h2>
        {users && <Badge tone="neutral">{users.length}</Badge>}
      </header>
      {users === undefined ? (
        <div className="mt-6 grid place-items-center py-8">
          <Loader2
            aria-hidden
            className="size-6 animate-spin text-muted-foreground"
          />
        </div>
      ) : users.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          {t("noUsers")}
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-border text-sm">
          {users.map((u) => (
            <li key={u._id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">
                  {u.name || u.email}
                </p>
                {u.name && (
                  <p className="truncate text-xs text-muted-foreground">
                    {u.email}
                  </p>
                )}
              </div>
              <p className="shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {u.lastLoginAt
                  ? formatDate.format(u.lastLoginAt)
                  : formatDate.format(u._creationTime)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
