import { useEffect } from "react";
import { toast } from "react-toastify";
import { reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getPlaces } from "../features/places/placeSlice";
import Spinner from "../components/Spinner";
import PlaceImg from "../components/PlaceImg";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess } = useSelector(
    (state) => state.auth
  );
  const { message } = useSelector((state) => state.bookings);

  const { places } = useSelector((state) => state.places);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getPlaces());
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.image?.[0] && (
                <PlaceImg
                  className="rounded-2xl object-cover aspect-square"
                  place={place}
                  index={0}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Home;
