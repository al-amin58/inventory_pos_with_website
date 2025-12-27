import React, { useState, useEffect } from 'react';
import axios from '@/api/axios';
import toast from 'react-hot-toast';

interface Props {
  user: any;
  setUser: (user: any) => void;
}

export default function Profile({ user, setUser }: Props) {

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try{
        const res = await axios.get('/profile');
        setUser(res.data);
        setForm({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
        });
      }catch(err:any){
        toast.error(err.response?.data?.message || 'Faild to load profile');
      }
    };
    fetchProfile();
  }, [setUser]);

  const updateProfile = async () => {
    try {
      const res = await axios.put('/profile', form);
      setUser(res.data);
      toast.success('Profile updated');
    } catch (e: any) {
      toast.error(e.response?.data?.message || 'Update failed');
    }
  };

  const changePassword = async () => {
    try {
      await axios.put('/profile/password', passwordForm);
      toast.success('Password changed');
      setPasswordForm({
        current_password: '',
        password: '',
        password_confirmation: '',
      });
    } catch (e: any) {
      toast.error(e.response?.data?.message || 'Password update failed');
    }
  };


  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Profile Info */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
          Profile Information
        </h3>
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['name', 'email', 'phone'].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-gray-600 mb-1 capitalize">{field}</label>
              <input
                className="border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder={field}
                value={(form as any)[field] ?? ''}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          onClick={updateProfile}
          className="mt-6 cursor-pointer w-full md:w-1/3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-transform font-medium flex items-center justify-center gap-2"
        >
          Save Changes
        </button>
      </div>

      {/* Password Change */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 ">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
          Change Password
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['current_password', 'password', 'password_confirmation'].map(
            (field) => (
              <div key={field} className="flex flex-col">
                <label className="text-gray-600 mb-1 capitalize">
                  {field.replace('_', ' ')}
                </label>
                <input
                  type="password"
                  className="border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  placeholder={field.replace('_', ' ')}
                  value={(passwordForm as any)[field] ?? ''}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, [field]: e.target.value })
                  }
                />
              </div>
            )
          )}
        </div>

        <button
          type="submit"
          onClick={changePassword}
          className="mt-6 cursor-pointer w-full md:w-1/3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-transform font-medium flex items-center justify-center gap-2"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
