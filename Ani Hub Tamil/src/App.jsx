// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './Pages/Profile';
import Navbar from './Components/Navbar';
import { AuthProvider } from './context/AuthContext';  // Import the AuthProvider
import ProtectedRoute from './Components/ProtectedRoute';
import StudioApartmentGoodLightingAngelIncluded from './Anime/StudioApartmentGoodLightingAngelIncluded';
import TimeLoopTheVillainessEnjoys from './Anime/TimeLoopTheVillainessEnjoys';
<ProtectedRoute></ProtectedRoute>
const App = () => {
  return (
    <AuthProvider>  {/* Wrap the app with the AuthProvider */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/Studio-Apartment-Good-Lighting-Angel-Included" element={<StudioApartmentGoodLightingAngelIncluded />} />
        <Route path="/7th-Time-Loop-The-Villainess-Enjoys-a-Carefree-Life-Married-to-Her-Worst-Enemy" element={<TimeLoopTheVillainessEnjoys />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
