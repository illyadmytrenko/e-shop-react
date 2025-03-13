import { CustomButton } from "@/common/components/custom-button/custom-button";
import clsx from "clsx";
import { ModalWindowAccountLogin } from "./modal-window-account-login/modal-window-account-login";
import { ModalWindowAccountRegister } from "./modal-window-account-register/modal-window-account-register";

interface ModalWindowAccountLayoutProps {
  userActivity: "login" | "register";
  handleLogin: () => void;
  handleRegister: () => void;
  handleExit: () => void;
}

export function ModalWindowAccountLayout({
  userActivity,
  handleLogin,
  handleRegister,
  handleExit,
}: ModalWindowAccountLayoutProps) {
  return (
    <div
      className="fixed top-1/2 left-1/2 bg-white shadow-lg px-6 min-w-[400px]:px-12 sm:px-12 sm:py-10 z-50 overflow-visible transform
      -translate-x-1/2 -translate-y-1/2 w-screen sm:w-auto sm:min-w-[600px] h-screen sm:h-auto flex flex-col justify-center sm:block"
    >
      <div className="flex justify-between text-xl mb-5 sm:mb-10">
        <CustomButton
          className={clsx(
            "w-1/2",
            userActivity === "login" &&
              "!text-blue-500 after:!bg-blue-500 after:h-[2px]"
          )}
          variant="underline"
          onClick={handleLogin}
        >
          Log in
        </CustomButton>
        <CustomButton
          className={clsx(
            "w-1/2",
            userActivity === "register" &&
              "!text-blue-500 after:!bg-blue-500 after:h-[2px]"
          )}
          variant="underline"
          onClick={handleRegister}
        >
          Create Account
        </CustomButton>
      </div>
      {userActivity === "login" && (
        <ModalWindowAccountLogin handleSignClick={handleRegister} />
      )}
      {userActivity === "register" && (
        <ModalWindowAccountRegister handleSignClick={handleLogin} />
      )}
      <CustomButton
        className="block sm:hidden mt-6"
        variant="orange"
        size="md"
        onClick={handleExit}
      >
        Exit
      </CustomButton>
    </div>
  );
}
