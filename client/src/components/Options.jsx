import React from 'react';
import { useNavigate } from 'react-router-dom';

const Options = () => {
  const navigate = useNavigate();

  const handleUpdateUser = () => {
    navigate('/profile');
  };


  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={handleUpdateUser}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Profile Section
      </button>
      
    </div>
  );
};

export default Options;
