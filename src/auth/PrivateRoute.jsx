import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../auth/index';

const PrivateRoute = ({ children }) => {
  // Example authentication check (replace with your actual logic)

  const location = useLocation();

  if (!isAuthenticated()) {
    // Redirect to login page, preserving the original destination
    return <Navigate to="/signin" state={{ from: location }} replace />;
  } 

  // If authenticated, render the protected component
 if(isAuthenticated() && isAuthenticated().user.role === 0){
   return children;
   } else {
    return <Navigate to="/admin/dashboard" state={{ from: location }} replace />;
   }
};

export default PrivateRoute;
