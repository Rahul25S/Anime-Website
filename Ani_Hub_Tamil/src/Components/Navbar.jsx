import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API requests
import Profile from "../Pages/Profile";

const Navbar = () => {
  const navigate = useNavigate();
  const [navbarBg, setNavbarBg] = useState("bg-transparent");
  const [user, setUser] = useState(null); // Store user information

  // Check user login status on component mount
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await axios.get("/api/user/status"); // Check login status from backend
        if (response.data.isLoggedIn) {
          setUser(response.data.user); // Set user info if logged in
        }
      } catch (error) {
        console.error("Error checking user status:", error);
      }
    };

    checkUserStatus(); // Call function to check login status
  }, []);

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout"); // Custom backend logout endpoint
      setUser(null); // Clear user state
      navigate("/login"); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Failed to log out:", error); // Handle any errors during logout
    }
  };

  // Change navbar background color on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavbarBg("bg-gray-900 bg-opacity-90"); // Set dark background when scrolling
      } else {
        setNavbarBg("bg-transparent"); // Keep transparent background when at the top
      }
    };

    window.addEventListener("scroll", handleScroll); // Listen for scroll events

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up event listener on component unmount
    };
  }, []);

  return (
    <nav
      className={`w-full p-1 lg:p-2 flex items-center justify-between fixed z-50 ${navbarBg} transition-all duration-300`}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src="anihubtamil1.png"
          alt="AniHub Tamil"
          className="lg:h-16 h-8"
        />
      </Link>

      {/* User navigation links */}
      {user ? (
        <div className="flex items-center">
          <Link to="/profile">
            <button
            
            className="capitalize bg-blue-600 px-1 py-1 lg:text-auto lg:px-4 lg:py-2 rounded cursor-pointer text-white text-sm">
              Profile
            </button>
          </Link>
          
        </div>
      ) : (
        <div className="flex items-center">
          <Link to="/login">
            <button className="capitalize text-white text-sm lg:text-auto lg:pr-2 w-16">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="capitalize bg-blue-600 lg:text-auto px-1 py-1 lg:px-4 lg:py-2 rounded cursor-pointer text-white text-sm ml-2">
              Register
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
