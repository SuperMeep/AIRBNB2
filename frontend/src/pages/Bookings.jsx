import AccountNav from "../components/AccountNav";
import { useEffect } from "react";
import { getBookingUser } from "../features/bookings/bookingSlice";
import { useSelector, useDispatch } from "react-redux";
import PlaceImg from "../components/PlaceImg";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import BookingDates from "../components/BookingDates";

export default function Bookings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookings, isLoading } = useSelector((state) => state.bookings);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getBookingUser());
    }
  }, [user, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!bookings || bookings.length === 0) {
    return <div>No bookings found</div>;
  }

  return (
    <div>
      <AccountNav />
      <div>
        {bookings.map((booking) => (
          <Link
            key={booking._id}
            to={`/account/bookings/${booking._id}`}
            className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mt-4">
            <div className="w-48">
              <PlaceImg place={booking.place} />
            </div>
            <div className="py-3 pr-3 grow">
              <h2 className="text-xl">{booking.place.title}</h2>
              <div className="text-xl">
                <BookingDates
                  booking={booking}
                  className="mb-2 mt-4 text-gray-500"
                />
                <div className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  <span className="text-2xl">
                    Total price: ${booking.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
