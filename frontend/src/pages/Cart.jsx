// import { useCart } from '../context/CartContext';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';

// const Cart = () => {
//   const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
//   const navigate = useNavigate();

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
//         <div className="text-8xl mb-6">🛒</div>
//         <h2 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty!</h2>
//         <p className="text-gray-500 mb-6">Add some delicious items to your cart</p>
//         <Link to="/menu"
//           className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-90">
//           Browse Menu
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//             <FaShoppingCart className="text-primary" /> Your Cart
//           </h1>
//           <button
//             onClick={clearCart}
//             className="text-red-500 text-sm font-medium hover:underline"
//           >
//             Clear All
//           </button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* CART ITEMS */}
//           <div className="lg:col-span-2 space-y-4">
//             {cartItems.map(item => (
//               <div key={item._id}
//                 className="bg-white rounded-2xl shadow p-4 flex gap-4 items-center">
//                 <img
//                   src={item.image || 'https://via.placeholder.com/80?text=Food'}
//                   alt={item.name}
//                   className="w-20 h-20 object-cover rounded-xl"
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-bold text-gray-800">{item.name}</h3>
//                   <p className="text-primary font-semibold">Rs. {item.price}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                     className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
//                   >
//                     <FaMinus className="text-xs" />
//                   </button>
//                   <span className="font-bold w-6 text-center">{item.quantity}</span>
//                   <button
//                     onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                     className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
//                   >
//                     <FaPlus className="text-xs" />
//                   </button>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-bold text-gray-800">
//                     Rs. {item.price * item.quantity}
//                   </p>
//                   <button
//                     onClick={() => removeFromCart(item._id)}
//                     className="text-red-400 hover:text-red-600 mt-1"
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ORDER SUMMARY */}
//           <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-24">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
//             <div className="space-y-3 mb-4">
//               <div className="flex justify-between text-gray-600">
//                 <span>Subtotal</span>
//                 <span>Rs. {totalPrice}</span>
//               </div>
//               <div className="flex justify-between text-gray-600">
//                 <span>Delivery Fee</span>
//                 <span className="text-green-500">Free</span>
//               </div>
//               <div className="border-t pt-3 flex justify-between font-bold text-lg">
//                 <span>Total</span>
//                 <span className="text-primary">Rs. {totalPrice}</span>
//               </div>
//             </div>
//             <button
//               onClick={() => navigate('/checkout')}
//               className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
//             >
//               Proceed to Checkout →
//             </button>
//             <Link to="/menu"
//               className="block text-center text-gray-500 mt-3 text-sm hover:text-primary">
//               ← Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty!</h2>
        <p className="text-gray-500 mb-6">Add some delicious items to your cart</p>
        <Link to="/menu"
          className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-90">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FaShoppingCart className="text-primary" /> Your Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-red-500 text-sm font-medium hover:underline"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item._id}
                className="bg-white rounded-2xl shadow p-4 flex gap-4 items-center">
                <img
                  src={item.image || 'https://via.placeholder.com/80?text=Food'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 truncate">{item.name}</h3>
                  <p className="text-primary font-semibold">Rs. {item.price}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span className="font-bold w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-800">
                    Rs. {item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-400 hover:text-red-600 mt-1"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Rs. {totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">Rs. {totalPrice}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Proceed to Checkout →
            </button>
            <Link to="/menu"
              className="block text-center text-gray-500 mt-3 text-sm hover:text-primary">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;