import React from 'react';

export default function Landing({ setPage }) {
  const containerClass = "flex flex-col items-center justify-center flex-1 min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white p-6";
  
  return (
    <div className={containerClass}>
      <h1 className="text-4xl font-bold mb-6">Welcome to TaskFlow</h1>
      <p className="mb-8 text-center max-w-md">Manage your tasks easily and stay productive. Register or login to continue.</p>
      <div className="flex gap-4">
        <button onClick={() => setPage('login')} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md">Login</button>
        <button onClick={() => setPage('register')} className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md">Register</button>
      </div>
    </div>
  );
}
