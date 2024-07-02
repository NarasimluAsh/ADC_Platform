import React from 'react';
import { useParams } from 'react-router-dom';

function ViewIEP() {
  const { id } = useParams();
  // Fetch and display the IEP based on ID
  return (
    <div>
      <h1>View IEP</h1>
      {/* Display IEP details */}
    </div>
  );
}

export default ViewIEP;
