// --- src/redux/store.js ---
import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./slices/countriesSlice";

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
  },
});

export default store;