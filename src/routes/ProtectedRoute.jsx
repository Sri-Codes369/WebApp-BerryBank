import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from 'services/AuthService';

const ProtectedRoute = () => {
  const isAuthenticated = AuthService.isValidToken();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
