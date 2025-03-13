import { FormData } from "@/common/types/form-data";
import { ModalWindowAccountAction } from "../../common/modal-window-account-action";
import { CustomInput } from "@/common/components/custom-input/custom-input";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import { CustomPasswordInput } from "../../common/custom-password-input";
import { CustomButton } from "@/common/components/custom-button/custom-button";

interface ModalWindowAccountLoginLayoutProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSignClick: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors: string[];
}

export function ModalWindowAccountLoginLayout({
  formData,
  handleChange,
  handleSignClick,
  handleSubmit,
  errors,
}: ModalWindowAccountLoginLayoutProps) {
  return (
    <ModalWindowAccountAction
      h3="Log in to Tech Heim"
      customInputs={[
        <CustomInput
          key="userEmail"
          name="userEmail"
          type="email"
          placeholder="E-mail"
          value={formData.userEmail}
          onChange={handleChange}
          error={errors[0]}
          className="border-2 border-solid border-gray-400 rounded-md p-3 pl-11"
          itemBefore={
            <CustomImage
              alt="sms icon"
              src="/header/modal-window/sms.svg"
              width={24}
              height={24}
              className="!absolute top-[14px] left-3"
            />
          }
        />,
        <CustomPasswordInput
          key="userPassword"
          name="userPassword"
          handleChange={handleChange}
          error={errors[1]}
          password={formData.userPassword!}
        />,
      ]}
      button={
        <CustomButton
          variant="blue"
          size="md"
          onClick={handleSubmit}
          className="mb-6"
        >
          Log in
        </CustomButton>
      }
      bottomPart={
        <p className="text-gray-400 mx-auto">
          Don&apos;t have an account ?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={handleSignClick}
          >
            sign up
          </span>
        </p>
      }
    />
  );
}
