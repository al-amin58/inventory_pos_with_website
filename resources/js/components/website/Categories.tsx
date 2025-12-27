import React from 'react';

const categories = [
  { name: 'Men', img: '/images/categories/men.jpg' },
  { name: 'Women', img: '/images/categories/women.jpg' },
  { name: 'Electronics', img: '/images/categories/electronics.jpg' },
  { name: 'Accessories', img: '/images/categories/accessories.jpg' },
  { name: 'Babys', img: '/images/categories/accessories.jpg' },

];

const Categories: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <div key={cat.name} className="relative group cursor-pointer overflow-hidden rounded-lg">
            <img src={cat.img} alt={cat.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white font-bold text-lg">{cat.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
