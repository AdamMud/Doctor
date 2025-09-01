export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002" }),
  endpoints: (builder) => ({
    getUserByToken: builder.query({
      query: (token) => `/users?token=${token}`,
    }),
  }),
});

export const { useGetUserByTokenQuery } = userApi;
