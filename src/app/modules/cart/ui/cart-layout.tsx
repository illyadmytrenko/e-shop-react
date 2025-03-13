import { Product } from "@/common/types/product";
import { PaymentUserInfo } from "@/common/types/payment-user-info";
import { Routes, Route, Navigate } from "react-router-dom";
import { CartPage } from "./cart-page/cart-page";
import { CheckoutPage } from "./checkout-page/checkout-page";
import { PaymentPage } from "./payment-page/payment-page";

interface CartLayoutProps {
  chosenProducts: Product[];
  subtotal: number;
  serviseCommission: number;
  handleProceedToCheckoutButton: () => void;
  paymentUserInfo: PaymentUserInfo;
  userId: number;
  handleInputClick: () => void;
  handleShippingMethodChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handlePaymentMethodChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleReturnToCartButton: () => void;
  applyDiscount: (discountCode: string) => boolean;
  handleProceedToPaymentButton: () => void;
  errors: string[];
  isCheckoutSuccess: boolean;
}

export function CartLayout({
  chosenProducts,
  subtotal,
  serviseCommission,
  handleProceedToCheckoutButton,
  paymentUserInfo,
  userId,
  handleInputClick,
  handleShippingMethodChange,
  handlePaymentMethodChange,
  handleReturnToCartButton,
  applyDiscount,
  handleProceedToPaymentButton,
  errors,
  isCheckoutSuccess,
}: CartLayoutProps) {
  return (
    <div>
      <Routes>
        <Route
          path="cart"
          element={
            <CartPage
              chosenProducts={chosenProducts}
              subtotal={subtotal}
              serviseCommission={serviseCommission}
              handleProceedToCheckoutButton={handleProceedToCheckoutButton}
            />
          }
        />
        <Route
          path="checkout"
          element={
            <CheckoutPage
              paymentUserInfo={paymentUserInfo}
              handleInputClick={handleInputClick}
              handleShippingMethodChange={handleShippingMethodChange}
              handleReturnToCartButton={handleReturnToCartButton}
              applyDiscount={applyDiscount}
              chosenProducts={chosenProducts}
              subtotal={subtotal}
              serviseCommission={serviseCommission}
              handleProceedToPaymentButton={handleProceedToPaymentButton}
              errors={errors}
            />
          }
        />
        <Route
          path="payment"
          element={
            isCheckoutSuccess ? (
              <PaymentPage
                userId={userId}
                paymentUserInfo={paymentUserInfo}
                handlePaymentMethodChange={handlePaymentMethodChange}
                applyDiscount={applyDiscount}
                chosenProducts={chosenProducts}
                subtotal={subtotal}
                serviseCommission={serviseCommission}
                errors={errors}
                handleReturnToCheckoutButton={handleProceedToCheckoutButton}
              />
            ) : (
              <Navigate to="/cart" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/cart/cart" replace />} />
      </Routes>
    </div>
  );
}
