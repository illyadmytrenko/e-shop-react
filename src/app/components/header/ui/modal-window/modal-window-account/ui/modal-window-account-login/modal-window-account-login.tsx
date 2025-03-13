import { useCallback, useEffect, useState } from "react";
import { FormData } from "@/common/types/form-data";
import Alert from "@mui/material/Alert";
import type { AlertColor } from "@mui/material/Alert";
import { useModal } from "@/common/context/modal-context";
import { useAppDispatch } from "@/common/shared/redux";
import { useValidation } from "@/common/functions/useValidate";
import {
  setUserInfo,
  setUserInfoError,
} from "@/app/modules/users/user-info.slice";
import { ModalWindowAccountLoginLayout } from "./ui/modal-window-account-login-layout";
import clsx from "clsx";

interface ModalWindowAccountLayoutProps {
  handleSignClick: () => void;
}

export function ModalWindowAccountLogin({
  handleSignClick,
}: ModalWindowAccountLayoutProps) {
  const [formData, setFormData] = useState<FormData>({
    userEmail: "",
    userPassword: "",
  });
  const [formDataErrors, setFormDataErrors] = useState<string[]>(["", ""]);
  const [alertState, setAlertState] = useState<{
    visible: [string, AlertColor];
    exiting: boolean;
  }>({ visible: ["", "success"], exiting: false });

  const { setIsModalAccountOpen } = useModal();
  const dispatch = useAppDispatch();

  const { errors, validateSingleField } = useValidation({
    inputNames: ["userEmail", "userPassword"],
    initialErrors: ["", ""],
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      validateSingleField(name, value);
    },
    [validateSingleField]
  );

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

  const handleLogin = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();
      if (
        !validateSingleField("userEmail", formData.userEmail ?? "") ||
        !validateSingleField("userPassword", formData.userPassword ?? "")
      )
        return;

      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.status === 404)
          return setFormDataErrors([
            "Email not found. Please register or check your email address.",
            "",
          ]);
        if (response.status === 401)
          return setFormDataErrors(["", "Invalid password. Please try again."]);
        if (!response.ok) throw new Error("Failed to login. Please try again.");

        const data = await response.json();
        dispatch(
          setUserInfo({
            userId: data.user.id,
            userName: data.user.name,
            userEmail: data.user.email,
            userAddress: data.user.address,
            userPostalCode: data.user.postalCode,
            userPhoneNumber: data.user.phoneNumber,
            userNotifications: data.user.notifications,
          })
        );

        showAlert("Login successful. Welcome back!", "success");
        setTimeout(() => setIsModalAccountOpen(false), 3000);
      } catch (err) {
        console.error(err);
        showAlert("An error occurred during login. Try again.", "warning");
        dispatch(setUserInfoError());
      }
    },
    [dispatch, formData, setIsModalAccountOpen, validateSingleField]
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
      <ModalWindowAccountLoginLayout
        formData={formData}
        handleChange={handleChange}
        handleSignClick={handleSignClick}
        handleSubmit={handleLogin}
        errors={formDataErrors}
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
