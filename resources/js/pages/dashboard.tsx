import React, { useState } from "react";
import { FaBars, FaHome, FaUserCircle, FaExternalLinkAlt, FaBoxOpen, FaShoppingCart, FaDollarSign, FaChartLine, FaUsers } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "@/api/axios";

// Main Admin Panel
export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hovered, setHovered] = useState(false); // hover state for collapsed
  const [profileOpen, setProfileOpen] = useState(false);

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post("/admin/logout");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      localStorage.removeItem("admin_token");
      sessionStorage.removeItem("admin_token");
      toast.success("Logged out successfully");
      window.location.href = "/admin/login";
    }
  };

  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", link: "/admin/dashboard" },
    { icon: <FaBoxOpen />, label: "Inventory", link: "/admin/products" },
    { icon: <FaShoppingCart />, label: "Orders", link: "/admin/orders" },
    { icon: <FaDollarSign />, label: "Revenue", link: "/admin/revenue" },
    { icon: <FaUsers />, label: "Users", link: "/admin/users" },
    { icon: <FaChartLine />, label: "Analytics", link: "/admin/analytics" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* Sidebar */}
      <aside
        className={`bg-white dark:bg-gray-800 shadow-md transition-all duration-300 flex flex-col 
          ${sidebarOpen ? "w-64" : "w-20"}`}
        onMouseEnter={() => !sidebarOpen && setHovered(true)}
        onMouseLeave={() => !sidebarOpen && setHovered(false)}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <span className={`text-2xl font-bold text-purple-600 dark:text-purple-400 transition-opacity duration-300 
            ${sidebarOpen || hovered ? "opacity-100" : "opacity-0"}`}>
            Admin Panel
          </span>
          {/* Toggle sidebar */}
          <button className="text-gray-600 dark:text-gray-300 text-2xl" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, idx) => (
            <a
              href={item.link}
              key={idx}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-700 transition"
              title={item.label}
            >
              {item.icon}
              {(sidebarOpen || hovered) && (
                <span className="transition-opacity duration-300">{item.label}</span>
              )}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="flex justify-between items-center bg-white dark:bg-gray-800 shadow-md p-4">
          <div className="flex items-center gap-4">
            <button className="text-gray-600 dark:text-gray-300 text-2xl md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FaBars />
            </button>
            <a href="/" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-300 text-2xl hover:text-purple-600 dark:hover:text-purple-400 transition" title="Go to Website">
              <FaExternalLinkAlt />
            </a>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition">
              <FaUserCircle className="text-2xl" />
              <span className="hidden md:inline">Profile</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 shadow-lg rounded-lg py-2 z-50">
                <button className="block w-full text-left px-4 py-2 hover:bg-purple-100 dark:hover:bg-gray-600 transition">Profile</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-purple-100 dark:hover:bg-gray-600 transition">Settings</button>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transition">Logout</button>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard title="Total Products" value="1,234" />
            <StatCard title="Total Orders" value="567" />
            <StatCard title="Revenue" value="$12,345" />
            <StatCard title="Active Users" value="1,234" />
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 overflow-auto mb-6">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <Table />
          </div>

          {/* Analytics / Charts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
            <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-300">[Chart Placeholder]</div>
          </div>

        </main>
      </div>
    </div>
  );
}

// -----------------------------
// Stat Card Component
function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-2xl font-bold text-gray-700 dark:text-gray-200">{value}</p>
    </div>
  );
}

// -----------------------------
// Table Component
function Table() {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="text-gray-700 dark:text-gray-300">
          <th className="py-2 px-4 border-b">Order ID</th>
          <th className="py-2 px-4 border-b">Customer</th>
          <th className="py-2 px-4 border-b">Amount</th>
          <th className="py-2 px-4 border-b">Status</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 dark:text-gray-200">
        <tr><td className="py-2 px-4 border-b">#1001</td><td className="py-2 px-4 border-b">John Doe</td><td className="py-2 px-4 border-b">$120</td><td className="py-2 px-4 border-b">Completed</td></tr>
        <tr><td className="py-2 px-4 border-b">#1002</td><td className="py-2 px-4 border-b">Jane Smith</td><td className="py-2 px-4 border-b">$80</td><td className="py-2 px-4 border-b">Pending</td></tr>
        <tr><td className="py-2 px-4 border-b">#1003</td><td className="py-2 px-4 border-b">Alice</td><td className="py-2 px-4 border-b">$200</td><td className="py-2 px-4 border-b">Completed</td></tr>
      </tbody>
    </table>
  );
}
