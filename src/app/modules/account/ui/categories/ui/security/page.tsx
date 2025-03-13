"use client";

import { UserInfo } from "@/common/types/user-info";
import dynamic from "next/dynamic";

interface PageProps {
  userInfo: UserInfo | null;
  handleInputClick: (
    h5: string,
    inputName: string[],
    inputType: string[],
    inputValue: string[],
    placeholder: string[]
  ) => void;
}

const DynamicSecurity = dynamic(() => import("./security"), {
  ssr: false,
});

export default function Page({ userInfo, handleInputClick }: PageProps) {
  return (
    <DynamicSecurity userInfo={userInfo} handleInputClick={handleInputClick} />
  );
}
