"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";

const CONSENT_KEY = "cookie-consent";

function subscribe(callback: () => void) {
  window.addEventListener("cookie-consent-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("cookie-consent-change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): string | null {
  return localStorage.getItem(CONSENT_KEY);
}

// Non-null sentinel on the server so the banner is not emitted during SSR —
// it appears only after the client confirms no consent was stored yet.
const getServerSnapshot = (): string => "ssr";

export function CookieConsentBanner() {
  const { t } = useTranslation("common");
  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const visible = consent === null;

  const save = (value: "accepted" | "rejected") => {
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event("cookie-consent-change"));
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("cookies.ariaLabel")}
      className="fixed inset-x-0 bottom-0 z-50 bg-neutral-900 text-white shadow-lg"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p className="text-sm leading-relaxed sm:max-w-2xl">
          {t("cookies.text")}{" "}
          <Link
            href="/polityka-prywatnosci"
            className="underline underline-offset-2 hover:opacity-80"
          >
            {t("cookies.privacyLink")}
          </Link>
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:shrink-0">
          <button
            type="button"
            onClick={() => save("rejected")}
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-medium transition hover:bg-white/10"
          >
            {t("cookies.reject")}
          </button>
          <button
            type="button"
            onClick={() => save("accepted")}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-white/90"
          >
            {t("cookies.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
