const express = require("express");
const Product = require("../models/Product");
const authenticateUser = require("../middlewares/auth");

const router = express.Router();

// Add Product
router.post("/add-product", authenticateUser, async (req, res) => {
  try {
    const { name, image, description, price, quantity } = req.body;

    const newProduct = new Product({
      name,
      image,
      description,
      price,
      quantity,
      store: req.user._id,
    });

    await newProduct.save();

    res.status(201).send(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(400).send({ error: "An error occurred while adding the product." });
  }
});

// Update Product
router.patch("/update-product/:id", authenticateUser, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "name",
      "image",
      "description",
      "price",
      "quantity",
    ];
    const isValidUpdate = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidUpdate) {
      return res.status(400).send({ error: "Invalid updates." });
    }

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, store: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).send();
    }

    res.send(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).send({ error: "An error occurred while updating the product." });
  }
});

// Delete Product
router.delete("/delete-product/:id", authenticateUser, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      store: req.user._id,
    });

    if (!product) {
      return res.status(404).send();
    }

    res.send(product);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ error: "An error occurred while deleting the product." });
  }
});

// Get Products List
router.get("/products", authenticateUser, async (req, res) => {
  try {
    const products = await Product.find({ store: req.user._id });
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ error: "An error occurred while fetching products." });
  }
});

module.exports = router;

