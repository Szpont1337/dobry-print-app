"use client";

import { Fragment } from "react";
import { Trans, useTranslation } from "react-i18next";

import { Header } from "@/components/header";
import { Breadcrumbs } from "@/components/ui";

type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

type LegalSection = { heading: string; blocks: LegalBlock[] };

export function LegalPage({
  doc,
  values,
}: {
  doc: "terms" | "privacy";
  values: Record<string, string>;
}) {
  const { t } = useTranslation("legal");
  const title = t(`${doc}.title`);
  const sections =
    (t(`${doc}.sections`, { returnObjects: true }) as LegalSection[]) ?? [];
  const richText = (key: string) => (
    <Trans
      t={t}
      i18nKey={key}
      values={values}
      components={{ strong: <strong /> }}
    />
  );

  return (
    <main className="relative flex flex-1 flex-col bg-background">
      <Header />

      <section className="relative isolate overflow-hidden bg-gradient-to-b from-accent/40 via-background to-background pt-8 pb-13 sm:pt-13 sm:pb-21">
        <div className="mx-auto max-w-[760px] px-5 sm:px-8">
          <Breadcrumbs
            items={[{ label: t("chrome.home"), href: "/" }, { label: title }]}
          />
          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {t(`${doc}.intro`)}
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-wide text-muted-foreground">
            {t("chrome.updatedAt", { date: t(`${doc}.updatedAt`) })}
          </p>
        </div>
      </section>

      <section className="bg-background pb-21">
        <article className="mx-auto max-w-[760px] space-y-6 px-5 text-base leading-relaxed text-foreground sm:px-8 sm:text-lg [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_p]:text-muted-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-muted-foreground [&_strong]:text-foreground">
          {sections.map((section, si) => (
            <Fragment key={si}>
              <h2>{section.heading}</h2>
              {section.blocks.map((block, bi) =>
                block.type === "ul" ? (
                  <ul key={bi}>
                    {block.items.map((_, ii) => (
                      <li key={ii}>
                        {richText(`${doc}.sections.${si}.blocks.${bi}.items.${ii}`)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p key={bi}>
                    {richText(`${doc}.sections.${si}.blocks.${bi}.text`)}
                  </p>
                ),
              )}
            </Fragment>
          ))}
        </article>
      </section>
    </main>
  );
}
