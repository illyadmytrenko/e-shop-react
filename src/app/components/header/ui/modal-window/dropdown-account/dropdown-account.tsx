import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/common/shared/redux";
import { useModal } from "@/common/context/modal-context";
import { useCallback, useState } from "react";
import { logout, userInfoSlice } from "@/app/modules/users/user-info.slice";
import { DropdownCategoriesList } from "../dropdown-categories-list";
import { AccountDropdownCategories } from "@/common/constants/account-dropdown-categories";

interface DropdownAccountProps {
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export function DropdownAccount({
  handleMouseEnter,
  handleMouseLeave,
}: DropdownAccountProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { setIsDropdownAccountOpen } = useModal();

  const category: string = useAppSelector(
    userInfoSlice.selectors.selectAccountCategory
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(category);

  const handleCategoryClick = useCallback(
    (category: string): void => {
      const formattedCategory = category.toLowerCase().replace(/\s+/g, "-");

      if (formattedCategory === "log-out") {
        navigate("/home");
        dispatch(logout());
        setIsDropdownAccountOpen(false);
      } else {
        if (location.pathname === "/account") {
          navigate(`/account/${formattedCategory}`);
          window.location.reload();
        } else {
          navigate(`/account/${formattedCategory}`);
        }
      }

      setSelectedCategory(formattedCategory);
    },
    [navigate, dispatch, setIsDropdownAccountOpen, location.pathname]
  );

  return (
    <div
      className="absolute top-full right-0 md:right-[5%] lg:right-[10%] bg-white shadow-lg p-4 z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DropdownCategoriesList
        selectedCategory={selectedCategory}
        categories={AccountDropdownCategories}
        handleCategoryClick={handleCategoryClick}
        classNameUl="flex-col gap-5"
        classNameLi="!flex-row gap-4 hover:text-blue-500 !items-start"
        classNameImg="!mb-0 mt-1"
        classNameSpan="!text-left"
      />
    </div>
  );
}
