import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API from '../utils/api';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    deliveryAddress: '', phone: '', paymentMethod: 'cash'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const items = cartItems.map(item => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }));

      await API.post('/orders', {
        items,
        totalAmount: totalPrice,
        deliveryAddress: formData.deliveryAddress,
        phone: formData.phone,
        paymentMethod: formData.paymentMethod
      });

      clearCart();
      toast.success('Order placed successfully! 🎉');
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout 📋</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Delivery Address</label>
            <textarea
              required
              rows={3}
              placeholder="House #, Street, Area, City..."
              value={formData.deliveryAddress}
              onChange={e => setFormData({ ...formData, deliveryAddress: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="text"
              required
              placeholder="03XX-XXXXXXX"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
            <div className="grid grid-cols-3 gap-3">
              {['cash', 'jazzcash', 'easypaisa'].map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: method })}
                  className={`py-3 rounded-xl border font-medium capitalize transition ${
                    formData.paymentMethod === method
                      ? 'bg-primary text-white border-primary'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {method === 'cash' ? '💵 Cash' : method}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span className="text-primary">Rs. {totalPrice}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Placing Order...' : 'Place Order ✅'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;