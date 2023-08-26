const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
  name: String,                
  email: { type: String, unique: true }, 
  password: String,              
  phone: String,                 
  country: String,               
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',                  // Reference to the user's cart
  },
  tokens: [],                    // Array to store authentication tokens
});

module.exports = mongoose.model('User', userSchema);


