import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi, isLoggedIn } from '@/api/auth.api';
import toast from 'react-hot-toast';

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        identifier: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            const res = await registerApi(form);

            toast.success(
                res.data.message || 'Registration successful! Please log in.'
            );

            navigate('/login');
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response?.data?.errors);
                toast.error(err.response?.data?.message);
            } else if (err.response?.status === 403) {
                toast.error(err.response.data.message);
            } else {
                toast.error('Something went wrong. Try again.');
            }
        } finally {
            setProcessing(false);
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if(isLoggedIn()){
          navigate('/dashboard', {replace: true});
        }
      }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    {/* Name */}
                    <div className="relative min-h-[3.5rem]">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Full name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition shadow-sm hover:shadow-md"
                        />
                    </div>
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}

                    {/* Email */}
                    <div className="relative min-h-[3.5rem]">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            id="identifier"
                            type="text"
                            name="identifier"
                            placeholder="Email or Phone Number"
                            value={form.identifier}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition shadow-sm hover:shadow-md"
                        />
                    </div>
                    {errors.identifier && <p className="text-sm text-red-500 mt-1">{errors.identifier}</p>}

                    {/* Password */}
                    <div className="relative min-h-[3.5rem]">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition shadow-sm hover:shadow-md"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}

                    {/* Confirm Password */}
                    <div className="relative min-h-[3.5rem]">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            id="password_confirmation"
                            type={showPassword ? 'text' : 'password'}
                            name="password_confirmation"
                            placeholder="Confirm password"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition shadow-sm hover:shadow-md"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password_confirmation && <p className="text-sm text-red-500 mt-1">{errors.password_confirmation}</p>}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="mt-2 w-full cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 font-medium"
                        disabled={processing}
                    >
                        {processing && (
                            <svg
                                className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"
                                viewBox="0 0 24 24"
                            ></svg>
                        )}
                        Create Account
                    </button>
                </form>

                {/* Login Link */}
                <div className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple-600 font-medium hover:underline">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
