"use client";

import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "@/common/context/modal-context";
import { useAppDispatch, useAppSelector } from "@/common/shared/redux";
import { Product } from "@/common/types/product";
import { ProductCharacteristics } from "@/common/types/product-characteristics";

import {
  Comment,
  commentsApi,
  productsApi,
  productsCharacteristicsApi,
} from "../api";
import { userInfoSlice } from "../../users/user-info.slice";
import { Alert } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { useCallback, useState } from "react";
import { addProductToCart } from "../products.slice";
import { ProductInfoLayout } from "./ui/product-info-layout";
import clsx from "clsx";

export default function ProductInfo() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [alertState, setAlertState] = useState<{
    visible: boolean;
    exiting: boolean;
    text: string;
  }>({ visible: false, exiting: false, text: "" });

  const { setIsModalAccountOpen } = useModal();

  const dispatch = useAppDispatch();
  const userId =
    useAppSelector(userInfoSlice.selectors.selectUserInfo)?.userId ?? 0;

  const { data: product, isLoading: isLoadingProduct } =
    productsApi.useGetProductQuery(Number(id) ?? skipToken);
  const { data: productCharacteristics, isLoading: isLoadingCharacteristics } =
    productsCharacteristicsApi.useGetCharacteristicsByIdQuery(
      Number(id) ?? skipToken
    );
  const { data: products } = productsApi.useGetProductsQuery();
  const { data: productsCharacteristics } =
    productsCharacteristicsApi.useGetCharacteristicsQuery();
  const { data: comments } = commentsApi.useGetCommentsByProductIdQuery(
    product?.id ?? 0
  );

  const handleAddToCart = useCallback((): void => {
    if (userId === 0) {
      setIsModalAccountOpen(true);
    } else {
      dispatch(addProductToCart({ userId, productId: product?.id }));
      showAlert("Chosen item successfully added to cart!");
    }
  }, [dispatch, product?.id, setIsModalAccountOpen, userId]);

  const handleBuyNow = useCallback((): void => {
    if (userId === 0) {
      setIsModalAccountOpen(true);
    } else {
      handleAddToCart();
      navigate("/cart");
    }
  }, [handleAddToCart, navigate, setIsModalAccountOpen, userId]);

  const showAlert = (text: string): void => {
    setAlertState({ visible: true, exiting: false, text: text });
    setTimeout(
      () => setAlertState((prev) => ({ ...prev, exiting: true })),
      2600
    );
    setTimeout(
      () => setAlertState({ visible: false, exiting: false, text }),
      3000
    );
  };

  if (
    isLoadingProduct ||
    !product ||
    isLoadingCharacteristics ||
    !productCharacteristics
  ) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ProductInfoLayout
        product={product}
        productCharacteristics={productCharacteristics}
        products={products ?? ([] as Product[])}
        productsCharacteristics={
          productsCharacteristics ?? ([] as ProductCharacteristics[])
        }
        handleBuyNow={handleBuyNow}
        handleAddToCart={handleAddToCart}
        userId={userId}
        showAlert={showAlert}
        comments={comments ?? ([] as Comment[])}
      />
      {alertState.visible && (
        <Alert
          severity="success"
          className={clsx(
            "fixed top-10 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out",
            alertState.exiting ? "animate-slide-up" : "animate-slide-down"
          )}
        >
          {alertState.text}
        </Alert>
      )}
    </>
  );
}
