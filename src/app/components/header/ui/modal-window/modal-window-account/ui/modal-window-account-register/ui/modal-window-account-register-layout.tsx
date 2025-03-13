import { FormData } from "@/common/types/form-data";
import { ModalWindowAccountAction } from "../../common/modal-window-account-action";
import { CustomInput } from "@/common/components/custom-input/custom-input";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import { CustomPasswordInput } from "../../common/custom-password-input";
import { CustomButton } from "@/common/components/custom-button/custom-button";

interface ModalWindowAccountRegisterLayoutProps {
  formData: FormData;
  errors: string[];
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleAgreementCheckbox: () => void;
  handleTermsClick: () => void;
  handleSignButtonClick: () => void;
  handleSubmitButtonClick: (e: React.FormEvent) => void;
}

export function ModalWindowAccountRegisterLayout({
  formData,
  errors,
  handleChange,
  handleAgreementCheckbox,
  handleTermsClick,
  handleSignButtonClick,
  handleSubmitButtonClick,
}: ModalWindowAccountRegisterLayoutProps) {
  return (
    <ModalWindowAccountAction
      h3="Create Account"
      customInputs={[
        <CustomInput
          key="userName"
          name="userName"
          type="text"
          placeholder="Full Name"
          value={formData.userName}
          onChange={handleChange}
          error={errors[0]}
          className="border-2 border-solid border-gray-400 rounded-md p-3 pl-11"
          itemBefore={
            <CustomImage
              alt="user icon"
              src="/header/modal-window/user.svg"
              width={24}
              height={24}
              className="!absolute top-3 left-3"
            />
          }
        />,
        <CustomInput
          key="userEmail"
          name="userEmail"
          type="email"
          placeholder="E-mail"
          value={formData.userEmail}
          onChange={handleChange}
          error={errors[1]}
          className="border-2 border-solid border-gray-400 rounded-md p-3 pl-11"
          itemBefore={
            <CustomImage
              alt="sms icon"
              src="/header/modal-window/sms.svg"
              width={24}
              height={24}
              className="!absolute top-3 left-3"
            />
          }
        />,
        <CustomPasswordInput
          key="password"
          name="userPassword"
          password={formData.userPassword ?? ""}
          handleChange={handleChange}
          error={errors[2]}
        />,
      ]}
      checkbox={
        <>
          <div className="flex gap-2 items-center">
            <input
              name="userAgreement"
              type="checkbox"
              checked={formData.userAgreement}
              onChange={handleAgreementCheckbox}
              className="w-5 h-5"
            />
            <p className="text-gray-400">
              I agree to all{" "}
              <span
                className="text-blue-500 underline cursor-pointer"
                onClick={handleTermsClick}
              >
                Terms & Conditions
              </span>
            </p>
          </div>
          {errors[3] && (
            <p className="text-red-500 text-sm font-bold pl-2 mt-1">
              {errors[3]}
            </p>
          )}
        </>
      }
      button={
        <CustomButton
          variant="blue"
          size="md"
          onClick={handleSubmitButtonClick}
          className="mb-6"
        >
          Create Account
        </CustomButton>
      }
      bottomPart={
        <p className="text-gray-400 mx-auto">
          Already have an account ?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={handleSignButtonClick}
          >
            sign in
          </span>
        </p>
      }
    />
  );
}
