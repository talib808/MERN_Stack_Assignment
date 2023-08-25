const express = require('express');
const Product = require('../models/Product');
const User = require('../models/user');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();


// Add product to cart
router.post('/add-to-cart/:productId', authMiddleware, async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).send({ error: 'Product not found.' });
      }
  
      const user = req.user;
  
      const cartItem = user.cart.items.find(item => item.product.toString() === req.params.productId);
  
      if (cartItem) {
        cartItem.quantity += 1; 
      } else {
        user.cart.items.push({ product: req.params.productId, quantity: 1 });
      }
  
      await user.cart.save();
  
      res.send({ message: 'Product added to cart.' });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Remove product from cart
  router.delete('/remove-from-cart/:productId', authMiddleware, async (req, res) => {
    try {
      const user = req.user;
  
      const cartItemIndex = user.cart.items.findIndex(item => item.product.toString() === req.params.productId);
  
      if (cartItemIndex === -1) {
        return res.status(404).send({ error: 'Product not found in cart.' });
      }
  
      user.cart.items.splice(cartItemIndex, 1); 
  
      await user.cart.save();
  
      res.send({ message: 'Product removed from cart.' });
    } catch (error) {
      res.status(500).send(error);
    }
  });


module.exports = router;