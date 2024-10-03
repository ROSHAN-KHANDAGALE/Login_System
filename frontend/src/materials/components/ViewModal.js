import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../App.css";

function ViewModal({ show, tableValue, handleClose }) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{tableValue?.firstName} Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Show-body">
            <label>First Name</label>
            <h3>{tableValue?.firstName}</h3>
            <label>Last Name</label>
            <h3>{tableValue?.lastName}</h3>
            <label>Email Address</label>
            <h3>{tableValue?.email}</h3>
            <label>Date of Birth</label>
            <h3>{tableValue?.dob}</h3>
            <label>Married Status</label>
            <h3>{tableValue?.marriedStatus}</h3>
            <label>Gender</label>
            <h3>{tableValue?.gender}</h3>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewModal;
