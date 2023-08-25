const express = require("express");
const app = express();
const dbConnection = require("./db/connection");

const userRoutes = require("./routes/userRoutes");
const storeRoutes = require("./routes/storeRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

// Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.use(express.json());
app.use(express.static("public"));
const cors = require("cors");
app.use(cors());

// Routes
app.use("/users", userRoutes);
app.use("/stores", storeRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
