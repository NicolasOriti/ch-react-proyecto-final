
import { Navigate } from 'react-router';

export const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('user');

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return children;
};

