import { useState, useEffect } from 'react';
import API from '../../utils/api';
import { toast } from 'react-hot-toast';

const statusOptions = ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  preparing: 'bg-orange-100 text-orange-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700'
};

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await API.get('/orders');
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/orders/${id}/status`, { status });
      toast.success('Order status updated!');
      fetchOrders();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl animate-spin inline-block">⏳</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Orders 📦</h1>

        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-2xl shadow p-5">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-3">
                <div>
                  <p className="font-mono text-sm font-semibold text-gray-700">
                    #{order._id.slice(-8)}
                  </p>
                  <p className="text-sm text-gray-500">
                    👤 {order.user?.name} · 📞 {order.user?.phone}
                  </p>
                </div>
                <select
                  value={order.status}
                  onChange={e => handleStatusChange(order._id, e.target.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold capitalize border-0 ${statusColors[order.status]}`}
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="border-t border-b py-3 my-3 space-y-1">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name} × {item.quantity}</span>
                    <span className="font-medium">Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">📍 {order.deliveryAddress}</p>
                <p className="font-bold text-primary text-lg">Rs. {order.totalAmount}</p>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <p className="text-center text-gray-400 py-10">No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;