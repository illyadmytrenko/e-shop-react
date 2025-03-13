import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { extraArgument } from "@/common/shared/extra-argument";
import { baseApi } from "@/common/shared/api";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userInfoReducer from "../app/modules/users/user-info.slice";
import productsReducer from "../app/modules/products/products.slice";
import cartReducer, { clearCartState } from "../app/modules/cart/cart.slice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  userInfo: userInfoReducer,
  product: productsReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userInfo", "product", "cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cartExpiryMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  const state = store.getState().cart;

  if (state.expiryTimes) {
    Object.keys(state.expiryTimes).forEach((userId) => {
      const expiryTime = state.expiryTimes[userId];
      if (expiryTime && Date.now() > expiryTime) {
        store.dispatch(clearCartState({ userId }));
      }
    });
  }

  return result;
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: { extraArgument },
    })
      .concat(baseApi.middleware)
      .concat(cartExpiryMiddleware),
});

// Создаём persistor
export const persistor = persistStore(store);
