// Service worker: fetches the fulfillment payload from dobreprinty. Runs with the
// extension's host_permissions, so it bypasses page CORS on allegro.pl.

// Switch to "http://localhost:3000" for local dev.
const dobreprinty_BASE = "http://localhost:3000";

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg && msg.type === "fetchFulfillment" && msg.token) {
    fetchFulfillment(msg.token)
      .then((payload) => sendResponse({ ok: true, payload }))
      .catch((err) =>
        sendResponse({ ok: false, error: String(err && err.message ? err.message : err) }),
      );
    return true; // keep the message channel open for the async response
  }
  return false;
});

async function fetchFulfillment(token) {
  const url = `${dobreprinty_BASE}/api/allegro/fulfillment?t=${encodeURIComponent(token)}`;
  const res = await fetch(url, { method: "GET", cache: "no-store" });
  if (res.status === 401) {
    throw new Error("Token wygasł — kliknij „Kup na Allegro" w panelu ponownie.");
  }
  if (!res.ok) {
    throw new Error(`Błąd pobierania danych (HTTP ${res.status}).`);
  }
  return await res.json();
}
