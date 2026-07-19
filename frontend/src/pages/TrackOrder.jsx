import { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import { toast } from 'react-hot-toast';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  preparing: 'bg-orange-100 text-orange-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700'
};

const TrackOrder = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!phone && !email) {
      toast.error('Enter phone number or email');
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await API.post('/orders/guest/track-by-phone', {
        phone: phone || undefined,
        email: email || undefined
      });
      setOrders(Array.isArray(response.data) ? response.data : [response.data]);
      toast.success('Orders found! ✅');
    } catch (error) {
      toast.error(error.response?.data?.message || 'No orders found');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Track Your Orders 📍</h1>
        <p className="text-gray-600 mb-6">Enter your phone number or email to see all your orders</p>

        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow p-6 space-y-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="text"
              placeholder="03XX-XXXXXXX"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">OR Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Track Orders 🔍'}
          </button>
        </form>

        {searched && orders.length === 0 && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-700 font-medium">No orders found. Check your phone or email.</p>
          </div>
        )}

        {orders.length > 0 && (
          <div className="space-y-4">
            <p className="text-gray-600 font-medium">Found {orders.length} order{orders.length !== 1 ? 's' : ''}:</p>
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-2xl shadow p-6 space-y-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm text-gray-400">Order ID</p>
                    <p className="font-mono text-lg font-semibold">#{order._id.slice(-8)}</p>
                  </div>
                  <span className={`px-3 py-2 rounded-full text-sm font-semibold capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                <div className="border-t border-b py-4 my-4">
                  <h3 className="font-semibold text-gray-700 mb-3">Order Items:</h3>
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.name} × {item.quantity}</span>
                        <span className="font-medium">Rs. {item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Address:</span>
                    <span className="font-medium">{order.deliveryAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{order.phone}</span>
                  </div>
                  {order.guestEmail && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{order.guestEmail}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium capitalize">{order.paymentMethod}</span>
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-primary">Rs. {order.totalAmount}</span>
                </div>

                <div className="text-center text-sm text-gray-500">
                  <p>Ordered on: {new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/menu" className="text-primary font-medium hover:underline">
            ← Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
