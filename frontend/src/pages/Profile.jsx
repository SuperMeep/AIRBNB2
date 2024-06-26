import { useParams, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { resetBooking } from "../features/bookings/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import Places from "./Places";
import AccountNav from "../components/AccountNav";
import { useEffect } from "react";

function Account() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(resetBooking());
      dispatch(reset());
    }
  });

  return (
    <div>
      <AccountNav />

      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button className="primary max-w-sm mt-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <Places />}
    </div>
  );
}

export default Account;
