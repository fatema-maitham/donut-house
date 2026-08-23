const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },

  cart: [
    {
      donutId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donut',
      },

      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;