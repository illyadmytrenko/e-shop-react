import { CustomButton } from "@/common/components/custom-button/custom-button";
import { Logo } from "@/common/components/images/logo";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import { HeaderLink } from "./ui/header-link";

interface NavbarProps {
  currentPath: string;
  isBurgerMenuOpen: boolean;
  burgerMenuClosing: boolean;
  toggleBurgerMenu: (isOpen: boolean) => void;
  isDropdownProductsOpen: boolean;
  toggleDropdownProducts: (isOpen: boolean) => void;
}

export function Navbar({
  currentPath,
  isBurgerMenuOpen,
  burgerMenuClosing,
  toggleBurgerMenu,
  isDropdownProductsOpen,
  toggleDropdownProducts,
}: NavbarProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex lg:hidden items-center">
        <CustomButton onClick={() => toggleBurgerMenu(isBurgerMenuOpen)}>
          <div className="flex flex-col gap-1">
            <span className="block w-5 h-0.5 bg-black"></span>
            <span className="block w-5 h-0.5 bg-black"></span>
            <span className="block w-5 h-0.5 bg-black"></span>
          </div>
        </CustomButton>
      </div>
      <nav>
        <ul className="hidden lg:flex gap-[60px] text-lg">
          <HeaderLink currentPath={currentPath} link="home" name="Home" />
          <HeaderLink
            currentPath={currentPath}
            link="products"
            name="Products"
            onMouseEnter={() => toggleDropdownProducts(isDropdownProductsOpen)}
            onMouseLeave={() => toggleDropdownProducts(isDropdownProductsOpen)}
            isDropdownOpen={isDropdownProductsOpen}
          />
          <HeaderLink currentPath={currentPath} link="faqs" name="FAQ" />
          <HeaderLink
            currentPath={currentPath}
            link="contact-us"
            name="Contact Us"
          />
        </ul>
      </nav>
      <nav
        className={`lg:hidden absolute top-0 left-0 h-screen min-w-[50%] md:min-w-[40%] bg-white p-4 pr-6 md:pr-10 z-50
          ${
            isBurgerMenuOpen
              ? "block overflow-y-scroll animate-slide-in"
              : "hidden"
          } ${burgerMenuClosing ? "animate-slide-out" : ""}`}
      >
        <div className="flex justify-between items-center mb-5">
          <Logo />
          <CustomButton
            className="cursor-pointer"
            onClick={() => toggleBurgerMenu(isBurgerMenuOpen)}
          >
            <CustomImage
              alt="close icon"
              src="/header/modal-window/close-circle.svg"
              width={24}
              height={24}
            />
          </CustomButton>
        </div>
        <ul className="flex flex-col gap-4 text-lg">
          <HeaderLink currentPath={currentPath} link="home" name="Home" />
          <HeaderLink
            currentPath={currentPath}
            link="products"
            name="Products"
            onMouseEnter={() => toggleDropdownProducts(isDropdownProductsOpen)}
            onMouseLeave={() => toggleDropdownProducts(isDropdownProductsOpen)}
            isDropdownOpen={isDropdownProductsOpen}
          />
          <HeaderLink currentPath={currentPath} link="faqs" name="FAQ" />
          <HeaderLink
            currentPath={currentPath}
            link="contact-us"
            name="Contact Us"
          />
        </ul>
      </nav>
    </div>
  );
}
