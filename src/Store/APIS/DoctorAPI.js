import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const DoctorAPI = createApi({
  reducerPath: "/doctors",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  endpoints(builder) {
    return {
      postSignupDoctor: builder.mutation({
        query: (signupData) => {
          return {
            method: "POST",
            body: { ...signupData },
            url: "/doctors/signup",
          };
        },
      }),
      putProfileDoctor: builder.mutation({
        query: (doctorData) => {
          return {
            method: "PUT",
            credentials: "include",
            url: "/doctor/profile",
            body: { ...doctorData },
          };
        },
      }),
      getDoctors: builder.query({
        query: (page) => {
          return {
            method: "GET",
            url: "/doctors",
            params: { page: page },
          };
        },
      }),
      getDoctorReviews: builder.query({
        query: (queryData) => {
          return {
            method: "GET",
            url: "/doctor/reviews",
            params: { ...queryData },
          };
        },
      }),
      getAvailableTimes: builder.query({
        query: (queryData) => {
          return {
            method: "GET",
            url: "/doctor/availabletimes",
            params: { ...queryData },
          };
        },
      }),
      postAvailableTimes: builder.mutation({
        query: (availableTimes) => {
          return {
            method: "POST",
            body: { ...availableTimes },
            url: "/doctor/availabletimes",
            credentials: "include",
          };
        },
      }),
    };
  },
});
export default DoctorAPI;
export const {
  usePostSignupDoctorMutation,
  usePutProfileDoctorMutation,
  useGetDoctorsQuery,
  useGetDoctorReviewsQuery,
  useGetAvailableTimesQuery,
  usePostAvailableTimesMutation,
} = DoctorAPI;
