import { HomeCategories } from "@/common/constants/home-categories";
import { CategoriesList } from "@/common/components/categories-list/categories-list";

interface HomeNavigationProps {
  className?: string;
  classNameUl?: string;
  classNameLi?: string;
  classNameImg?: string;
  handleCategoryClick: (category: string) => void;
}

export function HomeNavigation({
  className = "",
  classNameUl = "",
  classNameLi = "",
  classNameImg = "",
  handleCategoryClick,
}: HomeNavigationProps) {
  return (
    <CategoriesList
      className={className}
      classNameUl={classNameUl}
      classNameLi={classNameLi}
      classNameImg={classNameImg}
      handleCategoryClick={handleCategoryClick}
      categories={HomeCategories}
      width={120}
      height={120}
    />
  );
}
