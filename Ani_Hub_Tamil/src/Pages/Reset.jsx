import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidateion } from './Helper/validate';

const Reset = () => {
  
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pwd: ''
    },
    validate: resetPasswordValidateion,
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
        
        <h2 className="text-2xl font-bold text-center">Reset</h2>
        <h2 className='text-center'>Enter New Password</h2>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
         <input
          {...formik.getFieldProps('password')}
            type="password"
            placeholder="Enter new password"
            aria-label="Password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
          {...formik.getFieldProps('confirm_pwd')}
            type="password"
            placeholder="Confirm password"
            aria-label="Password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type='submit'
            className="w-full py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Reset
          </button>
        </form>
        <div className='text-center py-4'>
          <span className='text-gray-500'>Back to Login? </span>
          <Link
            to="/login"
            className="py-2 mt-4 text-blue-600"
          >
            Login
          </Link>
        
          
        </div>
      </div>
    </div>

  );
};

export default Reset;
