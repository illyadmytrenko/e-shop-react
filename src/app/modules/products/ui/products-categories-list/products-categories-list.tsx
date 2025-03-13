import { CategoriesList } from "@/common/components/categories-list/categories-list";
import { ProductsCategories } from "@/common/constants/products-categories";

interface ProductsCategoriesListProps {
  className: string;
  classNameLi: string;
  selectedCategory: string;
  handleCategoryClick: (category: string) => void;
}

export function ProductsCategoriesList({
  className,
  classNameLi,
  selectedCategory,
  handleCategoryClick,
}: ProductsCategoriesListProps) {
  return (
    <CategoriesList
      className={className}
      classNameLi={classNameLi}
      selectedCategory={selectedCategory}
      handleCategoryClick={handleCategoryClick}
      categories={ProductsCategories}
      width={50}
      height={50}
    />
  );
}
