// src/redux/doctorApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002" }),
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => "/doctors", 
    }),
  }),
});

export const { useGetDoctorsQuery } = doctorApi;
