// Koszyk klienta — działa offline i bez konta.
//
// Źródłem prawdy jest stan W PAMIĘCI: każda zmiana od razu trafia do
// subskrybentów (UI odświeża się w tym samym ticku), a dopiero potem ląduje w
// localStorage „w tle". Nieudany zapis (tryb prywatny, brak miejsca) nie
// blokuje więc niczego — koszyk działa dalej, traci tylko trwałość.
//
// Zamówienie powstaje dopiero przy płatności: każda pozycja to osobne
// zamówienie spięte wspólnym `bundleId` (patrz mutacja `orders.submitCart`).

import type { UploadedFileInfo } from "@/components/UploadPlikDoDruku";
import { computeCartTotals, type CartTotals, clampQuantity } from "@/lib/pricing";
import { getProduct, type Product, type ProductFormat } from "@/lib/products";

/** Wersjonowany klucz — bumpnij sufiks, jeśli kształt koszyka się zmieni. */
export const CART_KEY = "DobrePrinty:cart:v1";

/** Limit pozycji — ten sam, co w mutacji `orders.submitCart`. */
export const MAX_CART_ITEMS = 10;

export type CartItem = {
  /** losowy identyfikator pozycji (ten sam produkt można dodać kilka razy) */
  id: string;
  slug: string;
  formatId: string;
  quantity: number;
  /** pliki wgrane do chmury przy tej pozycji */
  files: UploadedFileInfo[];
  /** alternatywa dla plików — link do projektu */
  fileUrl?: string;
  notes?: string;
};

/** Pozycja koszyka rozwiązana o katalog + jej cena brutto (bez wysyłki). */
export type ResolvedCartItem = CartItem & {
  product: Product;
  format: ProductFormat;
  gross: number;
};

export type CartState = {
  items: CartItem[];
  /** false = jeszcze nie odczytaliśmy localStorage (SSR / pierwszy render) */
  hydrated: boolean;
};

// --- store ----------------------------------------------------------------

/** Stała referencja dla SSR — inaczej useSyncExternalStore wpada w pętlę. */
const SERVER_STATE: CartState = { items: [], hydrated: false };

let state: CartState = SERVER_STATE;
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

function setItems(items: CartItem[]): void {
  // 1) pamięć — UI widzi zmianę natychmiast
  state = { items, hydrated: true };
  emit();
  // 2) dysk — w tle, błąd zapisu nie cofa zmiany w UI
  try {
    localStorage.setItem(CART_KEY, JSON.stringify({ items }));
  } catch {
    // brak miejsca / tryb prywatny — koszyk zostaje w pamięci
  }
}

function readStored(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { items?: unknown };
    if (!Array.isArray(parsed?.items)) return [];
    return parsed.items.filter(isCartItem);
  } catch {
    // uszkodzony koszyk ignorujemy — startujemy z pustego
    return [];
  }
}

function hydrate(): void {
  if (state.hydrated || typeof window === "undefined") return;
  state = { items: readStored(), hydrated: true };
}

/** Zmiana w innej karcie — dociągamy jej stan. */
function onStorage(event: StorageEvent): void {
  if (event.key !== null && event.key !== CART_KEY) return;
  state = { items: readStored(), hydrated: true };
  emit();
}

export function subscribeCart(listener: () => void): () => void {
  hydrate();
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

export function getCartSnapshot(): CartState {
  return state;
}

export function getCartServerSnapshot(): CartState {
  return SERVER_STATE;
}

/** Bieżące pozycje — dla kodu spoza Reacta (np. formularz checkoutu). */
export function readCart(): CartItem[] {
  hydrate();
  return state.items;
}

// --- mutacje --------------------------------------------------------------

export function newCartItemId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

/** Minimalny nakład produktu z katalogu (np. naklejki od 100 szt.). */
function minQuantityFor(slug: string): number | undefined {
  return getProduct(slug)?.minQuantity;
}

/** Dokłada pozycję i zwraca jej id (albo null, gdy koszyk jest pełny). */
export function addCartItem(item: Omit<CartItem, "id">): string | null {
  const items = readCart();
  if (items.length >= MAX_CART_ITEMS) return null;
  const id = newCartItemId();
  setItems([
    ...items,
    { ...item, id, quantity: clampQuantity(item.quantity, minQuantityFor(item.slug)) },
  ]);
  return id;
}

export function updateCartItem(id: string, patch: Partial<Omit<CartItem, "id">>): void {
  setItems(
    readCart().map((item) =>
      item.id === id
        ? {
            ...item,
            ...patch,
            quantity: clampQuantity(
              patch.quantity ?? item.quantity,
              minQuantityFor(patch.slug ?? item.slug),
            ),
          }
        : item,
    ),
  );
}

export function removeCartItem(id: string): void {
  setItems(readCart().filter((item) => item.id !== id));
}

export function clearCart(): void {
  setItems([]);
}

/**
 * Dopina pozycję z konfiguratora / kreatora projektu: ten sam produkt, format
 * i nakład aktualizuje w miejscu (żeby powrót na tę samą stronę nie mnożył
 * duplikatów), a nowy zestaw dokłada na koniec. Zwraca id pozycji.
 */
export function upsertCartItem(item: Omit<CartItem, "id">): string | null {
  const existing = readCart().find(
    (i) =>
      i.slug === item.slug &&
      i.formatId === item.formatId &&
      i.quantity === clampQuantity(item.quantity, minQuantityFor(item.slug)),
  );
  if (!existing) return addCartItem(item);
  // Pliki dopisujemy tylko gdy nowe wejście je ma — inaczej powrót na stronę
  // zamówienia bez plików skasowałby projekt wgrany wcześniej.
  updateCartItem(existing.id, {
    ...item,
    files: item.files.length > 0 ? item.files : existing.files,
  });
  return existing.id;
}

// --- wycena ---------------------------------------------------------------

/** Rozwiązuje pozycje o katalog i wycenia koszyk (wysyłka liczona raz). */
export function resolveCart(items: CartItem[]): {
  items: ResolvedCartItem[];
  totals: CartTotals;
} {
  const resolved: (CartItem & { product: Product; format: ProductFormat })[] = [];
  for (const item of items) {
    const product = getProduct(item.slug);
    if (!product) continue; // produkt zniknął z katalogu — pomijamy pozycję
    const format =
      product.formats.find((f) => f.id === item.formatId) ?? product.formats[0];
    resolved.push({ ...item, product, format });
  }

  const totals = computeCartTotals(
    resolved.map((r) => ({
      product: r.product,
      format: r.format,
      quantity: r.quantity,
    })),
  );

  return {
    items: resolved.map((r, index) => ({ ...r, gross: totals.lineGross[index] })),
    totals,
  };
}

/** Pozycja jest gotowa do zamówienia dopiero z plikiem albo linkiem. */
export function itemHasDesign(item: CartItem): boolean {
  return item.files.length > 0 || (item.fileUrl ?? "").trim() !== "";
}

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Partial<CartItem>;
  return (
    typeof item.id === "string" &&
    typeof item.slug === "string" &&
    typeof item.formatId === "string" &&
    typeof item.quantity === "number" &&
    Array.isArray(item.files)
  );
}
