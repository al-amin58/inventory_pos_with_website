import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/components/website/CartContext";
import { FaStar, FaHeart, FaFacebookF, FaWhatsapp, FaTwitter } from "react-icons/fa";

const SingleProduct: React.FC = () => {
  const { id } = useParams();
  const { addToCart } = useCart()!;

  const product = {
    id: Number(id),
    name: "Premium Wireless Headphone",
    category: "Electronics",
    specialPrice: 2999,
    regularPrice: 3499,
    rating: 4,
    reviews: 23,
    overview:
      "High-quality wireless headphone with deep bass, noise cancellation, and long battery life.",
    images: [
      "https://via.placeholder.com/500",
      "https://via.placeholder.com/500/111",
      "https://via.placeholder.com/500/222",
      "https://via.placeholder.com/500/333",
      "https://via.placeholder.com/500/444",
    ],
    stock: 12,
    description:
      "High-quality wireless headphone with noise cancellation and long battery life.",
  };

  const [activeImg, setActiveImg] = useState(product.images[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"specs" | "details" | "reviews">("specs");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState({ name: "", comment: "" });

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.specialPrice,
      img: activeImg,
      quantity: qty,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-purple-600">Home</Link>
        <span className="mx-2">→</span>
        <span className="hover:text-purple-600">{product.category}</span>
        <span className="mx-2">→</span>
        <span className="text-gray-700 font-medium">{product.name}</span>
      </nav>

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <div>
          <div className="relative group">
            <img
              src={activeImg}
              className="w-full rounded-2xl shadow-lg transform transition duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setActiveImg(img)}
                className={`w-20 h-20 rounded-xl cursor-pointer border-2 transition ${
                  activeImg === img ? "border-purple-600" : "border-gray-200"
                } hover:border-purple-400`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-5 sticky top-24 h-fit shadow p-5 rounded">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Reviews */}
          <div className="flex items-center gap-2">
            {[1,2,3,4,5].map(i => (
              <FaStar
                key={i}
                className={`text-sm ${i <= product.rating ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-yellow-600 text-sm">({product.reviews} Reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-purple-600">৳{product.specialPrice}</p>
            <p className="text-gray-400 line-through">৳{product.regularPrice}</p>
          </div>

          {/* Quick Overview */}
          <p className="text-gray-600">{product.overview}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-2">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 border rounded-xl hover:bg-gray-100 transition cursor-pointer">−</button>
            <span className="text-lg font-semibold">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="w-10 h-10 border rounded-xl hover:bg-gray-100 transition cursor-pointer">+</button>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r bg-purple-600  text-white py-4 cursor-pointer rounded-xl text-lg shadow-lg hover:opacity-90 transition"
            >
              Add to Cart
            </button>
            <button className="w-12 h-12 cursor-pointer border rounded-lg flex items-center justify-center text-gray-600 hover:bg-red-50 transition">
              <FaHeart />
            </button>
          </div>

          {/* Payment & Shipping Info */}
          <div className="text-sm text-gray-600 mt-4 space-y-1 bg-gray-50 p-4 rounded-lg shadow-sm">
           
            <p>💳 Payment: Cash / Card</p>
            <p>🚚 Shipping: Dhaka ৳70 | Outside ৳130</p>
            <p>📋 Order Procedure: Place → Confirm → Deliver</p>
          </div>

          {/* Social Share */}
          <div className="flex gap-4 mt-4 text-xl text-gray-500">
            <h4 className="text-black">Share: </h4>
            <FaFacebookF className="hover:text-blue-600 transition cursor-pointer"/>
            <FaWhatsapp className="hover:text-green-500 transition cursor-pointer"/>
            <FaTwitter className="hover:text-blue-400 transition cursor-pointer"/>
          </div>
        </div>
      </div>

      {/* Bottom Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 ">
        <div className="md:col-span-2 ">
          {/* Tabs */}
          <div className="flex gap-6 border-b mb-6 ">
            {["specs","details","reviews"].map(t => (
              <button
                key={t}
                onClick={() => setTab(t as any)}
                className={`pb-2 font-medium cursor-pointer shadow p-5 rounded ${tab === t ? "border-b-2 border-purple-600  text-purple-600" : "text-gray-500"}`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {tab === "specs" && <p className="text-gray-600 shadow p-5 rounded">Specifications content goes here...</p>}
          {tab === "details" && <p className="text-gray-600 shadow p-5 rounded">Detailed product description and info...</p>}
          {tab === "reviews" && (
            <div className="space-y-4 shadow p-5 rounded">
              {/* Star Rating */}
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <FaStar
                    key={i}
                    onClick={() => setRating(i)}
                    className={`cursor-pointer ${i <= rating ? "text-yellow-400" : "text-gray-300"} transition`}
                  />
                ))}
              </div>

              <input
                placeholder="Your Name"
                className="w-full border px-4 py-2 rounded"
                onChange={e => setReview({ ...review, name: e.target.value })}
              />
              <textarea
                placeholder="Your Review"
                className="w-full border px-4 py-2 rounded h-24"
                onChange={e => setReview({ ...review, comment: e.target.value })}
              />
              <button className="bg-purple-600 text-white px-6 py-2 rounded hover:opacity-90 transition cursor-pointer">
                Submit Review
              </button>
            </div>
          )}
        </div>

        {/* Similar Products */}
        <div className="shadow p-5 rounded">
          <h3 className="font-semibold text-lg mb-4 ">Similar Products</h3>
          <div className="flex flex-col gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="flex gap-3 border p-3 rounded-lg hover:shadow-md transition cursor-pointer">
                <img src={product.images[i % product.images.length]} className="w-16 h-16 rounded-lg" />
                <div>
                  <p className="text-sm font-medium">Product Name</p>
                  <p className="text-purple-600 text-sm">৳1999</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      <h2 className="text-xl font-semibold mt-16 mb-4 shadow p-5 rounded">Related Products</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[1,2,3,4,5,6,7,8].map(i => (
          <div key={i} className="min-w-[220px] border rounded p-3 shadow hover:shadow-lg transition cursor-pointer">
            <img src={product.images[i % product.images.length]} className="h-40 w-full object-cover rounded-lg" />
            <p className="mt-2 font-medium">Product Name</p>
            <p className="text-purple-600">৳2499</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleProduct;
