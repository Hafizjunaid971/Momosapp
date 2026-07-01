import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { FaSearch } from 'react-icons/fa';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ready, setReady] = useState(false);
  const location = useLocation();

  // STEP 1 — Pehle categories load karo
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/categories');
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        // STEP 2 — URL se category set karo
        const params = new URLSearchParams(location.search);
        const cat = params.get('category');
        if (cat) setSelectedCategory(cat);
        setReady(true); // ab products fetch karne ke liye ready
      }
    };
    fetchCategories();
  }, []);

  // STEP 3 — Sirf tab products fetch karo jab ready ho
  useEffect(() => {
    if (!ready) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = '/products?';
        if (selectedCategory) url += `category=${selectedCategory}&`;
        if (search) url += `search=${search}`;
        const res = await API.get(url);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, search, ready]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-red-500 to-orange-400 py-12 px-4 text-white text-center">
        <h1 className="text-4xl font-bold mb-2">Our Menu 🍽️</h1>
        <p className="text-red-100">Choose from our wide variety of delicious items</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* SEARCH */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for food..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* CATEGORIES */}
        <div className="flex gap-3 overflow-x-auto pb-3 mb-8 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-5 py-2 rounded-full font-medium whitespace-nowrap transition ${
              selectedCategory === ''
                ? 'bg-primary text-white shadow'
                : 'bg-white text-gray-600 border hover:border-primary'
            }`}
          >
            All Items
          </button>
          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              className={`px-5 py-2 rounded-full font-medium whitespace-nowrap transition ${
                selectedCategory === cat._id
                  ? 'bg-primary text-white shadow'
                  : 'bg-white text-gray-600 border hover:border-primary'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <div className="text-center py-20">
            <div className="text-5xl animate-spin inline-block">⏳</div>
            <p className="text-gray-500 mt-3">Loading menu...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
            {products.map(product => (
              <ProductCard
                key={product._id}
                product={product}
                onClick={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-gray-500 text-lg">No items found in this category</p>
            <button
              onClick={() => setSelectedCategory('')}
              className="text-primary font-semibold mt-3 hover:underline"
            >
              Show All Items
            </button>
          </div>
        )}
      </div>

      {/* PRODUCT MODAL */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Menu;