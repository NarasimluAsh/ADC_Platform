// src/pages/StorybooksPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StorybookItem from '../components/StorybookItem';
import './StorybooksPage.css';
import 'primeicons/primeicons.css';

function StorybooksPage({ storybooks }) {
  const navigate = useNavigate();

  return (
    <div className="main-section">
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
        <button
          className="add-storybook-page"
          onClick={() => navigate('/add-storybook')}
        >
          <span className="pi pi-plus"></span>
        </button>
      </div>
    </div>
  );
}

export default StorybooksPage;