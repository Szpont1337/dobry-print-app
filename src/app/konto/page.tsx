import type { Metadata } from "next";

import { AccountDashboard } from "@/components/account-dashboard";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Twoje konto. DobrePrinty",
  description:
    "Panel klienta DobrePrinty: zamówienia, dane firmowe, adres dostawy i ustawienia konta.",
  robots: { index: false, follow: false },
};

export default function KontoPage() {
  return (
    <main className="relative flex flex-1 flex-col bg-background">
      <Header />
      <AccountDashboard />
    </main>
  );
}
