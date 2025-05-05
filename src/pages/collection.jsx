import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace with your API endpoint if needed
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setProducts(data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans">
      {/* Header row */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-normal tracking-wide">
          ALL <span className="font-bold">COLLECTIONS</span>
          <span className="inline-block align-middle ml-3 w-16 border-b-2 border-gray-200"></span>
        </h2>
      </div>
      {/* Product grid */}
      {loading ? (
        <div className="text-center py-20 text-lg">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map(product => (
            <div key={product.id} className="flex flex-col">
              <div className="w-full aspect-square bg-gray-100 flex items-center justify-center mb-4 overflow-hidden rounded">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain h-56"
                />
              </div>
              <div className="text-base font-medium text-gray-900 mb-1 leading-tight text-left">{product.title}</div>
              <div className="text-lg font-semibold text-gray-800 text-left">${product.price}</div>
            </div>
          ))}
        </div>
      )}
      <Footer/>
    </div>
    
  );
};

export default ProductGrid;
