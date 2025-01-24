import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isTokenPresent = sessionStorage.getItem('token');

  return isTokenPresent ? <Component {...rest} /> : <Navigate to="/doctor-login" />;
};

export default ProtectedRoute;
