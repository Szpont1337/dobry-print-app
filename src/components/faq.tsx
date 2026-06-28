"use client";

import { useTranslation } from "react-i18next";

import { FadeIn } from "./fade-in";

type FaqItem = {
  question: string;
  answer: string;
};

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-4 transition-transform duration-200 group-open:rotate-45"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function Faq() {
  const { t } = useTranslation("home");
  const items = (t("faq.items", { returnObjects: true }) as FaqItem[]) ?? [];

  return (
    <section className="bg-background py-13 sm:py-21">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Left: sticky title + contact */}
        <FadeIn className="lg:sticky lg:top-24 lg:self-start">
          <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <span className="text-primary">03</span>
            <span aria-hidden>/</span>
            {t("faq.eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {t("faq.headlinePart1")}{" "}
            <span className="whitespace-nowrap">
              <span className="text-primary">{t("faq.headlinePart2")}</span>.
            </span>
          </h2>
          <p className="mt-4 max-w-sm text-base text-muted-foreground">{t("faq.sub")}</p>

          <div className="mt-8 max-w-sm border border-border bg-secondary/50 p-5">
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              {t("faq.helpHeadline")}
            </h3>
            <p className="mt-1 text-sm text-secondary-foreground/80">{t("faq.helpSub")}</p>
            <a
              href="mailto:hej@dobreprinty.pl"
              className="mt-4 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("faq.helpCta")}
              <span aria-hidden>→</span>
            </a>
          </div>
        </FadeIn>

        {/* Right: ruled accordion list */}
        <FadeIn className="border-t border-border">
          {items.map((item, i) => (
            <details key={item.question} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-start gap-4 py-5 text-left transition-colors focus-visible:outline-none">
                <span className="mt-1 font-mono text-xs font-semibold tabular-nums text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-lg">
                  {item.question}
                </span>
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border border-border text-primary transition-colors group-open:border-primary group-open:bg-primary group-open:text-primary-foreground">
                  <PlusIcon />
                </span>
              </summary>
              <div className="pb-6 pl-8 pr-10 text-base leading-relaxed text-muted-foreground">
                {item.answer}
              </div>
            </details>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
