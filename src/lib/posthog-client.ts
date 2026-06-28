/**
 * Bezpieczne, leniwe wysłanie zdarzenia do PostHog.
 *
 * posthog-js jest importowany dynamicznie (osobny chunk) i tylko po zgodzie na
 * cookies — dzięki temu biblioteka nie trafia do początkowego bundla stron,
 * na których jest tylko `safeCapture` (konfigurator, formularz zamówienia).
 */
export function safeCapture(
  event: string,
  properties?: Record<string, unknown>,
) {
  try {
    if (localStorage.getItem("cookie-consent") !== "accepted") return;
  } catch {
    return;
  }

  void import("posthog-js")
    .then(({ default: posthog }) => {
      try {
        posthog.capture(event, properties);
      } catch {
        // Ad blockery mogą popsuć wewnętrzne API posthog — pomijamy po cichu
      }
    })
    .catch(() => {
      // posthog-js nie załadował się (np. blokada sieciowa) — pomijamy
    });
}
