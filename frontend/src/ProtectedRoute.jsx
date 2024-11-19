import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // To decode JWT and check expiry

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken'); // Get token from localStorage

    if (!token) {
        // If no token, redirect to login
        return <Navigate to="/login" />;
    }

    try {
        // Decode the token and check expiry
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            // If token is expired, clear it and redirect to login
            localStorage.removeItem('authToken');
            return <Navigate to="/login" />;
        }
    } catch (error) {
        // If token is invalid, redirect to login
        localStorage.removeItem('authToken'); // Clean up invalid token
        return <Navigate to="/login" />;
    }

    // If token is valid, render the requested component
    return children;
};

export default ProtectedRoute;
