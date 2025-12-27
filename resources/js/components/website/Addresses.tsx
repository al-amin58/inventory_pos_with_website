import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';
import toast from 'react-hot-toast';
import { MapPin, Trash2, Plus, User, Phone } from 'lucide-react';

interface Address {
  id: number;
  full_name: string;
  phone: string;
  label?: string;
  address: string;
}

export default function Addresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ full_name: '', phone: '', label: '', address: '' });

  useEffect(() => {
    const fetchAddresses = async () =>{
      try{
        const res = await  axios.get('/addresses');
        setAddresses(res.data);
      }catch (err){
        console.error(err);
        toast.error('Failed to load addresses');
      }finally{
        setLoading(false)
      }
    };
      fetchAddresses();
}, []);
  //   axios.get('/addresses')
  //     .then(res => {
  //       const data = Array.isArray(res.data)
  //         ? res.data
  //         : res.data.data || [];
  //       setAddresses(data);
  //     })
  //     .catch(() => toast.error('Failed to load addresses'))
  //     .finally(() => setLoading(false));
  // }, []);

  const save = async () => {
    if (!form.full_name || !form.phone || !form.address) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      await axios.post('/addresses', form);
      toast.success('Address added');
      setForm({ full_name: '', phone: '', label: '', address: '' });
      const res = await axios.get('/addresses');
      setAddresses(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch {
      toast.error('Failed to save address');
    }
  };

  const remove = async (id: number) => {
    try {
      await axios.delete(`/addresses/${id}`);
      setAddresses(prev => prev.filter(a => a.id !== id));
      toast.success('Address deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-gray-500">
        Loading addresses...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-10 pb-24">

      {/* ADD ADDRESS */}
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Plus className="text-indigo-600" />
          Add New Address
        </h3>

        <div className="space-y-4">
          <input
            placeholder="Full Name"
            value={form.full_name}
            onChange={e => setForm({ ...form, full_name: e.target.value })}
            className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            placeholder="Phone Number"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            placeholder="Label (Home / Office)"
            value={form.label}
            onChange={e => setForm({ ...form, label: e.target.value })}
            className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <textarea
            placeholder="Full Address"
            value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
            rows={3}
            className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Mobile Sticky Button */}
        <div className="mt-6">
          <button
            onClick={save}
            className="w-full md:w-auto flex items-center justify-center gap-2 cursor-pointer bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition shadow-lg"
          >
            <Plus size={18} />
            Save Address
          </button>
        </div>
      </div>

      {/* ADDRESS LIST */}
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 ">
          <MapPin className="text-indigo-600" />
          Saved Addresses
        </h3>

        {addresses.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            No addresses added yet
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {addresses.map(addr => (
            <div
              key={addr.id}
              className="relative border rounded-2xl p-5 hover:shadow-lg transition bg-gray-50"
            >
              <div className="flex items-start gap-3">
                <MapPin className="text-indigo-600 mt-1" size={18} />

                <div className="flex-1 space-y-1">
                  {addr.label && (
                    <p className="font-semibold text-gray-800">
                      {addr.label}
                    </p>
                  )}

                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <User size={14} /> {addr.full_name}
                  </p>

                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <Phone size={14} /> {addr.phone}
                  </p>

                  <p className="text-sm text-gray-600">
                    {addr.address}
                  </p>
                </div>

                <button
                  onClick={() => remove(addr.id)}
                  className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
