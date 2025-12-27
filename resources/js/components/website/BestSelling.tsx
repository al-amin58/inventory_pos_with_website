import React from 'react';
import ProductCard from './ProductCard';

const bestSellingProducts = [
  { name: 'Smartphone X', price: '$499.99', img: '/images/products/phone.jpg', rating: 5, badge: 'Best Seller' },
  { name: 'Gaming Laptop', price: '$999.99', img: '/images/products/laptop.jpg', rating: 5, badge: 'Best Seller' },
  { name: 'Bluetooth Speaker', price: '$59.99', img: '/images/products/speaker.jpg', rating: 4 },
  { name: 'Sneakers', price: '$89.99', img: '/images/products/sneakers.jpg', rating: 5, badge: 'Deal' },
];

const BestSelling: React.FC = () => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Best Selling Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {bestSellingProducts.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSelling;
