import express from 'express';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog
} from '../controllers/blogController.js';
import { protect, adminOnly } from '../middleware/authmiddleware.js';

const router = express.Router();

// Public routes
router.get('/all', getAllBlogs);
router.get('/:id', getBlogById);

// Protected + Admin only
router.post('/create', protect, adminOnly, createBlog);
router.delete('/:id', protect, adminOnly, deleteBlog);

export default router;