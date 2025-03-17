import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';

export default function Username() {
  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues: {
      username: ''
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      setUsername(values.username);
      navigate('/password');
    }
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster position='top-center' reverseOrder={false} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h4 className='text-3xl font-bold text-gray-800'>Hello Again!</h4>
        <p className='py-2 text-gray-500'>Explore more by connecting with us.</p>
        
        <form className='space-y-4' onSubmit={formik.handleSubmit}>
          <div className='flex justify-center py-4'>
            <img src={avatar} className='w-24 h-24 rounded-full border' alt="avatar" />
          </div>
          <input {...formik.getFieldProps('username')} className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none' type='text' placeholder='Username' autoComplete='off' />
          <button className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all' type='submit'>Let's Go</button>
        </form>
        
        <div className="text-center py-4">
          <span className='text-gray-500'>Not a member? <Link className='text-blue-500' to="/register">Register Now</Link></span>
        </div>
      </div>
    </div>
  );
}
