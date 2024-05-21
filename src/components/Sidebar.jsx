import React from 'react';
import './Sidebar.css';

function Sidebar({ name, title }) {
  return (
    <nav className="sidebar">
        <header>
            <div className="text header-text">
                <span className="name">{name}</span>
                <span className="title">{title}</span>
            </div>
        </header>
    </nav>
  );
}

export default Sidebar;

