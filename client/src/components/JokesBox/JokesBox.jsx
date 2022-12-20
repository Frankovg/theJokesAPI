import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { Search } from "./Search/Search";
import { Type } from "./Type/Type";
import { Show } from "./Show/Show";
import { useNavigate } from "react-router-dom";

export const JokesBox = () => {
  const [joke, setJoke] = useState({});
  const [showPunchline, setShowPunchline] = useState(false);
  const [punchlineBtnState, setPunchlineBtnState] = useState(false);
  const [resetJoke, setResetJoke] = useState(true);
  const [resetSearch, setResetSearch] = useState(true);
  const [showTopJokes, setShowTopJokes] = useState(false);
  const [jokeType, setJokeType] = useState("");
  const [showLikeBtn, setShowLikeBtn] = useState(false);
  const [message, setMessage] = useState({
    error: "",
    state: false,
  });

  const navigate = useNavigate();

  // load a random joke every time the app is loaded
  // and when the next button is clicked
  useEffect(() => {
    let url = "";

    if (showTopJokes) {
      url = "http://localhost:4000/topJoke";
    } else if (jokeType !== "") {
      url = `http://localhost:4000/type/${jokeType}`;
    } else {
      url = "http://localhost:4000/getJoke";
    }

    axios
      .get(url)
      .then((res) => {
        getRandomJoke(res.data);
      })
      .catch(() => {
        navigate("/error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetJoke]);

  function getRandomJoke(jokes) {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    setJoke(randomJoke);
  }

  const handleResetJoke = () => {
    setResetJoke(!resetJoke);
    setResetSearch(!resetSearch);
    setShowPunchline(false);
    setMessage({ state: false });
  };

  return (
    <>
      <Row>
        <Col>
          <Search
            setJoke={setJoke}
            resetSearch={resetSearch}
            setMessage={setMessage}
            setShowPunchline={setShowPunchline}
            setPunchlineBtnState={setPunchlineBtnState}
            setShowLikeBtn={setShowLikeBtn}
          ></Search>
        </Col>
      </Row>

      <Row>
        <Col sm={12}>
          <Type
            handleResetJoke={handleResetJoke}
            setShowTopJokes={setShowTopJokes}
            setJokeType={setJokeType}
            setShowLikeBtn={setShowLikeBtn}
            setPunchlineBtnState={setPunchlineBtnState}
          ></Type>
        </Col>
      </Row>

      <Row>
        <Col>
          <Show
            joke={joke}
            showPunchline={showPunchline}
            setShowPunchline={setShowPunchline}
            message={message}
            handleResetJoke={handleResetJoke}
            showLikeBtn={showLikeBtn}
            setShowLikeBtn={setShowLikeBtn}
            setPunchlineBtnState={setPunchlineBtnState}
            punchlineBtnState={punchlineBtnState}
          ></Show>
        </Col>
      </Row>
    </>
  );
};
