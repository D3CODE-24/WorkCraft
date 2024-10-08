import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Signup.css"
import { useSignupMutation } from "@/redux/services-mp/appApi";
import MP_Navbar from "@/components/MP_Navbar";
function MP_Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signup, { error, isLoading, isError }] = useSignupMutation();

    function handleSignup(e) {
        e.preventDefault();
        signup({ name, email, password });
    }

    return (
        <Container fluid className="pt-0 pr-0 pl-5 w-full -mt-6">
            <MP_Navbar/>
            <Row>
                <Col md={6} className="signup__form--container ">
                    <Form style={{ width: "100%" }} onSubmit={handleSignup}>
                        <h1 className="mb-3 text-3xl font-semibold">Create an account</h1>
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group>
                            <Form.Label className="mb-3">Name</Form.Label>
                            <Form.Control className="mb-3" type="text" placeholder="Your name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="mb-3">Email Address</Form.Label>
                            <Form.Control className="mb-3" type="email" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="mb-3">Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" disabled={isLoading}>
                                Create account
                            </Button>
                        </Form.Group>
                        <p className="pt-3 text-center">
                            Already have an account? <Link to="/login">Login</Link>{" "}
                        </p>
                    </Form>
                </Col>
                <Col md={6} className="signup__image--container"></Col>
            </Row>
        </Container>
    );
}

export default MP_Signup;