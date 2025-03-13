import { Product } from "@/common/types/product";
import { ProductCharacteristics } from "@/common/types/product-characteristics";
import { CustomBreadcrumb } from "@/common/components/custom-breadcrumb/custom-breadcrumb";
import { ProductsSortSelect } from "./products-sort-select/products-sort-select";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { ProductsCategoriesList } from "./products-categories-list/products-categories-list";
import { Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { BottomList } from "@/common/components/bottom-list/bottom-list";
import { ProductCard } from "@/common/components/product-card/product-card";
import { ProductsFilter } from "./products-filter/products-filter";

interface ProductsLayoutProps {
  sortType: "priceAsc" | "priceDesc" | "new" | "bestSellers";
  setSortType: Dispatch<
    SetStateAction<"priceAsc" | "priceDesc" | "new" | "bestSellers">
  >;
  sortedProducts: Product[];
  productsCharacteristics: ProductCharacteristics[];
  selectedCategory: string;
  handleCategoryClick: (category: string) => void;
  currentPage: number;
  handlePageChange: (_: unknown, newPage: number) => void;
  filterParams: Record<string, string[]>;
  setFilterParams: Dispatch<SetStateAction<Record<string, string[]>>>;
  handleFiltersChange: (filterType: string, value: string) => void;
}

export function ProductsLayout({
  sortType,
  setSortType,
  sortedProducts,
  productsCharacteristics,
  selectedCategory,
  handleCategoryClick,
  currentPage,
  handlePageChange,
  filterParams,
  setFilterParams,
  handleFiltersChange,
}: ProductsLayoutProps) {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(sortedProducts);

  const itemsPerPage = 12;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProducts, currentPage]);

  const applyFiltersChange = (newFilteredProducts: Product[]) => {
    setFilteredProducts(newFilteredProducts);
  };

  return (
    <div>
      <CustomBreadcrumb />
      <ProductsCategoriesList
        className="px-5 sm:px-10 lg:px-20 xl:px-[100px] mb-6 sm:mb-8 lg:mb-12 overflow-x-auto pb-1 overflow-y-hidden"
        classNameLi="relative after:absolute after:-left-0 after:-bottom-2 hover:after:w-full hover:after:h-[3px] hover:after:bg-blue-500"
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
      />
      <ProductsSortSelect sortType={sortType} setSortType={setSortType} />
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 xl:gap-6">
        <ProductsFilter
          selectedCategory={selectedCategory}
          products={sortedProducts}
          productsCharacteristics={productsCharacteristics}
          applyFiltersChange={applyFiltersChange}
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          handleFiltersChange={handleFiltersChange}
        />
        <ul
          className="list-none mb-4 md:mb-8 grid grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-1 min-[900px]:grid-cols-2 xl:grid-cols-3
        gap-6 max-h-[100vh] overflow-y-auto p-3"
        >
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
                sx={{
                  position: "relative",
                  backgroundColor: "transparent",
                  "&.Mui-selected": {
                    fontWeight: "bold",
                    color: "#3b82f6",
                  },
                  "&.Mui-selected::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-12px",
                    left: 0,
                    width: "100%",
                    height: "1.5px",
                    backgroundColor: "#3b82f6",
                  },
                  "&:hover::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-12px",
                    left: 0,
                    width: "100%",
                    height: "1.5px",
                    backgroundColor: "#3b82f6",
                  },
                  "&:hover": {
                    color: "#3b82f6",
                  },
                }}
              />
            )}
          />
        )}
      </div>
      <BottomList />
    </div>
  );
}
