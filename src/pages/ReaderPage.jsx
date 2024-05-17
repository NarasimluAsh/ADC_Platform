// src/ReaderPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import './ReaderPage.css';

function ReaderPage() {
  const { id } = useParams(); // Get the storybook ID from the URL
  const [storybook, setStorybook] = useState(null);
  const navigate = useNavigate(); // For navigating back to the main page

  useEffect(() => {
    const fetchStorybook = async () => {
      try {
        // Get the document from Firestore
        const docRef = doc(db, 'Storybooks', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          // Fetch the download URLs for all page images
          const pagesWithUrls = await Promise.all(
            data.pages.map(async (page) => {
              const imageUrl = await getDownloadURL(ref(storage, page.image));
              return { ...page, image: imageUrl };
            })
          );

          // Set the storybook data to state
          setStorybook({ ...data, pages: pagesWithUrls });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching storybook: ", error);
      }
    };

    fetchStorybook();
  }, [id]);

  if (!storybook) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="reader-page">
      <header className="reader-header">
        <button onClick={() => navigate('/')} className="back-button">Back</button>
        <h1 className="storybook-title">{storybook.title}</h1>
      </header>
      <h2>by {storybook.author}</h2>
      <div className="storybook-content">
        {storybook.pages.map((page, index) => (
          <div key={index} className="storybook-page">
            <img src={page.image} alt={`Page ${index + 1}`} className="page-image" />
            
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default ReaderPage;
