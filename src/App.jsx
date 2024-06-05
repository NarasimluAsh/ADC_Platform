import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import AddIEP from './components/AddIEP';
import ViewIEP from './components/ViewIEP';
import ViewIEPsListPage from './pages/ViewIEPsListPage';
import EditIEP from './components/EditIEP';
import { db, storage } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

function App() {
  const [ieps, setIeps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIEPs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'IEPs'));
        const iepsList = await Promise.all(
          querySnapshot.docs.map(async doc => {
            const data = doc.data();
            const documentUrl = await getDownloadURL(ref(storage, data.document));
            return {
              id: doc.id,
              ...data,
              document: documentUrl
            };
          })
        );
        setIeps(iepsList);
      } catch (error) {
        console.error("Error fetching IEPs: ", error);
      }
    };

    fetchIEPs();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<ViewIEPsListPage ieps={ieps} />} />
        <Route path="/add-IEP" element={<AddIEP />} />
        <Route path="/iep/:id" element={<ViewIEP />} />
        <Route path="/edit-IEP/:id" element={<EditIEP />} />
      </Routes>
    </>
  );
}

export default App;
