import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import ConfigSlice from "./Slices/ConfigSlice";
import {
  changePath,
  changeIsLoggedIn,
  changeRole,
  changeLogOutState,
  changeSelectedDoctorId,
} from "./Slices/ConfigSlice";

import AuthAPI from "./APIS/AuthAPI";
import DoctorAPI from "./APIS/DoctorAPI";
import PatientAPI from "./APIS/PatientAPI";

import {
  usePostAuthMutation,
  usePostLoginMutation,
  usePostLogoutMutation,
} from "./APIS/AuthAPI";

import {
  usePostSignupDoctorMutation,
  useGetDoctorsQuery,
  useGetDoctorReviewsQuery,
  useGetAvailableTimesQuery,
  usePostAvailableTimesMutation,
} from "./APIS/DoctorAPI";

import {
  usePostSignupPatientMutation,
  usePostReviewMutation,
} from "./APIS/PatientAPI";

import UserSlice from "./Slices/UserSlice";
import { fetchUser } from "./Slices/UserSlice";

import DoctorsSlice from "./Slices/DoctorsSlice";

import { addDoctors, addReviews } from "./Slices/DoctorsSlice";

import AvailableTimesSlice from "./Slices/AvailableTimesSlice";
import { addAvailableTimes } from "./Slices/AvailableTimesSlice";

const Store = configureStore({
  reducer: {
    config: ConfigSlice.reducer,
    user: UserSlice.reducer,
    doctors: DoctorsSlice.reducer,
    availableTimes: AvailableTimesSlice.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [DoctorAPI.reducerPath]: DoctorAPI.reducer,
    [PatientAPI.reducerPath]: PatientAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AuthAPI.middleware)
      .concat(DoctorAPI.middleware)
      .concat(PatientAPI.middleware),
});

setupListeners(Store.dispatch);

export {
  Store,
  changeLogOutState,
  fetchUser,
  changePath,
  changeRole,
  changeIsLoggedIn,
  usePostAuthMutation,
  usePostLoginMutation,
  usePostSignupDoctorMutation,
  usePostSignupPatientMutation,
  usePostLogoutMutation,
  useGetDoctorsQuery,
  addDoctors,
  changeSelectedDoctorId,
  useGetDoctorReviewsQuery,
  addReviews,
  usePostReviewMutation,
  addAvailableTimes,
  useGetAvailableTimesQuery,
  usePostAvailableTimesMutation,
};
