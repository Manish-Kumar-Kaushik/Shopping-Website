"use client";

import dynamic from "next/dynamic";

const ProductMapping = dynamic(
  () => import("@/components/dashboard/products/action/mapping"),
  { ssr: false }
);

export default function ProductMappingPage() {
  return <ProductMapping />;
}

