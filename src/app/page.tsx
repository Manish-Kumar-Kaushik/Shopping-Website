"use client";

import dynamic from "next/dynamic";

const AdminOverview = dynamic(
  () => import("@/components/dashboard/admin-overview"),
  { ssr: false }
);

export default function Home() {
  return <AdminOverview />;
}