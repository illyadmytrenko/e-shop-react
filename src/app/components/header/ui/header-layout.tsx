import { Product } from "@/common/types/product";
import { UserInfo } from "@/common/types/user-info";
import { Logo } from "@/common/components/images/logo";
import { Navbar } from "./ui/navbar";
import { CustomButton } from "@/common/components/custom-button/custom-button";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import clsx from "clsx";
import { DropdownProducts } from "./modal-window/dropdown-products/dropdown-products";
import { ModalWindowSearch } from "./modal-window/modal-window-search/modal-window-search";
import { DropdownCart } from "./modal-window/dropdown-cart/dropdown-cart";
import { DropdownAccount } from "./modal-window/dropdown-account/dropdown-account";
import { ModalWindowAccount } from "./modal-window/modal-window-account/modal-window-account";

interface HeaderLayoutProps {
  currentPath: string;
  chosenProducts: Product[];
  userInfo: UserInfo | null;
  products: Product[];
  isBurgerMenuOpen: boolean;
  burgerMenuClosing: boolean;
  toggleBurgerMenu: (isOpen: boolean) => void;
  isDropdownProductsOpen: boolean;
  toggleDropdownProducts: (isOpen: boolean) => void;
  isModalSearchOpen: boolean;
  toggleSearchModal: (isOpen: boolean) => void;
  isDropdownCartOpen: boolean;
  toggleDropdownCart: (isOpen: boolean) => void;
  handleCartButtonClick: () => void;
  isDropdownAccountOpen: boolean;
  isModalAccountOpen: boolean;
  toggleDropdownAccount: (isOpen: boolean) => void;
  toggleAccountModal: (isOpen: boolean) => void;
  handleAccountButtonClick: () => void;
}

export function HeaderLayout({
  chosenProducts,
  userInfo,
  products,
  currentPath,
  isBurgerMenuOpen,
  burgerMenuClosing,
  toggleBurgerMenu,
  isDropdownProductsOpen,
  toggleDropdownProducts,
  isModalSearchOpen,
  toggleSearchModal,
  isDropdownCartOpen,
  toggleDropdownCart,
  handleCartButtonClick,
  isDropdownAccountOpen,
  isModalAccountOpen,
  toggleDropdownAccount,
  toggleAccountModal,
  handleAccountButtonClick,
}: HeaderLayoutProps) {
  return (
    <header
      className="flex justify-between items-center py-6 lg:py-3 px-7 md:px-[60px] lg:px-[100px] xl:px-[120px] relative after:absolute w-full after:w-full after:h-[2px] 
      after:bg-blue-300 after:left-0 after:bottom-0 bg-white"
    >
      <Logo className="hidden lg:block" />
      <Navbar
        currentPath={currentPath}
        isBurgerMenuOpen={isBurgerMenuOpen}
        burgerMenuClosing={burgerMenuClosing}
        toggleBurgerMenu={toggleBurgerMenu}
        isDropdownProductsOpen={isDropdownProductsOpen}
        toggleDropdownProducts={toggleDropdownProducts}
      />
      <div className="flex gap-4">
        <CustomButton onClick={() => toggleSearchModal(isModalSearchOpen)}>
          <CustomImage
            alt="search icon"
            src="/header/search-normal.svg"
            width={24}
            height={24}
          />
        </CustomButton>
        <CustomButton
          onClick={handleCartButtonClick}
          handleMouseEnter={() => toggleDropdownCart(isDropdownCartOpen)}
          handleMouseLeave={() => toggleDropdownCart(isDropdownCartOpen)}
          isDropdownOpen={isDropdownCartOpen}
        >
          <div
            data-amount={chosenProducts.length}
            className={clsx(
              "relative",
              chosenProducts.length > 0 &&
                "after:absolute after:z-[40] after:w-6 after:h-6 after:bg-blue-600 after:rounded-full after:-bottom-4 after:-right-2 after:flex after:items-center after:justify-center after:text-white after:font-bold after:text-xs after:content-[attr(data-amount)]"
            )}
          >
            <CustomImage
              alt="bag icon"
              src="/header/bag.svg"
              width={24}
              height={24}
            />
          </div>
        </CustomButton>
        <CustomButton
          onClick={handleAccountButtonClick}
          handleMouseEnter={() => toggleDropdownAccount(isDropdownAccountOpen)}
          handleMouseLeave={() => toggleDropdownAccount(isDropdownAccountOpen)}
          isDropdownOpen={isDropdownAccountOpen}
        >
          <CustomImage
            alt="user icon"
            src="/header/user.svg"
            width={24}
            height={24}
          />
        </CustomButton>
      </div>
      <div className="hidden lg:block">
        {isDropdownProductsOpen && (
          <DropdownProducts
            onMouseEnter={() => toggleDropdownProducts(!isDropdownProductsOpen)}
            onMouseLeave={() => toggleDropdownProducts(isDropdownProductsOpen)}
          />
        )}
      </div>
      {isModalSearchOpen && (
        <ModalWindowSearch
          closeSearchModalWindow={() => toggleSearchModal(isModalSearchOpen)}
          products={products}
        />
      )}
      {isDropdownCartOpen && (
        <DropdownCart
          chosenProducts={chosenProducts}
          userInfo={userInfo}
          products={products}
          handleMouseEnter={() => toggleDropdownCart(!isDropdownCartOpen)}
          handleMouseLeave={() => toggleDropdownCart(isDropdownCartOpen)}
        />
      )}
      {isDropdownAccountOpen && (
        <DropdownAccount
          handleMouseEnter={() => toggleDropdownAccount(!isDropdownAccountOpen)}
          handleMouseLeave={() => toggleDropdownAccount(isDropdownAccountOpen)}
        />
      )}
      {isModalAccountOpen && (
        <ModalWindowAccount
          handleExit={() => toggleAccountModal(isModalAccountOpen)}
        />
      )}
    </header>
  );
}
