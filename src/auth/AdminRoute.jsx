import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../auth/index';

const AdminRoute = ({ children }) => {
  // Example authentication check (replace with your actual logic)

  const location = useLocation();

  if (!isAuthenticated()) {
    // Redirect to login page, preserving the original destination
    return <Navigate to="/signin" state={{ from: location }} replace />;
  } 

  // If authenticated, render the protected component
  if(isAuthenticated() && isAuthenticated().user.role === 1){
  return children;
  } else {
    return <Navigate to="/user/dashboard" state={{ from: location }} replace />;
  }
};

export default AdminRoute;