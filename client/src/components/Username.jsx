import React from 'react'
import profile from '../assets/profile.png';
const Username = () => {
  return (
    <div className='container mx-auto'>
      <div className='flex justify-center items-center h-screen'>
        <div>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-semibold'>
              Hello Again!</h4>
              <span className='py-4 text-xl items-center'>
                Good Morning
              </span>
          </div>
          <form className='py-1'>
            <div className='profile flex justify-center py-4'>
              <img src={profile} alt='avatar'/>
            </div>
            <div className='textbox'>
              <input type='text' placeholder='Username'/>
              <button type='submit'></button>
            </div>
          </form>
        </div>

      </div>

    </div>
  )
}

export default Username
