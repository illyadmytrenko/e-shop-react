import { UserInfo } from "@/common/types/user-info";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserInfoState = {
  userInfo: UserInfo | null;
  category:
    | "Personal Data"
    | "Payment & Instalments"
    | "Orders"
    | "Wish List"
    | "Security & Access"
    | "Notification";
  status: "idle" | "loading" | "success" | "error";
};

const initialState: UserInfoState = {
  userInfo: null,
  category: "Personal Data",
  status: "idle",
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>): void => {
      state.status = "loading";
      state.userInfo = action.payload;
      state.status = "success";
    },
    clearUserInfo: (state): void => {
      state.status = "loading";
      state.userInfo = null;
      state.status = "idle";
    },
    setAccountCategory: (state, action): void => {
      state.status = "loading";
      const { category } = action.payload;
      state.category = category;
      state.status = "success";
    },
    setUserInfoLoading: (state): void => {
      state.status = "loading";
    },
    setUserInfoSuccess: (state): void => {
      state.status = "success";
    },
    setUserInfoError: (state): void => {
      state.status = "error";
    },
    logout: (state): void => {
      state.userInfo = null;
      state.status = "idle";
    },
  },
  selectors: {
    selectUserInfo: (state: UserInfoState): UserInfo | null => state.userInfo,
    selectUserInfoId: (state: UserInfoState): number =>
      state.userInfo?.userId ?? 0,
    selectAccountCategory: (state: UserInfoState): string => state.category,
    selectUserInfoStatus: (state: UserInfoState): string => state.status,
  },
});

export const {
  setUserInfo,
  clearUserInfo,
  setAccountCategory,
  setUserInfoLoading,
  setUserInfoError,
  setUserInfoSuccess,
  logout,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
