import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface WishlistItem {
  id: number;
  product_id: number;
  name: string;
  price: number;
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchWishlist = async () => {
      try {
        const res = await axios.get('/wishlist');
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.data || res.data.wishlist || [];
        if (mounted) setWishlist(data);
      } catch {
        toast.error('Failed to load wishlist');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchWishlist();

    return () => {
      mounted = false;
    };
  }, []);

  const remove = async (id: number) => {
    try {
      await axios.delete(`/wishlist/${id}`);
      setWishlist(prev => prev.filter(item => item.id !== id));
      toast.success('Removed from wishlist');
    } catch {
      toast.error('Remove failed');
    }
  };

  if (loading) return <p>Loading wishlist...</p>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">My Wishlist</h3>

      {wishlist.length === 0 && (
        <p className="text-gray-500 text-center py-6 bg-white rounded-xl shadow">
          Your wishlist is empty
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map(item => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow"
          >
            <div>
              <h4 className="text-lg font-medium text-gray-800">{item.name}</h4>
              <p className="text-gray-500 mt-1">৳ {item.price}</p>
            </div>

            <button
              onClick={() => remove(item.id)}
              className="mt-4 bg-red-600 text-white py-2 rounded-xl shadow hover:bg-red-700 transition-colors font-medium"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
