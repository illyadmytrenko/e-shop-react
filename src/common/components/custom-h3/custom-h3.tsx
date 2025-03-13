import { ReactNode } from "react";
import clsx from "clsx";

interface CustomH3Props {
  children: ReactNode;
  className?: string;
}

export function CustomH3({ children, className = "" }: CustomH3Props) {
  return (
    <h3
      className={clsx(
        className,
        "font-semibold text-2xl md:text-3xl relative after:absolute after:w-full after:h-[2px] after:bg-gray-300 after:left-0 after:-bottom-2 md:after:-bottom-4 my-6 md:my-12"
      )}
    >
      {children}
    </h3>
  );
}
