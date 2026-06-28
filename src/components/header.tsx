"use client";

import { useMutation, useQuery } from "convex/react";
import {
  ArrowRightIcon,
  CaretDownIcon,
  SignOutIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  SquaresFourIcon,
  UserIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { api } from "@convex/_generated/api";

import { orderHref, useOrderDraft } from "@/hooks/use-order-draft";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n";

import { AuthDialog, type AuthMode } from "./auth-dialog";
import { useAuth } from "./auth-provider";
import { Logo } from "./logo";
import { Button } from "@/components/ui";

function ChevronDown() {
  return <CaretDownIcon weight="duotone" aria-hidden className="size-3.5" />;
}

function FlagPL() {
  return (
    <span
      aria-hidden
      className="relative inline-flex size-5 overflow-hidden rounded-full ring-1 ring-black/10"
    >
      <span className="absolute inset-x-0 top-0 h-1/2 bg-white" />
      <span className="absolute inset-x-0 bottom-0 h-1/2 bg-[#dc143c]" />
    </span>
  );
}

function FlagEN() {
  return (
    <span
      aria-hidden
      className="relative inline-flex size-5 overflow-hidden rounded-full ring-1 ring-black/10"
    >
      <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" className="size-full">
        <clipPath id="flag-en-cross">
          <path d="M30,15 h30 v15 z M30,15 v15 h-30 z M30,15 h-30 v-15 z M30,15 v-15 h30 z" />
        </clipPath>
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath="url(#flag-en-cross)"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </svg>
    </span>
  );
}

function localeFlag(locale: Locale) {
  return locale === "pl" ? <FlagPL /> : <FlagEN />;
}

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/#produkty", label: "Produkty" },
  { href: "/drukarnie-lokalne", label: "Drukarnie" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const { user, status, token, setToken, locale, setLocale } = useAuth();
  const { t } = useTranslation("common");
  const orderDraft = useOrderDraft();
  const logout = useMutation(api.authDb.logout);
  const adminInfo = useQuery(api.admin.isAdmin, token ? { token } : "skip");
  const isAdmin = !!adminInfo;

  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (langOpen && langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
      if (userMenuOpen && userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (langOpen || userMenuOpen) {
      document.addEventListener("mousedown", onClickOutside);
      return () => document.removeEventListener("mousedown", onClickOutside);
    }
  }, [langOpen, userMenuOpen]);

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await logout({ token });
      } catch {
        // noop — i tak zerujemy token lokalnie
      }
    }
    setToken(null);
    setUserMenuOpen(false);
  };

  const iconBtn =
    "inline-flex items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:border-primary/40 hover:bg-muted";

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="relative mx-auto flex h-16 max-w-[1200px] items-center gap-3 rounded-2xl border border-secondary bg-background/90 px-5 shadow-[0_18px_50px_-24px_rgba(14,122,90,0.45)] ring-1 ring-secondary/60 backdrop-blur-lg backdrop-saturate-150 sm:h-18 sm:px-7">
          <Logo className="shrink-0" />

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-foreground/75 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            {orderDraft && (
              <Link
                href={orderHref(orderDraft)}
                aria-label={t("nav.cart")}
                title={t("nav.cart")}
                className={`relative size-10 sm:size-11 ${iconBtn}`}
              >
                <ShoppingCartIcon weight="duotone" aria-hidden className="size-5" />
                <span
                  aria-hidden
                  className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-card"
                />
              </Link>
            )}

            <div ref={langRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setUserMenuOpen(false);
                  setLangOpen((v) => !v);
                }}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label={t("lang.picker")}
                className={`h-10 gap-1.5 px-2.5 text-sm font-semibold sm:h-11 sm:gap-2 sm:px-3 ${iconBtn}`}
              >
                {localeFlag(locale)}
                <span className="hidden uppercase sm:inline">{locale}</span>
                <span className="hidden sm:inline">
                  <ChevronDown />
                </span>
              </button>
              {langOpen && (
                <ul
                  role="listbox"
                  aria-label={t("lang.picker")}
                  className="absolute right-0 top-[calc(100%+8px)] z-10 w-44 overflow-hidden rounded-xl border border-border bg-card shadow-xl"
                >
                  {LOCALES.map((value) => {
                    const isSelected = locale === value;
                    return (
                      <li key={value} role="option" aria-selected={isSelected}>
                        <button
                          type="button"
                          onClick={() => {
                            setLocale(value);
                            setLangOpen(false);
                          }}
                          className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                            isSelected
                              ? "bg-secondary text-secondary-foreground"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          {localeFlag(value)}
                          <span className="flex-1 font-medium">{LOCALE_LABELS[value]}</span>
                          <span className="text-xs uppercase text-muted-foreground">{value}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {status === "authenticated" && user ? (
              <div ref={userRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setLangOpen(false);
                    setUserMenuOpen((v) => !v);
                  }}
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                  aria-label={user.name || user.email}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:h-11 sm:px-4"
                >
                  <UserIcon weight="duotone" aria-hidden className="size-4" />
                  <span className="hidden max-w-[8rem] truncate sm:inline">
                    {user.name?.split(" ")[0] || user.email.split("@")[0]}
                  </span>
                  <span className="hidden sm:inline">
                    <ChevronDown />
                  </span>
                </button>
                {userMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-[calc(100%+8px)] z-10 w-64 overflow-hidden rounded-xl border border-border bg-card text-sm shadow-xl"
                  >
                    <div className="border-b border-border px-4 py-3">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        {t("nav.account")}
                      </p>
                      <p className="mt-1 truncate font-semibold text-foreground">
                        {user.name || user.email}
                      </p>
                      {user.name && (
                        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                      )}
                    </div>
                    <Link
                      href="/konto"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex w-full items-center gap-2 border-b border-border px-4 py-3 text-left font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      <SquaresFourIcon weight="duotone" aria-hidden className="size-4" />
                      {locale === "en" ? "My account" : "Moje konto"}
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex w-full items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3 text-left font-medium text-foreground transition-colors hover:bg-secondary"
                      >
                        <ShieldCheckIcon weight="duotone" aria-hidden className="size-4 text-primary" />
                        {locale === "en" ? "Admin panel" : "Panel admina"}
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-3 text-left font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      <SignOutIcon weight="duotone" aria-hidden className="size-4" />
                      {t("nav.logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <span className="hidden md:inline-flex">
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => openAuth("register")}
                    className="h-10 font-bold sm:h-11"
                  >
                    {t("nav.register")}
                  </Button>
                </span>
                <Button
                  variant="subtle"
                  size="md"
                  onClick={() => openAuth("login")}
                  aria-label={t("nav.login")}
                  className="h-10 gap-2 rounded-xl px-3.5 font-bold sm:h-11 sm:px-5"
                >
                  <span className="hidden sm:inline">{t("nav.login")}</span>
                  <ArrowRightIcon weight="duotone" aria-hidden className="size-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <AuthDialog
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitchMode={setAuthMode}
      />
    </>
  );
}
