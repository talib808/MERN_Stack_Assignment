const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { jwtSecretKey } = require('../config/keys'); 

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); // Corrected this line
    const decoded = jwt.verify(token, jwtSecretKey); 
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;

