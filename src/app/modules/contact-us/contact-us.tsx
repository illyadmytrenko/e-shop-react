"use client";

import { useCallback, useState, useEffect } from "react";
import { FormData } from "@/common/types/form-data";
import { ContactUsLayout } from "./ui/contact-us-layout";
import Alert from "@mui/material/Alert";
import type { AlertColor } from "@mui/material/Alert";
import { useValidation } from "@/common/functions/useValidate";
import clsx from "clsx";

export default function ContactUs() {
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    userEmail: "",
    userMessage: "",
  });

  const [formDataErrors, setFormDataErrors] = useState<string[]>(["", "", ""]);

  const [alertState, setAlertState] = useState<{
    visible: [string, AlertColor];
    exiting: boolean;
  }>({ visible: ["", "success"], exiting: false });

  const { errors, validateSingleField } = useValidation({
    inputNames: Object.keys(formData),
    initialErrors: formDataErrors,
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { name, value } = e.target;
      setFormData((prev) => {
        const updated = { ...prev, [name]: value };
        validateSingleField(name, value);
        return updated;
      });
    },
    [validateSingleField]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();

      let valid = true;
      Object.keys(formData).forEach((name) => {
        if (
          !validateSingleField(name, formData[name as keyof FormData] ?? "")
        ) {
          valid = false;
        }
      });

      if (!valid) {
        return;
      }

      try {
        const trimmedData = {
          name: formData.userName?.trim(),
          email: formData.userEmail?.trim(),
          message: formData.userMessage?.trim(),
        };

        const response = await fetch(
          "http://localhost:5000/contact-us/submit",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trimmedData),
          }
        );

        if (response.ok) {
          setAlertState({
            visible: ["Form was sent successfully.", "success"],
            exiting: false,
          });
          setFormData({ userName: "", userEmail: "", userMessage: "" });
        } else {
          setAlertState({
            visible: [
              "An error occurred while submitting the form. Try again.",
              "warning",
            ],
            exiting: false,
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setAlertState({
          visible: ["An error occurred while submitting the form.", "error"],
          exiting: false,
        });
      }
    },
    [formData, validateSingleField]
  );

  useEffect(() => {
    if (alertState.visible[0] !== "") {
      const showTimer = setTimeout(() => {
        setAlertState((prev) => ({ ...prev, exiting: true }));
      }, 2600);

      const hideTimer = setTimeout(() => {
        setAlertState({ visible: ["", "success"], exiting: false });
      }, 3000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [alertState.visible]);

  useEffect(() => {
    setFormDataErrors(errors);
  }, [errors]);

  return (
    <>
      <ContactUsLayout
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        errors={formDataErrors}
      />
      {alertState.visible[0] !== "" && (
        <Alert
          className={clsx(
            "fixed top-10 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out",
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
