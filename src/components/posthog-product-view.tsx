"use client";

import { useEffect } from "react";

import { safeCapture } from "@/lib/posthog-client";

export function PostHogProductView({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  useEffect(() => {
    safeCapture("product_viewed", {
      product_slug: slug,
      product_name: name,
    });
  }, [slug, name]);

  return null;
}
