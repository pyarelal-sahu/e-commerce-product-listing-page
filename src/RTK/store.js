import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./slices/productsSlice";

/**
 * Root Redux store instance.
 */
export const store = configureStore({
  reducer: {
    products: productsReducer
  }
});
