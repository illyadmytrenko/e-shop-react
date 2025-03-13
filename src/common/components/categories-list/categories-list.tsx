import { Category } from "@/common/types/category";
import clsx from "clsx";
import { CustomImage } from "../custom-image/custom-image";

interface CategoriesListProps {
  categories: Category[] | (() => Category[]);
  handleCategoryClick: (category: string) => void;
  selectedCategory?: string;
  isDropdown?: boolean;
  className?: string;
  classNameUl?: string;
  classNameLi?: string;
  classNameImg?: string;
  classNameSpan?: string;
  width?: number;
  height?: number;
}

export function CategoriesList({
  categories,
  handleCategoryClick,
  selectedCategory = "",
  isDropdown = false,
  className = "",
  classNameUl = "",
  classNameLi = "",
  classNameImg = "",
  classNameSpan = "",
  width = 0,
  height = 0,
}: CategoriesListProps) {
  const categoryList =
    typeof categories === "function" ? categories() : categories;

  return (
    <nav className={className}>
      <ul
        className={clsx(
          "flex justify-between gap-4 md:gap-6 text-xl text-gray-700",
          classNameUl
        )}
      >
        {categoryList.map((category) => (
          <li
            data-amount={category.amount}
            key={category.name}
            className={clsx(
              "flex flex-col items-center cursor-pointer relative",
              selectedCategory === category.name &&
                !isDropdown &&
                "after:absolute after:left-0 after:-bottom-[2px] after:bg-blue-500 after:w-full after:h-[3px] after:z-10 before:!bg-blue-600",
              selectedCategory === category.category &&
                isDropdown &&
                "text-blue-500",
              classNameLi,
              category.amount !== undefined &&
                "before:absolute before:z-[40] before:w-5 before:h-5 before:bg-gray-300 before:rounded-full before:top-1 before:right-5 before:flex before:items-center before:justify-center before:text-white before:font-bold before:text-xs before:content-[attr(data-amount)]",
              category.category === "Log out" && "hover:text-red-600"
            )}
            onClick={() => handleCategoryClick(category.category ?? "")}
          >
            <CustomImage
              alt={category.alt ?? ""}
              src={category.src ?? ""}
              width={width}
              height={height}
              className={classNameImg}
            />
            <div
              className={`shrink flex flex-col text-center gap-1 ${classNameSpan}`}
            >
              <span>{category.name}</span>
              {category.subname && (
                <span className="text-sm">{category.subname}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
