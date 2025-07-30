import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./slices/cartSlicer";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})