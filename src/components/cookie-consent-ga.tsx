"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";

export function CookieConsentGA() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const read = () => {
      setAccepted(localStorage.getItem("cookie-consent") === "accepted");
    };
    read();
    const onChange = () => read();
    window.addEventListener("cookie-consent-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("cookie-consent-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  if (!accepted) return null;
  return <GoogleAnalytics gaId="G-QSZGBT528P" />;
}
