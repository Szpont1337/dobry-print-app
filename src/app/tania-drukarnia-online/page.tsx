import type { Metadata } from "next";

import { TopicLanding, buildTopicMetadata } from "@/components/topic-landing";
import { getTematOrThrow } from "@/data/tematy-drukarnie";

export const revalidate = 86400;

const temat = getTematOrThrow("tania-drukarnia-online");

export const metadata: Metadata = buildTopicMetadata(temat);

export default function Page() {
  return <TopicLanding temat={temat} />;
}
