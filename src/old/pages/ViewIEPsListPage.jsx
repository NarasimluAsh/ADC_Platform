import React from 'react';
import { Link } from 'react-router-dom';

function ViewIEPsListPage({ ieps }) {
  return (
    <div>
      <h1>IEPs List</h1>
      <ul>
        {ieps.map(iep => (
          <li key={iep.id}>
            <Link to={`/iep/${iep.id}`}>{iep.learnerName}</Link>
          </li>
        ))}
      </ul>
      <Link to="/add-IEP">Add New IEP</Link>
    </div>
  );
}

export default ViewIEPsListPage;
