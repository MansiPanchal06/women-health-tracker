import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
  changePassword
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile/update', protect, updateProfile);
router.put('/password/change', protect, changePassword);

export default router;