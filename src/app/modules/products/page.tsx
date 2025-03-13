"use client";

import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/common/shared/redux";
import { productsSlice } from "./products.slice";
import { useMemo, useState, useCallback } from "react";
import { productsApi, productsCharacteristicsApi } from "./api";
import { ProductsLayout } from "./ui/products-layout";

export default function Products() {
  const location = useLocation();
  const category: string = useAppSelector(
    productsSlice.selectors.selectProductCategory
  );
  const categoryFromLocation = location.state?.category ?? category;
  const sortTypeFromLocation = location.state?.sortType ?? "priceAsc";

  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState<
    "priceAsc" | "priceDesc" | "new" | "bestSellers"
  >(sortTypeFromLocation);
  const [selectedCategory, setSelectedCategory] =
    useState<string>(categoryFromLocation);
  const [filterParams, setFilterParams] = useState<Record<string, string[]>>(
    {}
  );

  const { data: products, isLoading: productsLoading } =
    productsApi.useGetProductsQuery();
  const { data: productsCharacteristics, isLoading: characteristicsLoading } =
    productsCharacteristicsApi.useGetCharacteristicsQuery();
  const isLoading = productsLoading || characteristicsLoading;

  const filteredProducts = useMemo(() => {
    return (
      products?.filter((product) => product.category === selectedCategory) ?? []
    );
  }, [products, selectedCategory]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortType) {
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "new":
          return (
            new Date(b.releaseDate).getTime() -
            new Date(a.releaseDate).getTime()
          );
        case "bestSellers":
          return (b.sellsAmount ?? 0) - (a.sellsAmount ?? 0);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortType]);

  const handleCategoryClick = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      setCurrentPage(1);
      setFilterParams(
        Object.keys(filterParams).reduce(
          (acc, key) => ({ ...acc, [key]: [] }),
          {}
        )
      );
    },
    [filterParams]
  );

  const handlePageChange = useCallback((_: unknown, newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const handleFiltersChange = useCallback(
    (filterType: keyof typeof filterParams, value: string) => {
      setFilterParams((prevParams) => {
        const valueAsString = value.toString();
        const currentFilters = prevParams[filterType] ?? [];

        const updatedFilters = currentFilters.includes(valueAsString)
          ? currentFilters.filter((item) => item !== valueAsString)
          : [...currentFilters, valueAsString];

        return { ...prevParams, [filterType]: updatedFilters };
      });

      setCurrentPage(1);
    },
    []
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <ProductsLayout
      sortType={sortType}
      setSortType={setSortType}
      sortedProducts={sortedProducts}
      productsCharacteristics={productsCharacteristics ?? []}
      selectedCategory={selectedCategory}
      handleCategoryClick={handleCategoryClick}
      currentPage={currentPage}
      handlePageChange={handlePageChange}
      filterParams={filterParams}
      setFilterParams={setFilterParams}
      handleFiltersChange={handleFiltersChange}
    />
  );
}
