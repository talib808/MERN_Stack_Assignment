const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const authenticateUser = require("../middlewares/auth");
const { jwtSecretKey } = require("../config/keys");

const router = express.Router();

// User registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, country } = req.body;

    // Validate input data
    if (!name || !email || !password || !phone || !country) {
      return res.status(400).send({ error: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      country,
    });

    await newUser.save();

    res
      .status(201)
      .send({ message: "Registration successful.", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send({ error: "Internal server error." });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input data
    if (!email || !password) {
      return res
        .status(400)
        .send({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: "Invalid email or password." });
    }

    const token = jwt.sign({ _id: user._id }, jwtSecretKey);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.send({ message: "Login successful.", user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ error: "Internal server error." });
  }
});

module.exports = router;
