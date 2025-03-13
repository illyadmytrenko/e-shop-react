import { PaymentUserInfo } from "@/common/types/payment-user-info";
import { Product } from "@/common/types/product";
import { NoItemsSample } from "@/common/components/no-items-sample/no-items-sample";
import { AccountInput } from "@/common/components/account-input/account-input";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import { CustomRadio } from "@/common/components/custom-radio/custom-radio";
import { CustomButton } from "@/common/components/custom-button/custom-button";
import { Order } from "../common/order";

interface CheckoutPageProps {
  paymentUserInfo: PaymentUserInfo;
  handleInputClick: () => void;
  handleShippingMethodChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleReturnToCartButton: () => void;
  applyDiscount: (discountCode: string) => boolean;
  chosenProducts: Product[];
  subtotal: number;
  serviseCommission: number;
  handleProceedToPaymentButton: () => void;
  errors: string[];
}

export function CheckoutPage({
  paymentUserInfo,
  handleInputClick,
  handleShippingMethodChange,
  handleReturnToCartButton,
  applyDiscount,
  chosenProducts,
  subtotal,
  serviseCommission,
  handleProceedToPaymentButton,
  errors,
}: CheckoutPageProps) {
  return (
    <>
      <CustomImage
        alt="roadmap image"
        src="/cart/roadmap-checkout.svg"
        width={520}
        height={100}
        className="flex justify-center my-5 md:my-10"
      />
      {chosenProducts.length < 1 && (
        <div className="mx-auto">
          <NoItemsSample
            h3="Empty"
            p="Looks like you haven't added anything to your cart"
          />
        </div>
      )}
      {chosenProducts.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-6 xl:gap-8">
          <div className="flex-1">
            <div className="rounded-md border-2 border-solid border-gray-300 p-4 xl:p-6 flex flex-col gap-8 mb-4">
              <div>
                <h5 className="text-xl font-bold mb-2">User</h5>
                <p className="px-2 py-4 bg-gray-100 rounded-md">
                  {paymentUserInfo.userName}
                </p>
              </div>
              <div>
                <h5 className="text-xl font-bold mb-2">Ship to</h5>
                <AccountInput
                  isBeforeImage={false}
                  placeholder={
                    paymentUserInfo.userAddress !== ""
                      ? paymentUserInfo.userAddress
                      : "Shippment Address"
                  }
                  handleInputClick={handleInputClick}
                  error={errors[0]}
                />
              </div>
              <div>
                <h5 className="text-xl font-bold">Shipping Method</h5>
                <div className="flex flex-col gap-4">
                  <CustomRadio
                    name="shippingMethod"
                    id="free"
                    value="free"
                    onChange={handleShippingMethodChange}
                    checked={paymentUserInfo.shippingMethod === "free"}
                    spanTop="Free Shipping"
                    spanBottom="7-30 business days"
                    spanEnd="$0"
                  />
                  <CustomRadio
                    name="shippingMethod"
                    id="regular"
                    value="regular"
                    onChange={handleShippingMethodChange}
                    checked={paymentUserInfo.shippingMethod === "regular"}
                    spanTop="Regular Shipping"
                    spanBottom="3-14 business days"
                    spanEnd="$7.5"
                  />
                  <CustomRadio
                    name="shippingMethod"
                    id="express"
                    value="express"
                    onChange={handleShippingMethodChange}
                    checked={paymentUserInfo.shippingMethod === "express"}
                    spanTop="Express Shipping"
                    spanBottom="1-3 business days"
                    spanEnd="$22.5"
                  />
                </div>
              </div>
            </div>
            <CustomButton
              className="text-blue-500 pl-6"
              onClick={handleReturnToCartButton}
            >
              Return to cart
            </CustomButton>
          </div>
          <Order
            chosenProducts={chosenProducts}
            error={errors[1]}
            subtotal={subtotal}
            serviseCommission={serviseCommission}
            shippingMethod={paymentUserInfo.shippingMethod}
            discount={paymentUserInfo.discount}
            applyDiscount={applyDiscount}
            handleProceedToPaymentButton={handleProceedToPaymentButton}
          />
        </div>
      )}
    </>
  );
}
