import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { URLs } from "../constants/urlConstants";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [inputPara, setInputPara] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    marriedStatus: false,
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setInputPara((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const createUserHandle = async (e) => {
    e.preventDefault();
    try {
      await axios.post(URLs.AXIOS_GET_POST_UPDATE_DELETE, inputPara);
      toast.success("Sign up successfull!");
      navigate("/");
    } catch (error) {
      toast.error("Error during sign up");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Sign Up Form</h2>
        <ToastContainer />

        <div className="row justify-content-center">
          <div className="col-md-6">
            <form
              onSubmit={createUserHandle}
              className="p-4 border rounded shadow-sm"
            >
              {/* First Name */}
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter First Name"
                  name="firstName"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Last Name */}
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter Last Name"
                  name="lastName"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="mb-3">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  name="dob"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Married Status */}
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="marriedStatus"
                  name="marriedStatus"
                  checked={inputPara.marriedStatus}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="marriedStatus"
                >
                  Married
                </label>
              </div>

              {/* Gender */}
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="form-select"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>

              {/* Link to Sign In */}
              <div className="text-center mt-3">
                <Link to="/" className="text-decoration-none">
                  Already a User? Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
