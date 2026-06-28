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

/** Wpasowuje nakład w dozwolony zakres i zaokrągla do pełnej sztuki. */
export function clampQuantity(n: number): number {
  return Math.max(MIN_QTY, Math.min(MAX_QTY, Math.round(n)));
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

export { shippingFeeFor };
