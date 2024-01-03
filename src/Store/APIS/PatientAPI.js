import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const PatientAPI = createApi({
  reducerPath: "/patient",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  endpoints(builder) {
    return {
      postSignupPatient: builder.mutation({
        query: (signupData) => {
          return {
            method: "POST",
            body: { ...signupData },
            url: "/patients/signup",
          };
        },
      }),
      putProfilePatient: builder.mutation({
        query: (patientData) => {
          return {
            method: "PUT",
            credentials: "include",
            url: "/patient/profile",
            body: { ...patientData },
          };
        },
      }),
      postReview: builder.mutation({
        query: (revObj) => {
          return {
            method: "POST",
            url: "/doctor/reviews",
            body: { ...revObj },
            credentials: "include",
          };
        },
      }),
    };
  },
});
export default PatientAPI;
export const {
  usePostSignupPatientMutation,
  usePutProfilePatientMutation,
  usePostReviewMutation,
} = PatientAPI;
