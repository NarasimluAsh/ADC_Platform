import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import './authentication/Authentication.css';
import './components/Components.css';
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './authentication/ProtectedRoute';
import AssessmentPage from './pages/AssessmentPage';
import ClassroomPage from './pages/ClassroomPage';
import AddStudentPage from './pages/AddStudentPage';

/**
 * Main application component that handles routing and theme toggling.
 *
 * @returns {JSX.Element} The main application component.
 */
function App() {
  const [theme, setTheme] = useState('light');
  const location = useLocation();

  /**
   * Toggles the theme between light and dark modes.
   */
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Determine if sidebar should be displayed based on the current location
  const shouldDisplay = !['/login', '/signup'].includes(location.pathname);

  return (
    <div className={`app-container ${theme}`}>
      {/* Routes for login and signup */}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>

      {/* Display sidebar and main content if not on login or signup page */}
      {shouldDisplay && <Sidebar theme={theme} toggleTheme={toggleTheme} />}

      {shouldDisplay && (
        <div className='main-content'>
          <Routes>
            <Route path='/' element={<ProtectedRoute element={Dashboard} />} />
            <Route path='/dashboard' element={<ProtectedRoute element={Dashboard} />} />
            <Route path='/assessments' element={<ProtectedRoute element={AssessmentPage} />} />
            <Route path='/classroom' element={<ProtectedRoute element={ClassroomPage} />} />
            <Route path='/add-student' element={<ProtectedRoute element={AddStudentPage} />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
