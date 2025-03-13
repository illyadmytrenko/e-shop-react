import clsx from "clsx";
import { Link } from "react-router-dom";
import { DropdownProducts } from "../../modal-window/dropdown-products/dropdown-products";

interface HeaderLinkProps {
  currentPath: string;
  link: string;
  name: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isDropdownOpen?: boolean;
}

export function HeaderLink({
  currentPath,
  link,
  name,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  isDropdownOpen,
}: HeaderLinkProps) {
  return (
    <li
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clsx(
        "relative after:absolute after:-left-0 after:-bottom-2 hover:text-blue-500 lg:hover:after:w-full lg:hover:after:h-[1.5px] lg:hover:after:bg-blue-500 transition-colors",
        (currentPath === `/${link}` || isDropdownOpen) &&
          "text-blue-500 lg:after:bg-blue-500 lg:after:w-full lg:after:h-[1.5px]"
      )}
    >
      <Link to={link}>{name}</Link>
      {isDropdownOpen && (
        <>
          <div className="hidden lg:block absolute top-full left-0 w-full h-12 opacity-100 bg-white p-4" />
          <div className="block lg:hidden">
            <DropdownProducts
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          </div>
        </>
      )}
    </li>
  );
}
