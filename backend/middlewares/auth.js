const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { jwtSecretKey } = require("../config/keys");

// Define a constant for the token prefix
const TOKEN_PREFIX = "Bearer ";

// Middleware to authenticate the user
const authenticateUser = async (req, res, next) => {
  try {
    // Get the token from the authorization header and remove the prefix
    const token = req.header("Authorization").replace(TOKEN_PREFIX, "");
    const decoded = jwt.verify(token, jwtSecretKey);

    // Find the user with the decoded ID and matching token
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    // If user not found, send an error response
    if (!user) {
      return res.status(401).send({ error: "User not found or token invalid." });
    }

    // Attach the token and user information to the request
    req.token = token;
    req.user = user;

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    // If token validation fails, send an error response
    res.status(401).send({ error: "Please authenticate." });
  }
};


module.exports = authenticateUser;

