const express = require("express");
const app = express();
const dbConnection = require("./db/connection");

const userRoutes = require("./routes/userRoutes");
const storeRoutes = require("./routes/storeRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

// Connect to MongoDB
dbConnection.connectToDatabase();

app.use(express.json());
const cors = require("cors");
app.use(cors());

// Routes
app.use("/users", userRoutes);
app.use("/stores", storeRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// Close database connection on shutdown
process.on("SIGINT", async () => {
  await dbConnection.closeDatabaseConnection();
  process.exit();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
