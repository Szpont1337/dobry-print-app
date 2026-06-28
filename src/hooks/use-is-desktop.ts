"use client";

import { useSyncExternalStore } from "react";

const MOBILE_UA_REGEX =
  /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;

// The user agent never changes during a session, so there is nothing to
// subscribe to — the store snapshot is read once on the client.
const subscribe = () => () => {};

function getClientSnapshot(): boolean {
  const ua =
    navigator.userAgent ||
    navigator.vendor ||
    (window as unknown as { opera?: string }).opera ||
    "";
  return !MOBILE_UA_REGEX.test(ua);
}

// `null` on the server (and during hydration) keeps SSR output stable and
// avoids a hydration mismatch; the real value resolves on the client.
const getServerSnapshot = (): boolean | null => null;

export function useIsDesktop(): boolean | null {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
