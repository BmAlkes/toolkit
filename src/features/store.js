import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
import modalSlice from "./cart/modalSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    modal: modalSlice,
  },
});
