import React from 'react';

export default function PageNotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-500 mt-2">Page Not Found</p>
      <a href="/" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all">Go Home</a>
    </div>
  );
}