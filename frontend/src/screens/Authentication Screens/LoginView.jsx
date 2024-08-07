import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message";
import Loader from "../../components/loader";
import { login } from "../../actions/userActions";
import "./LoginView.css";

const LoginView = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      if (stayLoggedIn) {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
      history.push(redirect);
    }
  }, [history, userInfo, redirect, stayLoggedIn]);

  useEffect(() => {
    const savedUserInfo = localStorage.getItem("userInfo");
    if (savedUserInfo) {
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: JSON.parse(savedUserInfo) });
    }
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password, stayLoggedIn));
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-md-center" style={{ width: "100%" }}>
        <Col xs={12} md={6}>
          <Card className="login-card">
            <Card.Body>
              <h1 className="text-center login-title">Sign In</h1>
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="stayLoggedIn" className="mb-3" style={{ textAlign: "center" }}>
                  <Form.Check
                    type="checkbox"
                    label="Stay logged in"
                    checked={stayLoggedIn}
                    onChange={(e) => setStayLoggedIn(e.target.checked)}
                    className="login-checkbox"
                  ></Form.Check>
                </Form.Group>

                <Button type="submit" variant="primary" className="login-button" block>
                  Sign In
                </Button>
              </Form>

              <Row className="py-3">
                <Col className="text-center">
                  New Customer?{" "}
                  <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} className="register-link">
                    Register
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginView;
