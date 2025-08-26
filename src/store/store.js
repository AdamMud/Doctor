import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./pages/auth/logIn/login";
// import { api } from "./apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
