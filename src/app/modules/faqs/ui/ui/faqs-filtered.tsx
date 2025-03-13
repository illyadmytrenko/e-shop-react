import { FAQItem } from "@/common/types/faq-item";
import { CustomImage } from "@/common/components/custom-image/custom-image";

interface FAQFilteredItemsProps {
  filteredFaqItems: FAQItem[];
  toggleVisibility: (index: number) => void;
  openIndexes: boolean[];
}

export function FAQFilteredItems({
  filteredFaqItems,
  toggleVisibility,
  openIndexes,
}: FAQFilteredItemsProps) {
  return (
    <div className="flex-1">
      {filteredFaqItems.map((item, index) => (
        <div
          key={index}
          className="relative [&:not(:last-child)]:mb-10 [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:w-full
          [&:not(:last-child)]:after:h-[2px] [&:not(:last-child)]:after:bg-gray-300 [&:not(:last-child)]:after:-bottom-5"
        >
          <div
            className="flex justify-between gap-3 cursor-pointer"
            onClick={() => toggleVisibility(index)}
          >
            <h6 className="text-blue-500 text-2xl font-semibold">
              {item.question}
            </h6>
            <CustomImage
              alt="arrow-down"
              className={`transition-transform transform shrink-0 mt-[2px] self-start ${
                openIndexes[index] ? "rotate-180" : ""
              }`}
              src="/faqs/arrow-down.svg"
              width={24}
              height={24}
              style={{
                filter: openIndexes[index]
                  ? "invert(33%) sepia(100%) saturate(750%) hue-rotate(180deg)"
                  : "none",
              }}
            />
          </div>
          {openIndexes[index] && <p className="text-xl mt-4">{item.answer}</p>}
        </div>
      ))}
    </div>
  );
}
