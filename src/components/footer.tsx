"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { COMPANY } from "@/lib/company";

import { BreydaqsLogo } from "./breydaqs-logo";
import { Logo } from "./logo";

export function Footer() {
  const { t } = useTranslation("home");
  const year = new Date().getFullYear();

  const links = [
    { href: "/#produkty", label: t("footer.products") },
    { href: "/drukarnie-lokalne", label: t("footer.localPrintshops") },
    { href: "/blog", label: t("footer.blog") },
    { href: "/mcp", label: t("footer.mcp") },
    { href: "/polityka-prywatnosci", label: t("footer.privacy") },
    { href: "/regulamin", label: t("footer.terms") },
  ];

  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-13 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Logo onDark />
          <nav aria-label={t("footer.navLabel")} className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-footer-foreground/80 transition-colors hover:text-footer-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-footer-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {t("footer.copyright", { year })} · {COMPANY.name}
          </p>
          {/* Link do agencji, która robi stronę - celowo bez nofollow i bez
              noreferrer (backlink + widoczne odesłania w ich analityce). */}
          <p className="flex items-center gap-2">
            {t("footer.madeBy")}
            <a
              href="https://www.breydaqs.com/"
              target="_blank"
              rel="noopener"
              title="BREYDAQS - design i development dla firm"
              className="inline-flex items-center text-footer-foreground transition-opacity hover:opacity-80"
            >
              <BreydaqsLogo className="h-[0.8em] w-auto" />
              <span className="sr-only">BREYDAQS.COM</span>
            </a>
          </p>
          <a
            href={`mailto:${COMPANY.email}`}
            className="text-footer-foreground/80 transition-colors hover:text-footer-foreground"
          >
            {COMPANY.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
