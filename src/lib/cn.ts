export type ClassValue = string | number | false | null | undefined;

/**
 * Minimal class-name joiner (clsx-like, no tailwind-merge dependency).
 * Filters falsy values and joins with spaces. Conditionals: `cond && "class"`.
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
