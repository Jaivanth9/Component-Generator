import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
// import logo from '../public/logo.png';
import Image from 'next/image';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      router.push('/editor');
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="w-full max-w-md px-6">
        <div className="bg-white p-10 rounded-2xl shadow-2xl flex flex-col items-center">
          <div className="flex justify-center mb-6 w-full">
            {/* <Image src={logo} alt="Logo" width={80} height={80} className="rounded-full" /> */}
          </div>
          <h2 className="text-4xl font-extrabold mb-8 text-center text-red-600 w-full tracking-tight">Sign Up</h2>
          <form onSubmit={handleSignup} className="w-full flex flex-col items-center">
            {error && (
              <div className="text-red-500 text-center mb-4 w-full bg-red-100 rounded py-2 px-3">
                {error}
              </div>
            )}

            <div className="w-4/5 mb-5">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                required
              />
            </div>
            <div className="w-4/5 mb-5">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                required
              />
            </div>
            <div className="w-4/5 mb-5">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                required
              />
            </div>
            <div className="w-4/5 mb-8">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white w-4/5 py-3 rounded-lg hover:bg-red-600 transition duration-300 font-semibold text-lg shadow"
            >
              Create Account
            </button>
          </form>
          <div className="mt-8 w-full text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-red-500 hover:underline font-medium">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
