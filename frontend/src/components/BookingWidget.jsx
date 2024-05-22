import { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, reset } from "../features/bookings/bookingSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function BookingWidget() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message, place } = useSelector(
    (state) => state.places
  );

  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    numberOfGuests: 1,
    name: "",
    phone: "",
  });

  const onChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setBookingData((prevData) => ({ ...prevData, name: user.name }));
    }
  }, [user]);

  const { checkIn, checkOut, numberOfGuests, name, phone } = bookingData;

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut || !numberOfGuests || !name || !phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const updatedBookingData = {
      ...bookingData,
      place: place._id,
      price: numberOfNights * place.price,
    };

    dispatch(createBooking(updatedBookingData));

    setBookingData({
      checkIn: "",
      checkOut: "",
      numberOfGuests: 1,
      name: "",
      phone: "",
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

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <br />
            <input
              type="date"
              name="checkIn"
              value={checkIn}
              onChange={onChange}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <br />
            <input
              type="date"
              name="checkOut"
              value={checkOut}
              min={checkIn} // Set the minimum date for checkOut based on checkIn
              onChange={onChange}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input
            type="number"
            name="numberOfGuests"
            value={numberOfGuests}
            onChange={onChange}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input type="text" name="name" value={name} onChange={onChange} />
            <label>Phone number:</label>
            <input type="tel" name="phone" value={phone} onChange={onChange} />
          </div>
        )}
      </div>
      <button onClick={onSubmit} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}
