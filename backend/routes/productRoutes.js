const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

// Add Product
router.post("/add-product", authMiddleware, async (req, res) => {
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
    res.status(400).send(error);
  }
});

// Update Product
router.patch("/update-product/:id", authMiddleware, async (req, res) => {
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
    res.status(400).send(error);
  }
});

// Delete Product
router.delete("/delete-product/:id", authMiddleware, async (req, res) => {
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
    res.status(500).send(error);
  }
});

// Get Products List
router.get("/products", authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ store: req.user._id });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
