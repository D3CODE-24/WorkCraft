import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../redux/services-mp/appApi";
import MP_Navbar from "@/components/MP_Navbar";
import { useNavigate } from "react-router-dom";

function MP_Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isError, isLoading, error }] = useLoginMutation();
  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
    navigate("/marketplace");
  }
  return (
    <Container fluid className="pt-0 pr-0 pl-5 w-full -mt-6">
      <MP_Navbar />
      <Row>
        <Col md={6} className="login__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleLogin}>
            <h1 className="font-bold text-3xl mb-3">Login</h1>
            {isError && <Alert variant="danger">{"Invalid Credentials"}</Alert>}
            <Form.Group>
              <Form.Label className="mb-3">Email Address</Form.Label>
              <Form.Control className="mb-3"
                type="email"
                placeholder="Enter email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-3">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading}>
                Login
              </Button>
            </Form.Group>

            <p className="pt-3 text-center">
              Don't have an account? <Link to="/signup">Create account</Link>{" "}
            </p>
          </Form>
        </Col>
        <Col md={6} className="login__image--container"></Col>
      </Row>
    </Container>
  );
}

export default MP_Login;
