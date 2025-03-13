import { useState } from "react";
import { ModalWindowAccountLayout } from "./ui/modal-window-account-layout";

interface ModalWindowAccountProps {
  handleExit: () => void;
}

export function ModalWindowAccount({handleExit}: ModalWindowAccountProps) {
  const [userActivity, setUserActivity] = useState<"login" | "register">(
    "login"
  );

  const handleLogin = (): void => setUserActivity("login");
  const handleRegister = (): void => setUserActivity("register");

  return (
    <ModalWindowAccountLayout
      userActivity={userActivity}
      handleLogin={handleLogin}
      handleRegister={handleRegister}
      handleExit={handleExit}
    />
  );
}
