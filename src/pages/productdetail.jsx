import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import datas from '../data'; // Assuming the products data is here
import Footer from '../components/Footer';

function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const selectedProduct = datas.find(p => p.id === parseInt(productId));
    setProduct(selectedProduct);

    const related = datas
      .filter(p => p.category === selectedProduct?.category && p.id !== selectedProduct?.id)
      .slice(0, 5);
    setRelatedProducts(related);
  }, [productId]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!product) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-white pt-8">

      {/* Main Product Detail Section */}
      <div className="flex flex-col lg:flex-row px-6 gap-8">
        {/* Left: Product Image */}
        <div className="lg:w-1/2 flex flex-col items-center h-90">
          <img src={product.image} alt={product.title} className="w-full max-w-md h-full rounded cursor-pointer" />
        </div>

        {/* Right: Product Info */}
        <div className="lg:w-1/2 space-y-4 pt-24">
          <h1 className="text-3xl font-semibold text-gray-900">{product.title}</h1>

          <p className="text-2xl font-bold text-black">₹{product.price}</p>

          <p className="text-gray-600">
            {product.description}
          </p>

          {/* Size Selector */}
          <div>
            <p className="text-sm font-medium text-black mb-2">Select Size</p>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button
                  key={size}
                  className="border border-gray-300 px-4 py-1 rounded hover:bg-black hover:text-white transition text-sm"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button className="mt-4 bg-black text-white px-6 py-2 rounded hover:opacity-90 transition">
            ADD TO CART
          </button>

          {/* Highlights */}
          <div className="mt-6 text-sm text-gray-600 space-y-1">
            <p>✓ 100% Original product.</p>
            <p>✓ Cash on delivery is available on this product.</p>
            <p>✓ Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="px-6 mt-10 ">
        <div className="border-b border-gray-300 flex gap-4 text-sm font-medium mb-4">
          <div className="border-b-2 border-black pb-1">Description</div>
          <div className="text-gray-400">Reviews ({product.rating?.count || 0})</div>
        </div>
        <p className="text-gray-700  leading-relaxed text-base">
        An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
        E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
        </p>
      </div>

      {/* Related Products */}
      <div className="px-6 mt-12">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 inline-block">RELATED PRODUCTS</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {relatedProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              className="cursor-pointer border rounded-lg hover:shadow transition p-4"
            >
              <img
                src={p.image}
                alt={p.title}
                className="h-40 object-contain mx-auto mb-2"
              />
              <h3 className="text-sm font-medium text-gray-900">{p.title}</h3>
              <p className="text-sm text-black">${p.price}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ProductDetailPage;
