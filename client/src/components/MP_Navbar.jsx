import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import { LinkContainer } from "react-router-bootstrap";

function MP_Navbar() {
  return (
    <Navbar className="bg-yellow-200  pl-9 " >
      <LinkContainer to="/marketplace">
        <Navbar.Brand href="#home">MarketPlace</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto pr-28">
          <NavDropdown title="User" id="basic-nav-dropdown">
            <LinkContainer to="/cart">
              <NavDropdown.Item href="#action/3.1">Cart</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/orders">
              <NavDropdown.Item href="#action/3.1">My Orders</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/marketplace">
              <NavDropdown.Item >Logout</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MP_Navbar;
