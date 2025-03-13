import { Product } from "@/common/types/product";
import { CustomButton } from "@/common/components/custom-button/custom-button";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import { CustomInput } from "@/common/components/custom-input/custom-input";
import { ProductCard } from "@/common/components/product-card/product-card";
import { MostSearchedItem } from "@/common/types/most-searched";
import { NoItemsSample } from "@/common/components/no-items-sample/no-items-sample";

interface ModalWindowSearchLayoutProps {
  searchString: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  closeSearchModalWindow: () => void;
  chooseMostSearchedItem: (name: string) => void;
  mostSearchedItems: MostSearchedItem[];
  mostUsedKeywords: MostSearchedItem[];
  shownProducts: Product[];
}

export function ModalWindowSearchLayout({
  searchString,
  handleChange,
  closeSearchModalWindow,
  chooseMostSearchedItem,
  mostSearchedItems,
  mostUsedKeywords,
  shownProducts,
}: ModalWindowSearchLayoutProps) {
  return (
    <div
      className="fixed top-1/2 left-1/2 bg-white shadow-lg p-4 sm:p-8 z-50 transform -translate-x-1/2 -translate-y-1/2
      w-screen sm:w-auto sm:min-w-[600px] h-screen sm:h-auto"
    >
      <div className="flex justify-between items-center mb-5 gap-3">
        <CustomInput
          name="search"
          type="text"
          value={searchString}
          placeholder="What can we help you to find?"
          className="p-2 sm:p-4 pr-10 border-2 border-gray-600 text-gray-600 border-solid rounded-md"
          classNameDiv="w-[80%] min-w-[220px] sm:min-w-auto"
          onChange={handleChange}
          itemAfter={
            <CustomImage
              alt="search icon"
              src="/header/modal-window/search-normal.svg"
              width={24}
              height={24}
              className="!absolute top-[24%] sm:top-[30%] right-3"
            />
          }
        />
        <CustomButton onClick={closeSearchModalWindow}>
          <CustomImage
            alt="close icon"
            src="/header/modal-window/close-circle.svg"
            width={24}
            height={24}
          />
        </CustomButton>
      </div>
      <div>
        {searchString === "" && (
          <div className="flex flex-wrap sm:flex-nowrap gap-10">
            <div>
              <h5 className="text-2xl font-bold mb-3">Most searched items</h5>
              <ul className="grid grid-cols-2 gap-3 sm:gap-5">
                {mostSearchedItems.map((item) => (
                  <li
                    key={item.name}
                    className="text-lg cursor-pointer"
                    onClick={() => chooseMostSearchedItem(item.name)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-2xl font-bold mb-3">Most used keywords</h5>
              <ul className="grid grid-cols-2 gap-3 sm:gap-5">
                {mostUsedKeywords.map((keyword) => (
                  <li
                    key={keyword.name}
                    className="text-lg cursor-pointer"
                    onClick={() => chooseMostSearchedItem(keyword.name ?? "")}
                  >
                    {keyword.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {shownProducts.length > 0 && (
          <ul className="grid grid-grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10 p-3 overflow-y-scroll max-h-[85vh] sm:max-h-[50vh] ">
            {shownProducts.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
        {shownProducts.length === 0 && searchString !== "" && (
          <NoItemsSample p="Looks like there are no results, we apologize" />
        )}
      </div>
    </div>
  );
}
