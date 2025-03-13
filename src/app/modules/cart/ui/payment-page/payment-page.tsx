import { PaymentUserInfo } from "@/common/types/payment-user-info";
import { Product } from "@/common/types/product";
import { useAppSelector } from "@/common/shared/redux";
import { productsSlice } from "@/app/modules/products/products.slice";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import { CustomInput } from "@/common/components/custom-input/custom-input";
import { CustomButton } from "@/common/components/custom-button/custom-button";
import { Order } from "../common/order";
import { MasterCard } from "@/common/components/images/master-card";
import { Visa } from "@/common/components/images/visa";

interface PaymentPageProps {
  userId: number;
  paymentUserInfo: PaymentUserInfo;
  applyDiscount: (discountCode: string) => boolean;
  handlePaymentMethodChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  chosenProducts: Product[];
  subtotal: number;
  serviseCommission: number;
  errors: string[];
  handleReturnToCheckoutButton: () => void;
}

export function PaymentPage({
  userId,
  paymentUserInfo,
  applyDiscount,
  handlePaymentMethodChange,
  chosenProducts,
  subtotal,
  serviseCommission,
  errors,
  handleReturnToCheckoutButton,
}: PaymentPageProps) {
  const productsWithQuantity = chosenProducts.map((product) => ({
    ...product,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    quantity: useAppSelector((state) =>
      productsSlice.selectors.selectChosenProductCount(
        state,
        userId,
        product.id
      )
    ),
  }));

  const navigate = useNavigate();

  const makePayment = async (): Promise<void> => {
    try {
      const stripe = await loadStripe(
        "pk_test_51QjLIuCQUfncnbXmuEi3YPCMxkpG50R5w0bwNPA4kXYqaL1PUWG6dwHS0QVQV4jEe45Lors1y1w3kv3nKc3oAePy00LGESbxqt"
      );
      const response = await fetch(
        "http://localhost:5000/cart/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productsWithQuantity,
            ...paymentUserInfo,
            serviseCommission,
          }),
        }
      );
      const session = await response.json();
      await stripe?.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const createOrder = () => {
    const id = Date.now().toString();
    navigate(`/cart/success?session_id=${id}`);
  };

  return (
    <>
      <CustomImage
        alt="roadmap image"
        src="/cart/roadmap-payment.svg"
        width={520}
        height={100}
        className="flex justify-center my-5 md:my-10"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <div className="rounded-md border-2 border-solid border-gray-300 p-6 flex flex-col gap-8 mb-4">
            <div>
              <h5 className="text-xl font-bold mb-2">Payment</h5>
              <div className="flex flex-col gap-4">
                <div className="px-2 py-4 bg-gray-100 rounded-md flex justify-between items-center">
                  <div className="flex gap-1">
                    <CustomInput
                      name="paymentMethod"
                      id="credit_cards"
                      value="creditCards"
                      type="radio"
                      checked={paymentUserInfo.paymentMethod === "creditCards"}
                      onChange={handlePaymentMethodChange}
                      className="mt-[6px]"
                    />
                    <span>Credit Cards</span>
                  </div>
                  <div className="flex">
                    <MasterCard />
                    <Visa />
                  </div>
                </div>
                <div className="px-2 py-4 bg-gray-100 rounded-md flex gap-1 items-center">
                  <CustomInput
                    name="paymentMethod"
                    id="cash"
                    value="cash"
                    type="radio"
                    checked={paymentUserInfo.paymentMethod === "cash"}
                    onChange={handlePaymentMethodChange}
                    className="mt-[6px]"
                  />
                  <span>Cash</span>
                </div>
              </div>
            </div>
          </div>
          <CustomButton
            className="text-blue-500 pl-6"
            onClick={handleReturnToCheckoutButton}
          >
            Return to checkout
          </CustomButton>
        </div>
        <Order
          chosenProducts={chosenProducts}
          error={errors[1]}
          subtotal={subtotal}
          serviseCommission={serviseCommission}
          shippingMethod={paymentUserInfo.shippingMethod}
          paymentMethod={paymentUserInfo.paymentMethod}
          discount={paymentUserInfo.discount}
          applyDiscount={applyDiscount}
          handleProceedToPaymentButton={makePayment}
          handleCreateOrderButton={createOrder}
          pageNum={3}
        />
      </div>
    </>
  );
}
