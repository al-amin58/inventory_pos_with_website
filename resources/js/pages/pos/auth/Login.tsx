import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import api from '@/api/axios';

const Login = () => {

   const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [remember, setRemember] = useState(false);

  

  useEffect(() => {
    const admin_token = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
    if (admin_token) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try{
      const { data } = await api.post('/staff-login', { identifier, password, remember, });
      const admin_token = data.admin_token;

       if (!admin_token) {
        toast.error("Admin Token missing from response");
        return;
      }

      if (remember) {
        localStorage.setItem('admin_token', admin_token);  
      } else {
        sessionStorage.setItem('admin_token', admin_token);
      } 
        toast.success('Login successful!');
       navigate('/admin/dashboard', { replace: true });

    }catch (error: unknown) {
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.message || 'Login failed');
      } else{
        toast.error("Unexpected error");
      }
      
    };
    
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      
      
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src="/images/login-bg.jpg"
          alt="Login"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-indigo-700/60 flex items-center justify-center">
          <div className="text-white text-center px-10">
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-lg opacity-90">
              Manage your inventory, sales & customers in one place
            </p>
          </div>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">

          {/* Logo / Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Login to your account
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your credentials to continue
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Email or Phone"
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label htmlFor='remember' className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  id='remember'
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)} 
                  className="rounded" 
                />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 active:scale-95 transition cursor-pointer" 
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-red-500 mt-6">
            If you don't have Permission. You can not login !
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
