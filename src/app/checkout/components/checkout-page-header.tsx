"use client";

import { useTranslation } from "react-i18next";

import { Breadcrumbs } from "@/components/ui";

export function CheckoutPageHeader() {
  const { t } = useTranslation("order");

  return (
    <div className="mx-auto w-full max-w-[1200px] border-b border-border px-5 pb-5 pt-8 sm:px-8">
      <Breadcrumbs
        items={[{ label: t("page.breadcrumbProducts"), href: "/#produkty" }, { label: t("page.title") }]}
      />
      <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
        {t("page.title")}
      </h1>
    </div>
  );
}
