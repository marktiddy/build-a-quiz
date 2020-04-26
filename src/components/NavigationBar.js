import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/play">Pick A Quiz</Nav.Link>
          <Nav.Link href="/create">Create A Quiz</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
