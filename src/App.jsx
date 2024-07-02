  import React, { useEffect, useState } from 'react';
  import { Routes, Route, useLocation } from 'react-router-dom';
  import './App.css';
  import './authentication/Authentication.css';
  import './components/Components.css';
  import 'primereact/resources/themes/saga-blue/theme.css';  // Choose a theme
  import 'primereact/resources/primereact.min.css';
  import 'primeicons/primeicons.css';
  import ViewIEP from './components/ViewIEP';
  import ViewIEPsListPage from './pages/ViewIEPsListPage';
  import EditIEP from './components/EditIEP';
  import Login from './authentication/Login';
  import Signup from './authentication/Signup';
  import Dashboard from './pages/Dashboard';
  import StorybooksPage from './pages/StorybooksPage';
  import ReaderPage from './pages/ReaderPage';
  import AddStorybookPage from './pages/AddStorybookPage';
  import AudioRecorderTranscriber from './api/AudioRecorderTranscriber';
  import Sidebar from './components/Sidebar';
  import ProtectedRoute from './authentication/ProtectedRoute';
  import IEPForm from './components/IEPForm';
  import QuizPage from './pages/QuizPage';
  import AssessmentPage from './pages/AssessmentPage';
  import ToolsPage from './pages/ToolsPage';
  import ClassroomPage from './pages/ClassroomPage';
import AddStudentPage from './pages/AddStudentPage';
  import { db, storage } from './firebase';
  import { collection, getDocs } from 'firebase/firestore';
  import { getDownloadURL, ref } from 'firebase/storage';

  function App() {
    const [ieps, setIeps] = useState([]);
    const [theme, setTheme] = useState('light');
    const location = useLocation(); 

    useEffect(() => {
      const fetchIEPs = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'IEPs'));
          const iepsList = await Promise.all(
            querySnapshot.docs.map(async (doc) => {
              const data = doc.data();
              const documentUrl = await getDownloadURL(ref(storage, data.document));
              return {
                id: doc.id,
                ...data,
                document: documentUrl,
              };
            })
          );
          setIeps(iepsList);
        } catch (error) {
          console.error('Error fetching IEPs: ', error);
        }
      };

      fetchIEPs();
    }, []);

    

    const toggleTheme = () => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    };

    // Determine if sidebar should be displayed based on the current location
    const shouldDisplay = !['/login', '/signup'].includes(location.pathname);

    return (
      <div className={`app-container ${theme}`}>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> 
        </Routes>
        
        {shouldDisplay && <Sidebar theme={theme} toggleTheme={toggleTheme} />}

        {shouldDisplay && <div className="main-content">
          <Routes>  
            <Route path="/" element={<ProtectedRoute element={Dashboard} />} />
            <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
            <Route path="/tools" element={<ProtectedRoute element={ToolsPage} />} />
            <Route path="/view-IEPs" element={<ProtectedRoute element={ViewIEPsListPage} ieps={ieps} />} />
            <Route path="/iep/:id" element={<ProtectedRoute element={ViewIEP} />} />
            <Route path="/edit-IEP/:id" element={<ProtectedRoute element={EditIEP} />} />
            <Route path="/create-IEP" element={<ProtectedRoute element={IEPForm} />} />
            <Route path="/storybooks" element={<ProtectedRoute element={StorybooksPage} />} />
            <Route path="/transcriber" element={<ProtectedRoute element={AudioRecorderTranscriber}/>} />
            <Route path="/reader/:id" element={<ProtectedRoute element={ReaderPage} />} />
            <Route path="/add-storybook" element={<ProtectedRoute element={AddStorybookPage} />} />
            <Route path="/quiz" element={<ProtectedRoute element={QuizPage} />} />
            <Route path="/assessments" element={<ProtectedRoute element={AssessmentPage} />} />
            <Route path="/classroom" element={<ProtectedRoute element={ClassroomPage} />} />
            <Route path="/add-student" element={<ProtectedRoute element={AddStudentPage} />} />
          </Routes>
        </div>}
      </div>
    );
  }

  export default App;
