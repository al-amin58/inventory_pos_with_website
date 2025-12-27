import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingCart, MapPin, Heart, Home, LogOut  } from 'lucide-react';

import Profile from '@/components/website/Profile';
import Orders from '@/components/website/Orders';
import Addresses from '@/components/website/Addresses';
import Wishlist from '@/components/website/Wishlist';
import Stats from '@/components/website/Stats';
import { getToken, logoutApi } from '@/api/auth.api';

type Tab = 'profile' | 'orders' | 'addresses' | 'wishlist' | 'Dashboard';

function Dashboard() {
  const navigate = useNavigate();
  const token = getToken();

  const [activeTab, setActiveTab] = useState<Tab>('Dashboard');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    
    const fetchProfile = async () => {
        try {
          const res = await axios.get('/profile');
          setUser(res.data);
        } catch (err: any) {
          if (err.response?.status === 401) {
            toast.error('Session expired. Please login again.');
            navigate('/login', { replace: true });
          }
        }
      };
      fetchProfile();
  }, [token]);

  const handleLogout = async () => {
  try {
    await logoutApi();
  } catch (error) {
    toast.error('Session expired. Please Try again.');
  } finally {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  }
};

  // Tabs with icons for mobile
  const tabs: { key: Tab; label: string; icon: JSX.Element }[] = [
    { key: 'Dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { key: 'profile', label: 'Profile', icon: <User size={20} /> },
    { key: 'orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
    { key: 'addresses', label: 'Addresses', icon: <MapPin size={20} /> },
    { key: 'wishlist', label: 'Wishlist', icon: <Heart size={20} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

      {/* PC Sidebar */}
      <aside className="hidden md:flex w-64 bg-white shadow-lg p-6 flex-col sticky top-0 h-screen">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Dashboard</h2>
        <nav className="flex flex-col gap-3">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`text-left py-2 px-4 rounded-lg transition-all duration-200 hover:bg-purple-50 cursor-pointer ${
                activeTab === tab.key ? 'bg-purple-100 font-semibold text-purple-600' : 'text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <button
          className="mt-auto bg-red-600 text-white py-3 rounded-xl cursor-pointer shadow-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      {/* Mobile Top Bar with icons */}
      <div className="md:hidden flex justify-around bg-white shadow-md p-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`flex flex-col items-center justify-center py-2 px-1 transition-colors duration-200 rounded ${
              activeTab === tab.key ? 'bg-purple-100 text-purple-600' : 'text-gray-700'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon}
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center py-2 px-1 text-red-600 transition-colors duration-200 rounded hover:bg-red-50"
        >
          <LogOut size={20} />
          <span className="text-xs mt-1">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-8 md:p-10 overflow-auto">
        {activeTab === 'Dashboard' && user && <Stats user={user} setUser={setUser} />}
        {activeTab === 'profile' && <Profile user={user} setUser={setUser} />}
        {activeTab === 'orders' && <Orders />}
        {activeTab === 'addresses' && <Addresses />}
        {activeTab === 'wishlist' && <Wishlist />}
      </main>
    </div>
  );
}

export default Dashboard;
