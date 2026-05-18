import express from 'express';
import {
  addMood,
  getMoods,
  getMoodAnalytics,
  deleteMood
} from '../controllers/moodController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/add', addMood);
router.get('/all', getMoods);
router.get('/analytics', getMoodAnalytics);
router.delete('/:id', deleteMood);

export default router;