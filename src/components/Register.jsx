import React from 'react';

export default function Register({ handleRegister, setPage }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full max-w-sm">
        <input name="username" placeholder="Username" className="p-2 rounded-md text-black"/>
        <input name="email" type="email" placeholder="Email" className="p-2 rounded-md text-black"/>
        <input name="password" type="password" placeholder="Password" className="p-2 rounded-md text-black"/>
        <button type="submit" className="bg-green-600 hover:bg-green-700 py-2 rounded-md">Register</button>
      </form>
      <p className="mt-4">
        Already have an account? <button className="text-blue-400 underline" onClick={() => setPage('login')}>Login</button>
      </p>
    </div>
  );
}

  