import axios from "axios";

const API_URL = "/api/bookings";

// Create a booking
const createBooking = async (bookingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, bookingData, config);

  if (response.data) {
    localStorage.setItem("booking", JSON.stringify(response.data));
  }

  return response.data;
};

// Get bookings by user
const getBookingUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get a place by ID
const getBooking = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data;
};

const bookingService = {
  createBooking,
  getBookingUser,
  getBooking,
};

export default bookingService;
