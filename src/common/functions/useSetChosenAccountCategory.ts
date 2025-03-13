import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useSetChosenAccountCategory = (
  setChosenCategory: Dispatch<SetStateAction<string>>
) => {
  const navigate = useNavigate();

  return useCallback(
    (category: string) => {
      setChosenCategory(category);
      navigate(`/account/${category}`);
    },
    [setChosenCategory, navigate]
  );
};
