"use client";

import { useAction, useMutation } from "convex/react";
import { Loader2, Mail, ShieldCheck, X } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { useTranslation } from "react-i18next";

import { api } from "@convex/_generated/api";

import { useAuth } from "./auth-provider";

export type AuthMode = "login" | "register";

type Stage = "email" | "code";

export function AuthDialog({
  open,
  mode,
  onClose,
  onSwitchMode,
}: {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onSwitchMode: (mode: AuthMode) => void;
}) {
  const { setToken, locale } = useAuth();
  const { t } = useTranslation("common");

  const requestPin = useAction(api.auth.requestPin);
  const verifyPin = useMutation(api.authDb.verifyPin);

  const [stage, setStage] = useState<Stage>("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResetKey, setLastResetKey] = useState<string>(`${open}|${mode}`);
  const headingId = useId();
  const emailId = useId();
  const nameId = useId();
  const codeId = useId();

  const resetKey = `${open}|${mode}`;
  if (resetKey !== lastResetKey) {
    setLastResetKey(resetKey);
    if (open) {
      setStage("email");
      setEmail("");
      setName("");
      setCode("");
      setError(null);
      setBusy(false);
    }
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, busy]);

  const sendCode = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      await requestPin({ email: email.trim().toLowerCase(), locale });
      setStage("code");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t("auth.errSendCode"),
      );
    } finally {
      setBusy(false);
    }
  }, [email, locale, requestPin, t]);

  const onEmailSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await sendCode();
    },
    [sendCode],
  );

  const onCodeSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setBusy(true);
      setError(null);
      try {
        const result = await verifyPin({
          email: email.trim().toLowerCase(),
          code: code.trim(),
          name: name.trim() || undefined,
        });
        setToken(result.token);
        onClose();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : t("auth.errInvalidCode"),
        );
      } finally {
        setBusy(false);
      }
    },
    [code, email, name, onClose, setToken, verifyPin],
  );

  if (!open) return null;

  const title =
    mode === "register" ? t("auth.titleRegister") : t("auth.titleLogin");
  const switchLabel =
    mode === "register"
      ? t("auth.switchToLogin")
      : t("auth.switchToRegister");
  const switchTarget: AuthMode = mode === "register" ? "login" : "register";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6"
    >
      <button
        type="button"
        aria-label={t("auth.close")}
        onClick={busy ? undefined : onClose}
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
      />
      <div className="relative z-[111] flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-secondary text-primary">
              {stage === "code" ? (
                <ShieldCheck aria-hidden className="size-5" strokeWidth={2} />
              ) : (
                <Mail aria-hidden className="size-5" strokeWidth={2} />
              )}
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                DobrePrinty
              </p>
              <h2 id={headingId} className="text-lg font-semibold text-foreground">
                {title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            aria-label={t("auth.close")}
            onClick={onClose}
            disabled={busy}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X aria-hidden className="size-5" />
          </button>
        </header>

        {stage === "email" ? (
          <form onSubmit={onEmailSubmit} className="space-y-4 px-6 py-6">
            <label htmlFor={emailId} className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-foreground">
                {t("auth.emailLabel")}
              </span>
              <input
                id={emailId}
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ty@firma.pl"
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
              />
            </label>

            {mode === "register" && (
              <label htmlFor={nameId} className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-foreground">
                  {t("auth.nameLabel")}
                </span>
                <input
                  id={nameId}
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                />
                <span className="text-xs text-muted-foreground">
                  {t("auth.nameHint")}
                </span>
              </label>
            )}

            {error && (
              <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
              {busy ? t("auth.sending") : t("auth.sendCode")}
            </button>

            <button
              type="button"
              onClick={() => onSwitchMode(switchTarget)}
              className="block w-full text-center text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              {switchLabel}
            </button>
          </form>
        ) : (
          <form onSubmit={onCodeSubmit} className="space-y-4 px-6 py-6">
            <p className="rounded-lg bg-secondary px-4 py-3 text-sm text-secondary-foreground">
              {t("auth.codeSent")}{" "}
              <strong className="font-semibold">{email}</strong>
            </p>

            <label htmlFor={codeId} className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-foreground">
                {t("auth.codeLabel")}
              </span>
              <input
                id={codeId}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                value={code}
                onChange={(event) =>
                  setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="••••••"
                className="w-full rounded-lg border border-input bg-card px-4 py-3 text-center text-2xl font-semibold tracking-[0.6em] text-foreground tabular-nums placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
              />
              <span className="text-xs text-muted-foreground">
                {t("auth.codeHint")}
              </span>
            </label>

            {error && (
              <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy || code.length !== 6}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
              {busy ? t("auth.verifying") : t("auth.verify")}
            </button>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => {
                  setStage("email");
                  setCode("");
                  setError(null);
                }}
                disabled={busy}
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline disabled:opacity-50"
              >
                {t("auth.back")}
              </button>
              <button
                type="button"
                onClick={sendCode}
                disabled={busy}
                className="text-primary underline-offset-4 transition-colors hover:underline disabled:opacity-50"
              >
                {t("auth.resend")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
