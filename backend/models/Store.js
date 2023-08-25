const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  storeName: String,
  tokens: [],
});

module.exports = mongoose.model('Store', storeSchema);
