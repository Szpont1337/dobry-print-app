// dobreprinty → Allegro auto-fill content script.
//
// Contract: the floating verification panel (with copy buttons) is the source
// of truth. Auto-fill is a best-effort accelerator on top of it. Any selector
// miss degrades that field to "wypełnij ręcznie" — we NEVER throw and NEVER
// guess/fill wrong data, because the admin still verifies and clicks pay.

(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // SELECTORS — treat as CONFIG. These MUST be derived from the live Allegro
  // checkout DOM (class names rotate; the InPost geowidget is a 3rd-party iframe
  // /web component that often guards its state). When Allegro changes layout,
  // fix selectors HERE only. Each is an array of candidates tried in order.
  // ---------------------------------------------------------------------------
  const SELECTORS = {
    // Quantity input on the offer / checkout page.
    quantity: ['input[name="quantity"]', 'input[data-role="quantity-input"]'],
    // "Uwagi do sprzedawcy" textarea in checkout.
    buyerNote: [
      'textarea[name*="note"]',
      'textarea[name*="comment"]',
      'textarea[data-role="delivery-note"]',
    ],
    // InPost paczkomat search box inside Allegro's embedded geowidget.
    parcelSearch: [
      'input[placeholder*="paczkomat" i]',
      'input[placeholder*="kod punktu" i]',
      'input[data-role="point-search"]',
    ],
  };

  const TOKEN_KEY = "dfo";

  function getTokenFromHash() {
    const hash = location.hash || "";
    const m = hash.match(new RegExp(`[#&]${TOKEN_KEY}=([^&]+)`));
    return m ? decodeURIComponent(m[1]) : null;
  }

  // Strip the token from the URL bar / history immediately.
  function stripHash() {
    try {
      history.replaceState(null, "", location.pathname + location.search);
    } catch (_) {
      /* no-op */
    }
  }

  function qsFirst(candidates, root = document) {
    for (const sel of candidates) {
      const el = root.querySelector(sel);
      if (el) return el;
    }
    return null;
  }

  // React/Vue controlled inputs ignore plain `el.value = x`. Use the native
  // setter then dispatch input+change so the framework picks it up.
  function setNativeValue(el, value) {
    const proto =
      el instanceof HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
    if (setter) setter.call(el, value);
    else el.value = value;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }

  // --- best-effort fillers; each returns true on success, false to degrade ---

  function fillQuantity(payload) {
    if (!payload.quantity) return false;
    const el = qsFirst(SELECTORS.quantity);
    if (!el) return false;
    // Don't clobber a value the admin already set/changed.
    if (el.value && el.value === String(payload.quantity)) return true;
    if (el.value && el.value !== "1") return true;
    try {
      setNativeValue(el, String(payload.quantity));
      return true;
    } catch (_) {
      return false;
    }
  }

  function fillBuyerNote(payload) {
    if (!payload.buyerNote) return false;
    const el = qsFirst(SELECTORS.buyerNote);
    if (!el) return false;
    if (el.value && el.value.trim()) return true; // keep admin's text
    try {
      setNativeValue(el, payload.buyerNote);
      return true;
    } catch (_) {
      return false;
    }
  }

  // Paczkomat is the fragile part. We only type the code into the geowidget
  // search field if we find it; selecting the result is left to the admin
  // (the widget often rejects synthetic clicks). The code is always shown in
  // the panel with a copy button, so this never blocks.
  function fillParcelLocker(payload) {
    if (payload.deliveryMethod !== "parcel_locker" || !payload.parcelLockerId) {
      return false;
    }
    const el = qsFirst(SELECTORS.parcelSearch);
    if (!el) return false;
    if (el.value && el.value.trim()) return true; // keep admin's input
    try {
      setNativeValue(el, payload.parcelLockerId);
      return true;
    } catch (_) {
      return false;
    }
  }

  // ---------------------------------------------------------------------------
  // Floating verification panel (shadow DOM so Allegro CSS can't bleed in).
  // ---------------------------------------------------------------------------
  let panelHost = null;

  function renderPanel(payload, fillState) {
    if (!panelHost) {
      panelHost = document.createElement("div");
      panelHost.id = "dobreprinty-allegro-panel";
      panelHost.style.cssText =
        "position:fixed;top:16px;right:16px;z-index:2147483647;";
      document.documentElement.appendChild(panelHost);
      panelHost.attachShadow({ mode: "open" });
    }
    const shadow = panelHost.shadowRoot;

    const rows = [];
    const addr =
      payload.deliveryMethod === "parcel_locker"
        ? [payload.parcelLockerAddress, payload.parcelLockerDescription]
            .filter(Boolean)
            .join(" — ")
        : [
            payload.shippingStreet,
            [payload.shippingPostalCode, payload.shippingCity]
              .filter(Boolean)
              .join(" "),
            payload.shippingCountry,
          ]
            .filter(Boolean)
            .join(", ");

    if (payload.deliveryMethod === "parcel_locker") {
      rows.push(field("Paczkomat", payload.parcelLockerId, fillState.parcel));
    }
    rows.push(field("Adres", addr, null));
    rows.push(field("Odbiorca", payload.customerName, null));
    rows.push(field("Telefon", payload.customerPhone, null));
    rows.push(
      field(
        "Ilość",
        payload.quantity ? String(payload.quantity) : "",
        fillState.quantity,
      ),
    );
    rows.push(field("Uwagi", payload.buyerNote, fillState.note));
    rows.push(
      field(
        "Zamówienie",
        `#${payload.shortId} · ${payload.productName} · ${payload.formatLabel}`,
        null,
      ),
    );

    shadow.innerHTML = `
      <style>
        :host { all: initial; }
        .card { font:13px/1.4 system-ui,sans-serif; width:320px; max-height:80vh;
          overflow:auto; background:#fff; color:#1b1b1b; border:1px solid #e4623f;
          border-radius:12px; box-shadow:0 8px 28px rgba(0,0,0,.18); }
        .hd { display:flex; align-items:center; justify-content:space-between;
          padding:10px 12px; background:#e4623f; color:#fff; border-radius:12px 12px 0 0; }
        .hd b { font-size:13px; }
        .hd button { all:unset; cursor:pointer; font-size:16px; padding:0 4px; }
        .bd { padding:8px 12px 12px; }
        .row { padding:7px 0; border-bottom:1px solid #f0f0f0; }
        .row:last-child { border-bottom:0; }
        .lbl { display:flex; align-items:center; gap:6px; font-size:11px;
          text-transform:uppercase; letter-spacing:.04em; color:#888; }
        .val { margin-top:2px; white-space:pre-wrap; word-break:break-word; }
        .tag { font-size:10px; padding:1px 6px; border-radius:99px; }
        .ok { background:#e6f4ea; color:#137333; }
        .manual { background:#fce8e6; color:#c5221f; }
        .copy { all:unset; cursor:pointer; color:#e4623f; font-size:11px; margin-left:auto; }
        .copy:hover { text-decoration:underline; }
        .ft { display:flex; gap:8px; padding:0 12px 12px; }
        .btn { all:unset; cursor:pointer; flex:1; text-align:center; padding:8px;
          border-radius:8px; font-weight:600; font-size:12px; }
        .primary { background:#e4623f; color:#fff; }
        .ghost { border:1px solid #ddd; color:#444; }
        .err { color:#c5221f; padding:0 12px 12px; }
      </style>
      <div class="card">
        <div class="hd"><b>dobreprinty → Allegro</b><button id="x" title="Zamknij">×</button></div>
        <div class="bd">${rows.join("")}</div>
        <div class="ft">
          <button class="btn primary" id="rerun">Wypełnij ponownie</button>
          <button class="btn ghost" id="copyall">Kopiuj wszystko</button>
        </div>
      </div>`;

    shadow.getElementById("x").onclick = () => panelHost.remove();
    shadow.getElementById("rerun").onclick = () => runFill(payload);
    shadow.getElementById("copyall").onclick = () =>
      copy(buildClipboard(payload));
    shadow.querySelectorAll("[data-copy]").forEach((b) => {
      b.onclick = () => copy(b.getAttribute("data-copy"));
    });
  }

  // status: true = filled, false = manual, null = info-only (no auto-fill)
  function field(label, value, status) {
    const v = value || "—";
    const tag =
      status === true
        ? '<span class="tag ok">wypełnione</span>'
        : status === false
          ? '<span class="tag manual">wypełnij ręcznie</span>'
          : "";
    const copyBtn = value
      ? `<button class="copy" data-copy="${escapeAttr(value)}">kopiuj</button>`
      : "";
    return `<div class="row"><div class="lbl">${escapeHtml(label)}${tag}${copyBtn}</div><div class="val">${escapeHtml(v)}</div></div>`;
  }

  function buildClipboard(p) {
    const lines = [];
    if (p.deliveryMethod === "parcel_locker" && p.parcelLockerId) {
      lines.push(`Paczkomat: ${p.parcelLockerId}`);
      if (p.parcelLockerAddress) lines.push(`Adres: ${p.parcelLockerAddress}`);
    } else if (p.shippingStreet) {
      lines.push(
        `Adres: ${[p.shippingStreet, [p.shippingPostalCode, p.shippingCity].filter(Boolean).join(" "), p.shippingCountry].filter(Boolean).join(", ")}`,
      );
    }
    lines.push(
      `Odbiorca: ${p.customerName}${p.customerPhone ? ` / ${p.customerPhone}` : ""}`,
    );
    lines.push(`Ilość: ${p.quantity}`);
    lines.push(
      `Zamówienie: #${p.shortId} · ${p.productName} · ${p.formatLabel}`,
    );
    return lines.join("\n");
  }

  function copy(text) {
    if (!text) return;
    navigator.clipboard?.writeText(text).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch (_) {}
      ta.remove();
    });
  }

  function escapeHtml(s) {
    return String(s).replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  function showError(message) {
    if (!panelHost) {
      panelHost = document.createElement("div");
      panelHost.style.cssText =
        "position:fixed;top:16px;right:16px;z-index:2147483647;";
      document.documentElement.appendChild(panelHost);
      panelHost.attachShadow({ mode: "open" });
    }
    panelHost.shadowRoot.innerHTML = `
      <div style="font:13px system-ui,sans-serif;width:300px;background:#fff;
        border:1px solid #c5221f;border-radius:12px;padding:12px;
        box-shadow:0 8px 28px rgba(0,0,0,.18);color:#c5221f;">
        <b>dobreprinty → Allegro</b><br/>${escapeHtml(message)}
      </div>`;
  }

  // ---------------------------------------------------------------------------
  function runFill(payload) {
    const fillState = {
      quantity: fillQuantity(payload),
      note: fillBuyerNote(payload),
      parcel:
        payload.deliveryMethod === "parcel_locker"
          ? fillParcelLocker(payload)
          : null,
    };
    renderPanel(payload, fillState);
  }

  let currentPayload = null;

  function start() {
    const token = getTokenFromHash();
    if (!token) return; // dormant on normal browsing
    stripHash();

    chrome.runtime.sendMessage({ type: "fetchFulfillment", token }, (resp) => {
      if (chrome.runtime.lastError) {
        showError(chrome.runtime.lastError.message);
        return;
      }
      if (!resp || !resp.ok) {
        showError((resp && resp.error) || "Nie udało się pobrać danych.");
        return;
      }
      currentPayload = resp.payload;
      runFill(currentPayload);

      // Checkout is an SPA: re-attempt fills as steps mount/unmount. Fillers
      // skip already-filled fields, so re-runs never overwrite admin edits.
      // Debounced to avoid thrashing the panel on every DOM mutation.
      let pending = null;
      const obs = new MutationObserver(() => {
        if (!currentPayload || pending) return;
        pending = setTimeout(() => {
          pending = null;
          if (
            qsFirst(SELECTORS.buyerNote) ||
            qsFirst(SELECTORS.parcelSearch) ||
            qsFirst(SELECTORS.quantity)
          ) {
            runFill(currentPayload);
          }
        }, 400);
      });
      obs.observe(document.body, { childList: true, subtree: true });
    });
  }

  start();
})();
