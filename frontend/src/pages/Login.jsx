import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";

import usePasswordToggle from "../components/PasswordInput";
import Spinner from "../components/Spinner";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  const [PasswordInputType] = usePasswordToggle();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mt-4 flex grow items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={onSubmit}>
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
            placeholder="password"
            onChange={onChange}
          />
          <button type="submit" className="primary">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/signup"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// import { Link } from "react-router-dom";

// function Login() {
//   return (
//     <div>
//       Loginereks
//       <Link to={"/signup"}> Gogo</Link>
//     </div>
//   );
// }

// export default Login;
