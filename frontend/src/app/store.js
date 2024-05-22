import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import placeReducer from "../features/places/placeSlice";
import bookingReducer from "../features/bookings/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingReducer,
    places: placeReducer,
  },
});
