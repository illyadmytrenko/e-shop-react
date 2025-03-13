"use client";

import { useNavigate } from "react-router-dom";

import { CustomButton } from "@/common/components/custom-button/custom-button";
import { CustomImage } from "@/common/components/custom-image/custom-image";

export default function CartError() {
  const navigate = useNavigate();
  const handleReturn = (): void => {
    navigate("/cart");
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <CustomImage
        alt="error icon"
        src="/no-items/no-items.svg"
        width={400}
        height={400}
      />
      <h3 className="text-3xl font-bold text-red-600">Payment Failed</h3>
      <p className="text-gray-300">
        Unfortunately we have an issue with your payment, try again later.
      </p>
      <CustomButton variant="blue" size="md" onClick={handleReturn}>
        Try again
      </CustomButton>
    </div>
  );
}
