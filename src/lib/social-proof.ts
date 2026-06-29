// MOCK: fałszywe powiadomienia „social proof" o cudzych zamówieniach. Brak
// realnego źródła ostatnich zamówień (Convex) do pokazywania na żywo — gdy
// pojawi się taki endpoint, podmień `pickRandomOrder` na realne dane.

import type { ProductVariant } from "@/components/product-mockup";

type PluralForms = {
  /** 1 → biernik l. poj., np. „ulotkę" */
  one: string;
  /** 2–4 → np. „ulotki" */
  few: string;
  /** 5+ → dopełniacz l. mn., np. „ulotek" */
  many: string;
};

type SocialProofProduct = {
  variant: ProductVariant;
  forms: PluralForms;
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
    forms: { one: "ulotkę", few: "ulotki", many: "ulotek" },
    quantities: [500, 1000, 1500, 2000],
    unitPrice: 0.12,
    weight: 6,
  },
  {
    variant: "cards",
    forms: { one: "wizytówkę", few: "wizytówki", many: "wizytówek" },
    quantities: [300, 500, 700, 1000],
    unitPrice: 0.18,
    weight: 6,
  },
  {
    variant: "poster",
    forms: { one: "plakat", few: "plakaty", many: "plakatów" },
    quantities: [25, 50, 75, 100],
    unitPrice: 1.8,
    weight: 5,
  },
  {
    variant: "sticker",
    forms: { one: "naklejkę", few: "naklejki", many: "naklejek" },
    quantities: [100, 200, 250, 300],
    unitPrice: 0.65,
    weight: 5,
  },
  {
    variant: "rollup",
    forms: { one: "roll-up", few: "roll-upy", many: "roll-upów" },
    quantities: [1],
    unitPrice: 165,
    weight: 2,
  },
  {
    variant: "folded",
    forms: {
      one: "składaną ulotkę",
      few: "składane ulotki",
      many: "składanych ulotek",
    },
    quantities: [250, 500, 750, 1000],
    unitPrice: 0.28,
    weight: 2,
  },
  {
    variant: "postcards",
    forms: { one: "pocztówkę", few: "pocztówki", many: "pocztówek" },
    quantities: [100, 200, 300, 500],
    unitPrice: 0.55,
    weight: 2,
  },
  {
    variant: "bag",
    forms: {
      one: "torbę papierową",
      few: "torby papierowe",
      many: "toreb papierowych",
    },
    quantities: [10, 25, 40, 50],
    unitPrice: 5.5,
    weight: 1,
  },
  {
    variant: "letterhead",
    forms: {
      one: "arkusz papieru firmowego",
      few: "arkusze papieru firmowego",
      many: "arkuszy papieru firmowego",
    },
    quantities: [500, 1000],
    unitPrice: 0.18,
    weight: 1,
  },
  {
    variant: "banner",
    forms: {
      one: "baner reklamowy",
      few: "banery reklamowe",
      many: "banerów reklamowych",
    },
    quantities: [1, 2, 3],
    unitPrice: 79,
    weight: 1,
  },
];

// Forma dopełniacza („z/ze …") gotowa do wstawienia po „Ktoś".
const CITIES = [
  "z Warszawy",
  "z Krakowa",
  "z Wrocławia",
  "z Poznania",
  "z Gdańska",
  "z Łodzi",
  "ze Szczecina",
  "z Lublina",
  "z Katowic",
  "z Białegostoku",
  "z Bydgoszczy",
  "z Rzeszowa",
  "z Gdyni",
  "z Torunia",
  "z Kielc",
  "z Olsztyna",
  "z Częstochowy",
  "z Sopotu",
];

const TIMES_AGO = [
  "przed chwilą",
  "przed chwilą",
  "1 min temu",
  "2 min temu",
  "3 min temu",
  "5 min temu",
  "kilka minut temu",
];

export type SocialProofOrder = {
  /** unikalny klucz do AnimatePresence */
  id: number;
  variant: ProductVariant;
  quantity: number;
  /** odmieniona nazwa produktu, np. „ulotek" */
  noun: string;
  amount: number;
  /** np. „z Warszawy" */
  city: string;
  /** np. „przed chwilą" */
  timeAgo: string;
};

/** Polska odmiana liczebnika: 1 / 2–4 / 5+. */
function pluralForm(n: number, forms: PluralForms): string {
  if (n === 1) return forms.one;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
    return forms.few;
  }
  return forms.many;
}

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
    noun: pluralForm(quantity, product.forms),
    amount,
    city: pickRandom(CITIES),
    timeAgo: pickRandom(TIMES_AGO),
  };
}
