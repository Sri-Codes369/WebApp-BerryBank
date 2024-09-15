import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from 'services/AuthService';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isValidToken());

  useEffect(() => {
    const checkAuth = () => {
      const validToken = AuthService.isValidToken();
      setIsAuthenticated(validToken);
    };

    // Continuously check for token validity
    const intervalId = setInterval(checkAuth, 1000);

    return () => clearInterval(intervalId); // Clean up interval
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to="/pages/login/login3" replace />;
};

export default ProtectedRoute;
