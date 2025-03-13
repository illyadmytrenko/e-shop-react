import { FAQItem } from "@/common/types/faq-item";
import { CustomBreadcrumb } from "@/common/components/custom-breadcrumb/custom-breadcrumb";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import { FAQList } from "./ui/faqs-list";
import { FAQFilteredItems } from "./ui/faqs-filtered";

interface FAQLayoutProps {
  categories: string[];
  selectedCategory: string;
  onClickOnCategory: (category: string) => void;
  filteredFaqItems: FAQItem[];
  toggleVisibility: (index: number) => void;
  openIndexes: boolean[];
}

export function FAQLayout({
  categories,
  selectedCategory,
  onClickOnCategory,
  filteredFaqItems,
  toggleVisibility,
  openIndexes,
}: FAQLayoutProps) {
  return (
    <div>
      <CustomBreadcrumb/>
      <div className="px-2 md-px:6 lg:px-20 xl:px-[100px]">
        <div className="flex justify-center mb-5 sm:mb-8 lg:mb-12">
          <CustomImage
            alt="faq image"
            src="/faqs/faq.png"
            width={1016}
            height={426}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-10">
          <aside className="block">
            <h5 className="text-xl font-bold mb-4">Table of Contents</h5>
            <nav>
              <FAQList
                categories={categories}
                selectedCategory={selectedCategory}
                onClickOnCategory={onClickOnCategory}
              />
            </nav>
          </aside>
          <FAQFilteredItems
            filteredFaqItems={filteredFaqItems}
            toggleVisibility={toggleVisibility}
            openIndexes={openIndexes}
          />
        </div>
      </div>
    </div>
  );
}
