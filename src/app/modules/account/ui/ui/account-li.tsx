import { CustomImage } from "@/common/components/custom-image/custom-image";
import clsx from "clsx";

interface AccountLiProps {
  text: string;
  path?: string;
  alt: string;
  src: string;
  width?: number;
  height?: number;
  className?: string;
  handleCategoryClick?: (category: string) => void;
}

export function AccountLi({
  text,
  path = "",
  alt,
  src,
  width = 24,
  height = 24,
  className,
  handleCategoryClick = () => {},
}: AccountLiProps) {
  return (
    <li
      className={clsx("flex items-center p-3 lg:p-5 text-xl", className)}
      onClick={() => {
        handleCategoryClick(path);
      }}
    >
      <CustomImage
        alt={alt}
        src={src}
        width={width}
        height={height}
        className="mr-4"
      />
      {text}
    </li>
  );
}
