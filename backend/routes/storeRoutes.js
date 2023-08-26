const express = require("express");
const Store = require("../models/Store");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authenticateUser = require("../middlewares/auth");

const router = express.Router();

// Store registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, storeName } = req.body;

    const existingStore = await Store.findOne({ email });
    if (existingStore) {
      return res.status(400).send({ error: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStore = new Store({
      name,
      email,
      password: hashedPassword,
      phone,
      storeName,
    });

    await newStore.save();

    res.status(201).send(newStore);
  } catch (error) {
    console.error("Error registering store:", error);
    res
      .status(400)
      .send({ error: "An error occurred while registering the store." });
  }
});

// Store login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const store = await Store.findOne({ email });
    if (!store) {
      return res.status(401).send({ error: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, store.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: "Invalid credentials." });
    }

    const token = jwt.sign({ _id: store._id }, "jwtSecretKey");
    store.tokens = store.tokens.concat({ token });
    await store.save();

    res.send({ message: "Login successful.", store, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(400).send({ error: "An error occurred while logging in." });
  }
});

module.exports = router;
