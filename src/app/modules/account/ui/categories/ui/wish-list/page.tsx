"use client";

import dynamic from "next/dynamic";

interface PageProps {
  userId: number;
}

const DynamicWishList = dynamic(() => import("./wish-list"), {
  ssr: false,
});

export default function Page({ userId }: PageProps) {
  return <DynamicWishList userId={userId} />;
}
