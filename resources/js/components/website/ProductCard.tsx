import React, { useState } from 'react';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useCart } from '@/components/website/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

type Product = {
  id: number;
  name: string;
  price: string;
  img: string;
  rating?: number;
  badge?: string;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart()!;
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setWishlist(!wishlist);
    toast.success(
      !wishlist
        ? `${product.name} added to wishlist`
        : `${product.name} removed from wishlist`
    );
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price.replace('$', '')),
      img: product.img,
      quantity: 1,
    });
    navigate('/checkout');
  };

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="relative bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 p-3 sm:p-4">

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white shadow text-purple-600 active:scale-95 transition-all duration-300 opacity-100 scale-100 md:opacity-0 md:scale-90 md:group-hover:opacity-100 md:group-hover:scale-110"
        >
          {wishlist ? <FaHeart /> : <FaRegHeart />}
        </button>

        {/* Image */}
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-40 sm:h-48 object-cover rounded-xl mb-3 transition-transform sm:hover:scale-105"
        />

        {/* Info */}
        <h3 className="font-semibold text-sm sm:text-base text-black line-clamp-2 mb-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-1">
          {Array(product.rating || 5)
            .fill(0)
            .map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-xs sm:text-sm" />
            ))}
        </div>

        <p className="font-bold text-black text-base sm:text-lg mb-3">
          {product.price}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Buy Now */}
          <button
            onClick={handleBuyNow}
            className="w-full py-2 rounded-sm bg-purple-700 text-white font-medium text-sm sm:text-base hover:bg-purple-800 active:scale-95 transition cursor-pointer"
          >
            Buy Now
          </button>

          {/* Add to Cart */}
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart({
                id: product.id,
                name: product.name,
                price: Number(product.price.replace('$', '')),
                img: product.img,
                quantity: 1,
              });
              toast.success(`${product.name} added to cart`);
            }}
            className="w-full py-2 rounded-sm border border-purple-600 text-black font-medium text-sm sm:text-base hover:bg-purple-50 active:scale-95 transition cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
