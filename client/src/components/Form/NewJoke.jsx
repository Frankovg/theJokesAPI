import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { NewJokeModal } from "./modals/NewJokeModal";
import "./newJoke.scss";

export const NewJoke = () => {
  const [showAddAJoke, setShowAddAJoke] = useState(false);

  const handleShowModal = () => setShowAddAJoke(true);

  const handleCloseModal = () => setShowAddAJoke(false);

  return (
    <>
      <div className="new-joke">
        <p>Do you know any joke? Share it with us!</p>

        <Button onClick={handleShowModal}>ADD JOKES</Button>
      </div>

      <NewJokeModal
        show={showAddAJoke}
        onHide={handleCloseModal}
      ></NewJokeModal>
    </>
  );
};
