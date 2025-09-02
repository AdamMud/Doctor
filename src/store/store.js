import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./pages/auth/logIn/login";
import { doctorApi } from "./pages/patient/doctors/doctors";
import { userApi } from "./pages/info/info";
import { reviewsApi } from "./pages/patient/doctors/reviews/reviews";
// import { api } from "./apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [reviewsApi.reducerPath]:reviewsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(doctorApi.middleware)
      .concat(reviewsApi.middleware),

});
