import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./success.scss";

export const SuccessModal = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Cheers!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Your joke has been saved successfully.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button className="close-btn" onClick={onHide}>
          CLOSE
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
