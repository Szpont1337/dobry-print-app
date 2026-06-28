/**
 * Guard for Convex functions that may only be called by our own trusted
 * server-side code (Stripe webhook, checkout/pay routes, success/cancel pages).
 * The caller must present INTERNAL_API_SECRET — it lives only in server env
 * (Convex + Next server) and is never shipped to the browser, so anonymous
 * clients hitting the public Convex URL can't call these functions.
 */
export function assertServerSecret(secret: string): void {
  const expected = process.env.INTERNAL_API_SECRET;
  if (!expected) {
    throw new Error("INTERNAL_API_SECRET nie jest skonfigurowany w env Convexa.");
  }
  if (secret !== expected) {
    throw new Error("Brak uprawnień (serwer).");
  }
}
