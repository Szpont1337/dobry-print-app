"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { type ReactNode, useMemo } from "react";

// Placeholder URL pozwala providerowi się zamontować nawet bez deploymentu —
// dzięki temu hooki Convexa (useMutation/useQuery) nie wybuchają podczas SSG.
// Pierwsza próba realnego callu trafi w błąd sieci dopóki nie ustawisz
// NEXT_PUBLIC_CONVEX_URL po `bunx convex dev`.
const PLACEHOLDER_URL = "https://example.convex.cloud";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL || PLACEHOLDER_URL;
  const client = useMemo(() => new ConvexReactClient(url), [url]);
  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
