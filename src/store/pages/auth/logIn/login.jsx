


// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002" }),
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: ({ email, password, role }) =>
//         `users?email=${email}&password=${password}&role=${role}`,
//     }),
//     getPatients: builder.query({
//       query: (doctorId) => `patients?doctorId=${doctorId}`,
//     }),
    
//   }),
// });

// export const { useLoginMutation, useGetPatientsQuery } = apiSlice;


// src/store/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', // ключ в store
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/' }), // адрес json-server
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users', // GET /users
    }),
  }),
});

export const { useGetUsersQuery } = apiSlice;
