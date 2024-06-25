// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { FaEdit, FaTachometerAlt, FaTools } from 'react-icons/fa'; // Import icons

const Sidebar = ({ theme, toggleTheme }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="reading-logo.jpeg" alt="logo" />
        <h2>Dreams</h2>
      </div>
      <div className="sidebar-menu">
        <Link to="/dashboard" className="sidebar-link">
          <FaTachometerAlt className="sidebar-icon" />
          <span>Dashboard</span>
        </Link>
        <Link to="/assessments" className="sidebar-link">
          <FaEdit className="sidebar-icon" />
          <span>Assessments</span>
        </Link>
        <Link to="/tools" className="sidebar-link">
          <FaTools className="sidebar-icon" />
          <span>Tools</span>
        </Link>
      </div>
      <div className="sidebar-footer">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
};

export default Sidebar;
