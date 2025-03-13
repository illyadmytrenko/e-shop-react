import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/common/shared/redux";
import {
  productsSlice,
  setProductsCategory,
} from "@/app/modules/products/products.slice";
import { useCallback, useState } from "react";
import { DropdownCategoriesList } from "../dropdown-categories-list";
import { ModalWindowProductsCategories } from "@/common/constants/products-categories";

interface DropdownProductsProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function DropdownProducts({
  onMouseEnter,
  onMouseLeave,
}: DropdownProductsProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const category: string = useAppSelector(
    productsSlice.selectors.selectProductCategory
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(category);

  const handleCategoryClick = useCallback(
    (category: string): void => {
      if (location.pathname === "/products") {
        window.location.reload();
        navigate("/products", { state: { category } });
      } else {
        navigate("/products", { state: { category } });
      }
      setSelectedCategory(category);
      dispatch(setProductsCategory({ category }));
    },
    [location.pathname, navigate]
  );

  return (
    <div
      className="lg:absolute lg:top-full lg:left-[25%] lg:bg-white lg:shadow-lg p-4 pr-8 z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <DropdownCategoriesList
        selectedCategory={selectedCategory}
        categories={ModalWindowProductsCategories}
        handleCategoryClick={handleCategoryClick}
        classNameUl="grid grid-cols-1 min-[600px]:grid-cols-2 gap-3 md:gap-6 lg:gap-8"
        classNameLi="!flex-row hover:text-blue-500 gap-2 md:gap-4"
        classNameImg="shrink-0"
      />
    </div>
  );
}
