import React from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ title }) {
  return (
    <header className="navbar">
      <div className="navbar-menu">
        <FaBars />
      </div>
      <h3 className="navbar-title">{title}</h3>
      <div className="navbar-profile">
        <FaUserCircle />
      </div>
    </header>
  );
}

export default Navbar;

