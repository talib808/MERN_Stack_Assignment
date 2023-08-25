const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: Number,
  quantity: Number,
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
  },
});

module.exports = mongoose.model('Product', productSchema);
