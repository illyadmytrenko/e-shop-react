import { Product } from "@/common/types/product";
import { useAppDispatch } from "@/common/shared/redux";
import { useCallback } from "react";
import {
  addProductToCart,
  removeProductFromCart,
} from "@/app/modules/products/products.slice";
import { clearCartState } from "@/app/modules/cart/cart.slice";
import { CustomButton } from "../custom-button/custom-button";

interface CountProps {
  product: Product;
  userId: number;
  count: number;
}

export function Count({ product, userId, count }: CountProps) {
  const dispatch = useAppDispatch();

  const updateCart = useCallback(
    (action: "add" | "remove") => {
      dispatch(
        action === "add"
          ? addProductToCart({ userId, productId: product.id })
          : removeProductFromCart({ userId, productId: product.id })
      );
      dispatch(clearCartState({ userId }));
    },
    [dispatch, product.id, userId]
  );

  return (
    <div className="text-gray-500 text-2xl flex gap-3 rounded-md relative after:absolute after:w-full after:h-[1px] after:bg-gray-500 after:-bottom-1">
      <CustomButton
        className="transition-transform duration-200 hover:scale-125"
        onClick={() => updateCart("remove")}
      >
        -
      </CustomButton>
      <span>{count}</span>
      <CustomButton
        className="transition-transform duration-200 hover:scale-125"
        onClick={() => updateCart("add")}
      >
        +
      </CustomButton>
    </div>
  );
}
