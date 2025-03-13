import { CustomImage } from "@/common/components/custom-image/custom-image";
import { Dispatch, SetStateAction, useState } from "react";

interface ProductsFiltersBlockProps {
  text: string;
  filtersWithCounts: Record<string, number>;
  handleFiltersChange: (filterType: string, value: string) => void;
  filterType: string;
  filterParams: Record<string, string[]>;
  setFilterParams: Dispatch<SetStateAction<Record<string, string[]>>>;
}

export function ProductsFiltersBlock({
  text,
  filtersWithCounts,
  handleFiltersChange,
  filterType,
  filterParams,
  setFilterParams,
}: ProductsFiltersBlockProps) {
  const [isOpen, setIsOpen] = useState(false);

  const upperText = text.charAt(0).toUpperCase() + text.slice(1);

  const toggleVisibility = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFilterParams((prevState) => ({
        ...prevState,
        [filterType]: [],
      }));
    }
  };


  return (
    <div className="mb-6 mt-2 relative after:absolute after:w-full after:h-[1px] after:bg-gray-300 after:-bottom-3">
      <div
        className="flex justify-between cursor-pointer"
        onClick={() => toggleVisibility()}
      >
        <span className="text-xl">{upperText}</span>
        <CustomImage
          alt="arrow-down"
          className={`transition-transform transform ${
            isOpen ? "rotate-180" : ""
          }`}
          src="/faqs/arrow-down.svg"
          width={24}
          height={24}
          style={{
            filter: isOpen
              ? "invert(33%) sepia(100%) saturate(750%) hue-rotate(180deg)"
              : "none",
          }}
        />
      </div>
      {isOpen && (
        <ul className="flex flex-col gap-1">
          {Object.entries(filtersWithCounts).map(([filter, count]) => (
            <li key={filter} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filterParams[filterType].includes(filter)}
                onChange={() => handleFiltersChange(filterType, filter)}
                className="w-5 h-5"
              />
              <p className="text-xl">
                {filter}
                <span className="text-gray-400 inline-block ml-1">
                  ({count})
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductsFiltersBlock;
