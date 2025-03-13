import { Product } from "@/common/types/product";
import { NoItemsSample } from "@/common/components/no-items-sample/no-items-sample";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import { ProductCardCart } from "@/common/components/product-card-cart/product-card-cart";
import { TotalPrice } from "../common/total-price";
import { CustomButton } from "@/common/components/custom-button/custom-button";

interface CartPageProps {
  chosenProducts: Product[];
  subtotal: number;
  serviseCommission: number;
  handleProceedToCheckoutButton: () => void;
}

export function CartPage({
  chosenProducts,
  subtotal,
  serviseCommission,
  handleProceedToCheckoutButton,
}: CartPageProps) {
  return (
    <>
      <CustomImage
        alt="roadmap image"
        src="/cart/roadmap-cart.svg"
        width={520}
        height={100}
        className="flex justify-center my-5 md:my-10"
      />
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 xl:gap-24">
        {chosenProducts.length < 1 && (
          <div className="mx-auto">
            <NoItemsSample
              h3="Empty"
              p="Looks like you haven't added anything to your cart"
            />
          </div>
        )}
        {chosenProducts.length > 0 && (
          <>
            <div className="flex flex-col gap-6 flex-1 max-h-[70vh] lg:max-h-[700px] overflow-y-auto p-5">
              {chosenProducts.map((product) => (
                <ProductCardCart key={product.id} product={product} />
              ))}
            </div>
            <aside className="rounded-md border-2 border-solid border-gray-300 p-6 max-h-[270px] flex flex-col gap-6">
              <h4 className="text-2xl font-bold">Payment details</h4>
              <TotalPrice
                subtotal={subtotal}
                serviseCommission={serviseCommission}
              />
              <CustomButton
                variant="blue"
                size="md"
                onClick={handleProceedToCheckoutButton}
              >
                Proceed to checkout
              </CustomButton>
            </aside>
          </>
        )}
      </div>
    </>
  );
}
