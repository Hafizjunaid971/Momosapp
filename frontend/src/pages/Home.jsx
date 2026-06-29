import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';
import { FaArrowRight, FaTruck, FaClock, FaStar } from 'react-icons/fa';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featRes, catRes] = await Promise.all([
          API.get('/products/featured'),
          API.get('/categories')
        ]);
        setFeatured(featRes.data);
        setCategories(catRes.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-r from-red-500 to-orange-400 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Delicious Food <br />
              <span className="text-yellow-300">Delivered Fast!</span>
            </h1>
            <p className="text-lg mb-8 text-red-100">
              Order your favorite food online and get it delivered to your doorstep in Karachi.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/menu"
                className="bg-white text-primary font-bold px-8 py-3 rounded-full hover:shadow-lg transition flex items-center gap-2">
                Order Now <FaArrowRight />
              </Link>
              <Link to="/menu"
                className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-primary transition">
                View Menu
              </Link>
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-9xl animate-bounce">🍱</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <FaTruck className="text-4xl text-primary mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
            <p className="text-gray-500 text-sm">Get your order delivered in 30-45 minutes</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <FaStar className="text-4xl text-yellow-400 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">Best Quality</h3>
            <p className="text-gray-500 text-sm">Fresh ingredients and amazing taste guaranteed</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <FaClock className="text-4xl text-green-500 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">Open 24/7</h3>
            <p className="text-gray-500 text-sm">We are available round the clock for you</p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      {categories.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Our Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map(cat => (
                <Link
                  key={cat._id}
                  to={`/menu?category=${cat._id}`}
                  className="bg-white rounded-2xl shadow p-4 text-center hover:shadow-lg transition hover:-translate-y-1 group"
                >
                  <img
                    src={cat.image || 'https://via.placeholder.com/100?text=🍽️'}
                    alt={cat.name}
                    className="w-16 h-16 object-cover rounded-full mx-auto mb-3 group-hover:scale-110 transition"
                  />
                  <h3 className="font-semibold text-gray-700">{cat.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED PRODUCTS */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Items</h2>
            <Link to="/menu"
              className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All <FaArrowRight />
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-10">
              <div className="text-5xl animate-spin inline-block">⏳</div>
              <p className="text-gray-500 mt-3">Loading...</p>
            </div>
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featured.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="text-5xl mb-3">🍽️</div>
              <p className="text-gray-500">No featured items yet</p>
              <Link to="/menu" className="text-primary font-semibold mt-2 inline-block">
                Browse Menu →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gradient-to-r from-orange-400 to-red-500 py-16 px-4 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Hungry? Order Now! 🍔
        </h2>
        <p className="text-red-100 mb-8 text-lg">
          Fresh food, fast delivery, great prices!
        </p>
        <Link to="/menu"
          className="bg-white text-primary font-bold px-10 py-4 rounded-full hover:shadow-xl transition text-lg">
          Order Now →
        </Link>
      </section>
    </div>
  );
};

export default Home;