import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingBag, Wallet, Activity } from 'lucide-react';

interface ActivityItem {
  id: number;
  message: string;
  created_at: string;
}

interface StatsData {
  total_orders: number;
  wallet_balance: number;
  recent_activity: ActivityItem[];
}

export default function Stats() {
  const [stats, setStats] = useState<StatsData>({
    total_orders: 0,
    wallet_balance: 0,
    recent_activity: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      try {
        const res = await axios.get('/dashboard-stats');
        const data = res.data?.data || res.data || {};

        if (mounted) {
          setStats({
            total_orders: data.total_orders ?? 0,
            wallet_balance: data.wallet_balance ?? 0,
            recent_activity: Array.isArray(data.recent_activity)
              ? data.recent_activity
              : [],
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchStats();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Orders */}
        <div className="group bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Orders</p>
              <h2 className="text-3xl font-bold mt-1">
                {stats.total_orders}
              </h2>
            </div>

            <div className="bg-white/20 p-3 rounded-xl group-hover:scale-110 transition">
              <ShoppingBag size={28} />
            </div>
          </div>
        </div>

        {/* Wallet */}
        <div className="group bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Wallet Balance</p>
              <h2 className="text-3xl font-bold mt-1">
                ৳ {stats.wallet_balance}
              </h2>
            </div>

            <div className="bg-white/20 p-3 rounded-xl group-hover:scale-110 transition">
              <Wallet size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="text-indigo-600" />
          <h3 className="font-semibold text-lg">
            Recent Activity
          </h3>
        </div>

        {stats.recent_activity.length === 0 && (
          <p className="text-gray-500 text-sm">
            No recent activity found
          </p>
        )}

        <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
          {stats.recent_activity.map(item => (
            <div
              key={item.id}
              className="flex gap-3 items-start border-l-2 border-indigo-500 pl-4 hover:bg-gray-50 rounded-md py-2 transition"
            >
              <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2" />

              <div>
                <p className="text-sm text-gray-700">
                  {item.message}
                </p>
                <span className="text-xs text-gray-400">
                  {new Date(item.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
