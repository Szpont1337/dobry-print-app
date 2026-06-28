"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

import { FadeIn } from "./fade-in";

const TRUSTPILOT_URL = "https://pl.trustpilot.com/review/dobreprinty.pl";
const TRUSTPILOT_GREEN = "#00B67A";

type Testimonial = {
  title: string;
  quote: string;
  name: string;
  date: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

// Trustpilot-style rating: 5 white stars on green tiles. All reviews on our
// profile are 5/5, so this is rendered as a static 5-star block.
function TrustpilotStars({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="flex size-6 items-center justify-center rounded-[2px] sm:size-7"
          style={{ backgroundColor: TRUSTPILOT_GREEN }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="#fff"
            aria-hidden
            className="size-4 sm:size-5"
          >
            <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

function VerifiedBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium"
      style={{ color: TRUSTPILOT_GREEN }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className="size-3.5"
      >
        <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm-1.2 13.4-3.2-3.2 1.4-1.4 1.8 1.8 4-4 1.4 1.4-5.4 5.4Z" />
      </svg>
      {label}
    </span>
  );
}

export function Testimonials() {
  const { t } = useTranslation("home");
  const testimonials =
    (t("testimonials.items", { returnObjects: true }) as Testimonial[]) ?? [];

  // Marquee needs enough cards to fill the loop; duplicate the (short) list.
  const loop = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="bg-background-alt py-13 sm:py-21">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <FadeIn className="mx-auto max-w-5xl text-center">
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              {t("testimonials.eyebrow")}
            </p>
          </div>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="sm:whitespace-nowrap">
              {t("testimonials.headlinePart1")}
            </span>
            <br />
            <span className="text-primary">
              {t("testimonials.headlinePart2")}
            </span>
            .
          </h2>

          <div className="mt-6 flex flex-col items-center gap-3">
            <a
              href={TRUSTPILOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 shadow-sm transition-colors hover:bg-muted"
            >
              <TrustpilotStars label={t("testimonials.starsLabel")} />
              <Image
                src="/images/trustpilot/logo-black.svg"
                alt={t("testimonials.logoAlt")}
                width={108}
                height={26}
                unoptimized
                className="h-[22px] w-auto dark:invert"
              />
            </a>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              {t("testimonials.sub")}
            </p>
          </div>
        </FadeIn>

        <div
          className="group relative mt-14 overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          <ul
            className="flex w-max gap-6 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
            aria-label={t("testimonials.marqueeLabel")}
          >
            {loop.map((review, i) => (
              <li
                key={`${review.name}-${i}`}
                aria-hidden={i >= testimonials.length || undefined}
                className="relative flex h-[340px] w-[340px] shrink-0 flex-col rounded-2xl border border-border bg-card p-6 shadow-sm sm:h-[360px] sm:w-[420px] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <TrustpilotStars label={t("testimonials.starsLabel")} />
                  <Image
                    src="/images/trustpilot/logo-black.svg"
                    alt={t("testimonials.logoAlt")}
                    width={92}
                    height={22}
                    unoptimized
                    className="h-[18px] w-auto opacity-80 dark:invert"
                  />
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold text-foreground sm:text-xl">
                  {review.title}
                </h3>

                {review.quote ? (
                  <blockquote className="mt-2 line-clamp-4 flex-1 overflow-hidden font-serif text-base leading-relaxed text-foreground sm:text-lg">
                    „{review.quote}”
                  </blockquote>
                ) : (
                  <div className="flex-1" />
                )}

                <footer className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span
                    className="flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: TRUSTPILOT_GREEN }}
                    aria-hidden
                  >
                    {initials(review.name)}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-base font-semibold text-foreground">
                      {review.name}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      <VerifiedBadge label={t("testimonials.verifiedLabel")} />
                      <span aria-hidden>·</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </footer>
              </li>
            ))}
          </ul>
        </div>

        <FadeIn className="mt-12 flex justify-center">
          <a
            href={TRUSTPILOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: TRUSTPILOT_GREEN }}
          >
            {t("testimonials.ctaLabel")}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-4">
              <path
                d="M7 17 17 7M9 7h8v8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
