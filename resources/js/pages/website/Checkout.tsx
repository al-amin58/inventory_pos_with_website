import React, { useState } from "react";
import { useCart } from "@/components/website/CartContext";
import { Link } from "react-router-dom";

const Checkout: React.FC = () => {
  const { cart } = useCart()!;
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const [shipping, setShipping] = useState<"inside" | "outside">("inside");
  const [payment, setPayment] = useState<"cod" | "card">("cod");

  const shippingCost = shipping === "inside" ? 70 : 130;
  const total = subtotal + shippingCost - discount;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const applyCoupon = () => {
    coupon === "SAVE10" ? setDiscount(10) : alert("Invalid coupon");
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <Link to="/" className="bg-purple-600 text-white px-6 py-2 rounded-xl">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ================= LEFT ================= */}
        <div className="md:col-span-2 space-y-6">
          {/* Billing */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-4">Billing Details</h2>
            <div className="space-y-4">
              {["name", "phone"].map(field => (
                <input
                  key={field}
                  name={field}
                  placeholder={field === "name" ? "Full Name" : "Phone Number"}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              ))}
              <textarea
                name="address"
                placeholder="Delivery Address"
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 h-24 focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <textarea
                name="note"
                placeholder="Order Note (optional)"
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 h-20"
              />
            </div>
          </div>

          {/* Coupon */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-3">Coupon</h2>
            <div className="flex gap-3">
              <input
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                placeholder="Enter coupon"
                className="flex-1 border rounded-xl px-4 py-3"
              />
              <button
                onClick={applyCoupon}
                className="bg-purple-600 text-white px-6 rounded-xl hover:opacity-90 cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5 sticky top-24 h-fit">
          <h2 className="font-semibold text-lg">Order Summary</h2>

          {cart.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {/* Shipping */}
            <div>
              <p className="font-medium mb-2">Shipping</p>
              {[
                { key: "inside", label: "Inside Dhaka", cost: 70 },
                { key: "outside", label: "Outside Dhaka", cost: 130 },
              ].map(opt => (
                <div
                  key={opt.key}
                  onClick={() => setShipping(opt.key as any)}
                  className={`cursor-pointer p-3 rounded-xl border flex justify-between mb-2
                    ${shipping === opt.key
                      ? "border-purple-600 bg-purple-50"
                      : "hover:border-gray-400"}`}
                >
                  <span>{opt.label}</span>
                  <span>৳{opt.cost}</span>
                </div>
              ))}
            </div>

            {/* Payment */}
            <div>
              <p className="font-medium mb-2">Payment Method</p>
              {[
                { key: "cod", label: "Cash on Delivery" },
                { key: "card", label: "Bank Card" },
              ].map(opt => (
                <div
                  key={opt.key}
                  onClick={() => setPayment(opt.key as any)}
                  className={`cursor-pointer p-3 rounded-xl border mb-2
                    ${payment === opt.key
                      ? "border-green-600 bg-green-50"
                      : "hover:border-gray-400"}`}
                >
                  {opt.label}
                </div>
              ))}
            </div>

            {/* Card Inputs */}
            {payment === "card" && (
              <div className="space-y-3 animate-fadeIn">
                <input placeholder="Card Number" className="w-full border rounded-xl px-4 py-3" />
                <input placeholder="Card Holder Name" className="w-full border rounded-xl px-4 py-3" />
                <div className="flex gap-3">
                  <input placeholder="MM/YY" className="w-1/2 border rounded-xl px-4 py-3" />
                  <input placeholder="CVC" className="w-1/2 border rounded-xl px-4 py-3" />
                </div>
              </div>
            )}

            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-purple-600">৳{total.toFixed(2)}</span>
            </div>

            <button className="cursor-pointer w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl text-lg hover:opacity-90">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
