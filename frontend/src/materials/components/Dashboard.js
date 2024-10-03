import TableData from "./TableData";
import { Button, Form, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { URLs } from "../constants/urlConstants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const obj = JSON.parse(user);

  console.log(data);

  const onChangeHandle = (e) => {
    setData({ ...newUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(URLs.AXIOS_SUB_GET, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        toast.error("Error fetching user data");
      }
    };
    fetchUserData();
  }, [token]);

  const addDataHandle = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${URLs.AXIOS_SUB_POST}/${obj._id}`, newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Data added successfully!");

      // Reset the newData state after successful submission
      setNewUser({ firstName: "", lastName: "", email: "" });
      setShowModal(false); // Close modal after submission
    } catch (error) {
      toast.error("Error adding data");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-between">
        <h2>User Dashboard</h2>
        <Button variant="primary" onClick={handleShow}>
          Add User
        </Button>
      </div>

      {/* Modal for Add User Form */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addDataHandle}>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                name="firstName"
                onChange={onChangeHandle}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                onChange={onChangeHandle}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email Address"
                name="email"
                onChange={onChangeHandle}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Table showing data */}
      <div>
        <TableData />
      </div>
    </>
  );
};

export default Dashboard;
