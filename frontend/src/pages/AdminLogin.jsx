import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Geçersiz kullanıcı adı veya şifre.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Admin Girişi</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Kullanıcı Adı</label>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
              value={username} onChange={e => setUsername(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Şifre</label>
            <input 
              type="password" 
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
              value={password} onChange={e => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded hover:bg-blue-800 transition">
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
