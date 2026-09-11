import {
  type Product,
  type ProductFormat,
  unitPriceForQuantity,
} from "@/lib/products";
import { VAT_RATE, shippingFeeFor, withShipping } from "@/lib/shipping";

export { VAT_RATE };
export const MIN_QTY = 1;
export const MAX_QTY = 100_000;
const SETUP_FEE = 4.5;

/**
 * Wpasowuje nakład w dozwolony zakres i zaokrągla do pełnej sztuki.
 * `minQuantity` to minimum produktu (np. naklejki od 100 szt.) — backend
 * odrzuca zamówienia poniżej niego, więc UI nie może go przepuścić.
 */
export function clampQuantity(n: number, minQuantity?: number): number {
  const min = Math.max(MIN_QTY, minQuantity ?? MIN_QTY);
  return Math.max(min, Math.min(MAX_QTY, Math.round(n)));
}

/** Cena netto produktu (bez wysyłki) dla danego nakładu i ceny jednostkowej. */
export function priceFor(quantity: number, unitPrice: number, noFees = false) {
  if (noFees) return quantity * unitPrice;
  const scale =
    quantity < 25 ? 3 : quantity < 250 ? 2.2 : quantity < 1000 ? 1.4 : 1;
  return SETUP_FEE + quantity * unitPrice * scale;
}

export type OrderTotals = {
  /** netto/VAT/brutto samego produktu (bez wysyłki) */
  productNet: number;
  productVat: number;
  productGross: number;
  /** opłata za wysyłkę brutto (0 = gratis) */
  shippingFee: number;
  /** netto/VAT/brutto łącznie z wysyłką */
  net: number;
  vat: number;
  gross: number;
};

/** Jedno źródło prawdy o cenie — konfigurator i strona zamówienia liczą tak samo. */
export function computeTotals(
  product: Product,
  format: ProductFormat,
  quantity: number,
): OrderTotals {
  const unitPrice = unitPriceForQuantity(product, format, quantity);
  const productNet = priceFor(quantity, unitPrice, product.noFees);
  const productVat = productNet * VAT_RATE;
  const productGross = productNet + productVat;
  const totals = withShipping(productNet, productVat, productGross);
  return {
    productNet,
    productVat,
    productGross,
    shippingFee: totals.shippingFee,
    net: totals.net,
    vat: totals.vat,
    gross: totals.gross,
  };
}

/** Pozycja koszyka gotowa do wyceny. */
export type CartLine = {
  product: Product;
  format: ProductFormat;
  quantity: number;
};

export type CartTotals = OrderTotals & {
  /** brutto każdej pozycji z osobna (bez wysyłki) — w kolejności wejściowej */
  lineGross: number[];
};

/**
 * Wycena całego koszyka. Wysyłka liczona RAZ od sumy brutto (próg darmowej
 * wysyłki też patrzy na sumę) — dokładnie tak, jak liczy ją serwer w
 * `splitCartTotals`, więc podsumowanie w UI = kwota pobrana w Stripe.
 */
export function computeCartTotals(lines: CartLine[]): CartTotals {
  const lineGross: number[] = [];
  let productNet = 0;
  let productVat = 0;
  let productGross = 0;

  for (const line of lines) {
    const unitPrice = unitPriceForQuantity(
      line.product,
      line.format,
      line.quantity,
    );
    const net = priceFor(line.quantity, unitPrice, line.product.noFees);
    const vat = net * VAT_RATE;
    productNet += net;
    productVat += vat;
    productGross += net + vat;
    // Grosze zaokrąglamy per pozycja — dokładnie tak, jak serwer zapisuje
    // `grossTotal` każdego zamówienia (convex/orderPricing splitCartTotals).
    lineGross.push(round2(net + vat));
  }

  const totals = withShipping(productNet, productVat, productGross);
  return {
    productNet,
    productVat,
    productGross,
    shippingFee: totals.shippingFee,
    net: totals.net,
    vat: totals.vat,
    // Suma zaokrąglonych pozycji + wysyłka = kwota, którą realnie pobiera
    // Stripe (sesja ma po jednej pozycji na zamówienie).
    gross: round2(lineGross.reduce((sum, g) => sum + g, 0) + totals.shippingFee),
    lineGross,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export { shippingFeeFor };
