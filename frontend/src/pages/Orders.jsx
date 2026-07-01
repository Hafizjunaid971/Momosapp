import { useState, useEffect } from 'react';
import API from '../utils/api';
import { Link } from 'react-router-dom';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  preparing: 'bg-orange-100 text-orange-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700'
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders/myorders');
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl animate-spin inline-block">⏳</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-8xl mb-6">📦</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">No orders yet!</h2>
        <Link to="/menu" className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-90">
          Order Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders 📦</h1>

        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-2xl shadow p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm text-gray-400">Order ID</p>
                  <p className="font-mono text-sm font-semibold">#{order._id.slice(-8)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>

              <div className="border-t border-b py-3 my-3 space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name} × {item.quantity}</span>
                    <span className="font-medium">Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  📍 {order.deliveryAddress}
                </p>
                <p className="font-bold text-primary text-lg">
                  Rs. {order.totalAmount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;