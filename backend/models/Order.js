const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  guestEmail: {
    type: String,
    lowercase: true,
    trim: true,
    required: false,
    sparse: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      name: String,
      price: Number,
      quantity: {
        type: Number,
        default: 1
      },
      image: String
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'jazzcash', 'easypaisa'],
    default: 'cash'
  },
  isPaid: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Unique index for guest emails
orderSchema.index({ guestEmail: 1 }, { sparse: true, unique: true });

module.exports = mongoose.model('Order', orderSchema);