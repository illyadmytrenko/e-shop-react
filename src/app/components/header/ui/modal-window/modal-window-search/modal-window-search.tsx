import { Product } from "@/common/types/product";
import { useState, useEffect, useCallback } from "react";
import { ModalWindowSearchLayout } from "./ui/modal-window-search-layout";
import { MostSearchedItems } from "@/common/constants/most-searched-items";
import { MostUsedKeywords } from "@/common/constants/most-used-keywords";

interface ModalWindowSearchProps {
  closeSearchModalWindow: () => void;
  products: Product[];
}

export function ModalWindowSearch({
  closeSearchModalWindow,
  products,
}: ModalWindowSearchProps) {
  const [searchString, setSearchString] = useState<string>("");
  const [shownProducts, setShownProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!searchString.trim()) {
      setShownProducts([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const lowerCasedSearch = searchString.trim().toLowerCase();
      setShownProducts(
        products.filter(
          ({ name, category }) =>
            name.toLowerCase().includes(lowerCasedSearch) ||
            category.toLowerCase().includes(lowerCasedSearch)
        )
      );
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [searchString, products]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setSearchString(e.target.value);
    },
    []
  );

  const chooseMostSearchedItem = useCallback((name: string): void => {
    setSearchString(name);
  }, []);

  return (
    <ModalWindowSearchLayout
      searchString={searchString}
      handleChange={handleChange}
      closeSearchModalWindow={closeSearchModalWindow}
      chooseMostSearchedItem={chooseMostSearchedItem}
      mostSearchedItems={MostSearchedItems}
      mostUsedKeywords={MostUsedKeywords}
      shownProducts={shownProducts}
    />
  );
}
