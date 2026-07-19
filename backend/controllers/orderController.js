const Order = require('../models/Order');

// Create Order (Guest or Authenticated)
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress, phone, paymentMethod, guestEmail } = req.body;

    const orderData = {
      items,
      totalAmount,
      deliveryAddress,
      phone,
      paymentMethod
    };

    // If user is logged in, add user ID
    if (req.user) {
      orderData.user = req.user._id;
    } else {
      // For guest users, email is required
      if (!guestEmail) {
        return res.status(400).json({ message: 'Email required for guest checkout' });
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(guestEmail)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      orderData.guestEmail = guestEmail.toLowerCase().trim();

      // Check if email already used
      const existingOrder = await Order.findOne({ guestEmail: orderData.guestEmail });
      if (existingOrder) {
        return res.status(400).json({ message: 'This email already has orders. Use a different email or login.' });
      }
    }

    const order = await Order.create(orderData);

    res.status(201).json(order);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'This email already has orders. Use a different email or login.' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Get My Orders (User)
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Track Guest Orders by Phone or Email
const trackOrdersByPhone = async (req, res) => {
  try {
    const { phone, email } = req.body;

    if (!phone && !email) {
      return res.status(400).json({ message: 'Please provide phone number or email' });
    }

    let query = { user: null };
    if (phone) query.phone = phone;
    if (email) query.guestEmail = email.toLowerCase().trim();

    const orders = await Order.find(query).sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Track Order as Guest
const trackGuestOrder = async (req, res) => {
  try {
    const { orderId, phone } = req.body;

    const order = await Order.findOne({
      _id: orderId,
      phone: phone,
      user: null
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found. Check ID and phone number.' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Order By ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Order Status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  trackGuestOrder,
  trackOrdersByPhone
};