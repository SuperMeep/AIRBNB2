import axios from "axios";

const API_URL = "/api/places";

// Create a place
const createPlace = async (placeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, placeData, config);

  if (response.data) {
    localStorage.setItem("place", JSON.stringify(response.data));
  }

  return response.data;
};

// Get places by user
const getPlaceUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${"user"}`, config);

  return response.data;
};
// Get places
const getPlaces = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get a place by ID
const getPlace = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data;
};

// Delete book
const deletePlace = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

// Update book
const updatePlace = async (id, token, updatedPlace) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedPlace, config);
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      console.log("Place ID:", id);
      throw new Error("Place not found");
    } else {
      throw error;
    }
  }
};

const placeService = {
  createPlace,
  getPlaceUser,
  getPlaces,
  getPlace,
  deletePlace,
  updatePlace,
};

export default placeService;
