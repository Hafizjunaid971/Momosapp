import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaTrash, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* DRAWER */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-50 z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>

        {/* HEADER */}
        <div className="bg-primary text-white px-5 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FaShoppingBag className="text-xl" />
            <h2 className="text-xl font-bold">Your Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full w-9 h-9 flex items-center justify-center transition"
          >
            <FaTimes className="text-white text-lg" />
          </button>
        </div>

        {/* CART ITEMS */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-7xl mb-4">🛒</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Cart is empty!</h3>
              <p className="text-gray-400 mb-6 text-sm">Add some delicious items</p>
              <button
                onClick={onClose}
                className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-90"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {cartItems.map(item => (
                <div key={item._id} className="bg-white rounded-2xl shadow-sm p-4 mb-3 flex gap-3 items-center">
                  {/* IMAGE */}
                  <img
                    src={item.image || 'https://via.placeholder.com/80'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                  />

                  {/* INFO */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 text-sm truncate">{item.name}</h4>
                    <p className="text-primary font-bold text-sm mt-1">Rs. {item.price}</p>
                  </div>

                  {/* QUANTITY + DELETE */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-400 hover:text-red-600 p-1"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition"
                      >
                        <FaMinus className="text-xs text-gray-600" />
                      </button>
                      <span className="w-7 text-center font-bold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition"
                      >
                        <FaPlus className="text-xs text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* ADD MORE ITEMS */}
              <button
                onClick={onClose}
                className="w-full border-2 border-dashed border-primary text-primary py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition mt-2"
              >
                + Add more items
              </button>

              {/* POPULAR SECTION */}
              <div className="mt-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-orange-500 text-lg">🔥</span>
                  <h3 className="font-bold text-gray-700">Popular with your order</h3>
                </div>
                <p className="text-gray-400 text-sm">Browse our menu for more!</p>
              </div>
            </>
          )}
        </div>

        {/* FOOTER — CHECKOUT */}
        {cartItems.length > 0 && (
          <div className="bg-white border-t px-4 py-4 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 font-medium">Total</span>
              <span className="text-xl font-bold text-gray-800">Rs. {totalPrice}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;