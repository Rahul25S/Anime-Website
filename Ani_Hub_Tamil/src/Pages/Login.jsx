import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { combinedValidate } from './Helper/validate';
import background from "../assets/background.png"

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate: combinedValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const errors = await combinedValidate(values);
      if (Object.keys(errors).length === 0) {
        console.log(values); // Form is valid
      } else {
        console.log('Form submission prevented due to validation errors.');
      }
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-black "
    style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
  >
      <Toaster position='top-center' reverseOrder={false} />
      
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md ">
        
        <h2 className="text-2xl font-bold text-center">Log In</h2>
        <h2 className='text-center'>Hello Again!</h2>
        <div className='profile flex justify-center py-4'>
          <img 
            className='border-4 border-gray-100 w-[135px] rounded-full shadow-lg cursor-pointer hover:border-gray-200' 
            src={avatar} 
            alt="User avatar" 
          />
        </div>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <input 
            {...formik.getFieldProps('username')}
            type="text"
            placeholder="Enter your Username"
            aria-label="Username"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
          {...formik.getFieldProps('password')}
            type="password"
            placeholder="Enter your password"
            aria-label="Password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type='submit'
            className="w-full py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Log In
          </button>
        </form>
        <div className='text-center py-4'>
          <span className='text-gray-700'>New to Ani Hub Tamil? </span>
          <Link
            to="/signup"
            className="py-2 mt-4 text-blue-700"
          >
            Register Now
          </Link>
          <div className='text-sm'>
          <span className='text-gray-500 '>Forgot Password? </span>
          <Link
            to="/recovery"
            className="py-2 mt-4 text-red-600"
          >
            Recover Now
          </Link>
          </div>
          
        </div>
      </div>
    </div>

  );
};

export default Login;
