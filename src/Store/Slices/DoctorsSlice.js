import { createSlice } from "@reduxjs/toolkit";

const DoctorsSlice = createSlice({
  name: "Doctors",
  initialState: [],
  reducers: {
    addDoctors(state, action) {
      if (state.length === 0) return [...action.payload];
      const notDublicatesDoctors = action.payload.filter((doctor) => {
        return state.every((doc) => doc._id !== doctor._id);
      });

      return [...state, ...notDublicatesDoctors];
    },
    addReviews(state, action) {
      const updatedState = state.map((doc) => {
        if (doc._id === action.payload.doctorId) {
          const newReviews = action.payload.reviews.filter((review) => {
            if (!doc.reviews) {
              return true;
            } else {
              const foundRev = doc.reviews.every(
                (rev) => rev._id !== review._id
              );
              if (foundRev) return true;
              else return false;
            }
          });

          console.log(
            doc.reviews ? [...doc.reviews, ...newReviews] : [...newReviews]
          );
          return {
            ...doc,
            reviews: doc.reviews
              ? [...doc.reviews, ...newReviews]
              : [...newReviews],
          };
        }
        return doc;
      });

      return updatedState;
    },
  },
});
export default DoctorsSlice;
export const { addDoctors, addReviews } = DoctorsSlice.actions;
