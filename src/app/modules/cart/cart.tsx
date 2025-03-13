import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/common/shared/redux";
import { useModal } from "@/common/context/modal-context";
import { productsApi } from "../products/api";
import { UserInfo } from "@/common/types/user-info";
import { productsSlice } from "../products/products.slice";
import { userInfoSlice } from "../users/user-info.slice";
import { Product } from "@/common/types/product";
import { PaymentUserInfo } from "@/common/types/payment-user-info";
import { ModalWindowOptions } from "@/common/types/modal-window-options";
import { cartSlice, setPaymentUserInfoInStore } from "./cart.slice";
import { parseAddress } from "@/common/functions/address";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useValidation } from "@/common/functions/useValidate";
import { CartLayout } from "./ui/cart-layout";
import { ModalWindow } from "@/common/components/modal-window/modal-window";

export function Cart() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    isModalChangeOpen,
    setIsModalChangeOpen,
    isCheckoutSuccess,
    setIsCheckoutSuccess,
  } = useModal();

  const { data: products, isLoading: productsLoading } =
    productsApi.useGetProductsQuery();

  const userInfo: UserInfo =
    useAppSelector(userInfoSlice.selectors.selectUserInfo) ?? ({} as UserInfo);
  const paymentUserInfoFromStore = useAppSelector((state) =>
    cartSlice.selectors.selectPaymentUserInfo(state, userInfo.userId ?? 0)
  );

  const chosenProductsIds: string[] = useAppSelector((state) =>
    productsSlice.selectors.selectChosenProductsIds(state, userInfo.userId ?? 0)
  );
  const chosenProductsList: Product[] = useMemo(
    () =>
      products?.filter((product) =>
        chosenProductsIds.includes(product.id.toString())
      ) ?? ([] as Product[]),
    [products, chosenProductsIds]
  );

  const subtotal: number = useAppSelector((state) =>
    productsSlice.selectors.selectChosenProductsTotalPrice(
      state,
      userInfo.userId,
      products ?? []
    )
  );
  const serviceCommission: number = Math.floor(subtotal * 0.02);

  const [paymentUserInfo, setPaymentUserInfo] = useState<PaymentUserInfo>(
    paymentUserInfoFromStore ?? {
      userName: userInfo.userName || "",
      userPhoneNumber: userInfo.userPhoneNumber || "",
      userAddress: userInfo.userAddress || "",
      userPostalCode: userInfo.userPostalCode || "",
      shippingMethod: "free",
      discount: 0,
      paymentMethod: "creditCards",
      totalPrice: 0,
    }
  );

  const [errors, setErrors] = useState(["", ""]);

  const parsedAddress = parseAddress(paymentUserInfo.userAddress);

  const [modalWindowOptions, setModalWindowOptions] =
    useState<ModalWindowOptions>({
      h5: "Edit address",
      p: "Enter your address details",
      inputNames: [
        "userName",
        "userPhoneNumber",
        "userCountry",
        "userCity",
        "userStreet",
        "userPostalCode",
      ],
      inputTypes: ["text", "text", "text", "text", "text", "text"],
      inputValues: [
        paymentUserInfo.userName || "",
        paymentUserInfo.userPhoneNumber || "",
        parsedAddress.country || "",
        parsedAddress.city || "",
        parsedAddress.street || "",
        paymentUserInfo.userPostalCode || "",
      ],
      placeholders: [
        paymentUserInfo.userName || "User name",
        paymentUserInfo.userPhoneNumber || "Phone number",
        parsedAddress.country || "Country",
        parsedAddress.city || "City",
        parsedAddress.street || "Street name and house number",
        paymentUserInfo.userPostalCode || "Postal code",
      ],
    });

  const { errors: modalWindowErrors, validateSingleField } = useValidation({
    inputNames: modalWindowOptions.inputNames,
    initialErrors: Array(modalWindowOptions.inputNames.length).fill(""),
  });

  const handleChange = useCallback(
    (value: string, index: number): void => {
      setModalWindowOptions((prev) => {
        const updatedValues = prev.inputValues.map((val, i) =>
          i === index ? value : val
        );
        const updated = { ...prev, inputValues: updatedValues };
        const fieldName = updated.inputNames[index];
        validateSingleField(fieldName, value);
        return updated;
      });
    },
    [validateSingleField]
  );

  const handleChangeMethod = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setPaymentUserInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const applyDiscount = (discountCode: string): boolean => {
    const isValid = discountCode === "discount";
    setPaymentUserInfo((prev) => ({
      ...prev,
      discount: isValid ? Math.floor(subtotal * 0.2) : 0,
    }));
    setErrors([
      errors[0],
      isValid || !discountCode
        ? ""
        : "This discount code is wrong. Try another",
    ]);
    return isValid;
  };

  const saveChanges = (e: React.FormEvent): void => {
    e.preventDefault();
    if (
      !modalWindowOptions.inputNames.every((name, index) =>
        validateSingleField(name, modalWindowOptions.inputValues[index])
      )
    )
      return;
    setPaymentUserInfo((prev) => ({
      ...prev,
      userName: modalWindowOptions.inputValues[0],
      userPhoneNumber: modalWindowOptions.inputValues[1],
      userAddress: `${modalWindowOptions.inputValues[2]}, ${modalWindowOptions.inputValues[3]}, ${modalWindowOptions.inputValues[4]}`,
      userPostalCode: modalWindowOptions.inputValues[5],
    }));
    setIsModalChangeOpen(false);
  };

  const handleProceedToCheckoutButton = useCallback(
    () => navigate("/cart/checkout"),
    [navigate]
  );
  const handleReturnToCartButton = useCallback(
    () => navigate("/cart/cart"),
    [navigate]
  );
  const handleInputClick = (): void => setIsModalChangeOpen(true);
  const closeModalWindow = (): void => setIsModalChangeOpen(false);

  const handleProceedToPaymentButton = useCallback(() => {
    if (!paymentUserInfo.userAddress) {
      setErrors(["User address is required", errors[1]]);
      return;
    }
    setPaymentUserInfo((prev) => ({
      ...prev,
      totalPrice: Math.floor(
        subtotal +
          serviceCommission -
          paymentUserInfo.discount +
          (paymentUserInfo.shippingMethod === "free"
            ? 0
            : paymentUserInfo.shippingMethod === "regular"
            ? 7.5
            : 22.5)
      ),
    }));
    setIsCheckoutSuccess(true);
    navigate("/cart/payment");
  }, [
    paymentUserInfo,
    setIsCheckoutSuccess,
    navigate,
    errors,
    subtotal,
    serviceCommission,
  ]);

  useEffect(() => {
    if (!paymentUserInfo) return;
    dispatch(
      setPaymentUserInfoInStore({
        userId: userInfo.userId ?? 0,
        paymentUserInfo,
        isCheckoutSuccess: true,
      })
    );
  }, [paymentUserInfo, dispatch, userInfo.userId]);

  if (productsLoading) return <div>Loading...</div>;

  return (
    <>
      <CartLayout
        chosenProducts={chosenProductsList}
        subtotal={subtotal}
        serviseCommission={serviceCommission}
        handleProceedToCheckoutButton={handleProceedToCheckoutButton}
        paymentUserInfo={paymentUserInfo}
        userId={userInfo.userId}
        handleInputClick={handleInputClick}
        handleShippingMethodChange={handleChangeMethod}
        handlePaymentMethodChange={handleChangeMethod}
        handleReturnToCartButton={handleReturnToCartButton}
        applyDiscount={applyDiscount}
        handleProceedToPaymentButton={handleProceedToPaymentButton}
        errors={errors}
        isCheckoutSuccess={isCheckoutSuccess}
      />
      {isModalChangeOpen && (
        <ModalWindow
          {...modalWindowOptions}
          closeModalWindow={closeModalWindow}
          handleChange={handleChange}
          saveChanges={saveChanges}
          errors={modalWindowErrors}
        />
      )}
    </>
  );
}
