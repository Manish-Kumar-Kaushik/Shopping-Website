"use client";

import dynamic from "next/dynamic";

const ConnectorDetail = dynamic(
  () => import("@/components/dashboard/Retailer-connectors/connector-detail"),
  { ssr: false }
);

export default function ConnectorDetailPage() {
  return <ConnectorDetail />;
}
