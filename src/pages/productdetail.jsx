import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import datas from '../data'; // Your local product data
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const selectedProduct = datas.find((p) => p.id === parseInt(productId));
    setProduct(selectedProduct);

    const related = datas
      .filter((p) => p.category === selectedProduct?.category && p.id !== selectedProduct?.id)
      .slice(0, 5);
    setRelatedProducts(related);
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size!');
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      quantity: 1,
    });

    toast.success('Added to cart!');
  };

  if (!product) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-white pt-8">
      {/* Product Detail Section */}
      <div className="flex flex-col lg:flex-row px-6 gap-8">
        {/* Image */}
        <div className="lg:w-1/2 flex justify-center items-start">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-md h-full rounded shadow-sm object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 space-y-4 pt-24">
          <h1 className="text-3xl font-semibold text-gray-900">{product.title}</h1>
          <p className="text-2xl font-bold text-black">₹{product.price}</p>
          <p className="text-gray-600">{product.description}</p>

          {/* Size Selection */}
          <div>
            <p className="text-sm font-medium text-black mb-2">Select Size</p>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-1 rounded text-sm border transition ${
                    selectedSize === size
                      ? 'border-red-500 bg-red-100'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-black text-white px-6 py-2 rounded hover:opacity-90 transition"
          >
            ADD TO CART
          </button>

          {/* Highlights */}
          <div className="mt-6 text-sm text-gray-600 space-y-1">
            <p>✓ 100% Original product.</p>
            <p>✓ Cash on delivery available.</p>
            <p>✓ 7-day easy return and exchange.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="px-6 mt-10">
        <div className="border-b border-gray-300 flex gap-4 text-sm font-medium mb-4">
          <div className="border-b-2 border-black pb-1">Description</div>
          <div className="text-gray-400">Reviews ({product.rating?.count || 0})</div>
        </div>
        <p className="text-gray-700 leading-relaxed text-base">
          {product.longDescription ||
            `An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It typically showcases items with detailed descriptions, images, pricing, and variations like sizes or colors.`}
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
              <img src={p.image} alt={p.title} className="h-40 object-contain mx-auto mb-2" />
              <h3 className="text-sm font-medium text-gray-900">{p.title}</h3>
              <p className="text-sm text-black">₹{p.price}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetailPage;
