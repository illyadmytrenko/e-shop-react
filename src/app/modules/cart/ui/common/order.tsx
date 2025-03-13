import { Product } from "@/common/types/product";
import { useState } from "react";
import { CustomButton } from "@/common/components/custom-button/custom-button";
import { CustomInput } from "@/common/components/custom-input/custom-input";
import { ProductCardCart } from "@/common/components/product-card-cart/product-card-cart";
import { TotalPrice } from "./total-price";

interface OrderProps {
  chosenProducts: Product[];
  error: string;
  subtotal: number;
  serviseCommission: number;
  shippingMethod: string;
  paymentMethod?: string;
  discount: number;
  applyDiscount: (discountCode: string) => void;
  handleProceedToPaymentButton: () => void;
  handleCreateOrderButton?: () => void;
  pageNum?: number;
}

export function Order({
  chosenProducts,
  error,
  subtotal,
  serviseCommission,
  shippingMethod,
  paymentMethod = "",
  discount,
  applyDiscount,
  handleProceedToPaymentButton,
  handleCreateOrderButton = () => {},
  pageNum,
}: OrderProps) {
  const shipmentCost: number =
    shippingMethod === "free" ? 0 : shippingMethod === "regular" ? 7.5 : 22.5;

  const discountStringCopy: string = discount !== 0 ? "discount" : "";
  const [discountString, setDiscountString] =
    useState<string>(discountStringCopy);

  const handleChangeDiscountInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setDiscountString(event.target.value);
  };
  return (
    <aside className="rounded-md border-2 border-solid border-gray-300 p-4 sm:p-6 flex flex-col gap-4 lg:self-start">
      <h4 className="text-xl md:text-2xl font-bold">Your order</h4>
      <div className="flex flex-col gap-3 mb-5 max-h-[450px] max-w-[500px] overflow-y-auto overflow-x-hidden pr-3">
        {chosenProducts.map((product) => (
          <ProductCardCart
            key={product.id}
            product={product}
            width={154}
            height={120}
            className="relative after:absolute after:w-full after:h-[2px] after:bg-gray-300 !rounded-none !shadow-none after:-bottom-3 after:-left-2"
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        <CustomInput
          name="discount"
          value={discountString}
          type="text"
          placeholder="Discount code"
          className="rounded-md border-2 border-solid border-gray-300 p-3"
          classNameDiv="flex-[1_1_auto] sm:flex-[1_1_55%]"
          onChange={handleChangeDiscountInput}
          error={error}
        />
        <CustomButton
          variant="outlined"
          size="md"
          className="flex-[1_1_auto] self-start"
          onClick={() => applyDiscount(discountString)}
        >
          Apply
        </CustomButton>
      </div>
      <TotalPrice
        subtotal={subtotal}
        serviseCommission={serviseCommission}
        shipmentCost={shipmentCost}
        discount={discount}
      />
      {paymentMethod !== "creditCards" && pageNum === 3 ? (
        <CustomButton
          variant="blue"
          size="md"
          onClick={handleCreateOrderButton}
        >
          Create order
        </CustomButton>
      ) : (
        <CustomButton
          variant="blue"
          size="md"
          onClick={handleProceedToPaymentButton}
        >
          Continue to pay
        </CustomButton>
      )}
    </aside>
  );
}
