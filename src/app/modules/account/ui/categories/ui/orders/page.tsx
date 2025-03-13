"use client";

import dynamic from "next/dynamic";

interface PageProps {
  userId: number;
}

const DynamicOrders = dynamic(() => import("./orders"), {
  ssr: false,
});

export default function Page({ userId }: PageProps) {
  return <DynamicOrders userId={userId} />;
}
