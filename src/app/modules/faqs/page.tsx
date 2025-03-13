"use client";

import { useMemo, useState } from "react";
import { FaqItems } from "@/common/constants/faq-items";
import { FAQItem } from "@/common/types/faq-item";
import { FAQLayout } from "./ui/faqs-layout";

export default function FAQ() {
  const categories: string[] = useMemo(
    () =>
      Array.from(new Set(FaqItems.map((item) => item.category))) as Array<
        "General" | "Trust & Safety" | "Services" | "Billing"
      >,
    []
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );
  const filteredFaqItems: FAQItem[] = useMemo(
    () => FaqItems.filter((item) => item.category === selectedCategory),
    [selectedCategory]
  );

  const [openIndexes, setOpenIndexes] = useState<boolean[]>(
    new Array(filteredFaqItems.length).fill(false)
  );

  const toggleVisibility = (index: number): void => {
    setOpenIndexes((prev) =>
      prev.map((_, i) => (i === index ? !prev[index] : false))
    );
  };

  const onClickOnCategory = (category: string): void => {
    setSelectedCategory(category);
    setOpenIndexes(new Array(filteredFaqItems.length).fill(false));
  };

  return (
    <FAQLayout
      categories={categories}
      selectedCategory={selectedCategory}
      onClickOnCategory={onClickOnCategory}
      filteredFaqItems={filteredFaqItems}
      toggleVisibility={toggleVisibility}
      openIndexes={openIndexes}
    />
  );
}
