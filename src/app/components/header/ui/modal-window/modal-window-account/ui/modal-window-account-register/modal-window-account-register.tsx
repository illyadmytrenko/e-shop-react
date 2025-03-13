import { useEffect, useState, useCallback } from "react";
import { FormData } from "@/common/types/form-data";
import Alert from "@mui/material/Alert";
import type { AlertColor } from "@mui/material/Alert";
import { useModal } from "@/common/context/modal-context";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/common/shared/redux";
import { useValidation } from "@/common/functions/useValidate";
import {
  setUserInfo,
  setUserInfoError,
} from "@/app/modules/users/user-info.slice";
import { ModalWindowAccountRegisterLayout } from "./ui/modal-window-account-register-layout";
import clsx from "clsx";

interface ModalWindowAccountRegisterProps {
  handleSignClick: () => void;
}

export function ModalWindowAccountRegister({
  handleSignClick,
}: ModalWindowAccountRegisterProps) {
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    userEmail: "",
    userPassword: "",
    userAgreement: false,
  });
  const [formDataErrors, setFormDataErrors] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);
  const [alertState, setAlertState] = useState<{
    visible: [string, AlertColor];
    exiting: boolean;
  }>({ visible: ["", "success"], exiting: false });

  const { setIsModalAccountOpen } = useModal();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { errors, validateSingleField } = useValidation({
    inputNames: ["userName", "userEmail", "userPassword", "userAgreement"],
    initialErrors: ["", "", ""],
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      validateSingleField(name, value);
    },
    [validateSingleField]
  );

  const handleAgreementCheckbox = useCallback((): void => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, userAgreement: !prev.userAgreement };
      return updatedFormData;
    });
  }, [setFormData]);

  const handleTermsClick = useCallback((): void => {
    navigate("/terms-conditions");
    setIsModalAccountOpen(false);
  }, [navigate, setIsModalAccountOpen]);

  const showAlert = (message: string, severity: AlertColor): void => {
    setAlertState({ visible: [message, severity], exiting: false });
    setTimeout(
      () => setAlertState((prev) => ({ ...prev, exiting: true })),
      2600
    );
    setTimeout(
      () => setAlertState({ visible: ["", "success"], exiting: false }),
      3000
    );
  };

  const handleRegister = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();

      if (
        !validateSingleField("userName", formData.userName ?? "") ||
        !validateSingleField("userEmail", formData.userEmail ?? "") ||
        !validateSingleField("userPassword", formData.userPassword ?? "") ||
        !validateSingleField("userAgreement", formData.userAgreement ?? false)
      )
        return;

      try {
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 409) {
          setFormDataErrors((prevErrors) => [
            prevErrors[0],
            "This email is already in use. Please choose another.",
            prevErrors[2],
            prevErrors[3],
          ]);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to register user. Please try again.");
        }

        const data = await response.json();

        dispatch(
          setUserInfo({
            userId: data.user.id,
            userName: data.user.name,
            userEmail: data.user.email,
            userAddress: null,
            userPostalCode: null,
            userPhoneNumber: null,
            userNotifications: null,
          })
        );

        showAlert("User registered successfully!", "success");
        setTimeout(() => setIsModalAccountOpen(false), 3000);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err.message);
        showAlert(
          "An error occurred while registering user. Try again.",
          "warning"
        );
        dispatch(setUserInfoError());
      }
    },
    [formData, dispatch, validateSingleField, setIsModalAccountOpen]
  );

  useEffect(() => setFormDataErrors(errors), [errors]);

  useEffect(() => {
    if (alertState.visible[0]) {
      const timer = setTimeout(() => setIsModalAccountOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertState, setIsModalAccountOpen]);

  return (
    <>
      <ModalWindowAccountRegisterLayout
        formData={formData}
        errors={formDataErrors}
        handleChange={handleChange}
        handleAgreementCheckbox={handleAgreementCheckbox}
        handleTermsClick={handleTermsClick}
        handleSignButtonClick={handleSignClick}
        handleSubmitButtonClick={handleRegister}
      />
      {alertState.visible[0] && (
        <Alert
          className={clsx(
            "fixed top-5 sm:-top-[10%] left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out",
            alertState.exiting ? "animate-slide-up" : "animate-slide-down"
          )}
          severity={alertState.visible[1]}
        >
          {alertState.visible[0]}
        </Alert>
      )}
    </>
  );
}
