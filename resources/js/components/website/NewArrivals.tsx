import React from 'react';
import ProductCard from './ProductCard';

const newArrivals = [
  { name: 'Trendy Jacket', price: '$79.99', img: '/images/products/jacket2.jpg', rating: 5, badge: 'New' },
  { name: 'Casual Shirt', price: '$39.99', img: '/images/products/shirt.jpg', rating: 4, badge: 'New' },
  { name: 'Stylish Watch', price: '$129.99', img: '/images/products/watch2.jpg', rating: 5 },
];

const NewArrivals: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">New Arrivals</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {newArrivals.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
