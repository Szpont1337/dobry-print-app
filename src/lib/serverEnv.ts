import "server-only";

import { ConvexHttpClient } from "convex/browser";

export function getConvexHttp() {
  const url = process.env.CONVEX_URL ?? process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    throw new Error("Brak CONVEX_URL / NEXT_PUBLIC_CONVEX_URL.");
  }
  return new ConvexHttpClient(url);
}

/**
 * Shared secret authorizing this server to call privileged Convex functions
 * (markPaid, attachStripeSession, getById…). Must be set in both the Next and
 * Convex environments. Never exposed to the browser.
 */
export function getServerSecret(): string {
  const secret = process.env.INTERNAL_API_SECRET;
  if (!secret) {
    throw new Error("Brak INTERNAL_API_SECRET w środowisku serwera.");
  }
  return secret;
}

export function getSiteUrl() {
  // Must be set per environment (e.g. production = https://www.dobreprinty.pl). We do
  // NOT fall back to request headers (Host / X-Forwarded-Host) — those are
  // attacker-controlled and would let someone point Stripe's success/cancel
  // redirect at their own domain to steal the session_id.
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (envUrl) return envUrl;
  return "http://localhost:3000";
}
