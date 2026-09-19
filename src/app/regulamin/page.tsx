import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Regulamin. DobrePrinty",
  description:
    "Regulamin serwisu dobreprinty.pl. Zasady składania zamówień, realizacji druku przez drukarnie partnerskie i obsługi reklamacji.",
};

export default function RegulaminPage() {
  return (
    <LegalPage
      doc="terms"
      values={{
        owner: COMPANY.owner,
        address: COMPANY.address,
        email: COMPANY.email,
      }}
    />
  );
}
