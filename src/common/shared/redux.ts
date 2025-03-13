import {
  asyncThunkCreator,
  buildCreateSlice,
  createAsyncThunk,
  createSelector,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { store } from "@/app/store";
import { extraArgument } from "./extra-argument";

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<
  R,
  AppState,
  typeof extraArgument,
  UnknownAction
>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  extra: typeof extraArgument;
}>();

export type ExtraArgument = typeof extraArgument;

export const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
