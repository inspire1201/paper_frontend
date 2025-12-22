import React from 'react'
import { Navigate } from 'react-router-dom'
import authService from '../services/authService'

/**
 * PrivateRoute Component
 * Protects routes by checking if user is authenticated
 * Redirects to login page if not authenticated
 */
const PrivateRoute = ({ children }) => {
    const isAuthenticated = authService.isAuthenticated()

    if (!isAuthenticated) {
        // Redirect to login page if not authenticated
        return <Navigate to="/login" replace />
    }

    // Render the protected component if authenticated
    return children
}

export default PrivateRoute
