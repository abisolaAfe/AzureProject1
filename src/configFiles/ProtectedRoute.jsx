// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useIsAuthenticated } from '@azure/msal-react';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useIsAuthenticated();
    return isAuthenticated ? children : <Navigate to="/home" />;
};
export const PublicRoute = ({ children }) => {
    const isAuthenticated = useIsAuthenticated();
    return !isAuthenticated ? children : <Navigate to="/home" />;
};


export default ProtectedRoute;
