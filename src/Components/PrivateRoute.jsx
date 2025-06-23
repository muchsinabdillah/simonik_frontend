// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token'); // Sesuaikan jika pakai sessionStorage

  return token ? <Outlet /> : <Navigate to="/simonik/login" replace />;
};

export default PrivateRoute;
