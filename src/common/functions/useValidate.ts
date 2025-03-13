import { useState } from "react";
import {
  EmailRegex,
  NameRegex,
  PasswordRegex,
  PhoneNumberRegex,
  PostalCodeRegex,
} from "../constants/regex";

interface ValidationConfig {
  name: string;
  value: string | boolean;
  regex?: RegExp;
  requiredMessage: string;
  invalidMessage?: string;
}

interface UseValidationProps {
  inputNames: string[];
  initialErrors: string[];
}

const MIN_CHAR_AMOUNT = 50;

export const useValidation = ({
  inputNames,
  initialErrors,
}: UseValidationProps) => {
  const [errors, setErrors] = useState<string[]>([...initialErrors]);

  const validateField = ({
    value,
    regex,
    requiredMessage,
    invalidMessage,
  }: ValidationConfig): string => {
    if (typeof value === "boolean") {
      return value === true ? "" : requiredMessage;
    }
    if (!value) {
      return requiredMessage;
    }
    if (regex && !regex.test(value.trim())) {
      return invalidMessage ?? "";
    }
    return "";
  };

  const validateFieldWithValue = (
    name: string,
    value: string | boolean
  ): string => {
    const configMap: { [key: string]: ValidationConfig } = {
      userName: {
        name: "userName",
        value,
        regex: NameRegex,
        requiredMessage: "Name is required",
        invalidMessage: "Name can only contain letters",
      },
      userEmail: {
        name: "userEmail",
        value,
        regex: EmailRegex,
        requiredMessage: "Email is required",
        invalidMessage: "Email is not valid",
      },
      userMessage: {
        name: "userMessage",
        value,
        requiredMessage: "Message is required",
        invalidMessage: `Message must be at least ${MIN_CHAR_AMOUNT} characters`,
      },
      userCountry: {
        name: "userCountry",
        value,
        requiredMessage: "Country is required",
      },
      userCity: {
        name: "userCity",
        value,
        requiredMessage: "City is required",
      },
      userStreet: {
        name: "userStreet",
        value,
        requiredMessage: "Street is required",
      },
      userPostalCode: {
        name: "userPostalCode",
        value,
        regex: PostalCodeRegex,
        requiredMessage: "Postal Code is required",
        invalidMessage: "Postal code must be a 5-digit number",
      },
      userOldPassword: {
        name: "userOldPassword",
        value,
        regex: PasswordRegex,
        requiredMessage: "Password is required",
        invalidMessage:
          "Password must be 8-20 characters long, include uppercase and lowercase letters, a number, and a special character.",
      },
      userPassword: {
        name: "userPassword",
        value,
        regex: PasswordRegex,
        requiredMessage: "Password is required",
        invalidMessage:
          "Password must be 8-20 characters long, include uppercase and lowercase letters, a number, and a special character.",
      },
      userPhoneNumber: {
        name: "userPhoneNumber",
        value,
        regex: PhoneNumberRegex,
        requiredMessage: "Phone number is required",
        invalidMessage: "Phone number is not valid",
      },
      userAgreement: {
        name: "userAgreement",
        value,
        requiredMessage: "You must agree to the Terms & Conditions",
      },
    };

    const config = configMap[name];
    if (config) {
      let error = validateField(config);
      if (
        name === "userMessage" &&
        typeof value === "string" &&
        value.trim().length < MIN_CHAR_AMOUNT
      ) {
        error = `Message must be at least ${MIN_CHAR_AMOUNT} characters`;
      }
      return error;
    }
    return "";
  };

  const validateSingleField = (
    name: string,
    value: string | boolean
  ): boolean => {
    const index = inputNames.indexOf(name);
    if (index === -1) return true;
    const error = validateFieldWithValue(name, value);
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = error;
      return newErrors;
    });
    return error === "";
  };

  return { errors, validateSingleField };
};
