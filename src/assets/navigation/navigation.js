import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navigation.css';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser, faBook } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/watchMe.png';
import { motion } from 'framer-motion';

// Component for the menu items
const MenuItems = () => {
  return (
    <Nav className="me">
      {/* NavLink for the "Recently Added" menu item */}
      <NavLink to="/recent" className="myLink" activeclassname="current">
        <FontAwesomeIcon icon={faStar} className="menu-icon" />  Recently Added
      </NavLink>

      {/* NavLink for the "Developer Profile" menu item */}
      <NavLink
        href="https://www.gozkybrain.com.ng/gee-brain/"
        className="ext"
        activeclassname="current"
      >
        <FontAwesomeIcon icon={faUser} className="menu-icon" />  Developer Profile
      </NavLink>

      {/* NavLink for the "Documentation" menu item */}
      <NavLink
        href="https://github.com/Gozkybrain/watcheMe"
        className="ext"
        activeclassname="current"
      >
        <FontAwesomeIcon icon={faBook} className="menu-icon" />   Documentation
      </NavLink>
    </Nav>
  );
};

const Navigation = () => {
  return (
    <>
      {/* Navigation component */}
      <div className="watchme">
        {/* Logo with bouncing animation */}
        {/* Animate the logo using Framer Motion */}
        <motion.div
          // Set the initial state of the animation
          initial={{ scale: 0.5, opacity: 0 }}
          // Define the target state of the animation
          animate={{ scale: 1, opacity: 1 }}
          // Specify the transition properties
          transition={{
            type: 'spring', // Animation type
            stiffness: 160, // Stiffness of the spring
            damping: 10 // Damping of the spring
          }}
          className="logo-container"
        >
          {/* Link to the home page */}
          <Link to="/" className="">
            <img src={logo} alt="myLogo" className='awesome' />
          </Link>
        </motion.div>
  
        {/* Render the menu items */}
        <div className="menu-container">
          <MenuItems />
        </div>
      </div>
    </>
  );
};

export default Navigation;
