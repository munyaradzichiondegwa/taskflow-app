import React from 'react';

export default function Login({ handleLogin, loginUserRef, loginPassRef, rememberMe, setRememberMe, setPage }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
        <input ref={loginUserRef} placeholder="Username" className="p-2 rounded-md text-black"/>
        <input type="password" ref={loginPassRef} placeholder="Password" className="p-2 rounded-md text-black"/>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
          <span>Remember me</span>
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 py-2 rounded-md">Login</button>
      </form>
      <p className="mt-4">
        Don't have an account? <button className="text-green-400 underline" onClick={() => setPage('register')}>Register</button>
      </p>
    </div>
  );
}
