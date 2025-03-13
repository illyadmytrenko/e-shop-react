"use client";

import { UserInfo } from "@/common/types/user-info";
import { parseAddress } from "@/common/functions/address";
import { CategoryTop } from "../category-top";
import { AccountInput } from "@/common/components/account-input/account-input";

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

export default function PersonalData({
  userInfo,
  handleInputClick,
}: PageProps) {
  const address = userInfo?.userAddress
    ? parseAddress(userInfo.userAddress)
    : { country: "Country", city: "City", street: "Street" };
  const inputs = [
    {
      label: "Set your full name",
      names: ["userName"],
      types: ["text"],
      values: [userInfo?.userName ?? ""],
      placeholders: ["Full name"],
      icon: { alt: "user icon", src: "/account/personal-data/user.svg" },
    },
    {
      label: "Set your email",
      names: ["userEmail"],
      types: ["email"],
      values: [userInfo?.userEmail ?? ""],
      placeholders: ["Email"],
      icon: { alt: "direct icon", src: "/account/notification/direct.svg" },
    },
    {
      label: "Set your address",
      names: ["userCountry", "userCity", "userStreet"],
      types: ["text", "text", "text"],
      values: [address.country, address.city, address.street],
      placeholders: ["Address"],
      icon: { alt: "home icon", src: "/account/personal-data/home-2.svg" },
    },
    {
      label: "Set your postal code",
      names: ["userPostalCode"],
      types: ["text"],
      values: [userInfo?.userPostalCode ?? ""],
      placeholders: ["Postal code"],
      icon: {
        alt: "signpost icon",
        src: "/account/personal-data/signpost.svg",
      },
    },
  ];

  return (
    <div>
      <CategoryTop h5="Identification" p="Verify your identity" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-6">
        {inputs.map(({ label, names, types, values, placeholders, icon }) => (
          <AccountInput
            key={names.join("-")}
            alt={icon.alt}
            src={icon.src}
            placeholder={
              placeholders[0] === "Country" ? "Address" : placeholders[0]
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
