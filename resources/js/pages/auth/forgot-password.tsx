import React, { useState, useEffect } from 'react';
import { Mail, LoaderCircle, Lock } from 'lucide-react';
import {useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { isLoggedIn } from '@/api/auth.api';

export default function ForgotPassword() {
    const [identifier, setIdentifier] = useState('');
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    // OTP flow states
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    /* ---------------- SEND EMAIL LINK / OTP ---------------- */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const res = await axios.post('/api/forgot-password', {
                identifier,
            });

            toast.success(res.data.message);

            // Phone OTP case
            if (/otp/i.test(res.data.message)) {
                setShowOtp(true);
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        } finally {
            setProcessing(false);
        }
    };

    /* ---------------- VERIFY OTP + RESET PASSWORD ---------------- */
    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setProcessing(true);

        try {
            const res = await axios.post('/api/verify-otp', {
                phone: identifier,
                otp,
                password: newPassword,
                password_confirmation: confirmPassword,
            });

            toast.success(res.data.message);
            setShowOtp(false);
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'OTP verification failed');
        } finally {
            setProcessing(false);
        }
    };

     useEffect(() => {
        if(isLoggedIn()){
            navigate('/dashboard', {replace: true});
        }
        }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Forgot Password
                </h2>

                {/* IDENTIFIER FORM */}
                {!showOtp && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <Mail
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                required
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                placeholder="Email or Phone number"
                                className="w-full pl-10 pr-4 py-3 border focus:outline-none rounded-xl
                                           focus:ring-2 focus:ring-purple-500 "
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-purple-600 text-white py-3 rounded-xl
                                       flex justify-center gap-2 cursor-pointer"
                        >
                            {processing && (
                                <LoaderCircle className="h-5 w-5 animate-spin" />
                            )}
                            Send reset link / OTP
                        </button>
                    </form>
                )}

                {/* OTP + NEW PASSWORD FORM */}
                {showOtp && (
                    <form onSubmit={handleOtpSubmit} className="space-y-4 mt-6">
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="w-full px-4 py-3 border rounded-xl"
                        />

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="w-full pl-10 px-4 py-3 border rounded-xl"
                            />
                        </div>

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border rounded-xl"
                        />

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-green-600 text-white py-3 rounded-xl cursor-pointer"
                        >
                            Reset Password
                        </button>
                    </form>
                )}

                {/* BACK TO LOGIN */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    Or return to{' '}
                    <Link to="/login" className="text-purple-600 font-medium">
                        log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
