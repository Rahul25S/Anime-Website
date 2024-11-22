import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { combinedValidate } from './Helper/validate';
import background from "../assets/background.png"

const Recovery = () => {
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
  >
      <Toaster position='top-center' reverseOrder={false} />
      
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md ">
        
        <h2 className="text-2xl font-bold text-center">Recovery</h2>
        <h2 className='text-center'>Enter OTP to recover password</h2>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
        <span className='py-4 text-sm text-gray-500'>Enter 6 digit OTP sent to our mail address.</span>
          <input
            type="text"
            placeholder="Enter the OTP"
            aria-label="Password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-black"
          />
          <button
          
            type='submit'
            className="w-full py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Recover
          </button>
        </form>
        <div className='text-center py-4'>
          <span className='text-gray-500'>Can't get OTP? </span>
          <Link
            to="/signup"
            className="py-2 mt-4 text-red-600"
          >
            Resend
          </Link>
        
          
        </div>
      </div>
    </div>

  );
};

export default Recovery;
