import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { registerUser } from '../helper/helper';

export default function Register() {
  const navigate = useNavigate();
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
      let registerPromise = registerUser(values);
      
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: <b>Registered Successfully! 🎉</b>,
        error: <b>Could not Register. ❌</b>
      });

      registerPromise.then(() => navigate('/'));
    }
  });

  /** Handles file upload */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster position='top-center' reverseOrder={false} />
      
      <div className="bg-white shadow-xl rounded-lg p-8 w-[40%] text-center">
        {/* Header */}
        <h2 className='text-3xl font-bold text-gray-800 mb-2'>Register</h2>
        <p className='text-gray-500 text-sm mb-6'>Happy to have you on board!</p>

        {/* Profile Image Upload */}
        <div className='flex flex-col items-center mb-6'>
          <label htmlFor="profile" className="cursor-pointer">
            <img
              src={file || avatar}
              className="w-24 h-24 rounded-full border-4 border-gray-300 hover:opacity-80 transition"
              alt="User Avatar"
            />
          </label>
          <input
            onChange={onUpload}
            type="file"
            id='profile'
            name='profile'
            className='hidden'
          />
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            {...formik.getFieldProps('email')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder='Email*'
            autoComplete='off'
          />

          <input
            {...formik.getFieldProps('username')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder='Username*'
            autoComplete='off'
          />

          <input
            {...formik.getFieldProps('password')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder='Password*'
            autoComplete='off'
          />

          {/* Buttons */}
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
            type='submit'
          >
            Register
          </button>

          <div className="text-center pt-4">
            <span className='text-gray-500'>Already registered?{' '}
              <Link className='text-red-500 hover:text-red-700 font-semibold transition' to="/">
                Login Now
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
