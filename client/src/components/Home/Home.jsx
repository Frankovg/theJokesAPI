import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./home.scss";
import { JokesBox } from "../JokesBox/JokesBox";
import { NewJoke } from "../Form/NewJoke";
import { Footer } from "../Footer/Footer";
import logo from "../../assets/img/logo.svg";
import { Fade } from "react-awesome-reveal";

export const Home = () => {
  return (
    <div className="d-flex flex-column">
      <Fade>
        <div className="sketch">
          <Container fluid>
            <Row>
              <Col sm={12} className="text-center">
                <img src={logo} alt="Webpage logotype" className="logo mb-4" />
              </Col>
            </Row>

            <Row>
              <Col>
                <JokesBox></JokesBox>
              </Col>
            </Row>

            <Row>
              <Col>
                <NewJoke></NewJoke>
              </Col>
            </Row>
          </Container>
        </div>
      </Fade>

      <Container>
        <Row>
          <Col sm={12} className="text-center mt-3 mb-4">
            <Footer></Footer>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
