import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold text-primary">
            🍱 GB Dumplings Corner

          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-primary font-medium">Home</Link>
            <Link to="/menu" className="text-gray-600 hover:text-primary font-medium">Menu</Link>
            {user && (
              <Link to="/orders" className="text-gray-600 hover:text-primary font-medium">My Orders</Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-600 hover:text-primary font-medium">Admin</Link>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-4">
            {/* CART BUTTON */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2"
            >
              <FaShoppingCart className="text-2xl text-gray-600 hover:text-primary" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-600 font-medium">
                  <FaUser className="inline mr-1" />{user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition">
                  Login
                </Link>
                <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setCartOpen(true)} className="relative p-1">
              <FaShoppingCart className="text-xl text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen
                ? <FaTimes className="text-xl text-gray-600" />
                : <FaBars className="text-xl text-gray-600" />
              }
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-3 flex flex-col gap-3">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-primary font-medium py-2 border-b">Home</Link>
            <Link to="/menu" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-primary font-medium py-2 border-b">Menu</Link>
            {user && (
              <Link to="/orders" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-primary font-medium py-2 border-b">My Orders</Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-primary font-medium py-2 border-b">Admin</Link>
            )}
            {user ? (
              <button onClick={handleLogout} className="bg-primary text-white px-4 py-2 rounded-lg w-full">Logout</button>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="border border-primary text-primary px-4 py-2 rounded-lg flex-1 text-center">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="bg-primary text-white px-4 py-2 rounded-lg flex-1 text-center">Register</Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* CART DRAWER */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;