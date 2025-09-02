// store/api/reviewsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002/" }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (doctorId) => `reviews?doctorId=${doctorId}`,
      providesTags: (result = [], error, doctorId) =>
        result
          ? [...result.map(({ id }) => ({ type: "Reviews", id })), { type: "Reviews", id: `DOCTOR_${doctorId}` }]
          : [{ type: "Reviews", id: `DOCTOR_${doctorId}` }],
    }),
    addReview: builder.mutation({
      query: ({ doctorId, author, text }) => ({
        url: "reviews",
        method: "POST",
        body: { doctorId, author, text },
      }),
      invalidatesTags: (result, error, { doctorId }) => [{ type: "Reviews", id: `DOCTOR_${doctorId}` }],
    }),
  }),
});

export const { useGetReviewsQuery, useAddReviewMutation } = reviewsApi;
