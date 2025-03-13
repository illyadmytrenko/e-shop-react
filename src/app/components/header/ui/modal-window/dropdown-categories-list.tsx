import { Category } from "@/common/types/category";
import { CategoriesList } from "@/common/components/categories-list/categories-list";

interface DropdownCategoriesListProps {
  categories: Category[] | (() => Category[]);
  handleCategoryClick: (category: string) => void;
  selectedCategory?: string;
  className?: string;
  classNameUl?: string;
  classNameLi?: string;
  classNameImg?: string;
  classNameSpan?: string;
}

export function DropdownCategoriesList({
  categories,
  handleCategoryClick,
  selectedCategory,
  className,
  classNameUl,
  classNameLi,
  classNameImg,
  classNameSpan,
}: DropdownCategoriesListProps) {
  return (
    <CategoriesList
      categories={categories}
      handleCategoryClick={handleCategoryClick}
      selectedCategory={selectedCategory}
      width={24}
      height={24}
      isDropdown={true}
      className={className}
      classNameUl={classNameUl}
      classNameLi={classNameLi}
      classNameImg={classNameImg}
      classNameSpan={classNameSpan}
    />
  );
}
