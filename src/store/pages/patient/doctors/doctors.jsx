// // src/redux/doctorApi.js
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const doctorApi = createApi({
//   reducerPath: "doctorApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002" }),
//   endpoints: (builder) => ({
//     getDoctors: builder.query({
//       query: () => "/doctors", 
//     }),
//   }),
// });

// export const { useGetDoctorsQuery } = doctorApi;




// src/redux/doctorApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002" }),
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => "/users", // Берем всех пользователей
      transformResponse: (response) =>
        response.filter((user) => user.role === "doctor"), // Фильтруем врачей
    }),
  }),
});

export const { useGetDoctorsQuery } = doctorApi;
