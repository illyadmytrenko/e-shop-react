import { ReactNode } from "react";
import clsx from "clsx";

interface CustomButtonProps {
  children: ReactNode;
  size?: "md" | "sm" | "lg";
  variant?: "orange" | "blue" | "outlined" | "red" | "underline";
  onClick?:
    | (() => void)
    | ((e: React.MouseEvent<HTMLButtonElement>) => void)
    | ((e: React.FormEvent) => void);
  type?: "button" | "submit" | "reset";
  className?: string;
  handleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
  isDropdownOpen?: boolean;
}

export function CustomButton({
  children,
  size,
  variant,
  onClick,
  type,
  className = "",
  handleMouseEnter,
  handleMouseLeave,
  isDropdownOpen,
}: CustomButtonProps) {
  const buttonClassName = clsx(
    "transition-colors relative",
    className,
    {
      sm: "rounded px-4 sm:px-6 py-2",
      md: "rounded-lg px-8 py-2 sm:px-[60px] sm:py-3",
      lg: "rounded-lg px-12 sm:px-20 py-3 sm:py-5",
    }[size!],
    {
      orange: "bg-orange-600 hover:bg-yellow-400 text-white",
      blue: "bg-blue-600 hover:bg-teal-500 text-white",
      outlined:
        "bg-white border-2 border-blue-600 hover:scale-105 text-blue-600",
      red: "bg-red-500 hover:bg-red-300 text-slate-700 border-2 border-black",
      underline:
        "text-gray-400 relative after:absolute after:-left-0 after:-bottom-2 after:w-full after:h-[1.5px] after:bg-gray-400 hover:after:bg-blue-500 hover:text-blue-500 hover:after:bg-blue-500 hover:after:h-[2px] transition-colors",
    }[variant!]
  );

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type={type}
    >
      {children}
      {isDropdownOpen && (
        <div className="absolute top-full -left-1 w-full h-12 opacity-100 bg-white p-4"></div>
      )}
    </button>
  );
}
