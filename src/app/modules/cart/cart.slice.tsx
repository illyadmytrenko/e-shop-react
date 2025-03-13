import { PaymentUserInfo } from "@/common/types/payment-user-info";
import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  usersPaymentInfo: Record<number, PaymentUserInfo>;
  checkoutSuccessStatus: Record<number, boolean>;
  expiryTimes: Record<number, number>;
}

const initialState: CartState = {
  usersPaymentInfo: {},
  checkoutSuccessStatus: {},
  expiryTimes: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setPaymentUserInfoInStore(state, action) {
      const { userId, paymentUserInfo, isCheckoutSuccess } = action.payload;
      state.usersPaymentInfo[userId] = paymentUserInfo;
      state.checkoutSuccessStatus[userId] = isCheckoutSuccess;
      state.expiryTimes[userId] = Date.now() + 5 * 60 * 1000;
    },
    clearCartState(state, action) {
      const { userId } = action.payload;
      delete state.usersPaymentInfo[userId];
      delete state.checkoutSuccessStatus[userId];
      delete state.expiryTimes[userId];
    },
    checkExpiry(state, action) {
      const { userId } = action.payload;
      if (userId === undefined) return;
      if (state.expiryTimes[userId] && Date.now() > state.expiryTimes[userId]) {
        clearCartState(userId);
      }
    },
  },
  selectors: {
    selectPaymentUserInfo: (state: CartState, userId: number) =>
      state.usersPaymentInfo[userId],
    selectExpiryTime: (state: CartState, userId: number) =>
      state.expiryTimes?.[userId] ?? 0,
  },
});

export const { setPaymentUserInfoInStore, clearCartState, checkExpiry } =
  cartSlice.actions;

export default cartSlice.reducer;
