const mongoose = require("mongoose");

// Function to connect to the MongoDB database
const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Lahagora_assignment", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Function to close the MongoDB database connection
const closeDatabaseConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
};


module.exports = {
  connectToDatabase,
  closeDatabaseConnection,
};
