import React from 'react';
import ProductCard from '@/components/website/ProductCard';
import FilterSidebar from '@/components/website/FilterSidebar';
// import { FaFilter } from 'react-icons/fa';

const products = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  name: `Premium Product ${i + 1}`,
  price: `$${99 + i * 10}`,
  img: 'https://source.unsplash.com/400x400/?product,fashion',
  rating: 5,
}));

const Shop: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shop</h1>
        <select className="border px-4 py-2 rounded-lg">
          <option>Sort by: Latest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Sidebar */}
        <aside className="hidden md:block bg-white p-5 rounded-xl shadow">
          <FilterSidebar />
        </aside>

        {/* Products */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Shop;
