import React, { useEffect, useState } from 'react';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.openproduct.io/v1/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-4 border-t-4 border-gray-200 h-12 w-12 rounded-full animate-spin border-t-black"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  return (
    <div>
      <div className="w-full max-w-screen-xl mx-auto px-4 py-10 font-sans">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-normal tracking-wide">
            PREMIUM <span className="font-bold">COLLECTIONS</span>
            <span className="inline-block align-middle ml-3 w-16 border-b-2 border-gray-200"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 pb-4">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col">
              <div className="w-full h-[250px] bg-gray-100 flex items-center justify-center mb-4 overflow-hidden rounded">
                <img
                  src={product.image || 'https://via.placeholder.com/250'}
                  alt={product.title || 'Product image'}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-base font-medium text-gray-900 mb-1 leading-tight text-left">
                {product.name}
              </div>
              <div className="text-lg font-semibold text-gray-800 text-left">
                ${product.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
