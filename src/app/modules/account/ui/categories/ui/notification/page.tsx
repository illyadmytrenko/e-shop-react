"use client";

import { UserInfo } from "@/common/types/user-info";
import dynamic from "next/dynamic";

interface PageProps {
  userInfo: UserInfo | null;
}

const DynamicNotification = dynamic(() => import("./notification"), {
  ssr: false,
});

export default function Page({ userInfo }: PageProps) {
  return <DynamicNotification userInfo={userInfo} />;
}
