import {
  createBrowserRouter,
  Navigate,
  Outlet,
  redirect,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import Home from "./app";
import Products from "./modules/products/page";
import FAQ from "./modules/faqs/page";
import ContactUs from "./modules/contact-us/contact-us";
import AboutUs from "./modules/about-us/page";
import { store } from "./store";
import { userApi } from "./modules/users/api";
import { setRouter } from "@/common/shared/extra-argument";
import {
  productsApi,
  productsCharacteristicsApi,
} from "./modules/products/api";
import ProductInfo from "./modules/products/product/page";
import TermsAndConditions from "./modules/terms-conditions/page";
import Account from "./modules/account/page";
import Cart from "./modules/cart/page";
import { userInfoSlice } from "./modules/users/user-info.slice";
import CartError from "./modules/cart/error/page";
import CartSuccess from "./modules/cart/success/page";
import { useModal } from "@/common/context/modal-context";
import clsx from "clsx";
import { useEffect } from "react";
import { useAppSelector } from "@/common/shared/redux";
const loadStore = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(store), 0);
  });

const BodyContent = () => {
  const {
    isBurgerMenuOpen,
    setIsBurgerMenuOpen,
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
    setBurgerMenuClosing,
  } = useModal();

  const handleBackgroundClick = () => {
    setBurgerMenuClosing(true);
    setTimeout(() => setIsBurgerMenuOpen(false), 750);
    setIsDropdownProductsOpen(false);
    setIsModalSearchOpen(false);
    setIsDropdownCartOpen(false);
    setIsDropdownAccountOpen(false);
    setIsModalAccountOpen(false);
    setIsModalChangeOpen(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const modalsState = [
    isBurgerMenuOpen,
    isDropdownCartOpen,
    isModalSearchOpen,
    isModalAccountOpen,
    isModalChangeOpen,
  ];

  useEffect(() => {
    document.body.style.overflow = modalsState.some(Boolean) ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalsState]);

  return (
    <div className={clsx("relative")}>
      {(isBurgerMenuOpen ||
        isDropdownProductsOpen ||
        isModalSearchOpen ||
        isDropdownCartOpen ||
        isDropdownAccountOpen ||
        isModalAccountOpen ||
        isModalChangeOpen) && (
        <div
          className={clsx(
            "fixed inset-0 bg-black opacity-50 z-10",
            (isDropdownProductsOpen ||
              isDropdownCartOpen ||
              isDropdownAccountOpen) &&
              "!z-0"
          )}
          onClick={handleBackgroundClick}
        />
      )}
      <div>
        <Header />
        <div
          className={clsx(
            "relative px-6 sm:px-10 md:px-20 lg:px-32 xl:px-40",
            (isBurgerMenuOpen ||
              isDropdownProductsOpen ||
              isModalSearchOpen ||
              isDropdownCartOpen ||
              isDropdownAccountOpen ||
              isModalAccountOpen) &&
              "filter blur-[2px]"
          )}
        >
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

const ProtectedRouteCart = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const sessionId = queryParams.get("session_id");

  if (!sessionId) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

const ProtectedRouteAccount = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const userId = useAppSelector(userInfoSlice.selectors.selectUserInfo)?.userId;

  if (!userId) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BodyContent />,
    children: [
      {
        index: true,
        loader: () => redirect("/home"),
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "account",
        element: <Navigate to="/account/personal-data" replace />,
        loader: () => {
          loadStore().then(() => {
            const state = store.getState();
            const userInfo = userInfoSlice.selectors.selectUserInfo(state);
            store.dispatch(
              userApi.util.prefetch("getUser", userInfo?.userId ?? 0, {})
            );
          });
          return null;
        },
      },
      {
        path: "account/*",
        element: (
          <ProtectedRouteAccount>
            <Account />
          </ProtectedRouteAccount>
        ),
        loader: () => {
          loadStore().then(() => {
            const state = store.getState();
            const userInfo = userInfoSlice.selectors.selectUserInfo(state);
            store.dispatch(
              userApi.util.prefetch("getUser", userInfo?.userId ?? 0, {})
            );
          });
          return null;
        },
      },
      {
        path: "cart",
        element: <Navigate to="/cart/cart" replace />,
      },
      {
        path: "cart/*",
        element: <Cart />,
      },
      {
        path: "cart/error",
        element: <CartError />,
      },
      {
        path: "cart/success",
        element: (
          <ProtectedRouteCart>
            <CartSuccess />
          </ProtectedRouteCart>
        ),
      },
      {
        path: "products",
        element: <Products />,
        loader: () => {
          loadStore().then(() => {
            store.dispatch(
              productsApi.util.prefetch("getProducts", undefined, {})
            );
            store.dispatch(
              productsCharacteristicsApi.util.prefetch(
                "getCharacteristics",
                undefined,
                {}
              )
            );
          });
          return null;
        },
      },
      {
        path: "products/:id",
        element: <ProductInfo />,
        loader: ({ params }) => {
          store.dispatch(
            productsApi.util.prefetch("getProduct", Number(params.id) ?? 0, {})
          );
          return null;
        },
      },
      {
        path: "faqs",
        element: <FAQ />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "terms-conditions",
        element: <TermsAndConditions />,
      },
    ],
  },
]);

setRouter(router);
