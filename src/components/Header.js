import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Build-A-Quiz</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/play">Pick A Quiz</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
