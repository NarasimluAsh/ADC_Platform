import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import StorybookItem from './component/StorybookItem';
import ReaderPage from './pages/ReaderPage';
import { db, storage } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

function App() {
  const [storybooks, setStorybooks] = useState([]);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Fetch storybooks from Firestore and get the download URLs for their cover images
    const fetchStorybooks = async () => {
      try {
        // Get all documents from the 'storybooks' collection
        const querySnapshot = await getDocs(collection(db, 'Storybooks'));
        
        // Process each document to get its data and download URL for the cover image
        const books = await Promise.all(
          querySnapshot.docs.map(async doc => {
            const data = doc.data();
            const pageCoverRef = ref(storage, data.pageCover);
            const pageCoverUrl = await getDownloadURL(pageCoverRef);
            return {
              id: doc.id,
              ...data,
              pageCover: pageCoverUrl
            };
          })
        );
        
        // Set the fetched storybooks data to the state
        setStorybooks(books);
      } catch (error) {
        console.error("Error fetching storybooks: ", error);
      }
    };

    // Call the fetch function when the component is mounted
    fetchStorybooks();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="main-section">
            <h1>Available Storybooks</h1>
            <div className="storybook-list">
              {storybooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => navigate(`/reader/${book.id}`)}
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
        }
      />
      <Route path="/reader/:id" element={<ReaderPage />} />
    </Routes>
  );
}

export default App;