"use client";

import { useQuery } from "convex/react";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { api } from "@convex/_generated/api";

import { LOCALES, type Locale } from "@/lib/i18n";

const TOKEN_KEY = "dobreprinty.session.token";
const LOCALE_KEY = "dobreprinty.locale";

type AuthUser = {
  id: string;
  email: string;
  name: string | null;
};

type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  status: "loading" | "anonymous" | "authenticated";
  setToken: (token: string | null) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

function readLocale(): Locale {
  if (typeof window === "undefined") return "pl";
  const stored = window.localStorage.getItem(LOCALE_KEY);
  return (LOCALES as ReadonlyArray<string>).includes(stored ?? "")
    ? (stored as Locale)
    : "pl";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [locale, setLocaleState] = useState<Locale>("pl");

  useEffect(() => {
    // Hydrate from localStorage on the client only.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTokenState(readToken());
    setLocaleState(readLocale());
    setHydrated(true);
  }, []);

  const user = useQuery(api.authDb.me, token ? { token } : "skip");

  const setToken = useCallback((next: string | null) => {
    setTokenState(next);
    if (typeof window === "undefined") return;
    if (next) window.localStorage.setItem(TOKEN_KEY, next);
    else window.localStorage.removeItem(TOKEN_KEY);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LOCALE_KEY, next);
    document.documentElement.setAttribute("lang", next);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", locale);
    }
  }, [locale]);

  const status: AuthContextValue["status"] = !hydrated
    ? "loading"
    : token
      ? user === undefined
        ? "loading"
        : user
          ? "authenticated"
          : "anonymous"
      : "anonymous";

  return (
    <AuthContext.Provider
      value={{
        token,
        user: user ?? null,
        status,
        setToken,
        locale,
        setLocale,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
