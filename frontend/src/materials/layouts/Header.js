import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandle = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <header
        style={{
          backgroundColor: "#282c34",
          padding: "10px",
          color: "white",
          fontSize: "25px",
        }}
      >
        SmartData Enterprises Pvt. Ltd
      </header>
      <nav className="d-flex justify-content-center align-items-center my-3">
        <Link
          to="/myprofile"
          className="btn btn-link mx-3 text-decoration-none text-primary"
        >
          MY PROFILE
        </Link>
        <Link
          to="/dashboard"
          className="btn btn-link mx-3 text-decoration-none text-primary"
        >
          Home
        </Link>
        <button onClick={logoutHandle} className="btn btn-danger mx-3">
          LogOut
        </button>
      </nav>
    </>
  );
};

export default Header;
