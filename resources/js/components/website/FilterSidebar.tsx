import React from 'react';

const categories = ['All', 'Men', 'Women', 'Electronics', 'Shoes', 'Accessories'];

const FilterSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
        <div>
            <h4 className="font-semibold mb-2">Price Range</h4>
            <input type="range" min="0" max="1000" className="w-full" />
        </div>

        <div>
            <h4 className="font-semibold mb-2">Categories</h4>
            {categories.map(cat => (
            <label key={cat} className="flex items-center gap-2 mb-1">
                <input type="radio" name="category" />
                <span>{cat}</span>
            </label>
            ))}
        </div>
        
        <div>
            <h4 className="font-semibold mb-2">Brands</h4>
            {categories.map(cat => (
            <label key={cat} className="flex items-center gap-2 mb-1">
                <input type="radio" name="category" />
                <span>{cat}</span>
            </label>
            ))}
        </div>

        <div>
            <h4 className="font-semibold mb-2">Rating</h4>
            {[5,4,3].map(r => (
            <label key={r} className="flex items-center gap-2">
                <input type="checkbox" />
                <span>{r} Stars & Up</span>
            </label>
            ))}
        </div>
    </div>
  );
};

export default FilterSidebar;
