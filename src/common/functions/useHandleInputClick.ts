import { Dispatch, SetStateAction } from "react";
import { ModalWindowOptions } from "../types/modal-window-options";
import { useCallback } from "react";

export const useHandleInputClick = (
  setIsModalChangeOpen: (isOpen: boolean) => void,
  setModalWindowOptions: Dispatch<SetStateAction<ModalWindowOptions>>,
  setModalWindowErrors: (errors: string[]) => void
) => {
  return useCallback(
    (
      h5: string,
      inputNames: string[],
      inputTypes: string[],
      inputValues: string[],
      placeholders: string[],
      className?: string
    ) => {
      setIsModalChangeOpen(true);
      setModalWindowOptions({
        h5,
        inputNames,
        inputTypes,
        inputValues,
        placeholders,
        className: className || "",
      });
      setModalWindowErrors([""]);
    },
    [setIsModalChangeOpen, setModalWindowOptions, setModalWindowErrors]
  );
};
