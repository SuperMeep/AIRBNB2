import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlace } from "../features/places/placeSlice";
import { useDispatch, useSelector } from "react-redux";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";
import BookingWidget from "../components/BookingWidget";

function Place() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Use useSelector to get the place data from the Redux store
  const place = useSelector((state) => state.places.place);

  useEffect(() => {
    if (!id) {
      navigate("/place");
    } else {
      dispatch(getPlace(id));
    }
  }, [navigate, dispatch, id]);

  if (!place) return;

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}

export default Place;
