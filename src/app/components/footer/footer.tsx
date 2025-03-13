import { useState, useCallback } from "react";
import { useValidation } from "@/common/functions/useValidate";
import { FooterLayout } from "./ui/footer-layout";

export function Footer() {
  const [email, setEmail] = useState("");
  const { errors, validateSingleField } = useValidation({
    inputNames: ["userEmail"],
    initialErrors: [""],
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target;
      validateSingleField("userEmail", value);
      setEmail(value);
    },
    [validateSingleField]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      validateSingleField("userEmail", email);
    },
    [validateSingleField, email]
  );

  return (
    <FooterLayout
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      email={email}
      error={errors[0]}
    />
  );
}