"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Logo } from "./logo";

export function Footer() {
  const { t } = useTranslation("home");
  const year = new Date().getFullYear();

  const links = [
    { href: "/#produkty", label: t("footer.products") },
    { href: "/drukarnie-lokalne", label: t("footer.localPrintshops") },
    { href: "/blog", label: t("footer.blog") },
    { href: "/polityka-prywatnosci", label: t("footer.privacy") },
    { href: "/regulamin", label: t("footer.terms") },
  ];

  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-13 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Logo onDark />
          <nav
            aria-label={t("footer.navLabel")}
            className="flex flex-wrap gap-x-8 gap-y-3 text-sm"
          >
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
          <p>{t("footer.copyright", { year })}</p>
          <a
            href="mailto:hej@dobreprinty.pl"
            className="text-footer-foreground/80 transition-colors hover:text-footer-foreground"
          >
            hej@dobreprinty.pl
          </a>
        </div>
      </div>
    </footer>
  );
}
