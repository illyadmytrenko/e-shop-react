import { useAppSelector } from "../shared/redux";
import { userInfoSlice } from "@/app/modules/users/user-info.slice";

export const AccountDropdownCategories = () => {
  const userName =
    useAppSelector(userInfoSlice.selectors.selectUserInfo)?.userName ?? "User";
  const userEmail =
    useAppSelector(userInfoSlice.selectors.selectUserInfo)?.userEmail ??
    "UserEmail";

  return [
    {
      name: userName,
      subname: userEmail,
      category: "Personal Data",
      alt: "user icon",
      src: "/account/categories/user-edit.svg",
    },
    {
      name: "Orders",
      category: "Orders",
      alt: "bag icon",
      src: "/account/categories/bag.svg",
    },
    {
      name: "Wish List",
      category: "Wish List",
      alt: "heart icon",
      src: "/account/categories/heart.svg",
    },
    {
      name: "Log out",
      category: "Log out",
      alt: "notification icon",
      src: "/account/categories/logout.svg",
    },
  ];
};
