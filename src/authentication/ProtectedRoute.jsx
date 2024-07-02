import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

/**
 * ProtectedRoute component ensures that only authenticated users can access the specified routes.
 * If the user is not authenticated, they are redirected to the login page.
 *
 * @param {Object} props - The props for the component.
 * @param {React.Component} props.element - The component to render for the protected route.
 * @param {Object} props.rest - Additional props passed to the Route component.
 * @returns {JSX.Element} The ProtectedRoute component.
 */
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [user, loading, error] = useAuthState(auth);

  // Render loading state while authentication status is being determined
  if (loading) {  
    return <div>Loading...</div>;
  }

  // Render error message if there is an error in authentication
  if (error) {
    console.error('Error in ProtectedRoute:', error);
    return <div>Error: {error.message}</div>;
  }

  // Render the component if the user is authenticated, otherwise redirect to login page
  return user ? <Component {...rest} /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
