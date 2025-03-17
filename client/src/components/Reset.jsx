import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../helper/validate';
import { resetPassword } from '../helper/helper';
import { useAuthStore } from '../store/store';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook';

export default function Reset() {
  const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession');

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pwd: ''
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      let resetPromise = resetPassword({ username, password: values.password });

      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully...!</b>,
        error: <b>Could not Reset!</b>
      });

      resetPromise.then(() => navigate('/password'));
    }
  });

  if (isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>;
  if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>;
  if (status && status !== 201) return <Navigate to={'/password'} replace={true} />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster position='top-center' reverseOrder={false} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h4 className='text-3xl font-bold text-gray-800'>Reset Password</h4>
        <p className='py-2 text-gray-500'>Enter your new password below.</p>

        <form className='space-y-4' onSubmit={formik.handleSubmit}>
          <input {...formik.getFieldProps('password')} className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none' type='password' placeholder='New Password' autoComplete='off' />
          <input {...formik.getFieldProps('confirm_pwd')} className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none' type='password' placeholder='Confirm Password' autoComplete='off' />
          <button className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all' type='submit'>Reset</button>
        </form>
      </div>
    </div>
  );
}
