import { createSlice } from "@reduxjs/toolkit";

const AvailableTimesSlice = createSlice({
  name: "AvailableTimes",
  initialState: [],
  reducers: {
    addAvailableTimes(state, action) {
      return [...state, ...action.payload];
    },
  },
});
export default AvailableTimesSlice;
export const { addAvailableTimes } = AvailableTimesSlice.actions;
