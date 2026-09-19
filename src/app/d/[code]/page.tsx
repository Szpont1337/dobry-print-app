import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { api } from "@convex/_generated/api";

import { getConvexHttp } from "@/lib/serverEnv";

import { ShareContent } from "./components/share-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pliki do druku",
  robots: { index: false, follow: false },
};

export default async function SharePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const data = await getConvexHttp().query(api.shareLinks.getByCode, { code });
  if (!data) {
    notFound();
  }

  return <ShareContent code={code} data={data} />;
}
