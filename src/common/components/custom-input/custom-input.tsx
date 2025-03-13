import clsx from "clsx";
import { ReactNode } from "react";

interface CustomInputProps {
  name: string;
  id?: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string;
  classNameDiv?: string;
  error?: string;
  itemBefore?: ReactNode;
  itemAfter?: ReactNode;
  checked?: boolean;
}

export function CustomInput({
  name,
  id = "",
  type,
  placeholder = "",
  value,
  onChange,
  className = "",
  classNameDiv,
  error,
  itemBefore,
  itemAfter,
  checked = false,
}: CustomInputProps) {
  return (
    <div className={clsx("flex flex-col relative", classNameDiv)}>
      <input
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx(
          "hover:border-blue-500",
          className,
          error && "border-red-500"
        )}
        checked={checked}
      />
      {error && (
        <p className="text-red-500 text-sm font-bold pl-2 mt-1">{error}</p>
      )}
      {itemBefore}
      {itemAfter}
    </div>
  );
}
