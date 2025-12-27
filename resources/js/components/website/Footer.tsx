import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">ShopMate</h3>
          <p>Your one-stop shop for fashion, electronics, and lifestyle products.</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li>
                <Link to="/shop" className="hover:text-white">Shop</Link>
            </li>
            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Categories</a></li>
            <li><a href="#" className="hover:text-white">Deals</a></li>
            <li><a href="#" className="hover:text-white">New Arrivals</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaLinkedinIn className="hover:text-white cursor-pointer" />
          </div>
          <div className="mt-6 text-sm text-gray-400">
            © {new Date().getFullYear()} ShopMate. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
