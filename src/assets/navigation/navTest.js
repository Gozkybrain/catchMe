import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileVideo } from '@fortawesome/free-solid-svg-icons';

// Component for the menu items
const MenuItems = () => {
  return (
    <Nav className="me-auto d-lg-flex">
      {/* NavLink for the "Recently Added" menu item */}
      <Link to="/recent" className="nav-link">Recently Added</Link>

      {/* NavLink for the "Developer Profile" menu item */}
      <Nav.Link href="https://www.gozkybrain.com.ng/gee-brain/">Developer Profile</Nav.Link>

      {/* NavLink for the "Documentation" menu item */}
      <Nav.Link href="https://github.com/Gozkybrain/watcheMe">Documentation</Nav.Link>
    </Nav>
  );
};

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container fluid>
        {/* Logo and brand */}
        <Navbar.Brand>
          <Link to="/" className="watchme">
            <FontAwesomeIcon icon={faFileVideo} /> watchMe
          </Link>
        </Navbar.Brand>

        {/* Navbar toggle button for mobile */}
        <Navbar.Toggle aria-controls="navbarNav" />

        <Navbar.Collapse id="navbarNav">
          {/* Render the menu items */}
          <MenuItems />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
