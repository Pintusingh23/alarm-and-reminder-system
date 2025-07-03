import express from 'express';
import {
  createLivingSpace,
  getAllLivingSpaces,
  getLivingSpace,
  updateLivingSpace,
  deleteLivingSpace
} from '../controllers/livingSpaceController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('img'), createLivingSpace);
router.get('/', getAllLivingSpaces);
router.get('/:id', getLivingSpace);
router.put('/:id', upload.single('img'), updateLivingSpace);
router.delete('/:id', deleteLivingSpace);

export default router;