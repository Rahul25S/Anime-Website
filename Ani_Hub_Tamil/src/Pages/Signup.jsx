import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from './Helper/validate';
import background from "../assets/background.png";
import convertToBase64 from './Helper/convert';

const Signup = () => {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: ''
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || '' });
      console.log(values);
      const errors = await registerValidation(values);
      if (Object.keys(errors).length === 0) {
        console.log(values); // Form is valid
      } else {
        console.log('Form submission prevented due to validation errors.');
      }
    }
  });

  // Formik doesn't support file upload, so we need this handler
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-black"
      style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
    >
      <Toaster position='top-center' reverseOrder={false} />
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <h2 className='text-center'>Register</h2>
        <div className='profile flex justify-center py-4'>
          <label htmlFor="profile">
            <img
              className='border-4 border-gray-100 w-[135px] rounded-full shadow-lg cursor-pointer hover:border-gray-200'
              src={file || avatar}
              alt="User avatar"
            />
          </label>
          <input onChange={onUpload} type='file' id='profile' name='profile' style={{ display: 'none' }} />
        </div>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <input
            {...formik.getFieldProps('email')}
            type="email"
            placeholder="Enter your mail*"
            aria-label="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            {...formik.getFieldProps('password')}
            type="password"
            placeholder="Enter your password*"
            aria-label="Password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            {...formik.getFieldProps('username')}
            type="text"
            placeholder="Enter your username*"
            aria-label="Username"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type='submit'
            className="w-full py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Register
          </button>
        </form>
        <div className='text-center py-4'>
          <span className='text-gray-700'>Already have an Account? </span>
          <Link to="/login" className="py-2 mt-4 text-blue-700">
            LogIn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
