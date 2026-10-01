import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Polityka prywatności. DobrePrinty",
  description:
    "Polityka prywatności DobrePrinty. Jakie dane zbieramy, w jakim celu i jak je chronimy.",
};

export default function PolitykaPrywatnosciPage() {
  return (
    <LegalPage
      doc="privacy"
      values={{ owner: COMPANY.owner, email: COMPANY.email }}
    />
  );
}
