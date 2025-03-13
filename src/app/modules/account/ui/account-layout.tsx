import { AccountCategories } from "@/common/constants/account-categories";
import { AccountLi } from "./ui/account-li";
import { CustomBreadcrumb } from "@/common/components/custom-breadcrumb/custom-breadcrumb";
import clsx from "clsx";
import { Outlet } from "react-router-dom";

interface AccountLayoutProps {
  categoryFromPath: string;
  chosenCategory: string;
  handleCategoryClick: (category: string) => void;
  handleLogout: () => void;
  handleDeleteAccount: () => void;
  userName: string;
}

export function AccountLayout({
  categoryFromPath,
  chosenCategory,
  handleCategoryClick,
  handleLogout,
  handleDeleteAccount,
  userName,
}: AccountLayoutProps) {
  return (
    <div className="w-full overflow-x-auto">
      <CustomBreadcrumb className="mb-12" />
      <div
        className={clsx(
          "flex flex-col md:flex-row gap-6",
          categoryFromPath === "orders" && "md:flex-col lg:flex-row"
        )}
      >
        <aside className="min-[400px]:min-w-[300px]">
          <ul className="p-4 bg-gray-100">
            <AccountLi
              text={userName}
              alt="profile icon"
              src="/account/categories/profile-circle.svg"
              width={60}
              height={60}
              className="font-bold"
            />
            {AccountCategories.map((category) => (
              <AccountLi
                key={category.name}
                text={category.name}
                path={category.path}
                alt={category.alt}
                src={category.src}
                className={clsx(
                  "hover:text-blue-500 cursor-pointer relative after:absolute after:-left-4 after:top-0 after:w-[2px] after:h-full hover:after:bg-blue-500",
                  chosenCategory === category.path &&
                    "after:bg-blue-500 text-blue-500"
                )}
                handleCategoryClick={handleCategoryClick}
              />
            ))}
            <AccountLi
              text="Log Out"
              alt="logout icon"
              src="/account/categories/logout.svg"
              className="text-red-500 hover:text-red-600 cursor-pointer relative
              after:absolute after:-left-4 after:top-0 after:w-[2px] after:h-full hover:after:bg-red-500"
              handleCategoryClick={handleLogout}
            />
            <AccountLi
              text="Delete Account"
              alt="delete icon"
              src="/account/categories/delete-account.png"
              className="text-red-500 hover:text-red-600 cursor-pointer relative
              after:absolute after:-left-4 after:top-0 after:w-[2px] after:h-full hover:after:bg-red-500"
              handleCategoryClick={handleDeleteAccount}
            />
          </ul>
        </aside>
        <div className="py-4 xl:p-6 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
