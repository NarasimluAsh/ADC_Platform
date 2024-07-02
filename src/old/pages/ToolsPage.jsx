// src/pages/ToolsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaEye, FaEdit, FaBook, FaMicrophone, FaQuestion } from 'react-icons/fa';

const ToolsPage = () => {
  const tools = [
    { path: '/create-IEP', name: 'Create IEP', icon: <FaPlusCircle /> },
    { path: '/view-IEPs', name: 'View IEPs', icon: <FaEye /> },
    { path: '/edit-IEP/:id', name: 'Edit IEP', icon: <FaEdit /> },
    { path: '/storybooks', name: 'Storybooks', icon: <FaBook /> },
    { path: '/transcriber', name: 'Transcriber', icon: <FaMicrophone /> },
    { path: '/quiz', name: 'Questions', icon: <FaQuestion /> }
  ];

  return (
    <div className="tools-container">
      <h1>Tools</h1>
      <div className="tools-grid">
        {tools.map((tool, index) => (
          <Link to={tool.path} className="tool-tile" key={index}>
            {tool.icon}
            <span>{tool.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
