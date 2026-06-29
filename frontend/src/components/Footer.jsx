const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-primary mb-3">🍱 FoodExpress</h3>
          <p className="text-gray-400 text-sm">
            Delicious food delivered fast to your doorstep in Karachi.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li><a href="/menu" className="hover:text-primary">Menu</a></li>
            <li><a href="/orders" className="hover:text-primary">My Orders</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>📍 Karachi, Pakistan</li>
            <li>📞 +92 300 0000000</li>
            <li>✉️ info@foodexpress.pk</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm py-4 border-t border-gray-800">
        © 2025 FoodExpress. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;