"use client";

import { UserInfo } from "@/common/types/user-info";
import { AccountInput } from "@/common/components/account-input/account-input";
import { CategoryTop } from "../category-top";

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

export default function SecurityAccess({
  userInfo,
  handleInputClick,
}: PageProps) {
  const inputs = [
    {
      label: "Change your password",
      names: ["userOldPassword", "userPassword"],
      types: ["password", "password"],
      values: ["", ""],
      placeholders: ["Old password", "New password"],
      icon: { alt: "key icon", src: "/account/security/key.svg" },
    },
    {
      label: "Set your phone number",
      names: ["userPhoneNumber"],
      types: ["text"],
      values: [userInfo?.userPhoneNumber ?? ""],
      placeholders: ["Phone number"],
      icon: { alt: "call icon", src: "/account/security/call.svg" },
    },
  ];

  return (
    <div>
      <CategoryTop
        h5="Security settings"
        p="Change password and phone number"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-6">
        {inputs.map(({ label, names, types, values, placeholders, icon }) => (
          <AccountInput
            key={names.join("-")}
            alt={icon.alt}
            src={icon.src}
            placeholder={
              placeholders[0] === "Old password"
                ? "Change Password"
                : placeholders[0]
            }
            handleInputClick={() =>
              handleInputClick(label, names, types, values, placeholders)
            }
          />
        ))}
      </div>
    </div>
  );
}
