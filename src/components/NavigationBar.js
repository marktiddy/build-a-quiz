import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/Auth';

const NavigationBar = () => {
  const { authenticated } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="navigation-bar">
      <Navbar.Brand href="/">
        <FontAwesomeIcon icon={faQuestionCircle} className="fontawesomeicon" />
        Build-A-Quiz
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/play">Pick A Quiz</Nav.Link>
          <Nav.Link href="/create">Create A Quiz</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      {authenticated ? (
        <Nav className="mr-auto">
          <Nav.Link inline href="/signout">
            Sign Out
          </Nav.Link>
        </Nav>
      ) : null}
    </Navbar>
  );
};

export default NavigationBar;
