"use client";

import dynamic from "next/dynamic";

const RetailerConnectors = dynamic(
  () => import("@/components/dashboard/Retailer-connectors/retailer-connectors"),
  { ssr: false }
);

export default function ConnectorsPage() {
  return <RetailerConnectors />;
}

