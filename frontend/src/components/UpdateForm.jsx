import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlace, updatePlace, reset } from "../features/places/placeSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Perks from "../components/Perks";
import ImageUploader from "../components/ImageUploader";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

function UpdateForm({ place }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updatedPlace, setUpdatedPlace] = useState({ ...place });
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.places
  );

  useEffect(() => {
    if (place) {
      console.log("Place ID:", place._id);
      console.log("Place Data:", place);
      setUpdatedPlace({ ...place });
    }
  }, [place]);

  if (!place) {
    return <div>Loading...</div>; // Or handle the case when place is not available
  }

  const onChange = (e) => {
    console.log(e.target.name, e.target.value); // Check the name and value being changed
    setUpdatedPlace({
      ...updatedPlace,
      [e.target.name]: e.target.value,
    });
  };

  const updatePerks = (perk, checked) => {
    setUpdatedPlace((prevPlace) => {
      let updatedPerks;
      if (checked) {
        updatedPerks = [...prevPlace.perks, perk];
      } else {
        updatedPerks = prevPlace.perks.filter((p) => p !== perk);
      }
      return {
        ...prevPlace,
        perks: updatedPerks,
      };
    });
  };

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (
      !updatedPlace.title ||
      !updatedPlace.address ||
      !updatedPlace.description ||
      !updatedPlace.perks.length ||
      !updatedPlace.image ||
      updatedPlace.image.length === 0 ||
      !updatedPlace.checkIn ||
      !updatedPlace.checkOut ||
      !updatedPlace.maxGuests ||
      !updatedPlace.price
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Dispatch updatePlace.pending() before starting the process
    dispatch(updatePlace.pending());

    const cloudinaryURL = process.env.REACT_APP_CLOUDINARY_URL;
    const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;

    try {
      const imageUrls = await Promise.all(
        updatedPlace.image.map(async (image) => {
          if (image.file instanceof File) {
            const imageData = new FormData();
            imageData.append("file", image.file);
            imageData.append("upload_preset", uploadPreset);
            imageData.append("folder", "upload");

            const response = await fetch(cloudinaryURL, {
              method: "POST",
              body: imageData,
            });

            const data = await response.json();
            return data.secure_url; // Return imageUrl only
          } else {
            return image.imageUrl; // If image is already uploaded, return the imageUrl
          }
        })
      );

      const updatedImageObjects = updatedPlace.image.map((image, index) => ({
        ...image,
        imageUrl: imageUrls[index] || image.imageUrl,
      }));

      const updatedPlaceData = {
        ...updatedPlace,
        image: updatedImageObjects, // Updated image array with new imageUrls
      };

      console.log("Updated Place Data:", updatedPlaceData);

      // Dispatch action to update place
      dispatch(updatePlace({ id: place._id, updatedPlace: updatedPlaceData }));

      // Reset the form fields
      setUpdatedPlace(updatedPlaceData);

      navigate("/account/places");
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error
    }
  };

  const handleDelete = async () => {
    if (place && place._id) {
      dispatch(deletePlace(place._id));
    }
  };

  const handleCancel = () => {
    navigate("/account/places");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isSuccess && message) {
    toast.success(message);
    dispatch(reset());
  }

  if (isError && message) {
    toast.error(message);
    dispatch(reset());
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* TITLE */}
        <div>
          {preInput(
            "Title",
            "Title for your place. should be short and catchy as in advertisement"
          )}
          <input
            type="text"
            id="title"
            name="title"
            value={updatedPlace.title}
            placeholder="Title"
            onChange={onChange}
          />
        </div>

        {/* ADDRESS */}
        <div>
          {preInput("Address", "Address to this place")}
          <input
            type="text"
            id="address"
            name="address"
            value={updatedPlace.address}
            placeholder="address"
            onChange={onChange}
          />
        </div>

        {/* PHOTOS */}
        <div>
          {preInput("Photos", "more = better")}
          <div>
            <ImageUploader
              place={{ ...updatedPlace, image: updatedPlace.image }}
              setPlace={setUpdatedPlace}
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          {preInput("Description", "Description of the place")}
          <textarea
            id="description"
            name="description"
            value={updatedPlace.description}
            onChange={onChange}
            cols="30"
            rows="10"></textarea>
        </div>

        {/* PERKS */}
        <div>
          {" "}
          {preInput("Perks", "Select all the perks of your place")}
          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <Perks perks={updatedPlace.perks} onChange={updatePerks} />
          </div>
        </div>

        {/* EXTRA INFO */}
        <div>
          {preInput("Extra info", "house rules, etc")}
          <textarea
            id="extraInfo"
            name="extraInfo"
            value={updatedPlace.extraInfo}
            onChange={onChange}
            cols="30"
            rows="10"></textarea>
        </div>

        {/* CHECK IN&OUT TIMES AND MAX GUEST */}
        <div>
          {preInput(
            "Check in&out times",
            "Add check in and out times, remember to have some time window for cleaning the room between guests."
          )}
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="label">Check-in time</h3>
              <input
                type="text"
                id="checkIn"
                name="checkIn"
                value={updatedPlace.checkIn}
                placeholder="14:00"
                onChange={onChange}
              />
            </div>

            <div>
              <h3 className="label">Check-out time</h3>
              <input
                type="text"
                id="checkOut"
                name="checkOut"
                value={updatedPlace.checkOut}
                placeholder="14:00"
                onChange={onChange}
              />
            </div>

            <div>
              <h3 className="label">Max number of guests</h3>
              <input
                type="number"
                id="maxGuests"
                name="maxGuests"
                value={updatedPlace.maxGuests}
                placeholder="14:00"
                onChange={onChange}
              />
            </div>

            <div>
              <h3 className="label">Price per night</h3>
              <input
                type="number"
                id="price"
                name="price"
                value={updatedPlace.price}
                placeholder="14:00"
                onChange={onChange}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="primary my-4">
          Save
        </button>
        <button type="button" onClick={handleCancel} className="primary my-4">
          Cancels
        </button>
      </form>
      <button type="button" className="" onClick={handleDelete}>
        <FaTrashAlt />
      </button>
    </div>
  );
}

export default UpdateForm;
