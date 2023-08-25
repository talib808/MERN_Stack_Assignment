const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authMiddleware = require("../middlewares/auth");
const { jwtSecretKey } = require("../config/keys");

const router = express.Router();

// User registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, country } = req.body;

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
    res.status(400).send(error);
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log("Received login request for email:", email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: "Invalid email." });
    }

    // console.log("User found:", user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: "Incorrect password." });
    }

    // console.log("Password is valid.");

    const token = jwt.sign({ _id: user._id }, jwtSecretKey);

    // console.log("Before concat: user.tokens =", user.tokens);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    // console.log("After concat: user.tokens =", user.tokens);

    res.send({ user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ error: "Internal server error." });
  }
});

module.exports = router;
