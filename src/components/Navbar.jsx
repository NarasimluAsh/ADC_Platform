import React from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ title, onMenuClick }) {
  return (
    <header className="navbar">
      <div className="navbar-menu" onClick={onMenuClick}>
        <FaBars />
      </div>
      <h1 className="navbar-title">{title}</h1>
      <div className="navbar-profile">
        <FaUserCircle />
      </div>
    </header>
  );
}

export default Navbar;
