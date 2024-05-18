import React from 'react';
import { useNavigate } from 'react-router-dom';
import StorybookItem from '../components/StorybookItem';
import './StorybooksPage.css';

function StorybooksPage({ storybooks }) {
  const navigate = useNavigate();

  return (
    <div className="main-section">
      <h1>Available Storybooks</h1>
      <div className="storybook-list">
        {storybooks.map((book) => (
          <div
            key={book.id}
            onClick={() => navigate(`/reader/${book.id}`)}
            className="storybook-item-wrapper"
          >
            <StorybookItem
              title={book.title}
              author={book.author}
              pageCover={book.pageCover}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StorybooksPage;
