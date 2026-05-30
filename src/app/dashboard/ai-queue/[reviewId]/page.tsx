"use client";

import dynamic from "next/dynamic";

const AiReviewDetail = dynamic(
  () => import("@/components/dashboard/ai-review-queue/ai-review-detail"),
  { ssr: false }
);

export default function AiReviewDetailPage() {
  return <AiReviewDetail />;
}
