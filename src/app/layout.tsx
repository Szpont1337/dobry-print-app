import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";

import { AuthProvider } from "@/components/auth-provider";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { CookieConsentGA } from "@/components/cookie-consent-ga";
import { PostHogConsent } from "@/components/posthog-consent";
import { Footer } from "@/components/footer";
import { I18nProvider } from "@/components/i18n-provider";
import SchemaMarkup from "@/components/SchemaMarkup";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dobreprinty.pl";

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
        height: 588,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${bricolage.variable} ${ibmPlexMono.variable} h-full antialiased`}
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
      </body>
    </html>
  );
}
