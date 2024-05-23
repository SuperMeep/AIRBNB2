import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages & components
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Places from "./pages/Places";
import PlaceForm from "./components/PlaceForm"; // Use PlaceForm for both create and update
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Place from "./pages/Place";

function App() {
  return (
    <div className="p-4 flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/account/bookings" element={<Bookings />} />
          <Route path="/account/places" element={<Places />} />
          <Route path="/account/places/new" element={<PlaceForm />} />{" "}
          <Route path="/account/places/:id" element={<PlaceForm />} />{" "}
          <Route path="/place/:id" element={<Place />} />{" "}
          <Route path="/account/bookings" element={<Bookings />} />
          <Route path="/account/bookings/:id" element={<Booking />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
