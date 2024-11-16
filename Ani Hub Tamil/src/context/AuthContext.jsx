// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if the user is authenticated by verifying the token on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('/api/verifyToken', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Handle login: sets token and user in state and localStorage
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  };

  // Handle signup: sets token and user in state and localStorage
  const signup = async (email, password) => {
    try {
      const response = await axios.post('/api/signup', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error) {
      console.error('Signup failed:', error);
      throw new Error('Signup failed');
    }
  };

  // Handle logout: clears token from localStorage and sets user state to null
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
export const useAuth = () => useContext(AuthContext);
