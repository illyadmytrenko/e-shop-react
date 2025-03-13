import { Product } from "@/common/types/product";
import { UserInfo } from "@/common/types/user-info";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/common/shared/redux";
import { productsSlice } from "@/app/modules/products/products.slice";
import { ProductCardCart } from "@/common/components/product-card-cart/product-card-cart";
import { NoItemsSample } from "@/common/components/no-items-sample/no-items-sample";
import { CustomButton } from "@/common/components/custom-button/custom-button";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import { useCallback } from "react";

interface DropdownCartProps {
  chosenProducts: Product[];
  userInfo: UserInfo | null;
  products: Product[];
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export function DropdownCart({
  chosenProducts,
  userInfo,
  products,
  handleMouseEnter,
  handleMouseLeave,
}: DropdownCartProps) {
  const navigate = useNavigate();

  const chosenProductsAmount: number = chosenProducts.length;
  const subtotal: number = useAppSelector((state) =>
    productsSlice.selectors.selectChosenProductsTotalPrice(
      state,
      userInfo?.userId ?? 0,
      products
    )
  );

  const handleButtonClick = useCallback(() => navigate("/cart"), [navigate]);

  return (
    <div
      className="absolute flex flex-col top-full right-0 md:right-[5%] lg:right-[10%] max-w-[550px] w-full min-[450px]:w-auto md:min-w-[450px]
      bg-white shadow-lg p-3 sm:p-6 z-50 h-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className="text-lg mb-3">
        {chosenProductsAmount} {chosenProductsAmount === 1 ? "item" : "items"}
      </p>
      {chosenProductsAmount > 0 && (
        <>
          <div className="flex flex-col gap-4 mb-6 p-3 max-h-[65vh] min-[450px]:max-h-[300px] overflow-y-auto">
            {chosenProducts.map((product) => (
              <ProductCardCart
                key={product.id}
                product={product}
                width={154}
                height={120}
              />
            ))}
          </div>
          <div className="flex justify-between items-center gap-4 min-[450px]:h-auto">
            <div className="flex flex-col">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal}</span>
            </div>
            <CustomButton
              variant="blue"
              size="md"
              className="flex items-center gap-3"
              onClick={handleButtonClick}
            >
              <span>Proceed to Cart</span>
              <CustomImage
                alt="cart icon"
                src="/header/modal-window/shopping-cart.svg"
                width={24}
                height={24}
              />
            </CustomButton>
          </div>
        </>
      )}
      {chosenProductsAmount < 1 && (
        <NoItemsSample
          h3="Empty"
          p="Looks like you haven't added anything to your cart yet"
        />
      )}
    </div>
  );
}
