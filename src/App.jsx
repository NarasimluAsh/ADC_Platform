import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import ReaderPage from './pages/ReaderPage';
import StorybooksPage from './pages/StorybooksPage';
import AddStorybookPage from './pages/AddStorybookPage';
import { db, storage } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

function App() {
  const [storybooks, setStorybooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStorybooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Storybooks'));
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
        setStorybooks(books);
      } catch (error) {
        console.error("Error fetching storybooks: ", error);
      }
    };

    fetchStorybooks();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<StorybooksPage storybooks={storybooks} />} />
        <Route path="/reader/:id" element={<ReaderPage />} />
        <Route path="/add-storybook" element={<AddStorybookPage />} />
      </Routes>
    </>
  );
}

export default App;
