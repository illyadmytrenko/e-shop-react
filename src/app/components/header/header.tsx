"use client";

import { usePathname } from "next/navigation";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/common/context/modal-context";
import { useAppSelector } from "@/common/shared/redux";
import { UserInfo } from "@/common/types/user-info";
import { Product } from "@/common/types/product";
import { productsApi } from "@/app/modules/products/api";
import { useCallback, useMemo } from "react";
import { HeaderLayout } from "./ui/header-layout";
import { productsSlice } from "@/app/modules/products/products.slice";
import { userInfoSlice } from "@/app/modules/users/user-info.slice";

export function Header() {
  const navigate = useNavigate();
  const currentPath = usePathname();

  const userInfo: UserInfo | null = useAppSelector(
    userInfoSlice.selectors.selectUserInfo
  );

  const { data: products = [], isLoading: productsLoading } =
    productsApi.useGetProductsQuery();

  const chosenProductsIds: string[] = useAppSelector((state) =>
    productsSlice.selectors.selectChosenProductsIds(
      state,
      userInfo?.userId ?? 0
    )
  );
  const chosenProductsList: Product[] = useMemo(
    () =>
      products.filter((product) =>
        chosenProductsIds.includes(product.id.toString())
      ),
    [products, chosenProductsIds]
  );

  const modalControls = useModal();
  const {
    isBurgerMenuOpen,
    setIsBurgerMenuOpen,
    burgerMenuClosing,
    setBurgerMenuClosing,
    isDropdownProductsOpen,
    setIsDropdownProductsOpen,
    isModalSearchOpen,
    setIsModalSearchOpen,
    isDropdownCartOpen,
    setIsDropdownCartOpen,
    isDropdownAccountOpen,
    setIsDropdownAccountOpen,
    isModalAccountOpen,
    setIsModalAccountOpen,
  } = modalControls;

  const toggleBurgerMenu = useCallback(
    (isOpen: boolean): void => {
      setBurgerMenuClosing(isOpen);
      if (isOpen) {
        setTimeout(() => setIsBurgerMenuOpen(false), 750);
      } else {
        setTimeout(() => setIsBurgerMenuOpen(true));
      }
    },
    [setBurgerMenuClosing, setIsBurgerMenuOpen]
  );

  const toggleModal = useCallback(
    (setter: (value: boolean) => void, isOpen: boolean): void => {
      if (
        userInfo ||
        setter === setIsModalSearchOpen ||
        setter === setIsDropdownProductsOpen ||
        setter === setIsModalAccountOpen
      ) {
        setter(!isOpen);
      }
    },
    [
      userInfo,
      setIsModalSearchOpen,
      setIsDropdownProductsOpen,
      setIsModalAccountOpen,
    ]
  );

  const handleNavigation = useCallback(
    (path: string) => (userInfo ? navigate(path) : setIsModalAccountOpen(true)),
    [userInfo, navigate, setIsModalAccountOpen]
  );

  if (productsLoading) return <div>Loading...</div>;

  return (
    <HeaderLayout
      currentPath={currentPath}
      chosenProducts={chosenProductsList}
      userInfo={userInfo}
      products={products}
      isBurgerMenuOpen={isBurgerMenuOpen}
      burgerMenuClosing={burgerMenuClosing}
      toggleBurgerMenu={toggleBurgerMenu}
      isDropdownProductsOpen={isDropdownProductsOpen}
      toggleDropdownProducts={(isOpen) =>
        toggleModal(setIsDropdownProductsOpen, isOpen)
      }
      isModalSearchOpen={isModalSearchOpen}
      toggleSearchModal={(isOpen) => toggleModal(setIsModalSearchOpen, isOpen)}
      isDropdownCartOpen={isDropdownCartOpen}
      toggleDropdownCart={(isOpen) =>
        toggleModal(setIsDropdownCartOpen, isOpen)
      }
      handleCartButtonClick={() => handleNavigation("/cart/cart")}
      isDropdownAccountOpen={isDropdownAccountOpen}
      isModalAccountOpen={isModalAccountOpen}
      toggleDropdownAccount={(isOpen) =>
        toggleModal(setIsDropdownAccountOpen, isOpen)
      }
      toggleAccountModal={(isOpen) =>
        toggleModal(setIsModalAccountOpen, isOpen)
      }
      handleAccountButtonClick={() => handleNavigation("/account")}
    />
  );
}
