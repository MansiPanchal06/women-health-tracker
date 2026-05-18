// server/middleware/authMiddleware.js
// This runs BEFORE protected routes
// It checks if the user has a valid JWT token

import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protect = async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  // Token format: "Bearer eyJhbGc..."
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token (remove "Bearer " prefix)
      token = req.headers.authorization.split(' ')[1];

      // Verify token using our secret key
      // If token is fake or expired, this throws an error
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user from database using ID stored in token
      // .select('-password') means "get everything EXCEPT password"
      req.user = await User.findById(decoded.id).select('-password');

      // Call next() to proceed to the actual route
      next();

    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Not authorized, no token'
    });
  }
};

// Middleware to check if user is admin
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admins only.'
    });
  }
};

export { protect, adminOnly };