import express from 'express';
import {
  addPeriod,
  getPeriods,
  getPredictions,
  deletePeriod
} from '../controllers/periodController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

// All period routes are protected
router.use(protect);

router.post('/add', addPeriod);
router.get('/all', getPeriods);
router.get('/predict', getPredictions);
router.delete('/:id', deletePeriod);

export default router;