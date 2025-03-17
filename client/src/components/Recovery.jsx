import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom';

export default function Recovery() {
  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then(OTP => {
      if (OTP) {
        toast.success('OTP has been sent to your email!');
      } else {
        toast.error('Problem while generating OTP!');
      }
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success('Verified Successfully!');
        navigate('/reset');
      }
    } catch (error) {
      toast.error('Wrong OTP! Check email again!');
    }
  }

  function resendOTP() {
    let sentPromise = generateOTP(username);
    toast.promise(sentPromise, {
      loading: 'Sending...',
      success: <b>OTP has been sent to your email!</b>,
      error: <b>Could not send OTP!</b>
    });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster position='top-center' reverseOrder={false} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h4 className='text-3xl font-bold text-gray-800'>Recovery</h4>
        <p className='py-2 text-gray-500'>Enter OTP to recover password.</p>

        <form className='space-y-4' onSubmit={onSubmit}>
          <p className='text-sm text-gray-500'>Enter the 6-digit OTP sent to your email.</p>
          <input
            onChange={(e) => setOTP(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-center'
            type='text'
            placeholder='Enter OTP'
            autoComplete='off'
          />
          <button className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all' type='submit'>Recover</button>
        </form>

        <p className='text-gray-500 mt-4'>Can't get OTP? <button onClick={resendOTP} className='text-blue-500 hover:underline'>Resend</button></p>
      </div>
    </div>
  );
}
