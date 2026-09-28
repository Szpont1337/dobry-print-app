"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { currentBrand } from "@/lib/brands";
import { BRAND_ORIGIN } from "@/lib/mcp/orderLink";

import { CopyButton } from "./copy-button";
import { FadeIn } from "./fade-in";

const noop = () => () => {};

/** Pasek na stronie głównej: DobrePrinty dostępne w ChatGPT / Claude przez MCP. */
export function McpTeaser() {
  const { t } = useTranslation("home");
  // Marka po hoście — na serwerze domyślna, po hydracji prawdziwa (bez mismatchu).
  const brand = useSyncExternalStore(noop, currentBrand, () => "dobreprinty" as const);
  const mcpUrl = `${BRAND_ORIGIN[brand]}/api/mcp`;

  return (
    <section className="bg-background pt-16 sm:pt-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <FadeIn>
          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card px-6 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                {t("mcp.eyebrow")}
              </p>
              <h2 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {t("mcp.title")}
              </h2>
              <p className="mt-3 text-base text-muted-foreground sm:text-lg">
                {t("mcp.description")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              <Button asChild>
                <Link href="/mcp">{t("mcp.how")}</Link>
              </Button>
              <CopyButton text={mcpUrl} label={t("mcp.copy")} copiedLabel={t("mcp.copied")} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
