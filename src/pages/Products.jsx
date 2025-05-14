import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import datas from '../data';
import Footer from '../components/Footer';

function CollectionPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(datas);
  const [loading, setLoading] = useState(false);
  const [openFilter, setOpenFilter] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleFilter = (filter) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearAll = () => {
    setPriceRange({ min: '', max: '' });
    setSelectedSizes([]);
    setSelectedRating('');
    setSelectedCategories([]);
    setQuery('');
  };

  useEffect(() => {
    const delayFilter = setTimeout(() => {
      applyFilters();
    }, 300);
    return () => clearTimeout(delayFilter);
  }, [query, selectedCategories, priceRange, selectedRating, selectedSizes]);

  const applyFilters = () => {
    setLoading(true);
    let filtered = [...datas];

    if (query) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => {
        if (!p.category) return false;
        return selectedCategories.some(
          (cat) => p.category.toLowerCase() === cat.toLowerCase()
        );
      });
    }

    if (priceRange.min) {
      filtered = filtered.filter(
        (p) => p.price >= parseFloat(priceRange.min)
      );
    }

    if (priceRange.max) {
      filtered = filtered.filter(
        (p) => p.price <= parseFloat(priceRange.max)
      );
    }

    if (selectedRating) {
      filtered = filtered.filter((p) => {
        const productRating = parseFloat(p.rating || 0);
        return productRating >= parseFloat(selectedRating);
      });
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) => {
        const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        const simulatedSize = sizes[p.id % sizes.length];
        return selectedSizes.includes(simulatedSize);
      });
    }

    setFilteredProducts(filtered);
    setTimeout(() => setLoading(false), 300);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-full lg:w-64 lg:h-screen lg:overflow-y-auto border-b lg:border-r border-gray-100 bg-white px-4 py-6 sticky top-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={clearAll} className="text-sm text-gray-500 hover:text-black">
            Clear
          </button>
        </div>

        {/* Filters (unchanged structure) */}
        {/* ...Category, Price, Size, Rating filters (unchanged)... */}
        {/* Category Filter */}
        <div className="border-b py-4">
          <button onClick={() => toggleFilter('category')} className="flex justify-between w-full text-base font-medium text-gray-800">
            <span>Category</span>
            <span>{openFilter === 'category' ? '−' : '+'}</span>
          </button>
          {openFilter === 'category' && (
            <div className="mt-3 space-y-2 text-[15px] text-gray-700">
              {['Men', 'Women', 'Kids'].map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="border-b py-4">
          <button onClick={() => toggleFilter('price')} className="flex justify-between w-full text-base font-medium text-gray-800">
            <span>Price</span>
            <span>{openFilter === 'price' ? '−' : '+'}</span>
          </button>
          {openFilter === 'price' && (
            <div className="mt-3 flex flex-col gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
                className="border px-2 py-1 text-sm rounded"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: e.target.value })
                }
                className="border px-2 py-1 text-sm rounded"
              />
            </div>
          )}
        </div>

        {/* Size Filter */}
        <div className="border-b py-4">
          <button onClick={() => toggleFilter('size')} className="flex justify-between w-full text-base font-medium text-gray-800">
            <span>Size &amp; Fit</span>
            <span>{openFilter === 'size' ? '−' : '+'}</span>
          </button>
          {openFilter === 'size' && (
            <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  className={`border rounded py-1 ${selectedSizes.includes(size) ? 'bg-black text-white' : 'border-gray-300 text-gray-700'}`}
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
          <button onClick={() => toggleFilter('rating')} className="flex justify-between w-full text-base font-medium text-gray-800">
            <span>Rating</span>
            <span>{openFilter === 'rating' ? '−' : '+'}</span>
          </button>
          {openFilter === 'rating' && (
            <div className="mt-3 space-y-2 text-[15px] text-gray-700">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={selectedRating === rating.toString()}
                    onChange={() => setSelectedRating(rating.toString())}
                    className="mr-2"
                  />
                  {rating}★ &amp; up
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6">
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <div className="w-full sm:w-3/4 md:w-2/3 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-2 text-gray-400 hover:text-black"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">No products found.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleProductClick(p.id)}
                    className="cursor-pointer border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition duration-300"
                  >
                    <div className="h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="max-h-full object-contain transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-medium text-gray-900 text-base mb-1 line-clamp-2">{p.title}</p>
                      <p className="text-sm text-black mb-1">₹{p.price}</p>
                      <p className="text-xs text-gray-600">Rating: {p.rating || 'N/A'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CollectionPage;
