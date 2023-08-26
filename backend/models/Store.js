const mongoose = require("mongoose");

// Define the schema for a store
const storeSchema = new mongoose.Schema({
  name: String,                  
  email: { type: String, unique: true },  
  password: String,              
  phone: String,                 
  storeName: String,             
  tokens: [],                    // Array to store authentication tokens
});


module.exports = mongoose.model("Store", storeSchema);
