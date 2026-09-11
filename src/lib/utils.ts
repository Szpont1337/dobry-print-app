import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type { ClassValue };

/**
 * Łączenie klas Tailwinda w konwencji shadcn/ui: clsx (warunki) + tailwind-merge
 * (późniejsza klasa wygrywa z wcześniejszą, np. `px-5` nadpisuje `px-3`).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
