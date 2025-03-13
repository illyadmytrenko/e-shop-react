import clsx from "clsx";

interface FAQListProps {
  categories: string[];
  selectedCategory: string;
  onClickOnCategory: (category: string) => void;
}

export function FAQList({
  categories,
  selectedCategory,
  onClickOnCategory,
}: FAQListProps) {
  return (
    <ul className="flex flex-row md:flex-col gap-3 text-lg flex-wrap">
      {categories.map((category) => (
        <li
          key={category}
          className={clsx(
            "cursor-pointer hover:text-blue-500",
            selectedCategory === category && "text-blue-500"
          )}
          onClick={() => onClickOnCategory(category)}
        >
          {category}
        </li>
      ))}
    </ul>
  );
}
