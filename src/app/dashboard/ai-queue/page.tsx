"use client";

import dynamic from "next/dynamic";

const AIReviewQueue = dynamic(
  () => import("@/components/dashboard/ai-review-queue/ai-review"),
  { ssr: false }
);

export default function AIReviewQueuePage() {
  return <AIReviewQueue />;
}
