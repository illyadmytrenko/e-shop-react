import { Product } from "@/common/types/product";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/common/shared/redux";
import { useModal } from "@/common/context/modal-context";
import { userInfoSlice } from "@/app/modules/users/user-info.slice";
import {
  productsSlice,
  likeProduct,
  dislikeProduct,
  setProductsLoading,
  setProductsIdle,
  addProductToCart,
} from "@/app/modules/products/products.slice";
import { clearCartState } from "@/app/modules/cart/cart.slice";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import { CustomButton } from "@/common/components/custom-button/custom-button";
import clsx from "clsx";
import { Alert } from "@mui/material";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHover, setIsHover] = useState(false);
  const [alertState, setAlertState] = useState<{
    visible: boolean;
    exiting: boolean;
  }>({ visible: false, exiting: false });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setIsModalSearchOpen, setIsModalAccountOpen } = useModal();

  const userId = useAppSelector(userInfoSlice.selectors.selectUserInfo)?.userId;
  const isLiked = useAppSelector((state) =>
    productsSlice.selectors.selectIsLiked(state, userId ?? 0, product.id)
  );

  const handleMouseHover = (state: boolean) => (): void => setIsHover(state);

  const handleCardClick = (): void => {
    navigate(`/products/${product.id}`);
    setIsModalSearchOpen(false);
  };

  const handleLikeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!userId) return showLoginModal();
    dispatch(setProductsLoading());
    dispatch(
      isLiked
        ? dislikeProduct({ userId, productId: product.id })
        : likeProduct({ userId, productId: product.id })
    );
  };

  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.stopPropagation();
    if (!userId) return showLoginModal();

    dispatch(clearCartState({ userId }));
    dispatch(setProductsLoading());
    dispatch(addProductToCart({ userId, productId: product.id }));
    showAlert();
  };

  const showLoginModal = (): void => {
    setIsModalAccountOpen(true);
    dispatch(setProductsIdle());
  };

  const showAlert = (): void => {
    setAlertState({ visible: true, exiting: false });
    setTimeout(
      () => setAlertState((prev) => ({ ...prev, exiting: true })),
      2600
    );
    setTimeout(() => setAlertState({ visible: false, exiting: false }), 3000);
  };

  return (
    <>
      <div
        className={clsx(
          "rounded-md p-4 shadow-[0px_0px_10px_2px_#717171] cursor-pointer transform transition-all duration-300 flex flex-col justify-center h-full",
          isHover ? "scale-105 shadow-lg" : "scale-100 shadow-md"
        )}
        onMouseEnter={handleMouseHover(true)}
        onMouseLeave={handleMouseHover(false)}
        onClick={handleCardClick}
      >
        <div className="flex flex-col items-center mb-3">
          <div className="relative">
            <div className="!h-[300px] overflow-hidden flex items-center">
              <CustomImage
                alt={product.name}
                src={product.image ?? "/products/sample.png"}
                width={256}
                height={190}
                className="mb-2 transition-transform duration-300 ease-out"
              />
            </div>
            <div
              className={clsx(
                "absolute bottom-0 left-0 w-full h-1 transition-all duration-300",
                isHover
                  ? "bg-gradient-to-r from-transparent via-blue-600 to-transparent scale-x-110"
                  : "bg-gradient-to-r from-transparent via-gray-400 to-transparent scale-x-100"
              )}
            />
          </div>
          <div
            className={clsx(
              "transition-colors duration-300 text-center mt-2",
              isHover && "text-blue-600"
            )}
          >
            <span className="mb-1 font-semibold">{product.name}</span>
            <p>{product.description}</p>
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-2">
          {!isHover ? (
            <>
              <p className="text-lg">${product.price}.00</p>
              <div className="flex items-center gap-1">
                <CustomImage
                  alt="star icon"
                  src="/products/card/star.svg"
                  width={24}
                  height={24}
                />
                <span className="text-blue-900 font-semibold">
                  {product.rating ? product.rating.toFixed(1) : "N/A"}
                </span>
              </div>
            </>
          ) : (
            <>
              <CustomButton
                size="sm"
                variant="outlined"
                className="flex gap-2 items-center text-lg transition-transform duration-200 active:scale-95"
                onClick={handleAddToCart}
              >
                <CustomImage
                  alt="cart icon"
                  src="/products/card/shopping-cart.svg"
                  width={24}
                  height={24}
                  className="shrink-0"
                />
                <span>Add to cart</span>
              </CustomButton>
              <CustomButton
                onClick={handleLikeToggle}
                className="flex transition-transform duration-200 active:scale-95"
              >
                <CustomImage
                  alt={isLiked ? "dislike icon" : "like icon"}
                  src={
                    isLiked
                      ? "/products/card/trash.svg"
                      : "/products/card/heart.svg"
                  }
                  width={24}
                  height={24}
                  className="hover:scale-125 transition-transform duration-200 shrink-0"
                />
              </CustomButton>
            </>
          )}
        </div>
      </div>
      {alertState.visible && (
        <Alert
          severity="success"
          className={clsx(
            "fixed top-10 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out",
            alertState.exiting ? "animate-slide-up" : "animate-slide-down"
          )}
        >
          Chosen item successfully added to cart!
        </Alert>
      )}
    </>
  );
}
