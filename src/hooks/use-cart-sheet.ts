"use client";

import { useSyncExternalStore } from "react";

// Otwarcie panelu koszyka: stan globalny, bo odpalają go różne miejsca
// (ikona w navbarze, „Dodaj do koszyka" w konfiguratorze), a renderuje jedno.

let open = false;
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function openCartSheet(): void {
  if (open) return;
  open = true;
  emit();
}

export function closeCartSheet(): void {
  if (!open) return;
  open = false;
  emit();
}

export function useCartSheetOpen(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => open,
    () => false,
  );
}
