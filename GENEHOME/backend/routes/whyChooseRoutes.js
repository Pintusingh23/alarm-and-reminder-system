import express from 'express';
import {
  createWhyChoose,
  getAllWhyChooses,
  getWhyChoose,
  updateWhyChoose,
  deleteWhyChoose
} from '../controllers/whyChooseController.js';
import uploadWhyChoose from '../middleware/upload.js';

const router = express.Router();

// Create WhyChoose
router.post('/', uploadWhyChoose.single('img'), createWhyChoose);

// Get all WhyChooses
router.get('/', getAllWhyChooses);

// Get single WhyChoose
router.get('/:id', getWhyChoose);

// Update WhyChoose
router.put('/:id', uploadWhyChoose.single('img'), updateWhyChoose);

// Delete WhyChoose
router.delete('/:id', deleteWhyChoose);

export default router;