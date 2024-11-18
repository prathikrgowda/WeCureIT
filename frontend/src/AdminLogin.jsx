import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    if (email && password) {
      navigate('/Dashboard'); // Redirect to Dashboard
    } else {
      alert('Please enter email and password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="w-full px-4 py-3 bg-white border-b border-gray-300 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Left Section: Logo and Admin Badge */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl text-indigo-800">WeCureIT</h1>
            <span className="px-3 py-1 text-xs font-thin leading-4 text-gray-600 rounded-full border border-gray-500">
              Admin
            </span>
          </div>

          {/* Center Section: Navigation Links */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8 text-sm font-medium">
            <button
              onClick={() => navigate('/home')} // Update paths as needed
              className="text-gray-800 hover:text-indigo-600 transition-colors"
            >
              HOME
            </button>
            <button
              onClick={() => navigate('/about')} // Update paths as needed
              className="text-gray-800 hover:text-indigo-600 transition-colors"
            >
              ABOUT
            </button>
            <button
              onClick={() => navigate('/contact')} // Update paths as needed
              className="text-gray-800 hover:text-indigo-600 transition-colors"
            >
              CONTACT
            </button>
          </nav>
        </div>
      </header>

      {/* Login Card */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white border rounded-lg shadow-lg w-[400px] p-6">
          <h2 className="text-lg font-medium text-center text-gray-800 mb-6">
            <span className="text-indigo-800 font-bold">Admin</span> Login
          </h2>
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                placeholder="Enter your email"
              />
            </div>
            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                placeholder="Enter your password"
              />
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
