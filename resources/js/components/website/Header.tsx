import React, { useState } from 'react';
import { FaShoppingCart, FaUser, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { isLoggedIn } from '@/api/auth.api';



const Categories= ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Toys'];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {cart, toggleCart } = useCart();

  return (
    <>
      {/*===================== HEADER =====================*/}
      <header className='bg-white sticky top-0 px-5 left-0 right-0 bottom-0 z-50'>
         {/* Top Bar */}
         <div className='max-w-7xl mx-auto flex justify-between items-center py-4'>
          {/* Logo */}
          <div className='text-2xl font-bold text-purple-600'>
            <Link to="/">ShopMate</Link>
          </div>
          {/* search (desktop only)*/}
          <div className='hidden md:flex flex-1 mx-6 justify-center'>
            <input 
              type="text" 
              placeholder='Search products...'
              className='w-5/12 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none'
            />
            <button className='bg-purple-600 text-white px-6 rounded-r-full hover:bg-purple-700'>
              search
            </button>
          </div>
          {/* Icons (desktop)*/}
          <div className='hidden md:flex gap-4 items-center' >
            <FaHeart className='text-xl cursor-pointer hover:text-purple-600'/>
            <div className='relative cursor-pointer' onClick={toggleCart}>
              <FaShoppingCart className='text-xl hover:text-purple-600'/>
              {cart.length > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full'>
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </div>
            <Link to={isLoggedIn() ? '/dashboard' : '/login'}>
              <FaUser className='text-xl cursor-pointer hover:text-purple-600'/>
            </Link>
            
          </div>
          {/* Mobile Menu Button */}

          <button 
            className='md:hidden text-2xl'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
         </div>

         {/*------------Category bar-------- */}
         <div className='hidden md:block border-t border-b'>
          <div className='max-w-7xl mx-auto flex gap-6 px-4 py-3 text-lg font-medium overflow-x-auto justify-center'>
            {Categories.map((cat) => (
              <a 
                key={cat}
                href="#"
                className='whitespace-nowrap  hover:text-purple-600'  
              >
                {cat}
              </a>
            ))}
          </div>
         </div>
 
         {/* Mobile Menu */}

          {menuOpen && (
            <>
            {/* ================= OVERLAY ================= */}
           <div
              className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
                menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
              onClick={() => setMenuOpen(false)}
            ></div>
            <div
              className={`fixed top-0 left-0 h-full w-[75%] max-w-sm bg-white z-50 transform transition-transform duration-300
                ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
              `}
            >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold text-purple-600">Menu</h2>
              <button onClick={() => setMenuOpen(false)}>
                <FaTimes />
              </button>
            </div>
          
              <div className='md:hidden bg-white p-4 shadow space-y-4'>
                {/* Search */}
                <div className='flex'>
                  <input 
                    type='text'
                    placeholder='Search products...'
                    className='w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none'
                  />
                  <button className='bg-purple-600 text-white px-6 rounded-r-full'>
                    Search
                  </button>
                </div>
                {/* Mobile categories (slide) */}
                <div className=' py-2 space-y-2'>
                  <h3 className="text-sm font-semibold text-gray-500 px-4">Categories</h3>
                  <ul className="mt-2 space-y-2">
                  {Categories.map((cat) => (
                    <li key={cat} className="px-4 py-2 hover:bg-purple-100 rounded-md">
                      {cat}
                    </li>
                  ))}
                  </ul>
                </div>
              </div>
            </div>
            </>
          )}
      </header>
      {/*===================== HEADER END =====================*/}
      {/* -------mobile bottom bar------ */}
      <div className='fixed bottom-0 left-0 right-0 bg-white border-t shadow md:hidden z-50 '>
        <div className='flex justify-around items-center py-3 text-xl'>
          <FaHeart className='cursor-pointer hover:text-purple-600'/>
          <div className='relative cursor-pointer' onClick={toggleCart}>
              <FaShoppingCart className='text-xl hover:text-purple-600'/>
              {cart.length > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full'>
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </div>
          {/* <FaShoppingCart className='cursor-pointer hover:text-purple-600'/> */}
          <Link to='/dashboard'>
            <FaUser className='cursor-pointer hover:text-purple-600'/>
          </Link>
          
        </div>
      </div>
      
    </>
   
  );
};

export default Header;
