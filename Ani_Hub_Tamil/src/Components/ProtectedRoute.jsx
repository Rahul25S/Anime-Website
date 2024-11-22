// src/components/ProtectedRoute.jsx
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios"; // Import axios for making API requests

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const response = await axios.get("/api/user/status"); // Check login status from backend
        if (response.data.isLoggedIn) {
          setUser(response.data.user); // Set the user if logged in
        }
      } catch (error) {
        console.error("Error checking user authentication:", error);
      } finally {
        setLoading(false); // Set loading to false after the check is complete
      }
    };

    checkUserAuth(); // Call the function to check authentication status
  }, []);

  // Show a loading indicator while checking user authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no user is authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Return the protected route's children if the user is authenticated
  return children;
};

export default ProtectedRoute;
