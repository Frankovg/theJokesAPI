import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import "./type.scss";

export const Type = ({
  handleResetJoke,
  setJokeType,
  setShowTopJokes,
  setShowLikeBtn,
  setPunchlineBtnState,
}) => {
  const [activeButton, setActiveButton] = useState("all");

  const statesToChange = () => {
    handleResetJoke();
    setShowLikeBtn(false);
    setPunchlineBtnState(false);
  };

  const handleAll = () => {
    setJokeType("");
    setShowTopJokes(false);
    setActiveButton("all");
    statesToChange();
  };

  const handleTop = () => {
    setJokeType("");
    setShowTopJokes(true);
    setActiveButton("top");
    statesToChange();
  };

  const handleType = (type) => {
    setJokeType(type);
    setShowTopJokes(false);
    setActiveButton("type");
    statesToChange();
  };

  return (
    <div className="d-flex justify-content-around pt-3 mb-3 type-btns">
      <Button
        onClick={handleAll}
        className={activeButton === "all" ? "active-all btns" : "inactive btns"}
      >
        All
      </Button>

      <Button
        onClick={handleTop}
        className={activeButton === "top" ? "active-top btns" : "inactive btns"}
      >
        Top
      </Button>

      <Dropdown>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          className={
            activeButton === "type" ? "active-type btns" : "inactive btns"
          }
        >
          Type
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleType("general")}>
            General
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleType("programming")}>
            Programming
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleType("knock-knock")}>
            Knock-Knock
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleType("dad")}>Dad</Dropdown.Item>
          <Dropdown.Item onClick={() => handleType("food")}>Food</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
