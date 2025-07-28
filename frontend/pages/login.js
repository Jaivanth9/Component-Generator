// Placeholder for frontend/pages/login.js

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      router.push('/editor');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200">
      <div className="w-full max-w-md px-6">
        <div className="bg-white/90 p-10 rounded-3xl shadow-2xl flex flex-col items-center relative overflow-hidden">
          {/* Decorative background shapes */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-200 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="flex justify-center mb-6 w-full z-10">
            {/* Example logo */}
            <div className="bg-gradient-to-tr from-green-400 to-green-600 rounded-full p-3 shadow-lg">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#fff" />
                <path d="M8 12l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-extrabold mb-8 text-center text-green-600 w-full tracking-tight z-10 drop-shadow-lg">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center z-10">
            {/* You can add error messages here if needed */}
            <div className="w-4/5 mb-6">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border border-green-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition shadow-sm bg-green-50 placeholder-green-400"
                required
                autoComplete="email"
              />
            </div>
            <div className="w-4/5 mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border border-green-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition shadow-sm bg-green-50 placeholder-green-400"
                required
                autoComplete="current-password"
              />
            </div>
            <div className="w-4/5 flex justify-end mb-8">
              <a href="#" className="text-green-500 hover:underline text-sm font-medium transition">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-green-400 to-green-600 text-white w-4/5 py-3 rounded-xl hover:scale-105 hover:shadow-xl transition duration-300 font-bold text-lg shadow-lg"
            >
              Login
            </button>
          </form>
          <div className="mt-8 w-full text-center text-gray-600 text-sm z-10">
            Don't have an account?{' '}
            <a href="/signup" className="text-green-500 hover:underline font-semibold transition">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
