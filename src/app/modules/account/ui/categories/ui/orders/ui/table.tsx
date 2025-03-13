import { ReactNode, useState } from "react";

interface CustomThTd {
  children: ReactNode;
  className?: string;
  tooltip?: string;
}

export const CustomTh = ({ children, className = "" }: CustomThTd) => (
  <th className={`p-2 font-semibold ${className}`}>{children}</th>
);

export const CustomTd = ({ children, className, tooltip }: CustomThTd) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <td
      className={`p-2 text-sm relative ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && tooltip && (
        <div className="absolute left-0 -bottom-2 px-2 py-1 bg-gray-700 text-white text-xs rounded">
          {tooltip}
        </div>
      )}
    </td>
  );
};
