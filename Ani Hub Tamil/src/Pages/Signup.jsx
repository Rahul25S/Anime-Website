import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = (e)=>{
e.preventDefault()
axios.post('',{name, email ,password})
.then(result=>console.log(result))
.catch(err=> console.log(err))
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your Name"
            onChange={(e)=>setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Enter your Email"
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Signup
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
