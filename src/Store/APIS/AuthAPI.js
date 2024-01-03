import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const AuthAPI = createApi({
  reducerPath: "/auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  endpoints(builder) {
    return {
      postAuth: builder.mutation({
        query: () => {
          return {
            method: "POST",
            credentials: "include",
            url: "/user/auth",
          };
        },
      }),
      postLogin: builder.mutation({
        query: (loginData) => {
          return {
            method: "POST",
            body: { ...loginData },
            url: "/user/login",
            credentials: "include",
          };
        },
      }),
      postLogout: builder.mutation({
        query: () => {
          return {
            method: "POST",
            url: "/user/logout",
            credentials: "include",
          };
        },
      }),
    };
  },
});
export default AuthAPI;

export const {
  usePostAuthMutation,
  usePostLoginMutation,
  usePostLogoutMutation,
} = AuthAPI;
