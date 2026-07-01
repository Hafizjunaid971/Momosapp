import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import { FaBox, FaShoppingBag, FaDollarSign,TbCategory, FaUsers } from 'react-icons/fa';
import { MdCategory } from "react-icons/md";

// Usage
const Dashboard = () => {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/orders');
        const orders = res.data;
        const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        const pending = orders.filter(o => o.status === 'pending').length;
        setStats({ orders: orders.length, revenue, pending });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard 📊</h1>
        <p className="text-gray-500 mb-8">Manage your food delivery business</p>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-xl">
              <FaShoppingBag className="text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">{loading ? '...' : stats.orders}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
            <div className="bg-green-100 text-green-600 p-4 rounded-xl">
              <FaDollarSign className="text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">Rs. {loading ? '...' : stats.revenue}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
            <div className="bg-yellow-100 text-yellow-600 p-4 rounded-xl">
              <FaBox className="text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-800">{loading ? '...' : stats.pending}</p>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/admin/products"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition flex items-center gap-4 group">
            <div className="bg-primary bg-opacity-10 text-primary p-4 rounded-xl group-hover:bg-primary group-hover:text-white transition">
              <FaBox className="text-2xl" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">Manage Products</h3>
              <p className="text-gray-500 text-sm">Add, edit or remove menu items</p>
            </div>
          </Link>

          <Link to="/admin/orders"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition flex items-center gap-4 group">
            <div className="bg-primary bg-opacity-10 text-primary p-4 rounded-xl group-hover:bg-primary group-hover:text-white transition">
              <FaShoppingBag className="text-2xl" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">Manage Orders</h3>
              <p className="text-gray-500 text-sm">View and update order status</p>
            </div>
          </Link>
                  <Link to="/admin/categories"
                      className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition flex items-center gap-4 group">
                      <div className="bg-primary bg-opacity-10 text-primary p-4 rounded-xl group-hover:bg-primary group-hover:text-white transition">
                          <FaBox className="text-2xl" />
                      </div>
                      <div>
                          <h3 className="font-bold text-lg text-gray-800">Manage Categories</h3>
                          <p className="text-gray-500 text-sm">Add, edit or remove categories</p>
                      </div>
                  </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;