/* eslint-disable @next/next/no-page-custom-font */
"use client";

import dynamic from "next/dynamic";

const DynamicRootLayout = dynamic(() => import("./root-layout"), {
  ssr: false,
});

export default function RootLayout() {
  return;
  <DynamicRootLayout />;
}
