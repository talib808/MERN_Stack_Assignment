const mongoose = require("mongoose");

// Define the schema for individual items in the cart
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the 'Product' model
  },
  quantity: Number,
});

// Define the schema for the user's cart
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the 'User' model
  },
  items: [cartItemSchema], // An array of cart items
});

module.exports = mongoose.model("Cart", cartSchema);
