import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa6";
import AccountNav from "../components/AccountNav";
import {
  getPlaceUser,
  deletePlace,
  reset,
} from "../features/places/placeSlice";
import PlaceImg from "../components/PlaceImg";
import { FaRegTrashAlt } from "react-icons/fa";
import Spinner from "../components/Spinner";

function Places() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { places, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.places
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getPlaceUser());
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (isSuccess && message) {
      setTimeout(() => {
        toast.success(message);
        dispatch(reset());
      });
    }

    if (isError && message) {
      setTimeout(() => {
        toast.error(message);
        dispatch(reset());
      });
    }
  }, [isSuccess, isError, message, dispatch]);

  const handleAddNewPlace = () => {
    navigate("/account/places/new");
    dispatch(reset());
  };

  const handleDelete = async (placeId) => {
    await dispatch(deletePlace(placeId));
    dispatch(getPlaceUser()); // Fetch updated list of places
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <button
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          onClick={handleAddNewPlace}>
          <FaPlus className="w-5 h-5" />
          Add new place
        </button>
      </div>

      <div className="mt-4">
        {places.length > 0 &&
          places.map((place, index) => (
            <div key={place._id} className="relative">
              <Link
                to={"/account/places/" + place._id}
                className="flex cursor-pointer gap-4 bg-gray-100 p-4 mt-4 rounded-2xl">
                <div className="flex bg-gray-300 grow-0 shrink-0 object-cover w-32 h-32">
                  <PlaceImg place={place} index={0} />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl font-semibold">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </Link>
              <span
                className="cursor-pointer absolute bottom-1 right-1 text-white bg-red-500 py-2 px-3 rounded-full"
                onClick={() => handleDelete(place._id)}>
                <FaRegTrashAlt />
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Places;
