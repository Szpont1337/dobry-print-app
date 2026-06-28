import type { Metadata } from "next";

import { AdminDashboard } from "@/components/admin-dashboard";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Admin. DobrePrinty",
  description: "Panel administracyjny dobreprinty.pl.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="relative flex flex-1 flex-col bg-background">
      <Header />
      <AdminDashboard />
    </main>
  );
}
