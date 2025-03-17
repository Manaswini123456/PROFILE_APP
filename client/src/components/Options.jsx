import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store"; // Zustand store

const Options = () => {
  const navigate = useNavigate();
  const { auth } = useAuthStore(); // Get username from Zustand

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Profile Section Box */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center w-80">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Profile Section</h2>
          <p className="text-gray-600 text-sm mb-4">
            Edit your profile details and update personal information.
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Go to Profile
          </button>
        </div>

        {/* Public Profile Box (Only if username exists) */}
        {auth.username && (
          <div className="bg-white shadow-lg rounded-lg p-6 text-center w-80">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">View as Public</h2>
            <p className="text-gray-600 text-sm mb-4">
              See how your profile appears to others.
            </p>
            <button
              onClick={() => navigate(`/profile/public/${auth.username}`)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              View Public Profile
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Options;
