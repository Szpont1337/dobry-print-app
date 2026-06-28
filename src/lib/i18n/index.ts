"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export type Locale = "pl" | "en";

export const LOCALES: ReadonlyArray<Locale> = ["pl", "en"];

export const LOCALE_LABELS: Record<Locale, string> = {
  pl: "Polski",
  en: "English",
};

import plCommon from "./locales/pl/common.json";
import enCommon from "./locales/en/common.json";
import plHome from "./locales/pl/home.json";
import enHome from "./locales/en/home.json";
import plOrder from "./locales/pl/order.json";
import enOrder from "./locales/en/order.json";
import plAccount from "./locales/pl/account.json";
import enAccount from "./locales/en/account.json";
import plAdmin from "./locales/pl/admin.json";
import enAdmin from "./locales/en/admin.json";

export const NAMESPACES = [
  "common",
  "home",
  "order",
  "account",
  "admin",
] as const;

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    lng: "pl",
    fallbackLng: "pl",
    ns: NAMESPACES as unknown as string[],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    returnNull: false,
    resources: {
      pl: {
        common: plCommon,
        home: plHome,
        order: plOrder,
        account: plAccount,
        admin: plAdmin,
      },
      en: {
        common: enCommon,
        home: enHome,
        order: enOrder,
        account: enAccount,
        admin: enAdmin,
      },
    },
  });
}

export default i18n;
