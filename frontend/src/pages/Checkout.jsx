import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    deliveryAddress: '', 
    phone: '', 
    paymentMethod: 'cash',
    guestEmail: ''
  });
  const [loading, setLoading] = useState(false);

  // Pre-fill phone if user has one
  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, phone: user.phone || '' }));
    }
  }, [user]);

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

      const orderData = {
        items,
        totalAmount: totalPrice,
        deliveryAddress: formData.deliveryAddress,
        phone: formData.phone,
        paymentMethod: formData.paymentMethod
      };

      // Add guest email if not logged in
      if (!user) {
        if (!formData.guestEmail) {
          toast.error('Please enter your email to track orders');
          setLoading(false);
          return;
        }
        orderData.guestEmail = formData.guestEmail;
      }

      await API.post('/orders', orderData);
      
      clearCart();
      toast.success('Order placed successfully! 🎉');
      
      // If guest user, show tracking info
      if (!user) {
        toast.success(`Track using email or phone on 'Track Order' page!`);
        navigate('/track-order');
      } else {
        navigate('/orders');
      }
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

        {user && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
            <p className="text-blue-700">✅ Logged in as <strong>{user.name}</strong></p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 space-y-4">
          {!user && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                required={!user}
                placeholder="your@email.com"
                value={formData.guestEmail}
                onChange={e => setFormData({ ...formData, guestEmail: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-gray-500 mt-1">💡 Use this email to track your orders</p>
            </div>
          )}

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