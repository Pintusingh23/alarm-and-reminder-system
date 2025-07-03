import express from 'express';
import {
  createFeature,
  getAllFeatures,
  getFeature,
  updateFeature,
  deleteFeature
} from '../controllers/featuresController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('image'), createFeature);
router.get('/', getAllFeatures);
router.get('/:id', getFeature);
router.put('/:id', upload.single('image'), updateFeature);
router.delete('/:id', deleteFeature);

export default router;