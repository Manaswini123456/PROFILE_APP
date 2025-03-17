import React, { useState } from 'react';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';

export default function Profile() {
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address: apiData?.address || ''
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || apiData?.profile || '' });
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success: <b>Updated Successfully! 🎉</b>,
        error: <b>Update Failed! ❌</b>
      });
    }
  });

  /** Handles file upload */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  const GoBack = () => navigate('/options');

  // Logout function
  function userLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  if (isLoading) return <h1 className="text-2xl font-bold text-center">Loading...</h1>;
  if (serverError) return <h1 className="text-xl text-red-500 text-center">{serverError.message}</h1>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white shadow-xl rounded-lg p-8 w-[40%] text-center">
        
        {/* Profile Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Profile</h2>
        <p className="text-gray-500 text-sm mb-6">You can update your details here.</p>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="profile" className="cursor-pointer">
            <img
              src={apiData?.profile || file || avatar}
              className="w-24 h-24 rounded-full border-4 border-gray-300 hover:opacity-80 transition"
              alt="User Avatar"
            />
          </label>
          <input
            onChange={onUpload}
            type="file"
            id="profile"
            name="profile"
            className="hidden"
          />
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              {...formik.getFieldProps('firstName')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="First Name"
              autoComplete="off"
            />
            <input
              {...formik.getFieldProps('lastName')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Last Name"
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              {...formik.getFieldProps('mobile')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Mobile No."
              autoComplete="off"
            />
            <input
              {...formik.getFieldProps('email')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Email*"
              autoComplete="off"
            />
          </div>

          <input
            {...formik.getFieldProps('address')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Address"
            autoComplete="off"
          />

          {/* Buttons */}
          <div className="flex flex-col items-center gap-3">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
              type="submit"
            >
              Update
            </button>

            <span className="text-gray-500">OR</span>

            <button
              className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
              type="button"
              onClick={GoBack}
            >
              Go Back
            </button>

            <div className="text-center pt-4">
              <span className="text-gray-500">
                Want to leave?{' '}
                <button
                  onClick={userLogout}
                  className="text-red-500 hover:text-red-700 font-semibold transition"
                >
                  Logout
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
