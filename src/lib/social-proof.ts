// MOCK: fałszywe powiadomienia „social proof" o cudzych zamówieniach. Brak
// realnego źródła ostatnich zamówień (Convex) do pokazywania na żywo — gdy
// pojawi się taki endpoint, podmień `pickRandomOrder` na realne dane.

import type { ProductVariant } from "@/components/product-mockup";

type SocialProofProduct = {
  /** klucz i18n nazwy produktu: `home:socialProof.noun.<variant>` (formy liczby mnogiej) */
  variant: ProductVariant;
  /** realistyczne nakłady; nakład × unitPrice mieści się w 40–300 zł */
  quantities: number[];
  /** zł / szt — tylko do wyliczenia kwoty zamówienia */
  unitPrice: number;
  /** względna częstość losowania (popularne = wyższa) */
  weight: number;
};

const MIN_AMOUNT = 40;
const MAX_AMOUNT = 300;

// Popularne produkty mają wysoką wagę, reszta pojawia się rzadziej.
const PRODUCTS: SocialProofProduct[] = [
  {
    variant: "stack",
    quantities: [500, 1000, 1500, 2000],
    unitPrice: 0.12,
    weight: 6,
  },
  {
    variant: "cards",
    quantities: [300, 500, 700, 1000],
    unitPrice: 0.18,
    weight: 6,
  },
  {
    variant: "poster",
    quantities: [25, 50, 75, 100],
    unitPrice: 1.8,
    weight: 5,
  },
  {
    variant: "sticker",
    quantities: [100, 200, 250, 300],
    unitPrice: 0.65,
    weight: 5,
  },
  {
    variant: "rollup",
    quantities: [1],
    unitPrice: 165,
    weight: 2,
  },
  {
    variant: "folded",
    quantities: [250, 500, 750, 1000],
    unitPrice: 0.28,
    weight: 2,
  },
  {
    variant: "postcards",
    quantities: [100, 200, 300, 500],
    unitPrice: 0.55,
    weight: 2,
  },
  {
    variant: "bag",
    quantities: [10, 25, 40, 50],
    unitPrice: 5.5,
    weight: 1,
  },
  {
    variant: "letterhead",
    quantities: [500, 1000],
    unitPrice: 0.18,
    weight: 1,
  },
  {
    variant: "banner",
    quantities: [1, 2, 3],
    unitPrice: 79,
    weight: 1,
  },
];

// Klucze i18n miast (`home:socialProof.cities.<key>`) — odmiana („z Warszawy") w JSON.
const CITIES = [
  "warsaw",
  "krakow",
  "wroclaw",
  "poznan",
  "gdansk",
  "lodz",
  "szczecin",
  "lublin",
  "katowice",
  "bialystok",
  "bydgoszcz",
  "rzeszow",
  "gdynia",
  "torun",
  "kielce",
  "olsztyn",
  "czestochowa",
  "sopot",
];

export type SocialProofTimeAgo =
  | { key: "justNow" | "fewMinutesAgo" }
  | { key: "minutesAgo"; count: number };

// Klucze i18n (`home:socialProof.timeAgo.<key>`).
const TIMES_AGO: SocialProofTimeAgo[] = [
  { key: "justNow" },
  { key: "justNow" },
  { key: "minutesAgo", count: 1 },
  { key: "minutesAgo", count: 2 },
  { key: "minutesAgo", count: 3 },
  { key: "minutesAgo", count: 5 },
  { key: "fewMinutesAgo" },
];

export type SocialProofOrder = {
  /** unikalny klucz do AnimatePresence */
  id: number;
  variant: ProductVariant;
  quantity: number;
  amount: number;
  /** klucz i18n miasta, np. „warsaw" */
  city: string;
  /** klucz i18n czasu, np. „przed chwilą" */
  timeAgo: SocialProofTimeAgo;
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function weightedPickProduct(): SocialProofProduct {
  const total = PRODUCTS.reduce((sum, p) => sum + p.weight, 0);
  let r = Math.random() * total;
  for (const product of PRODUCTS) {
    r -= product.weight;
    if (r <= 0) return product;
  }
  return PRODUCTS[PRODUCTS.length - 1];
}

let seq = 0;

/** Losowe, ale wiarygodne zamówienie (kwota zawsze 40–300 zł). */
export function pickRandomOrder(): SocialProofOrder {
  const product = weightedPickProduct();
  const candidates = product.quantities.filter((q) => {
    const amount = q * product.unitPrice;
    return amount >= MIN_AMOUNT && amount <= MAX_AMOUNT;
  });
  const quantity = pickRandom(candidates.length ? candidates : product.quantities);
  const amount = Math.round(quantity * product.unitPrice * 100) / 100;

  return {
    id: ++seq,
    variant: product.variant,
    quantity,
    amount,
    city: pickRandom(CITIES),
    timeAgo: pickRandom(TIMES_AGO),
  };
}
