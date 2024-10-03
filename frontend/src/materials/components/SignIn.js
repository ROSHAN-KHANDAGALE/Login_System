import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { URLs } from "../constants/urlConstants";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onChangeHandle = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const loginHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URLs.AXIOS_POST_LOGIN, credentials);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.userInfo));
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed!");
      setCredentials({ email: "", password: "" });
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Sign In Form</h2>
        <ToastContainer />
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form
              onSubmit={loginHandle}
              className="p-4 border rounded shadow-sm"
            >
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={credentials.email}
                  onChange={onChangeHandle}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  value={credentials.password}
                  onChange={onChangeHandle}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3">
                Sign In
              </button>
              <div className="text-center">
                <Link to="/signup" className="text-decoration-none">
                  Not a User? Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
