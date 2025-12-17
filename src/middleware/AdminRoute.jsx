import React from 'react';
import { Navigate } from 'react-router-dom';
import { authAPI } from '../supabase';

const AdminRoute = ({ children }) => {
  const isLoggedIn = authAPI.isLoggedIn();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default AdminRoute;