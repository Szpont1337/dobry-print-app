import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Nunito, IBM_Plex_Mono } from "next/font/google";

import { AttributionCapture } from "@/components/attribution-capture";
import { AuthProvider } from "@/components/auth-provider";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { CookieConsentGA } from "@/components/cookie-consent-ga";
import { PostHogConsent } from "@/components/posthog-consent";
import { Footer } from "@/components/footer";
import { I18nProvider } from "@/components/i18n-provider";
import SchemaMarkup from "@/components/SchemaMarkup";

import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Kanoniczna domena produkcyjna — hardkod jak w pozostałych stronach SEO.
// Celowo NIE bierzemy NEXT_PUBLIC_SITE_URL: błędna wartość env (np. apex bez
// www) rozjeżdżała metadataBase/og:url z resztą serwisu.
const SITE_URL = "https://www.dobreprinty.pl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DobrePrinty. drukarnia online",
    template: "%s · DobrePrinty",
  },
  description:
    "DobrePrinty to drukarnia online. Wybierz produkt, dopasuj projekt i wydrukuj go w kilku kliknięciach.",
  applicationName: "DobrePrinty",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "DobrePrinty",
    url: SITE_URL,
    title: "DobrePrinty. drukarnia online",
    description:
      "Druk ulotek, wizytówek, plakatów, roll-upów i broszur. Dostawa w 24–48 h, cena z VAT od razu.",
    images: [
      {
        url: "/og/dobreprinty.jpg",
        width: 1200,
        height: 630,
        alt: "DobrePrinty. Welcome to print.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DobrePrinty. drukarnia online",
    description:
      "Druk ulotek, wizytówek, plakatów, roll-upów i broszur. Dostawa w 24–48 h.",
    images: ["/og/dobreprinty.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "ewQhQwg8GX-eZMrEXPmCnQMHiEYLCj0iQKdPBMvIUgo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${nunito.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ConvexClientProvider>
          <AuthProvider>
            <I18nProvider>
              {children}
              <Footer />
            </I18nProvider>
          </AuthProvider>
        </ConvexClientProvider>
        <SchemaMarkup />
        <CookieConsentBanner />
        <CookieConsentGA />
        <PostHogConsent />
        <AttributionCapture />
        <Analytics />
      </body>
    </html>
  );
}
