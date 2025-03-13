import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/common/shared/redux";
import { logout } from "@/app/modules/users/user-info.slice";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useCallback(() => {
    dispatch(logout());
    localStorage.clear();
    sessionStorage.clear();
    navigate("/home");
  }, [dispatch, navigate]);
};
