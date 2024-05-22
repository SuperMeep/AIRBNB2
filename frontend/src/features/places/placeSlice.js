import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import placeService from "./placeService";

// Set initial state
const initialState = {
  places: [],
  place: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get places
export const getPlaceUser = createAsyncThunk(
  "places/getByUser",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await placeService.getPlaceUser(token);
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
// Get places
export const getPlaces = createAsyncThunk(
  "places/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await placeService.getPlaces(token);
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

// Get a place by ID
export const getPlace = createAsyncThunk(
  "places/getById",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await placeService.getPlace(id, token);
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

// Create Place
export const createPlace = createAsyncThunk(
  "places/create",
  async (placeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await placeService.createPlace(placeData, token);
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

// Delete Place
export const deletePlace = createAsyncThunk(
  "places/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await placeService.deletePlace(id, token);
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

// Update Place
export const updatePlace = createAsyncThunk(
  "places/update",
  async ({ id, updatedPlace }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await placeService.updatePlace(id, token, updatedPlace);
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

// Place slice
export const placeSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Create place reducers
      .addCase(createPlace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPlace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.places.push(action.payload);
        state.message = "Place created successfully!";
      })
      .addCase(createPlace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get places by user
      .addCase(getPlaceUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlaceUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.places = action.payload;
      })
      .addCase(getPlaceUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get places
      .addCase(getPlaces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.places = action.payload;
      })
      .addCase(getPlaces.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get a place by ID
      .addCase(getPlace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.place = action.payload;
      })
      .addCase(getPlace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete place
      .addCase(deletePlace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePlace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Place deleted successfully!";
        state.places = state.places.filter(
          (place) => place._id !== action.payload._id
        );
      })
      .addCase(deletePlace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update place
      .addCase(updatePlace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePlace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Place updated successfully!";
        state.places = state.places.map((place) =>
          place._id === action.payload._id ? action.payload : place
        );
      })
      .addCase(updatePlace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = placeSlice.actions;
export default placeSlice.reducer;
