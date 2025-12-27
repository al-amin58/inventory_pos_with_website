import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Download, RefreshCcw } from 'lucide-react';

interface Order {
  id: number;
  status: string;
  total: number;
  return_requested?: boolean;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/orders');
        setOrders(Array.isArray(res.data) ? res.data : res.data.data || []);
      } catch (e) {
        toast.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const downloadInvoice = (id: number) => {
    window.open(`/orders/${id}/invoice`, '_blank');
  };

  const requestReturn = async (id: number) => {
    try {
      await axios.post(`/orders/${id}/return`);
      toast.success('Return requested');
      setOrders(prev =>
        prev.map(order =>
          order.id === id ? { ...order, return_requested: true } : order
        )
      );
    } catch {
      toast.error('Cannot request return');
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500">
        Loading orders...
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Order History
        </h3>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No orders found
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 rounded-t-xl">
                <tr>
                  <th className="py-3 px-4 text-gray-600">ID</th>
                  <th className="py-3 px-4 text-gray-600">Status</th>
                  <th className="py-3 px-4 text-gray-600">Total</th>
                  <th className="py-3 px-4 text-gray-600 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map(order => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4 capitalize">
                      {order.status}
                    </td>
                    <td className="py-3 px-4">৳{order.total}</td>
                    <td className="py-3 px-4 flex justify-center gap-2 flex-wrap">
                      <button
                        onClick={() => downloadInvoice(order.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                      >
                        <Download size={16} /> Invoice
                      </button>

                      {order.status === 'delivered' &&
                        !order.return_requested && (
                          <button
                            onClick={() => requestReturn(order.id)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                          >
                            <RefreshCcw size={16} /> Return
                          </button>
                        )}

                      {order.return_requested && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-xl text-sm">
                          Return Requested
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
