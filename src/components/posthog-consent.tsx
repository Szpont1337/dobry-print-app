"use client";

import { useEffect, useRef } from "react";

/**
 * Ładuje i inicjalizuje PostHog dopiero PO zgodzie na cookies (tak jak GA).
 * Dzięki temu na pierwszym wejściu (bez zgody — m.in. test PageSpeed) biblioteka
 * posthog-js i jej `surveys.js` nie są w ogóle pobierane ani wykonywane.
 * `surveys` są wyłączone, bo z nich nie korzystamy.
 */
export function PostHogConsent() {
  const initialized = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const isAccepted = () => {
      try {
        return localStorage.getItem("cookie-consent") === "accepted";
      } catch {
        return false;
      }
    };

    const apply = async () => {
      const accepted = isAccepted();

      // Jeszcze nigdy nie załadowano PostHoga i brak zgody → nic nie rób
      // (nie pobieramy biblioteki na początkowym ładowaniu).
      if (!initialized.current && !accepted) return;

      const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
      if (!token) return;

      try {
        const { default: posthog } = await import("posthog-js");
        if (cancelled) return;

        if (!initialized.current) {
          posthog.init(token, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            defaults: "2026-01-30",
            disable_surveys: true,
          });
          initialized.current = true;
        }

        if (accepted) posthog.opt_in_capturing();
        else posthog.opt_out_capturing();
      } catch {
        // posthog może być zablokowany przez ad-blockery
      }
    };

    void apply();
    const handler = () => void apply();
    window.addEventListener("cookie-consent-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      cancelled = true;
      window.removeEventListener("cookie-consent-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return null;
}
