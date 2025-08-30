

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002/" }),
//   tagTypes: ["Users", "Patients", "Doctors", "Appointments", "Chat"],
//   endpoints: (builder) => ({
//     getUsers: builder.query({
//       query: () => "users",
//       providesTags: ["Users"],
//     }),
//     getPatients: builder.query({
//       query: () => "patients",
//       providesTags: ["Patients"],
//     }),
//     getDoctors: builder.query({
//       query: () => "doctors",
//       providesTags: ["Doctors"],
//     }),
//     getAppointments: builder.query({
//       query: () => "appointments",
//       providesTags: ["Appointments"],
//     }),
//     getChat: builder.query({
//       query: () => "chat",
//       providesTags: ["Chat"],
//     }),
//     addUser: builder.mutation({ // исправлено mautation → mutation
//       query: (newUser) => ({
//         url: "users",
//         method: "POST",
//         body: newUser,
//       }),
//       invalidatesTags: ["Users"],
//     }),
//   }),
// });

// export const {
//   useGetUsersQuery,
//   useGetPatientsQuery,
//   useGetDoctorsQuery,
//   useGetAppointmentsQuery,
//   useGetChatQuery,
//   useAddUserMutation,
// } = apiSlice;





import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002/" }),
  tagTypes: ["Users", "Patients", "Doctors", "Appointments", "Chat"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
      providesTags: ["Users"],
    }),
    getPatients: builder.query({
      query: () => "patients",
      providesTags: ["Patients"],
    }),
    getDoctors: builder.query({
      query: () => "doctors",
      providesTags: ["Doctors"],
    }),
    getAppointments: builder.query({
      query: () => "appointments",
      providesTags: ["Appointments"],
    }),
    getChat: builder.query({
      query: () => "chat",
      providesTags: ["Chat"],
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),

    // 🔹 новый endpoint для получения юзера по токену
    getUserByToken: builder.query({
      query: (token) => `users?token=${token}`,
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetPatientsQuery,
  useGetDoctorsQuery,
  useGetAppointmentsQuery,
  useGetChatQuery,
  useAddUserMutation,
  useGetUserByTokenQuery, // ← новый хук
} = apiSlice;
