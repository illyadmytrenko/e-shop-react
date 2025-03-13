import { CustomButton } from "@/common/components/custom-button/custom-button";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import clsx from "clsx";

interface AccountInputProps {
  isBeforeImage?: boolean;
  alt?: string;
  src?: string;
  placeholder: string | number;
  className?: string;
  handleInputClick: () => void;
  error?: string;
}

export function AccountInput({
  isBeforeImage = true,
  alt = "",
  src = "",
  placeholder,
  className,
  handleInputClick,
  error,
}: AccountInputProps) {
  return (
    <div className="flex flex-col">
      <div
        className={clsx(
          "flex bg-gray-100 p-4 xl:p-6 justify-between rounded-md gap-2 items-center",
          className
        )}
      >
        <div className="flex gap-2 overflow-hidden">
          {isBeforeImage && (
            <CustomImage
              alt={alt}
              src={src}
              width={24}
              height={24}
              className="flex-shrink-0"
            />
          )}
          <p className="text-gray-500">{placeholder}</p>
        </div>
        <CustomButton onClick={handleInputClick} className="flex-shrink-0">
          <CustomImage
            alt="edit icon"
            src="/account/edit.svg"
            width={24}
            height={24}
          />
        </CustomButton>
      </div>
      {error && (
        <p className="text-red-500 text-sm font-bold pl-2 mt-1">{error}</p>
      )}
    </div>
  );
}
