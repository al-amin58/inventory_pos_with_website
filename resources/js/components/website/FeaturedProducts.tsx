import React from 'react';
import ProductCard from './ProductCard';

const featuredProducts = [
  { name: 'Stylish Jacket', price: '$49.99', img: '/images/products/jacket.jpg', rating: 5, badge: 'Featured' },
  { name: 'Smart Watch', price: '$99.99', img: '/images/products/watch.jpg', rating: 4 },
  { name: 'Wireless Headphones', price: '$79.99', img: '/images/products/headphones.jpg', rating: 5 },
  { name: 'Sneakers', price: '$89.99', img: '/images/products/sneakers.jpg', rating: 5, badge: 'Deal' },
];

const FeaturedProducts: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        {featuredProducts.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
