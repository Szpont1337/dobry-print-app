import "server-only";

import Stripe from "stripe";

// Shared server-side helpers live in serverEnv.ts (no Stripe dependency) and
// are re-exported here for back-compat with existing imports.
export { getConvexHttp, getServerSecret, getSiteUrl } from "./serverEnv";

const secret = process.env.STRIPE_SECRET_KEY;

export const stripe = new Stripe(secret ?? "missing_key", {
  typescript: true,
});

export function assertStripeConfigured() {
  if (!secret) {
    throw new Error("Brak STRIPE_SECRET_KEY w środowisku.");
  }
}
