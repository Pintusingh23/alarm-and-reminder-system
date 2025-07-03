import express from 'express';
import {
  createBanner,
  getAllBanners,
  getBanner,
  updateBanner,
  deleteBanner
} from '../controllers/bannerController.js';
import uploadBanner from '../middleware/upload.js';

const router = express.Router();

// Create a new banner with multiple images
router.post('/', uploadBanner.array('images', 5), createBanner); 

// Get all banners
router.get('/', getAllBanners);

// Get a single banner
router.get('/:id', getBanner);

// Update a banner (with optional new images)
router.put('/:id', uploadBanner.array('images', 5), updateBanner);

// Delete a banner
router.delete('/:id', deleteBanner);

export default router;