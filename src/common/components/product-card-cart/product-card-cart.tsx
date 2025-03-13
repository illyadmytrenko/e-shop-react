import { Product } from "@/common/types/product";
import { userInfoSlice } from "@/app/modules/users/user-info.slice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/common/shared/redux";
import {
  productsSlice,
  deleteProductFromCart,
} from "@/app/modules/products/products.slice";
import { useCallback, useMemo } from "react";
import { COLOR_MAP } from "@/common/constants/color-map";
import { clearCartState } from "@/app/modules/cart/cart.slice";
import clsx from "clsx";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import { CustomButton } from "@/common/components/custom-button/custom-button";
import { Count } from "@/common/components/count/count";

interface ProductCardCartProps {
  product: Product;
  width?: number;
  height?: number;
  className?: string;
}

export function ProductCardCart({
  product,
  width = 256,
  height = 190,
  className = "",
}: ProductCardCartProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId: number =
    useAppSelector(userInfoSlice.selectors.selectUserInfo)?.userId ?? 0;

  const count: number = useAppSelector((state) =>
    productsSlice.selectors.selectChosenProductCount(state, userId, product.id)
  );

  const handleDeleteProduct = useCallback((): void => {
    dispatch(deleteProductFromCart({ userId, productId: product.id }));
    dispatch(clearCartState({ userId }));
  }, [dispatch, userId, product.id]);

  const handleClickProduct = useCallback((): void => {
    navigate(`/products/${product.id}`);
  }, [navigate, product.id]);

  const color = useMemo(
    () => COLOR_MAP[product.color] || "rgb(0, 0, 0)",
    [product.color]
  );

  return (
    <div
      className={clsx(
        "rounded-md p-4 pb-5 shadow-[0px_0px_8px_3px_#717171]",
        className
      )}
    >
      <div className="flex flex-col min-[450px]:flex-row gap-6 min-[450px]:items-center">
        <CustomButton onClick={handleClickProduct}>
          <CustomImage
            alt={product.name}
            src={product.image ?? "/products/sample.png"}
            width={width}
            height={height}
            className="self-center"
          />
        </CustomButton>
        <div className="flex-1 min-w-[40%]">
          <div className="mb-3 md:mb-6">
            <h6 className="font-bold mb-1">{product.name}</h6>
            <h6 className="text-sm font-semibold">{product.description}</h6>
          </div>
          <div className="flex flex-col gap-2 text-gray-500 mb-2 md:mb-5">
            <div className="flex items-center">
              <span
                className="inline-block w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
              ></span>
              <span className="ml-2">{product.color}</span>
            </div>
            <div className="flex gap-1 items-center">
              <CustomImage
                alt="truck icon"
                src="/cart/product-card/truck.svg"
                width={16}
                height={16}
                className="shrink-0"
              />
              <p>Free delivery</p>
            </div>
            <div className="flex gap-1 items-center">
              <CustomImage
                alt="verify icon"
                src="/cart/product-card/verify.svg"
                width={16}
                height={16}
                className="shrink-0"
              />
              <p>Guaranteed</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-between items-end gap-4">
            <p className="font-semibold -mb-1">${product.price}</p>
            <div className="flex gap-2 items-end">
              <CustomButton
                onClick={handleDeleteProduct}
                className="flex transition-transform duration-200 active:scale-95"
              >
                <CustomImage
                  alt="trash icon"
                  src="/products/card/trash.svg"
                  width={24}
                  height={24}
                  className="transition-transform duration-200 hover:scale-125 -mb-1 shrink-0"
                />
              </CustomButton>
              <Count product={product} userId={userId} count={count} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
