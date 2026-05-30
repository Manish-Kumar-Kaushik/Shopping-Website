"use client";

import dynamic from "next/dynamic";

const ApiLogs = dynamic(
  () => import("@/components/dashboard/Retailer-connectors/api-logs"),
  { ssr: false }
);

export default function ApiLogsPage() {
  return <ApiLogs />;
}
