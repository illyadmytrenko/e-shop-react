"use client";

import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Order } from "@/common/types/order";
import { ordersApi } from "../../../../api";
import { CategoryTop } from "../category-top";
import { CategoriesList } from "@/common/components/categories-list/categories-list";
import { CustomButton } from "@/common/components/custom-button/custom-button";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import { CustomTd, CustomTh } from "./ui/table";
import { NoItemsSample } from "@/common/components/no-items-sample/no-items-sample";
import { productsApi } from "@/app/modules/products/api";

interface PageProps {
  userId: never;
}

export default function Orders({ userId }: PageProps) {
  const navigate = useNavigate();
  const [chosenCategory, setChosenCategory] = useState("Current");

  const { data: products, isLoading: productsLoading } =
    productsApi.useGetProductsQuery();

  const { data: orders = [], isLoading: ordersLoading } =
    ordersApi.useGetOrdersQuery(userId);

  const filteredOrders: Order[] = useMemo(() => {
    return orders.filter((order) => order.orderStatus === chosenCategory);
  }, [orders, chosenCategory]);

  const categories = useMemo(() => {
    const statuses = ["Current", "Delivered", "Canceled", "Returned"];
    return statuses.map((status) => ({
      name: status,
      category: status,
      amount: orders.filter((order) => order.orderStatus === status).length,
    }));
  }, [orders]);

  if (ordersLoading || productsLoading) return <div>Loading...</div>;

  return (
    <div>
      <CategoryTop h5="Order History" p="Track your orders" />
      <CategoriesList
        categories={categories}
        selectedCategory={chosenCategory}
        handleCategoryClick={setChosenCategory}
        className="relative after:absolute after:w-full after:h-[3px] after:bg-gray-300 after:left-0 after:-bottom-[0px]
        mb-6 md:mb-10"
        classNameUl="flex !gap-0 justify-stretch overflow-x-auto pb-1"
        classNameLi="hover:text-blue-500 hover:after:bg-blue-500 after:absolute after:left-0 after:-bottom-[3px] after:bg-blue-500
          hover:after:w-full hover:after:h-[3px] hover:before:!bg-blue-600 after:z-10 pr-12 pl-1 text-gray-500 text-xl"
      />
      <div className="max-h-[60vh] overflow-y-auto">
        {filteredOrders.length > 0 ? (
          <table className="min-w-[600px] md:min-w-0 w-full overflow-x-auto table-auto text-center bg-gray-100">
            <thead>
              <tr className="border-b-2 border-gray-500">
                <CustomTh>Placed on</CustomTh>
                <CustomTh>Total</CustomTh>
                <CustomTh>Sent to</CustomTh>
                <CustomTh>Products</CustomTh>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(
                ({
                  orderId,
                  productsIds,
                  orderDate,
                  totalPrice,
                  userAddress,
                  userName,
                }) => (
                  <tr
                    key={orderId}
                    className="border-b-2 last:border-none border-gray-500"
                  >
                    <CustomTd>{orderDate.slice(0, 10)}</CustomTd>
                    <CustomTd>${totalPrice}.00</CustomTd>
                    <CustomTd tooltip={userAddress}>{userName}</CustomTd>
                    <CustomTd className="flex gap-2 justify-center overflow-x-auto">
                      {productsIds.split(",").map((productId: string) => {
                        const product = products?.find(
                          (p) => p.id === Number(productId)
                        );
                        return product ? (
                          <CustomButton
                            key={product.id}
                            onClick={() => navigate(`/products/${product.id}`)}
                            className="shrink-0"
                          >
                            <CustomImage
                              alt="ordered product image"
                              src={product.image || "/products/sample.png"}
                              width={120}
                              height={120}
                            />
                          </CustomButton>
                        ) : null;
                      })}
                    </CustomTd>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : (
          <NoItemsSample h3="Empty" p="This page is empty" />
        )}
      </div>
    </div>
  );
}
