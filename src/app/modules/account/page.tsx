"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/common/shared/redux";
import { useModal } from "@/common/context/modal-context";
import { useCallback, useEffect, useState } from "react";
import { ModalWindowOptions } from "@/common/types/modal-window-options";
import { useSetChosenAccountCategory } from "@/common/functions/useSetChosenAccountCategory";
import { useLogout } from "@/common/functions/useLogout";
import { useHandleInputClick } from "@/common/functions/useHandleInputClick";
import { useValidation } from "@/common/functions/useValidate";
import { AccountLayout } from "./ui/account-layout";
import { ModalWindow } from "../../../common/components/modal-window/modal-window";
import { UserInfo } from "@/common/types/user-info";
import {
  setAccountCategory,
  setUserInfo,
  userInfoSlice,
} from "../users/user-info.slice";
import { Routes, Route } from "react-router-dom";
import Notification from "./ui/categories/ui/notification/page";
import PersonalData from "./ui/categories/ui/personal-data/page";
import SecurityAccess from "./ui/categories/ui/security/page";
import WishList from "./ui/categories/ui/wish-list/page";
import Orders from "./ui/categories/ui/orders/page";

export default function Account() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isModalChangeOpen, setIsModalChangeOpen } = useModal();
  const userInfo: UserInfo | null = useAppSelector(
    userInfoSlice.selectors.selectUserInfo
  );

  const categoryFromPath: string =
    location.pathname.split("/").pop() || "personal-data";
  const [chosenCategory, setChosenCategory] =
    useState<string>(categoryFromPath);

  useEffect(() => {
    setChosenCategory(categoryFromPath);
  }, [categoryFromPath]);

  const [modalWindowOptions, setModalWindowOptions] =
    useState<ModalWindowOptions>({
      h5: "",
      inputNames: [""],
      inputTypes: ["text"],
      inputValues: [""],
      placeholders: [""],
      className: "",
    });
  const [modalWindowErrors, setModalWindowErrors] = useState<string[]>([""]);

  const handleCategoryClick: (category: string) => void =
    useSetChosenAccountCategory(setChosenCategory);

  const handleLogout: () => void = useLogout();
  const handleDeleteAccount = async (): Promise<void> => {
    if (!userInfo?.userId) {
      return;
    }

    try {
      await fetch("http://localhost:5000/delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userInfo?.userId }),
      });
    } catch (error) {
      console.error(error);
    }
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    navigate("/home");
  };

  const handleInputClick = useHandleInputClick(
    setIsModalChangeOpen,
    setModalWindowOptions,
    setModalWindowErrors
  );

  const closeModalWindow = useCallback(() => {
    setIsModalChangeOpen(false);
    setModalWindowOptions({
      h5: "",
      inputNames: [""],
      inputTypes: ["text"],
      inputValues: [""],
      placeholders: [""],
      className: "",
    });
  }, [setIsModalChangeOpen]);

  const { errors, validateSingleField } = useValidation({
    inputNames: modalWindowOptions.inputNames,
    initialErrors: modalWindowErrors,
  });

  const handleChange = useCallback(
    (value: string, index: number): void => {
      setModalWindowOptions((prev) => {
        const updatedValues = prev.inputValues.map((val, i) =>
          i === index ? value : val
        );
        const updated = { ...prev, inputValues: updatedValues };
        const fieldName = updated.inputNames[index];
        validateSingleField(fieldName, value);
        return updated;
      });
    },
    [validateSingleField]
  );

  const saveChanges = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const isValid = modalWindowOptions.inputNames.every((name, index) =>
      validateSingleField(name, modalWindowOptions.inputValues[index])
    );

    if (!isValid) return;

    if (modalWindowOptions.inputNames[0] === "userOldPassword") {
      await updateUserPassword();
    } else {
      await updateUserInfo();
    }
  };

  const updateUserPassword = async (): Promise<void> => {
    const [userOldPassword, updatedUserPassword] =
      modalWindowOptions.inputValues;

    try {
      const response = await fetch("http://localhost:5000/user-info/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userInfo?.userId,
          userOldPassword,
          userPassword: updatedUserPassword,
        }),
      });

      if (response.status === 400) {
        setModalWindowErrors(["Old password is incorrect"]);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit user data.");
      }

      closeModalWindow();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const updateUserInfo = async (): Promise<void> => {
    let updatedUserInfo: UserInfo = { ...userInfo! };

    modalWindowOptions.inputNames.forEach((name, index) => {
      updatedUserInfo = {
        ...updatedUserInfo,
        [name]: modalWindowOptions.inputValues[index],
      };
    });

    const firstInputName = modalWindowOptions.inputNames[0];
    if (modalWindowOptions.inputNames.length > 1) {
      const combinedValue = modalWindowOptions.inputValues.join(", ");
      if (firstInputName === "userCountry") {
        updatedUserInfo.userAddress = combinedValue;
      }
    }

    try {
      const response = await fetch("http://localhost:5000/user-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUserInfo),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit user data.");
      }

      closeModalWindow();
      dispatch(setUserInfo(updatedUserInfo));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    dispatch(setAccountCategory({ category: chosenCategory }));
  }, [chosenCategory, dispatch]);
  useEffect(() => {
    setModalWindowErrors(errors);
  }, [modalWindowOptions.inputValues, errors]);
  useEffect(() => {
    setModalWindowErrors([""]);
  }, [isModalChangeOpen]);

  if (!userInfo) return <div>Loading...</div>;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AccountLayout
              categoryFromPath={categoryFromPath}
              chosenCategory={chosenCategory}
              handleCategoryClick={handleCategoryClick}
              handleLogout={handleLogout}
              handleDeleteAccount={handleDeleteAccount}
              userName={userInfo?.userName ?? "User"}
            />
          }
        >
          <Route
            path="personal-data"
            element={
              <PersonalData
                userInfo={userInfo}
                handleInputClick={handleInputClick}
              />
            }
          />
          <Route
            path="orders"
            element={<Orders userId={userInfo?.userId ?? 0} />}
          />
          <Route
            path="wish-list"
            element={<WishList userId={userInfo?.userId ?? 0} />}
          />
          <Route
            path="security-access"
            element={
              <SecurityAccess
                userInfo={userInfo}
                handleInputClick={handleInputClick}
              />
            }
          />
          <Route
            path="notification"
            element={<Notification userInfo={userInfo} />}
          />
        </Route>
      </Routes>
      {isModalChangeOpen && (
        <ModalWindow
          {...modalWindowOptions}
          closeModalWindow={closeModalWindow}
          handleChange={handleChange}
          saveChanges={saveChanges}
          errors={modalWindowErrors}
        />
      )}
    </>
  );
}
