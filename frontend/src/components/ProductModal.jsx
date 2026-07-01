import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { FaTimes, FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
import { useState } from 'react';

const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} × ${product.name} added to cart!`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-end md:items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:max-w-2xl md:rounded-2xl rounded-t-3xl flex flex-col"
        style={{ maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 transition"
        >
          <FaTimes className="text-gray-600 text-lg" />
        </button>

        {/* SCROLLABLE CONTENT */}
        <div className="overflow-y-auto flex-1">
          {/* IMAGE */}
          <div className="relative h-64 md:h-80 flex-shrink-0">
            <img
              src={product.image || 'https://via.placeholder.com/600x400?text=Food'}
              alt={product.name}
              className="w-full h-full object-cover md:rounded-t-2xl rounded-t-3xl"
            />
            {product.isFeatured && (
              <span className="absolute top-4 left-4 bg-primary text-white text-sm px-3 py-1 rounded-full">
                ⭐ Featured
              </span>
            )}
          </div>

          {/* BODY */}
          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-2xl font-bold text-gray-800 flex-1 pr-4">
                {product.name}
              </h2>
              <span className="text-primary font-bold text-2xl flex-shrink-0">
                Rs. {product.price}
              </span>
            </div>

            {product.category?.name && (
              <span className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full mb-4">
                {product.category.name}
              </span>
            )}

            {product.description && (
              <p className="text-gray-600 leading-relaxed mb-4">
                {product.description}
              </p>
            )}

            {/* QUANTITY */}
            {product.isAvailable !== false && (
              <div className="flex items-center justify-between py-3 border-t border-b mb-2">
                <span className="text-gray-700 font-medium">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
                  >
                    <FaMinus className="text-sm" />
                  </button>
                  <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
                  >
                    <FaPlus className="text-sm" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FIXED BOTTOM BUTTON */}
        <div className="p-4 border-t bg-white md:rounded-b-2xl flex-shrink-0">
          {product.isAvailable === false ? (
            <div className="bg-red-50 text-red-600 text-center py-3 rounded-xl font-semibold">
              Currently Unavailable
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition text-lg"
            >
              <FaShoppingCart />
              Add to Cart — Rs. {product.price * quantity}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;