const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader); // Debug log

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'fail',
        message: 'No authentication token provided'
      });
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token); // Debug log

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Debug log

    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'User not found'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(401).json({
      status: 'fail',
      message: 'Not authorized to access this route',
      error: error.message
    });
  }
};

module.exports = auth;