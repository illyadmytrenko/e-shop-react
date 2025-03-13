"use client";

import { useAppSelector } from "@/common/shared/redux";
import { productsSlice } from "@/app/modules/products/products.slice";
import { productsApi } from "@/app/modules/products/api";
import { CategoryTop } from "../category-top";
import { ProductCard } from "@/common/components/product-card/product-card";
import { NoItemsSample } from "@/common/components/no-items-sample/no-items-sample";

interface PageProps {
  userId: number;
}

export default function WishList({ userId }: PageProps) {
  const products = productsApi.useGetProductsQuery().data ?? [];

  const likedProductsList = useAppSelector((state) =>
    productsSlice.selectors.selectLikedProducts(state, userId, products)
  );

  return (
    <div>
      <CategoryTop h5="Wish List" p="See your favorites list here" />
      {likedProductsList.length !== 0 ? (
        <div className="grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6 max-h-[60vh] overflow-y-auto p-3">
          {likedProductsList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <NoItemsSample h3="Empty" p="Looks like your wish list is empty" />
      )}
    </div>
  );
}
