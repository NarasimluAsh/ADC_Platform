import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/create-IEP" className="dashboard-link">Create IEP</Link>
        <Link to="/view-IEPs" className="dashboard-link">View IEPs</Link>
        <Link to="/edit-IEP/:id" className="dashboard-link">Edit IEP</Link>
      </div>
    </div>
  );
};

export default Dashboard;
