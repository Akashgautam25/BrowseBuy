import React, { useState } from 'react';

function ProductSearchFilter({ onSearch }) {
  const [query, setQuery] = useState('');
  const [openFilter, setOpenFilter] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleFilter = (filter) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleSearch = () => {
    onSearch({
      query,
      priceRange,
      sizes: selectedSizes,
      rating: selectedRating,
      categories: selectedCategories
    });
  };

  const clearAll = () => {
    setPriceRange({ min: '', max: '' });
    setSelectedSizes([]);
    setSelectedRating('');
    setSelectedCategories([]);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Filters */}
      <div className="w-64 border-r border-gray-200 bg-white">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button 
              onClick={clearAll}
              className="text-gray-600 hover:text-black text-sm"
            >
              Clear All
            </button>
          </div>

          {/* Category Filter */}
          <div className="border-b border-gray-200 py-4">
            <button 
              className="flex items-center justify-between w-full text-left font-medium"
              onClick={() => toggleFilter('category')}
            >
              <span>Category</span>
              <span>{openFilter === 'category' ? '−' : '+'}</span>
            </button>
            {openFilter === 'category' && (
              <div className="mt-3 space-y-2">
                {['Clothing', 'Shoes', 'Accessories', 'Bags'].map(category => (
                  <label key={category} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="mr-2"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="border-b border-gray-200 py-4">
            <button 
              className="flex items-center justify-between w-full text-left font-medium"
              onClick={() => toggleFilter('price')}
            >
              <span>Price</span>
              <span>{openFilter === 'price' ? '−' : '+'}</span>
            </button>
            {openFilter === 'price' && (
              <div className="mt-3">
                <div className="flex gap-2 mb-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Size Filter */}
          <div className="border-b border-gray-200 py-4">
            <button 
              className="flex items-center justify-between w-full text-left font-medium"
              onClick={() => toggleFilter('size')}
            >
              <span>Size & Fit</span>
              <span>{openFilter === 'size' ? '−' : '+'}</span>
            </button>
            {openFilter === 'size' && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button
                    key={size}
                    className={`border ${selectedSizes.includes(size) ? 'bg-black text-white' : 'border-gray-300'} rounded py-1 text-sm`}
                    onClick={() => handleSizeToggle(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div className="py-4">
            <button 
              className="flex items-center justify-between w-full text-left font-medium"
              onClick={() => toggleFilter('rating')}
            >
              <span>Rating</span>
              <span>{openFilter === 'rating' ? '−' : '+'}</span>
            </button>
            {openFilter === 'rating' && (
              <div className="mt-3 space-y-2">
                {[5, 4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating.toString()}
                      onChange={() => setSelectedRating(rating.toString())}
                      className="mr-2"
                    />
                    <span className="text-sm">{rating}★ & up</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-black text-white py-2 rounded mt-4 hover:bg-gray-800 transition duration-200"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        
        <div className="text-gray-500">[ Products will be displayed here... ]</div>
      </div>
    </div>
  );
}

export default ProductSearchFilter;
