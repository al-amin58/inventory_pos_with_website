import React from 'react';
import ProductCard from './ProductCard';

const dailyDeals = [
  { name: 'Leather Bag', price: '$69.99', img: '/images/products/bag.jpg', rating: 4, badge: 'Deal' },
  { name: 'Sneakers', price: '$89.99', img: '/images/products/sneakers.jpg', rating: 5, badge: 'Deal' },
  { name: 'Sunglasses', price: '$29.99', img: '/images/products/sunglasses.jpg', rating: 4 },
  { name: 'Sneakers', price: '$89.99', img: '/images/products/sneakers.jpg', rating: 5, badge: 'Deal' },
];

const DailyDeals: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-yellow-100 to-yellow-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-yellow-800">Deal of the Day</h2>
        <div className="flex flex-col md:flex-row gap-5 overflow-x-auto">
          {dailyDeals.map((product) => (
            <div key={product.name} className="flex-shrink-0 w-full md:w-1/5">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyDeals;
