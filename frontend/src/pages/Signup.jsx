import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import usePasswordToggle from "../components/PasswordInput";
import Spinner from "../components/Spinner";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };
  const [PasswordInputType] = usePasswordToggle();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form onSubmit={onSubmit} className="max-w-md mx-auto">
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="John Smith"
            onChange={onChange}
          />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="your@email.com"
            onChange={onChange}
          />
          <input
            type={PasswordInputType}
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={onChange}
          />
          <input
            type={PasswordInputType}
            id="password2"
            name="password2"
            value={password2}
            placeholder="Enter your password"
            onChange={onChange}
          />
          <button type="submit" className="primary">
            Submit
          </button>
          <div className="text-center py-2 text-gray-500">
            You already have an account?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// function Signup() {
//   return <div>Signup</div>;
// }

// export default Signup;
