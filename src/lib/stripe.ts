import "server-only";

import Stripe from "stripe";

// Shared server-side helpers live in serverEnv.ts (no Stripe dependency) and
// are re-exported here for back-compat with existing imports.
export { getConvexHttp, getServerSecret, getSiteUrl } from "./serverEnv";

const secret = process.env.STRIPE_SECRET_KEY;

export const stripe = new Stripe(secret ?? "missing_key", {
  typescript: true,
});

/**
 * Id zamówień opłacanych JEDNĄ sesją. Koszyk tworzy kilka zamówień naraz i
 * wszystkie lądują w metadanych sesji — po samym id sesji nie da się ich
 * jednoznacznie odszukać, bo dzieli je kilka rekordów.
 */
export function orderIdsFromMetadata(
  metadata: Stripe.Metadata | null | undefined,
): string[] {
  const joined = metadata?.orderIds ?? metadata?.orderId ?? "";
  return joined
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

export function assertStripeConfigured() {
  if (!secret) {
    throw new Error("Brak STRIPE_SECRET_KEY w środowisku.");
  }
}
