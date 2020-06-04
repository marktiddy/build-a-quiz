import React, { useContext } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/Auth';
import avatar from '../img/avatar.png';

const NavigationBar = () => {
  const { authenticated, currentUser } = useContext(AuthContext);

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
        <Navbar.Collapse id="user-menu" >
          <Dropdown className="navbar-nav ml-auto">
            <Dropdown.Toggle className="btn-white" id="profile-dropdown-menu">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="" className="user-avatar" />
              ) : (
                <img src={avatar} className="user-avatar" alt="User Avatar" />
              )}
              {currentUser.displayName ? currentUser.displayName : 'Profile'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Edit Profile</Dropdown.Item>
              <Dropdown.Item href="/signout">Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      ) : null}
    </Navbar>
  );
};

export default NavigationBar;
