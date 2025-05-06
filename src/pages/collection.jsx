import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();

        // Remove the last product from the list
        const productsWithoutLast = data.slice(0, -1); // This removes the last item
        setProducts(productsWithoutLast);
      } catch (error) {
        setError(error.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="w-full max-w-screen-xl mx-auto px-4 py-10 font-sans">
        {/* Header row */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-normal tracking-wide">
            ALL <span className="font-bold">COLLECTIONS</span>
            <span className="inline-block align-middle ml-3 w-16 border-b-2 border-gray-200"></span>
          </h2>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 pb-4">
          {products.map(product => (
            <div key={product.id} className="flex flex-col">
              <div className="w-full h-[250px] bg-gray-100 flex items-center justify-center mb-4 overflow-hidden rounded">
                <img
                  src={product.images[0] || 'https://via.placeholder.com/250'}
                  alt={product.title || 'Product image'}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-base font-medium text-gray-900 mb-1 leading-tight text-left">
                {product.title}
              </div>
              <div className="text-lg font-semibold text-gray-800 text-left">
                ${product.price}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductGrid;
