import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StorybookItem from '../components/StorybookItem';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '../firebase';
import 'primeicons/primeicons.css';

function StorybooksPage() {
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
    </>
  );
}

export default StorybooksPage;
