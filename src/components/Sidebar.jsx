import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import ThemeToggle from './ThemeToggle';
import { FaTachometerAlt, FaEdit, FaBook, FaEye, FaPlusCircle, FaMicrophone } from 'react-icons/fa'; // Import icons

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
        <Link to="/create-IEP" className="sidebar-link">
          <FaPlusCircle className="sidebar-icon" />
          <span>Create IEP</span>
        </Link>
        <Link to="/view-IEPs" className="sidebar-link">
          <FaEye className="sidebar-icon" />
          <span>View IEPs</span>
        </Link>
        <Link to="/edit-IEP/:id" className="sidebar-link">
          <FaEdit className="sidebar-icon" />
          <span>Edit IEP</span>
        </Link>
        <Link to="/storybooks" className="sidebar-link">
          <FaBook className="sidebar-icon" />
          <span>Storybooks</span>
        </Link><Link to="/transcriber" className="sidebar-link">
          <FaMicrophone className="sidebar-icon" />
          <span>Transcriber</span>
        </Link>
        <Link to="/quiz" className="sidebar-link">
          <FaEdit className="sidebar-icon" />
          <span>Questions</span>
        </Link>

      </div>
      <div className="sidebar-footer">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
};

export default Sidebar;
