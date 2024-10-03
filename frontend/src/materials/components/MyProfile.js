import { useState, useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import DefaultImage from "../assests/avatar.png";
import EditIcon from "../assests/edit-text.png";
import { URLs } from "../constants/urlConstants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyProfile = () => {
  const [avatarURL, setAvatarURL] = useState(DefaultImage);
  const [data, setData] = useState({});

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const obj = JSON.parse(user);
  const navigate = useNavigate();
  const fileUploadRef = useRef(null);

  // Fetch logged-in user's data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${URLs.AXIOS_GET_POST_UPDATE_DELETE}/${obj._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data.info);
        // setData(response.data.report.avatar);
      } catch (error) {
        toast.error("Error fetching user profile");
      }
    };
    fetchUserData();
  }, [token, obj._id]);

  // Handle input change
  const onChangeHandle = (e) => {
    const { name, value, type, checked } = e.target;
    setData({ ...data, [name]: type === "checkbox" ? checked : value });
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  // Handle image file selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(URLs.AXIOS_UPLOAD_IMAGE, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        // Update avatar URL with the uploaded image path
        setAvatarURL(response.data.file.path); // Assuming your backend returns the path of the uploaded file
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image", error);
        toast.error("Error uploading image");
      }
    }
  };

  // Handle profile update
  const handleUpdateButton = async (e) => {
    if (window.confirm("Are you sure you want to update your profile?")) {
      try {
        await axios.put(
          `${URLs.AXIOS_GET_POST_UPDATE_DELETE}/${data._id}`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Profile updated successfully!");
      } catch (error) {
        toast.error("Error updating profile");
      }
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        await axios.delete(`${URLs.AXIOS_GET_POST_UPDATE_DELETE}/${data._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Profile deleted successfully!");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      } catch (error) {
        toast.error("Error deleting profile");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="relative h-96 w-96 m-8">
        <img src={avatarURL} alt="Avatar" className="h-96 w-96 rounded-full" />
      </div>

      <Form encType="multipart/form-data">
        <button
          type="button"
          onClick={handleImageUpload}
          className="flex-center absolute bottom-12 right-14 h-9 w-9 rounded-full"
        >
          <img src={EditIcon} alt="Edit" className="object-cover" />
        </button>
        <input
          type="file"
          id="file"
          ref={fileUploadRef}
          hidden
          onChange={handleFileChange}
        />

        {/* First Name Field */}
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandle}
            required
          />
        </Form.Group>

        {/* Last Name Field */}
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandle}
            required
          />
        </Form.Group>

        {/* Email Field */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={data.email}
            onChange={onChangeHandle}
            required
          />
        </Form.Group>

        {/* Date of Birth Field */}
        <Form.Group className="mb-3" controlId="formDob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dob"
            value={data.dob ? data.dob.split("T")[0] : ""}
            onChange={onChangeHandle}
            required
          />
        </Form.Group>

        {/* Married Status Checkbox */}
        <Form.Group className="mb-3" controlId="formMarriedStatus">
          <Form.Check
            type="checkbox"
            label="Married"
            name="marriedStatus"
            checked={data.marriedStatus === "true"}
            onChange={onChangeHandle}
          />
        </Form.Group>

        {/* Gender Field */}
        <Form.Group className="mb-3" controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={data.gender}
            onChange={onChangeHandle}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>

        {/* Update Button */}
        <Button variant="warning" onClick={handleUpdateButton}>
          Update
        </Button>
        <Button variant="danger" onClick={handleDeleteProfile}>
          Delete
        </Button>
      </Form>
    </>
  );
};

export default MyProfile;
