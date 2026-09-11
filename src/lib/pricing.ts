import { type Product, type ProductFormat, unitPriceForQuantity } from "@/lib/products";
import { shippingFeeFor, withShipping } from "@/lib/shipping";

export const MIN_QTY = 1;
export const MAX_QTY = 100_000;
const SETUP_FEE = 4.5;

/**
 * Mnożnik ceny katalogowej do ceny finalnej. Historycznie była to stawka VAT,
 * ale DobrePrinty prowadzi działalność nierejestrowaną i nie jest podatnikiem
 * VAT — nie ma podziału na netto/brutto, jest jedna kwota do zapłaty. Mnożnik
 * został, żeby ceny dla klienta pozostały takie same jak dotąd.
 */
export const PRICE_FACTOR = 1.23;

/** Cena katalogowa jednej sztuki przeliczona na kwotę, którą płaci klient. */
export function finalUnitPrice(unitPrice: number): number {
  return unitPrice * PRICE_FACTOR;
}

/**
 * Wpasowuje nakład w dozwolony zakres i zaokrągla do pełnej sztuki.
 * `minQuantity` to minimum produktu (np. naklejki od 100 szt.) — backend
 * odrzuca zamówienia poniżej niego, więc UI nie może go przepuścić.
 */
export function clampQuantity(n: number, minQuantity?: number): number {
  const min = Math.max(MIN_QTY, minQuantity ?? MIN_QTY);
  return Math.max(min, Math.min(MAX_QTY, Math.round(n)));
}

/** Cena produktu (bez wysyłki) dla danego nakładu i ceny jednostkowej. */
export function priceFor(quantity: number, unitPrice: number, noFees = false) {
  if (noFees) return quantity * unitPrice * PRICE_FACTOR;
  const scale = quantity < 25 ? 3 : quantity < 250 ? 2.2 : quantity < 1000 ? 1.4 : 1;
  return (SETUP_FEE + quantity * unitPrice * scale) * PRICE_FACTOR;
}

export type OrderTotals = {
  /** kwota samego produktu (bez wysyłki) */
  productTotal: number;
  /** opłata za wysyłkę (0 = gratis) */
  shippingFee: number;
  /** kwota do zapłaty razem z wysyłką */
  total: number;
};

/** Jedno źródło prawdy o cenie — konfigurator i strona zamówienia liczą tak samo. */
export function computeTotals(
  product: Product,
  format: ProductFormat,
  quantity: number,
): OrderTotals {
  const unitPrice = unitPriceForQuantity(product, format, quantity);
  const productTotal = priceFor(quantity, unitPrice, product.noFees);
  const totals = withShipping(productTotal);
  return {
    productTotal,
    shippingFee: totals.shippingFee,
    total: totals.total,
  };
}

/** Pozycja koszyka gotowa do wyceny. */
export type CartLine = {
  product: Product;
  format: ProductFormat;
  quantity: number;
};

export type CartTotals = OrderTotals & {
  /** kwota każdej pozycji z osobna (bez wysyłki) — w kolejności wejściowej */
  lineTotal: number[];
};

/**
 * Wycena całego koszyka. Wysyłka liczona RAZ od sumy pozycji (próg darmowej
 * wysyłki też patrzy na sumę) — dokładnie tak, jak liczy ją serwer w
 * `splitCartTotals`, więc podsumowanie w UI = kwota pobrana w Stripe.
 */
export function computeCartTotals(lines: CartLine[]): CartTotals {
  const lineTotal: number[] = [];
  let productTotal = 0;

  for (const line of lines) {
    const unitPrice = unitPriceForQuantity(line.product, line.format, line.quantity);
    const price = priceFor(line.quantity, unitPrice, line.product.noFees);
    productTotal += price;
    // Grosze zaokrąglamy per pozycja — dokładnie tak, jak serwer zapisuje
    // kwotę każdego zamówienia (convex/orderPricing splitCartTotals).
    lineTotal.push(round2(price));
  }

  const totals = withShipping(productTotal);
  return {
    productTotal,
    shippingFee: totals.shippingFee,
    // Suma zaokrąglonych pozycji + wysyłka = kwota, którą realnie pobiera
    // Stripe (sesja ma po jednej pozycji na zamówienie).
    total: round2(lineTotal.reduce((sum, g) => sum + g, 0) + totals.shippingFee),
    lineTotal,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export { shippingFeeFor };
