import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';
import { verifyPassword } from '../helper/helper';
import styles from '../styles/Username.module.css';

export default function Password() {
  const navigate = useNavigate();
  const { username } = useAuthStore(state => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      let loginPromise = verifyPassword({ username, password: values.password });
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success: <b>Login Successful!</b>,
        error: <b>Incorrect Password!</b>
      });

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/options');
      });
    }
  });

  if (isLoading) return <h1 className='text-2xl font-bold text-center'>Loading...</h1>;
  if (serverError) return <h1 className='text-xl text-red-500 text-center'>{serverError.message}</h1>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster position='top-center' reverseOrder={false} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h4 className='text-3xl font-bold text-gray-800'>
          Hello, {apiData?.firstName || apiData?.username || 'Guest'}!
        </h4>
        <p className='py-2 text-gray-500'>Explore more by connecting with us.</p>

        <div className='flex justify-center py-4'>
          <img src={apiData?.profile || avatar} className='w-24 h-24 rounded-full border shadow-md' alt="avatar" />
        </div>

        <form className='space-y-4' onSubmit={formik.handleSubmit}>
          <input
            {...formik.getFieldProps('password')}
            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
            type='password'
            placeholder='Enter Password'
            autoComplete='off'
          />
          <button
            className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all'
            type='submit'>
            Sign In
          </button>
        </form>

        <p className='text-gray-500 mt-4'>
          Forgot Password? <Link className='text-blue-500 hover:underline' to="/recovery">Recover Now</Link>
        </p>
      </div>
    </div>
  );
}
