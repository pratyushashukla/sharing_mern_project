import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3">
      <Container>
        <Row>
          <Col className="text-center">
            Copyright &copy; Lambton College - FSDM
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
