import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // In a real application, you would validate credentials against a backend
    // For demo purposes, we'll use a hardcoded admin/admin
    if (username === 'admin' && password === 'GeplakManggleng_1234') {
      login('dummy-token'); // In real app, this would be a JWT or similar
      navigate('/admin');
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex items-center justify-center pt-36 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900">
              Admin Panel
            </h2>
          </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none block w-full px-4 py-2 bg-transparent border-2 border-blue-600 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none block w-full px-4 py-2 bg-transparent border-2 border-blue-600 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}