import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./search.scss";

export const Search = ({
  setJoke,
  resetSearch,
  setMessage,
  setShowPunchline,
  setPunchlineBtnState,
  setShowLikeBtn,
}) => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // to clean the input box
  useEffect(() => {
    setSearch("");
  }, [resetSearch]);

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearch(text.toString().toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search !== "") {
      axios
        .get(`http://localhost:4000/searchJoke/${search}`)
        .then((res) => {
          if (res.data[0] === undefined) {
            setMessage({
              error: `Oops! We couldn't find a joke with "${search}"`,
              state: true,
            });
            setPunchlineBtnState(true);
            setShowLikeBtn(true);
          } else {
            setJoke(res.data[0]);
            setMessage({ state: false });
            setPunchlineBtnState(false);
            setShowLikeBtn(false);
          }
        })
        .then(() => {
          setShowPunchline(false);
        })
        .catch(() => {
          navigate("/error");
        });
    }
  };

  return (
    <InputGroup className="mb-3 search-btn">
      <Form.Control
        aria-label="Search"
        aria-describedby="basic-addon2"
        className="search"
        value={search}
        onChange={handleSearch}
      />
      <Button id="button-addon2" onClick={handleSubmit}>
        <span>search</span>
      </Button>
    </InputGroup>
  );
};
