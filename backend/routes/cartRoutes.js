const express = require("express");
const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require('../models/Cart'); 
const authenticateUser = require("../middlewares/auth");

const router = express.Router();

// Add product to cart
router.post("/add-to-cart/:productId", authenticateUser, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send({ error: "Product not found." });
    }

    const user = req.user;

    // Check if the user has a cart, and if not, initialize it
    if (!user.cart) {
      user.cart = { items: [] };
    }

    // Check if the product already exists in the cart
    const cartItem = user.cart.items.find(
      (item) => item.product.toString() === req.params.productId
    );

    if (cartItem) {
      cartItem.quantity += 1; // Increment quantity if the product is already in the cart
    } else {
      // If not, add the product to the cart
      user.cart.items.push({ product: req.params.productId, quantity: 1 });
    }

    await user.save(); // Save the updated user

    res.send({ message: "Product added to cart." });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).send({
      error: "An error occurred while adding the product to the cart.",
    });
  }
});

// Remove product from cart
router.delete(
  "/remove-from-cart/:productId",
  authenticateUser,
  async (req, res) => {
    try {
      const user = req.user;

      const cartItemIndex = user.cart.items.findIndex(
        (item) => item.product.toString() === req.params.productId
      );

      if (cartItemIndex === -1) {
        return res.status(404).send({ error: "Product not found in cart." });
      }

      user.cart.items.splice(cartItemIndex, 1); // Remove the product from the cart

      await user.cart.save(); // Save the updated cart

      res.send({ message: "Product removed from cart." });
    } catch (error) {
      console.error("Error removing product from cart:", error);
      res
        .status(500)
        .send({
          error: "An error occurred while removing the product from the cart.",
        });
    }
  }
);

module.exports = router;
