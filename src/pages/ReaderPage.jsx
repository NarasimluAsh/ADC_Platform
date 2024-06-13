// src/pages/ReaderPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { useSwipeable } from 'react-swipeable';
import './ReaderPage.css';

function ReaderPage() {
  const { id } = useParams();
  const [storybook, setStorybook] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStorybook = async () => {
      try {
        const docRef = doc(db, 'Storybooks', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const pagesWithUrls = await Promise.all(
            data.pages.map(async (page) => {
              const imageUrl = await getDownloadURL(ref(storage, page.image));
              return { ...page, image: imageUrl };
            })
          );
          setStorybook({ ...data, pages: pagesWithUrls });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching storybook:', error);
      }
    };

    fetchStorybook();
  }, [id]);

  const handlers = useSwipeable({
    onSwipedUp: () => handleNextPage(),
    onSwipedDown: () => handlePreviousPage(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handleNextPage = () => {
    if (storybook && currentPageIndex < storybook.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePreviousPage = () => {
    if (storybook && currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  if (!storybook) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="reader-page" {...handlers}>
      <div className="navigation-buttons">
        <button onClick={() => navigate('/storybooks')} className="back-button">Back</button>
        <button onClick={handlePreviousPage} disabled={currentPageIndex === 0}>Previous</button>
        <button onClick={handleNextPage} disabled={currentPageIndex === storybook.pages.length - 1}>Next</button>
      </div>
      <div className="storybook-content">
        {storybook.pages.map((page, index) => (
          <div key={index} className={`storybook-page ${index === currentPageIndex ? 'visible' : 'hidden'}`}>
            <img
              src={page.image}
              alt={`Page ${index + 1}`}
              className="page-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReaderPage;

