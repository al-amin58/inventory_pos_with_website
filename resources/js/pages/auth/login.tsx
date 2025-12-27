import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { isLoggedIn, loginApi } from '@/api/auth.api';
import { toast } from 'react-hot-toast'; 
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

interface LoginProps {
  canResetPassword: boolean;
  canRegister: boolean;
}

export default function Login({ canResetPassword, canRegister }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  
  useEffect(() => {
    if(isLoggedIn()){
      navigate('/dashboard', {replace: true});
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await loginApi({ identifier, password, remember, });
      const token = data.token;

      if (!token) {
        toast.error("Token missing from response");
        return;
      }

      if (remember) {
        localStorage.setItem('token', token);  
      } else {
        sessionStorage.setItem('token', token);
      } 
      
      toast.success('Login successful!');
      navigate('/dashboard', { replace: true });


    } catch (error: unknown) {
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.message || 'Login failed');
      } else{
        toast.error("Unexpected error");
      }
      
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {/* Identifier */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Email or Phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition shadow-sm hover:shadow-md"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition shadow-sm hover:shadow-md"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="remember" 
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded cursor-pointer"  />
            <label htmlFor="remember" className="text-gray-600 text-sm cursor-pointer">Remember me</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 font-medium"
          >
            {loading && <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>}
            Log In
          </button>

          {/* Forgot Password */}
          {canResetPassword && (
            <Link to="/forgot-password" className="text-purple-600 hover:underline text-sm text-right mt-2">
              Forgot password?
            </Link>
          )}

          {/* Register */}
          {canRegister && (
            <div className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-600 font-medium hover:underline">
                Sign up
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
