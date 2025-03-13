"use client";

import { UserInfo } from "@/common/types/user-info";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/common/shared/redux";
import { CategoryTop } from "../category-top";
import { NotificationSwitch } from "./ui/notification-switch";
import { setUserInfo } from "@/app/modules/users/user-info.slice";

interface PageProps {
  userInfo: UserInfo | null;
}

const notifications = [
  {
    alt: "direct icon",
    src: "/account/notification/direct.svg",
    h6: "Emails",
    p: "We write emails to let you know what's important, like: new order, confirmations",
  },
  {
    alt: "truck icon",
    src: "/account/notification/truck.svg",
    h6: "Order Delivered",
    p: "You will be noticed once the order is delivered",
  },
  {
    alt: "sms icon",
    src: "/account/notification/sms.svg",
    h6: "Push to your Device",
    p: "Receive notifications about your order status, promotions and other updates",
  },
  {
    alt: "story icon",
    src: "/account/notification/story.svg",
    h6: "Product's availability",
    p: "You will be noticed when the product gets available",
  },
];

export function Notification({ userInfo }: PageProps) {
  const [userSwitch, setUserSwitch] = useState<boolean[]>(Array(4).fill(false));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userInfo?.userNotifications) {
      setUserSwitch(
        userInfo.userNotifications
          .split(",")
          .map((value) => value.trim() === "true")
      );
    }
  }, [userInfo]);

  const handleChange = async (index: number, checked: boolean) => {
    const updatedSwitches = [...userSwitch];
    updatedSwitches[index] = checked;
    setUserSwitch(updatedSwitches);

    if (!userInfo) {
      return;
    }

    const updatedUserInfo: UserInfo = {
      ...userInfo,
      userNotifications: updatedSwitches.join(","),
    };

    dispatch(setUserInfo(updatedUserInfo));
  };

  return (
    <div>
      <CategoryTop h5="Notification" p="Manage your notification settings" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-6">
        {notifications.map((notification, index) => (
          <NotificationSwitch
            key={index}
            {...notification}
            isChecked={userSwitch[index]}
            handleChange={(e) => handleChange(index, e.target.checked)}
          />
        ))}
      </div>
    </div>
  );
}
