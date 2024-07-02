import React from 'react';

function StorybookItem({ title, author, pageCover }) {
  return (
    <div className="storybook-item">
      {pageCover && <img src={pageCover} alt={`${title} cover`} className="storybook-cover" />}
      <div className="storybook-details">
        <h3>{title}</h3>
        <p>By {author}</p>
      </div>
    </div>
  );
}

export default StorybookItem;