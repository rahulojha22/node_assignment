const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User } = require('../models');

dotenv.config();

const authMiddleware = async (req, res, next) => {

  if (!req.headers.authorization.startsWith('Bearer')) return res.status(401).send('Invalid Token');
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  if (!token) return res.status(403).send('A token is required for authentication');
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email, token } });
    
    if (!user) {
      return res.status(401).send('Invalid Token');
    }
    req.user = user;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  
  return next();
};

module.exports = authMiddleware;