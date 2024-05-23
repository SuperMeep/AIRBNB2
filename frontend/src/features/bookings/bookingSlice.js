import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

// Set initial state
const initialState = {
  bookings: [],
  booking: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get bookings
export const getBookingUser = createAsyncThunk(
  "bookings/getByUser",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.getBookingUser(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create Booking
export const createBooking = createAsyncThunk(
  "bookings/create",
  async (bookingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.createBooking(bookingData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a booking by ID
export const getBooking = createAsyncThunk(
  "bookings/getById",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await bookingService.getBooking(id, token);
      return response; // Return the whole response
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Booking slice
export const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    resetBooking: (state) => {
      Object.assign(state, initialState);
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Create booking reducers
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get bookings by user
      .addCase(getBookingUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookingUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(getBookingUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get a booking by ID
      .addCase(getBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;
      })
      .addCase(getBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
