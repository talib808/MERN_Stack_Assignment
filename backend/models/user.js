const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  country: String,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  },
  tokens: [],
});

module.exports = mongoose.model('User', userSchema);

