import { createContext, useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../shared/redux";
import { userInfoSlice } from "@/app/modules/users/user-info.slice";
import { cartSlice, checkExpiry } from "@/app/modules/cart/cart.slice";

interface ModalContextType {
  isBurgerMenuOpen: boolean;
  setIsBurgerMenuOpen: (value: boolean) => void;
  burgerMenuClosing: boolean;
  setBurgerMenuClosing: (value: boolean) => void;
  isDropdownProductsOpen: boolean;
  setIsDropdownProductsOpen: (value: boolean) => void;
  isModalSearchOpen: boolean;
  setIsModalSearchOpen: (value: boolean) => void;
  isDropdownCartOpen: boolean;
  setIsDropdownCartOpen: (value: boolean) => void;
  isDropdownAccountOpen: boolean;
  setIsDropdownAccountOpen: (value: boolean) => void;
  isModalAccountOpen: boolean;
  setIsModalAccountOpen: (value: boolean) => void;
  isModalChangeOpen: boolean;
  setIsModalChangeOpen: (value: boolean) => void;
  isCheckoutSuccess: boolean;
  setIsCheckoutSuccess: (value: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();

  const userId: number =
    useAppSelector(userInfoSlice.selectors.selectUserInfo)?.userId ?? 0;
  const expiryTime = useAppSelector((state) =>
    cartSlice.selectors.selectExpiryTime(state, userId)
  );

  dispatch(checkExpiry(userId));

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);
  const [burgerMenuClosing, setBurgerMenuClosing] = useState<boolean>(false);
  const [isDropdownProductsOpen, setIsDropdownProductsOpen] =
    useState<boolean>(false);
  const [isModalSearchOpen, setIsModalSearchOpen] = useState<boolean>(false);
  const [isDropdownCartOpen, setIsDropdownCartOpen] = useState<boolean>(false);
  const [isDropdownAccountOpen, setIsDropdownAccountOpen] =
    useState<boolean>(false);
  const [isModalAccountOpen, setIsModalAccountOpen] = useState<boolean>(false);
  const [isModalChangeOpen, setIsModalChangeOpen] = useState<boolean>(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState<boolean>(
    Date.now() < expiryTime
  );

  return (
    <ModalContext.Provider
      value={{
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
        isModalChangeOpen,
        setIsModalChangeOpen,
        isCheckoutSuccess,
        setIsCheckoutSuccess,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
