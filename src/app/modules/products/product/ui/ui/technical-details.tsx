import { ProductCharacteristics } from "@/common/types/product-characteristics";
import { useMemo } from "react";
import { FilterCategories } from "@/common/constants/filter-categories";

interface TechnicalDetailsProps {
  productCharacteristics: ProductCharacteristics;
  productCategory: string;
}

export function TechnicalDetails({
  productCharacteristics,
  productCategory,
}: TechnicalDetailsProps) {
  const filterCategory = useMemo(
    () =>
      FilterCategories.find((category) => category.name === productCategory),
    [productCategory]
  );

  return (
    <div>
      <h5 className="mb-4 text-xl font-medium">Technical Details</h5>
      <table className="text-left mb-6 md:mb-8 text-gray-500 w-full md:w-2/3">
        <tbody>
          {Object.entries(productCharacteristics)
            .filter(([key]) => key !== "id" && key !== "productId")
            .map(([key, value], index) => (
              <tr
                key={key}
                className={`p-4 ${index % 2 !== 0 ? "bg-gray-200" : ""}`}
              >
                <td className="font-semibold capitalize">
                  {filterCategory?.[key as keyof typeof filterCategory] ||
                    key.replace(/_/g, " ")}
                </td>
                <td className="pl-5">{value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
