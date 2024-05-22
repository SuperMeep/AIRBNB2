import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPlace,
  updatePlace,
  reset,
  getPlace,
} from "../features/places/placeSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Perks from "../components/Perks";
import ImageUploader from "../components/ImageUploader";
import { useNavigate, useParams } from "react-router-dom";

function PlaceForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message, place } = useSelector(
    (state) => state.places
  );

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    image: [],
    description: "",
    perks: [],
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuests: "",
    price: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getPlace(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (place) {
      setFormData({
        ...place,
        image: place.image || [],
      });
    }
  }, [place, id]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updatePerks = (perk, checked) => {
    setFormData((prevFormData) => {
      const updatedPerks = checked
        ? [...prevFormData.perks, perk]
        : prevFormData.perks.filter((p) => p !== perk);
      return {
        ...prevFormData,
        perks: updatedPerks,
      };
    });
  };

  const handleCancel = () => {
    navigate("/account/places");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      address,
      description,
      perks,
      image,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = formData;

    if (
      !title ||
      !address ||
      !description ||
      !perks.length ||
      !image.length ||
      !checkIn ||
      !checkOut ||
      !maxGuests ||
      !price
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const updatedImages = await ImageUploader.uploadImages(image);

    const updatedPlaceData = {
      ...formData,
      image: updatedImages,
      owner: user.userId,
    };

    dispatch(
      id
        ? updatePlace({ id, updatedPlace: updatedPlaceData })
        : createPlace(updatedPlaceData)
    );

    setFormData({
      title: "",
      address: "",
      image: [],
      description: "",
      perks: [],
      extraInfo: "",
      checkIn: "",
      checkOut: "",
      maxGuests: "",
      price: "",
    });

    navigate("/account/places");
  };

  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message);
      dispatch(reset());
    }

    if (isError && message) {
      toast.error(message);
      dispatch(reset());
    }
  }, [isSuccess, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const preInput = (header, description) => (
    <>
      <h2 className="text-2xl mt-4">{header}</h2>
      <p className="text-gray-500 text-sm">{description}</p>
    </>
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* TITLE */}
        {preInput(
          "Title",
          "Title for your place. should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          placeholder="Title"
          onChange={onChange}
        />

        {/* ADDRESS */}
        {preInput("Address", "Address to this place")}
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          placeholder="Address"
          onChange={onChange}
        />

        {/* PHOTOS */}
        {preInput("Photos", "More = better")}
        <ImageUploader place={formData} setPlace={setFormData} />

        {/* DESCRIPTION */}
        {preInput("Description", "Description of the place")}
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onChange}
          cols="30"
          rows="10"></textarea>

        {/* PERKS */}
        {preInput("Perks", "Select all the perks of your place")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <Perks perks={formData.perks} onChange={updatePerks} />
        </div>

        {/* EXTRA INFO */}
        {preInput("Extra Info", "House rules, etc")}
        <textarea
          id="extraInfo"
          name="extraInfo"
          value={formData.extraInfo}
          onChange={onChange}
          cols="30"
          rows="10"></textarea>

        {/* CHECK IN&OUT TIMES AND MAX GUEST */}
        {preInput(
          "Check in&out times",
          "Add check in and out times, remember to have some time window for cleaning the room between guests."
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <FormInput
            label="Check-in time"
            type="text"
            id="checkIn"
            name="checkIn"
            value={formData.checkIn}
            placeholder="14:00"
            onChange={onChange}
          />
          <FormInput
            label="Check-out time"
            type="text"
            id="checkOut"
            name="checkOut"
            value={formData.checkOut}
            placeholder="11:00"
            onChange={onChange}
          />
          <FormInput
            label="Max number of guests"
            type="number"
            id="maxGuests"
            name="maxGuests"
            value={formData.maxGuests}
            placeholder="1"
            onChange={onChange}
          />
          <FormInput
            label="Price per night"
            type="number"
            id="price"
            name="price"
            value={formData.price}
            placeholder="100"
            onChange={onChange}
          />
        </div>

        <div className="flex justify-center mt-4 gap-2">
          <button type="submit" className="secondary">
            Save
          </button>
          <button type="button" onClick={handleCancel} className="secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const FormInput = ({ label, type, id, name, value, placeholder, onChange }) => (
  <div>
    <h3 className="mt-2 -mb-1">{label}</h3>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export default PlaceForm;
