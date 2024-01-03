import { createSlice } from "@reduxjs/toolkit";
const ConfigSlice = createSlice({
  name: "Config",
  initialState: {
    path: "/home",
    isLoggedIn: false,
    role: "",
    logoutState: false,
    selectedDoctorId: "",
  },
  reducers: {
    changePath(state, action) {
      return { ...state, path: action.payload };
    },
    changeIsLoggedIn(state, action) {
      return { ...state, isLoggedIn: action.payload };
    },
    changeRole(state, action) {
      return { ...state, role: action.payload };
    },
    changeLogOutState(state, action) {
      return { ...state, logoutState: action.payload };
    },
    changeSelectedDoctorId(stata, action) {
      return { ...stata, selectedDoctorId: action.payload };
    },
  },
});
export default ConfigSlice;
export const {
  changePath,
  changeIsLoggedIn,
  changeRole,
  changeLogOutState,
  changeSelectedDoctorId,
} = ConfigSlice.actions;
