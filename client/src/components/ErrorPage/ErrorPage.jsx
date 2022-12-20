import React from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import logo from "../../assets/img/logo.svg";
import { Footer } from "../Footer/Footer";
import "./errorPage.scss";

export const ErrorPage = () => {
  const navigate = useNavigate();

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
              <Col sm={12} className="text-center err-txt">
                <h1>Oops there was an error!</h1>
                <h1>404</h1>
              </Col>
            </Row>

            <Row>
              <Col sm={12} className="text-center">
                <Button className="err-btn" onClick={() => navigate("/")}>
                  Home
                </Button>
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
