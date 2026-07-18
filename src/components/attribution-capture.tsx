"use client";

import { useEffect } from "react";

import { captureFirstTouch } from "@/lib/attribution";

/**
 * Zapisuje first-touch źródło ruchu (referrer + UTM) przy pierwszym wejściu.
 * Nie renderuje nic. Nie wymaga zgody na cookies — to dane własne, nie-PII,
 * bez third-party — więc łapie WSZYSTKICH, nie tylko tych, co zaakceptowali
 * cookies (jak PostHog/GA). Montowane globalnie w layout.tsx.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureFirstTouch();
  }, []);

  return null;
}
