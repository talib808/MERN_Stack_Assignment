const mongoose = require('mongoose');

// Define the schema for a product
const productSchema = new mongoose.Schema({
  name: String,         
  image: String,        
  description: String,  
  price: Number,        
  quantity: Number,    
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',       // Reference to the 'Store' model
  },
});


module.exports = mongoose.model('Product', productSchema);

