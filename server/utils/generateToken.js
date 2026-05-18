// server/utils/generateToken.js
// Helper function to create JWT tokens

import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  // jwt.sign(payload, secret, options)
  // payload = data we want to store IN the token
  // secret = our secret key to sign the token
  // expiresIn = token expires after 30 days
  
  return jwt.sign(
    { id: userId },           // payload
    process.env.JWT_SECRET,   // secret key from .env
    { expiresIn: '30d' }      // expiry
  );
};

export default generateToken;