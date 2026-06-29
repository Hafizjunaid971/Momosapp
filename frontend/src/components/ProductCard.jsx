import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group">
      {/* IMAGE */}
      <div className="relative overflow-hidden h-48">
        <img
          src={product.image || 'https://via.placeholder.com/300x200?text=Food'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        {product.isFeatured && (
          <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
            ⭐ Featured
          </span>
        )}
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Not Available</span>
          </div>
        )}
      </div>

      {/* BODY */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
          <span className="text-primary font-bold text-lg">
            Rs. {product.price}
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <button
          onClick={handleAddToCart}
          disabled={!product.isAvailable}
          className="w-full bg-primary text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;