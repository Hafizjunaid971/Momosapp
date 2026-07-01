import { useState, useEffect } from 'react';
import API from '../../utils/api';
import { toast } from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', image: '' });
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const resetForm = () => {
    setFormData({ name: '', image: '' });
    setEditId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (cat) => {
    setFormData({ name: cat.name, image: cat.image });
    setEditId(cat._id);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/categories/${editId}`, formData);
        toast.success('Category updated!');
      } else {
        await API.post('/categories', formData);
        toast.success('Category added!');
      }
      setShowModal(false);
      resetForm();
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await API.delete(`/categories/${id}`);
      toast.success('Category deleted!');
      fetchCategories();
    } catch (error) {
      toast.error('Delete failed — products may be using this category');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Manage Categories 🏷️</h1>
          <button
            onClick={openAddModal}
            className="bg-primary text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90"
          >
            <FaPlus /> Add Category
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-5xl animate-spin inline-block">⏳</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(cat => (
              <div key={cat._id} className="bg-white rounded-2xl shadow p-4 text-center">
                <img
                  src={cat.image || 'https://via.placeholder.com/100?text=🍽️'}
                  alt={cat.name}
                  className="w-16 h-16 object-cover rounded-full mx-auto mb-3"
                />
                <h3 className="font-semibold text-gray-700 mb-3">{cat.name}</h3>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200"
                  >
                    <FaEdit className="text-sm" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))}

            {categories.length === 0 && (
              <p className="text-center text-gray-400 py-10 col-span-4">
                No categories added yet
              </p>
            )}
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editId ? 'Edit Category' : 'Add Category'}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <FaTimes className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text" placeholder="Category Name (e.g. Burgers)" required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text" placeholder="Image URL"
                value={formData.image}
                onChange={e => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-xl mx-auto"
                  onError={e => e.target.style.display = 'none'}
                />
              )}
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90"
              >
                {editId ? 'Update Category' : 'Add Category'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;