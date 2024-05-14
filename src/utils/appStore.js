import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import themeReducer from "./themeSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
  },
});

export default appStore;
