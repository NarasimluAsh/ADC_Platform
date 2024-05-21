// src/pages/AddStorybookPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import './AddStorybookPage.css';

function AddStorybookPage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [level, setLevel] = useState('');
  const [pageCover, setPageCover] = useState(null);
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  const handleAddStorybook = async () => {
    if (!pageCover) {
      console.error("No page cover selected");
      return;
    }

    try {
      // Create a reference to the folder in Firebase Storage
      const folderRef = ref(storage, `Storybooks/${title}`);
      const pageCoverRef = ref(folderRef, pageCover.name);

      // Upload the page cover image to Firebase Storage
      await uploadBytes(pageCoverRef, pageCover);

      // Get the file path of the uploaded page cover image
      const pageCoverPath = pageCoverRef.fullPath;

      // Upload page images and get their file paths
      const pagesArray = await Promise.all(pages.map(async (page, index) => {
        const pageRef = ref(folderRef, `page-${index + 1}-${page.name}`);
        await uploadBytes(pageRef, page);
        return {
          image: pageRef.fullPath,
          texts: []
        };
      }));

      // Add the storybook details to Firestore, including the page cover path and pages array
      const docRef = await addDoc(collection(db, 'Storybooks'), {
        title,
        author,
        level,
        pageCover: pageCoverPath,
        pages: pagesArray
      });

      console.log("Document written with ID: ", docRef.id);
      // Navigate back to the storybooks page after successful addition
      navigate('/');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="add-storybook-container">
      <h1>Add a New Storybook</h1>
      <form
        className="add-storybook-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddStorybook();
        }}
      >
        <div className="form-group">
          <label htmlFor="title">Book Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author Name</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="level">Book Level</label>
          <input
            type="number"
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            placeholder="Enter book level"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pageCover">Page Cover</label>
          <input
            type="file"
            id="pageCover"
            onChange={(e) => setPageCover(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pages">Pages</label>
          <input
            type="file"
            id="pages"
            onChange={(e) => setPages(Array.from(e.target.files))}
            accept="image/*"
            multiple
          />
        </div>
        <button type="submit" className="add-storybook-button">
          Add Storybook
        </button>
      </form>
    </div>
  );
}

export default AddStorybookPage;