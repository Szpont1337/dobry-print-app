"use client";

import { Check, Clock, Loader2, MapPin, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, Input } from "@/components/ui";

export type ParcelLocker = {
  id: string;
  name: string;
  address: string;
  description: string | null;
  openingHours: string;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
};

type ApiPoint = {
  name: string;
  display_name?: string;
  status?: string;
  location?: { latitude: number; longitude: number };
  location_description?: string | null;
  opening_hours?: string;
  address?: { line1?: string; line2?: string };
  image_url?: string | null;
};

const INPOST_API = "https://api-pl-points.easypack24.net/v1/points";

function toLocker(point: ApiPoint): ParcelLocker | null {
  if (!point.name) return null;
  const line1 = point.address?.line1 ?? "";
  const line2 = point.address?.line2 ?? "";
  return {
    id: point.name,
    name: point.display_name ?? `Paczkomat ${point.name}`,
    address: [line1, line2].filter(Boolean).join(", "),
    description: point.location_description ?? null,
    openingHours: point.opening_hours ?? "24/7",
    latitude: point.location?.latitude ?? 0,
    longitude: point.location?.longitude ?? 0,
    imageUrl: point.image_url ?? null,
  };
}

const POSTCODE_RE = /^\d{2}-\d{3}$/;

function normalizePostCode(value: string): string | null {
  const trimmed = value.trim().replace(/\s+/g, "");
  if (POSTCODE_RE.test(trimmed)) return trimmed;
  if (/^\d{5}$/.test(trimmed)) {
    return `${trimmed.slice(0, 2)}-${trimmed.slice(2)}`;
  }
  return null;
}

export function ParcelLockerPicker({
  value,
  onChange,
  initialPostCode = "",
}: {
  value: ParcelLocker | null;
  onChange: (locker: ParcelLocker | null) => void;
  initialPostCode?: string;
}) {
  const { t } = useTranslation("order");
  const [postCode, setPostCode] = useState(initialPostCode);
  const [results, setResults] = useState<ParcelLocker[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const normalized = normalizePostCode(postCode);

  useEffect(() => {
    if (!normalized) return;

    let cancelled = false;
    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setBusy(true);
      setError(null);
      try {
        const url = new URL(INPOST_API);
        url.searchParams.set("relative_post_code", normalized);
        url.searchParams.set("type", "parcel_locker");
        url.searchParams.set("status", "Operating");
        url.searchParams.set("per_page", "10");
        const res = await fetch(url.toString(), { signal: ctrl.signal });
        if (!res.ok) {
          throw new Error(t("picker.apiStatus", { status: res.status }));
        }
        const json = (await res.json()) as { items?: ApiPoint[] };
        if (cancelled) return;
        const lockers = (json.items ?? [])
          .map(toLocker)
          .filter((l): l is ParcelLocker => l !== null);
        setResults(lockers);
        setSearched(true);
      } catch (err) {
        if (cancelled) return;
        if ((err as { name?: string }).name === "AbortError") return;
        setError(
          err instanceof Error ? err.message : t("picker.apiError"),
        );
        setResults([]);
      } finally {
        if (!cancelled) setBusy(false);
      }
    }, 400);

    return () => {
      cancelled = true;
      ctrl.abort();
      clearTimeout(timer);
    };
  }, [normalized]);

  const [lastNormalized, setLastNormalized] = useState<string | null>(
    normalized,
  );
  if (normalized !== lastNormalized) {
    setLastNormalized(normalized);
    if (!normalized) {
      setResults([]);
      setError(null);
      setSearched(false);
      setBusy(false);
    }
  }

  return (
    <div className="col-span-full space-y-3">
      {value ? (
        <div className="flex flex-wrap items-start justify-between gap-3 border border-primary/40 bg-secondary p-4">
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary">
              <MapPin aria-hidden className="size-5" />
            </span>
            <div className="text-sm">
              <p className="font-semibold text-foreground">
                {value.name}
              </p>
              <p className="text-muted-foreground">{value.address}</p>
              {value.description && (
                <p className="text-muted-foreground">{value.description}</p>
              )}
              <p className="mt-1 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                <Clock aria-hidden className="size-3" /> {value.openingHours}
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChange(null)}
          >
            {t("picker.change")}
          </Button>
        </div>
      ) : (
        <>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
              {t("picker.postCodeLabel")}{" "}
              <span className="ml-0.5 text-destructive">*</span>
            </span>
            <span className="relative">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="text"
                inputMode="numeric"
                placeholder={t("picker.postCodePlaceholder")}
                value={postCode}
                onChange={(event) => setPostCode(event.target.value)}
                className="pl-10"
              />
            </span>
            <span className="text-xs text-muted-foreground">
              {t("picker.postCodeHint")}
            </span>
          </label>

          {busy && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 aria-hidden className="size-4 animate-spin" />
              {t("picker.searching")}
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          {!busy && !error && searched && results.length === 0 && (
            <p className="text-sm text-muted-foreground">
              {t("picker.empty")}
            </p>
          )}

          {results.length > 0 && (
            <ul className="max-h-80 space-y-2 overflow-y-auto pr-1">
              {results.map((locker) => (
                <li key={locker.id}>
                  <button
                    type="button"
                    onClick={() => onChange(locker)}
                    className="flex w-full items-start gap-3 border border-border bg-card p-3 text-left transition-colors hover:border-primary/40 hover:bg-muted"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-foreground">
                      <MapPin aria-hidden className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1 text-sm">
                      <span className="block font-semibold text-foreground">
                        {locker.name}
                      </span>
                      <span className="block text-muted-foreground">
                        {locker.address}
                      </span>
                      {locker.description && (
                        <span className="block text-muted-foreground">
                          {locker.description}
                        </span>
                      )}
                      <span className="mt-1 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        <Clock aria-hidden className="size-3" />
                        {locker.openingHours}
                      </span>
                    </span>
                    <Check
                      aria-hidden
                      className="mt-1 size-4 shrink-0 text-transparent"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
