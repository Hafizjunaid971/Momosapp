import { useState, useEffect } from 'react';
import API from '../../utils/api';
import { toast } from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', image: '', category: '', isFeatured: false
  });

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        API.get('/products'),
        API.get('/categories')
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', image: '', category: '', isFeatured: false });
    setEditId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category?._id || '',
      isFeatured: product.isFeatured
    });
    setEditId(product._id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/products/${editId}`, formData);
        toast.success('Product updated!');
      } else {
        await API.post('/products', formData);
        toast.success('Product added!');
      }
      setShowModal(false);
      resetForm();
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      toast.success('Product deleted!');
      fetchData();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Manage Products 📦</h1>
          <button
            onClick={openAddModal}
            className="bg-primary text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90"
          >
            <FaPlus /> Add Product
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600">Image</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Category</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Price</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="border-t">
                  <td className="p-4">
                    <img
                      src={product.image || 'https://via.placeholder.com/50'}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-800">{product.name}</td>
                  <td className="p-4 text-gray-500">{product.category?.name || '-'}</td>
                  <td className="p-4 font-semibold text-primary">Rs. {product.price}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <p className="text-center text-gray-400 py-10">No products added yet</p>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editId ? 'Edit Product' : 'Add Product'}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <FaTimes className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text" placeholder="Product Name" required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder="Description" rows={2}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="number" placeholder="Price" required
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text" placeholder="Image URL"
                value={formData.image}
                onChange={e => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <select
                required
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                />
                <span className="text-gray-600 text-sm">Mark as Featured</span>
              </label>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90"
              >
                {editId ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;