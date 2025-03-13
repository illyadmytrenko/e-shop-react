import { Product } from "@/common/types/product";
import { ProductCharacteristics } from "@/common/types/product-characteristics";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import ProductsFiltersBlock from "./ui/products-filters-block";
import { FilterCategories } from "@/common/constants/filter-categories";

interface ProductsFilterProps {
  selectedCategory: string;
  products: Product[];
  productsCharacteristics: ProductCharacteristics[];
  applyFiltersChange: (newFilteredProducts: Product[]) => void;
  filterParams: Record<string, string[]>;
  setFilterParams: Dispatch<SetStateAction<Record<string, string[]>>>;
  handleFiltersChange: (filterType: string, value: string) => void;
}

export function ProductsFilter({
  selectedCategory,
  products,
  productsCharacteristics,
  applyFiltersChange,
  filterParams,
  setFilterParams,
  handleFiltersChange,
}: ProductsFilterProps) {
  const [allProducts] = useState<Product[]>(products);

  const filterCategory = useMemo(
    () =>
      FilterCategories.find((category) => category.name === selectedCategory),
    [selectedCategory]
  );

  const getCounts = useCallback(
    (property: string): Record<string, number> => {
      const productIds = new Set(products.map((product) => product.id));
      return productsCharacteristics.reduce<Record<string, number>>(
        (acc, product) => {
          if (!productIds.has(product.id)) return acc;

          const value = product[property as keyof ProductCharacteristics];
          if (typeof value === "string" || typeof value === "number") {
            const key = value.toString();
            acc[key] = (acc[key] || 0) + 1;
          }

          return acc;
        },
        {}
      );
    },
    [products, productsCharacteristics]
  );

  const characteristicsKeys = useMemo(
    () =>
      Object.keys(productsCharacteristics[0] || {}).filter(
        (key) => key !== "productId" && key !== "id"
      ),
    [productsCharacteristics]
  );

  const counts = useMemo(() => {
    return characteristicsKeys.reduce((acc, key) => {
      acc[key] = getCounts(key);
      return acc;
    }, {} as Record<string, Record<string, number>>);
  }, [characteristicsKeys, getCounts]);

  const filteredProducts = useMemo(() => {
    if (!productsCharacteristics) return [];

    return products.filter((product) => {
      const characteristics = productsCharacteristics.find(
        (char) => char.productId === product.id
      );
      if (!characteristics) return false;

      return Object.entries(filterParams).every(
        ([key, values]) =>
          values.length === 0 ||
          values.includes(
            characteristics[key as keyof ProductCharacteristics] as string
          )
      );
    });
  }, [products, productsCharacteristics, filterParams]);

  const clearAllFilters = useMemo(() => {
    if (Object.values(filterParams).every((arr) => arr.length === 0))
      return () => {};
    return () => {
      applyFiltersChange(allProducts);
      setFilterParams(
        Object.keys(filterParams).reduce(
          (acc, key) => ({ ...acc, [key]: [] }),
          {}
        )
      );
    };
  }, [filterParams, allProducts, applyFiltersChange, setFilterParams]);

  useEffect(() => {
    applyFiltersChange(filteredProducts);
  }, [filteredProducts, applyFiltersChange]);

  if (!filterCategory) {
    return <div>Category not found</div>;
  }

  return (
    <div className="rounded-md p-4 shadow-[-1px_1px_5px_3px_#e2e2e2] w-full sm:w-auto sm:min-w-[250px] lg:min-w-[300px] max-h-[90vh] overflow-y-auto">
      <div className="flex gap-3 justify-between">
        <h5 className="text-xl font-bold">Filters</h5>
        <span
          className="text-blue-600 cursor-pointer"
          onClick={clearAllFilters}
        >
          Clear all
        </span>
      </div>
      {characteristicsKeys.map((key) => {
        if (!counts[key] || Object.keys(counts[key]).length === 0) {
          return null;
        }

        return (
          <ProductsFiltersBlock
            key={key}
            text={filterCategory[key as keyof typeof filterCategory] || key}
            filtersWithCounts={counts[key]}
            handleFiltersChange={handleFiltersChange}
            filterType={key}
            filterParams={filterParams}
            setFilterParams={setFilterParams}
          />
        );
      })}
    </div>
  );
}
