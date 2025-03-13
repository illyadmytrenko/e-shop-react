import { useCallback, useState } from "react";
import { CustomInput } from "@/common/components/custom-input/custom-input";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import { CustomButton } from "@/common/components/custom-button/custom-button";

interface CustomPasswordInputProps {
  name: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error: string;
  password: string;
}

export function CustomPasswordInput({
  name,
  handleChange,
  error,
  password,
}: CustomPasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setShowPassword((prev) => !prev);
    },
    [setShowPassword]
  );

  return (
    <CustomInput
      name={name}
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      value={password}
      onChange={handleChange}
      error={error}
      className="border-2 border-solid border-gray-400 rounded-md p-3 pl-11"
      itemBefore={
        <CustomImage
          alt="key icon"
          src="/header/modal-window/key.svg"
          width={24}
          height={24}
          className="!absolute top-[14px] left-3"
        />
      }
      itemAfter={
        <CustomButton
          className="!absolute top-[14px] right-3"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            togglePasswordVisibility(e)
          }
        >
          {!showPassword && (
            <CustomImage
              alt="eye icon"
              src="/header/modal-window/eye-slash.svg"
              width={24}
              height={24}
            />
          )}
          {showPassword && (
            <CustomImage
              alt="eye icon"
              src="/header/modal-window/eye.svg"
              width={24}
              height={24}
            />
          )}
        </CustomButton>
      }
    />
  );
}
