import {
  addonSurchargeFor,
  backPrintSurcharge,
  type PriceFloorTier,
  type PrintSide,
  type Product,
  type ProductFormat,
  SMALL_RUN_LIMIT,
  unitPriceForQuantity,
} from "@/lib/products";
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

const SCALE_TIERS: { minQty: number; scale: number }[] = [
  { minQty: 1, scale: 3 },
  { minQty: 25, scale: 2.2 },
  { minQty: 250, scale: 1.4 },
  { minQty: 1000, scale: 1 },
];

function basePriceFor(quantity: number, unitPrice: number, noFees: boolean): number {
  if (noFees) return quantity * unitPrice;
  let scale = SCALE_TIERS[0].scale;
  for (const t of SCALE_TIERS) {
    if (quantity >= t.minQty) scale = t.scale;
  }
  return SETUP_FEE + quantity * unitPrice * scale;
}

/** Nakłady, przy których cena za sztukę spada skokowo (progi skali lub `priceTiers`). */
function priceBreakpoints(product: Product): number[] {
  if (product.priceTiers && product.priceTiers.length > 0) {
    return product.priceTiers.map((t) => t.minQty);
  }
  if (product.noFees) return [];
  return SCALE_TIERS.map((t) => t.minQty);
}

/**
 * Kwota bazowa za sam druk (bez dopłat i narzutu), monotoniczna względem
 * nakładu: tuż pod progiem większy nakład wychodziłby taniej, więc bierzemy
 * minimum z ceny przy każdym wyższym progu. Z dopłatą za mały nakład.
 */
function printBaseFor(product: Product, format: ProductFormat, quantity: number): number {
  const noFees = product.noFees ?? false;
  const smallRun = 1 + (product.smallRunSurcharge ?? 0);
  const at = (q: number) =>
    basePriceFor(q, unitPriceForQuantity(product, format, q), noFees) *
    (q < SMALL_RUN_LIMIT ? smallRun : 1);
  let base = at(quantity);
  for (const minQty of priceBreakpoints(product)) {
    if (minQty > quantity) base = Math.min(base, at(minQty));
  }
  return base;
}

/**
 * Cena produktu (bez wysyłki). Ta sama formuła co `productPriceFor` w drukalo,
 * którą Convex liczy kwotę do zapłaty: druk + nadruk na plecach (z minimalną
 * ceną formatu) → dodatki (stała kwota/szt, poza skalą nakładu) → narzut.
 */
export function productPriceFor(
  product: Product,
  format: ProductFormat,
  quantity: number,
  opts: { sides?: PrintSide; addonIds?: readonly string[] } = {},
): number {
  // Nadruk na plecach to część druku - minimalna cena obejmuje go razem z nim.
  const print =
    printBaseFor(product, format, quantity) + backPrintSurcharge(product, opts.sides, quantity);
  const addons = Math.max(0, quantity) * addonSurchargeFor(product, opts.addonIds);
  const printFinal = Math.max(
    print * PRICE_FACTOR,
    priceFloorFor(format, quantity, opts.sides),
  );
  return printFinal + addons * PRICE_FACTOR;
}

/**
 * Minimalna cena druku (z narzutem) dla nakładu - 0, gdy format nie ma progów.
 * Nakład q pokrywa najtańszy próg z `upTo >= q`; po przekroczeniu progu jego
 * cena przy `upTo` zostaje granicą, więc cena nie spada przy większym nakładzie.
 * Progi `sides: "single"` tylko przy jawnie jednostronnym druku - papierowe
 * produkty nie wysyłają stronności, a Convex przyjmuje wtedy dwustronny.
 */
function priceFloorFor(format: ProductFormat, quantity: number, sides?: PrintSide): number {
  const tiers = (format.priceFloor ?? []).filter((t) => !t.sides || t.sides === sides);
  const at = (t: PriceFloorTier, q: number) => t.fixed + (t.perUnit ?? 0) * q;
  let cover = Infinity;
  let passed = 0;
  for (const t of tiers) {
    if (t.upTo == null || quantity <= t.upTo) {
      cover = Math.min(cover, at(t, quantity));
    } else {
      passed = Math.max(passed, at(t, t.upTo));
    }
  }
  return Math.max(passed, cover === Infinity ? 0 : cover);
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
  sides?: PrintSide,
  addonIds?: readonly string[],
): OrderTotals {
  const productTotal = productPriceFor(product, format, quantity, { sides, addonIds });
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
  sides?: PrintSide;
  addonIds?: string[];
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
    const price = productPriceFor(line.product, line.format, line.quantity, {
      sides: line.sides,
      addonIds: line.addonIds,
    });
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
