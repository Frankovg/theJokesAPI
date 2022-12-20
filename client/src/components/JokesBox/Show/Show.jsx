import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import "./show.scss";

export const Show = ({
  joke,
  showPunchline,
  setShowPunchline,
  message,
  handleResetJoke,
  setShowLikeBtn,
  showLikeBtn,
  setPunchlineBtnState,
  punchlineBtnState,
}) => {
  const [showLikes, setShowLikes] = useState(joke && joke.likes);

  const navigate = useNavigate();

  // print the loaded joke
  useEffect(() => {
    if (joke) {
      const getLikes = joke.likes;
      setShowLikes(getLikes);
    } else {
      setShowLikes("-");
    }
  }, [joke]);

  const handleSubmit = () => {
    let id = joke.id;
    axios
      .put(`http://localhost:4000/like/${id}`)
      .then((res) => {
        setShowLikes(showLikes + 1);
        setShowLikeBtn(true);
      })
      .catch(() => {
        navigate("/error");
      });
  };

  // to show the punchline and disable it's button
  const handlePunchlineBtn = () => {
    setShowPunchline(true);
    setPunchlineBtnState(true);
  };

  const handleNextJoke = () => {
    handleResetJoke();
    setPunchlineBtnState(false);
    setShowLikeBtn(false);
  };

  return (
    <Row className="show-jokes">
      {message.state ? (
        <div className="joke-txt-bx">
          <p className="joke-txt">❌ {message.error}</p>
        </div>
      ) : (
        <div className="joke-txt-bx">
          <p className="joke-type-txt mb-3">
            <span>#</span>
            {joke && joke.type}
          </p>
          <Typewriter
            options={{
              strings: [`${joke && joke.setup}`],
              autoStart: true,
              delay: 20,
              loop: true,
              pauseFor: 600000,
              wrapperClassName: "joke-txt",
              cursorClassName: "joke-txt",
            }}
          />
          {showPunchline && (
            <>
              <span>--</span>
              <Typewriter
                options={{
                  strings: [`${joke && joke.punchline}`],
                  autoStart: true,
                  delay: 20,
                  pauseFor: 600000,
                  wrapperClassName: "joke-txt",
                  cursorClassName: "joke-txt",
                }}
              />
            </>
          )}
        </div>
      )}

      <Col sm={12} className="d-flex justify-content-center">
        <Button
          className={
            punchlineBtnState ? "punchline-btn-disabled" : "punchline-btn"
          }
          onClick={handlePunchlineBtn}
          disabled={punchlineBtnState}
        >
          <span>PUNCHLINE!</span>
        </Button>
      </Col>

      <Col sm={6} className="d-flex justify-content-center">
        <Button
          className="like-btn d-flex"
          onClick={handleSubmit}
          disabled={showLikeBtn}
        >
          <div className="likes">{showLikes}</div>
          <div className="like-txt">LIKE!</div>
        </Button>
      </Col>

      <Col sm={6} className="d-flex justify-content-center">
        <Button className="next-btn" onClick={handleNextJoke}>
          NEXT JOKE!
        </Button>
      </Col>
    </Row>
  );
};
