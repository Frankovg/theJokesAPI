import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import CloseButton from "react-bootstrap/CloseButton";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { SuccessModal } from "./SuccessModal";
import "./jokeModal.scss";
import { useNavigate } from "react-router-dom";

export const NewJokeModal = ({ show, onHide }) => {
  const [submitButton, setSubmitButton] = useState(false);
  const [resetSubmit, setResetSubmit] = useState(false);
  const [newJoke, setNewJoke] = useState({
    type: "",
    setup: "",
    punchline: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJoke({ ...newJoke, [name]: value });
    setResetSubmit(!resetSubmit);
  };

  // to desable or activate the submit button
  useEffect(() => {
    const { type, setup, punchline } = newJoke;
    if (type && setup && punchline) {
      setSubmitButton(true);
    } else {
      setSubmitButton(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSubmit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/setJoke", newJoke)
      .then((res) => {
        onHide();
        setShowSuccess(true);
      })
      .then(() => {
        resetNewJoke();
      })
      .catch(() => {
        navigate("/error");
      });
  };

  const resetNewJoke = () => {
    setNewJoke({ type: "", setup: "", punchline: "" });
  };

  const handleClose = () => {
    onHide();
    resetNewJoke();
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
    resetNewJoke();
  };

  return (
    <>
      <Modal show={show} fullscreen="sm-down" onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Tell us a joke</Modal.Title>
          <CloseButton onClick={handleClose} />
        </Modal.Header>

        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="Select a type of joke"
              className="mb-3"
            >
              <Form.Select
                aria-label="Default select example"
                onChange={handleChange}
                name="type"
                value={newJoke.type}
              >
                <option></option>
                <option value="dad">Dad</option>
                <option value="food">Food</option>
                <option value="general">General</option>
                <option value="knock-knock">Knock-Knock</option>
                <option value="programming">Programming</option>
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Setup your joke"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                rows={3}
                autoFocus
                onChange={handleChange}
                name="setup"
                value={newJoke.setup}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Write here the punchline"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleChange}
                name="punchline"
                value={newJoke.punchline}
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button className="cancel-btn" onClick={handleClose}>
            CANCEL
          </Button>
          {submitButton ? (
            <Button className="button-add" onClick={handleSubmit}>
              SAVE
            </Button>
          ) : (
            <Button className="button-add" disabled>
              SAVE
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <SuccessModal show={showSuccess} onHide={handleCloseModal}></SuccessModal>
    </>
  );
};
