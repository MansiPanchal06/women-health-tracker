import express from 'express';
import {
  addWater,
  getTodayWater,
  getWaterHistory,
  resetTodayWater
} from '../controllers/waterController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/add', addWater);
router.get('/today', getTodayWater);
router.get('/history', getWaterHistory);
router.delete('/reset', resetTodayWater);

export default router;