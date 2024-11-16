import React, { useState } from 'react';

const Login = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setConfirmed(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
        <button
          onClick={handleLogin}
          className="w-full py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
