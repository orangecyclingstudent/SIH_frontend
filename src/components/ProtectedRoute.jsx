import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = () => {
  // Get auth state from the context
  const { user, isLoading } = useAuth();

  // 1. Add a loading check
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // 2. If a user exists, render the child route.
  //    The <Outlet /> component renders the nested page component (e.g., ActivePatientsPage).
  if (user) {
    return <Outlet />;
  }

  // 3. If no user, redirect to the login page.
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
